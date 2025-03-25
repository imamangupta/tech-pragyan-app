"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import RoadmapViewer from "./roadmap-viewer"
import { Loader2, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import MultiSelect from "./multi-select"
import { cn } from "@/lib/utils"
import type React from "react"

// Define types for our roadmap data
export interface RoadmapNode {
  id: string
  type: string
  data: {
    label: string
    description?: string
    links?: Array<{
      title: string
      url: string
      type: "video" | "article" | "pdf" | "course"
    }>
    details?: string[]
    subject?: string
  }
  position: { x: number; y: number }
  style?: React.CSSProperties
}

export interface RoadmapEdge {
  id: string
  source: string
  target: string
  type?: string
  animated?: boolean
  style?: React.CSSProperties
}

export interface RoadmapData {
  title: string
  description: string
  nodes: RoadmapNode[]
  edges: RoadmapEdge[]
  subjects: string[]
  level: string
  duration: string
}

export default function RoadmapGenerator() {
  const { toast } = useToast()
  const [duration, setDuration] = useState("2 Months")
  const [subjects, setSubjects] = useState<string[]>([])
  const [level, setLevel] = useState("Intermediate")
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [durationMonths, setDurationMonths] = useState(2)
  const [activeTab, setActiveTab] = useState("selection")

  const subjectOptions = [
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Math", label: "Math" },
    { value: "Computer Science", label: "Computer Science" },
    // { value: "Biology", label: "Biology" },
    // { value: "History", label: "History" },
    // { value: "Literature", label: "Literature" },
    // { value: "Economics", label: "Economics" },
  ]

  const levelOptions = [
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
  ]

  useEffect(() => {
    setDuration(`${durationMonths} ${durationMonths === 1 ? "Month" : "Months"}`)
  }, [durationMonths])

  interface RoadmapApiResponse {
    title?: string
    description?: string
    topics?: Array<{
      title?: string
      description?: string
      subject?: string
      resources?: Array<
        | string
        | {
            title?: string
            name?: string
            url?: string
            link?: string
            type?: "video" | "article" | "pdf" | "course"
          }
      >
      subtopics?: string[]
    }>
  }

  const generateRoadmap = async () => {
    if (subjects.length === 0 || !level || !duration) {
      toast({
        title: "Missing information",
        description: "Please select at least one subject, level, and duration before generating a roadmap.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          duration,
          subjects,
          level,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate roadmap")
      }

      const data = await response.json()

      // Process the data to create a roadmap visualization
      const processedData = processRoadmapData(data.roadmap)
      setRoadmapData(processedData)
      setShowPreview(true)

      toast({
        title: "Roadmap generated!",
        description: "Your personalized learning roadmap is ready to preview.",
      })
    } catch (error) {
      console.error("Error generating roadmap:", error)
      toast({
        title: "Error",
        description: "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Process the AI response into a format suitable for React Flow
  const processRoadmapData = (data: RoadmapApiResponse): RoadmapData => {
    const nodes: RoadmapNode[] = []
    const edges: RoadmapEdge[] = []

    // Create a color map for different subjects
    const subjectColors: Record<string, string> = {
      Physics: "#3b82f6",
      Chemistry: "#10b981",
      Math: "#f59e0b",
      "Computer Science": "#8b5cf6",
      Biology: "#ec4899",
      History: "#6366f1",
      Literature: "#ef4444",
      Economics: "#0ea5e9",
    }

    // Create nodes from the topics
    if (data.topics && Array.isArray(data.topics)) {
      data.topics.forEach((topic:any, index: number) => {
      // data.topics.forEach((topic: RoadmapApiResponse["topics"][0] , index: number) => {
        const nodeId = `node-${index}`
        const subjectName = topic.subject || subjects[0]
        const color = subjectColors[subjectName] || "#64748b"

        nodes.push({
          id: nodeId,
          type: "roadmapNode",
          data: {
            label: topic.title || `Topic ${index + 1}`,
            description: topic.description || "",
            links: topic.resources
              ? topic.resources.map(
                  (
                    resource:
                      | string
                      | {
                          title?: string
                          name?: string
                          url?: string
                          link?: string
                          type?: "video" | "article" | "pdf" | "course"
                        },
                  ) => {
                    // Determine resource type based on URL or explicit type
                    let type: "video" | "article" | "pdf" | "course" = "article"
                    if (typeof resource === "string") {
                      if (resource.includes("youtube.com") || resource.includes("youtu.be")) {
                        type = "video"
                      } else if (resource.includes(".pdf")) {
                        type = "pdf"
                      } else if (
                        resource.includes("course") ||
                        resource.includes("udemy") ||
                        resource.includes("coursera")
                      ) {
                        type = "course"
                      }
                      return {
                        title: resource,
                        url: resource,
                        type,
                      }
                    } else {
                      return {
                        title: resource.title || resource.name || "Resource",
                        url: resource.url || resource.link || "#",
                        type: resource.type || type,
                      }
                    }
                  },
                )
              : [],
            details: topic.subtopics || [],
            subject: subjectName,
          },
          position: {
            x: 100 + Math.random() * 100,
            y: 100 + index * 150,
          },
          style: {
            borderColor: color,
            borderWidth: 2,
          },
        })

        // Create edges between consecutive nodes
        if (index > 0) {
          edges.push({
            id: `edge-${index - 1}-${index}`,
            source: `node-${index - 1}`,
            target: nodeId,
            type: "smoothstep",
            animated: true,
            style: {
              stroke: color,
              strokeWidth: 2,
            },
          })
        }
      })
    }

    return {
      title: data.title || `Learning Roadmap (${level})`,
      description: data.description || `A ${duration} learning plan for ${subjects.join(", ")} at ${level} level`,
      nodes,
      edges,
      subjects: subjects,
      level,
      duration,
    }
  }

  const handleConfirmRoadmap = () => {
    setShowPreview(false)
    setShowRoadmap(true)
    setActiveTab("roadmap")
  }

  const resetForm = () => {
    setShowRoadmap(false)
    setRoadmapData(null)
    setActiveTab("selection")
  }

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="selection">Selection</TabsTrigger>
          <TabsTrigger value="roadmap" disabled={!showRoadmap}>
            Roadmap
          </TabsTrigger>
        </TabsList>

        <TabsContent value="selection" className="space-y-8 pt-4">
          <div className="grid grid-cols-1 gap-8">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Label className="text-lg font-medium">Subjects</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Select one or more subjects for your learning roadmap
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {subjects.map((subject) => (
                  <Badge key={subject} variant="outline" className="bg-slate-100 dark:bg-slate-700">
                    {subject}
                  </Badge>
                ))}
              </div>
              <MultiSelect
                options={subjectOptions}
                selected={subjects}
                onChange={setSubjects}
                placeholder="Select subjects..."
              />
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Label className="text-lg font-medium">Level</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">Choose your current proficiency level</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                {levelOptions.map((option) => (
                  <div
                    key={option.id}
                    className={cn(
                      "flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-all",
                      level === option.label
                        ? "border-primary bg-primary/5 dark:bg-primary/10"
                        : "border-input hover:bg-accent hover:text-accent-foreground",
                    )}
                    onClick={() => setLevel(option.label)}
                  >
                    <Checkbox
                      id={option.id}
                      checked={level === option.label}
                      onCheckedChange={() => setLevel(option.label)}
                    />
                    <label
                      htmlFor={option.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex justify-between items-center">
                <Label className="text-lg font-medium">Duration: {duration}</Label>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Select how long you plan to study</p>
              <div className="pt-4 px-2">
                <Slider
                  defaultValue={[2]}
                  max={12}
                  min={1}
                  step={1}
                  value={[durationMonths]}
                  onValueChange={(value) => setDurationMonths(value[0])}
                />
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span>1 Month</span>
                  <span>6 Months</span>
                  <span>12 Months</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex justify-center pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={generateRoadmap}
              disabled={isGenerating || subjects.length === 0}
              className="w-full sm:w-auto text-lg px-8 py-6 h-auto cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5 " />
                  Generate Roadmap
                </>
              )}
            </Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6 pt-4">
          {roadmapData && <RoadmapViewer roadmapData={roadmapData} />}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={resetForm}>
              Create New Roadmap
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Your Learning Roadmap</DialogTitle>
            <DialogDescription>Preview your personalized roadmap before exploring in detail</DialogDescription>
          </DialogHeader>

          {roadmapData && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h2 className="text-xl font-bold">{roadmapData.title}</h2>
                <p className="text-slate-600 dark:text-slate-300">{roadmapData.description}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {roadmapData.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                  <Badge variant="outline">{roadmapData.level}</Badge>
                  <Badge variant="outline">{roadmapData.duration}</Badge>
                </div>
              </div>

              <div className="h-[400px] border rounded-lg overflow-hidden">
                <RoadmapViewer roadmapData={roadmapData} isPreview={true} />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmRoadmap}>Explore Roadmap</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}