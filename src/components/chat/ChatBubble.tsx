"use client";

import React from "react";
import { motion } from "framer-motion";

// Message type definition for consistent data structure
type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  status?: "pending" | "sent" | "error";
};

// Component props definition
type ChatBubbleProps = {
  message: Msg;
  onRetry?: (userMessageContent: string) => void;
};

// ChatBubble component handles display of a single message
export default function ChatBubble({ message, onRetry }: ChatBubbleProps) {
  const isUser = message.role === "user";

  // Format timestamp into a readable time
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      // Smooth entry/exit animation for message
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className="max-w-[78%]">
        {/* Sender label */}
        <div
          className={`${
            isUser ? "text-right" : "text-left"
          } mb-1 text-[12px] text-slate-400 dark:text-slate-500`}
        >
          {isUser ? "You" : "Assistant"}
        </div>

        {/* Main message bubble */}
        <div
          className={`px-4 py-3 rounded-2xl break-words shadow-sm transition-transform duration-200 ${
            isUser
              ? "bg-blue-600 text-white rounded-br-md hover:brightness-110"
              : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-md hover:bg-slate-200 dark:hover:bg-slate-600"
          }`}
        >
          {message.content || (message.status === "pending" ? "…" : "")}
        </div>

        {/* Footer: time + delivery status + retry option */}
        <div
          className={`mt-1 text-xs flex items-center gap-2 ${
            isUser ? "justify-end text-right" : "justify-start text-left"
          } text-slate-400 dark:text-slate-500`}
        >
          {/* Message timestamp */}
          <span>{time}</span>

          {/* Delivery status for user messages */}
          {isUser && (
            <span
              className={`text-[10px] ${
                message.status === "pending" ? "text-gray-400" : "text-blue-500"
              }`}
            >
              {message.status === "pending" ? "Sending…" : "Delivered"}
            </span>
          )}

          {/* Retry button for failed messages */}
          {message.status === "error" && onRetry && (
            <button
              onClick={() => onRetry(message.content)}
              className="text-xs text-red-500 underline ml-2 hover:text-red-600"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
