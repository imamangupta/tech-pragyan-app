// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Loader2, Upload, FileText, RefreshCw, AlertCircle } from "lucide-react"
// import axios from "axios"

// // PDF.js worker
// import * as pdfjsLib from "pdfjs-dist"
// import "pdfjs-dist/build/pdf.worker.entry"

// export default function Home() {
//   const [file, setFile] = useState<File | null>(null)
//   const [extractedText, setExtractedText] = useState<string>("")
//   const [summary, setSummary] = useState<string>("")
//   const [loading, setLoading] = useState<boolean>(false)
//   const [extracting, setExtracting] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)
//   const [activeTab, setActiveTab] = useState<string>("upload")

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     setError(null)
//     const selectedFile = e.target.files?.[0]

//     if (!selectedFile) return

//     if (selectedFile.type !== "application/pdf") {
//       setError("Please upload a PDF file")
//       setFile(null)
//       return
//     }

//     setFile(selectedFile)
//     setExtracting(true)

//     try {
//       const text = await extractTextFromPDF(selectedFile)
//       setExtractedText(text)
//       setActiveTab("preview")
//     } catch (err) {
//       setError("Failed to extract text from PDF")
//       console.error(err)
//     } finally {
//       setExtracting(false)
//     }
//   }

//   const extractTextFromPDF = async (pdfFile: File): Promise<string> => {
//     const arrayBuffer = await pdfFile.arrayBuffer()
//     const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
//     let fullText = ""

//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i)
//       const textContent = await page.getTextContent()
//       const pageText = textContent.items.map((item: any) => item.str).join(" ")
//       fullText += pageText + "\n\n"
//     }

//     return fullText
//   }

//   const handleSummarize = async () => {
//     if (!extractedText) return

//     setLoading(true)
//     setSummary("")
//     setError(null)

//     try {
//       const response = await axios.post("/api/summarize", { text: extractedText })
//       setSummary(response.data.summary)
//       setActiveTab("summary")
//     } catch (err) {
//       setError("Failed to summarize text. Please try again.")
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleReset = () => {
//     setFile(null)
//     setExtractedText("")
//     setSummary("")
//     setError(null)
//     setActiveTab("upload")
//   }

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-950 text-gray-100">
//       <Card className="w-full max-w-3xl bg-gray-900 border-gray-800 shadow-xl">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center">PDF Summarizer</CardTitle>
//           <CardDescription className="text-center text-gray-400">
//             Upload a PDF file to extract and summarize its content using Groq AI
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {error && (
//             <Alert variant="destructive" className="mb-4 bg-red-950 border-red-800">
//               <AlertCircle className="h-4 w-4" />
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-800">
//               <TabsTrigger value="upload">Upload</TabsTrigger>
//               <TabsTrigger value="preview" disabled={!extractedText}>
//                 Preview
//               </TabsTrigger>
//               <TabsTrigger value="summary" disabled={!summary}>
//                 Summary
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="upload" className="mt-0">
//               <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-12 text-center">
//                 <Upload className="h-12 w-12 text-gray-500 mb-4" />
//                 <p className="mb-4 text-gray-400">Upload your PDF file</p>
//                 <label htmlFor="pdf-upload">
//                   <div className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md cursor-pointer transition-colors">
//                     Choose File
//                   </div>
//                   <input
//                     id="pdf-upload"
//                     type="file"
//                     accept="application/pdf"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                 </label>
//                 {file && <p className="mt-4 text-sm text-gray-400">{file.name}</p>}
//                 {extracting && (
//                   <div className="mt-4 flex items-center">
//                     <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                     <span className="text-sm text-gray-400">Extracting text...</span>
//                   </div>
//                 )}
//               </div>
//             </TabsContent>

//             <TabsContent value="preview" className="mt-0">
//               <div className="border border-gray-800 rounded-lg p-4 bg-gray-950 max-h-96 overflow-y-auto">
//                 <div className="flex items-center mb-2">
//                   <FileText className="h-5 w-5 mr-2 text-gray-400" />
//                   <h3 className="text-lg font-medium">Extracted Text</h3>
//                 </div>
//                 <p className="whitespace-pre-line text-gray-300 text-sm">{extractedText}</p>
//               </div>
//               <div className="flex justify-end mt-4 space-x-2">
//                 <Button variant="outline" onClick={handleReset}>
//                   Clear
//                 </Button>
//                 <Button onClick={handleSummarize} disabled={loading}>
//                   {loading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Summarizing...
//                     </>
//                   ) : (
//                     "Summarize"
//                   )}
//                 </Button>
//               </div>
//             </TabsContent>

//             <TabsContent value="summary" className="mt-0">
//               <div className="border border-gray-800 rounded-lg p-4 bg-gray-950 max-h-96 overflow-y-auto">
//                 <h3 className="text-lg font-medium mb-2">Summary</h3>
//                 <p className="whitespace-pre-line text-gray-300">{summary}</p>
//               </div>
//               <div className="flex justify-end mt-4">
//                 <Button variant="outline" onClick={handleReset} className="flex items-center">
//                   <RefreshCw className="mr-2 h-4 w-4" />
//                   Start Over
//                 </Button>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//         <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
//           <p className="text-xs text-gray-500">Powered by Next.js, Tailwind CSS, and Groq AI</p>
//         </CardFooter>
//       </Card>
//     </main>
//   )
// }

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
