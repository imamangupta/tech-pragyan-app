"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type PDFChatProps = {
  document: {
    id: string
    name: string
    summary: string
  }
}

export default function PDFChat({ document }: PDFChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `Hi there! I'm your AI assistant. Ask me anything about "${document.name}"`,
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    // In a real app, you would call your AI API here with the GROQ prompt
    setTimeout(() => {
      // Mock AI response based on the question
      let responseContent = ""

      if (input.toLowerCase().includes("supervised learning")) {
        responseContent =
          "Supervised learning is a type of machine learning where the model is trained on labeled data. The document explains that in supervised learning, the algorithm learns to map inputs to outputs based on example input-output pairs."
      } else if (input.toLowerCase().includes("algorithm")) {
        responseContent =
          "The document covers several machine learning algorithms including:\n\n- Linear Regression: Used for predicting continuous values\n- Decision Trees: Tree-like models for classification and regression\n- Random Forests: Ensemble method using multiple decision trees\n- Neural Networks: Deep learning models inspired by the human brain\n\nEach algorithm has its strengths and weaknesses depending on the specific use case."
      } else if (input.toLowerCase().includes("overfitting")) {
        responseContent =
          "Overfitting occurs when a model learns the training data too well, including its noise and outliers, which negatively impacts its performance on new, unseen data. The document recommends several techniques to prevent overfitting:\n\n1. Regularization (L1/L2)\n2. Cross-validation\n3. Early stopping\n4. Dropout (for neural networks)\n5. Reducing model complexity"
      } else {
        responseContent =
          "Based on the document, machine learning is a field of artificial intelligence that uses statistical techniques to give computer systems the ability to 'learn' from data without being explicitly programmed. The document covers various aspects including algorithms, evaluation metrics, and practical applications in different industries."
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto mb-4 pr-2">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user" ? "bg-blue-600 text-white" : "bg-blue-100 text-gray-800"
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.role === "assistant" ? <Bot className="h-4 w-4 mr-2" /> : <User className="h-4 w-4 mr-2" />}
                  <span className="text-xs opacity-70">{message.role === "assistant" ? "AI Assistant" : "You"}</span>
                </div>
                <div className="whitespace-pre-line">{message.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-blue-100 text-gray-800 rounded-lg p-4 max-w-[80%]">
                <div className="flex items-center">
                  <Bot className="h-4 w-4 mr-2" />
                  <span className="text-xs opacity-70">AI Assistant</span>
                </div>
                <div className="flex items-center mt-2">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about this PDF..."
          className="flex-1 border-blue-200 focus-visible:ring-blue-500"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-600 hover:bg-blue-700">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  )
}

