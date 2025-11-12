import React from "react";
import { BookOpen, Search, Trophy, Star } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

interface HeaderProps {
  progress: {
    totalQuestions: number;
    viewedCount: number;
    bookmarkedCount: number;
    progressPercentage: number;
  };
  onModeChange: (
    mode: "study" | "quiz" | "search" | "mock-interview" | "analytics"
  ) => void;
  currentMode: string;
}

export function Header({ progress, onModeChange, currentMode }: HeaderProps) {
  console.log({ currentMode });
  const handleGuideUserToCategorySelection = () => {
    onModeChange("study");
    toast.info("Please select a category first to enter Study Mode.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Senior React Engineer Interview Guide
          </h1>
          <p className="text-blue-100 text-lg">
            Master React concepts with interactive Q&A, progress tracking, and
            quiz mode
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">Total Questions</p>
                <p className="text-2xl font-bold">{progress.totalQuestions}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">Viewed</p>
                <p className="text-2xl font-bold">{progress.viewedCount}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">Bookmarked</p>
                <p className="text-2xl font-bold">{progress.bookmarkedCount}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">Progress</p>
                <p className="text-2xl font-bold">
                  {progress.progressPercentage}%
                </p>
              </div>
              <div className="w-8 h-8 relative">
                <svg className="transform -rotate-90 w-8 h-8">
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    className="text-blue-300"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 12}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 12 * (1 - progress.progressPercentage / 100)
                    }`}
                    className="text-yellow-400"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            // disabled={currentMode !== "study"}
            onClick={handleGuideUserToCategorySelection}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
              currentMode === "study"
                ? "bg-white text-blue-600 shadow-lg"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Study Mode
          </button>

          <button
            onClick={() => onModeChange("search")}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
              currentMode === "search"
                ? "bg-white text-blue-600 shadow-lg"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <Search className="w-5 h-5" />
            Search Mode
          </button>

          <button
            onClick={() => onModeChange("quiz")}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
              currentMode === "quiz"
                ? "bg-white text-blue-600 shadow-lg"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <Trophy className="w-5 h-5" />
            Quiz Mode
          </button>

          <button
            onClick={() => onModeChange("mock-interview")}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
              currentMode === "mock-interview"
                ? "bg-white text-blue-600 shadow-lg"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <Trophy className="w-5 h-5" />
            Mock Interview
          </button>

          <button
            onClick={() => onModeChange("analytics")}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
              currentMode === "analytics"
                ? "bg-white text-blue-600 shadow-lg"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <Trophy className="w-5 h-5" />
            Analytics
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
