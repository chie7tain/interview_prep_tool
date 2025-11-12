import React, { useState } from 'react';
import { Building, Users, TrendingUp, Clock, Star, ExternalLink } from 'lucide-react';
import { Question } from '../types';

interface CompanyInfo {
  id: string;
  name: string;
  logo: string;
  description: string;
  interviewProcess: string[];
  commonQuestions: string[];
  difficulty: 'Medium' | 'Hard' | 'Very Hard';
  averageDuration: string;
  tips: string[];
  resources: { title: string; url: string }[];
}

interface CompanySpecificPrepProps {
  questions: Question[];
  onSelectCompany: (companyId: string) => void;
}

const companies: CompanyInfo[] = [
  {
    id: 'meta',
    name: 'Meta (Facebook)',
    logo: '🔵',
    description: 'Focus on React fundamentals, performance optimization, and system design',
    interviewProcess: [
      'Phone/Video Screen (45 min)',
      'Technical Phone Interview (45 min)',
      'Onsite: 4-5 rounds including coding, system design, and behavioral'
    ],
    commonQuestions: [
      'virtual-dom',
      'hooks',
      'performance-optimization',
      'state-management'
    ],
    difficulty: 'Very Hard',
    averageDuration: '4-6 weeks',
    tips: [
      'Deep dive into React internals and Fiber architecture',
      'Practice building scalable component libraries',
      'Understand performance profiling and optimization',
      'Be ready for system design questions about social media features'
    ],
    resources: [
      { title: 'React Documentation', url: 'https://react.dev' },
      { title: 'Meta Engineering Blog', url: 'https://engineering.fb.com' }
    ]
  },
  {
    id: 'google',
    name: 'Google',
    logo: '🔴',
    description: 'Emphasis on algorithms, data structures, and clean code practices',
    interviewProcess: [
      'Phone Screen (45 min)',
      'Technical Phone Interview (45 min)',
      'Onsite: 4-5 rounds focusing on coding and system design'
    ],
    commonQuestions: [
      'algorithms-optimization',
      'testing-strategies',
      'accessibility',
      'performance-metrics'
    ],
    difficulty: 'Very Hard',
    averageDuration: '6-8 weeks',
    tips: [
      'Strong focus on algorithmic thinking',
      'Practice coding without IDE assistance',
      'Understand web performance metrics and Core Web Vitals',
      'Be prepared for accessibility and internationalization questions'
    ],
    resources: [
      { title: 'Google Tech Dev Guide', url: 'https://techdevguide.withgoogle.com' },
      { title: 'Web.dev', url: 'https://web.dev' }
    ]
  },
  {
    id: 'netflix',
    name: 'Netflix',
    logo: '🔴',
    description: 'Focus on performance, scalability, and user experience',
    interviewProcess: [
      'Recruiter Screen (30 min)',
      'Technical Phone Screen (60 min)',
      'Onsite: 3-4 rounds including coding, architecture, and culture fit'
    ],
    commonQuestions: [
      'performance-optimization',
      'code-splitting',
      'streaming-architecture',
      'a11y-implementation'
    ],
    difficulty: 'Hard',
    averageDuration: '3-5 weeks',
    tips: [
      'Understand video streaming and media optimization',
      'Practice building performant, responsive interfaces',
      'Know about CDN, caching strategies, and global scale',
      'Demonstrate passion for great user experiences'
    ],
    resources: [
      { title: 'Netflix Tech Blog', url: 'https://netflixtechblog.com' },
      { title: 'Netflix Open Source', url: 'https://netflix.github.io' }
    ]
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    logo: '🏠',
    description: 'Strong emphasis on component design and user experience',
    interviewProcess: [
      'Recruiter Screen (30 min)',
      'Technical Phone Screen (45 min)',
      'Onsite: 4 rounds including coding, system design, and cross-functional collaboration'
    ],
    commonQuestions: [
      'component-architecture',
      'design-systems',
      'internationalization',
      'mobile-responsive'
    ],
    difficulty: 'Hard',
    averageDuration: '4-6 weeks',
    tips: [
      'Focus on component reusability and design systems',
      'Understand internationalization and localization',
      'Practice building responsive, mobile-first interfaces',
      'Show experience with cross-functional collaboration'
    ],
    resources: [
      { title: 'Airbnb Engineering', url: 'https://medium.com/airbnb-engineering' },
      { title: 'Airbnb Design', url: 'https://airbnb.design' }
    ]
  }
];

export function CompanySpecificPrep({ questions, onSelectCompany }: CompanySpecificPrepProps) {
  const [selectedCompany, setSelectedCompany] = useState<CompanyInfo | null>(null);

  const getRelevantQuestions = (companyQuestions: string[]) => {
    return questions.filter(q => 
      companyQuestions.includes(q.id) || 
      q.companies?.includes(selectedCompany?.name || '')
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-orange-600 bg-orange-100';
      case 'Very Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (selectedCompany) {
    const relevantQuestions = getRelevantQuestions(selectedCompany.commonQuestions);

    return (
      <div className="space-y-6">
        {/* Company Header */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <button
            onClick={() => setSelectedCompany(null)}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2"
          >
            ← Back to Companies
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl">{selectedCompany.logo}</div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{selectedCompany.name}</h2>
              <p className="text-gray-600">{selectedCompany.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">{selectedCompany.averageDuration}</div>
              <div className="text-sm text-gray-600">Process Duration</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className={`font-semibold px-2 py-1 rounded-full text-sm ${getDifficultyColor(selectedCompany.difficulty)}`}>
                {selectedCompany.difficulty}
              </div>
              <div className="text-sm text-gray-600 mt-1">Difficulty</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Users className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">{selectedCompany.interviewProcess.length}</div>
              <div className="text-sm text-gray-600">Interview Rounds</div>
            </div>
          </div>
        </div>

        {/* Interview Process */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Interview Process</h3>
          <div className="space-y-3">
            {selectedCompany.interviewProcess.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <span className="text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Tips */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Preparation Tips</h3>
          <div className="space-y-3">
            {selectedCompany.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Relevant Questions ({relevantQuestions.length})
          </h3>
          <div className="space-y-3">
            {relevantQuestions.map(question => (
              <div key={question.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{question.question}</h4>
                  <div className="flex items-center gap-2">
                    {question.difficulty && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {question.difficulty}
                      </span>
                    )}
                    <span className="text-sm text-gray-500">{question.category}</span>
                  </div>
                </div>
                {question.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {question.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Resources</h3>
          <div className="space-y-3">
            {selectedCompany.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 hover:text-blue-800">{resource.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Company-Specific Preparation</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get targeted preparation for top tech companies. Each company has unique interview styles, 
          focus areas, and expectations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map(company => (
          <div
            key={company.id}
            onClick={() => setSelectedCompany(company)}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl">{company.logo}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(company.difficulty)}`}>
                  {company.difficulty}
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{company.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {company.averageDuration}
              </div>
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                {company.interviewProcess.length} rounds
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <strong>Focus Areas:</strong> {company.tips.slice(0, 2).join(', ')}...
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}