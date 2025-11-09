import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAdmin = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [usersRes, statsRes] = await Promise.all([
        axios.get(`${API_BASE}/users`), // Correctly calls /api/admin/users
        axios.get(`${API_BASE}/stats`), // Correctly calls /api/admin/stats
      ]);
      setUsers(usersRes.data || []);
      setStats(statsRes.data || {});
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError(err.response?.data?.message || "Failed to fetch admin data");
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleUserStatus = useCallback(async (userId, newStatus) => {
    try {
      await axios.put(`${API_BASE}/users/${userId}/status`, { status: newStatus }); // Correctly calls /api/admin/users/:id/status
      // Refresh data after update
      fetchData();
    } catch (err) {
      console.error("Error toggling user status:", err);
      // Optionally set an error state to show in the UI
    }
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { users, stats, loading, error, toggleUserStatus };
};

export default useAdmin;
