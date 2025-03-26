"use client"
import {
    BarChart3,
    Clock,
    FileText,
    Search,
    Trophy,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WeeklyProgressChart } from "@/components/weekly-progress-chart"
import { SubjectAnalysisChart } from "@/components/subject-analysis-chart"
// import { ActivityHeatmap } from "@/components/activity-heatmap"
import { StatCard } from "@/components/stat-card"
import { UpcomingEvents } from "@/components/upcoming-events"
import Sidebar from "@/components/Sidebar"
import { useEffect, useState } from "react"
import { BaseUrlApi } from "@/utils/constant"
import Link from "next/link"

interface UserData {
    userName?: string;   // Optional property
    email?: string;       // Add more fields as needed
  }

export default function Dashboard() {

    const [data, setData] = useState<UserData>({});
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BaseUrlApi}/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();
        setData(json.user)
        console.log(json);
        console.log(json.user.id);
        
    }

    useEffect(() => {
        fetchData()
    }, [])





    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    return (
        <div className="flex min-h-screen bg-gray-50">

            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Header */}
                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Hello, {data.userName || 'username'}</h1>
                        <p className="text-gray-500">{formattedDate}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Search className="h-4 w-4" />
                        </Button>
                        <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" alt='Abhishek' />
                            <AvatarFallback>AB</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard
                        value="24"
                        label="Total test"
                        icon={<FileText className="h-5 w-5" />}
                        iconBg="bg-teal-100"
                        iconColor="text-teal-500"
                    />
                    <StatCard
                        value="80%"
                        label="Average score"
                        icon={<BarChart3 className="h-5 w-5" />}
                        iconBg="bg-teal-100"
                        iconColor="text-teal-500"
                    />
                    <StatCard
                        value="128h"
                        label="Study"
                        icon={<Clock className="h-5 w-5" />}
                        iconBg="bg-teal-100"
                        iconColor="text-teal-500"
                    />
                    <StatCard
                        value="82%"
                        label="Success rate"
                        icon={<Trophy className="h-5 w-5" />}
                        iconBg="bg-teal-100"
                        iconColor="text-teal-500"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <Card className="col-span-1 lg:col-span-1">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold mb-4">Weekly Progress</h2>
                            <WeeklyProgressChart />
                        </CardContent>
                    </Card>

                    <Card className="col-span-1 lg:col-span-1">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold mb-4">Weekly Subject Analysis</h2>
                            <SubjectAnalysisChart />
                        </CardContent>
                    </Card>

                    <Card className="col-span-1 lg:col-span-1">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold mb-4">Daily Activity</h2>
                            {/* <ActivityHeatmap /> */}
                        </CardContent>
                    </Card>
                </div>

                {/* Upcoming Events */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Upcoming Contest</h2>
                            <Link href={'/dashboard/contest/leaderboard'} className="cursor-pointer">
                            <Button className="bg-black text-white hover:bg-gray-800 cursor-pointer">View Leaderboard</Button>
                            </Link>
                        </div>
                        <UpcomingEvents />
                    </CardContent>
                </Card>
                
                

               

                {/* Footer */}
                <footer className="mt-8 text-center text-gray-500 text-sm">All Right Reserved to PrepGen | © PrepGen</footer>
            </main>
        </div>
    )
}

