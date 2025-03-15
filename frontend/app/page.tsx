"use client";

import { useState } from "react";
import { useChat } from "./hooks/useChat";

export default function ChatPage() {
  const { messages, sendMessage } = useChat();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Chat en Tiempo Real</h1>
      <input
        type="text"
        placeholder="Tu nombre"
        className="border p-2 mb-2"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <div className="w-96 h-64 bg-white border p-4 overflow-auto shadow-md rounded-md">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 border-b">
            <strong>{msg.user}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2 w-96">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            sendMessage(user, message);
            setMessage("");
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
