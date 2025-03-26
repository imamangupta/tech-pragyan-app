"use client"
import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import Sidebar from "@/components/Sidebar"
import { ArrowRight } from "lucide-react"

interface NewsPost {
  _id: string
  user: string
  userImg?: string
  postImg?: string
  title: string
  content: string
}

// Static blog posts data
const staticPosts = [
  {
    id: "static-1",
    user: "JEE Mentor",
    userImg: "/default-user.svg",
    postImg: "/static-1.jpg",
    title: "Complete JEE Main 2025 Preparation Guide",
    content: "Master the JEE syllabus with our comprehensive roadmap covering physics, chemistry, and mathematics...",
    slug: "jee-main-2025-guide",
  },
  {
    id: "static-2",
    user: "Physics Expert",
    userImg: "/default-user.svg",
    postImg: "/static-2.jpg",
    title: "JEE Physics Mastery: 100-Day Crash Course",
    content: "Essential strategies for mechanics, electromagnetism, and modern physics with advanced problem-solving techniques...",
    slug: "jee-physics-crash-course",
  },
  {
    id: "static-3",
    user: "Chemistry Guru",
    userImg: "/default-user.svg",
    postImg: "/static-3.jpg",
    title: "JEE Chemistry Deep Dive: Organic & Inorganic",
    content: "Comprehensive guide to reaction mechanisms, coordination compounds, and periodic table trends...",
    slug: "jee-chemistry-deep-dive",
  },
  {
    id: "static-4",
    user: "Maths Wizard",
    userImg: "/default-user.svg",
    postImg: "/static-4.jpg",
    title: "JEE Mathematics Complete Calculus Guide",
    content: "Master differentiation, integration, and algebra with proven problem-solving strategies...",
    slug: "jee-mathematics-guide",
  }
]

const NewsForum: React.FC = () => {
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await axios.get("https://techpragyan-api.vercel.app/news")
      setNewsPosts(response.data)
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  // Format current date
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  const formattedDate = today.toLocaleDateString("en-US", options)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col w-full p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">News Forum</h1>
          <p className="text-gray-500">{formattedDate}</p>
        </div>

        {/* Featured Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {staticPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image src={post.postImg || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="relative h-8 w-8">
                      <Image
                        src={post.userImg || "/placeholder.svg"}
                        alt={post.user}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <span className="ml-2 font-medium text-gray-700">{post.user}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                  <Link
                    href={`/dashboard/news-forum/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Posts Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Latest Updates</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden p-5 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-24 bg-gray-200 ml-2 rounded"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : newsPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newsPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-48 w-full">
                    <Image src={post.postImg || "/default-post.png"} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      <div className="relative h-8 w-8">
                        <Image
                          src={post.userImg || "/default-user.svg"}
                          alt={post.user}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <span className="ml-2 font-medium text-gray-700">{post.user}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                    <Link
                      href={`/dashboard/news-forum/post/${post._id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow">
              <p className="text-gray-500 text-lg">No news posts available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsForum