import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const {  subjects } = await request.json()

    if (subjects.length === 0) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Construct the prompt for GROQ AI
    const prompt = `
    Generate 30 high-quality, challenging questions for each subject like ${subjects.join(", ")}
    Ensure questions cover diverse topics and difficulty levels
    
    Format the response as a JSON object with the following structure:
     [
        {
            id: "physics",
            name: "physics",
            questions: [
                {
                    id: 1,
                    text: "A car accelerates uniformly from rest to a speed of m/s in 5 seconds. What is its acceleration?",
                    options: [
                        { id: "a", value: "2", label: "" },
                        { id: "b", value: "4", label:  ""},
                        { id: "c", value: "5", label: "" },
                        { id: "d", value: "10", label: "" },
                    ],
                    points: "4/-1",
                    correctAnswer: "4", 
                },
            ]
        },
    ]
    
    Make sure to include 30 Question Subject, 
    
`

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

