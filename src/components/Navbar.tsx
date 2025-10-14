// src/components/Navbar.tsx
// -----------------------------------------------------------
// Author: MB
// Purpose: Simple site header with project title and back link.
// -----------------------------------------------------------

"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between h-14 px-4">
        {/* Logo / Title */}
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100 select-none">
          🤖 AI Chatbot Demo
        </h1>

        {/* Back to portfolio link */}
        <Link
          href="https://portfolio-nextjs-woad-gamma.vercel.app/"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          ← Back to Portfolio
        </Link>
      </div>
    </header>
  );
}
