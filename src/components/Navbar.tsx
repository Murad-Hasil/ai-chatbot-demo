// src/components/Navbar.tsx
// -----------------------------------------------------------
// Author: MB
// Purpose: Responsive site header with logo, title, and portfolio button.
// -----------------------------------------------------------

"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 h-auto sm:h-14 px-4 py-2 sm:py-0">
        {/* Left: Logo */}
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
        <Link href="https://personal-portfolio-nextjs-ebon.vercel.app/" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="text-sm font-medium">
            ← Back to Portfolio
          </Button>
        </Link>
      </div>
    </header>
  );
}
