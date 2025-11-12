import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star, BookmarkCheck, Eye } from 'lucide-react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  isBookmarked: boolean;
  isViewed: boolean;
  onToggleBookmark: (questionId: string) => void;
  onMarkAsViewed: (questionId: string) => void;
  showAnswer?: boolean;
  isQuizMode?: boolean;
}

export function QuestionCard({
  question,
  isBookmarked,
  isViewed,
  onToggleBookmark,
  onMarkAsViewed,
  showAnswer = true,
  isQuizMode = false
}: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(!isQuizMode);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (!isViewed && !isExpanded) {
      onMarkAsViewed(question.id);
    }
  };

  const getDifficultyColor = (difficulty: string | undefined) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAnswer = (answer: string) => {
    // Convert markdown-style formatting to HTML
    return answer
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```(javascript|typescript|jsx|yaml)([\s\S]*?)```/g, 
        '<pre class="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
      .replace(/^• (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/(<li.*<\/li>)/s, '<ul class="list-disc pl-4 space-y-1">$1</ul>')
      .split('\n\n')
      .map(paragraph => paragraph.trim() ? `<p class="mb-4">${paragraph}</p>` : '')
      .join('');
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border-l-4 transition-all duration-300 hover:shadow-xl ${
      isViewed ? 'border-l-green-500' : 'border-l-blue-500'
    }`}>
      <div className="p-6">
        {/* Question Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              {question.difficulty && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getDifficultyColor(question.difficulty)
                }`}>
                  {question.difficulty}
                </span>
              )}
              <span className="text-sm text-gray-500">
                {question.category.replace('-', ' ')}
              </span>
              {isViewed && (
                <Eye className="w-4 h-4 text-green-500" />
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
              {question.question}
            </h3>

            {question.tags && (
              <div className="flex flex-wrap gap-2 mt-3">
                {question.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => onToggleBookmark(question.id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100'
                  : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <Star className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {showAnswer && (
              <button
                onClick={handleToggle}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label={isExpanded ? 'Hide answer' : 'Show answer'}
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Answer Section */}
        {showAnswer && isExpanded && (
          <div className="border-t pt-4">
            <div
              className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatAnswer(question.answer) }}
            />
          </div>
        )}

        {/* Quiz Mode Answer Button */}
        {isQuizMode && !isExpanded && (
          <div className="mt-4">
            <button
              onClick={handleToggle}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reveal Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}