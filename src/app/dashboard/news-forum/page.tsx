import Sidebar from '@/components/Sidebar'
import React from 'react'

export default function page() {
  return (
      <>
            <div className="flex min-h-screen bg-gray-50">
        
              <Sidebar />
              <div>
                <h1>News Forum</h1>
            </div>
            </div>
        </>
  )
}
