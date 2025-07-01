# AI Library - Smart University Library Assistant

## Overview

AI Library is a modern conversational chat interface designed to help university students find, borrow, and manage books through natural language interaction. The application combines a React frontend with an Express.js backend, featuring a clean academic aesthetic with calming colors and intuitive chat-based interactions.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with Shadcn UI components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds
- **Typography**: Space Grotesk font for modern, readable interface

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful endpoints with JSON responses
- **Session Management**: Express sessions with PostgreSQL storage
- **Development**: Hot module replacement via Vite integration

### Database Strategy
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured via Neon serverless)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Storage Interface**: Abstracted storage layer with in-memory fallback for development

## Key Components

### Chat System
- **Natural Language Processing**: Contextual message interpretation for book searches, borrowing requests, and status checks
- **Conversational UI**: Chat bubbles with typing indicators and smooth animations
- **Multi-language Support**: English and Thai language interfaces
- **Rich Content**: Book cards with cover images, availability status, and interactive borrowing buttons

### Book Management
- **Search Functionality**: Full-text search across book titles, authors, and categories
- **Borrowing System**: Seamless in-chat borrowing with confirmation flows
- **Status Tracking**: Real-time availability updates and due date management
- **Recommendations**: Dynamic book suggestions based on user interaction patterns

### User Interface
- **Sidebar Navigation**: Fixed sidebar with search, my books, and recommendations sections
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: Full keyboard navigation and screen reader support
- **Theme System**: CSS custom properties for consistent color scheme

## Data Flow

1. **User Interaction**: Messages sent through chat input component
2. **Message Processing**: Frontend interprets user intent and determines appropriate API calls
3. **Server Communication**: RESTful API endpoints handle book searches, borrowing operations, and user data
4. **Database Operations**: Drizzle ORM manages data persistence with PostgreSQL
5. **Response Generation**: AI-like responses generated based on user queries and available data
6. **UI Updates**: TanStack Query manages cache invalidation and real-time UI updates

## External Dependencies

### Core Libraries
- **React Ecosystem**: React, React DOM, React Hook Form with Zod validation
- **UI Components**: Radix UI primitives for accessible component foundation
- **Styling**: TailwindCSS, Class Variance Authority, and CLSX for utility-first styling
- **Database**: Neon serverless PostgreSQL with Drizzle ORM
- **State Management**: TanStack Query for server state synchronization

### Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Development Experience**: Replit-specific plugins for enhanced development workflow

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React application to optimized static assets
2. **Backend Build**: esbuild bundles Express server with external dependencies
3. **Asset Organization**: Static files served from dist/public directory
4. **Production Optimization**: Tree shaking, code splitting, and asset optimization

### Environment Configuration
- **Development**: Hot module replacement with Vite development server
- **Production**: Express serves static assets with API routes
- **Database**: Environment-based connection string configuration
- **Session Management**: PostgreSQL-backed session store for production scalability

### Hosting Considerations
- **Static Assets**: Efficient serving of React build artifacts
- **API Endpoints**: Express server handles /api/* routes
- **Database Connection**: Serverless PostgreSQL via Neon platform
- **Session Persistence**: Database-backed sessions for multi-instance deployment

## Changelog

```
Changelog:
- July 01, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```