import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// Base URL (safe for local + production)
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://ai-chatbot-demo-eight.vercel.app";

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
      url: "https://portfolio-nextjs-woad-gamma.vercel.app/",
    },
  ],
  creator: "Murad Hasil",
  publisher: "Murad Hasil",
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
        url: `${BASE_URL}/og-image.png`,
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
    images: [`${BASE_URL}/og-image.png`],
  },

  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-24x24.png", sizes: "24x24", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/icons/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/icons/favicon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/icons/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
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
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen flex flex-col items-center justify-start p-6">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
