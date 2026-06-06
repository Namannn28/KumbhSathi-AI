"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { ArrowLeft, Send, Mic, Volume2 } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load chat history
    fetch("/api/v1/chat/message").then((res) =>
      res.json().then((data) => {
        if (data.data) setMessages(data.data);
      })
    );
  }, []);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "USER", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/v1/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          language: "en",
          sessionId: "default",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "ASSISTANT", content: data.data.message },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ASSISTANT", content: "Sorry, I couldn't process that request." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">KumbhSaarthi AI</h1>
            <p className="text-sm text-gray-500">Your AI Guide</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4 py-8">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <div className="text-4xl mb-4">🙏</div>
              <h2 className="text-2xl font-bold mb-2">Namaste!</h2>
              <p className="text-gray-600 mb-6 max-w-sm">
                Ask me anything about Mahakumbh — rituals, directions, accommodation, and more.
              </p>
              <p className="text-sm text-gray-500">
                I can respond in Hindi, English, Gujarati, and more...
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "USER" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md p-4 rounded-lg ${
                    msg.role === "USER"
                      ? "bg-sacred-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-900 p-4 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t max-w-4xl mx-auto w-full">
        <div className="p-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me anything... (in any language)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sacred-600 focus:border-transparent"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="p-2 bg-sacred-600 text-white rounded-lg hover:bg-sacred-700 disabled:bg-gray-400 transition"
          >
            <Send className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
