# Project Structure

## Directory Organization

### Root Level
- **backend/**: Node.js/Express API server
- **frontend/**: React web application
- **database/**: Database migrations and seed data
- **docker/**: Docker configuration files
- **docs/**: Project documentation (API, Architecture, Setup)
- **.amazonq/rules/memory-bank/**: AI assistant context and guidelines

### Backend Structure (`backend/`)
```
src/
├── config/         # Configuration files (database, environment)
├── controllers/    # Request handlers and business logic
├── middleware/     # Authentication, validation, error handling
├── models/         # Database schemas (Mongoose models)
├── routes/         # API endpoint definitions
├── services/       # Business logic and external integrations
├── utils/          # Helper functions and utilities
└── server.js       # Application entry point
```

### Frontend Structure (`frontend/`)
```
src/
├── components/     # Reusable UI components (admin, chat, common)
├── context/        # React Context providers (AuthContext)
├── hooks/          # Custom React hooks
├── pages/          # Page-level components (Dashboard, Login, etc.)
├── services/       # API client and external service integrations
├── styles/         # Global styles and CSS modules
├── utils/          # Frontend utility functions
├── App.jsx         # Main application component
└── main.jsx        # Application entry point
```

### Database Structure (`database/`)
- **migrations/**: Sequential database schema changes
  - `001_create_users.js`: User authentication tables
  - `002_create_conversations.js`: Conversation storage
  - `003_create_messages.js`: Message history
- **seeds/**: Initial data for development/testing

## Core Components

### Backend Components
- **Server**: Express.js application with CORS and body-parser middleware
- **Authentication**: JWT-based auth with protected routes
- **Database**: MongoDB with Mongoose ODM
- **API Controllers**: Admin, conversation, and message management

### Frontend Components
- **AuthContext**: Global authentication state management
- **Admin Components**: Model settings and configuration UI
- **Dashboard**: User landing page after authentication
- **API Service**: Centralized Axios-based HTTP client

## Architectural Patterns
- **Monorepo Structure**: Separate backend/frontend with shared root configuration
- **MVC Pattern**: Controllers, models, and routes separation in backend
- **Context API**: React Context for global state (authentication)
- **Component-Based Architecture**: Modular, reusable React components
- **RESTful API**: Standard HTTP methods for resource management
- **Middleware Chain**: Request processing pipeline in Express
