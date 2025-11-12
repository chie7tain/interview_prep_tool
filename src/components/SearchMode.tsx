import React from 'react';
import { SearchBar } from './SearchBar';
import { QuestionCard } from './QuestionCard';
import { useSearch } from '../hooks/useSearch';

interface SearchModeProps {
  viewedQuestions: string[];
  bookmarkedQuestions: string[];
  onToggleBookmark: (questionId: string) => void;
  onMarkAsViewed: (questionId: string) => void;
}

export function SearchMode({
  viewedQuestions,
  bookmarkedQuestions,
  onToggleBookmark,
  onMarkAsViewed
}: SearchModeProps) {
  const {
    filters,
    filteredQuestions,
    updateFilter,
    clearFilters,
    hasActiveFilters
  } = useSearch();

  const displayQuestions = filters.bookmarkedOnly
    ? filteredQuestions.filter(q => bookmarkedQuestions.includes(q.id))
    : filteredQuestions;

  return (
    <div className="max-w-4xl mx-auto">
      <SearchBar
        filters={filters}
        onUpdateFilter={updateFilter}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="mb-6">
        <div className="text-sm text-gray-600">
          {displayQuestions.length} question{displayQuestions.length !== 1 ? 's' : ''} found
          {hasActiveFilters && (
            <span className="ml-2 text-blue-600">
              • Filters active
            </span>
          )}
        </div>
      </div>

      {displayQuestions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No questions found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search terms or filters
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {displayQuestions.map(question => (
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
      )}
    </div>
  );
}