'use client';

import { useState, useEffect } from 'react';
import type { Note } from '@/lib/types';

interface EditorProps {
  note: Note | null;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

export function Editor({ note, onUpdateNote, onDeleteNote }: EditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
    }
  }, [note]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (note) {
      onUpdateNote(note.id, { title: newTitle });
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    if (note) {
      onUpdateNote(note.id, { content: newContent });
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && note && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      onUpdateNote(note.id, { tags: updatedTags });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (note) {
      const updatedTags = tags.filter(tag => tag !== tagToRemove);
      setTags(updatedTags);
      onUpdateNote(note.id, { tags: updatedTags });
    }
  };

  const handleDelete = () => {
    if (note && confirm('Are you sure you want to delete this note?')) {
      onDeleteNote(note.id);
    }
  };

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-xl font-medium text-gray-400 dark:text-gray-500 mb-2">No note selected</h2>
          <p className="text-sm text-gray-400 dark:text-gray-600">Select a note from the sidebar or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 transition-colors">
      {/* Editor Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="flex-1 text-2xl font-semibold bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Untitled Note"
          />
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
            aria-label="Delete note"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 items-center">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-indigo-900 dark:hover:text-indigo-100"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add tag..."
              className="px-3 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {newTag && (
              <button
                onClick={handleAddTag}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium"
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          className="w-full h-full min-h-[500px] bg-transparent border-none outline-none resize-none text-gray-800 dark:text-gray-200 text-base leading-relaxed font-mono"
          placeholder="Start writing..."
        />
      </div>

      {/* Footer Info */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-8 py-3">
        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
          <span>Last edited: {new Date(note.updatedAt).toLocaleString()}</span>
          <span>{content.split(/\s+/).filter(Boolean).length} words</span>
        </div>
      </div>
    </div>
  );
}

