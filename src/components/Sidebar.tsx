"use client"

import {
    BookOpen,
    FileText,
    LayoutDashboard,
    LogOut,
    Map,
    MessageSquare,
    BotMessageSquare ,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname  } from "next/navigation";
import Link from "next/link";
import { useRouter } from 'next/navigation'

export default function Sidebar() {
    const pathname = usePathname();
    console.log(pathname);
     const router = useRouter()

    const handleLogOut = ()=>{
        localStorage.clear()
        router.push("/")
    }
    

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
                    <Link href="/dashboard/overview">
                        <Button variant={pathname.includes("overview")?'default':'ghost'}  className="w-full my-1 justify-start cursor-pointer">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/dashboard/ai-mock-test">
                        <Button variant={pathname.includes("ai-mock-test")?'default':'ghost'} className="w-full my-1 justify-start cursor-pointer">
                            <FileText className="mr-2 h-4 w-4" />
                            AI-Mock Test
                        </Button>
                    </Link>
                    <Link href="/dashboard/ai-study-plan">
                        <Button variant={pathname.includes("ai-study-plan")?'default':'ghost'} className="w-full my-1 justify-start cursor-pointer">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Easy Study
                        </Button>
                    </Link>
                    {/* <Link href="/dashboard/ai-recommend">
                        <Button variant={pathname.includes("ai-recommend")?'default':'ghost'} className="w-full my-1 justify-start cursor-pointer">
                            <Calendar className="mr-2 h-4 w-4" />
                            AI-Recommend
                        </Button>
                    </Link> */}
                    <Link href="/dashboard/news-forum">
                        <Button variant={pathname.includes("news-forum")?'default':'ghost'} className="w-full my-1 justify-start cursor-pointer">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            News Forum
                        </Button>
                    </Link>
                    <Link href="/dashboard/ai-roadmap">
                        <Button variant={pathname.includes("ai-roadmap")?'default':'ghost'} className="w-full  my-1 justify-start cursor-pointer">
                            <Map className="mr-2 h-4 w-4" />
                            AI-Roadmap
                        </Button>
                    </Link>
                    <Link href="/dashboard/ai-mentor">
                        <Button variant={pathname.includes("profile")?'default':'ghost'} className="w-full  my-1 justify-start cursor-pointer">
                            <BotMessageSquare  className="mr-2 h-4 w-4" />
                            Ai-Mentor
                        </Button>
                    </Link>
                    <Link href="/dashboard/profile">
                        <Button variant={pathname.includes("profile")?'default':'ghost'} className="w-full  my-1 justify-start cursor-pointer">
                            <Map className="mr-2 h-4 w-4" />
                            Profile
                        </Button>
                    </Link>
                   
                    {/* <Link href="/dashboard/setting">
                        <Button variant={pathname.includes("setting")?'default':'ghost'} className="w-full  my-1 justify-start cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            Setting
                        </Button>
                    </Link> */}
                </div>
            </nav>

            <div className="p-4 mt-auto">
                <Button variant="default" className="w-full justify-start cursor-pointer" onClick={handleLogOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </aside>
    )
}
