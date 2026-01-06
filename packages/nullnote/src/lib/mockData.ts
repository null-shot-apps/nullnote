import type { Note, Notebook } from './types';

export const mockNotebooks: Notebook[] = [
  { id: '1', name: 'Personal', color: '#6366f1' },
  { id: '2', name: 'Work', color: '#8b5cf6' },
  { id: '3', name: 'Ideas', color: '#ec4899' },
];

export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to NullNote',
    content: `# Welcome to NullNote

This is your distraction-free notebook app. Start writing your thoughts, ideas, and notes here.

## Features
- Create and organize notes
- Use notebooks to categorize
- Add tags for easy filtering
- Search across all your notes
- Switch between light and dark mode

Happy writing! ✨`,
    notebookId: '1',
    tags: ['welcome', 'getting-started'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Meeting Notes',
    content: `# Team Meeting - Q1 Planning

## Attendees
- Alice
- Bob
- Charlie

## Discussion Points
1. Project timeline review
2. Resource allocation
3. Next quarter goals

## Action Items
- [ ] Review budget proposal
- [ ] Schedule follow-up meeting
- [ ] Send summary to team`,
    notebookId: '2',
    tags: ['meeting', 'planning'],
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T15:00:00Z',
  },
  {
    id: '3',
    title: 'App Ideas',
    content: `# New App Concepts

## Idea 1: Recipe Manager
A simple app to save and organize favorite recipes with ingredient lists and cooking instructions.

## Idea 2: Habit Tracker
Track daily habits with streaks and visual progress indicators.

## Idea 3: Reading List
Manage books to read with notes and ratings.`,
    notebookId: '3',
    tags: ['brainstorm', 'projects'],
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:45:00Z',
  },
];

