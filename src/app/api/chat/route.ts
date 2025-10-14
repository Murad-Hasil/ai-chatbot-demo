// src/app/api/chat/route.ts
// -----------------------------------------------------------
// Author: MB
// Purpose: API route that receives user messages and
//          fetches AI replies from the Gemini 2.0 Flash model.
// -----------------------------------------------------------

import { NextResponse } from "next/server";

// POST /api/chat
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Basic validation
    if (!message || !message.trim()) {
      return NextResponse.json(
        { reply: "Please enter a message before sending." },
        { status: 400 }
      );
    }

    // Check for missing API key
    if (!process.env.GEMINI_API_KEY) {
      console.error("Missing GEMINI_API_KEY in environment.");
      return NextResponse.json(
        { reply: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    // Call Gemini API
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    // Parse API response
    const data = await res.json();

    // Safely extract model reply
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.candidates?.[0]?.content?.parts?.[0]?.rawText ??
      data?.candidates?.[0]?.output ??
      "Sorry, I couldn’t generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { reply: "Server error. Please try again in a moment." },
      { status: 500 }
    );
  }
}
