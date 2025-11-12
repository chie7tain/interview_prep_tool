import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { SearchFilters } from '../types';
import { categories } from '../data/questions';

interface SearchBarProps {
  filters: SearchFilters;
  onUpdateFilter: (key: keyof SearchFilters, value: string | boolean) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function SearchBar({ 
  filters, 
  onUpdateFilter, 
  onClearFilters, 
  hasActiveFilters 
}: SearchBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search questions and answers..."
            value={filters.query}
            onChange={(e) => onUpdateFilter('query', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        <select
          value={filters.category}
          onChange={(e) => onUpdateFilter('category', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>

        <select
          value={filters.difficulty}
          onChange={(e) => onUpdateFilter('difficulty', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.bookmarkedOnly}
            onChange={(e) => onUpdateFilter('bookmarkedOnly', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Bookmarked only
        </label>
      </div>
    </div>
  );
}