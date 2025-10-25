// src/components/chat/ChatInput.tsx
// -----------------------------------------------------------
// Author: MB
// Purpose: Handles user input area and sending messages.
// Adds input length guard (max 500 chars) for safety.
// -----------------------------------------------------------

"use client";

import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";

type ChatInputProps = {
  onSend: (text: string) => Promise<void> | void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const text = value.trim();

    // Empty input guard
    if (!text || sending) return;

    // Character limit guard
    if (text.length > 500) {
      alert("Message too long! Please keep it under 500 characters.");
      return;
    }

    setSending(true);
    try {
      await onSend(text);
      setValue("");
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit();
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-3 bg-slate-50 dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300"
        aria-busy={sending}
      >
        <textarea
          id="chat-input"
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={sending}
          aria-disabled={sending}
          maxLength={500}
          className="flex-1 min-h-[44px] max-h-28 resize-none rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50"
          aria-label="Message input"
        />

        <button
          type="submit"
          disabled={sending}
          title="Send message"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          aria-label="Send"
        >
          {sending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </form>

      <p className="text-xs text-slate-400 mt-1 text-center select-none">
        Press{" "}
        <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-600 rounded">
          Enter
        </kbd>{" "}
        to send,{" "}
        <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-600 rounded">
          Shift + Enter
        </kbd>{" "}
        for a new line
      </p>
    </div>
  );
}
