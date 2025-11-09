# Setup Guide

## Prerequisites

- Node.js 16+ installed
- MongoDB installed and running
- Git (optional)

## Installation Steps

### 1. Install Dependencies

```bash
# Install all dependencies
npm run install:all

# Or install separately
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agentic
JWT_SECRET=your-secret-key-change-this
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```env
PORT=3002
REACT_APP_API_URL=http://localhost:5000/api
SKIP_PREFLIGHT_CHECK=true
```

### 3. Start MongoDB

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### 4. Run Database Migrations (Optional)

```bash
cd database/migrations
node 001_create_users.js
node 002_create_conversations.js
node 003_create_messages.js
```

### 5. Seed Initial Data (Optional)

```bash
cd database/seeds
node initial_data.js
```

### 6. Start Development Servers

**Terminal 1 - Backend**:
```bash
cd backend
npm start
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm start
```

## Access Application

- Frontend: http://localhost:3002
- Backend API: http://localhost:5000
- API Docs: See docs/API.md

## Troubleshooting

### Port Already in Use
```bash
# Windows - Kill process on port
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify MongoDB is accessible on port 27017

### React Scripts Error
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

1. Build frontend: `cd frontend && npm run build`
2. Set NODE_ENV=production in backend/.env
3. Use process manager (PM2) for backend
4. Use MongoDB Atlas for cloud database
5. Deploy frontend to Vercel/Netlify
6. Deploy backend to Heroku/Railway/AWS
