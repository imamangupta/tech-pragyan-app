"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import Sidebar from "@/components/Sidebar"
import { ArrowLeft, Calendar, Clock } from "lucide-react"

const staticPosts = [
    {
      id: "static-1",
      user: "JEE Expert",
      userImg: "/default-user.svg",
      postImg: "/static-1.jpg",
      title: "Complete JEE Main 2025 Preparation Guide: From Basics to Advanced",
      content: `
        <h2>JEE Main Exam Pattern 2025</h2>
        <ul>
          <li><strong>Mode:</strong> Computer Based Test (CBT)</li>
          <li><strong>Duration:</strong> 3 hours</li>
          <li><strong>Sections:</strong>
            <ul>
              <li>Physics (25 questions)</li>
              <li>Chemistry (25 questions)</li>
              <li>Mathematics (25 questions)</li>
            </ul>
          </li>
          <li><strong>Marking Scheme:</strong> +4 for correct, -1 for incorrect</li>
        </ul>
  
        <h2>Detailed Syllabus Breakdown</h2>
        <h3>Physics (High Weightage Topics)</h3>
        <ul>
          <li>Electrodynamics (22%) - Capacitors, Current Electricity</li>
          <li>Mechanics (30%) - Rotational Motion, Work Energy Power</li>
          <li>Modern Physics (15%) - Dual Nature, Nuclear Physics</li>
        </ul>
  
        <h3>Chemistry (Must-Prepare Chapters)</h3>
        <ul>
          <li>Physical Chemistry: Chemical Kinetics, Thermodynamics</li>
          <li>Organic Chemistry: Named Reactions, Biomolecules</li>
          <li>Inorganic Chemistry: Coordination Compounds, p-Block</li>
        </ul>
  
        <h2>6-Month Study Plan</h2>
        <table>
          <tr>
            <th>Month</th>
            <th>Focus Area</th>
            <th>Daily Target</th>
          </tr>
          <tr>
            <td>1-2</td>
            <td>Complete NCERT Basics</td>
            <td>3 chapters/week</td>
          </tr>
          <tr>
            <td>3-4</td>
            <td>Advanced Concepts</td>
            <td>50 problems/day</td>
          </tr>
          <tr>
            <td>5-6</td>
            <td>Full Mock Tests</td>
            <td>2 tests/week</td>
          </tr>
        </table>
  
        <h2>Recommended Books</h2>
        <ul>
          <li>Physics: HC Verma (Vol 1 & 2)</li>
          <li>Chemistry: OP Tandon (Organic)</li>
          <li>Mathematics: RD Sharma + Cengage</li>
        </ul>
      `,
      date: "January 15, 2025",
      readTime: "12 min read",
      slug: "jee-main-2025-guide",
    },
    {
      id: "static-2",
      user: "Physics Mentor",
      userImg: "/default-user.svg",
      postImg: "/static-2.jpg",
      title: "Mastering Physics for JEE: 100-Day Crash Course",
      content: `
        <h2>Chapter-Wise Strategy</h2>
        <h3>1. Mechanics (40 Days)</h3>
        <ul>
          <li>Kinematics: Relative Motion</li>
          <li>NLM: Constrained Motion</li>
          <li>Work Power Energy: Variable Forces</li>
        </ul>
  
        <h3>2. Electromagnetism (30 Days)</h3>
        <ul>
          <li>Electrostatics: Gauss Law Applications</li>
          <li>Current Electricity: Kirchhoff's Laws</li>
          <li>EMI: Lenz Law Complex Problems</li>
        </ul>
  
        <h2>Problem Solving Framework</h2>
        <ol>
          <li>Identify given parameters</li>
          <li>Draw schematic diagrams</li>
          <li>Apply fundamental principles</li>
          <li>Check dimensional consistency</li>
          <li>Verify with limiting cases</li>
        </ol>
  
        <h2>Advanced Techniques</h2>
        <ul>
          <li>Symmetry Analysis</li>
          <li>Dimensional Estimation</li>
          <li>Approximation Methods</li>
          <li>Graphical Solutions</li>
        </ul>
      `,
      date: "February 1, 2025",
      readTime: "15 min read",
      slug: "jee-physics-crash-course",
    },
    {
      id: "static-3",
      user: "Chemistry Expert",
      userImg: "/default-user.svg",
      postImg: "/static-3.jpg",
      title: "JEE Chemistry Mastery: Organic & Inorganic Deep Dive",
      content: `
        <h2>Organic Chemistry Roadmap</h2>
        <h3>Reaction Mechanisms</h3>
        <ul>
          <li>Electrophilic Substitution</li>
          <li>Nucleophilic Addition</li>
          <li>Free Radical Reactions</li>
        </ul>
  
        <h3>Name Reactions Master List</h3>
        <table>
          <tr>
            <th>Reaction</th>
            <th>Application</th>
          </tr>
          <tr>
            <td>Friedel-Crafts</td>
            <td>Aromatic Alkylation</td>
          </tr>
          <tr>
            <td>Wurtz</td>
            <td>Alkane Synthesis</td>
          </tr>
        </table>
  
        <h2>Inorganic Chemistry Strategy</h2>
        <ul>
          <li>Periodic Table Trends
            <ul>
              <li>Ionization Energy Patterns</li>
              <li>Electron Affinity Exceptions</li>
            </ul>
          </li>
          <li>Coordination Compounds
            <ul>
              <li>CFT vs VBT</li>
              <li>Isomerism Types</li>
            </ul>
          </li>
        </ul>
      `,
      date: "February 15, 2025",
      readTime: "14 min read",
      slug: "jee-chemistry-deep-dive",
    },
    {
      id: "static-4",
      user: "Maths Guru",
      userImg: "/default-user.svg",
      postImg: "/static-4.jpg",
      title: "JEE Mathematics Complete Guide: Calculus to Algebra",
      content: `
        <h2>Calculus Master Plan</h2>
        <h3>Differentiation</h3>
        <ul>
          <li>Implicit Differentiation</li>
          <li>Parametric Derivatives</li>
          <li>Higher Order Derivatives</li>
        </ul>
  
        <h3>Integration Techniques</h3>
        <ul>
          <li>Substitution Methods</li>
          <li>Partial Fractions</li>
          <li>Definite Integral Properties</li>
        </ul>
  
        <h2>Algebra Focus Areas</h2>
        <ul>
          <li>Quadratic Equations
            <ul>
              <li>Complex Roots Analysis</li>
              <li>Graphical Interpretations</li>
            </ul>
          </li>
          <li>Matrices & Determinants
            <ul>
              <li>Properties of Special Matrices</li>
              <li>Cramer's Rule Applications</li>
            </ul>
          </li>
        </ul>
  
        <h2>Problem Solving Strategies</h2>
        <ol>
          <li>Identify problem type</li>
          <li>Choose optimal method
            <ul>
              <li>Algebraic vs Graphical</li>
              <li>Direct vs Indirect</li>
            </ul>
          </li>
          <li>Verify using alternative approach</li>
        </ol>
      `,
      date: "March 1, 2025",
      readTime: "18 min read",
      slug: "jee-mathematics-guide",
    }
  ]

