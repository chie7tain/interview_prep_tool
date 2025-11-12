import React, { useState } from "react";

import { Header } from "./components/Header";
import { CategoryGrid } from "./components/CategoryGrid";
import { StudyMode } from "./components/StudyMode";
import { QuizMode } from "./components/QuizMode";
import { SearchMode } from "./components/SearchMode";
import { MockInterview } from "./components/MockInterview";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { StudyPlanManager } from "./components/StudyPlanManager";
import { StudyNotes } from "./components/StudyNotes";
import { CompanySpecificPrep } from "./components/CompanySpecificPrep";
import { useProgress } from "./hooks/useProgress";
import { categories } from "./data/questions";
import {
  StudyPlan,
  PracticeSession,
  MockInterview as MockInterviewType,
  StudyNote,
} from "./types";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./services/apiCategories";
import { getQuestionsByCategory } from "./services/apiQuestions";

type AppMode =
  | "categories"
  | "study"
  | "quiz"
  | "search"
  | "mock-interview"
  | "analytics"
  | "study-plan"
  | "notes"
  | "companies";

function App() {
  const [mode, setMode] = useState<AppMode>("categories");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [practiceHistory, setPracticeHistory] = useState<PracticeSession[]>([]);
  const [mockInterviews, setMockInterviews] = useState<MockInterviewType[]>([]);
  const [studyNotes, setStudyNotes] = useState<StudyNote[]>([]);
  const [weakAreas, setWeakAreas] = useState<string[]>([
    "Performance Optimization",
    "Testing",
  ]);
  const [strengths, setStrengths] = useState<string[]>([
    "React Fundamentals",
    "State Management",
  ]);

  const { isPending, isSuccess, isError, data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const questions = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestionsByCategory(selectedCategoryId),
  });

  console.log({ data });
  const {
    viewedQuestions,
    bookmarkedQuestions,
    markAsViewed,
    toggleBookmark,
    updateQuizScore,
    progress,
    quizScores,
  } = useProgress();

  const selectedCategory = selectedCategoryId
    ? categories.find((cat) => cat.id === selectedCategoryId)
    : null;
  console.log({ selectedCategory });
  const handleModeChange = (
    newMode:
      | "study"
      | "quiz"
      | "search"
      | "mock-interview"
      | "analytics"
      | "study-plan"
      | "notes"
      | "companies"
  ) => {
    if (newMode === "study" || newMode === "quiz") {
      setSelectedCategoryId(null);
      setMode("categories");
    } else {
      setMode(newMode);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setMode("study"); // Default to study mode when selecting a category
  };

  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setMode("categories");
  };

  const handleQuizModeStart = () => {
    setMode("quiz");
  };

  const handleQuizComplete = (score: number) => {
    if (selectedCategoryId) {
      updateQuizScore(selectedCategoryId, score);
    }
  };

  const handleCreateStudyPlan = (plan: Omit<StudyPlan, "id">) => {
    const newPlan: StudyPlan = {
      ...plan,
      id: Date.now().toString(),
    };
    setStudyPlan(newPlan);
  };

  const handleUpdateStudyPlan = (plan: StudyPlan) => {
    setStudyPlan(plan);
  };

  const handleMockInterviewComplete = (interview: MockInterviewType) => {
    setMockInterviews((prev) => [...prev, interview]);
    setMode("analytics"); // Show results
  };

  const handleAddNote = (
    note: Omit<StudyNote, "id" | "createdAt" | "updatedAt">
  ) => {
    const newNote: StudyNote = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setStudyNotes((prev) => [...prev, newNote]);
  };

  const handleUpdateNote = (note: StudyNote) => {
    setStudyNotes((prev) => prev.map((n) => (n.id === note.id ? note : n)));
  };

  const handleDeleteNote = (noteId: string) => {
    setStudyNotes((prev) => prev.filter((n) => n.id !== noteId));
  };
  console.log({ categories });
  const allQuestions = categories.flatMap((cat) => cat.questions);

  // Add navigation items to header
  const navigationItems = [
    { key: "study-plan", label: "Study Plan", icon: "📅" },
    { key: "companies", label: "Companies", icon: "🏢" },
    { key: "notes", label: "Notes", icon: "📝" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        progress={progress}
        onModeChange={handleModeChange}
        currentMode={mode}
      />

      <main className="container mx-auto px-6 py-8">
        {/* Navigation Menu */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white rounded-xl shadow-lg p-2 flex gap-2">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setMode(item.key as AppMode)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  mode === item.key
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {mode === "search" && (
          <SearchMode
            viewedQuestions={viewedQuestions}
            bookmarkedQuestions={bookmarkedQuestions}
            onToggleBookmark={toggleBookmark}
            onMarkAsViewed={markAsViewed}
          />
        )}

        {mode === "mock-interview" && (
          <MockInterview
            onComplete={handleMockInterviewComplete}
            onBack={() => setMode("categories")}
          />
        )}

        {mode === "analytics" && (
          <AnalyticsDashboard
            practiceHistory={practiceHistory}
            viewedQuestions={viewedQuestions}
            bookmarkedQuestions={bookmarkedQuestions}
            quizScores={quizScores}
            weakAreas={weakAreas}
            strengths={strengths}
          />
        )}

        {mode === "study-plan" && (
          <StudyPlanManager
            studyPlan={studyPlan}
            practiceHistory={practiceHistory}
            onCreatePlan={handleCreateStudyPlan}
            onUpdatePlan={handleUpdateStudyPlan}
          />
        )}

        {mode === "notes" && (
          <StudyNotes
            notes={studyNotes}
            questions={allQuestions}
            onAddNote={handleAddNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
          />
        )}

        {mode === "companies" && (
          <CompanySpecificPrep
            questions={allQuestions}
            onSelectCompany={(companyId) =>
              console.log("Selected company:", companyId)
            }
          />
        )}

        {mode === "categories" && (
          <CategoryGrid
            onCategorySelect={handleCategorySelect}
            progress={progress}
          />
        )}

        {mode === "study" && selectedCategory && (
          <div>
            <div className="mb-6 text-center">
              <button
                onClick={handleQuizModeStart}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Switch to Quiz Mode
              </button>
            </div>
            <StudyMode
              category={selectedCategory}
              onBack={handleBackToCategories}
              viewedQuestions={viewedQuestions}
              bookmarkedQuestions={bookmarkedQuestions}
              onToggleBookmark={toggleBookmark}
              onMarkAsViewed={markAsViewed}
            />
          </div>
        )}

        {mode === "quiz" && selectedCategory && (
          <QuizMode
            category={selectedCategory}
            onBack={handleBackToCategories}
            onComplete={handleQuizComplete}
            bookmarkedQuestions={bookmarkedQuestions}
            onToggleBookmark={toggleBookmark}
            onMarkAsViewed={markAsViewed}
          />
        )}
      </main>
    </div>
  );
}

export default App;
