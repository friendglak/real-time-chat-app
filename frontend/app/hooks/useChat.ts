"use client";

import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

export function useChat() {
  const [messages, setMessages] = useState<{ user: string; message: string }[]>(
    []
  );

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (user: string, message: string) => {
    socket.emit("sendMessage", { user, message });
  };

  return { messages, sendMessage };
}
