// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bot, Workflow, MessageSquare, Activity } from 'lucide-react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ agents: 0, workflows: 0, conversations: 0, tasks: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const [agents, workflows, conversations, tasks] = await Promise.all([
        axios.get(`${API_BASE}/agents`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE}/workflows`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE}/chat/conversations`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE}/tasks`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setStats({
        agents: agents.data.length,
        workflows: workflows.data.length,
        conversations: conversations.data.length,
        tasks: tasks.data.length
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const cards = [
    { title: 'AI Agents', count: stats.agents, icon: Bot, color: 'blue', path: '/agents' },
    { title: 'Workflows', count: stats.workflows, icon: Workflow, color: 'purple', path: '/workflows' },
    { title: 'Conversations', count: stats.conversations, icon: MessageSquare, color: 'green', path: '/chat' },
    { title: 'Tasks', count: stats.tasks, icon: Activity, color: 'orange', path: '/tasks' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Welcome, {user?.name || user?.email}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your AI agents and workflows</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                onClick={() => navigate(card.path)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`text-${card.color}-600`} size={32} />
                  <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{card.count}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{card.title}</h3>
              </div>
            );
          })}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/agent')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md font-semibold"
            >
              Open AI Agent
            </button>
            <button
              onClick={() => navigate('/workflows')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-md font-semibold"
            >
              Build Workflow
            </button>
            <button
              onClick={() => navigate('/chat')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md font-semibold"
            >
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
