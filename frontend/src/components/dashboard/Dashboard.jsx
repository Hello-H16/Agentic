import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Welcome, {user?.email || 'User'}!
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        This is your main dashboard. Select an option from the sidebar to get started.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Start a Conversation</h2>
          <p className="text-gray-500 dark:text-gray-400">Jump into the chat interface to interact with the AI models.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Review Your History</h2>
          <p className="text-gray-500 dark:text-gray-400">Check your past conversations and continue where you left off.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
