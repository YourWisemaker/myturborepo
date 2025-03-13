# MyTurboRepo - Monorepo Project

A full-stack monorepo application using Turborepo, showcasing a modern web application with Firebase integration.

## Tech Stack

### Frontend
- **Next.js** - React framework for server-side rendering and static site generation
- **Shadcn UI** - Beautifully designed components built with Radix UI and Tailwind CSS
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management with Redux
- **TypeScript** - Type safety for JavaScript
- **Firebase Authentication** - User authentication
- **Axios** - HTTP client for API requests

### Backend
- **Express.js** - Web framework for Node.js
- **Firebase Admin SDK** - Server-side Firebase integration
- **Firebase Functions** - Serverless functions for backend logic
- **TypeScript** - Type safety for JavaScript

### Infrastructure
- **Turborepo** - High-performance build system for JavaScript/TypeScript monorepos
- **pnpm** - Fast, disk space efficient package manager
- **Firebase** - Backend-as-a-Service platform

## Project Structure

```
myturborepo/
├── apps/
│   ├── frontend/               # Next.js application
│   │   ├── src/
│   │   │   ├── app/            # Next.js App Router pages
│   │   │   ├── apis/           # API client and endpoints
│   │   │   ├── components/     # UI components (Atomic Design)
│   │   │   │   ├── atoms/      # Basic building blocks
│   │   │   │   ├── molecules/  # Combinations of atoms
│   │   │   │   ├── organisms/  # Complex UI components
│   │   │   │   └── templates/  # Page layouts
│   │   │   ├── firebase/       # Firebase client config
│   │   │   ├── lib/            # Utility functions and shadcn setup
│   │   │   ├── providers/      # Context providers
│   │   │   ├── store/          # Redux store configuration
│   │   │   └── theme/          # Theme configuration
│   │   └── ...
│   └── backend/                # Express.js with Firebase Functions
│       ├── config/             # Configuration files
│       ├── controller/         # API controllers
│       ├── core/               # Core application setup
│       ├── entities/           # Entity definitions
│       ├── middleware/         # Express middleware
│       ├── repository/         # Data access layer
│       ├── routes/             # API routes
│       └── ...
└── packages/
    └── shared/                 # Shared code between apps
        ├── src/
        │   └── entities/       # Shared entity types
        └── ...
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or later)
- pnpm (v8 or later)
- Firebase account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/myturborepo.git
   cd myturborepo
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   - Create `.env.local` in the `apps/frontend` directory
   - Add your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_API_URL=http://localhost:5001 # Local development server
   ```

   - Create `.env` in the `apps/backend` directory
   - Add your Firebase service account configuration

### Development

Start the development servers:

```bash
# Start all applications in development mode
pnpm dev

# Start only the frontend
pnpm --filter frontend dev

# Start only the backend
pnpm --filter backend dev

# Start the backend with the simplified local server
pnpm --filter backend dev:local
```

### Building for Production

```bash
# Build all applications
pnpm build

# Build specific applications
pnpm --filter frontend build
pnpm --filter backend build
```

### Deployment

#### Frontend
```bash
cd apps/frontend
pnpm build
# Deploy to your hosting platform of choice
```

#### Backend
```bash
cd apps/backend
pnpm build
pnpm deploy # Deploys to Firebase Functions
```

## Features

- User authentication with Firebase
- User profile management
- Mobile-responsive design with Shadcn UI
- Redux state management
- TypeScript for type safety
- Shared entity types between frontend and backend

## Architecture

### Frontend Architecture
- **Atomic Design** - Component structure for UI elements
- **Redux** - Centralized state management
- **API Layer** - Axios-based API client with interceptors

### Backend Architecture
- **Express.js** - API routes and middleware
- **Firebase Functions** - Serverless architecture
- **Repository Pattern** - Data access abstraction

## Adding Shadcn UI Components

```bash
# Navigate to the frontend directory
cd apps/frontend

# Add a new component (for example, a button)
npx shadcn-ui@latest add button
```

## Troubleshooting

- **Build Errors**: Ensure you're using Turborepo 2.0+ and have configured `tasks` in `turbo.json`
- **pnpm Workspace Issues**: Verify `pnpm-workspace.yaml` is correctly configured
- **Firebase Errors**: Check environment variables and Firebase configuration