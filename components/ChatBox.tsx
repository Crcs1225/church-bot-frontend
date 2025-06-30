"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const askBot = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setMessages((prev) => [...prev, { sender: "user", text: question }]);

    try {
      const res = await api.post("/chat", { message: question });
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.answer }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "❌ Error connecting to Churchbot." }]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  const reloadFAQ = async () => {
    setLoading(true);
    try {
      const res = await api.post("/reload");
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.message || "✅ FAQ data reloaded." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Failed to reload FAQ data." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 flex flex-col h-[90vh] p-4 border rounded-xl shadow bg-white">
      {/* Header with Import Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">⛪ Churchbot</h1>
        <Button variant="secondary" onClick={reloadFAQ} disabled={loading}>
          📥 Import New Data
        </Button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2 border rounded bg-gray-50 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded max-w-[80%] ${
              msg.sender === "user" ? "ml-auto bg-blue-200" : "mr-auto bg-gray-200"
            }`}
          >
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}

        {/* Skeleton shown while waiting for response */}
        {loading && (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[75px] w-[300px] rounded-xl" />
          </div>
        )}
      </div>

      {/* Input + Ask Button */}
      <div className="flex gap-2">
        <Input
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") askBot();
          }}
        />
        <Button onClick={askBot} disabled={loading}>
          {loading ? "Asking..." : "Ask"}
        </Button>
      </div>
    </div>
  );
}
