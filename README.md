# NicheNet

Connect, Collaborate, and Create AI-Powered Startups with Students.

## Overview

NicheNet is a web application for students to discover and join niche communities based on academic and career interests, fostering peer-to-peer support and collaboration on AI-driven business ventures.

## Features

### Niche Community Creation & Discovery
- Create and join highly specific topic-based communities
- Community profiles with member management
- Searchable discovery of relevant communities

### Targeted Peer-to-Peer Support
- Create posts and engage in discussions
- Ask questions and share resources
- Organized conversation threading

### AI Idea Validation Assistant
- Brainstorm and refine startup ideas
- Get initial validation feedback
- AI-powered business concept generation

### AI Collaboration Connector
- Find potential collaborators based on shared interests
- Connect with complementary skill sets
- Build teams for idea execution

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Supabase (BaaS)
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **AI Integration**: OpenAI API
- **Payments**: Stripe, Web3/Blockchain
- **Real-time Features**: Supabase Realtime

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase account
- OpenAI API key
- Stripe account (for payments)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nichenet.git
   cd nichenet
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Fill in your environment variables in the `.env` file:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Database Schema

### Users
- userId (PK)
- username
- email
- bio
- interests (array)
- createdAt
- updatedAt

### Communities
- communityId (PK)
- name
- description
- topic
- creatorId (FK to Users)
- createdAt
- updatedAt

### Community Members
- userId (FK to Users)
- communityId (FK to Communities)
- joinedAt

### Posts
- postId (PK)
- communityId (FK to Communities)
- userId (FK to Users)
- title
- content
- createdAt
- updatedAt

### Comments
- commentId (PK)
- postId (FK to Posts)
- userId (FK to Users)
- content
- createdAt
- updatedAt

### AI Ideas
- ideaId (PK)
- userId (FK to Users)
- title
- description
- targetMarket
- features (array)
- challenges
- nextSteps
- validationStatus
- createdAt
- updatedAt

## API Documentation

### Authentication
- `signUp(email, password, username)`: Register a new user
- `signIn(email, password)`: Log in an existing user
- `signOut()`: Log out the current user
- `getCurrentUser()`: Get the current authenticated user

### Communities
- `getCommunities(page, limit, searchQuery)`: Get all communities with pagination
- `getCommunityById(communityId)`: Get a specific community
- `createCommunity(userId, name, description, topic)`: Create a new community
- `joinCommunity(userId, communityId)`: Join a community
- `leaveCommunity(userId, communityId)`: Leave a community

### Posts
- `getCommunityPosts(communityId, page, limit)`: Get posts for a community
- `createPost(userId, communityId, title, content)`: Create a new post
- `getPostWithComments(postId, page, limit)`: Get a post with its comments

### Comments
- `addComment(userId, postId, content)`: Add a comment to a post

### AI Features
- `generateBusinessIdea(userInput, interests)`: Generate a business idea
- `findCollaborators(ideaDescription, skillsNeeded)`: Find potential collaborators
- `saveAIIdea(userId, ideaData)`: Save an AI-generated idea

### Payments
- `createPaymentSession(amount, currency, featureId)`: Create a payment session
- `processPayment(stripe, elements, clientSecret)`: Process a payment
- `checkPaymentStatus(sessionId)`: Check payment status
- `getPaymentHistory()`: Get user's payment history

## Business Model

NicheNet uses a freemium model with micro-transactions for premium features:

- **Free Tier**: Basic community access, posting, and commenting
- **Premium Features**: Enhanced AI idea generation, exclusive communities, advanced collaboration tools
- **Pricing**: Pay-as-you-go for specific value-added features

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for AI capabilities
- Supabase for backend services
- React and TailwindCSS communities for frontend tools

