'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Loader, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function ProfileSettings({ isOpen, onClose }) {
  const { user, updateProfile, logout, logoutAll, error } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [localError, setLocalError] = useState('');
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'security'

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setPhone(user.phone || '');
    }
  }, [user, isOpen]);

  const handleClose = () => {
    setMessage('');
    setLocalError('');
    onClose();
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLocalError('');
    setMessage('');

    if (!fullName.trim()) {
      setLocalError('Full name is required');
      return;
    }

    setLoading(true);
    try {
      const response = await updateProfile({ fullName, phone });
      console.log('[ProfileSettings] Update response:', response);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      const errorMsg = err.data?.message || err.message || 'Failed to update profile';
      setLocalError(errorMsg);
      console.error('[ProfileSettings] Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      try {
        await logout();
        console.log('[ProfileSettings] Logged out');
        handleClose();
      } catch (err) {
        setLocalError('Logout failed');
      }
    }
  };

  const handleLogoutAll = async () => {
    if (confirm('This will logout from all devices. Are you sure?')) {
      try {
        await logoutAll();
        console.log('[ProfileSettings] Logged out from all devices');
        handleClose();
      } catch (err) {
        setLocalError('Logout all devices failed');
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-purple-500/20"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
              <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-purple-500/20">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-3 font-semibold transition ${
                  activeTab === 'profile'
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex-1 py-3 font-semibold transition ${
                  activeTab === 'security'
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Security
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Status Messages */}
              {message && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
                  {message}
                </div>
              )}

              {(localError || error) && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                  {localError || error}
                </div>
              )}

              {activeTab === 'profile' ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  {/* User Info Display */}
                  <div className="space-y-3 mb-6 p-4 bg-slate-700/30 rounded-lg border border-purple-500/10">
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-purple-400" />
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-white font-medium break-all">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User size={18} className="text-purple-400" />
                      <div>
                        <p className="text-xs text-gray-400">Auth Method</p>
                        <p className="text-white font-medium">
                          {user.authMethod === 'email' ? 'Email/OTP' : 'Google'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Full Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+8801XXXXXXXXX"
                        className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                      />
                    </div>
                  </div>

                  {/* Update Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading && <Loader size={18} className="animate-spin" />}
                    Update Profile
                  </button>
                </form>
              ) : (
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm mb-4">Manage your account security and sessions.</p>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-semibold py-2.5 rounded-lg transition border border-red-500/30"
                  >
                    <LogOut size={18} />
                    Logout Current Device
                  </button>

                  <button
                    onClick={handleLogoutAll}
                    className="w-full flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-semibold py-2.5 rounded-lg transition border border-red-500/30"
                  >
                    <LogOut size={18} />
                    Logout All Devices
                  </button>

                  <div className="mt-4 p-3 bg-slate-700/30 rounded-lg border border-purple-500/10">
                    <p className="text-xs text-gray-400 mb-2">Security Info</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>✓ Your tokens are stored securely</li>
                      <li>✓ All API requests are encrypted</li>
                      <li>✓ Sessions auto-refresh on expiry</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
