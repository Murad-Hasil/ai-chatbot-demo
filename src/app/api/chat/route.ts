// src/app/api/chat/route.ts
// -----------------------------------------------------------
// Author: MB
// Purpose: Handle POST requests from the chatbot frontend and
//          communicate with the Gemini 2.0 Flash model.
// Usage:  Called by /chatbot page when user sends a message.
// -----------------------------------------------------------

import { NextResponse } from "next/server";

// Handles POST requests to /api/chat
export async function POST(req: Request) {
  try {
    // Parse the JSON body sent from the frontend
    const { message } = await req.json();

    // Validate input message
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { reply: "Message cannot be empty." },
        { status: 400 }
      );
    }

    // Send request to Gemini API
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

    // Extract reply text from Gemini's response.
    // Supports multiple Gemini response formats for safety.
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.candidates?.[0]?.content?.parts?.[0]?.rawText ??
      data?.candidates?.[0]?.output ??
      "Sorry, I couldn’t generate a response.";

    // Return the reply to the frontend
    return NextResponse.json({ reply });
  } catch (error) {
    // Log the error (server console)
    console.error("Gemini API error:", error);

    // Return a user-friendly message
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
