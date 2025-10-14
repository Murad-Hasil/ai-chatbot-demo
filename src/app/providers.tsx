// src/app/providers.tsx
// -----------------------------------------------------------
// Author: MB
// Purpose: Wraps the entire app with global providers (e.g. theme).
// -----------------------------------------------------------

"use client";

import React from "react";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
