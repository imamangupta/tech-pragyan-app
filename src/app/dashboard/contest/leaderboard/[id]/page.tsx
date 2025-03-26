'use client'
import React, { useState, useEffect } from 'react';
import { Clock, User, AlertTriangle, CheckCircle, XCircle, MinusCircle, BookOpen, Brain, TestTube, PiSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { BaseUrlApi } from '@/utils/constant';
import { useParams } from "next/navigation"
import axios from 'axios';

interface Question {
  id: number;
  text: string;
  selected: string;
  correct: string;
  status: boolean;
  options: Array<{
    id: string;
    value: string;
    label: string;
  }>;
}

interface ResultData {
  totalScore: number;
  sectionScores: {
    physics: number;
    mathematics: number;
    chemistry: number;
  };
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
}

interface TestData {
  _id: string;
  userId: string;
  userName: string;
  subject: Array<{
    id: string;
    title: string;
    marks: number;
    duration: number;
    subject: string[];
  }>;
  answersData: Array<{
    physics: Record<string, any>;
    mathematics: Record<string, any>;
    chemistry: Record<string, any>;
  }>;
  resultData: ResultData[];
  timeSpent: string;
  securityEvents: Array<{
    windowResizeAttempts: boolean;
    multipleFacesDetected: boolean;
    noiseDetected: boolean;
  }>;
  date: string;
}

export default function Page() {


  const params = useParams()
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [testData, setTestData] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseUrlApi}/leaderboard/id`, {
        headers: {
          'Content-Type': 'application/json',
          'id': params.id
        }
      });
      console.log("test data before set",response.data)
      setTestData(response.data.data);
      setLoading(false);
      console.log("test data after set",setTestData)
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  const transformQuestions = (subjectData: Record<string, any> | undefined): Question[] => {
    if (!subjectData) return [];
    return Object.entries(subjectData).map(([id, question]) => ({
      id: parseInt(id),
      text: question.text,
      selected: question.selectedValue,
      correct: question.options.find((opt: any) => opt.id === question.correctAnswer)?.value || '',
      status: question.status,
      options: question.options
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading results...</div>
      </div>
    );
  }

  if (!testData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600 text-xl">Error loading test results</div>
      </div>
    );
  }

  // Add null checks and provide default values
  const physicsQuestions = transformQuestions(
    testData?.answersData?.[0]?.physics || {}
  );
  const mathQuestions = transformQuestions(
    testData?.answersData?.[0]?.mathematics || {}
  );
  const chemistryQuestions = transformQuestions(
    testData?.answersData?.[0]?.chemistry || {}
  );
  
  const resultData = testData.resultData?.[0] || {
    totalScore: 0,
    sectionScores: { physics: 0, mathematics: 0, chemistry: 0 },
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0
  };

  const timeSpent = Math.abs(parseInt(testData.timeSpent || '0')) / 60;


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <User className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">{testData.userName}</h1>
                <p className="text-gray-400">ID: {testData.userId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{new Date(testData.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Test Overview Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border-r border-gray-200 pr-6">
              <h2 className="text-xl font-bold mb-2">Test Details</h2>
              <p className="text-gray-600">{testData.subject[0].title}</p>
              <div className="mt-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Duration: {testData.subject[0].duration} minutes</span>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Total Marks: {testData.subject[0].marks}</span>
              </div>
            </div>

            <div className="border-r border-gray-200 px-6">
              <h2 className="text-xl font-bold mb-2">Performance Summary</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Correct
                  </span>
                  <span className="font-bold">{resultData.correctAnswers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <XCircle className="w-4 h-4 mr-2" />
                    Incorrect
                  </span>
                  <span className="font-bold">{resultData.incorrectAnswers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <MinusCircle className="w-4 h-4 mr-2" />
                    Unanswered
                  </span>
                  <span className="font-bold">{resultData.unanswered}</span>
                </div>
              </div>
            </div>

            <div className="border-r border-gray-200 px-6">
              <h2 className="text-xl font-bold mb-2">Subject Scores</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <TestTube className="w-4 h-4 mr-2" />
                    Physics
                  </span>
                  <span className="font-bold">{resultData.sectionScores.physics}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <PiSquare className="w-4 h-4 mr-2" />
                    Mathematics
                  </span>
                  <span className="font-bold">{resultData.sectionScores.mathematics}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Chemistry
                  </span>
                  <span className="font-bold">{resultData.sectionScores.chemistry}</span>
                </div>
              </div>
            </div>

            <div className="px-6">
              <h2 className="text-xl font-bold mb-2">Security Report</h2>
              <div className="space-y-2">
                <div className={`flex items-center ${testData.securityEvents[0].windowResizeAttempts ? 'text-red-600' : 'text-green-600'}`}>
                  {testData.securityEvents[0].windowResizeAttempts ? (
                    <XCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  <span>Window Resizing</span>
                </div>
                <div className={`flex items-center ${testData.securityEvents[0].multipleFacesDetected ? 'text-red-600' : 'text-green-600'}`}>
                  {testData.securityEvents[0].multipleFacesDetected ? (
                    <XCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  <span>Multiple Faces</span>
                </div>
                <div className={`flex items-center ${testData.securityEvents[0].noiseDetected ? 'text-red-600' : 'text-green-600'}`}>
                  {testData.securityEvents[0].noiseDetected ? (
                    <XCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  <span>Noise Detected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Question Analysis - Left Side */}
          <div className="lg:w-2/3">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Question Analysis</h2>

              {/* Physics Section */}
              <div className="mb-6">
                <button
                  onClick={() => setActiveSubject(activeSubject === 'physics' ? null : 'physics')}
                  className="w-full flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <div className="flex items-center">
                    <TestTube className="w-6 h-6 mr-2" />
                    <span className="text-xl font-semibold">Physics</span>
                  </div>
                  {activeSubject === 'physics' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                {activeSubject === 'physics' && (
                  <div className="mt-4 space-y-6">
                    {physicsQuestions.map((question, index) => (
                      <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                          <p className="text-lg font-medium mb-3">
                            <span className="font-bold mr-2">Q{index + 1}.</span>
                            {question.text}
                          </p>
                          {question.selected === question.correct ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {question.options.map((option) => (
                            <div
                              key={option.id}
                              className={`p-2 rounded ${option.value === question.correct
                                  ? 'bg-green-100 border-2 border-green-500'
                                  : option.value === question.selected && option.value !== question.correct
                                    ? 'bg-red-100 border-2 border-red-500'
                                    : 'bg-white border-2 border-gray-200'
                                }`}
                            >
                              <span className="font-semibold mr-2">{option.id.toUpperCase()})</span>
                              {option.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mathematics Section */}
              <div className="mb-6">
                <button
                  onClick={() => setActiveSubject(activeSubject === 'mathematics' ? null : 'mathematics')}
                  className="w-full flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <div className="flex items-center">
                    <PiSquare className="w-6 h-6 mr-2" />
                    <span className="text-xl font-semibold">Mathematics</span>
                  </div>
                  {activeSubject === 'mathematics' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                {activeSubject === 'mathematics' && (
                  <div className="mt-4 space-y-6">
                    {mathQuestions.map((question, index) => (
                      <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                          <p className="text-lg font-medium mb-3">
                            <span className="font-bold mr-2">Q{index + 1}.</span>
                            {question.text}
                          </p>
                          {question.selected === question.correct ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {question.options.map((option) => (
                            <div
                              key={option.id}
                              className={`p-2 rounded ${option.value === question.correct
                                  ? 'bg-green-100 border-2 border-green-500'
                                  : option.value === question.selected && option.value !== question.correct
                                    ? 'bg-red-100 border-2 border-red-500'
                                    : 'bg-white border-2 border-gray-200'
                                }`}
                            >
                              <span className="font-semibold mr-2">{option.id.toUpperCase()})</span>
                              {option.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Chemistry Section */}
              <div>
                <button
                  onClick={() => setActiveSubject(activeSubject === 'chemistry' ? null : 'chemistry')}
                  className="w-full flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <div className="flex items-center">
                    <Brain className="w-6 h-6 mr-2" />
                    <span className="text-xl font-semibold">Chemistry</span>
                  </div>
                  {activeSubject === 'chemistry' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                {activeSubject === 'chemistry' && (
                  <div className="mt-4 space-y-6">
                    {chemistryQuestions.map((question, index) => (
                      <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                          <p className="text-lg font-medium mb-3">
                            <span className="font-bold mr-2">Q{index + 1}.</span>
                            {question.text}
                          </p>
                          {question.selected === question.correct ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {question.options.map((option) => (
                            <div
                              key={option.id}
                              className={`p-2 rounded ${option.value === question.correct
                                  ? 'bg-green-100 border-2 border-green-500'
                                  : option.value === question.selected && option.value !== question.correct
                                    ? 'bg-red-100 border-2 border-red-500'
                                    : 'bg-white border-2 border-gray-200'
                                }`}
                            >
                              <span className="font-semibold mr-2">{option.id.toUpperCase()})</span>
                              {option.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Score and Time Analysis - Right Side */}
          <div className="lg:w-1/3 space-y-8">
            {/* Total Score Card */}
            <div className="bg-black text-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2">Total Score</h2>
              <p className="text-5xl font-bold">{resultData.totalScore}</p>
              <div className="mt-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span>Needs Improvement</span>
              </div>
            </div>

            {/* Time Analysis */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Time Analysis</h2>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Total Time Allocated</p>
                  <p className="text-2xl font-bold">{testData.subject[0].duration} min</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Time Spent</p>
                  <p className="text-2xl font-bold">{timeSpent.toFixed(1)} min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

