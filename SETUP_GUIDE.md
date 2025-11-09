# Setup Guide - Agentic Platform

## Complete Setup Instructions

### Step 1: Install Dependencies

```bash
# Install all dependencies (backend + frontend)
npm run install:all
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Use in .env file

### Step 3: Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agentic
JWT_SECRET=your-super-secret-jwt-key-change-this
GROQ_API_KEY=gsk_your-groq-api-key-optional
```

**Note:** OpenAI API key is optional. Without it, the system will use mock responses.

### Step 4: Configure Frontend

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 5: Start the Application

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

### Step 6: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## First Time Usage

1. **Register Account**
   - Go to http://localhost:3000
   - Click "Sign up"
   - Enter name, email, password

2. **Create Your First Agent**
   - Navigate to "Agents"
   - Click "Create Agent"
   - Fill in:
     - Name: "Research Assistant"
     - Type: "research"
     - System Prompt: "You are a helpful research assistant..."
     - Model: "gpt-4"
   - Click "Create"

3. **Start a Chat**
   - Navigate to "Chat"
   - Click "New Chat"
   - Select your agent
   - Start chatting!

4. **Build a Workflow**
   - Navigate to "Workflows"
   - Click "Create Workflow"
   - Add steps with different agents
   - Use variables like {{input}} and {{result1}}
   - Execute the workflow

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in backend/.env
- Verify MongoDB port (default: 27017)

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: Change port in package.json or use PORT=3001 npm start

### CORS Errors
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in frontend/.env

### Authentication Issues
- Clear localStorage in browser
- Check JWT_SECRET is set in backend/.env
- Verify token is being sent in Authorization header

## Development Tips

### Hot Reload
- Backend: Uses nodemon for auto-restart
- Frontend: Uses React hot module replacement

### Database Reset
```bash
# Connect to MongoDB
mongosh
use agentic
db.dropDatabase()
```

### View Logs
- Backend logs appear in Terminal 1
- Frontend logs in browser console (F12)

## Production Deployment

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with nginx or similar
```

### Environment Variables
- Set all production values
- Use strong JWT_SECRET
- Use MongoDB Atlas for database
- Add OPENAI_API_KEY for real AI responses

## Support

For issues or questions:
1. Check console logs (backend terminal + browser)
2. Verify all environment variables are set
3. Ensure MongoDB is running
4. Check network tab in browser DevTools
