import React, { useEffect } from "react";
import { CategoryCard } from "./CategoryCard";
import { categories } from "../data/questions";
import { getCategories } from "../services/apiCategories";

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
  progress: {
    categoryProgress: Array<{
      categoryId: string;
      categoryTitle: string;
      totalQuestions: number;
      viewedQuestions: number;
      score: number;
    }>;
  };
}

export function CategoryGrid({
  onCategorySelect,
  progress,
}: CategoryGridProps) {
  useEffect(()=>{
    getCategories().then((cats)=>{
      console.log({cats})
    })
  },[])
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose a Category to Study
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select a category below to start studying React interview questions.
          Track your progress and bookmark important questions for later review.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const categoryProgress = progress.categoryProgress.find(
            (p) => p.categoryId === category.id
          );

          return (
            <CategoryCard
              key={category.id}
              category={category}
              progress={{
                totalQuestions: categoryProgress?.totalQuestions || 0,
                viewedQuestions: categoryProgress?.viewedQuestions || 0,
                score: categoryProgress?.score || 0,
              }}
              onSelect={() => onCategorySelect(category.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
