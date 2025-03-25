"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { ExternalLink, Youtube, FileText, BookOpen, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface RoadmapNodeData {
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

function RoadmapNode({ data }: NodeProps<RoadmapNodeData>) {
  // Map resource types to icons
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Youtube className="h-4 w-4 text-red-500" />
      case "pdf":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "course":
        return <BookOpen className="h-4 w-4 text-green-500" />
      default:
        return <ExternalLink className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 shadow-md w-[300px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{data.label}</h3>
          {data.subject && (
            <Badge variant="outline" className="ml-2">
              {data.subject}
            </Badge>
          )}
        </div>

        {data.description && <p className="text-sm text-slate-600 dark:text-slate-300">{data.description}</p>}

        <Accordion type="single" collapsible className="w-full">
          {data.details && data.details.length > 0 && (
            <AccordionItem value="details">
              <AccordionTrigger className="text-sm font-medium py-2">
                <div className="flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Topics
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="text-sm space-y-1 list-disc pl-5 py-2">
                  {data.details.map((detail, index) => (
                    <li key={index} className="text-slate-700 dark:text-slate-300">
                      {detail}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {data.links && data.links.length > 0 && (
            <AccordionItem value="resources">
              <AccordionTrigger className="text-sm font-medium py-2">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Resources
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="text-sm space-y-2 py-2">
                  {data.links.map((link, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mt-0.5 mr-2">{getResourceIcon(link.type)}</div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline truncate max-w-[200px] inline-block"
                            >
                              {link.title}
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{link.title}</p>
                            <p className="text-xs text-slate-500">{link.url}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </motion.div>
  )
}

export default memo(RoadmapNode)

