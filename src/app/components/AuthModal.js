'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const TABS = {
  LOGIN: 'login',
  SIGNUP: 'signup',
};

export default function AuthModal({ isOpen, onClose }) {
  const { loginWithEmail, verifyLoginOTP, signupWithEmail, verifySignupOTP, error } = useAuth();
  const [activeTab, setActiveTab] = useState(TABS.LOGIN);
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [localError, setLocalError] = useState('');

  const handleClose = () => {
    setActiveTab(TABS.LOGIN);
    setStep('email');
    setEmail('');
    setPhone('');
    setOtp('');
    setMessage('');
    setLocalError('');
    onClose();
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLocalError('');
    setMessage('');

    if (!email.trim()) {
      setLocalError('Email is required');
      return;
    }

    setLoading(true);
    try {
      if (activeTab === TABS.LOGIN) {
        const response = await loginWithEmail(email);
        setMessage(response.message || 'OTP sent to your email');
        console.log('[AuthModal] Login response:', response);
      } else {
        const response = await signupWithEmail(email, phone || null);
        setMessage(response.message || 'OTP sent to your email');
        console.log('[AuthModal] Signup response:', response);
      }
      setStep('otp');
    } catch (err) {
      const errorMsg = err.data?.message || err.message || 'Failed to send OTP';
      setLocalError(errorMsg);
      console.error('[AuthModal] Send OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLocalError('');
    setMessage('');

    if (!otp.trim()) {
      setLocalError('OTP is required');
      return;
    }

    setLoading(true);
    try {
      if (activeTab === TABS.LOGIN) {
        const response = await verifyLoginOTP(email, otp);
        console.log('[AuthModal] Login verification response:', response);
        setMessage('Login successful!');
        setTimeout(() => handleClose(), 1500);
      } else {
        const response = await verifySignupOTP(email, otp);
        console.log('[AuthModal] Signup verification response:', response);
        setMessage('Signup successful!');
        setTimeout(() => handleClose(), 1500);
      }
    } catch (err) {
      const errorMsg = err.data?.message || err.message || 'Invalid OTP';
      setLocalError(errorMsg);
      console.error('[AuthModal] Verify OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setStep('email');
    setEmail('');
    setPhone('');
    setOtp('');
    setMessage('');
    setLocalError('');
  };

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
              <h2 className="text-2xl font-bold text-white">
                {activeTab === TABS.LOGIN ? 'Login' : 'Sign Up'}
              </h2>
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
                onClick={() => switchTab(TABS.LOGIN)}
                className={`flex-1 py-3 font-semibold transition ${
                  activeTab === TABS.LOGIN
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => switchTab(TABS.SIGNUP)}
                className={`flex-1 py-3 font-semibold transition ${
                  activeTab === TABS.SIGNUP
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Sign Up
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

              <form onSubmit={step === 'email' ? handleSendOTP : handleVerifyOTP} className="space-y-4">
                {step === 'email' ? (
                  <>
                    {/* Email Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Input (Signup only) */}
                    {activeTab === TABS.SIGNUP && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone (Optional)
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+880..."
                          className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                        />
                        <p className="text-xs text-gray-400 mt-1">Format: +8801XXXXXXXXX</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Enter OTP</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="000000"
                        maxLength="6"
                        className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition text-center text-2xl tracking-widest"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep('email')}
                      className="text-xs text-purple-400 hover:text-purple-300 mt-2 transition"
                    >
                      Back to email
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader size={18} className="animate-spin" />}
                  {step === 'email'
                    ? 'Send OTP'
                    : 'Verify & ' + (activeTab === TABS.LOGIN ? 'Login' : 'Sign Up')}
                </button>
              </form>

              {/* Info Text */}
              <p className="text-center text-gray-400 text-sm mt-4">
                We'll send a one-time password to your email.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
