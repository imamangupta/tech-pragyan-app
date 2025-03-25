"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FileText, Mail, Phone, User } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BaseUrlApi } from "@/utils/constant"
import Sidebar from "@/components/Sidebar"

// Mock user data
const userData = {
  id: "67e185076b4b158e76e6818c",
  name: "Suraj Gupta",
  username: "suraj.gupta",
  email: "suraj.gupta@example.com",
  phone: "+91 9876543210",
  avatar: "/placeholder.svg?height=128&width=128",
}

// Mock test history data
const testHistory = [
  {
    id: "1",
    title: "JEE Main Mock Test",
    date: "March 25, 2025",
    score: "-23/300",
    paperLink: "/test-data",
  },
  {
    id: "2",
    title: "Physics Sectional Test",
    date: "March 20, 2025",
    score: "45/100",
    paperLink: "#",
  },
  {
    id: "3",
    title: "Chemistry Sectional Test",
    date: "March 15, 2025",
    score: "60/100",
    paperLink: "#",
  },
  {
    id: "4",
    title: "Mathematics Sectional Test",
    date: "March 10, 2025",
    score: "70/100",
    paperLink: "#",
  },
]

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])



  const [user, setUser] = useState({})
  const [data, setData] = useState([])


  const fetchData = async () => {

    const token = localStorage.getItem('token');
    const response2 = await fetch(`${BaseUrlApi}/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const json2 = await response2.json();
    console.log(json2);

    setUser(json2.user)


    const response = await fetch(`${BaseUrlApi}/mocktest/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'id': json2.user.id
      },
    });
    const json = await response.json();
    // setData(json.user)

    setData(json.formattedData);
    console.log(json.formattedData);
  }


  useEffect

  useEffect(() => {
    fetchData()
  }, [])




  if (!mounted) return null

  return (


    <div className="flex min-h-screen bg-gray-50">

      <Sidebar />


      <main className="flex-1 p-6">




        <div className="container mx-auto py-8 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold mb-8">Student Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-1"
              >
                <Card className="h-full">
                  <CardHeader className="text-center">
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-6">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={userData.avatar} alt={userData.name} />
                        <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div className="text-center">
                      <h2 className="text-2xl font-bold">{user.userName}</h2>
                      <p className="text-muted-foreground">@{user.userName}</p>
                    </div>
                    <div className="w-full space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span>ID: {user.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <span>{userData.phone}</span>
                      </div>
                    </div>
                    <Button className="w-full">Edit Profile</Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Test History */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:col-span-2"
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Test History</CardTitle>
                    <CardDescription>Your past test records</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Test Title</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* {testHistory.map((test) => (
                      <TableRow key={test.id} className="group">
                        <TableCell className="font-medium">{test.title}</TableCell>
                        <TableCell>{test.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={test.score.startsWith("-") ? "destructive" : "default"}
                            className="transition-all duration-300 group-hover:scale-110"
                          >
                            {test.score}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button asChild variant="outline" size="sm">
                            <Link href={test.paperLink} className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              <span>View Paper</span>
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))} */}
                        {data.map((test) => (
                          <TableRow key={test._id} className="group">
                            <TableCell className="font-medium">{test.subjectname}</TableCell>
                            <TableCell>{test.date}</TableCell>
                            <TableCell>
                              <Badge
                                variant={"default"}
                                className="transition-all duration-300 group-hover:scale-110"
                              >
                                {test.totalScore}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button asChild variant="outline" size="sm">
                                <Link href={`/dashboard/profile/${test._id}`} className="flex items-center gap-1">
                                  <FileText className="h-4 w-4" />
                                  <span>View Paper</span>
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>


      </main>
    </div>
  )
}

