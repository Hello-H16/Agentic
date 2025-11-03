import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AnalyticsChart({ data }) {
  if (!data || data.length === 0) return <p>No analytics data available.</p>;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-3">Usage Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="messages" stroke="#3b82f6" />
          <Line type="monotone" dataKey="conversations" stroke="#10b981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
