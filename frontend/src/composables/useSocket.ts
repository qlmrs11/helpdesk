import { io } from "socket.io-client";
import { ref } from "vue";

let socket = null;

export function useSocket() {
  const connected = ref(false);

  function connect() {
    if (socket) return socket;
    socket = io("http://localhost:3000", { autoConnect: true });
    socket.on("connect", () => (connected.value = true));
    socket.on("disconnect", () => (connected.value = false));
    return socket;
  }

  function joinTicket(ticketId) {
    if (!socket) connect();
    socket.emit("join_ticket", ticketId);
  }

  function sendComment(payload) {
    if (!socket) connect();
    socket.emit("send_comment", payload);
  }

  function onNewComment(cb) {
    if (!socket) connect();
    socket.on("new_comment", cb);
  }

  return { connect, joinTicket, sendComment, onNewComment, connected };
}
