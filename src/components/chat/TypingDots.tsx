// src/components/chat/TypingDots.tsx
// -----------------------------------------------------------
// Author: MB
// Purpose: Simple 3-dot animation showing the assistant is typing.
// -----------------------------------------------------------

"use client";

import React from "react";
import { motion } from "framer-motion";

// Small, looping dot animation for "AI is typing"
export default function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      {/* Dot 1 */}
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 0.9 }}
        className="h-2 w-2 rounded-full bg-slate-400"
      />

      {/* Dot 2 */}
      <motion.span
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 0.9, delay: 0.12 }}
        className="h-2 w-2 rounded-full bg-slate-400"
      />

      {/* Dot 3 */}
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 0.9, delay: 0.24 }}
        className="h-2 w-2 rounded-full bg-slate-400"
      />
    </div>
  );
}
