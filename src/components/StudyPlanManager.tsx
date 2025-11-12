import React, { useState } from 'react';
import { Calendar, Target, TrendingUp, Clock, Award, CheckCircle } from 'lucide-react';
import { StudyPlan, PracticeSession } from '../types';

interface StudyPlanManagerProps {
  studyPlan: StudyPlan | null;
  practiceHistory: PracticeSession[];
  onCreatePlan: (plan: Omit<StudyPlan, 'id'>) => void;
  onUpdatePlan: (plan: StudyPlan) => void;
}

export function StudyPlanManager({ 
  studyPlan, 
  practiceHistory, 
  onCreatePlan, 
  onUpdatePlan 
}: StudyPlanManagerProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    targetDate: '',
    dailyGoal: 5,
    categories: [] as string[]
  });

  const handleCreatePlan = () => {
    const newPlan: Omit<StudyPlan, 'id'> = {
      ...formData,
      targetDate: new Date(formData.targetDate),
      currentStreak: 0,
      longestStreak: 0,
      completedDays: []
    };
    onCreatePlan(newPlan);
    setShowCreateForm(false);
    setFormData({ name: '', targetDate: '', dailyGoal: 5, categories: [] });
  };

  const calculateProgress = () => {
    if (!studyPlan) return { daysLeft: 0, progress: 0, onTrack: false };
    
    const now = new Date();
    const daysLeft = Math.ceil((studyPlan.targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = studyPlan.completedDays.length;
    const expectedDays = Math.floor((now.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    const progress = totalDays / Math.max(expectedDays, 1) * 100;
    
    return {
      daysLeft: Math.max(0, daysLeft),
      progress: Math.min(100, progress),
      onTrack: progress >= 80
    };
  };

  const getWeeklyStats = () => {
    const lastWeek = practiceHistory.filter(session => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return session.date >= weekAgo;
    });

    return {
      sessionsThisWeek: lastWeek.length,
      questionsThisWeek: lastWeek.reduce((sum, session) => sum + session.questionsAnswered, 0),
      timeThisWeek: lastWeek.reduce((sum, session) => sum + session.timeSpent, 0),
      averageConfidence: lastWeek.length > 0 
        ? lastWeek.reduce((sum, session) => sum + session.averageConfidence, 0) / lastWeek.length 
        : 0
    };
  };

  const progress = calculateProgress();
  const weeklyStats = getWeeklyStats();

  if (!studyPlan) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center">
          <Target className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Create Your Study Plan</h3>
          <p className="text-gray-600 mb-6">
            Set goals, track progress, and stay motivated with a personalized study plan
          </p>
          
          {!showCreateForm ? (
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Study Plan
            </button>
          ) : (
            <div className="max-w-md mx-auto text-left">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., FAANG Interview Prep"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Interview Date
                  </label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Daily Goal (questions)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.dailyGoal}
                    onChange={(e) => setFormData({ ...formData, dailyGoal: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleCreatePlan}
                    disabled={!formData.name || !formData.targetDate}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Create Plan
                  </button>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Study Plan Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{studyPlan.name}</h3>
            <p className="text-gray-600">
              Target: {studyPlan.targetDate.toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{progress.daysLeft}</div>
            <div className="text-sm text-gray-600">days left</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className={`text-sm font-medium ${progress.onTrack ? 'text-green-600' : 'text-orange-600'}`}>
              {progress.progress.toFixed(0)}% {progress.onTrack ? '(On Track)' : '(Behind Schedule)'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                progress.onTrack ? 'bg-green-500' : 'bg-orange-500'
              }`}
              style={{ width: `${Math.min(100, progress.progress)}%` }}
            />
          </div>
        </div>

        {/* Streak Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{studyPlan.currentStreak}</div>
            <div className="text-sm text-gray-600">Current Streak</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{studyPlan.longestStreak}</div>
            <div className="text-sm text-gray-600">Best Streak</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{studyPlan.completedDays.length}</div>
            <div className="text-sm text-gray-600">Days Completed</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{studyPlan.dailyGoal}</div>
            <div className="text-sm text-gray-600">Daily Goal</div>
          </div>
        </div>
      </div>

      {/* Weekly Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-4">This Week's Progress</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{weeklyStats.sessionsThisWeek}</div>
            <div className="text-sm text-gray-600">Study Sessions</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{weeklyStats.questionsThisWeek}</div>
            <div className="text-sm text-gray-600">Questions Reviewed</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.round(weeklyStats.timeThisWeek)}</div>
            <div className="text-sm text-gray-600">Minutes Studied</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {weeklyStats.averageConfidence.toFixed(1)}/5
            </div>
            <div className="text-sm text-gray-600">Avg Confidence</div>
          </div>
        </div>
      </div>
    </div>
  );
}