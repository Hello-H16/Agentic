import { useState } from "react";

export default function SettingsPanel({ settings, onSave }) {
  const [form, setForm] = useState(settings || { model: "", apiKey: "", rateLimit: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => onSave(form);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-3">System Settings</h2>

      <div className="space-y-3">
        <label className="block">
          <span>Model Selection</span>
          <select name="model" value={form.model} onChange={handleChange} className="w-full p-2 border rounded">
            <option>GPT-3.5</option>
            <option>GPT-4</option>
            <option>Claude</option>
          </select>
        </label>

        <label className="block">
          <span>API Key</span>
          <input
            type="text"
            name="apiKey"
            value={form.apiKey}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          <span>Rate Limit (req/min)</span>
          <input
            type="number"
            name="rateLimit"
            value={form.rateLimit}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>

        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Settings
        </button>
      </div>
    </div>
  );
}
