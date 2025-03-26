"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { FileText, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import PDFSummary from "../../components/pdf-summary"
import PDFChat from "../../components/pdf-chat"

export default function SummaryPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const [activeTab, setActiveTab] = useState<"summary" | "chat">("summary")
  const [loading, setLoading] = useState(true)
  const [document, setDocument] = useState<{
    id: string
    name: string
    summary: string
    uploadDate: string
    pages: number
  } | null>(null)

  useEffect(() => {
    // Simulate fetching document data
    const fetchDocument = async () => {
      // In a real app, you would fetch from your API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock data
      const mockDocument = {
        id: id as string,
        name: "Machine Learning Basics.pdf",
        summary:
          "This document provides a comprehensive introduction to machine learning concepts. Key points include:\n\n• Supervised vs. Unsupervised Learning: The document explains the difference between these two approaches, with supervised learning using labeled data and unsupervised learning finding patterns in unlabeled data.\n\n• Common Algorithms: Various algorithms are discussed including linear regression, decision trees, random forests, and neural networks.\n\n• Evaluation Metrics: The document covers how to evaluate model performance using metrics like accuracy, precision, recall, and F1 score.\n\n• Overfitting and Underfitting: These common challenges are explained along with techniques to address them such as regularization and cross-validation.\n\n• Feature Engineering: The importance of selecting and transforming features is emphasized as a critical step in the machine learning pipeline.\n\n• Practical Applications: Real-world applications in various domains including healthcare, finance, and marketing are presented with case studies.",
        uploadDate: "2023-05-15",
        pages: 24,
      }

      setDocument(mockDocument)
      setLoading(false)
    }

    fetchDocument()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-blue-700 font-medium">Loading document...</p>
        </div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 font-medium">Document not found</p>
          <Button onClick={() => router.push("/")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6 text-blue-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
          <div className="flex items-center mb-6">
            <FileText className="h-10 w-10 text-blue-600 mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-blue-800">{document.name}</h1>
              <p className="text-sm text-gray-500">
                Uploaded on {document.uploadDate} • {document.pages} pages
              </p>
            </div>
          </div>

          <div className="flex space-x-2 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("summary")}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === "summary"
                  ? "text-blue-700 border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === "chat" ? "text-blue-700 border-b-2 border-blue-500" : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Chat with PDF
            </button>
          </div>

          {activeTab === "summary" ? <PDFSummary document={document} /> : <PDFChat document={document} />}
        </div>
      </div>
    </div>
  )
}

