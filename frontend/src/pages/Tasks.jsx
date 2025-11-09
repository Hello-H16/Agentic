// frontend/src/pages/Tasks.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, CheckCircle, XCircle, Clock } from 'lucide-react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-600" size={20} />;
      case 'failed': return <XCircle className="text-red-600" size={20} />;
      case 'running': return <Activity className="text-blue-600 animate-pulse" size={20} />;
      default: return <Clock className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Task History</h1>

        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {getStatusIcon(task.status)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{task.description}</p>
                    <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>Status: <span className="font-medium">{task.status}</span></span>
                      {task.workflowId && <span>Workflow: {task.workflowId.name}</span>}
                      {task.agentId && <span>Agent: {task.agentId.name}</span>}
                    </div>
                    {task.error && (
                      <div className="mt-2 text-sm text-red-600 dark:text-red-400">Error: {task.error}</div>
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(task.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              No tasks yet. Execute a workflow to see tasks here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
