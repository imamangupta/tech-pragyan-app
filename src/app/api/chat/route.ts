import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(req: NextRequest) {
  try {
    const { documentId, message } = await req.json()

    if (!documentId || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Retrieve the document content from your database
    // 2. Send the document content and user message to the GROQ API

    // For demo purposes, we'll simulate this process
    const documentContent = "This is a sample PDF about machine learning concepts..."

    // Use the GROQ API to generate a response
    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      system:
        "You are an AI assistant specialized in reading and answering questions about PDF documents. Your task is to provide accurate, helpful responses based on the document content. Keep your answers concise and relevant to the user's question.",
      prompt: `Document content: ${documentContent}\n\nUser question: ${message}\n\nPlease answer the question based only on the document content.`,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in chat:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}

