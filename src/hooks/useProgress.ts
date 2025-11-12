import { useState, useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { categories } from "../data/questions";

export function useProgress() {
  const [viewedQuestions, setViewedQuestions] = useLocalStorage<string[]>(
    "viewedQuestions",
    []
  );
  const [bookmarkedQuestions, setBookmarkedQuestions] = useLocalStorage<
    string[]
  >("bookmarkedQuestions", []);
  const [quizScores, setQuizScores] = useLocalStorage<Record<string, number>>(
    "quizScores",
    {}
  );

  const markAsViewed = useCallback(
    (questionId: string) => {
      setViewedQuestions((prev) =>
        prev.includes(questionId) ? prev : [...prev, questionId]
      );
    },
    [setViewedQuestions]
  );

  const toggleBookmark = useCallback(
    (questionId: string) => {
      setBookmarkedQuestions((prev) =>
        prev.includes(questionId)
          ? prev.filter((id) => id !== questionId)
          : [...prev, questionId]
      );
    },
    [setBookmarkedQuestions]
  );

  const updateQuizScore = useCallback(
    (categoryId: string, score: number) => {
      setQuizScores((prev) => ({ ...prev, [categoryId]: score }));
    },
    [setQuizScores]
  );

  const progress = useMemo(() => {
    const totalQuestions = categories.reduce(
      (total, category) => total + category.questions.length,
      0
    );
    const viewedCount = viewedQuestions.length;
    const bookmarkedCount = bookmarkedQuestions.length;

    return {
      totalQuestions,
      viewedCount,
      bookmarkedCount,
      progressPercentage: Math.round((viewedCount / totalQuestions) * 100) || 0,
      categoryProgress: categories.map((category) => ({
        categoryId: category.id,
        categoryTitle: category.title,
        totalQuestions: category.questions.length,
        viewedQuestions: category.questions.filter((q) =>
          viewedQuestions.includes(q.id)
        ).length,
        score: quizScores[category.id] || 0,
      })),
    };
  }, [viewedQuestions, bookmarkedQuestions, quizScores]);

  return {
    viewedQuestions,
    bookmarkedQuestions,
    quizScores,
    markAsViewed,
    toggleBookmark,
    updateQuizScore,
    progress,
  };
}
