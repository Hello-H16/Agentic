const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const agentRoutes = require('./routes/agent');
const emailAgentRoutes = require('./routes/emailAgent');
const workflowRoutes = require('./routes/workflows');
const chatRoutes = require('./routes/chat');
const taskRoutes = require('./routes/tasks');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();

// Database
connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/email-agent', emailAgentRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Error handler
app.use(errorHandler);

// Base route
app.get('/', (req, res) => {
  res.send('Server running successfully 🚀');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🤖 Agent Workflow Platform Ready`);
});
