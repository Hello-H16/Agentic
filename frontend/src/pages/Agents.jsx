// frontend/src/pages/Agents.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Bot, Edit, Trash2 } from 'lucide-react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'custom',
    systemPrompt: '',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2048
  });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/agents`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgents(res.data);
    } catch (err) {
      console.error('Error fetching agents:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingAgent) {
        await axios.put(`${API_BASE}/agents/${editingAgent._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_BASE}/agents`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowModal(false);
      setEditingAgent(null);
      setFormData({ name: '', description: '', type: 'custom', systemPrompt: '', model: 'gpt-4', temperature: 0.7, maxTokens: 2048 });
      fetchAgents();
    } catch (err) {
      console.error('Error saving agent:', err);
    }
  };

  const handleEdit = (agent) => {
    setEditingAgent(agent);
    setFormData(agent);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this agent?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/agents/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAgents();
    } catch (err) {
      console.error('Error deleting agent:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">AI Agents</h1>
          <button
            onClick={() => { setShowModal(true); setEditingAgent(null); setFormData({ name: '', description: '', type: 'custom', systemPrompt: '', model: 'gpt-4', temperature: 0.7, maxTokens: 2048 }); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus size={20} /> Create Agent
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map(agent => (
            <div key={agent._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Bot className="text-blue-600" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{agent.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{agent.type}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(agent)} className="text-gray-600 hover:text-blue-600">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(agent._id)} className="text-gray-600 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{agent.description}</p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <div>Model: {agent.model}</div>
                <div>Temp: {agent.temperature} | Tokens: {agent.maxTokens}</div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                {editingAgent ? 'Edit Agent' : 'Create Agent'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
                  >
                    <option value="research">Research</option>
                    <option value="writer">Writer</option>
                    <option value="analyst">Analyst</option>
                    <option value="coder">Coder</option>
                    <option value="email">Email Sender</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">System Prompt</label>
                  <textarea
                    value={formData.systemPrompt}
                    onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 h-32"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Model</label>
                    <select
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
                    >
                      <option value="gpt-4">GPT-4</option>
                      <option value="gpt-3.5-turbo">GPT-3.5</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Temperature</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="2"
                      value={formData.temperature}
                      onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                      className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Max Tokens</label>
                    <input
                      type="number"
                      value={formData.maxTokens}
                      onChange={(e) => setFormData({ ...formData, maxTokens: parseInt(e.target.value) })}
                      className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingAgent(null); }}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {editingAgent ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agents;
