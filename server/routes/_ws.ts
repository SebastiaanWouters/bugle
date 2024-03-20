const sessions: any[] = [];

export default defineWebSocketHandler({
  open(peer) {
    console.log("[ws] open", peer);
  },

  message(peer, message) {
    console.log("[ws] message", peer, message);
    console.log(message);
    const data = JSON.parse(message);
    if (data.type === "open") {
      sessions.push({ peer, channel: data.channel, messages: [] });
      console.log(sessions);
    }
},
  close(peer, event) {
    console.log("[ws] close", peer, event);
  },

  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});
