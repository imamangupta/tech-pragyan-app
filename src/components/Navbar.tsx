"use client"
import React from 'react'
import {
    Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar() {
    // const [userName, setUserName] = useState("Abhishek")
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })
    return (
        <header className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold">Hello, Abhishek</h1>
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
    )
}
