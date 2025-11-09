# Development Guidelines

## Code Quality Standards

### File Headers
- Include file path comments at the top of files for clarity
- Example: `// backend/src/controllers/adminController.js`

### Naming Conventions
- **Components**: PascalCase (e.g., `ModelSettings`, `AuthContext`, `Loading`)
- **Files**: Match component names (e.g., `ModelSettings.jsx`, `adminController.js`)
- **Variables**: camelCase (e.g., `settings`, `totalUsers`, `apiCost`)
- **Constants**: UPPER_SNAKE_CASE for environment variables (e.g., `API_BASE_URL`)
- **Functions**: camelCase with descriptive verbs (e.g., `fetchSettings`, `saveSettings`, `getAllUsers`)

### Code Formatting
- Use 2-space indentation consistently
- Single quotes for strings in backend, flexible in frontend
- Semicolons at end of statements
- Arrow functions for React components and callbacks
- Destructuring for cleaner code: `const { id } = req.params`

## React Patterns

### Component Structure
```jsx
// 1. Imports (React, third-party, local)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';

// 2. Constants
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 3. Component definition
const ComponentName = () => {
  // 4. State declarations
  const [state, setState] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  
  // 5. Functions
  const handleAction = async () => {
    try {
      setLoading(true);
      // logic
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // 6. Effects
  useEffect(() => {
    // side effects
  }, []);
  
  // 7. Conditional rendering
  if (loading) return <Loading />;
  
  // 8. JSX return
  return (
    <div>...</div>
  );
};

// 9. Export
export default ComponentName;
```

### State Management
- Use `useState` for local component state
- Use Context API for global state (authentication, theme)
- Initialize state with sensible defaults
- Use loading states for async operations: `loading`, `saving`

### Context Pattern
```jsx
// 1. Create context
const AuthContext = createContext();

// 2. Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Provider logic
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
```

### Environment Variables
- Frontend: Use `import.meta.env.VITE_*` for Vite or `process.env.REACT_APP_*` for CRA
- Backend: Use `process.env.*` with dotenv

## Backend Patterns

### Controller Structure
```javascript
// Export async functions with try-catch-finally
exports.functionName = async (req, res) => {
  try {
    // Business logic
    const result = await Model.find();
    res.json(result);
  } catch (err) {
    res.status(500).json({ 
      message: 'Error description', 
      error: err.message 
    });
  }
};
```

### Error Handling
- Always wrap async operations in try-catch blocks
- Return appropriate HTTP status codes (404, 500, etc.)
- Include descriptive error messages
- Log errors with `console.error()` for debugging
- Use `finally` blocks to clean up loading states

### API Response Format
```javascript
// Success
res.json(data);
res.json({ message: 'Success message', data });

// Error
res.status(statusCode).json({ 
  message: 'Error description', 
  error: err.message 
});
```

### Database Operations
- Use Mongoose models for MongoDB operations
- Select fields explicitly: `.select('-password')` to exclude sensitive data
- Use `findByIdAndUpdate` with `{ new: true }` to return updated document
- Check for null results: `if (!user) return res.status(404).json(...)`
- Use `countDocuments()` for statistics

## API Integration

### Axios Configuration
```javascript
// Create configured instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Add request interceptor for auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### API Calls Pattern
```javascript
const fetchData = async () => {
  try {
    setLoading(true);
    const res = await axios.get(`${API_BASE}/endpoint`);
    setData(res.data || defaultValue);
  } catch (err) {
    console.error('Error fetching data:', err);
  } finally {
    setLoading(false);
  }
};
```

## Styling Guidelines

### Tailwind CSS Usage
- Use utility classes for styling: `className="p-6 bg-white rounded-2xl shadow-md"`
- Support dark mode: `dark:bg-gray-900 dark:text-gray-100`
- Responsive design with breakpoint prefixes
- Consistent spacing scale: `space-y-4`, `mb-4`, `p-6`
- Color palette: gray scale, blue for primary actions, red for destructive actions

### Common Class Patterns
- Cards: `bg-white dark:bg-gray-900 rounded-2xl shadow-md`
- Buttons: `bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md`
- Inputs: `w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800`
- Text: `text-xl font-semibold text-gray-800 dark:text-gray-100`

## Authentication & Security

### Token Management
- Store JWT tokens in localStorage: `localStorage.getItem('token')`
- Attach tokens to requests via Authorization header: `Bearer ${token}`
- Clear tokens on logout
- Store user data in localStorage for persistence

### Protected Routes
- Check authentication state before rendering protected components
- Redirect unauthenticated users to login
- Use Context API to share auth state globally

## Best Practices

### Performance
- Use conditional rendering to avoid unnecessary renders
- Implement loading states for better UX
- Lazy load components when appropriate
- Memoize expensive calculations

### Code Organization
- Group related functionality together
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Separate business logic from presentation

### User Experience
- Show loading indicators during async operations
- Provide feedback for user actions (alerts, toasts)
- Disable buttons during processing to prevent double-submission
- Display conditional button text: `{saving ? 'Saving...' : 'Save Settings'}`

### Development Workflow
- Use nodemon for backend auto-reload during development
- Use Vite/CRA dev server for frontend hot module replacement
- Test API endpoints before frontend integration
- Keep environment variables in `.env` files (never commit)
