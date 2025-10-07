"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur">
      <div className="max-w-4xl mx-auto flex items-center justify-between h-14 px-4">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          🤖 AI Chatbot Demo
        </h1>
        <Link
          href="https://portfolio-nextjs-woad-gamma.vercel.app/"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Portfolio
        </Link>
      </div>
    </header>
  );
}
