let ws: any = null;

const sessions = ref<any[]>([]);

// Export the composable
export default function useSessions() {
  onMounted(() => {
    ws = new WebSocket('ws://localhost:3000/_ws'); 

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      ws.send(JSON.stringify({ type: 'open-consumer', channel: 'bugle'}));
    };

    ws.onmessage = (event: any) => {
      console.log('WebSocket message received:', event.data);
      const eventData = JSON.parse(event.data);
      console.log(eventData);
      if (eventData.type === 'message') {
        const session = sessions.value.find((s) => s.channel === eventData.channel);
        if (session) {
          session.messages.push(eventData.message);
        } else {
          sessions.value.push({ consumer: null, provider: null, channel: eventData.channel, messages: [eventData.message] });
        }
      }

    };
  });
  return {
    sessions,
  };
}

export function useProvider() {
  let ws = ref<any>(null);
  onMounted(() => {
    ws.value = new WebSocket('ws://localhost:3000/_ws'); 

    ws.value.onopen = () => {
      console.log('WebSocket connection opened');
      ws.value.send(JSON.stringify({ type: 'open-provider', channel: 'bugle'}));
    };

  });

  return {
    ws
  };
}
