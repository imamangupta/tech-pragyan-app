import Sidebar from '@/components/Sidebar'
import React from 'react'

import { Upload } from "lucide-react"
import PDFUploader from "./components/pdf-uploader"
import PDFList from "./components/pdf-list"

export default function page() {











    return (

        <div className="flex min-h-screen bg-gray-50">

            <Sidebar />


              <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">PDF Summarizer & Chat</h1>
        <p className="text-center text-gray-600 mb-12">
          Upload your PDFs, get AI-powered summaries, and chat with your documents
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
              <Upload className="mr-2 h-5 w-5" /> Upload New PDF
            </h2>
            <PDFUploader />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Your PDF Library</h2>
            <PDFList />
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-medium text-blue-700 mb-2">Upload PDF</h3>
              <p className="text-gray-600">Upload any PDF document you need to analyze or study</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-medium text-blue-700 mb-2">AI Summarizes</h3>
              <p className="text-gray-600">Our AI extracts key points and creates a concise summary</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-medium text-blue-700 mb-2">Chat & Download</h3>
              <p className="text-gray-600">Ask questions about your PDF and download summaries</p>
            </div>
          </div>
        </div>
      </div>
    </main>
        </div>
    )
}
