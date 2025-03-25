"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Clock, Users, Volume2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import * as faceapi from "face-api.js"
// import FaceDetech from "../components/FaceDetech"
import useUnloadConfirmation from "@/hooks/use-leavetabcomfirm"
import { useParams } from "next/navigation"
import { allQuestion, BaseUrlApi, chemistryQuestion, mathematicsQuestion, physicsQuestion } from "@/utils/constant"
import { useRouter } from 'next/navigation'

interface Question {
  id: number
  text: string
  options: {
    id: string
    value: string
    label: string
  }[]
  points: string
  correctAnswer: string
}

interface Section {
  id: string
  name: string
  questions: Question[]
}

interface TestItem {
  id: string
  title: string
  marks: number
  duration: number
  isSelected?: boolean
  subject: string[]
}

const tests: TestItem[] = [
  { id: "1", title: "Jee Main Mock Test", marks: 300, duration: 180, subject: ["physics", "chemistry", "mathematics"] },
  { id: "2", title: "Jee Physics Mock Test", marks: 100, duration: 60, subject: ["physics"] },
  { id: "3", title: "Jee Chemistry Mock Test", marks: 100, duration: 60, subject: ["chemistry"] },
  { id: "4", title: "Jee Mathematics Mock Test", marks: 100, duration: 60, subject: ["mathematics"] },
]


