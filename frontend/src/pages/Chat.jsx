// frontend/src/pages/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, Plus, MessageSquare } from 'lucide-react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [agents, setAgents] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
    fetchAgents();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/chat/conversations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConversations(res.data);
    } catch (err) {
      console.error('Error fetching conversations:', err);
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

  const loadConversation = async (conversationId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/chat/conversations/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentConversation(res.data.conversation);
      setMessages(res.data.messages);
    } catch (err) {
      console.error('Error loading conversation:', err);
    }
  };

  const createNewConversation = async () => {
    if (!selectedAgent) return;
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_BASE}/chat/conversations`,
        { agentId: selectedAgent, title: 'New Chat' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentConversation(res.data);
      setMessages([]);
      setShowNewChat(false);
      fetchConversations();
    } catch (err) {
      console.error('Error creating conversation:', err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !currentConversation) return;
    
    const userMsg = { role: 'user', content: input, createdAt: new Date() };
    setMessages([...messages, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_BASE}/chat/messages`,
        { conversationId: currentConversation._id, content: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(prev => [...prev, res.data.assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowNewChat(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
          >
            <Plus size={20} /> New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {conversations.map(conv => (
            <div
              key={conv._id}
              onClick={() => loadConversation(conv._id)}
              className={`p-3 rounded-md cursor-pointer mb-1 ${
                currentConversation?._id === conv._id
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={16} />
                <span className="text-sm truncate">{conv.title}</span>
              </div>
              {conv.agentId && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{conv.agentId.name}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <>
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
              <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                {currentConversation.agentId?.name || 'Chat'}
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Select a conversation or create a new one
          </div>
        )}
      </div>

      {showNewChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">New Chat</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Agent</label>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
                >
                  <option value="">Choose an agent...</option>
                  {agents.map(agent => (
                    <option key={agent._id} value={agent._id}>{agent.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => { setShowNewChat(false); setSelectedAgent(''); }}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewConversation}
                  disabled={!selectedAgent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
