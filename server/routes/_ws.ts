const sessions: any[] = [];

export default defineWebSocketHandler({
  open(peer) {
    console.log("[ws] open", peer);
  },

  message(peer, message: any) {
    console.log("[ws] message", peer, message);
    console.log(message);
    const data = JSON.parse(message);
    if (data.type === "open-provider") {
      sessions.push({ consumer: null, provider: peer, channel: data.channel, messages: [] });
      console.log(sessions);
    } else if (data.type === "open-consumer") {
      const session = sessions.find((s) => s.channel === data.channel);
      if (session) {
        session.consumer = peer;
        console.log(session);
      }
    } else if (data.type === "provide-message") {
      if (!sessions.find((s) => s.channel === data.channel)) {
        sessions.push({ consumer: null, provider: peer, channel: data.channel, messages: [] });
      }
      const session = sessions.find((s) => s.channel === data.channel);
      if (session) {
        session.messages.push(data.message);
      }
      if (session && session.consumer) {
        session.consumer.send(JSON.stringify({ type: "message", channel: data.channel, message: data.message }));
      }
    }
},
  close(peer, event) {
    console.log("[ws] close", peer, event);
  },

  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});
