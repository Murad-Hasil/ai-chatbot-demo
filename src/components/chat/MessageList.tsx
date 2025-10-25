// src/components/chat/MessageList.tsx
// -----------------------------------------------------------
// Author: MB
// Purpose: Renders all chat messages, typing indicator,
//          and scroll anchor.
// -----------------------------------------------------------

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBubble from "./ChatBubble";
import TypingDots from "./TypingDots";

// Types
type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  status?: "pending" | "sent" | "error";
};

type MessageListProps = {
  messages: Msg[];
  lastRef: React.RefObject<HTMLDivElement | null>;
  onRetry: (text: string) => void;
  isTyping: boolean;
};

export default function MessageList({
  messages,
  lastRef,
  onRetry,
  isTyping,
}: MessageListProps) {
  return (
    <div
      className="max-h-[56vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent hover:scrollbar-thumb-slate-500 transition-colors scroll-smooth"
      aria-live="polite"
      role="log"
    >
      <div className="space-y-4">
        {/* Render each message with animation */}
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <ChatBubble message={m} onRetry={onRetry} />
            </motion.div>
          ))}

          {/* Typing animation while AI responds */}
          {isTyping && (
            <motion.div
              key="typing-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-3"
              aria-label="AI is typing"
            >
              {/* AI Avatar */}
              <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 text-sm font-semibold">
                AI
              </div>

              {/* Typing dots bubble */}
              <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl px-4 py-2">
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Invisible scroll anchor */}
        <div ref={lastRef} aria-hidden="true" />
      </div>
    </div>
  );
}
