/**
 * Type definitions for NicheNet application
 */

// User entity
export interface User {
  userId: string;
  username: string;
  email: string;
  bio: string;
  interests: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Community entity
export interface Community {
  communityId: string;
  name: string;
  description: string;
  topic: string;
  memberCount?: number;
  isJoined?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Post entity
export interface Post {
  postId: string;
  communityId: string;
  userId: string;
  username?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  replies?: number;
}

// Comment entity (for post replies)
export interface Comment {
  commentId: string;
  postId: string;
  userId: string;
  username?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

// AI Idea entity
export interface AIIdea {
  ideaId: string;
  userId: string;
  title: string;
  description: string;
  targetMarket: string;
  features: string[];
  challenges: string;
  nextSteps: string;
  validationStatus?: 'pending' | 'validated' | 'rejected';
  createdAt: string;
  updatedAt?: string;
}

// Collaborator suggestion from AI
export interface Collaborator {
  role: string;
  skills: string[];
  responsibilities: string;
  importance: string;
}

// Payment transaction
export interface Transaction {
  transactionId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  feature: string;
  createdAt: string;
}

// User preferences
export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  pushNotifications: boolean;
}

// API response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: 'success' | 'error';
}

