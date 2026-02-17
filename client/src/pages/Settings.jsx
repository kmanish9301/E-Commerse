import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Palette,
  Bell,
  Shield,
  Moon,
  Sun,
  Save,
  MapPin,
  Plus,
  Trash2,
  Lock,
} from "lucide-react";

const Settings = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");

  // Mock states for UI demonstration
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    promotions: false,
    orderUpdates: true,
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "123 Main St, New York, NY 10001",
      default: true,
    },
    {
      id: 2,
      type: "Work",
      address: "456 Corporate Blvd, Dover, DE 19901",
      default: false,
    },
  ]);

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "address", label: "Addresses", icon: <MapPin size={18} /> },
  ];

  const themes = [
    {
      id: "light",
      name: "Light Mode",
      icon: <Sun size={24} />,
      desc: "Default light appearance",
    },
    {
      id: "dark",
      name: "Dark Mode",
      icon: <Moon size={24} />,
      desc: "Easier on your eyes",
    },
    {
      id: "midnight",
      name: "Midnight",
      icon: <Moon size={24} className="text-blue-400" />,
      desc: "Deep blue tones",
    },
    {
      id: "oled",
      name: "OLED Black",
      icon: <Moon size={24} className="text-purple-400" />,
      desc: "Pure black power saver",
    },
    {
      id: "soft",
      name: "Soft Warm",
      icon: <Sun size={24} className="text-yellow-400" />,
      desc: "Warm and cozy vibes",
    },
  ];

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">
        Settings
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? "bg-[var(--accent)] text-white shadow-lg"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-sm min-h-[500px]">
          {activeTab === "profile" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-4">
                Profile Settings
              </h2>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-3xl font-bold">
                  {user?.user_name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    {user?.user_name}
                  </h3>
                  <p className="text-[var(--text-secondary)]">{user?.email}</p>
                  <button className="mt-2 text-sm text-[var(--accent)] hover:underline">
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.user_name}
                    className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  className="flex items-center gap-2 px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors opacity-50 cursor-not-allowed"
                  title="Backend support coming soon"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-4">
                Appearance
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`relative p-4 rounded-xl border transition-all text-left flex items-start gap-4 ${
                      theme === t.id
                        ? "border-[var(--accent)] bg-[var(--accent)]/5 ring-2 ring-[var(--accent)]"
                        : "border-[var(--border)] hover:border-[var(--text-secondary)]"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-full ${
                        theme === t.id
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                      }`}
                    >
                      {t.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)]">
                        {t.name}
                      </h4>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {t.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]"
                  >
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </h4>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Receive updates via {key}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(key)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        value
                          ? "bg-[var(--accent)]"
                          : "bg-gray-300 dark:bg-gray-700"
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          value ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-4 flex items-center gap-2">
                <Shield size={24} className="text-[var(--accent)]" />
                Security Settings
              </h2>

              <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 p-4 rounded-xl mb-6">
                <h4 className="font-bold text-yellow-800 dark:text-yellow-400 mb-1">
                  Password Recommendation
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-500">
                  Use a strong password with at least 8 characters, including
                  numbers and symbols.
                </p>
              </div>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
                    />
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
                    />
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
                    />
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <button className="px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === "address" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  My Addresses
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors text-sm">
                  <Plus size={16} />
                  Add New
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] relative group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={18} className="text-[var(--accent)]" />
                        <span className="font-bold text-[var(--text-primary)]">
                          {addr.type}
                        </span>
                        {addr.default && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-[var(--accent)]/10 text-[var(--accent)] rounded-full uppercase">
                            Default
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {addr.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
