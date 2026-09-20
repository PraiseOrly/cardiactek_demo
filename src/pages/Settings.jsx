import { useState } from 'react';
import { Save, Bell, Lock, User } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    fullName: 'Dr. Sarah Chen',
    email: 'sarah.chen@hospital.local',
    specialty: 'Cardiologist',
    notifications: {
      emailAlerts: true,
      followUpReminders: true,
      ecgAnalysis: true,
    },
    privacy: {
      twoFactor: false,
      sessionTimeout: 30,
    },
  });

  const handleToggle = (section, key) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your CardiacTEK preferences and account</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary-600" />
            Profile
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={settings.fullName}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, fullName: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialty
              </label>
              <select
                value={settings.specialty}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, specialty: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option>Cardiologist</option>
                <option>General Practitioner</option>
                <option>Cardiac Surgeon</option>
                <option>Cardiac Nurse</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary-600" />
            Notifications
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.emailAlerts}
                onChange={() => handleToggle('notifications', 'emailAlerts')}
                className="w-4 h-4 rounded border-gray-300"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Email Alerts</p>
                <p className="text-xs text-gray-500">
                  Receive email notifications for important updates
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.followUpReminders}
                onChange={() => handleToggle('notifications', 'followUpReminders')}
                className="w-4 h-4 rounded border-gray-300"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Follow-up Reminders</p>
                <p className="text-xs text-gray-500">
                  Get reminded about upcoming patient follow-ups
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.ecgAnalysis}
                onChange={() => handleToggle('notifications', 'ecgAnalysis')}
                className="w-4 h-4 rounded border-gray-300"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">ECG Analysis Complete</p>
                <p className="text-xs text-gray-500">
                  Notify when ECG analysis results are ready for review
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary-600" />
            Privacy & Security
          </h2>

          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.twoFactor}
                  onChange={() => handleToggle('privacy', 'twoFactor')}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-xs text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes):
              </label>
              <input
                type="number"
                value={settings.privacy.sessionTimeout}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    privacy: { ...prev.privacy, sessionTimeout: parseInt(e.target.value) },
                  }))
                }
                min="5"
                max="480"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Automatically log out after this period of inactivity
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Settings
          </button>
          <button className="px-6 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
