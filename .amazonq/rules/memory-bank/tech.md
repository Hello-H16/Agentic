# Technology Stack

## Programming Languages
- **JavaScript (ES6+)**: Primary language for both frontend and backend
- **JSX**: React component syntax

## Frontend Technologies
- **React 18.3.1**: UI library for building interactive interfaces
- **React Router DOM 6.30.1**: Client-side routing
- **Axios 1.4.0**: HTTP client for API requests
- **Tailwind CSS 4.1.16**: Utility-first CSS framework
- **Recharts 2.7.2**: Data visualization and charting
- **React Icons 5.5.0**: Icon library
- **Vite 7.1.12**: Build tool and dev server
- **PostCSS 8.5.6**: CSS processing
- **Autoprefixer 10.4.21**: CSS vendor prefixing

## Backend Technologies
- **Node.js**: JavaScript runtime
- **Express 4.18.2**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose 7.4.2**: MongoDB ODM
- **JWT (jsonwebtoken 9.0.1)**: Authentication tokens
- **CORS 2.8.5**: Cross-origin resource sharing
- **dotenv 16.3.1**: Environment variable management
- **body-parser 1.20.2**: Request body parsing

## Development Tools
- **Nodemon 3.0.1**: Auto-restart for backend development
- **React Scripts 5.0.1**: Create React App tooling
- **Concurrently 8.2.2**: Run multiple commands simultaneously

## Build Systems
- **Vite**: Frontend build tool with HMR (Hot Module Replacement)
- **React Scripts**: CRA-based build system
- **npm**: Package manager

## Development Commands

### Root Level
```bash
npm run install:all        # Install all dependencies
npm run dev:backend        # Start backend dev server
npm run dev:frontend       # Start frontend dev server
npm run dev                # Start Vite dev server
npm run build              # Build for production
npm run preview            # Preview production build
```

### Backend
```bash
npm run dev                # Start with nodemon (auto-reload)
npm start                  # Start production server
```

### Frontend
```bash
npm start                  # Start development server (port 3000)
npm run build              # Create production build
npm test                   # Run tests
npm run eject              # Eject from CRA (irreversible)
```

## Configuration Files
- **package.json**: Root, backend, and frontend dependencies
- **tailwind.config.js**: Tailwind CSS configuration
- **postcss.config.js**: PostCSS plugins
- **.env / .env.example**: Environment variables
- **docker-compose.yml**: Docker orchestration
- **Dockerfile.backend / Dockerfile.frontend**: Container definitions

## API Configuration
- **Backend Port**: 5000 (default)
- **Frontend Proxy**: Configured to proxy API requests to localhost:5000
- **Database**: MongoDB connection via Mongoose
