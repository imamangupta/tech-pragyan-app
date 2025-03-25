"use client";

import { useEffect, useState } from "react";
import { Search, ArrowUpDown, RefreshCw, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BaseUrlApi } from "@/utils/constant";
import { useRouter } from 'next/navigation'

type Student = {
  id: number;
  rank: number;
  name: string;
  totalScore: number;
  physicsScore: number;
  chemistryScore: number;
  mathsScore: number;
  trend: "up" | "down" | "stable";
  paperUrl: string;
};

const sampleData: Student[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  rank: i + 1,
  name: `Student ${i + 1}`,
  totalScore: Math.floor(Math.random() * 300),
  physicsScore: Math.floor(Math.random() * 100),
  chemistryScore: Math.floor(Math.random() * 100),
  mathsScore: Math.floor(Math.random() * 100),
  trend: ["up", "down", "stable"][Math.floor(Math.random() * 3)] as "up" | "down" | "stable",
  paperUrl: `https://example.com/papers/student-${i + 1}`,
}));

export function LeaderboardClient() {
   const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Student[]>(sampleData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [leadData, setLeadData] = useState([])

  

 

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const newData = data.map(student => ({
        ...student,
        totalScore: Math.floor(Math.random() * 300),
        physicsScore: Math.floor(Math.random() * 100),
        chemistryScore: Math.floor(Math.random() * 100),
        mathsScore: Math.floor(Math.random() * 100),
      }));
      setData(newData);
      setIsRefreshing(false);
    }, 1000);
  };

  const handleViewPaper = (paperUrl: string) => {
    
    router.push(`/dashboard/contest/leaderboard/${paperUrl}`)
  };




  const fetchData = async () => {
    const response = await fetch(`${BaseUrlApi}/leaderboard/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',

      },
    });
    const json = await response.json();
    // setData(json.user)
    setLeadData(json.data)
    console.log(json.data);
  }


  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className="min-h-screen bg-white p-4 md:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-blue-50">
          <h1 className="text-3xl font-bold text-blue-900">Student Leaderboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
              <Input
                placeholder="Search by name or rank..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-[250px] border-blue-100 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-blue-50 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-blue-50">
                <TableRow>
                  <TableHead className="w-[100px]">
                    <button
                     
                      className="flex items-center gap-2 text-blue-900 hover:text-blue-700 transition-colors"
                    >
                      Rank
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      
                      className="flex items-center gap-2 text-blue-900 hover:text-blue-700 transition-colors"
                    >
                      Name
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right">
                    <button
                      
                      className="flex items-center gap-2 ml-auto text-blue-900 hover:text-blue-700 transition-colors"
                    >
                      Total Score
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right">
                    <button
                    
                      className="flex items-center gap-2 ml-auto text-blue-900 hover:text-blue-700 transition-colors"
                    >
                      Physics
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right">
                    <button
                    
                      className="flex items-center gap-2 ml-auto text-blue-900 hover:text-blue-700 transition-colors"
                    >
                      Chemistry
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right">
                    <button
                    
                      className="flex items-center gap-2 ml-auto text-blue-900 hover:text-blue-700 transition-colors"
                    >
                      Maths
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>


              <TableBody>
                {leadData?.map((student,index) => (
                  <TableRow
                    key={student._id}
                    className="table-row-hover border-b border-blue-50 hover:bg-blue-50/30 transition-all duration-200"
                    
                  >
                    <TableCell className="font-medium text-blue-900">{index+1}</TableCell>
                    <TableCell className="font-medium">{student.userName}</TableCell>
                    <TableCell className="text-right font-semibold text-blue-700">
                      {student?.totalScore}
                    </TableCell>
                    <TableCell className="text-right text-blue-600">{student?.sectionScores?.physics}</TableCell>
                    <TableCell className="text-right text-blue-600">{student?.sectionScores?.chemistry}</TableCell>
                    <TableCell className="text-right text-blue-600">{student?.sectionScores?.mathematics}</TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewPaper(student._id);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        View Paper
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedStudent(null)}>
            <div className="bg-white rounded-xl p-6 max-w-lg w-full animate-slide-up" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">{selectedStudent.name}</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rank:</span>
                  <span className="font-semibold text-blue-900">#{selectedStudent.rank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Score:</span>
                  <span className="font-semibold text-blue-700">{selectedStudent.totalScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Physics:</span>
                  <span className="text-blue-600">{selectedStudent.physicsScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Chemistry:</span>
                  <span className="text-blue-600">{selectedStudent.chemistryScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Maths:</span>
                  <span className="text-blue-600">{selectedStudent.mathsScore}</span>
                </div>
                <button
                  onClick={() => handleViewPaper(selectedStudent.paperUrl)}
                  className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  View Full Paper
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}