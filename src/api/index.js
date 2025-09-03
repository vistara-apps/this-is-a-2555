/**
 * API module exports
 * 
 * This file serves as the main entry point for all API-related functionality,
 * providing a unified interface for interacting with backend services.
 */

// Export Supabase API functions
export * from './supabase';

// Export Stripe payment functions
export * from './stripe';

// Export OpenAI service functions
export { generateBusinessIdea, findCollaborators } from '../services/openai';

/**
 * API Documentation
 * 
 * This application uses the following API services:
 * 
 * 1. Supabase - Backend-as-a-Service
 *    - Authentication (signUp, signIn, signOut, getCurrentUser)
 *    - User Profiles (createUserProfile, getUserProfile, updateUserProfile)
 *    - Communities (getCommunities, getCommunityById, createCommunity, joinCommunity, leaveCommunity)
 *    - Posts (getCommunityPosts, createPost, getPostWithComments)
 *    - Comments (addComment)
 *    - AI Ideas (saveAIIdea, getUserAIIdeas)
 *    - Real-time subscriptions (subscribeToNewPosts, subscribeToNewComments)
 * 
 * 2. OpenAI - AI services
 *    - generateBusinessIdea: Generates startup ideas based on user input and interests
 *    - findCollaborators: Suggests potential team members based on idea description
 * 
 * 3. Stripe - Payment processing
 *    - createPaymentSession: Initializes a payment session
 *    - processPayment: Processes a payment with Stripe Elements
 *    - checkPaymentStatus: Checks the status of a payment
 *    - getPaymentHistory: Retrieves user's payment history
 * 
 * 4. Blockchain/Web3 (via wagmi)
 *    - usePaymentContext: Hook for creating blockchain payment sessions
 * 
 * API Configuration:
 * - All API keys and endpoints are configured via environment variables
 * - The application falls back to demo mode when credentials are missing
 * - Real-time features are implemented using Supabase's real-time subscriptions
 * 
 * Error Handling:
 * - All API functions return objects with { data, error } properties
 * - Errors are logged to the console and returned to the caller
 * - The UI should handle these errors appropriately
 * 
 * Data Models:
 * - User: userId, username, email, bio, interests
 * - Community: communityId, name, description, topic
 * - Post: postId, communityId, userId, title, content, createdAt
 * - Comment: commentId, postId, userId, content, createdAt
 * - AIIdea: ideaId, userId, title, description, targetMarket, features, challenges, nextSteps
 */

