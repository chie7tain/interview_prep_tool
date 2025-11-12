import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Mic, MicOff, Camera, CameraOff } from 'lucide-react';
import { Question, MockInterview as MockInterviewType, MockInterviewResponse } from '../types';
import { categories } from '../data/questions';

interface MockInterviewProps {
  onComplete: (interview: MockInterviewType) => void;
  onBack: () => void;
}

export function MockInterview({ onComplete, onBack }: MockInterviewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [responses, setResponses] = useState<MockInterviewResponse[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [interviewQuestions, setInterviewQuestions] = useState<Question[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);

  // Generate random interview questions
  useEffect(() => {
    const allQuestions = categories.flatMap(cat => cat.questions);
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setInterviewQuestions(shuffled.slice(0, 8)); // 8 questions for mock interview
  }, []);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted && !isRecording) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startInterview = () => {
    setIsStarted(true);
    setQuestionStartTime(Date.now());
  };

  const handleNextQuestion = () => {
    const timeSpent = (Date.now() - questionStartTime) / 1000 / 60; // in minutes
    
    const response: MockInterviewResponse = {
      questionId: interviewQuestions[currentQuestionIndex].id,
      response: currentResponse,
      timeSpent,
      confidence: 3, // Default, could be user input
      score: Math.floor(Math.random() * 40) + 60 // Simulated score 60-100
    };

    setResponses(prev => [...prev, response]);
    setCurrentResponse('');
    
    if (currentQuestionIndex < interviewQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestionStartTime(Date.now());
    } else {
      completeInterview([...responses, response]);
    }
  };

  const completeInterview = (allResponses: MockInterviewResponse[]) => {
    const averageScore = allResponses.reduce((sum, r) => sum + r.score, 0) / allResponses.length;
    
    const interview: MockInterviewType = {
      id: Date.now().toString(),
      date: new Date(),
      duration: timeElapsed,
      questions: interviewQuestions,
      responses: allResponses,
      overallScore: averageScore,
      feedback: generateFeedback(allResponses, averageScore)
    };

    onComplete(interview);
  };

  const generateFeedback = (responses: MockInterviewResponse[], score: number): string => {
    if (score >= 85) {
      return "Excellent performance! You demonstrated strong technical knowledge and communication skills. You're well-prepared for senior-level interviews.";
    } else if (score >= 75) {
      return "Good performance overall. Focus on providing more detailed examples and improving confidence in your responses.";
    } else if (score >= 65) {
      return "Decent performance with room for improvement. Consider reviewing fundamental concepts and practicing more behavioral questions.";
    } else {
      return "Needs improvement. Focus on strengthening your technical foundation and practice explaining concepts clearly.";
    }
  };

  if (!isStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Mock Interview</h2>
            <p className="text-gray-600 text-lg">
              Practice with {interviewQuestions.length} randomly selected questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">What to Expect</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• {interviewQuestions.length} technical questions</li>
                <li>• Mix of React fundamentals and advanced topics</li>
                <li>• Timed responses (recommended 3-5 minutes each)</li>
                <li>• Performance feedback and scoring</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">Tips for Success</h3>
              <ul className="space-y-2 text-green-800">
                <li>• Think out loud and explain your reasoning</li>
                <li>• Use specific examples from your experience</li>
                <li>• Ask clarifying questions when needed</li>
                <li>• Stay calm and take your time</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setCameraEnabled(!cameraEnabled)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                cameraEnabled 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cameraEnabled ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
              Camera {cameraEnabled ? 'On' : 'Off'}
            </button>

            <button
              onClick={() => setMicEnabled(!micEnabled)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                micEnabled 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              Microphone {micEnabled ? 'On' : 'Off'}
            </button>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Back
            </button>
            <button
              onClick={startInterview}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start Interview
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = interviewQuestions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Interview Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mock Interview</h2>
            <p className="text-gray-600">
              Question {currentQuestionIndex + 1} of {interviewQuestions.length}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">{formatTime(timeElapsed)}</span>
            </div>
            
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isRecording 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {isRecording ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRecording ? 'Pause' : 'Record'}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / interviewQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Current Question */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {currentQuestion.difficulty}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">{currentQuestion.category}</span>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            {currentQuestion.question}
          </h3>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Your Response:
          </label>
          <textarea
            value={currentResponse}
            onChange={(e) => setCurrentResponse(e.target.value)}
            placeholder="Type your response here... Think about specific examples, technical details, and best practices."
            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Recommended time: {currentQuestion.estimatedTime || 5} minutes
            </div>
            
            <button
              onClick={handleNextQuestion}
              disabled={!currentResponse.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestionIndex === interviewQuestions.length - 1 ? 'Finish Interview' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Interview Progress</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{responses.length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{interviewQuestions.length - responses.length}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {responses.length > 0 ? Math.round(responses.reduce((sum, r) => sum + r.timeSpent, 0)) : 0}
            </div>
            <div className="text-sm text-gray-600">Avg Time (min)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {responses.length > 0 ? Math.round(responses.reduce((sum, r) => sum + r.score, 0) / responses.length) : 0}
            </div>
            <div className="text-sm text-gray-600">Avg Score</div>
          </div>
        </div>
      </div>
    </div>
  );
}