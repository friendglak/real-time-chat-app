"use client";

import { useEffect, useState } from "react";
import io, { type Socket } from "socket.io-client";

let socket: Socket;

export function useChat() {
  const [messages, setMessages] = useState<{ user: string; message: string }[]>(
    []
  );

  useEffect(() => {
    if (!socket) {
      socket = io("http://localhost:4000", { transports: ["websocket"] });
    }

    // Cargar mensajes previos (si el backend los almacena)
    fetch("http://localhost:4000/chat/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() =>
        console.log("⚠️ No se pudieron cargar los mensajes previos.")
      );

    // Escuchar nuevos mensajes en tiempo real
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
      sessionStorage.setItem("messages", JSON.stringify([...messages, data]));
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
