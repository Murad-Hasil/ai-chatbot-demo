// src/app/api/chat/route.ts
// -----------------------------------------------------------
// Author: MB
// Purpose: Handle chat requests safely and return AI responses
//          from the Gemini 2.0 Flash model with basic protections.
// -----------------------------------------------------------

import { NextResponse } from "next/server";

interface ChatRequest {
  message: string;
}

// POST /api/chat
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequest;
    const message = body?.message?.trim();

    // 1. Validate user input
    if (!message) {
      return NextResponse.json(
        { success: false, reply: "Please enter a message before sending." },
        { status: 400 }
      );
    }

    // 2. Frontend check bypass safety — backend also validates
    if (message.length > 500) {
      return NextResponse.json(
        { success: false, reply: "Message too long. Please keep it under 500 characters." },
        { status: 400 }
      );
    }

    // 3. Environment key check
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[Chat API] Missing GEMINI_API_KEY in environment.");
      return NextResponse.json(
        { success: false, reply: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    // 4. Gemini API call with safe limits
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            role: "system",
            parts: [
              {
                text:
                  "You are a polite AI assistant for demo purposes. Keep answers concise (under 100 words). Avoid performing large or sensitive tasks.",
              },
            ],
          },
          contents: [{ role: "user", parts: [{ text: message }] }],
          generationConfig: {
            maxOutputTokens: 300, // Limit output length
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();

    // 5. Extract AI reply safely
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.candidates?.[0]?.output ??
      "Sorry, I couldn’t generate a response.";

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error("[Chat API] Gemini API error:", error);
    return NextResponse.json(
      { success: false, reply: "Server error. Please try again in a moment." },
      { status: 500 }
    );
  }
}
