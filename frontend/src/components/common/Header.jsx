// frontend/src/components/common/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-800 px-6 py-3 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
        Langdock Admin Panel
      </h1>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-gray-600 dark:text-gray-300">
            {user.email} ({user.role})
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
