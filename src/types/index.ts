export interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
  codeExample?: string;
  followUpQuestions?: string[];
  estimatedTime?: number; // in minutes
  interviewType?: 'technical' | 'behavioral' | 'system-design';
  companies?: string[];
  lastReviewed?: Date;
  confidenceLevel?: 1 | 2 | 3 | 4 | 5;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
  questions: Question[];
  estimatedStudyTime?: number;
  prerequisites?: string[];
}

export interface UserProgress {
  viewedQuestions: Set<string>;
  bookmarkedQuestions: Set<string>;
  completedCategories: Set<string>;
  quizScores: Record<string, number>;
  studyPlan: StudyPlan;
  practiceHistory: PracticeSession[];
  weakAreas: string[];
  strengths: string[];
  targetCompanies: string[];
  interviewDate?: Date;
}

export interface SearchFilters {
  query: string;
  category: string;
  difficulty: string;
  bookmarkedOnly: boolean;
  interviewType: string;
  company: string;
  confidenceLevel: string;
  needsReview: boolean;
}

export interface StudyPlan {
  id: string;
  name: string;
  targetDate: Date;
  dailyGoal: number; // questions per day
  categories: string[];
  currentStreak: number;
  longestStreak: number;
  completedDays: Date[];
}

export interface PracticeSession {
  id: string;
  date: Date;
  questionsAnswered: number;
  timeSpent: number; // in minutes
  categories: string[];
  averageConfidence: number;
  mode: 'study' | 'quiz' | 'mock-interview';
}

export interface MockInterview {
  id: string;
  date: Date;
  duration: number;
  questions: Question[];
  responses: MockInterviewResponse[];
  overallScore: number;
  feedback: string;
}

export interface MockInterviewResponse {
  questionId: string;
  response: string;
  timeSpent: number;
  confidence: number;
  score: number;
}

export interface StudyNote {
  id: string;
  questionId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}