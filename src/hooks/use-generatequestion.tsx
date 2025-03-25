'use client'
import { useState, useMemo } from 'react';
// Types for question structure
interface QuestionOption {
  id: string;
  value: string;
  label: string;
}

interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
  points: string;
  correctAnswer: string;
}

interface SubjectQuestions {
  id: string;
  name: string;
  questions: Question[];
}

// Configuration for question generation
interface QuestionGenerationConfig {
  questionCount?: number;
  includeHistoricalQuestions?: boolean;
  difficultyLevel?: 'easy' | 'medium' | 'hard';
}

const useGenerateQuestion = (  subjects: string[],   config: QuestionGenerationConfig = {}): SubjectQuestions[] => {
  const {
    questionCount = 30,
    includeHistoricalQuestions = true,
    difficultyLevel = 'medium'
  } = config;

  // Memoized question generation to prevent unnecessary re-renders
  const generatedQuestions = useMemo(() => {
    return subjects.map(subject => {
      switch(subject.toLowerCase()) {
        case 'physics':
          return generatePhysicsQuestions(questionCount, difficultyLevel);
        case 'mathematics':
          return generateMathQuestions(questionCount, difficultyLevel);
        case 'chemistry':
          return generateChemistryQuestions(questionCount, difficultyLevel);
        default:
          return generateDefaultQuestions(subject, questionCount);
      }
    });
  }, [subjects, questionCount, difficultyLevel]);

  return generatedQuestions;
};

// Physics question generator
const generatePhysicsQuestions = (count: number, difficulty: string): SubjectQuestions => {
  return {
    id: 'physics',
    name: 'Physics',
    questions: Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      text: generatePhysicsQuestionText(i, difficulty),
      options: generatePhysicsOptions(i, difficulty),
      points: "4/-1",
      correctAnswer: determineCorrectPhysicsAnswer(i, difficulty)
    }))
  };
};

// Mathematics question generator
const generateMathQuestions = (count: number, difficulty: string): SubjectQuestions => {
  return {
    id: 'mathematics',
    name: 'Mathematics',
    questions: Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      text: generateMathQuestionText(i, difficulty),
      options: generateMathOptions(i, difficulty),
      points: "4/-1",
      correctAnswer: determineMathCorrectAnswer(i, difficulty)
    }))
  };
};

// Chemistry question generator
const generateChemistryQuestions = (count: number, difficulty: string): SubjectQuestions => {
  return {
    id: 'chemistry',
    name: 'Chemistry',
    questions: Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      text: generateChemistryQuestionText(i, difficulty),
      options: generateChemistryOptions(i, difficulty),
      points: "4/-1",
      correctAnswer: determineChemistryCorrectAnswer(i, difficulty)
    }))
  };
};

// Default question generator for unknown subjects
const generateDefaultQuestions = (subject: string, count: number): SubjectQuestions => {
  return {
    id: subject.toLowerCase(),
    name: subject,
    questions: Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      text: `Generic Question ${i + 1} in ${subject}`,
      options: [
        { id: "a", value: "1", label: "Option A" },
        { id: "b", value: "2", label: "Option B" },
        { id: "c", value: "3", label: "Option C" },
        { id: "d", value: "4", label: "Option D" },
      ],
      points: "4/-1",
      correctAnswer: "b"
    }))
  };
};

// Specific question generation helpers (simplified examples)
const generatePhysicsQuestionText = (index: number, difficulty: string) => {
  switch(difficulty) {
    case 'easy':
      return `Simple Physics Question ${index + 1}: A car moves at a constant speed of ${20 + index} m/s.`;
    case 'hard':
      return `Advanced Physics Question ${index + 1}: Analyze the quantum mechanical behavior of a particle with momentum ${50 + index} kg⋅m/s.`;
    default:
      return `Physics Question ${index + 1}: A car accelerates uniformly from rest to a speed of ${20 + index} m/s in 5 seconds.`;
  }
};

const generatePhysicsOptions = (index: number, difficulty: string): QuestionOption[] => {
  return [
    { id: "a", value: "2", label: `${(20 + index) / 10} m/s²` },
    { id: "b", value: "4", label: `${(20 + index) / 5} m/s²` },
    { id: "c", value: "5", label: `${(20 + index) / 4} m/s²` },
    { id: "d", value: "10", label: `${(20 + index) / 2} m/s²` },
  ];
};

const determineCorrectPhysicsAnswer = (index: number, difficulty: string) => "4";

// Similar helper functions for Math and Chemistry (simplified here)
const generateMathQuestionText = (index: number, difficulty: string) => 
  `Math Question ${index + 1}: If f(x) = ${index + 2}x² + ${index}x + ${index * 2}, what is f'(${index})?`;

const generateMathOptions = (index: number, difficulty: string): QuestionOption[] => [
  { id: "a", value: `${(index + 2) * 2 * index + index}`, label: `${(index + 2) * 2 * index + index}` },
  { id: "b", value: `${(index + 2) * 2 * (index + 1) + index}`, label: `${(index + 2) * 2 * (index + 1) + index}` },
  { id: "c", value: `${(index + 2) * 2 * (index - 1) + index}`, label: `${(index + 2) * 2 * (index - 1) + index}` },
  { id: "d", value: `${(index + 2) * index + index}`, label: `${(index + 2) * index + index}` },
];

const determineMathCorrectAnswer = (index: number, difficulty: string) => 
  `${(index + 2) * 2 * index + index}`;

const generateChemistryQuestionText = (index: number, difficulty: string) => 
  `Chemistry Question ${index + 1}: What is the pH of a solution with a hydrogen ion concentration of ${Math.pow(10, -(index % 14))} M?`;

const generateChemistryOptions = (index: number, difficulty: string): QuestionOption[] => [
  { id: "a", value: `${index % 14}`, label: `${index % 14}` },
  { id: "b", value: `${(index % 14) + 1}`, label: `${(index % 14) + 1}` },
  { id: "c", value: `${(index % 14) - 1}`, label: `${(index % 14) - 1}` },
  { id: "d", value: `${14 - (index % 14)}`, label: `${14 - (index % 14)}` },
];

const determineChemistryCorrectAnswer = (index: number, difficulty: string) => 
  `${index % 14}`;

export default useGenerateQuestion;

// Example usage
// const questions = useGenerateQuestion(['Physics', 'Chemistry', 'Mathematics'], {
//   questionCount: 30,
//   includeHistoricalQuestions: true,
//   difficultyLevel: 'medium'
// });