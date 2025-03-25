import { LeaderboardClient } from '@/components/leaderboard-client'
import Sidebar from '@/components/Sidebar'
import React from 'react'

export default function page() {




  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar />


      <main className="flex-1 p-6">



        <LeaderboardClient />



        <footer className="mt-8 text-center text-gray-500 text-sm">All Right Reserved to PrepGen | © PrepGen</footer>
      </main>
    </div>
  )
}
