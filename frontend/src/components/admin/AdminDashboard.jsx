import useAdmin from "../../hooks/useAdmin";
import UserTable from "./UserTable";
import AnalyticsChart from "./AnalyticsChart";
import SettingsPanel from "./SettingsPanel";

export default function AdminDashboard() {
  const { users, stats, loading, toggleUserStatus } = useAdmin();

  if (loading) return <p className="text-center mt-10">Loading admin dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnalyticsChart data={stats.analytics || []} />
        <SettingsPanel settings={stats.settings || {}} onSave={() => alert("Saved!")} />
      </div>
      <UserTable users={users} onToggle={toggleUserStatus} />
    </div>
  );
}
