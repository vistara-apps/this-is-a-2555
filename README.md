# NicheNet

Connect, Collaborate, and Create AI-Powered Startups with Students.

## Overview

NicheNet is a Next.js Base Mini App for students to discover and join niche communities based on academic and career interests, fostering peer-to-peer support and collaboration on AI-driven business ventures.

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
- **Web3**: Wagmi, RainbowKit, Viem

## Getting Started

### Prerequisites

- Node.js (v22+)
- npm or yarn
- Supabase account
- OpenAI API key
- Stripe account (for payments)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vistara-apps/this-is-a-2555.git
   cd this-is-a-2555
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
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
   ```

6. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Build Process Fixes

This project has been updated to resolve build and deployment issues:

### Fixed Issues:
1. **Dependency Conflicts**: Updated package.json with specific versions and added `--legacy-peer-deps` flag
2. **Workflow Errors**: Fixed GitHub Actions workflow syntax and indentation issues
3. **Deployment Robustness**: Separated build and deployment jobs to handle missing Vercel secrets gracefully
4. **Build Validation**: Added proper build output verification

### Key Changes:
- Updated package.json with exact dependency versions
- Fixed GitHub Actions workflow files with proper YAML syntax
- Added build artifact handling for deployment
- Implemented graceful fallback when deployment secrets are missing
- Added build success/failure reporting

## Deployment

The project includes GitHub Actions workflows for:
- **Build and Test**: Validates the build process on every PR
- **Build and Deploy**: Handles deployment to Vercel (when secrets are configured)

### Vercel Deployment Setup

To enable Vercel deployment, add these secrets to your GitHub repository:
- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

If these secrets are not configured, the build will still succeed, but deployment will be skipped.

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
- Wagmi and RainbowKit for Web3 integration
