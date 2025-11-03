import React from 'react';
import useAdmin from '../../hooks/useAdmin';

export default function UserManagement() {
  const { users, loading, fetchUsers } = useAdmin();

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">User Management</h2>
      {loading ? <div>Loading...</div> : (
        <table className="min-w-full">
          <thead><tr><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => {/* call toggle */}}>Toggle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
