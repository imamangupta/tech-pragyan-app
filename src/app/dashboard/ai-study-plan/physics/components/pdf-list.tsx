"use client"

import { useState, useEffect } from "react"
import { FileText, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type PDFDocument = {
  id: string
  name: string
  uploadDate: string
  pages: number
}

export default function PDFList() {
  const [documents, setDocuments] = useState<PDFDocument[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching documents from an API
    const fetchDocuments = async () => {
      // In a real app, you would fetch from your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      const mockDocuments: PDFDocument[] = [
        {
          id: "doc1",
          name: "Machine Learning Basics.pdf",
          uploadDate: "2023-05-15",
          pages: 24,
        },
        {
          id: "doc2",
          name: "Data Structures and Algorithms.pdf",
          uploadDate: "2023-05-10",
          pages: 42,
        },
        {
          id: "doc3",
          name: "Web Development Guide.pdf",
          uploadDate: "2023-05-05",
          pages: 18,
        },
      ]

      setDocuments(mockDocuments)
      setLoading(false)
    }

    fetchDocuments()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-100 rounded-full mb-2"></div>
          <div className="h-4 w-32 bg-blue-100 rounded mb-2"></div>
          <div className="h-3 w-24 bg-blue-50 rounded"></div>
        </div>
      </div>
    )
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-blue-200 mx-auto mb-4" />
        <p className="text-gray-500">No PDFs uploaded yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-blue-800 text-sm md:text-base">{doc.name}</h3>
              <p className="text-xs text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {doc.uploadDate} • {doc.pages} pages
              </p>
            </div>
          </div>
          <Link href={`/dashboard/ai-study-plan/physics/summary/${doc.id}`}>
            <Button variant="ghost" size="sm" className="text-blue-700 hover:text-blue-800 hover:bg-blue-200">
              View <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

