"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "../hooks/useChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: number;
  username: string;
}

export default function ChatPage() {
  const { messages, sendMessage } = useChat();
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(userStr);
    setCurrentUser(user);
  }, [router]);

  const handleSendMessage = () => {
    if (message.trim() && currentUser) {
      sendMessage(currentUser.username, message);
      setMessage("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  const getRandomColor = (username: string) => {
    // Generate a consistent color based on username
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
      <Card className="w-full max-w-3xl h-[80vh] flex flex-col">
        <CardHeader className="border-b flex flex-row items-center justify-between">
          <CardTitle>Real-Time Chat</CardTitle>
          <div className="flex items-center gap-2">
            <span>Welcome, {currentUser.username}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                msg.user === currentUser.username
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {msg.user !== currentUser.username && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback
                    style={{ backgroundColor: getRandomColor(msg.user) }}
                  >
                    {getInitials(msg.user)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.user === currentUser.username
                    ? "bg-blue-500 text-white rounded-tr-none dark:bg-blue-600"
                    : "bg-gray-200 text-gray-800 rounded-tl-none dark:bg-gray-800 dark:text-gray-200"
                }`}
              >
                {msg.user !== currentUser.username && (
                  <div className="font-semibold text-xs mb-1">{msg.user}</div>
                )}
                <p>{msg.message}</p>
                <div className="text-xs opacity-70 text-right mt-1">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              {msg.user === currentUser.username && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback
                    style={{
                      backgroundColor: getRandomColor(currentUser.username),
                    }}
                  >
                    {getInitials(currentUser.username)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex w-full gap-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
