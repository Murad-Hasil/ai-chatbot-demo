// TypingDots.tsx — Animated typing indicator for chatbot
"use client";

import React from "react";
import { motion } from "framer-motion";

// Reusable typing indicator component
// Displays three bouncing dots to simulate "assistant is typing..."
export default function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      {/* Dot 1 */}
      <motion.span
        animate={{ y: [0, -4, 0] }} // up-down motion
        transition={{ repeat: Infinity, duration: 0.9 }} // continuous loop
        className="h-2 w-2 rounded-full bg-slate-400"
      />

      {/* Dot 2 (slight delay for natural rhythm) */}
      <motion.span
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 0.9, delay: 0.12 }}
        className="h-2 w-2 rounded-full bg-slate-400"
      />

      {/* Dot 3 (slightly more delay to complete the wave pattern) */}
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 0.9, delay: 0.24 }}
        className="h-2 w-2 rounded-full bg-slate-400"
      />
    </div>
  );
}
