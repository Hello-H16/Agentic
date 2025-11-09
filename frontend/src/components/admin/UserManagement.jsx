// frontend/src/components/admin/UserManagement.jsx
import React from 'react';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../../components/common/Loading';
import UserTable from './UserTable';

const UserManagement = () => {
  const { users, loading, error, toggleUserStatus } = useAdmin();

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        User Management
      </h2>
      <UserTable users={users} onToggle={toggleUserStatus} />
    </div>
  );
};

export default UserManagement;
