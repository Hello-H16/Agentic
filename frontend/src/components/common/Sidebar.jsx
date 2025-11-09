// frontend/src/components/common/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Users, Settings, BarChart } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={18} /> },
    { name: 'Chat', path: '/chat', icon: <MessageCircle size={18} /> },
    { name: 'Admin Dashboard', path: '/admin/dashboard', icon: <BarChart size={18} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={18} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Langdock</h2>
      <nav className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition ${
              location.pathname === link.path ? 'bg-gray-800' : ''
            }`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
