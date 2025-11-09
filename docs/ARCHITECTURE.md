# Architecture Documentation

## System Overview

Agentic is a full-stack AI agent platform built with:
- **Frontend**: React 18 + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT

## Architecture Layers

### Frontend (React)
```
src/
├── components/     # Reusable UI components
├── pages/          # Page components (Login, Dashboard, Agent)
├── context/        # React Context (AuthContext)
├── services/       # API client services
└── utils/          # Helper functions
```

### Backend (Express)
```
src/
├── controllers/    # Business logic
├── models/         # MongoDB schemas
├── routes/         # API endpoints
├── middleware/     # Auth, validation, error handling
├── services/       # External services (LLM, embeddings)
├── config/         # Configuration files
└── utils/          # Utilities
```

### Database (MongoDB)
```
Collections:
- users           # User accounts
- conversations   # Chat conversations
- messages        # Chat messages
```

## Data Flow

1. **User Authentication**
   - User registers/logs in via frontend
   - Backend validates credentials
   - JWT token issued and stored in localStorage
   - Token sent with subsequent requests

2. **Chat Flow**
   - User sends message via Agent page
   - Frontend sends POST to `/api/agent/chat`
   - Backend saves user message to DB
   - Backend generates agent response
   - Response saved to DB and returned to frontend
   - Frontend displays both messages

3. **State Management**
   - AuthContext manages user authentication state
   - Local component state for UI interactions
   - API calls via axios for data fetching

## Security

- Passwords stored in plain text (TODO: hash with bcrypt)
- JWT tokens for authentication
- Protected routes require valid token
- CORS enabled for cross-origin requests

## Scalability Considerations

- MongoDB for horizontal scaling
- Stateless backend for load balancing
- JWT tokens eliminate session storage
- API-first design for multiple clients
