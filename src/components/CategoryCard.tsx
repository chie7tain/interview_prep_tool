import React from 'react';
import { ChevronRight, Trophy } from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  progress: {
    totalQuestions: number;
    viewedQuestions: number;
    score: number;
  };
  onSelect: () => void;
}

export function CategoryCard({ category, progress, onSelect }: CategoryCardProps) {
  const progressPercentage = Math.round((progress.viewedQuestions / progress.totalQuestions) * 100) || 0;
  
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-l-4 border-l-blue-500"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label={category.title}>
              {category.icon}
            </span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold text-gray-900">
              {progress.viewedQuestions}/{progress.totalQuestions} questions
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{progressPercentage}% complete</span>
            {progress.score > 0 && (
              <div className="flex items-center gap-1 text-sm text-yellow-600">
                <Trophy className="w-4 h-4" />
                <span>{progress.score}% quiz score</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}