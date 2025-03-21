"use client"

import { useState } from "react"
import {
    BookOpen,
    Calendar,
    FileText,
    LayoutDashboard,
    LogOut,
    Map,
    MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname  } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();
    console.log(pathname);
    

    return (
        <aside className="w-[200px] bg-white border-r flex flex-col">
            <div className="p-4 border-b flex items-center gap-2">
                <div className="bg-black text-white p-1 rounded-md">
                    <FileText size={18} />
                </div>
                <span className="font-bold text-lg">PrepGen</span>
            </div>

            <nav className="flex-1 py-4">
                <div className="space-y-1 px-3">
                    <a href="/dashboard/overview">
                        <Button variant={pathname.includes("overview")?'default':'ghost'}  className="w-full my-1 justify-start cursor-pointer">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Button>
                    </a>
                    <a href="/dashboard/ai-mock-test">
                        <Button variant={pathname.includes("ai-mock-test")?'default':'ghost'} className="w-full my-1 justify-start cursor-pointer">
                            <FileText className="mr-2 h-4 w-4" />
                            AI-Mock Test
                        </Button>
                    </a>
                    <a href="/dashboard/ai-study-plan">
                        <Button variant={pathname.includes("ai-study-plan")?'default':'ghost'} className="w-full my-1 justify-start cursor-pointer">
                            <BookOpen className="mr-2 h-4 w-4" />
                            AI-Study Plan
                        </Button>
                    </a>
                    <a href="/dashboard/ai-recommend">
                        <Button variant={pathname.includes("ai-recommend")?'default':'ghost'} className="w-full my-1 justify-start cursor-pointer">
                            <Calendar className="mr-2 h-4 w-4" />
                            AI-Recommend
                        </Button>
                    </a>
                    <a href="/dashboard/news-forum">
                        <Button variant={pathname.includes("news-forum")?'default':'ghost'} className="w-full my-1 justify-start cursor-pointer">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            News Forum
                        </Button>
                    </a>
                    <a href="/dashboard/ai-roadmap">
                        <Button variant={pathname.includes("ai-roadmap")?'default':'ghost'} className="w-full  my-1 justify-start cursor-pointer">
                            <Map className="mr-2 h-4 w-4" />
                            AI-Roadmap
                        </Button>
                    </a>
                </div>
            </nav>

            <div className="p-4 mt-auto">
                <Button variant="ghost" className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </aside>
    )
}
