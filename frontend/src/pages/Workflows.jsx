// frontend/src/pages/Workflows.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Workflow, Play, Edit, Trash2 } from 'lucide-react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Workflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [agents, setAgents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showExecuteModal, setShowExecuteModal] = useState(false);
  const [executingWorkflow, setExecutingWorkflow] = useState(null);
  const [executeInput, setExecuteInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    steps: []
  });

  useEffect(() => {
    fetchWorkflows();
    fetchAgents();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/workflows`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkflows(res.data);
    } catch (err) {
      console.error('Error fetching workflows:', err);
    }
  };

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
      await axios.post(`${API_BASE}/workflows`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      setFormData({ name: '', description: '', steps: [] });
      fetchWorkflows();
    } catch (err) {
      console.error('Error saving workflow:', err);
    }
  };

  const handleExecute = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_BASE}/workflows/${executingWorkflow._id}/execute`,
        { input: executeInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Workflow executed successfully!');
      setShowExecuteModal(false);
      setExecuteInput('');
    } catch (err) {
      console.error('Error executing workflow:', err);
      alert('Error executing workflow');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this workflow?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/workflows/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchWorkflows();
    } catch (err) {
      console.error('Error deleting workflow:', err);
    }
  };

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { agentId: '', order: formData.steps.length + 1, instruction: '', outputVariable: '' }]
    });
  };

  const updateStep = (index, field, value) => {
    const newSteps = [...formData.steps];
    newSteps[index][field] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Workflows</h1>
          <button
            onClick={() => { setShowModal(true); setFormData({ name: '', description: '', steps: [] }); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus size={20} /> Create Workflow
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.map(workflow => (
            <div key={workflow._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Workflow className="text-purple-600" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{workflow.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{workflow.steps?.length || 0} steps</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setExecutingWorkflow(workflow); setShowExecuteModal(true); }}
                    className="text-gray-600 hover:text-green-600"
                  >
                    <Play size={18} />
                  </button>
                  <button onClick={() => handleDelete(workflow._id)} className="text-gray-600 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{workflow.description}</p>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Create Workflow</h2>
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
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">Steps</label>
                    <button type="button" onClick={addStep} className="text-blue-600 text-sm">+ Add Step</button>
                  </div>
                  {formData.steps.map((step, index) => (
                    <div key={index} className="border rounded-md p-3 mb-2 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs mb-1">Agent</label>
                          <select
                            value={step.agentId}
                            onChange={(e) => updateStep(index, 'agentId', e.target.value)}
                            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-sm"
                          >
                            <option value="">Select Agent</option>
                            {agents.map(agent => (
                              <option key={agent._id} value={agent._id}>{agent.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs mb-1">Output Variable</label>
                          <input
                            type="text"
                            value={step.outputVariable}
                            onChange={(e) => updateStep(index, 'outputVariable', e.target.value)}
                            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-sm"
                            placeholder="result1"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs mb-1">Instruction</label>
                        <textarea
                          value={step.instruction}
                          onChange={(e) => updateStep(index, 'instruction', e.target.value)}
                          className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-sm"
                          rows="2"
                          placeholder="Use {{input}} or {{result1}}"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showExecuteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Execute Workflow</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Input</label>
                  <textarea
                    value={executeInput}
                    onChange={(e) => setExecuteInput(e.target.value)}
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 h-32"
                    placeholder="Enter workflow input..."
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => { setShowExecuteModal(false); setExecuteInput(''); }}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleExecute}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Execute
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workflows;
