// src/app/layout.tsx
// -----------------------------------------------------------
// Root Layout
// Sets up metadata, fonts, icons, and global structure.
// -----------------------------------------------------------

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://ai-chatbot-demo-eight.vercel.app";

// Cache-busting version (update when icons change)
const ICON_VERSION = "?v=2";

export const metadata: Metadata = {
  title: "AI Chatbot Demo | Murad Hasil",
  description:
    "An interactive AI chatbot demo built with Next.js, Tailwind CSS, and the Gemini API. Designed for natural conversations, smooth UI, and modern automation features.",
  keywords: [
    "AI Chatbot",
    "Gemini API",
    "Next.js Chatbot",
    "Tailwind CSS",
    "AI Web App",
    "Chatbot Demo",
    "Automation Workflow",
    "Murad Hasil",
    "OpenAI Alternative",
  ],
  authors: [
    {
      name: "Murad Hasil",
      url: "https://personal-portfolio-nextjs-ebon.vercel.app/",
    },
  ],
  creator: "Murad Hasil",
  publisher: "Murad Hasil",
  applicationName: "AI Chatbot Demo",
  metadataBase: new URL(BASE_URL),

  openGraph: {
    title: "AI Chatbot Demo | Murad Hasil",
    description:
      "Try the AI Chatbot Demo — built with Next.js, Tailwind CSS, and Gemini API. Experience smooth chat, context handling, and modern UI.",
    url: BASE_URL,
    siteName: "AI Chatbot Demo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.png${ICON_VERSION}`,
        width: 1200,
        height: 630,
        alt: "AI Chatbot Demo by Murad Hasil",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Chatbot Demo | Murad Hasil",
    description:
      "Interactive chatbot built with Next.js, Tailwind CSS, and Gemini API — experience a clean UI and real-time chat flow.",
    creator: "@mbmuradhasil",
    images: [`${BASE_URL}/og-image.png${ICON_VERSION}`],
  },

  icons: {
    icon: [
      { url: `/icons/chatbot-icon-16.png${ICON_VERSION}`, sizes: "16x16", type: "image/png" },
      { url: `/icons/chatbot-icon-24.png${ICON_VERSION}`, sizes: "24x24", type: "image/png" },
      { url: `/icons/chatbot-icon-32.png${ICON_VERSION}`, sizes: "32x32", type: "image/png" },
      { url: `/icons/chatbot-icon-64.png${ICON_VERSION}`, sizes: "64x64", type: "image/png" },
      { url: `/icons/chatbot-icon-128.png${ICON_VERSION}`, sizes: "128x128", type: "image/png" },
      { url: `/icons/chatbot-icon-256.png${ICON_VERSION}`, sizes: "256x256", type: "image/png" },
      { url: `/icons/chatbot-icon-512.png${ICON_VERSION}`, sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: `/icons/chatbot-apple-icon.png${ICON_VERSION}`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload Inter font for better performance */}
        <link
          rel="preload"
          href="/_next/static/media/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main
            role="main"
            className="min-h-screen flex flex-col items-center justify-start p-6"
          >
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
