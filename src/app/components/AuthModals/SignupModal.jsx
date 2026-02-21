'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, User, Lock, Gamepad2, Users, MapPin, Award, MessageCircle, Type, Eye, EyeOff, Loader, Check } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const GAMES = ['Valorant', 'League of Legends', 'CS:GO', 'Dota 2', 'Fortnite', 'Apex Legends']
const ROLES = {
  Valorant: ['Duelist', 'Controller', 'Initiator', 'Sentinel'],
  'League of Legends': ['Top', 'Jungle', 'Mid', 'ADC', 'Support'],
  'CS:GO': ['Rifler', 'AWPer', 'Support', 'Entry', 'IGL'],
  'Dota 2': ['Carry', 'Mid', 'Off-lane', 'Support', 'Hard Support'],
  Fortnite: ['Solo', 'Team', 'Creative'],
  'Apex Legends': ['Assault', 'Tracker', 'Support', 'Recon'],
}
const REGIONS = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa']
const RANKS = {
  Valorant: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'],
  'League of Legends': ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger'],
  'CS:GO': ['Silver 1', 'Silver 2', 'SEM', 'Gold Nova', 'GN2', 'GN3', 'MG', 'DMG', 'LE', 'LEM', 'SMFC', 'Global'],
}

export default function SignupModal({ isOpen, onClose, userType = 'player' }) {
  const { signup, isLoading } = useAuth()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    realName: '',
    email: '',
    password: '',
    confirmPassword: '',
    game: '',
    role: '',
    region: '',
    rank: '',
    discord: '',
    bio: '',
    userType: userType,
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateStep = (stepNum) => {
    const newErrors = {}

    if (stepNum === 1) {
      if (!formData.username) newErrors.username = 'Username is required'
      if (!formData.realName) newErrors.realName = 'Real name is required'
      if (!formData.email) newErrors.email = 'Email is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
      if (!formData.password) newErrors.password = 'Password is required'
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    }

    if (stepNum === 2) {
      if (!formData.game) newErrors.game = 'Game is required'
      if (!formData.role) newErrors.role = 'Role is required'
      if (!formData.region) newErrors.region = 'Region is required'
      if (!formData.rank) newErrors.rank = 'Rank is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateStep(2)) {
      const result = await signup(formData)
      if (result.success) {
        onClose()
        setFormData({
          username: '',
          realName: '',
          email: '',
          password: '',
          confirmPassword: '',
          game: '',
          role: '',
          region: '',
          rank: '',
          discord: '',
          bio: '',
          userType: userType,
        })
        setStep(1)
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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="relative bg-gradient-to-b from-[#171717] to-[#0a0a14] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10">
                <motion.div variants={itemVariants}>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                    Join SliceNShare
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {userType === 'player' ? 'Create your player profile' : 'Register your organization'}
                  </p>
                </motion.div>
                <motion.button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition p-2 hover:bg-white/10 rounded-lg flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Progress Bar */}
              <motion.div className="h-1 bg-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: '33%' }}
                  animate={{ width: step === 1 ? '33%' : '66%' }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>

              {/* Content */}
              <motion.form
                onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNextStep() }}
                className="p-6 sm:p-8"
              >
                <motion.div
                  className="space-y-5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key={step}
                >
                  {step === 1 && (
                    <>
                      {/* Basic Info Section */}
                      <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                          <User size={20} className="text-purple-400" />
                          Basic Information
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          {/* Username */}
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                            <input
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleChange}
                              placeholder="ShadowStrike"
                              className={`w-full px-4 py-2.5 bg-white/5 border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:bg-white/10 transition ${
                                errors.username ? 'border-red-500' : 'border-white/10 focus:border-purple-500'
                              }`}
                            />
                            {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
                          </motion.div>

                          {/* Real Name */}
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Real Name</label>
                            <input
                              type="text"
                              name="realName"
                              value={formData.realName}
                              onChange={handleChange}
                              placeholder="Alex Chen"
                              className={`w-full px-4 py-2.5 bg-white/5 border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:bg-white/10 transition ${
                                errors.realName ? 'border-red-500' : 'border-white/10 focus:border-purple-500'
                              }`}
                            />
                            {errors.realName && <p className="text-red-400 text-xs mt-1">{errors.realName}</p>}
                          </motion.div>
                        </div>

                        {/* Email */}
                        <motion.div variants={itemVariants} className="mb-4">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@email.com"
                            className={`w-full px-4 py-2.5 bg-white/5 border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:bg-white/10 transition ${
                              errors.email ? 'border-red-500' : 'border-white/10 focus:border-purple-500'
                            }`}
                          />
                          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </motion.div>

                        {/* Password */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <div className="relative">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full px-4 py-2.5 bg-white/5 border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:bg-white/10 transition pr-10 ${
                                  errors.password ? 'border-red-500' : 'border-white/10 focus:border-purple-500'
                                }`}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                              >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              placeholder="••••••••"
                              className={`w-full px-4 py-2.5 bg-white/5 border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:bg-white/10 transition ${
                                errors.confirmPassword ? 'border-red-500' : 'border-white/10 focus:border-purple-500'
                              }`}
                            />
                            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                          </motion.div>
                        </div>
                      </motion.div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      {/* Gaming Profile Section */}
                      <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                          <Gamepad2 size={20} className="text-purple-400" />
                          Gaming Profile
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          {/* Game */}
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Main Game</label>
                            <select
                              name="game"
                              value={formData.game}
                              onChange={handleChange}
                              className={`w-full px-4 py-2.5 bg-white/5 border rounded-lg text-white focus:outline-none focus:bg-white/10 transition appearance-none cursor-pointer ${
                                errors.game ? 'border-red-500' : 'border-white/10 focus:border-purple-500'
                              }`}
                            >
                              <option value="">Select game</option>
                              {GAMES.map((game) => (
                                <option key={game} value={game}>
                                  {game}
                                </option>
                              ))}
                            </select>
                            {errors.game && <p className="text-red-400 text-xs mt-1">{errors.game}</p>}
                          </motion.div>

                          {/* Role */}
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                            <select
                              name="role"
                              value={formData.role}
                              onChange={handleChange}
                              disabled={!formData.game}
                              className={`w-full px-4 py-2.5 bg-white/5 border rounded-lg text-white focus:outline-none focus:bg-white/10 transition appearance-none cursor-pointer disabled:opacity-50 ${
                                errors.role ? 'border-red-500' : 'border-white/10 focus:border-purple-500'
                              }`}
                            >
                              <option value="">Select role</option>
                              {formData.game && ROLES[formData.game]?.map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </select>
                            {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role}</p>}
                          </motion.div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          {/* Region */}
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Region</label>
                            <select
                              name="region"
                              value={formData.region}
                              onChange={handleChange}
                              className={`w-full px-4 py-2.5 bg-white/5 border rounded-lg text-white focus:outline-none focus:bg-white/10 transition appearance-none cursor-pointer ${
                                errors.region ? 'border-red-500' : 'border-white/10 focus:border-purple-500'
                              }`}
                            >
                              <option value="">Select region</option>
                              {REGIONS.map((region) => (
                                <option key={region} value={region}>
                                  {region}
                                </option>
                              ))}
                            </select>
                            {errors.region && <p className="text-red-400 text-xs mt-1">{errors.region}</p>}
                          </motion.div>

                          {/* Rank */}
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Current Rank</label>
                            <select
                              name="rank"
                              value={formData.rank}
                              onChange={handleChange}
                              disabled={!formData.game}
                              className={`w-full px-4 py-2.5 bg-white/5 border rounded-lg text-white focus:outline-none focus:bg-white/10 transition appearance-none cursor-pointer disabled:opacity-50 ${
                                errors.rank ? 'border-red-500' : 'border-white/10 focus:border-purple-500'
                              }`}
                            >
                              <option value="">Select rank</option>
                              {formData.game && RANKS[formData.game]?.map((rank) => (
                                <option key={rank} value={rank}>
                                  {rank}
                                </option>
                              ))}
                            </select>
                            {errors.rank && <p className="text-red-400 text-xs mt-1">{errors.rank}</p>}
                          </motion.div>
                        </div>

                        {/* Discord */}
                        <motion.div variants={itemVariants} className="mb-4">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Discord Handle (Optional)</label>
                          <input
                            type="text"
                            name="discord"
                            value={formData.discord}
                            onChange={handleChange}
                            placeholder="username#1234"
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition"
                          />
                        </motion.div>

                        {/* Bio */}
                        <motion.div variants={itemVariants}>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Bio (Optional)</label>
                          <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself..."
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition resize-none h-20"
                          />
                        </motion.div>
                      </motion.div>
                    </>
                  )}
                </motion.div>

                {/* Button Group */}
                <motion.div className="flex gap-3 mt-8">
                  {step === 2 && (
                    <motion.button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-lg transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                  )}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <>
                        <Loader size={20} className="animate-spin" />
                        Creating...
                      </>
                    ) : step === 1 ? (
                      <>
                        Continue <Check size={20} />
                      </>
                    ) : (
                      'Create Profile'
                    )}
                  </motion.button>
                </motion.div>

                {/* Terms */}
                <motion.p variants={itemVariants} className="text-center text-gray-500 text-xs mt-4">
                  By creating an account, you agree to our Terms of Service and Privacy Policy
                </motion.p>
              </motion.form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
