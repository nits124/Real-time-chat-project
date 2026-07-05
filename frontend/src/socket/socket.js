import { io } from "socket.io-client";
import { serverUrl } from "../main";
// const serverUrl = "http://localhost:8000";
export let socket = null;

export const connectSocket = (userId) => {
  socket = io(serverUrl, {
    query: { userId }
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};