// @ts-nocheck
"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Beaker, BookOpen, Calculator, ChevronRight } from "lucide-react"
import Link from "next/link"

// Import test data
import { testData } from "@/lib/test-data"
import Sidebar from "@/components/Sidebar"

const subjectIcons = {
  physics: BookOpen,
  chemistry: Beaker,
  mathematics: Calculator,
}

const subjectColors = {
  physics: "from-blue-500 to-blue-700",
  chemistry: "from-purple-500 to-purple-700",
  mathematics: "from-green-500 to-green-700",
}

export default function SubjectsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const subjects = Object.keys(testData.data.answersData[0])
  const sectionScores = testData.data.resultData[0].sectionScores

  return (

    <div className="flex min-h-screen bg-zinc-200">

      <Sidebar />

      <main className="flex-1 p-6" >


        <div className="container mx-auto py-8 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold mb-2">Subject Navigation</h1>
            <p className="text-muted-foreground mb-8">Explore your performance in different subjects</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subjects.map((subject, index) => {
                const Icon = subjectIcons[subject] || BookOpen
                const gradientColor = subjectColors[subject] || "from-gray-500 to-gray-700"
                const questionCount = Object.keys(testData.data.answersData[0][subject]).length

                return (
                  <motion.div
                    key={subject}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      y: -10,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    className="perspective-1000"
                  >
                    <div className="transform-style-3d transition-transform duration-500 relative">
                      <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-10 pointer-events-none`}
                        />
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              <Icon className="h-6 w-6" />
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {questionCount} Questions
                            </Badge>
                          </div>
                          <CardTitle className="text-2xl capitalize mt-4">{subject}</CardTitle>
                          <CardDescription>Review your performance and analyze questions</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Score:</span>
                              <span className="font-medium">{sectionScores[subject]}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div
                                className="bg-primary h-2.5 rounded-full"
                                style={{ width: `${Math.max(0, (sectionScores[subject] / -20) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="w-full group">
                            <Link href={`/dashboard/ai-study-plan/${subject}`} className="flex items-center justify-between">
                              <span>View Analysis</span>
                              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

      </main>
    </div>


  )
}

