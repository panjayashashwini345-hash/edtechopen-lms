'use client';

import { useState } from 'react';
import { User } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

interface SettingsProps {
  user: User;
  onNavigate: (page: any) => void;
}

type SettingTab = 'profile' | 'security' | 'notifications' | 'appearance' | 'privacy';

const avatarColors = [
  { name: 'orange', color: '🟠' },
  { name: 'blue', color: '🔵' },
  { name: 'green', color: '🟢' },
  { name: 'purple', color: '🟣' },
  { name: 'red', color: '🔴' },
  { name: 'yellow', color: '🟡' },
];

export default function Settings({ user, onNavigate }: SettingsProps) {
  const { user: contextUser, updateUserName, updateUserAvatar, showToast } = useAppContext();
  const displayUser = contextUser || user;
  
  const [activeTab, setActiveTab] = useState<SettingTab>('profile');
  const [showPasswordFields, setShowPasswordFields] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [settings, setSettings] = useState({
    firstName: displayUser.name.split(' ')[0],
    lastName: displayUser.name.split(' ')[1] || '',
    email: displayUser.email,
    phone: '+91 98765 43210',
    bio: 'Passionate learner exploring technology',
    theme: 'dark',
    accentColor: 'orange',
    emailNotifications: true,
    pushNotifications: true,
    newsLetter: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const tabs: { id: SettingTab; label: string; icon: string }[] = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'privacy', label: 'Privacy', icon: '👁️' },
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveProfile = () => {
    updateUserName(settings.firstName, settings.lastName);
    showToast('Profile updated successfully!', 'success');
  };

  const handleChangeAvatar = (colorName: string) => {
    updateUserAvatar(colorName);
    showToast('Avatar updated!', 'success');
  };

  const handleChangePassword = () => {
    if (settings.newPassword !== settings.confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return;
    }
    if (settings.newPassword.length < 6) {
      showToast('Password must be at least 6 characters!', 'error');
      return;
    }
    showToast('Password updated successfully!', 'success');
    setSettings((prev) => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account and preferences</p>
        </div>

        {/* Settings Container */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar - Tabs */}
          <div className="md:col-span-1">
            <Card className="border-slate-700 bg-slate-900 p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-orange-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card className="border-slate-700 bg-slate-900 p-6 space-y-4">
                <h2 className="text-2xl font-bold text-white">Profile Information</h2>

                {/* Avatar Section */}
                <div className="flex items-center gap-4 pb-4 border-b border-slate-700">
                  <div className="text-6xl">{displayUser.avatar}</div>
                  <div>
                    <p className="text-white font-semibold">{displayUser.name}</p>
                    <p className="text-slate-400">{displayUser.email}</p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      <Button
                        onClick={() => setActiveTab('appearance')}
                        className="bg-orange-600 hover:bg-orange-700 text-sm"
                      >
                        Change Avatar
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400">First Name</label>
                    <input
                      type="text"
                      value={settings.firstName}
                      onChange={(e) => handleSettingChange('firstName', e.target.value)}
                      className="w-full mt-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400">Last Name</label>
                    <input
                      type="text"
                      value={settings.lastName}
                      onChange={(e) => handleSettingChange('lastName', e.target.value)}
                      className="w-full mt-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400">Email Address</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                    className="w-full mt-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400">Phone Number</label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => handleSettingChange('phone', e.target.value)}
                    className="w-full mt-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400">Bio</label>
                  <textarea
                    value={settings.bio}
                    onChange={(e) => handleSettingChange('bio', e.target.value)}
                    className="w-full mt-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-orange-500 focus:outline-none resize-none h-24"
                  />
                </div>

                <Button onClick={handleSaveProfile} className="w-full bg-orange-600 hover:bg-orange-700">Save Profile</Button>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-4">
                <Card className="border-slate-700 bg-slate-900 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Change Password</h2>
                  <div className="space-y-4">
                    {/* Current Password */}
                    <div>
                      <label className="text-sm text-slate-400">Current Password</label>
                      <div className="relative mt-2">
                        <input
                          type={showPasswordFields.current ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={settings.currentPassword}
                          onChange={(e) => handleSettingChange('currentPassword', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                        />
                        <button
                          onClick={() => setShowPasswordFields((prev) => ({ ...prev, current: !prev.current }))}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-white transition"
                        >
                          {showPasswordFields.current ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="text-sm text-slate-400">New Password</label>
                      <div className="relative mt-2">
                        <input
                          type={showPasswordFields.new ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={settings.newPassword}
                          onChange={(e) => handleSettingChange('newPassword', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                        />
                        <button
                          onClick={() => setShowPasswordFields((prev) => ({ ...prev, new: !prev.new }))}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-white transition"
                        >
                          {showPasswordFields.new ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="text-sm text-slate-400">Confirm Password</label>
                      <div className="relative mt-2">
                        <input
                          type={showPasswordFields.confirm ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={settings.confirmPassword}
                          onChange={(e) => handleSettingChange('confirmPassword', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                        />
                        <button
                          onClick={() => setShowPasswordFields((prev) => ({ ...prev, confirm: !prev.confirm }))}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-white transition"
                        >
                          {showPasswordFields.confirm ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                    </div>

                    <Button onClick={handleChangePassword} className="w-full bg-orange-600 hover:bg-orange-700">
                      Update Password
                    </Button>
                  </div>
                </Card>

                <Card className="border-slate-700 bg-slate-900 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Active Sessions</h2>
                  <div className="space-y-3">
                    {[
                      { device: '🖥️ Chrome on Windows', location: 'Mumbai, India', status: 'Active now' },
                      { device: '📱 Safari on iPhone', location: 'Mumbai, India', status: '2 hours ago' },
                    ].map((session, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                        <div>
                          <p className="text-white font-semibold">{session.device}</p>
                          <p className="text-xs text-slate-400">{session.location} • {session.status}</p>
                        </div>
                        <Button className="bg-red-600 hover:bg-red-700 text-sm">Revoke</Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <Card className="border-slate-700 bg-slate-900 p-6 space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">Notification Preferences</h2>

                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get alerts on your device' },
                  { key: 'newsLetter', label: 'Weekly Newsletter', desc: 'Subscribe to our weekly digest' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                    <div>
                      <p className="text-white font-semibold">{item.label}</p>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings[item.key as keyof typeof settings] as boolean}
                      onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                      className="w-6 h-6 cursor-pointer"
                    />
                  </div>
                ))}

                <Button className="w-full bg-orange-600 hover:bg-orange-700">Save Preferences</Button>
              </Card>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-4">
                <Card className="border-slate-700 bg-slate-900 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Avatar Color</h2>
                  <div className="grid grid-cols-6 gap-4">
                    {avatarColors.map((option) => (
                      <button
                        key={option.name}
                        onClick={() => handleChangeAvatar(option.name)}
                        className={`text-5xl p-3 rounded-lg transition ${
                          displayUser.avatar === option.color ? 'ring-2 ring-orange-500 bg-slate-800' : 'hover:bg-slate-800'
                        }`}
                      >
                        {option.color}
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="border-slate-700 bg-slate-900 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Theme</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={settings.theme === 'dark'}
                        onChange={(e) => handleSettingChange('theme', e.target.value)}
                        className="w-4 h-4"
                      />
                      <label className="text-white cursor-pointer">Dark Mode</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={settings.theme === 'light'}
                        onChange={(e) => handleSettingChange('theme', e.target.value)}
                        className="w-4 h-4"
                      />
                      <label className="text-white cursor-pointer">Light Mode</label>
                    </div>
                  </div>
                </Card>

                <Card className="border-slate-700 bg-slate-900 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Accent Color</h2>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { name: 'Orange', bg: 'bg-orange-600' },
                      { name: 'Indigo', bg: 'bg-indigo-600' },
                      { name: 'Green', bg: 'bg-green-600' },
                      { name: 'Pink', bg: 'bg-pink-600' },
                    ].map((accent) => (
                      <button
                        key={accent.name}
                        onClick={() => handleSettingChange('accentColor', accent.name.toLowerCase())}
                        className={`${accent.bg} px-4 py-3 rounded-lg transition text-white font-semibold ${
                          settings.accentColor === accent.name.toLowerCase() ? 'ring-2 ring-white' : 'hover:opacity-90'
                        }`}
                      >
                        {accent.name}
                      </button>
                    ))}
                  </div>
                </Card>

                <Button className="w-full bg-orange-600 hover:bg-orange-700">Save Appearance Settings</Button>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <Card className="border-slate-700 bg-slate-900 p-6 space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">Privacy Settings</h2>

                {[
                  { label: 'Profile Visibility', desc: 'Make your profile visible to other users' },
                  { label: 'Show Progress', desc: 'Display your learning progress publicly' },
                  { label: 'Learning Analytics', desc: 'Allow us to improve your experience' },
                  { label: 'Share Achievements', desc: 'Show your certificates on your profile' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                    <div>
                      <p className="text-white font-semibold">{item.label}</p>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 cursor-pointer" />
                  </div>
                ))}

                <Button className="w-full bg-orange-600 hover:bg-orange-700">Save Privacy Settings</Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
