"use client";

import React from "react";
import { ThemeProvider } from "next-themes";

// ✅ Global providers wrapper (handles theme and other global contexts)
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}
