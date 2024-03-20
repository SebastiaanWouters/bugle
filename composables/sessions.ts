let ws: any = null;

const sessions = ref<any[]>([]);

// Export the composable
export default function useSessions() {
  onMounted(() => {
    ws = new WebSocket('ws://localhost:3000/_ws'); 

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      ws.send(JSON.stringify({ type: 'open', channel: 'bugle'}));
    };

    ws.onmessage = (event: any) => {
      console.log('WebSocket message received:', event.data);
      const eventData = JSON.parse(event.data);
      console.log(eventData);
      if (eventData.type === 'open') {
        sessions.value.push({ peer: ws, channel: eventData.channel, messages: [] });
        console.log(sessions.value);
      }
      if (eventData.type === 'message') {
        const session = sessions.value.find((s) => s.channel === eventData.channel);
        if (session) {
          session.messages.push(eventData.message);
        }
      }
    };
  });
  return {
    sessions,
  };
}

