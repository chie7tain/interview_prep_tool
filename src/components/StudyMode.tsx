import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Category } from '../types';
import { QuestionCard } from './QuestionCard';

interface StudyModeProps {
  category: Category;
  onBack: () => void;
  viewedQuestions: string[];
  bookmarkedQuestions: string[];
  onToggleBookmark: (questionId: string) => void;
  onMarkAsViewed: (questionId: string) => void;
}

export function StudyMode({
  category,
  onBack,
  viewedQuestions,
  bookmarkedQuestions,
  onToggleBookmark,
  onMarkAsViewed
}: StudyModeProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  return (
    <div className="max-w-4xl mx-auto">
      {/* Category Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Categories
        </button>
        
        <div className="flex items-center gap-4">
          <span className="text-4xl" role="img" aria-label={category.title}>
            {category.icon}
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{category.title}</h1>
            <p className="text-gray-600 mt-1">{category.description}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
          <span>{category.questions.length} questions</span>
          <span>•</span>
          <span>
            {category.questions.filter(q => viewedQuestions.includes(q.id)).length} viewed
          </span>
          <span>•</span>
          <span>
            {category.questions.filter(q => bookmarkedQuestions.includes(q.id)).length} bookmarked
          </span>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {category.questions.map(question => (
          <QuestionCard
            key={question.id}
            question={question}
            isBookmarked={bookmarkedQuestions.includes(question.id)}
            isViewed={viewedQuestions.includes(question.id)}
            onToggleBookmark={onToggleBookmark}
            onMarkAsViewed={onMarkAsViewed}
            showAnswer={true}
            isQuizMode={false}
          />
        ))}
      </div>
    </div>
  );
}