'use client';

import { useState } from 'react';
import type { Note, Notebook } from '@/lib/types';

interface SidebarProps {
  notebooks: Notebook[];
  notes: Note[];
  selectedNotebook: string | null;
  selectedNote: Note | null;
  searchQuery: string;
  theme: 'light' | 'dark';
  isOpen: boolean;
  onNotebookSelect: (id: string | null) => void;
  onNoteSelect: (note: Note) => void;
  onSearchChange: (query: string) => void;
  onThemeToggle: () => void;
  onCreateNote: () => void;
  onCreateNotebook: (name: string) => void;
}

export function Sidebar({
  notebooks,
  notes,
  selectedNotebook,
  selectedNote,
  searchQuery,
  theme,
  isOpen,
  onNotebookSelect,
  onNoteSelect,
  onSearchChange,
  onThemeToggle,
  onCreateNote,
  onCreateNotebook,
}: SidebarProps) {
  const [showNewNotebook, setShowNewNotebook] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState('');

  const handleCreateNotebook = () => {
    if (newNotebookName.trim()) {
      onCreateNotebook(newNotebookName.trim());
      setNewNotebookName('');
      setShowNewNotebook(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`
      w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col transition-all duration-300
      fixed lg:static inset-y-0 left-0 z-40
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 mt-16 lg:mt-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">NullNote</h1>
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          />
          <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Notebooks */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Notebooks</h2>
          <button
            onClick={() => setShowNewNotebook(true)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Add notebook"
          >
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <div className="space-y-1">
          <button
            onClick={() => onNotebookSelect(null)}
            className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
              selectedNotebook === null
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            All Notes
          </button>
          {notebooks.map((notebook) => (
            <button
              key={notebook.id}
              onClick={() => onNotebookSelect(notebook.id)}
              className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors flex items-center gap-2 ${
                selectedNotebook === notebook.id
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: notebook.color }} />
              {notebook.name}
            </button>
          ))}
        </div>

        {showNewNotebook && (
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              placeholder="Notebook name"
              value={newNotebookName}
              onChange={(e) => setNewNotebookName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateNotebook()}
              className="flex-1 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
            <button
              onClick={handleCreateNotebook}
              className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Notes ({notes.length})
            </h2>
            <button
              onClick={onCreateNote}
              className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Note
            </button>
          </div>

          <div className="space-y-2">
            {notes.map((note) => (
              <button
                key={note.id}
                onClick={() => onNoteSelect(note)}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  selectedNote?.id === note.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-200 dark:border-indigo-700'
                    : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600'
                }`}
              >
                <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1 truncate">
                  {note.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                  {note.content.replace(/[#*`]/g, '').substring(0, 100)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {formatDate(note.updatedAt)}
                  </span>
                  {note.tags.length > 0 && (
                    <div className="flex gap-1">
                      {note.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}




