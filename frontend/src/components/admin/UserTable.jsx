export default function UserTable({ users, onToggle }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md overflow-x-auto">
      <h2 className="text-lg font-semibold mb-3">User Management</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2 capitalize">{u.status || "active"}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => onToggle(u._id, u.status === 'active' ? 'disabled' : 'active')}
                    className={`px-3 py-1 rounded text-white ${u.status === 'active' ? "bg-red-500" : "bg-green-500"}`}
                  >
                    {u.status === 'active' ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
