"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Panel,
  useReactFlow,
  MiniMap,
} from "reactflow"
import "reactflow/dist/style.css"
import type { RoadmapData } from "./roadmap-generator"
import RoadmapNode from "./roadmap-node"
import { Button } from "@/components/ui/button"
import { Download, Maximize, Minimize } from "lucide-react"
import { toPng } from "html-to-image"
import { jsPDF } from "jspdf"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import dagre from "dagre"

// Register custom node types
const nodeTypes = {
  roadmapNode: RoadmapNode,
}

interface RoadmapViewerProps {
  roadmapData: RoadmapData
  isPreview?: boolean
}

// Helper function to layout nodes using dagre
const getLayoutedElements = (nodes: any[], edges: any[], direction = "TB") => {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({ rankdir: direction })

  // Set nodes
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 300, height: 150 })
  })

  // Set edges
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  // Calculate layout
  dagre.layout(dagreGraph)

  // Get positions
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 150, // Adjust for node width
        y: nodeWithPosition.y - 75, // Adjust for node height
      },
    }
  })

  return { nodes: layoutedNodes, edges }
}

function RoadmapViewerContent({ roadmapData, isPreview = false }: RoadmapViewerProps) {
  const { toast } = useToast()
  const reactFlowInstance = useReactFlow()
  const [nodes, setNodes, onNodesChange] = useNodesState(roadmapData.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(roadmapData.edges)
  const flowRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Apply layout on initial render
  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(roadmapData.nodes, roadmapData.edges)
    setNodes(layoutedNodes)
    setEdges(layoutedEdges)

    // Fit view after layout
    setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.2 })
    }, 200)
  }, [roadmapData, reactFlowInstance, setNodes, setEdges])

  // Layout the nodes in a tree structure
  const layoutNodes = useCallback(
    (direction = "TB") => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction)

      setNodes([...layoutedNodes])
      setEdges([...layoutedEdges])

      setTimeout(() => {
        reactFlowInstance.fitView({ padding: 0.2 })
      }, 200)
    },
    [nodes, edges, setNodes, setEdges, reactFlowInstance],
  )

  // Download as PDF
  const downloadPDF = useCallback(() => {
    if (flowRef.current === null) return

    toast({
      title: "Preparing PDF",
      description: "Your roadmap is being prepared for download...",
    })

    // First convert the flow to an image
    toPng(flowRef.current, {
      quality: 0.95,
      backgroundColor: "#ffffff",
      width: flowRef.current.offsetWidth * 2,
      height: flowRef.current.offsetHeight * 2,
      pixelRatio: 2, // Higher resolution
      style: {
        transform: "scale(2)",
        transformOrigin: "top left",
      },
    })
      .then((dataUrl) => {
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        })

        // Add title and description
        pdf.setFontSize(20)
        pdf.text(roadmapData.title, 14, 20)

        pdf.setFontSize(12)
        const descriptionLines = pdf.splitTextToSize(roadmapData.description, 180)
        pdf.text(descriptionLines, 14, 30)

        // Add subjects and level
        pdf.setFontSize(10)
        pdf.text(`Subjects: ${roadmapData.subjects.join(", ")}`, 14, 40)
        pdf.text(`Level: ${roadmapData.level}`, 14, 45)
        pdf.text(`Duration: ${roadmapData.duration}`, 14, 50)

        // Add the image
        const imgProps = pdf.getImageProperties(dataUrl)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

        pdf.addImage(dataUrl, "PNG", 14, 55, pdfWidth - 28, pdfHeight - 20)

        // Add footer
        pdf.setFontSize(8)
        pdf.text("Generated with Learning Roadmap Generator", 14, pdf.internal.pageSize.getHeight() - 10)

        pdf.save(`${roadmapData.title.replace(/\s+/g, "-").toLowerCase()}.pdf`)

        toast({
          title: "PDF Downloaded",
          description: "Your roadmap has been downloaded successfully.",
        })
      })
      .catch((error) => {
        console.error("Error generating PDF:", error)
        toast({
          title: "Error",
          description: "Failed to generate PDF. Please try again.",
          variant: "destructive",
        })
      })
  }, [flowRef, roadmapData, toast])

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!flowRef.current) return

    if (!isFullscreen) {
      if (flowRef.current.requestFullscreen) {
        flowRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }

    setIsFullscreen(!isFullscreen)
  }, [isFullscreen])

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <div
      className={`${isPreview ? "h-full" : "h-[700px]"} w-full border rounded-lg overflow-hidden bg-white relative`}
      ref={flowRef}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap nodeStrokeWidth={3} zoomable pannable className="bg-white/80 border rounded-md" />
        <Panel position="top-right">
          <div className="flex gap-2 bg-white/80 p-2 rounded-md shadow-sm">
            <Button variant="outline" size="sm" onClick={() => layoutNodes("TB")} title="Vertical Layout">
              Vertical
            </Button>
            <Button variant="outline" size="sm" onClick={() => layoutNodes("LR")} title="Horizontal Layout">
              Horizontal
            </Button>
            <Button variant="outline" size="sm" onClick={toggleFullscreen} title="Toggle Fullscreen">
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
            <Button size="sm" onClick={downloadPDF} title="Download PDF">
              <Download className="mr-2 h-4 w-4" />
              PDF
            </Button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  )
}

export default function RoadmapViewer(props: RoadmapViewerProps) {
  return (
    <ReactFlowProvider>
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!props.isPreview && (
          <div>
            <h2 className="text-2xl font-bold">{props.roadmapData.title}</h2>
            <p className="text-slate-600 dark:text-slate-300">{props.roadmapData.description}</p>
          </div>
        )}
        <RoadmapViewerContent {...props} />
      </motion.div>
    </ReactFlowProvider>
  )
}

