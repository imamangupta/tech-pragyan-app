"use client"
import Sidebar from '@/components/Sidebar'
import React  from 'react'
import {
  Search,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import React from 'react';

// import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileIcon } from 'lucide-react';
import TestModel from './components/TestModel'


interface TestItem {
  id: string;
  title: string;
  marks: number;
  duration: number;
  isSelected?: boolean;
  subject:string[];
}
export default function Page() {

  const [tests, setTests] = useState<TestItem[]>([
    { id: '1', title: 'Jee Main Mock Test', marks: 300, duration: 180, subject:['Physics','Chemistry','Mathematics'] },
    { id: '2', title: 'Jee Physics Mock Test', marks: 40, duration: 10 ,subject:['Physics']},
    { id: '3', title: 'Jee Chemistry Mock Test', marks: 40, duration: 10,subject:['Chemistry'] },
    { id: '4', title: 'Jee Mathematics Mock Test', marks: 40, duration: 10, subject:['Mathematics'] }
  ]);

  const handleSelect = (id: string) => {
    setTests(tests.map(test => ({
      ...test,
      isSelected: test.id === id
    })));
  };

  return (
    <div className="flex min-h-screen bg-zinc-200">

      <Sidebar />

      <main className="flex-1 p-6" >
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Ai - Mock Test</h1>
            <p className="text-gray-500">Tuesday, 18 March, 2025</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Search className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt={'aman'} />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div>
          <div className="w-full  mx-auto p-4 space-y-4">
            {tests.map((test,index) => (
              <Card
                key={test.id}
                className={`border-2 transition-all ${test.isSelected ? 'border-blue-500 shadow-md' : 'border-gray-200'}`}
                onClick={() => handleSelect(test.id)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <FileIcon className="text-gray-500 w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{test.title}</h3>
                        <p className="text-gray-500 text-sm">{test.marks} Marks {test.duration} min</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <TestModel subjectData={tests[index]}/>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

    </div>
  )
}
