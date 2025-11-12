import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { Category, Question } from '../types';
import { QuestionCard } from './QuestionCard';

interface QuizModeProps {
  category: Category;
  onBack: () => void;
  onComplete: (score: number) => void;
  bookmarkedQuestions: string[];
  onToggleBookmark: (questionId: string) => void;
  onMarkAsViewed: (questionId: string) => void;
}

export function QuizMode({
  category,
  onBack,
  onComplete,
  bookmarkedQuestions,
  onToggleBookmark,
  onMarkAsViewed
}: QuizModeProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  const currentQuestion = category.questions[currentQuestionIndex];
  const totalQuestions = category.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleAnswer = (isCorrect: boolean) => {
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: isCorrect }));
    setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]));
    onMarkAsViewed(currentQuestion.id);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      showQuizResults();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const showQuizResults = () => {
    setShowResults(true);
    const correctAnswers = Object.values(userAnswers).filter(Boolean).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    onComplete(score);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setAnsweredQuestions(new Set());
  };

  const correctAnswers = Object.values(userAnswers).filter(Boolean).length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600">
              You scored {correctAnswers} out of {totalQuestions} questions
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">{score}%</div>
            <div className="text-lg text-gray-600">Final Score</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 rounded-lg p-4">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="font-semibold text-green-900">{correctAnswers}</div>
              <div className="text-sm text-green-700">Correct</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="font-semibold text-red-900">{totalQuestions - correctAnswers}</div>
              <div className="text-sm text-red-700">Incorrect</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <Trophy className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="font-semibold text-blue-900">{totalQuestions}</div>
              <div className="text-sm text-blue-700">Total</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Retake Quiz
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Categories
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Categories
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          {category.icon} {category.title} Quiz
        </h1>
      </div>

      {/* Current Question */}
      <div className="mb-6">
        <QuestionCard
          question={currentQuestion}
          isBookmarked={bookmarkedQuestions.includes(currentQuestion.id)}
          isViewed={answeredQuestions.has(currentQuestion.id)}
          onToggleBookmark={onToggleBookmark}
          onMarkAsViewed={onMarkAsViewed}
          showAnswer={false}
          isQuizMode={true}
        />
      </div>

      {/* Answer Options for Quiz */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate your understanding:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleAnswer(false)}
            className={`p-4 rounded-lg border-2 transition-all ${
              userAnswers[currentQuestion.id] === false
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-300 hover:border-red-300 hover:bg-red-50'
            }`}
          >
            <XCircle className="w-6 h-6 mx-auto mb-2" />
            Need to Review
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className={`p-4 rounded-lg border-2 transition-all ${
              userAnswers[currentQuestion.id] === true
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 hover:border-green-300 hover:bg-green-50'
            }`}
          >
            <CheckCircle className="w-6 h-6 mx-auto mb-2" />
            Understood Well
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="text-sm text-gray-600">
          {Object.keys(userAnswers).length} of {totalQuestions} answered
        </div>

        <button
          onClick={handleNext}
          disabled={!answeredQuestions.has(currentQuestion.id)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}