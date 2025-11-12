import React from 'react';
import { BarChart, TrendingUp, Clock, Target, Award, Brain, AlertCircle, CheckCircle } from 'lucide-react';
import { PracticeSession, Question } from '../types';
import { categories } from '../data/questions';

interface AnalyticsDashboardProps {
  practiceHistory: PracticeSession[];
  viewedQuestions: string[];
  bookmarkedQuestions: string[];
  quizScores: Record<string, number>;
  weakAreas: string[];
  strengths: string[];
}

export function AnalyticsDashboard({
  practiceHistory,
  viewedQuestions,
  bookmarkedQuestions,
  quizScores,
  weakAreas,
  strengths
}: AnalyticsDashboardProps) {
  const calculateStats = () => {
    const totalQuestions = categories.reduce((sum, cat) => sum + cat.questions.length, 0);
    const totalStudyTime = practiceHistory.reduce((sum, session) => sum + session.timeSpent, 0);
    const averageSessionTime = practiceHistory.length > 0 ? totalStudyTime / practiceHistory.length : 0;
    const averageConfidence = practiceHistory.length > 0 
      ? practiceHistory.reduce((sum, session) => sum + session.averageConfidence, 0) / practiceHistory.length 
      : 0;

    return {
      totalQuestions,
      viewedPercentage: (viewedQuestions.length / totalQuestions) * 100,
      totalStudyTime,
      averageSessionTime,
      averageConfidence,
      totalSessions: practiceHistory.length
    };
  };

  const getCategoryProgress = () => {
    return categories.map(category => {
      const categoryQuestions = category.questions.map(q => q.id);
      const viewedInCategory = viewedQuestions.filter(id => categoryQuestions.includes(id)).length;
      const bookmarkedInCategory = bookmarkedQuestions.filter(id => categoryQuestions.includes(id)).length;
      const quizScore = quizScores[category.id] || 0;

      return {
        ...category,
        progress: (viewedInCategory / category.questions.length) * 100,
        viewedCount: viewedInCategory,
        bookmarkedCount: bookmarkedInCategory,
        quizScore
      };
    });
  };

  const getWeeklyProgress = () => {
    const weeks = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - (i * 7));
      weekStart.setHours(0, 0, 0, 0);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const weekSessions = practiceHistory.filter(session => 
        session.date >= weekStart && session.date <= weekEnd
      );

      weeks.push({
        week: `${weekStart.getMonth() + 1}/${weekStart.getDate()}`,
        sessions: weekSessions.length,
        questions: weekSessions.reduce((sum, s) => sum + s.questionsAnswered, 0),
        time: weekSessions.reduce((sum, s) => sum + s.timeSpent, 0)
      });
    }

    return weeks;
  };

  const stats = calculateStats();
  const categoryProgress = getCategoryProgress();
  const weeklyProgress = getWeeklyProgress();

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Questions Viewed</p>
              <p className="text-2xl font-bold text-blue-600">
                {viewedQuestions.length}/{stats.totalQuestions}
              </p>
              <p className="text-sm text-gray-500">{stats.viewedPercentage.toFixed(1)}% complete</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Study Time</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(stats.totalStudyTime)}m
              </p>
              <p className="text-sm text-gray-500">{Math.round(stats.averageSessionTime)}m avg/session</p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Confidence</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.averageConfidence.toFixed(1)}/5
              </p>
              <p className="text-sm text-gray-500">{stats.totalSessions} sessions</p>
            </div>
            <Brain className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bookmarked</p>
              <p className="text-2xl font-bold text-orange-600">{bookmarkedQuestions.length}</p>
              <p className="text-sm text-gray-500">for review</p>
            </div>
            <Award className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Weekly Progress
        </h3>
        
        <div className="space-y-4">
          {weeklyProgress.map((week, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-600">{week.week}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{week.questions} questions</span>
                  <span className="text-xs text-gray-500">({week.time}m)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (week.questions / 20) * 100)}%` }}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600">{week.sessions} sessions</div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BarChart className="w-6 h-6" />
          Category Performance
        </h3>
        
        <div className="space-y-4">
          {categoryProgress.map(category => (
            <div key={category.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{category.title}</h4>
                    <p className="text-sm text-gray-600">
                      {category.viewedCount}/{category.questions.length} viewed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    {category.progress.toFixed(0)}%
                  </div>
                  {category.quizScore > 0 && (
                    <div className="text-sm text-blue-600">
                      Quiz: {category.quizScore}%
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${category.progress}%` }}
                />
              </div>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>{category.bookmarkedCount} bookmarked</span>
                <span>{category.questions.length} total questions</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            Strengths
          </h3>
          
          {strengths.length > 0 ? (
            <div className="space-y-2">
              {strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-800">{strength}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Complete more quizzes to identify your strengths</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-orange-500" />
            Areas for Improvement
          </h3>
          
          {weakAreas.length > 0 ? (
            <div className="space-y-2">
              {weakAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span className="text-orange-800">{area}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Complete more quizzes to identify areas for improvement</p>
          )}
        </div>
      </div>
    </div>
  );
}