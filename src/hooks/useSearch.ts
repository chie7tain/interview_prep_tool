import { useState, useMemo } from 'react';
import { Question, SearchFilters } from '../types';
import { categories } from '../data/questions';

export function useSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    difficulty: '',
    bookmarkedOnly: false
  });

  const allQuestions = useMemo(() => 
    categories.flatMap(category => category.questions), []
  );

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(question => {
      // Text search
      if (filters.query) {
        const searchText = filters.query.toLowerCase();
        const matchesQuery = 
          question.question.toLowerCase().includes(searchText) ||
          question.answer.toLowerCase().includes(searchText) ||
          question.tags?.some(tag => tag.toLowerCase().includes(searchText));
        
        if (!matchesQuery) return false;
      }

      // Category filter
      if (filters.category && question.category !== filters.category) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty && question.difficulty !== filters.difficulty) {
        return false;
      }

      return true;
    });
  }, [allQuestions, filters]);

  const updateFilter = (key: keyof SearchFilters, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: '',
      difficulty: '',
      bookmarkedOnly: false
    });
  };

  return {
    filters,
    filteredQuestions,
    updateFilter,
    clearFilters,
    hasActiveFilters: Boolean(
      filters.query || filters.category || filters.difficulty || filters.bookmarkedOnly
    )
  };
}