export default function MockTestPage() {
  const params = useParams()
  const filteredTest = tests.find((test) => test.id === params.id)
  // console.log(filteredTest)
  const myQuestionData = params.id === '1' 
  ? allQuestion 
  : params.id === '2' 
  ? physicsQuestion
  : params.id === '3' 
  ? chemistryQuestion
  : params.id === '4' 
  ? mathematicsQuestion
  : allQuestion;

  const sections = myQuestionData

  // const filteredQuestionData = questionData.filter(section =>
  //   filteredTest?.subject.some(subj =>
  //     section.id.toLowerCase() === subj.toLowerCase()
  //   )
  // );
  // setSections(filteredQuestionData)

  interface AnswerData {
    text: string
    options: {
      id: string
      value: string
      label: string
    }[]
    correctAnswer: string
    selectedValue: string
    status: boolean
  }

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Record<number, AnswerData>>>({
    physics: {},
    mathematics: {},
    chemistry: {},
  })

  const [selectedSection, setSelectedSection] = useState<string>(filteredTest?.subject[0] || "")
  const [timeRemaining, setTimeRemaining] = useState(sections.length * 60 * 60) // 180 minutes in seconds
  const [windowResized, setWindowResized] = useState(false)
  const [initialWindowSize, setInitialWindowSize] = useState({ width: 0, height: 0 })
  const [multipleFacesDetected, setMultipleFacesDetected] = useState(false)
  const [noiseDetected, setNoiseDetected] = useState(false)
  const [testSubmitted, setTestSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [testResults, setTestResults] = useState<{
    totalScore: number
    sectionScores: Record<string, number>
    correctAnswers: number
    incorrectAnswers: number
    unanswered: number
  } | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const faceDetectionIntervalRef = useRef<number | null>(null)
  const noiseDetectionIntervalRef = useRef<number | null>(null)
  

    const router = useRouter()

  useUnloadConfirmation("You have unsaved changes. Are you sure you want to leave?")

  const currentSection = sections.find((section) => section.id === selectedSection) || sections[0]

  const handleAnswerChange = (questionId: number, selectedValue: string) => {
    // Find the current question object
    const question = currentSection.questions.find((q) => q.id === questionId)

    if (!question) return

    const isCorrect = question.correctAnswer === selectedValue

    setSelectedAnswers((prev) => ({
      ...prev,
      [selectedSection]: {
        ...prev[selectedSection],
        [questionId]: {
          text: question.text,
          options: question.options,
          correctAnswer: question.correctAnswer,
          selectedValue: selectedValue,
          status: isCorrect,
        },
      },
    }))
  }

  // const handleAnswerChange = (
  //   question: {
  //     id: number;
  //     text: string;
  //     options: { id: string; value: string; label: string }[];
  //     points: string;
  //     correctAnswer: string;
  //   },
  //   selectedValue: string
  // ) => {
  //   const isCorrect = question.correctAnswer === selectedValue;

  //   setSelectedAnswers((prev) => ({
  //     ...prev,
  //     [selectedSection]: {
  //       ...prev[selectedSection],
  //       [question.id]: {
  //         text: question.text,
  //         options: question.options,
  //         correctAnswer: question.correctAnswer,
  //         selectedValue: selectedValue,
  //         status: isCorrect,
  //       },
  //     },
  //   }));
  // };

  const getAnsweredCount = (sectionId: string) => {
    return Object.keys(selectedAnswers[sectionId] || {}).length
  }

  const getTotalAnsweredCount = () => {
    return Object.values(selectedAnswers).reduce((total, section) => total + Object.keys(section).length, 0)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${secs}s`
  }

  // Initialize camera with face detection
  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true, // Also request audio for noise detection
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      // Initialize audio context for noise detection
      const audioContext = new (
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      )()

      // const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      audioContextRef.current = audioContext

      const audioSource = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      audioSource.connect(analyser)
      analyserRef.current = analyser

      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      dataArrayRef.current = dataArray

      // Start face detection simulation
      startFaceDetection()

      // Start noise detection
      startNoiseDetection()
    } catch (err) {
      console.error("Error accessing media devices:", err)
    }
  }

  // Simulate face detection (in a real app, you would use a face detection library)
  const startFaceDetection = () => {
    // Clear any existing interval
    if (faceDetectionIntervalRef.current) {
      window.clearInterval(faceDetectionIntervalRef.current)
    }

    // Set up face detection simulation
    // In a real implementation, you would use a face detection library
    faceDetectionIntervalRef.current = window.setInterval(() => {
      // Simulate occasional detection of multiple faces (random for demo)
      const multipleFaces = Math.random() > 0.9
      console.log(multipleFaces)

      // setMultipleFacesDetected(multipleFaces)
    }, 3000)
  }

  // Start noise detection
  const startNoiseDetection = () => {
    // Clear any existing interval
    if (noiseDetectionIntervalRef.current) {
      window.clearInterval(noiseDetectionIntervalRef.current)
    }

    noiseDetectionIntervalRef.current = window.setInterval(() => {
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current)

        // Calculate average volume level
        const average = dataArrayRef.current.reduce((sum, value) => sum + value, 0) / dataArrayRef.current.length

        // Set noise detected if above threshold (adjust as needed)
        setNoiseDetected(average > 50)
      }
    }, 500)
  }

  // Calculate test results based on JEE Main rules
  const calculateResults = () => {
    let totalScore = 0
    const sectionScores: Record<string, number> = {}
    let correctAnswers = 0
    let incorrectAnswers = 0
    let unanswered = 0

    sections.forEach((section) => {
      let sectionScore = 0

      section.questions.forEach((question) => {
        const userAnswerData = selectedAnswers[section.id][question.id]

        if (!userAnswerData) {
          unanswered++
        } else if (userAnswerData.selectedValue === question.correctAnswer) {
          // Correct answer: +4 points
          sectionScore += 4
          correctAnswers++
        } else {
          // Incorrect answer: -1 point (negative marking)
          sectionScore -= 1
          incorrectAnswers++
        }
      })

      sectionScores[section.id] = sectionScore
      totalScore += sectionScore
    })

    return {
      totalScore,
      sectionScores,
      correctAnswers,
      incorrectAnswers,
      unanswered,
    }
  }

  const handleSubmitTest = async () => {
    const results = calculateResults()
    setTestResults(results)
    // setTestSubmitted(true)
    setLoading(true)

// Log all test data to console





    const token = localStorage.getItem('token');
    const response2 = await fetch(`${BaseUrlApi}/user/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const json2 = await response2.json();
  
    // console.log(json2.user.id);
    console.log("Test Submission Data:", {
      filteredTest,
      answers: selectedAnswers,
      results: results,
      timeSpent: 180 * 60 - timeRemaining,
      securityEvents: {
        windowResizeAttempts: windowResized,
        multipleFacesDetected: multipleFacesDetected,
        noiseDetected: noiseDetected,
      },
    })



    const timeSpent = sections.length * 60 - timeRemaining
    const securityEvents = {
      windowResizeAttempts: windowResized,
      multipleFacesDetected: multipleFacesDetected,
      noiseDetected: noiseDetected,
    }


    const response = await fetch(`${BaseUrlApi}/mocktest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: json2.user.id, subject: filteredTest,
        answersData: selectedAnswers, resultData: results,
        timeSpent: timeSpent , securityEvents: securityEvents
      })
    })
    const json = await response.json()
    if (json) {
      router.push("/dashboard")
    }



    
  }

  // Initialize window size monitoring, camera, and countdown timer on mount
  useEffect(() => {
    // Store initial window size
    setInitialWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Set up resize event listener
    const handleResize = () => {
      setWindowSize(window.screen.availWidth, window.screen.availHeight)
      // Check if window size has changed significantly (more than 50px in any dimension)
      if (
        Math.abs(window.innerWidth - initialWindowSize.width) > 50 ||
        Math.abs(window.innerHeight - initialWindowSize.height) > 50
      ) {
        setWindowResized(true)
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("focus", handleResize)

    // Initialize camera
    initCamera()

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitTest() // Auto-submit when time runs out
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(timer)

      if (faceDetectionIntervalRef.current) {
        clearInterval(faceDetectionIntervalRef.current)
      }

      if (noiseDetectionIntervalRef.current) {
        clearInterval(noiseDetectionIntervalRef.current)
      }

      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }

      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const setWindowSize = (width: number, height: number): void => {
    window.resizeTo(width, height)
  }

  const [isModelLoaded, setIsModelLoaded] = useState(false)

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })
      .catch((err) => console.error("❌ Error accessing webcam:", err))
  }

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "/models" // Ensure models are in public/models
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)

        setIsModelLoaded(true)
        // console.log("✅ Models Loaded")
        startVideo()
      } catch (error) {
        console.error("❌ Error loading models:", error)
      }
    }

    loadModels()
  }, [])

  const handleVideoPlay = () => {
    if (!canvasRef.current || !videoRef.current) return

    const canvas = canvasRef.current
    const video = videoRef.current

    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight,
    }

    faceapi.matchDimensions(canvas, displaySize)

    const detectFaces = async () => {
      try {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()

        const count = detections.length
        // setFaceCount(count);

        // console.log(`👥 Number of people detected: ${count}`)
        if (count > 1) {
          setMultipleFacesDetected(true)
          // console.log("many epeop")
        } else {
          setMultipleFacesDetected(false)
        }

        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          faceapi.draw.drawDetections(canvas, resizedDetections)
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        }
      } catch (error) {
        console.error("❌ Face detection error:", error)
      }

      requestAnimationFrame(detectFaces)
    }

    detectFaces()
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      {/* Warning Dialog for Window Resize */}
      <Dialog open={windowResized} onOpenChange={setWindowResized}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Exam Violation Detected
            </DialogTitle>
            <DialogDescription>
              Window resizing is not allowed during the exam. Please restore your browser window to its original size to
              continue.
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                This action has been logged and may result in disqualification.
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button
              variant="destructive"
              onClick={() => {
                setWindowResized(false)
              }}
            >
              Acknowledge
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Test Results Dialog */}
      <Dialog open={testSubmitted} onOpenChange={setTestSubmitted}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Test Results</DialogTitle>
            <DialogDescription>Your test has been submitted. Here are your results:</DialogDescription>
          </DialogHeader>
          {testResults && (
            <div className="space-y-4">
              <div className="text-2xl font-bold text-center">Total Score: {testResults.totalScore}</div>

              <div className="grid gap-2">
                <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50 rounded-md">
                  <div>Physics:</div>
                  <div className="font-medium text-right">{testResults.sectionScores.physics}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50 rounded-md">
                  <div>Mathematics:</div>
                  <div className="font-medium text-right">{testResults.sectionScores.mathematics}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50 rounded-md">
                  <div>Chemistry:</div>
                  <div className="font-medium text-right">{testResults.sectionScores.chemistry}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-green-50 rounded-md">
                  <div className="text-sm text-green-600">Correct</div>
                  <div className="font-bold">{testResults.correctAnswers}</div>
                </div>
                <div className="p-2 bg-red-50 rounded-md">
                  <div className="text-sm text-red-600">Incorrect</div>
                  <div className="font-bold">{testResults.incorrectAnswers}</div>
                </div>
                <div className="p-2 bg-gray-50 rounded-md">
                  <div className="text-sm text-gray-600">Unanswered</div>
                  <div className="font-bold">{testResults.unanswered}</div>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Scoring: +4 for correct answers, -1 for incorrect answers (JEE Main rules)
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold flex items-center">
          Mock Test | <Clock className="ml-2 mr-1 h-5 w-5 text-red-500" />
          <span className="text-red-500">{formatTime(timeRemaining)}</span>
        </h1>
      </div>

      {/* Warning Alerts */}
      <div className="space-y-2 mb-4">
        {multipleFacesDetected && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Multiple Faces Detected</AlertTitle>
            <AlertDescription>
              Only one person should be visible in the camera. This violation has been recorded.
            </AlertDescription>
          </Alert>
        )}

        {noiseDetected && (
          <Alert variant="default" className="bg-yellow-50 border-yellow-200">
            <Volume2 className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Noise Detected</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Please maintain silence during the exam. Excessive noise may be flagged as a violation.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Questions Column - Scrollable */}
        <div className="flex-1 space-y-6 overflow-y-auto">
          {currentSection.questions.map((question) => (
            <Card key={question.id} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="font-medium">
                    {currentSection.name} Question {question.id}
                  </div>
                  <div>{question.points}</div>
                </div>

                <p className="mb-4">{question.text}</p>

                <RadioGroup
                  value={selectedAnswers[selectedSection][question.id]?.selectedValue || ""}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                  className="space-y-3"
                >
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 border rounded-md p-2">
                      <RadioGroupItem
                        value={option.value}
                        id={`${selectedSection}-q${question.id}-${option.id}`}
                        className="ml-2"
                      />
                      <Label
                        htmlFor={`${selectedSection}-q${question.id}-${option.id}`}
                        className="flex items-center w-full"
                      >
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

        {/* User Panel - Fixed */}
        <div className="w-full lg:w-[300px] lg:sticky lg:top-6 self-start">
          <Card className="shadow-sm mb-4">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="font-medium">Test Taker</span>
              </div>

              {/* Section Selector */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Section</h3>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.name} ({getAnsweredCount(section.id)}/30)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-1">Analysis</h3>
                <p className="text-sm text-gray-600">
                  Answered: {getTotalAnsweredCount()} | Unanswered: {90 - getTotalAnsweredCount()}
                </p>
              </div>

              {/* GitHub-style contribution grid */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Progress ({currentSection.name})</h3>
                <div className="grid grid-cols-10 gap-1">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-full aspect-square rounded-sm ${selectedAnswers[selectedSection][i + 1] ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      title={`Question ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Question navigation */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Navigation</h3>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 30 }, (_, i) => (
                    <Button
                      key={i}
                      variant={selectedAnswers[selectedSection][i + 1] ? "default" : "outline"}
                      className={`w-full h-8 p-0 ${selectedAnswers[selectedSection][i + 1] ? "bg-green-500 hover:bg-green-600" : ""
                        }`}
                      onClick={() => {
                        const element = document.querySelector(`[id^="${selectedSection}-q${i + 1}-"]`)
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "center" })
                        }
                      }}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Camera feed - Always on, no stop button */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Proctoring Camera</h3>
                  <div className="flex items-center text-xs text-red-500">
                    <span className="relative flex h-2 w-2 mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    Live
                  </div>
                </div>
                <div className="relative bg-gray-100 dark:bg-gray-800 rounded-md aspect-video overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    onPlay={handleVideoPlay}
                    className="w-full h-full object-cover"
                    style={{ border: "1px solid black" }}
                  />
                  <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
                  {multipleFacesDetected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
                      <div className="bg-white p-2 rounded-md flex items-center text-red-600">
                        <Users className="h-4 w-4 mr-1" />
                        Multiple faces detected!
                      </div>
                    </div>
                  )}
                </div>
                {isModelLoaded ? <p>✅ Model Loaded</p> : <p>⌛ Loading models...</p>}
              </div>
              {/* <FaceDetech/> */}
                  {!loading?
              <Button className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer"  onClick={handleSubmitTest}>
                Submit Test
              </Button>
              :
              <Button className="w-full bg-black text-white hover:bg-gray-800" disabled >
                Submit Test....
              </Button>
              }
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500 text-sm">All Rights Reserved to PrepGen | © PrepGen</footer>
    </div>
  )
}

