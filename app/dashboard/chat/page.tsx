"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mic, Camera, Globe2, Bot, User as UserIcon } from "lucide-react";
import { chatResponses } from "@/lib/data/faq";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: chatResponses.hello,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Snan dates",
    "Crowd status",
    "Emergency contacts",
    "Accommodation",
    "How to reach Ujjain"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let botResponse = chatResponses.default;

      // Simple keyword matching
      if (lowerText.includes("hello") || lowerText.includes("hi")) botResponse = chatResponses.hello;
      else if (lowerText.includes("namaste") || lowerText.includes("नमस्ते")) botResponse = chatResponses.namaste;
      else if (lowerText.includes("snan") || lowerText.includes("date")) botResponse = chatResponses.snan;
      else if (lowerText.includes("crowd") || lowerText.includes("busy")) botResponse = chatResponses.crowd;
      else if (lowerText.includes("emergency") || lowerText.includes("help") || lowerText.includes("police")) botResponse = chatResponses.emergency;
      else if (lowerText.includes("accommodation") || lowerText.includes("stay") || lowerText.includes("hotel") || lowerText.includes("tent")) botResponse = chatResponses.accommodation;

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const formatText = (text: string) => {
    // Simple markdown-like formatting for bold
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
        <br />
      </span>
    ));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="glass-card rounded-none border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sacred-100 dark:bg-sacred-900/30 text-sacred-600 flex items-center justify-center">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 dark:text-white">AI Assistant</h1>
            <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
          <Globe2 size={14} /> 100+ Languages
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col max-w-[85%] ${msg.isBot ? "self-start items-start" : "self-end items-end ml-auto"}`}
          >
            <div className={`flex items-end gap-2 ${msg.isBot ? "flex-row" : "flex-row-reverse"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.isBot ? "bg-sacred-100 text-sacred-600" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}>
                {msg.isBot ? <Bot size={16} /> : <UserIcon size={16} />}
              </div>
              <div className={`px-4 py-3 rounded-2xl ${
                msg.isBot 
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm" 
                  : "sacred-gradient text-white rounded-br-sm shadow-md"
              }`}>
                <p className="text-sm md:text-base leading-relaxed">{formatText(msg.text)}</p>
              </div>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 mx-10">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2 max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-sacred-100 text-sacred-600 flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="whitespace-nowrap px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium transition-colors border border-gray-200 dark:border-gray-700"
            >
              {q}
            </button>
          ))}
        </div>
        
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 p-2 rounded-2xl border border-gray-200 dark:border-gray-800 focus-within:border-sacred-400 focus-within:ring-1 focus-within:ring-sacred-400 transition-all"
        >
          <button type="button" className="p-2 text-gray-500 hover:text-sacred-500 transition-colors">
            <Camera size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Kumbh Mela..."
            className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-gray-900 dark:text-white placeholder:text-gray-500"
          />
          {input.trim() ? (
            <button type="submit" className="p-2 bg-sacred-500 text-white rounded-xl hover:bg-sacred-600 transition-colors">
              <Send size={20} />
            </button>
          ) : (
            <button type="button" className="p-2 text-gray-500 hover:text-sacred-500 transition-colors">
              <Mic size={20} />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
