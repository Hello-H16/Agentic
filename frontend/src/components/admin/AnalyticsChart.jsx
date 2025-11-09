// frontend/src/components/admin/AnalyticsChart.jsx
import React from "react";
import { useAdmin } from "../../hooks/useAdmin";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from '../../components/ui/card';


const AnalyticsChart = () => {
  const { analytics, loading, error } = useAdmin();

  if (loading)
    return (
      <div className="text-center text-gray-500 py-6">
        Loading analytics data...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 py-6">
        Error fetching data: {error}
      </div>
    );

  if (!analytics || analytics.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        No analytics data available.
      </div>
    );
  }

  return (
    <Card className="shadow-md p-4 rounded-2xl bg-white dark:bg-gray-800">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Usage Analytics Overview
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={analytics}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="newUsers"
              stroke="#2563eb"
              strokeWidth={2}
              name="New Users"
            />
            <Line
              type="monotone"
              dataKey="activeChats"
              stroke="#16a34a"
              strokeWidth={2}
              name="Active Chats"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
