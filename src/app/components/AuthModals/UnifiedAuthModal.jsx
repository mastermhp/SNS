'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, Eye, EyeOff, Loader, User, Gamepad2, Building2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function UnifiedAuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const { login, signup, isLoading, error } = useAuth()
  const [mode, setMode] = useState(initialMode) // 'login' or 'signup'
  const [userType, setUserType] = useState('player') // 'player' or 'company'
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    realName: '',
    game: '',
    role: '',
    region: '',
    rank: '',
    discord: '',
    bio: '',
  })
  const [localError, setLocalError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setLocalError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLocalError('')

    if (!formData.email || !formData.password) {
      setLocalError('Please fill in all fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setLocalError('Please enter a valid email')
      return
    }

    const result = await login(formData.email, formData.password)
    if (result.success) {
      onClose()
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        realName: '',
        game: '',
        role: '',
        region: '',
        rank: '',
        discord: '',
        bio: '',
      })
      setMode('login')
    } else {
      setLocalError(result.error)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLocalError('')

    if (mode === 'signup' && userType === 'player') {
      if (!formData.email || !formData.password || !formData.username) {
        setLocalError('Please fill in all required fields')
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setLocalError('Passwords do not match')
        return
      }

      if (formData.password.length < 8) {
        setLocalError('Password must be at least 8 characters')
        return
      }

      const result = await signup({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        realName: formData.realName,
        userType: 'player',
        gameDetails: {
          game: formData.game,
          role: formData.role,
          rank: formData.rank,
          region: formData.region,
        },
        discord: formData.discord,
        bio: formData.bio,
      })

      if (result.success) {
        onClose()
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          username: '',
          realName: '',
          game: '',
          role: '',
          region: '',
          rank: '',
          discord: '',
          bio: '',
        })
        setMode('login')
      } else {
        setLocalError(result.error)
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const renderLoginForm = () => (
    <motion.form
      onSubmit={handleLogin}
      className="space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Email Field */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@email.com"
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition duration-300"
          />
        </div>
      </motion.div>

      {/* Password Field */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition duration-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {(localError || error) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
          >
            {localError || error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <motion.button
        variants={itemVariants}
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <>
            <Loader size={20} className="animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </motion.button>

      {/* Divider */}
      <motion.div variants={itemVariants} className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gradient-to-b from-[#171717] to-[#0a0a14] text-gray-500">Don't have an account?</span>
        </div>
      </motion.div>

      {/* Switch to Signup */}
      <motion.button
        variants={itemVariants}
        type="button"
        onClick={() => {
          setMode('signup')
          setLocalError('')
        }}
        className="w-full py-3 border-2 border-purple-500/50 hover:border-purple-400 text-purple-300 font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Create New Account
      </motion.button>
    </motion.form>
  )

  const renderSignupForm = () => (
    <motion.form
      onSubmit={handleSignup}
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* User Type Selection */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-300 mb-3">I am a:</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setUserType('player')
              setLocalError('')
            }}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2 ${
              userType === 'player'
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:border-purple-500/50'
            }`}
          >
            <Gamepad2 size={18} />
            Player
          </button>
          <button
            type="button"
            onClick={() => {
              setUserType('company')
              setLocalError('')
            }}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2 ${
              userType === 'company'
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:border-purple-500/50'
            }`}
          >
            <Building2 size={18} />
            Company
          </button>
        </div>
      </motion.div>

      {/* Email Field */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@email.com"
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition duration-300"
          />
        </div>
      </motion.div>

      {/* Username Field */}
      {userType === 'player' && (
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your gaming username"
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition duration-300"
            />
          </div>
        </motion.div>
      )}

      {/* Password Field */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimum 8 characters"
            className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition duration-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Confirm Password Field */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition duration-300"
          />
        </div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {(localError || error) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
          >
            {localError || error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <motion.button
        variants={itemVariants}
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <>
            <Loader size={20} className="animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </motion.button>

      {/* Divider */}
      <motion.div variants={itemVariants} className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gradient-to-b from-[#171717] to-[#0a0a14] text-gray-500">Already have an account?</span>
        </div>
      </motion.div>

      {/* Switch to Login */}
      <motion.button
        variants={itemVariants}
        type="button"
        onClick={() => {
          setMode('login')
          setLocalError('')
        }}
        className="w-full py-3 border-2 border-purple-500/50 hover:border-purple-400 text-purple-300 font-semibold rounded-lg transition duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Sign In Instead
      </motion.button>
    </motion.form>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.3 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.85, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 50 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="relative bg-gradient-to-b from-[#171717] to-[#0a0a14] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />

              {/* Content */}
              <div className="relative p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                      {mode === 'login' ? 'Welcome Back' : 'Join SliceNShare'}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">{mode === 'login' ? 'Sign in to your account' : 'Create your gaming profile'}</p>
                  </motion.div>
                  <motion.button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition p-2 hover:bg-white/10 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Form */}
                {mode === 'login' ? renderLoginForm() : renderSignupForm()}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
