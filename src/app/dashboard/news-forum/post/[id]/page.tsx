"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import Sidebar from "@/components/Sidebar"
import { ArrowLeft, Calendar, Clock } from "lucide-react"

interface NewsPost {
  _id: string
  user: string
  userImg?: string
  postImg?: string
  title: string
  content: string
  date?: string
  readTime?: string
  slug?: string
}

// Mapping of static images for specific blog post IDs
const staticImageMap: {[key: string]: string} = {
  "static-1": "/static-1.jpg",
  "static-2": "/static-2.jpg", 
  "static-3": "/static-3.jpg",
  "static-4": "/static-4.jpg"
}

const DynamicPost = () => {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const [post, setPost] = useState<NewsPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://techpragyan-api.vercel.app/news/${id}`)
        setPost(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching post:", err)
        setError("Failed to load the post. It may have been removed or is temporarily unavailable.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col w-full p-6 items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Loading post...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col w-full p-6">
          <Link
            href="/dashboard/news-forum"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to News Forum
          </Link>
          <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              href="/dashboard/news-forum"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Return to News Forum
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return null
  }

  // Determine the post image based on the ID
  const postImage = staticImageMap[post._id] || "/default-post.png"

  // Format date if available or use current date
  const formattedDate =
    post.date ||
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  // Estimate read time if not provided
  const readTime = post.readTime || `${Math.max(5, Math.ceil(post.content.length / 1000))} min read`

  // Check if content contains HTML
  const isHtml = post.content.includes("<") && post.content.includes(">")

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col w-full p-6">
        {/* Back button */}
        <Link
          href="/dashboard/news-forum"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to News Forum
        </Link>

        {/* Article header */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>

          <div className="flex items-center mb-6">
            <div className="relative h-10 w-10 mr-3">
              <Image
                src={"/default-user.svg"}
                alt={post.user}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-gray-800">{post.user}</div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="mr-3">{formattedDate}</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured image */}
          <div className="relative w-full h-[400px] mb-8">
            <Image
              src={postImage}
              alt={post.title}
              fill
              className="object-cover rounded-xl"
            />
          </div>

          {/* Article content */}
          {isHtml ? (
            <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div className="article-content">
              {post.content.split("\n").map((paragraph, index) => paragraph.trim() && <p key={index}>{paragraph}</p>)}
            </div>
          )}

          {/* Content styling */}
          <style jsx global>{`
            .article-content h1 {
              font-size: 2rem;
              font-weight: bold;
              margin-top: 2rem;
              margin-bottom: 1rem;
              color: #1a202c;
            }
            .article-content h2 {
              font-size: 1.75rem;
              font-weight: bold;
              margin-top: 1.75rem;
              margin-bottom: 0.75rem;
              color: #1a202c;
            }
            .article-content h3 {
              font-size: 1.5rem;
              font-weight: bold;
              margin-top: 1.5rem;
              margin-bottom: 0.5rem;
              color: #1a202c;
            }
            .article-content p {
              margin-bottom: 1rem;
              line-height: 1.7;
              color: #4a5568;
            }
            .article-content ul, .article-content ol {
              margin-bottom: 1rem;
              margin-left: 1.5rem;
              color: #4a5568;
            }
            .article-content li {
              margin-bottom: 0.5rem;
              line-height: 1.7;
            }
            .article-content a {
              color: #3182ce;
              text-decoration: underline;
            }
            .article-content a:hover {
              color: #2c5282;
            }
            .article-content blockquote {
              padding-left: 1rem;
              border-left: 4px solid #e2e8f0;
              font-style: italic;
              margin: 1rem 0;
            }
            .article-content strong {
              font-weight: bold;
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}

export default DynamicPost