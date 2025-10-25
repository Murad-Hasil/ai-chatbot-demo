// src/components/Navbar.tsx
// -----------------------------------------------------------
// Author: MB
// Purpose: Simple site header with logo, project title, and back link.
// -----------------------------------------------------------

"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between h-14 px-4">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-2 select-none">
          <Image
            src="/logo.png"
            alt="AI Chatbot logo by Murad Hasil"
            width={185}
            height={32}
            className="rounded-md h-auto w-auto max-h-8 sm:max-h-9"
            priority
          />
        </div>

        {/* Right: Back to portfolio */}
        <Link
          href="https://personal-portfolio-nextjs-ebon.vercel.app/"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          ← Back to Portfolio
        </Link>
      </div>
    </header>
  );
}
