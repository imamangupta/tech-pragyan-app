"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
  id: number
  text: string
  options: {
    id: string
    value: string
    label: string
  }[]
  points: string
}

export default function page() {

    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})

    const questions: Question[] = [
      {
        id: 1,
        text: "A car accelerates uniformly from rest to a speed of 20 m/s in 5 seconds. What is its acceleration?",
        options: [
          { id: "a", value: "2", label: "2 m/s²" },
          { id: "b", value: "4", label: "4 m/s²" },
          { id: "c", value: "5", label: "5 m/s²" },
          { id: "d", value: "10", label: "10 m/s²" },
        ],
        points: "4/-1",
      },
      {
        id: 2,
        text: "A car accelerates uniformly from rest to a speed of 20 m/s in 5 seconds. What is its acceleration?",
        options: [
          { id: "a", value: "2", label: "2 m/s²" },
          { id: "b", value: "4", label: "4 m/s²" },
          { id: "c", value: "5", label: "5 m/s²" },
          { id: "d", value: "10", label: "10 m/s²" },
        ],
        points: "4/-1",
      },
      {
        id: 3,
        text: "A car accelerates uniformly from rest to a speed of 20 m/s in 5 seconds. What is its acceleration?",
        options: [
          { id: "a", value: "2", label: "2 m/s²" },
          { id: "b", value: "4", label: "4 m/s²" },
          { id: "c", value: "5", label: "5 m/s²" },
          { id: "d", value: "10", label: "10 m/s²" },
        ],
        points: "4/-1",
      },
    ]
  
    const handleAnswerChange = (questionId: number, value: string) => {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: value,
      }))
    }
  return (
    <>
    
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Physic test | Time left : <span className="text-red-500">10min</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Questions Column */}
        <div className="flex-1 space-y-6">
          {questions.map((question) => (
            <Card key={question.id} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="font-medium">Question : {question.id}</div>
                  <div>{question.points}</div>
                </div>

                <p className="mb-4">{question.text}</p>

                <RadioGroup
                  value={selectedAnswers[question.id]}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                  className="space-y-3"
                >
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 border rounded-md p-2">
                      <RadioGroupItem value={option.value} id={`q${question.id}-${option.id}`} className="ml-2" />
                      <Label htmlFor={`q${question.id}-${option.id}`} className="flex items-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border mr-2">
                          {option.id.toUpperCase()}
                        </span>
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Panel */}
        <div className="w-full lg:w-[300px]">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="font-medium">User</span>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-1">Analysis</h3>
                <p className="text-sm text-gray-600">Answered: 0 | Unanswered: 10</p>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-4">
                {Array.from({ length: 10 }, (_, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className={`w-full h-10 bg-gray-800 text-white hover:bg-gray-700 ${i === 0 ? "bg-black" : ""}`}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>

              <Button className="w-full bg-black text-white hover:bg-gray-800">Submit</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500 text-sm">All Right Reserved to PrepGen | © PrepGen</footer>
    </div>
    
    </>
  )
}
