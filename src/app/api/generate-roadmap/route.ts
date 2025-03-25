import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { duration, subjects, level } = await request.json()

    if (!duration || !subjects || !level || subjects.length === 0) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Construct the prompt for GROQ AI
    const prompt = `Generate a detailed learning roadmap for a student studying ${subjects.join(", ")} at ${level} level for a ${duration} duration. 
    
    Format the response as a JSON object with the following structure:
    {
      "title": "Title of the roadmap",
      "description": "Brief description of the roadmap",
      "topics": [
        {
          "title": "Topic name",
          "description": "Description of the topic",
          "subject": "The subject this topic belongs to (one of: ${subjects.join(", ")})",
          "subtopics": ["Subtopic 1", "Subtopic 2"],
          "resources": [
            {
              "title": "Resource name",
              "url": "URL to the resource",
              "type": "video/article/pdf/course"
            }
          ]
        }
      ]
    }
    
    Make sure to include 6-10 main topics that build upon each other, with relevant subtopics and resources for each. The roadmap should be realistic to complete within the ${duration} timeframe for a ${level} student.
    
    If multiple subjects are selected (${subjects.join(", ")}), create a logical progression that integrates these subjects, showing how they connect and complement each other. Label each topic with its primary subject.
    
    For resources, include a mix of:
    - YouTube videos (with actual YouTube URLs)
    - Online articles
    - PDF resources
    - Online courses (from platforms like Coursera, edX, Khan Academy)
    
    Make sure all resources are real and relevant to the topic.`

    // Make the API call to GROQ
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are an expert educational content creator specializing in creating learning roadmaps. Your responses should be well-structured, comprehensive, and in the exact JSON format requested. Include real, relevant resources for each topic.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("GROQ API error:", errorData)
      return NextResponse.json({ error: "Failed to generate roadmap" }, { status: 500 })
    }

    const data = await response.json()

    // Extract the content from the GROQ response
    const content = data.choices[0].message.content

    // Parse the JSON from the content
    // The AI might return the JSON with markdown code blocks, so we need to extract it
    let jsonContent
    try {
      // Try to parse directly first
      jsonContent = JSON.parse(content)
    } catch (e) {
      // If direct parsing fails, try to extract JSON from markdown
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
      if (jsonMatch && jsonMatch[1]) {
        jsonContent = JSON.parse(jsonMatch[1])
      } else {
        throw new Error("Failed to parse JSON from AI response")
      }
    }

    return NextResponse.json({ roadmap: jsonContent })
  } catch (error) {
    console.error("Error generating roadmap:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

