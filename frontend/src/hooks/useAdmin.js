import { useState, useEffect } from "react";
import api from "../services/api";

export default function useAdmin() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      const [userRes, statsRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/stats"),
      ]);
      setUsers(userRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (id, status) => {
    try {
      await api.put(`/admin/users/${id}/status`, { status });
      fetchAdminData();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return { users, stats, loading, toggleUserStatus };
}