const BlogPost = () => {
  const params = useParams()
  const router = useRouter()
  const { slug } = params

  const post = staticPosts.find((post) => post.slug === slug)
  const [redirect, setRedirect] = React.useState(false)

  React.useEffect(() => {
    if (!post) setRedirect(true)
  }, [post])

  React.useEffect(() => {
    if (redirect) router.push("/dashboard/news-forum")
  }, [redirect, router])

  if (!post) return null

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

        <div className="w-full max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>

          <div className="flex items-center mb-6">
            <div className="relative h-10 w-10 mr-3">
              <Image
                src={post.userImg || "/default-user.svg"}
                alt={post.user}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-gray-800">{post.user}</div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="mr-3">{post.date}</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[400px] mb-8">
            <Image 
              src={post.postImg || "/default-post.png"} 
              alt={post.title} 
              fill 
              className="object-cover rounded-xl" 
            />
          </div>

          {post.content.includes("<") && post.content.includes(">") ? (
            <div 
              className="article-content" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          ) : (
            <div className="article-content">
              {post.content.split("\n").map((paragraph, index) => (
                paragraph.trim() && <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}

          <style jsx global>{`
            .article-content {
              font-size: 1.125rem;
              line-height: 1.7;
              color: #4a5568;
            }
            
            .article-content h1 {
              font-size: 2rem;
              font-weight: bold;
              margin: 2rem 0 1rem;
              color: #1a202c;
            }
            
            .article-content h2 {
              font-size: 1.75rem;
              font-weight: bold;
              margin: 1.75rem 0 0.75rem;
              color: #1a202c;
            }
            
            .article-content h3 {
              font-size: 1.5rem;
              font-weight: bold;
              margin: 1.5rem 0 0.5rem;
              color: #1a202c;
            }
            
            .article-content p {
              margin-bottom: 1.5rem;
            }
            
            .article-content ul,
            .article-content ol {
              margin-left: 1.5rem;
              margin-bottom: 1.5rem;
            }
            
            .article-content li {
              margin-bottom: 0.75rem;
            }
            
            .article-content a {
              color: #3182ce;
              text-decoration: underline;
            }
            
            .article-content a:hover {
              color: #2c5282;
            }
            
            .article-content blockquote {
              border-left: 4px solid #e2e8f0;
              padding-left: 1rem;
              margin: 1.5rem 0;
              font-style: italic;
              color: #718096;
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}

export default BlogPost