// src/app/chatbot/page.tsx
// -----------------------------------------------------------
// Author: MB
// Purpose: Chatbot UI page for portfolio demonstration.
//          Manages chat history, message sending, retry, and reset.
// Components: MessageList, ChatInput
// -----------------------------------------------------------

"use client";

import React, { useEffect, useRef, useState } from "react";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";

// -----------------------------------------------------------
// Type: Chat message structure
// -----------------------------------------------------------
type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  status?: "pending" | "sent" | "error";
};

// Key used for saving messages in localStorage
const STORAGE_KEY = "chatbot:messages";

export default function ChatbotPage() {
  // -----------------------------------------------------------
  // State
  // -----------------------------------------------------------
  const [messages, setMessages] = useState<Msg[]>([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const lastMsgRef = useRef<HTMLDivElement>(null);

  // -----------------------------------------------------------
  // Load chat history once on mount
  // -----------------------------------------------------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw));
    } catch (err) {
      console.warn("Failed to load chat history", err);
    }
  }, []);

  // -----------------------------------------------------------
  // Save messages + auto-scroll on update
  // -----------------------------------------------------------
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore storage write errors */
    }

    const timeout = setTimeout(() => {
      lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeout);
  }, [messages]);

  // Generate a lightweight unique ID
  const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  // -----------------------------------------------------------
  // Send user message -> API -> update assistant reply
  // -----------------------------------------------------------
  async function sendMessage(text: string) {
    const userMsg: Msg = {
      id: makeId(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
      status: "sent",
    };

    const assistantMsg: Msg = {
      id: makeId(),
      role: "assistant",
      content: "",
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setIsWaiting(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      const reply = data?.reply ?? "Sorry, I couldn’t generate a response.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsg.id
            ? { ...msg, content: reply, status: "sent" }
            : msg
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsg.id
            ? { ...msg, content: "Error: failed to load reply.", status: "error" }
            : msg
        )
      );
    } finally {
      setIsWaiting(false);
    }
  }

  // -----------------------------------------------------------
  // Retry for failed assistant messages
  // -----------------------------------------------------------
  async function retryMessage(userMessageContent: string) {
    setIsWaiting(true);

    const retryMsg: Msg = {
      id: makeId(),
      role: "assistant",
      content: "",
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    setMessages((prev) => [...prev, retryMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessageContent }),
      });

      const data = await res.json();
      const reply = data?.reply ?? "Sorry, I couldn’t generate a response.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === retryMsg.id ? { ...msg, content: reply, status: "sent" } : msg
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === retryMsg.id
            ? { ...msg, content: "Error: failed to load reply.", status: "error" }
            : msg
        )
      );
    } finally {
      setIsWaiting(false);
    }
  }

  // -----------------------------------------------------------
  // Clear chat + localStorage
  // -----------------------------------------------------------
  function resetChat() {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
    setTimeout(() => lastMsgRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  // -----------------------------------------------------------
  // UI Layout
  // -----------------------------------------------------------
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6 animate-fadeIn">
      <div className="w-full max-w-3xl mt-8">
        {/* Header */}
        <header className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Chatbot Demo</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              A demo chatbot built for this portfolio. Responses are generated by a hosted model.
            </p>
          </div>

          {/* Reset button */}
          <button
            onClick={resetChat}
            className="flex items-center gap-2 text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 px-3 py-1.5 rounded-lg transition-all duration-200 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.5 12a7.5 7.5 0 1112.495 5.38M4.5 12H9m-4.5 0l2.25 2.25M19.5 12a7.5 7.5 0 10-12.495-5.38M19.5 12h-4.5m4.5 0l-2.25 2.25"
              />
            </svg>
            Reset Chat
          </button>
        </header>

        {/* Chat area */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-300 p-4 animate-fadeIn">
          <MessageList
            messages={messages}
            lastRef={lastMsgRef}
            onRetry={retryMessage}
            isTyping={isWaiting}
          />
          <div className="mt-4">
            <ChatInput onSend={sendMessage} />
          </div>
        </section>
      </div>
    </main>
  );
}
