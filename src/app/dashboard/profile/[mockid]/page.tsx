"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"
import { useParams } from "next/navigation"
// Import test data
import { testData } from "@/lib/test-data"
import { BaseUrlApi } from "@/utils/constant"

export default function TestDataPage() {
  const [mounted, setMounted] = useState(false)
  const params = useParams()

  // const [subjects, setSubjects] = useState({})
  // const [testData, settestData] = useState(testData)



  useEffect(() => {
    setMounted(true)
    fetchData()
  }, [])





  const fetchData = async () => {


    // const response = await fetch(`${BaseUrlApi}/mocktest/id`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'id': params.mockid
    //   },
    // });
    // const json = await response.json();
    // setData(json.user)

    // setSubjects(json.data.answersData[0] )
    // settestData(json )
    // console.log(json.data);
  }


  if (!mounted) return null

  // const subjects = data?.answersData[0] 
  const subjects = Object.keys(testData.data.answersData[0])

  return (

    // <>

    // hi</>

    <div className="container mx-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Test Data Analysis</h1>
            <p className="text-muted-foreground mt-2">Review your JEE Main Mock Test performance</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                Total Score: {testData?.data?.resultData[0].totalScore}/300
              </Badge>
              <Badge variant="outline" className="text-sm">
                Correct: {testData?.data?.resultData[0].correctAnswers}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Incorrect: {testData.data.resultData[0].incorrectAnswers}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              {Object.entries(testData.data.resultData[0].sectionScores).map(([subject, score]) => (
                <Badge key={subject} variant="outline" className="text-sm capitalize">
                  {subject}: {score}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue={subjects[0]} className="w-full">
          <TabsList className="w-full justify-start mb-6 overflow-x-auto">
            {subjects?.map((subject) => (
              <TabsTrigger key={subject} value={subject} className="capitalize">
                {subject}
              </TabsTrigger>
            ))}
          </TabsList>

          {subjects?.map((subject) => (
            <TabsContent key={subject} value={subject}>
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{subject} Questions</CardTitle>
                  <CardDescription>Review your answers and correct solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {Object.entries(testData.data.answersData[0][subject]).map(([questionId, question]) => (
                      <AccordionItem
                        key={questionId}
                        value={questionId}
                        className="border rounded-lg mb-4 overflow-hidden"
                      >
                        <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 group">
                          <div className="flex items-center gap-3 text-left">
                            <div
                              className={`p-1 rounded-full ${question.status ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                            >
                              {question.status ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                            </div>
                            <span className="font-medium">Question {questionId}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pt-2 pb-4">
                          <AnimatePresence>
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="space-y-4">
                                <p className="text-lg">{question.text}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {question.options.map((option) => (
                                    <div
                                      key={option.id}
                                      className={`p-3 rounded-lg border ${option.id === question.correctAnswer
                                          ? "bg-green-50 border-green-200"
                                          : option.id === question.selectedValue
                                            ? "bg-red-50 border-red-200"
                                            : "bg-background"
                                        }`}
                                    >
                                      <div className="flex items-start gap-2">
                                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                          {option.id.toUpperCase()}
                                        </div>
                                        <div>
                                          {option.label}
                                          {option.id === question.correctAnswer && (
                                            <Badge variant="success" className="ml-2">
                                              Correct
                                            </Badge>
                                          )}
                                          {option.id === question.selectedValue &&
                                            option.id !== question.correctAnswer && (
                                              <Badge variant="destructive" className="ml-2">
                                                Your Answer
                                              </Badge>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                  <div className="flex-1 p-3 rounded-lg bg-muted/30">
                                    <p className="font-medium">Your Answer:</p>
                                    <p className="mt-1">
                                      {question.options.find((o) => o.id === question.selectedValue)?.label ||
                                        "Not answered"}
                                    </p>
                                  </div>
                                  <div className="flex-1 p-3 rounded-lg bg-muted/30">
                                    <p className="font-medium">Correct Answer:</p>
                                    <p className="mt-1">
                                      {question.options.find((o) => o.id === question.correctAnswer)?.label}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  )
}





