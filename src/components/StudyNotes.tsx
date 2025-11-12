import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Save, X, Tag, Search } from 'lucide-react';
import { StudyNote, Question } from '../types';

interface StudyNotesProps {
  notes: StudyNote[];
  questions: Question[];
  onAddNote: (note: Omit<StudyNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateNote: (note: StudyNote) => void;
  onDeleteNote: (noteId: string) => void;
}

export function StudyNotes({ notes, questions, onAddNote, onUpdateNote, onDeleteNote }: StudyNotesProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [formData, setFormData] = useState({
    questionId: '',
    content: '',
    tags: [] as string[]
  });

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));
  
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = !selectedTag || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleAddNote = () => {
    if (formData.questionId && formData.content.trim()) {
      onAddNote({
        questionId: formData.questionId,
        content: formData.content.trim(),
        tags: formData.tags
      });
      setFormData({ questionId: '', content: '', tags: [] });
      setShowAddForm(false);
    }
  };

  const handleUpdateNote = () => {
    if (editingNote && formData.content.trim()) {
      onUpdateNote({
        ...editingNote,
        content: formData.content.trim(),
        tags: formData.tags,
        updatedAt: new Date()
      });
      setEditingNote(null);
      setFormData({ questionId: '', content: '', tags: [] });
    }
  };

  const startEditing = (note: StudyNote) => {
    setEditingNote(note);
    setFormData({
      questionId: note.questionId,
      content: note.content,
      tags: [...note.tags]
    });
  };

  const cancelEditing = () => {
    setEditingNote(null);
    setFormData({ questionId: '', content: '', tags: [] });
    setShowAddForm(false);
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const getQuestionTitle = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    return question ? question.question : 'Unknown Question';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Study Notes</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Note
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingNote) && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingNote ? 'Edit Note' : 'Add New Note'}
          </h3>
          
          <div className="space-y-4">
            {!editingNote && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question
                </label>
                <select
                  value={formData.questionId}
                  onChange={(e) => setFormData(prev => ({ ...prev, questionId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a question...</option>
                  {questions.map(question => (
                    <option key={question.id} value={question.id}>
                      {question.question.substring(0, 100)}...
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Write your notes, insights, or reminders..."
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add tags (press Enter)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag(e.currentTarget.value.trim());
                    e.currentTarget.value = '';
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={editingNote ? handleUpdateNote : handleAddNote}
                disabled={!formData.content.trim() || (!editingNote && !formData.questionId)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingNote ? 'Update' : 'Save'} Note
              </button>
              <button
                onClick={cancelEditing}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No notes found</h3>
            <p className="text-gray-500">
              {notes.length === 0 
                ? "Start taking notes to track your learning progress"
                : "Try adjusting your search or filter criteria"
              }
            </p>
          </div>
        ) : (
          filteredNotes.map(note => (
            <div key={note.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {getQuestionTitle(note.questionId)}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Created: {note.createdAt.toLocaleDateString()}
                    {note.updatedAt && note.updatedAt !== note.createdAt && (
                      <span> • Updated: {note.updatedAt.toLocaleDateString()}</span>
                    )}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(note)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="prose prose-sm max-w-none text-gray-700 mb-3">
                {note.content.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {note.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}