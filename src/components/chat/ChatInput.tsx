// src/components/chat/ChatInput.tsx
// -----------------------------------------------------------
// Author: MB
// Purpose: Handles user input area and sending messages.
// -----------------------------------------------------------

"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

// Props: parent se onSend function milta hai
type ChatInputProps = {
  onSend: (text: string) => Promise<void> | void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState(""); // current input value
  const [sending, setSending] = useState(false); // button loading state

  // Send button or Enter key press se message bhejna
  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const text = value.trim();
    if (!text) return;

    setSending(true);
    try {
      await onSend(text);
      setValue(""); // message send hone ke baad field clear
    } finally {
      setSending(false);
    }
  }

  // Shift + Enter = new line | Enter = send
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit();
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Input form container */}
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-3 bg-slate-50 dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300"
      >
        {/* Textarea */}
        <textarea
          id="chat-input"
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={sending}
          className="flex-1 min-h-[44px] max-h-28 resize-none rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50"
          aria-label="Message"
        />

        {/* Send button */}
        <button
          type="submit"
          disabled={sending}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-2 transition disabled:opacity-50"
          title="Send Message"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>

      {/* Small hint below input */}
      <p className="text-xs text-slate-400 mt-1 text-center">
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
