import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Truncate text if it's too long (Groq has token limits)
    const truncatedText = text.slice(0, 15000)

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes PDF content concisely and accurately.",
          },
          {
            role: "user",
            content: `Please summarize the following text from a PDF document. Focus on the main points and key information:\n\n${truncatedText}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
      },
    )

    return NextResponse.json({
      summary: response.data.choices[0].message.content,
    })
  } catch (error) {
    console.error("Error calling Groq API:", error)
    return NextResponse.json({ error: "Failed to summarize text" }, { status: 500 })
  }
}

