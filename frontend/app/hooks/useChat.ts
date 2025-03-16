"use client";

import { useEffect, useState } from "react";
import io, { type Socket } from "socket.io-client";

let socket: Socket;

export function useChat() {
  const [messages, setMessages] = useState<{ user: string; message: string }[]>(
    []
  );

  useEffect(() => {
    // Initialize socket connection
    if (!socket) {
      socket = io("http://localhost:4000", {
        transports: ["websocket"],
      });
    }

    // Load messages from localStorage
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // Listen for incoming messages
    socket.on("message", (data) => {
      setMessages((prev) => {
        const newMessages = [...prev, data];
        // Save to localStorage
        localStorage.setItem("chatMessages", JSON.stringify(newMessages));
        return newMessages;
      });
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (user: string, message: string) => {
    const messageData = { user, message, timestamp: new Date().toISOString() };
    socket.emit("sendMessage", messageData);

    // Optimistically add message to state
    setMessages((prev) => {
      const newMessages = [...prev, messageData];
      localStorage.setItem("chatMessages", JSON.stringify(newMessages));
      return newMessages;
    });
  };

  return { messages, sendMessage };
}
