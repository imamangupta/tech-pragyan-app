"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function PDFUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a PDF file",
        variant: "destructive",
      })
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)

    // Simulate upload and processing
    try {
      // In a real app, you would upload the file to your server here
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate a fake ID for demo purposes
      const fileId = Math.random().toString(36).substring(2, 15)

      toast({
        title: "PDF uploaded successfully",
        description: "Your PDF is now being processed",
      })

      // Redirect to the summary page
      router.push(`/summary/${fileId}`)
    } catch (error) {
      console.log(error);
      
      toast({
        title: "Upload failed",
        description: "There was an error uploading your PDF",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="border-2 border-dashed border-blue-200 rounded-lg p-8 text-center hover:bg-blue-50 transition-colors">
        <input type="file" id="pdf-upload" className="hidden" accept="application/pdf" onChange={handleFileChange} />
        <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center justify-center">
          <FileText className="h-12 w-12 text-blue-500 mb-4" />
          <p className="text-lg font-medium text-blue-700 mb-1">{file ? file.name : "Choose a PDF file"}</p>
          <p className="text-sm text-gray-500">
            {file ? "Click the button below to upload" : "or drag and drop it here"}
          </p>
        </label>
      </div>

      {file && (
        <div className="mt-4">
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload and Summarize
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

