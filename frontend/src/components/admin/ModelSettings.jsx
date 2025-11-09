// frontend/src/components/admin/ModelSettings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import Loading from '../../components/common/Loading';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const ModelSettings = () => {
  const [settings, setSettings] = useState({
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2048,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/model-settings`);
      setSettings(res.data || settings);
    } catch (err) {
      console.error('Error fetching model settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      await axios.post(`${API_BASE}/model-settings`, settings);
      alert('Settings updated successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Model Settings
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Model</label>
          <select
            value={settings.model}
            onChange={(e) => setSettings({ ...settings, model: e.target.value })}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="mistral">Mistral</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Temperature ({settings.temperature})</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.temperature}
            onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Max Tokens</label>
          <input
            type="number"
            min="512"
            max="4096"
            value={settings.maxTokens}
            onChange={(e) => setSettings({ ...settings, maxTokens: parseInt(e.target.value) })}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
          />
        </div>

        <Button
          onClick={saveSettings}
          disabled={saving}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
};

export default ModelSettings;
