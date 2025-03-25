"use client"
import RoadmapGenerator from "@/components/roadmap-generator"
import { Toaster } from "@/components/ui/toaster"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"
import Sidebar from "@/components/Sidebar"

export default function Page() {
    return (

        <div className="flex min-h-screen bg-gray-50">

            <Sidebar />

            <main className="flex-1 p-6" >
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                {/* <div className="absolute top-4 right-4">
                    <ThemeToggle />
                </div> */}

                <div className=" mx-auto px-4 py-12">
                    <motion.div
                        className="max-w-5xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-center mb-12">
                            <motion.h1
                                className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl mb-4"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                JEE Main Roadmap Generator
                            </motion.h1>
                            <motion.p
                                className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                Create personalized learning paths powered by AI to accelerate your educational journey
                            </motion.p>
                        </div>

                        <motion.div
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <RoadmapGenerator />
                        </motion.div>
                    </motion.div>
                </div>
                <Toaster />
            </div>
            </main>



        </div>




    )
}

