"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

type PDFSummaryProps = {
  document: {
    id: string
    name: string
    summary: string
    uploadDate: string
    pages: number
  }
}

export default function PDFSummary({ document }: PDFSummaryProps) {
  const { toast } = useToast()

  const handleDownload = () => {
    // In a real app, you would generate a PDF here
    // For this demo, we'll just show a toast
    toast({
      title: "Summary downloaded",
      description: "Your PDF summary has been downloaded",
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-700">Key Points Summary</h2>
        <Button onClick={handleDownload} className="bg-blue-100 text-blue-700 hover:bg-blue-200">
          <Download className="mr-2 h-4 w-4" />
          Download Summary
        </Button>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="prose max-w-none">
          {document.summary.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-800">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

