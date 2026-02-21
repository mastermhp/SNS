'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Phone, User, Lock, Gamepad2, MapPin, Award, MessageCircle, Loader, Check, ChevronRight, ChevronLeft, Globe, AtSign, FileText, Camera, ImageIcon } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'

const GAMES = ['Valorant', 'League of Legends', 'CS:GO', 'Dota 2', 'Fortnite', 'Apex Legends', 'PUBG Mobile', 'Free Fire', 'MLBB', 'Call of Duty Mobile', 'PUBG PC']
const ROLES = {
  Valorant: ['Duelist', 'Controller', 'Initiator', 'Sentinel'],
  'League of Legends': ['Top', 'Jungle', 'Mid', 'ADC', 'Support'],
  'CS:GO': ['Rifler', 'AWPer', 'Support', 'Entry', 'IGL'],
  'Dota 2': ['Carry', 'Mid', 'Off-lane', 'Support', 'Hard Support'],
  Fortnite: ['Solo', 'Team', 'Creative'],
  'Apex Legends': ['Assault', 'Tracker', 'Support', 'Recon'],
  'PUBG Mobile': ['Assaulter', 'Sniper', 'Support', 'IGL', 'Scout'],
  'Free Fire': ['Rusher', 'Sniper', 'Support', 'Leader'],
  'MLBB': ['Tank', 'Fighter', 'Assassin', 'Mage', 'Marksman', 'Support'],
  'Call of Duty Mobile': ['Slayer', 'Objective', 'Support', 'Anchor', 'Flex'],
  'PUBG PC': ['Assaulter', 'Sniper', 'Support', 'IGL', 'Scout'],
}
const RANKS = {
  Valorant: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'],
  'League of Legends': ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger'],
  'CS:GO': ['Silver 1', 'Silver 2', 'SEM', 'Gold Nova', 'GN2', 'GN3', 'MG', 'DMG', 'LE', 'LEM', 'SMFC', 'Global'],
  'Dota 2': ['Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine', 'Immortal'],
  Fortnite: ['Open', 'Contender', 'Champion'],
  'Apex Legends': ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Apex Predator'],
  'PUBG Mobile': ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Crown', 'Ace', 'Conqueror'],
  'Free Fire': ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Heroic', 'Grandmaster'],
  'MLBB': ['Warrior', 'Elite', 'Master', 'Grandmaster', 'Epic', 'Legend', 'Mythic', 'Mythical Glory'],
  'Call of Duty Mobile': ['Rookie', 'Veteran', 'Elite', 'Pro', 'Master', 'Grandmaster', 'Legendary'],
  'PUBG PC': ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Conqueror'],
}

const REGIONS = [
  { label: 'Asia', type: 'continent', children: [
    { label: 'South Asia', type: 'subcontinent', children: [
      { label: 'Bangladesh', type: 'country' },
      { label: 'India', type: 'country' },
      { label: 'Pakistan', type: 'country' },
      { label: 'Sri Lanka', type: 'country' },
      { label: 'Nepal', type: 'country' },
    ]},
    { label: 'Southeast Asia', type: 'subcontinent', children: [
      { label: 'Indonesia', type: 'country' },
      { label: 'Philippines', type: 'country' },
      { label: 'Thailand', type: 'country' },
      { label: 'Vietnam', type: 'country' },
      { label: 'Malaysia', type: 'country' },
      { label: 'Singapore', type: 'country' },
    ]},
    { label: 'East Asia', type: 'subcontinent', children: [
      { label: 'Japan', type: 'country' },
      { label: 'South Korea', type: 'country' },
      { label: 'China', type: 'country' },
    ]},
    { label: 'Middle East', type: 'subcontinent', children: [
      { label: 'UAE', type: 'country' },
      { label: 'Saudi Arabia', type: 'country' },
      { label: 'Turkey', type: 'country' },
    ]},
  ]},
  { label: 'Europe', type: 'continent', children: [
    { label: 'Western Europe', type: 'subcontinent', children: [
      { label: 'United Kingdom', type: 'country' },
      { label: 'Germany', type: 'country' },
      { label: 'France', type: 'country' },
    ]},
    { label: 'Eastern Europe', type: 'subcontinent', children: [
      { label: 'Poland', type: 'country' },
      { label: 'Russia', type: 'country' },
    ]},
    { label: 'Northern Europe', type: 'subcontinent', children: [
      { label: 'Sweden', type: 'country' },
      { label: 'Denmark', type: 'country' },
      { label: 'Finland', type: 'country' },
    ]},
  ]},
  { label: 'North America', type: 'continent', children: [
    { label: 'United States', type: 'country' },
    { label: 'Canada', type: 'country' },
    { label: 'Mexico', type: 'country' },
  ]},
  { label: 'South America', type: 'continent', children: [
    { label: 'Brazil', type: 'country' },
    { label: 'Argentina', type: 'country' },
  ]},
  { label: 'Africa', type: 'continent', children: [
    { label: 'South Africa', type: 'country' },
    { label: 'Nigeria', type: 'country' },
    { label: 'Egypt', type: 'country' },
  ]},
  { label: 'Oceania', type: 'continent', children: [
    { label: 'Australia', type: 'country' },
    { label: 'New Zealand', type: 'country' },
  ]},
]

function flattenRegions(nodes, depth = 0) {
  const result = []
  for (const node of nodes) {
    result.push({ label: node.label, type: node.type, depth })
    if (node.children) {
      result.push(...flattenRegions(node.children, depth + 1))
    }
  }
  return result
}

const FLAT_REGIONS = flattenRegions(REGIONS)

const TOTAL_STEPS = 5

export default function SignupModal({ isOpen, onClose, userType = 'player', onSwitchToLogin }) {
  const { signupSendOTP, signupVerifyOTP, loginWithGoogle, updateProfile, error } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [localError, setLocalError] = useState('')
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '', phone: '', otp: '', fullName: '', username: '', bio: '', game: '', role: '', region: '', rank: '', discord: '',
  })
  const [profileImage, setProfileImage] = useState(null)
  const [profileImagePreview, setProfileImagePreview] = useState(null)
  const [bannerImage, setBannerImage] = useState(null)
  const [bannerImagePreview, setBannerImagePreview] = useState(null)
  const profileInputRef = useRef(null)
  const bannerInputRef = useRef(null)

  const handleImageChange = (e, type) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setLocalError('Image must be less than 5MB')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      if (type === 'profile') {
        setProfileImage(file)
        setProfileImagePreview(reader.result)
      } else {
        setBannerImage(file)
        setBannerImagePreview(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setLocalError('')
    if (name === 'game') {
      setFormData((prev) => ({ ...prev, [name]: value, role: '', rank: '' }))
    }
  }

  const handleClose = () => {
    setStep(1)
    setFormData({ email: '', phone: '', otp: '', fullName: '', username: '', bio: '', game: '', role: '', region: '', rank: '', discord: '' })
    setProfileImage(null); setProfileImagePreview(null)
    setBannerImage(null); setBannerImagePreview(null)
    setLocalError(''); setMessage('')
    onClose()
  }

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setLocalError(''); setMessage('')
    if (!formData.email.trim()) { setLocalError('Email is required'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setLocalError('Invalid email format'); return }
    setLoading(true)
    try {
      const response = await signupSendOTP(formData.email, formData.phone || undefined)
      setMessage(response.message || 'OTP sent to your email!')
      setStep(2)
    } catch (err) { setLocalError(err.message || 'Failed to send OTP') }
    finally { setLoading(false) }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setLocalError(''); setMessage('')
    if (!formData.otp.trim() || formData.otp.length < 4) { setLocalError('Please enter a valid OTP'); return }
    setLoading(true)
    try {
      await signupVerifyOTP(formData.email, formData.otp)
      setMessage('Email verified! Now set up your profile.')
      setStep(3)
    } catch (err) { setLocalError(err.message || 'Invalid OTP') }
    finally { setLoading(false) }
  }

  const handleSavePersonalInfo = async (e) => {
    e.preventDefault()
    setLocalError('')
    if (!formData.fullName.trim()) { setLocalError('Full name is required'); return }
    setLoading(true)
    try {
      await updateProfile({ fullName: formData.fullName, phone: formData.phone || undefined })
      setMessage('Personal info saved!')
      const gamingProfile = {
        username: formData.username, bio: formData.bio, game: formData.game, role: formData.role,
        region: formData.region, rank: formData.rank, discord: formData.discord,
        profileImagePreview, bannerImagePreview,
      }
      sessionStorage.setItem('sns_gaming_profile', JSON.stringify(gamingProfile))
      setStep(4)
    } catch { setStep(4) }
    finally { setLoading(false) }
  }

  const handleSaveGaming = async (e) => {
    e.preventDefault()
    setLocalError('')
    const gamingProfile = {
      username: formData.username || formData.fullName, bio: formData.bio, game: formData.game,
      role: formData.role, region: formData.region, rank: formData.rank, discord: formData.discord,
      profileImagePreview, bannerImagePreview,
    }
    sessionStorage.setItem('sns_gaming_profile', JSON.stringify(gamingProfile))
    setMessage('Gaming profile saved!')
    setStep(5)
  }

  const handleFinishSignup = async (e) => {
    e.preventDefault()
    const gamingProfile = {
      username: formData.username || formData.fullName, bio: formData.bio, game: formData.game,
      role: formData.role, region: formData.region, rank: formData.rank, discord: formData.discord,
      profileImagePreview, bannerImagePreview,
    }
    sessionStorage.setItem('sns_gaming_profile', JSON.stringify(gamingProfile))
    if (formData.fullName.trim()) {
      try { await updateProfile({ fullName: formData.fullName, phone: formData.phone || undefined }) } catch {}
    }
    setMessage('Welcome to SliceNShare!')
    setTimeout(() => handleClose(), 1200)
  }

  const handleGoogleSignup = async () => {
    setLocalError(''); setMessage(''); setGoogleLoading(true)
    try {
      const response = await loginWithGoogle()
      if (response.isNewUser) { setMessage('Google account connected! Complete your profile.'); setStep(3) }
      else { setMessage('Signed in with Google!'); setTimeout(() => handleClose(), 1000) }
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') setLocalError('Sign-in popup was closed')
      else if (err.code === 'auth/popup-blocked') setLocalError('Sign-in popup was blocked. Please allow popups.')
      else setLocalError(err.message || 'Google sign-up failed')
    } finally { setGoogleLoading(false) }
  }

  const stepLabels = ['Account', 'Verify', 'Personal', 'Gaming', 'Images']

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  const inputClass = "w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition text-sm"
  const selectClass = "w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition text-sm appearance-none cursor-pointer"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-md z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} />
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4 max-h-[92vh] overflow-y-auto"
            initial={{ scale: 0.92, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 40 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 280, damping: 28 }}
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(168,85,247,0.3) transparent' }}
          >
            <div className="relative bg-gradient-to-b from-[#141419] via-[#111118] to-[#0a0a12] rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-40 bg-purple-500/10 blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="relative flex items-center justify-between p-6 sm:p-8 border-b border-white/[0.06]">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {step === 1 && 'Create Account'}
                    {step === 2 && 'Verify Email'}
                    {step === 3 && 'Personal Info'}
                    {step === 4 && 'Gaming Profile'}
                    {step === 5 && 'Profile Images'}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {step === 1 && (userType === 'player' ? 'Set up your player account' : 'Register your organization')}
                    {step === 2 && `Enter the code sent to ${formData.email}`}
                    {step === 3 && 'Tell us about yourself'}
                    {step === 4 && 'Set up your competitive profile'}
                    {step === 5 && 'Add your profile picture and banner'}
                  </p>
                </motion.div>
                <motion.button onClick={handleClose} className="text-gray-500 hover:text-white transition p-2 hover:bg-white/5 rounded-lg flex-shrink-0" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <X size={22} />
                </motion.button>
              </div>

              {/* Step Progress */}
              <div className="px-6 sm:px-8 pt-5 pb-2">
                <div className="flex items-center justify-between mb-2">
                  {stepLabels.map((label, i) => {
                    const stepNum = i + 1
                    const isActive = step === stepNum
                    const isComplete = step > stepNum
                    return (
                      <div key={label} className="flex flex-col items-center flex-1">
                        <div className="flex items-center w-full">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${isComplete ? 'bg-purple-500 text-white' : isActive ? 'bg-purple-500/20 text-purple-400 ring-2 ring-purple-500/50' : 'bg-white/5 text-gray-600'}`}>
                            {isComplete ? <Check size={14} /> : stepNum}
                          </div>
                          {i < stepLabels.length - 1 && (
                            <div className={`flex-1 h-[2px] mx-1.5 transition-all duration-500 ${step > stepNum ? 'bg-purple-500' : 'bg-white/[0.06]'}`} />
                          )}
                        </div>
                        <span className={`text-[10px] mt-1.5 font-medium transition-colors ${isActive ? 'text-purple-400' : isComplete ? 'text-gray-400' : 'text-gray-600'}`}>{label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 pt-4">
                <AnimatePresence mode="wait">
                  {message && (
                    <motion.div initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -8, height: 0 }} className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-300 text-sm">{message}</motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  {(localError || error) && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">{localError || error}</motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.form
                    key={step}
                    onSubmit={step === 1 ? handleSendOTP : step === 2 ? handleVerifyOTP : step === 3 ? handleSavePersonalInfo : step === 4 ? handleSaveGaming : handleFinishSignup}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                  >
                    <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">

                      {/* STEP 1: Account */}
                      {step === 1 && (
                        <>
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email <span className="text-red-400">*</span></label>
                            <div className="relative">
                              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" className={inputClass} autoFocus />
                            </div>
                          </motion.div>
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone <span className="text-gray-600 text-xs">(Optional)</span></label>
                            <div className="relative">
                              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+8801XXXXXXXXX" className={inputClass} />
                            </div>
                          </motion.div>
                          <motion.div variants={itemVariants} className="relative py-3">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.06]" /></div>
                            <div className="relative flex justify-center text-xs"><span className="px-3 bg-[#111118] text-gray-600">Or sign up with</span></div>
                          </motion.div>
                          <motion.button variants={itemVariants} type="button" onClick={handleGoogleSignup} disabled={googleLoading}
                            className="w-full flex items-center justify-center gap-3 py-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-xl transition duration-300 disabled:opacity-50 text-sm"
                            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                            {googleLoading ? <Loader size={18} className="animate-spin text-gray-600" /> : (
                              <>
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                Sign up with Google
                              </>
                            )}
                          </motion.button>
                        </>
                      )}

                      {/* STEP 2: OTP */}
                      {step === 2 && (
                        <>
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-3">Enter Verification Code</label>
                            <div className="relative">
                              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                              <input type="text" name="otp" value={formData.otp} onChange={(e) => { setFormData(prev => ({ ...prev, otp: e.target.value.replace(/\D/g, '').slice(0, 6) })); setLocalError('') }}
                                placeholder="000000" maxLength="6" className="w-full pl-10 pr-4 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 text-center text-2xl tracking-[0.3em] font-mono" autoFocus />
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <button type="button" onClick={() => { setStep(1); setFormData(prev => ({ ...prev, otp: '' })); setLocalError(''); setMessage('') }} className="text-xs text-purple-400 hover:text-purple-300 transition">Change email</button>
                              <button type="button" onClick={async () => { setLoading(true); try { await signupSendOTP(formData.email, formData.phone || undefined); setMessage('New OTP sent!') } catch (err) { setLocalError(err.message || 'Failed to resend') } finally { setLoading(false) } }} disabled={loading} className="text-xs text-purple-400 hover:text-purple-300 transition disabled:opacity-50">Resend OTP</button>
                            </div>
                          </motion.div>
                        </>
                      )}

                      {/* STEP 3: Personal Info */}
                      {step === 3 && (
                        <>
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name <span className="text-red-400">*</span></label>
                            <div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" /><input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" className={inputClass} autoFocus /></div>
                          </motion.div>
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Gamer Tag / Username</label>
                            <div className="relative"><AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" /><input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Your in-game name" className={inputClass} /></div>
                          </motion.div>
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Discord</label>
                            <div className="relative"><MessageCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" /><input type="text" name="discord" value={formData.discord} onChange={handleChange} placeholder="username#0000" className={inputClass} /></div>
                          </motion.div>
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                            <div className="relative"><FileText className="absolute left-3.5 top-3 text-gray-600 w-4 h-4" /><textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell the community about yourself..." rows={3} className={`${inputClass} resize-none`} /></div>
                          </motion.div>
                        </>
                      )}

                      {/* STEP 4: Gaming Profile */}
                      {step === 4 && (
                        <>
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Primary Game</label>
                            <div className="relative">
                              <Gamepad2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                              <select name="game" value={formData.game} onChange={handleChange} className={selectClass}>
                                <option value="" className="bg-[#1a1a24] text-gray-400">Select your game</option>
                                {GAMES.map(g => <option key={g} value={g} className="bg-[#1a1a24] text-white">{g}</option>)}
                              </select>
                              <ChevronRight className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4 rotate-90 pointer-events-none" />
                            </div>
                          </motion.div>
                          {formData.game && ROLES[formData.game] && (
                            <motion.div variants={itemVariants}>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Role / Position</label>
                              <div className="flex flex-wrap gap-2">
                                {ROLES[formData.game].map(r => (
                                  <button key={r} type="button" onClick={() => setFormData(prev => ({ ...prev, role: r }))}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${formData.role === r ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-lg shadow-purple-500/10' : 'bg-white/[0.03] text-gray-400 border border-white/[0.06] hover:bg-white/[0.06] hover:text-gray-300'}`}>{r}</button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                          {formData.game && RANKS[formData.game] && (
                            <motion.div variants={itemVariants}>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Current Rank</label>
                              <div className="relative">
                                <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                                <select name="rank" value={formData.rank} onChange={handleChange} className={selectClass}>
                                  <option value="" className="bg-[#1a1a24] text-gray-400">Select rank</option>
                                  {RANKS[formData.game].map(rank => <option key={rank} value={rank} className="bg-[#1a1a24] text-white">{rank}</option>)}
                                </select>
                                <ChevronRight className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4 rotate-90 pointer-events-none" />
                              </div>
                            </motion.div>
                          )}
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Region</label>
                            <div className="relative">
                              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                              <select name="region" value={formData.region} onChange={handleChange} className={selectClass}>
                                <option value="" className="bg-[#1a1a24] text-gray-400">Select region</option>
                                {FLAT_REGIONS.map((reg, idx) => {
                                  const prefix = reg.type === 'continent' ? '' : reg.type === 'subcontinent' ? '\u00A0\u00A0' : '\u00A0\u00A0\u00A0\u00A0'
                                  const isHeader = reg.type === 'continent' || reg.type === 'subcontinent'
                                  return (
                                    <option
                                      key={`${reg.label}-${idx}`}
                                      value={reg.label}
                                      className="bg-[#1a1a24] text-white"
                                      disabled={reg.type === 'continent'}
                                      style={{ fontWeight: isHeader ? 'bold' : 'normal', color: reg.type === 'continent' ? '#a78bfa' : reg.type === 'subcontinent' ? '#c084fc' : '#e2e8f0' }}
                                    >
                                      {prefix}{reg.label}
                                    </option>
                                  )
                                })}
                              </select>
                              <ChevronRight className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4 rotate-90 pointer-events-none" />
                            </div>
                          </motion.div>
                        </>
                      )}

                      {/* STEP 5: Profile Images */}
                      {step === 5 && (
                        <>
                          {/* Banner Image */}
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-3">Banner Image</label>
                            <div
                              onClick={() => bannerInputRef.current?.click()}
                              className="relative w-full h-36 rounded-xl border-2 border-dashed border-white/[0.12] hover:border-purple-500/40 bg-white/[0.02] cursor-pointer transition-all overflow-hidden group"
                            >
                              {bannerImagePreview ? (
                                <>
                                  <img src={bannerImagePreview} alt="Banner preview" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <Camera size={24} className="text-white" />
                                  </div>
                                </>
                              ) : (
                                <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500">
                                  <ImageIcon size={28} />
                                  <span className="text-xs">Click to upload banner (recommended 1200x400)</span>
                                </div>
                              )}
                              <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'banner')} />
                            </div>
                          </motion.div>

                          {/* Profile Picture */}
                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-3">Profile Picture</label>
                            <div className="flex items-center gap-5">
                              <div
                                onClick={() => profileInputRef.current?.click()}
                                className="relative w-24 h-24 rounded-2xl border-2 border-dashed border-white/[0.12] hover:border-purple-500/40 bg-white/[0.02] cursor-pointer transition-all overflow-hidden group flex-shrink-0"
                              >
                                {profileImagePreview ? (
                                  <>
                                    <img src={profileImagePreview} alt="Profile preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                      <Camera size={20} className="text-white" />
                                    </div>
                                  </>
                                ) : (
                                  <div className="flex flex-col items-center justify-center h-full gap-1 text-gray-500">
                                    <Camera size={22} />
                                    <span className="text-[10px]">Upload</span>
                                  </div>
                                )}
                                <input ref={profileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'profile')} />
                              </div>
                              <div>
                                <p className="text-sm text-gray-300 font-medium">Upload your avatar</p>
                                <p className="text-xs text-gray-500 mt-1">Square image, max 5MB. JPG, PNG or WebP.</p>
                              </div>
                            </div>
                          </motion.div>

                          <motion.div variants={itemVariants} className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                            <p className="text-xs text-gray-400 leading-relaxed">
                              Images are stored locally for now. Once the profile image API is available, they will be synced automatically.
                            </p>
                          </motion.div>
                        </>
                      )}
                    </motion.div>

                    {/* Buttons */}
                    <motion.div className="flex gap-3 mt-8">
                      {step > 1 && step !== 2 && (
                        <motion.button type="button" onClick={() => setStep(prev => prev - 1)} className="flex items-center justify-center gap-1.5 px-5 py-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 font-medium rounded-xl transition text-sm" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                          <ChevronLeft size={16} />Back
                        </motion.button>
                      )}
                      {step === 2 && (
                        <motion.button type="button" onClick={() => { setStep(1); setFormData(prev => ({ ...prev, otp: '' })); setLocalError(''); setMessage('') }} className="flex items-center justify-center gap-1.5 px-5 py-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 font-medium rounded-xl transition text-sm" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                          <ChevronLeft size={16} />Back
                        </motion.button>
                      )}
                      <motion.button type="submit" disabled={loading}
                        className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        {loading ? (
                          <><Loader size={16} className="animate-spin" />{step === 1 ? 'Sending...' : step === 2 ? 'Verifying...' : 'Saving...'}</>
                        ) : step === 1 ? (
                          <>Send OTP <ChevronRight size={16} /></>
                        ) : step === 2 ? (
                          <>Verify & Continue <ChevronRight size={16} /></>
                        ) : step === 3 ? (
                          <>Continue <ChevronRight size={16} /></>
                        ) : step === 4 ? (
                          <>Continue <ChevronRight size={16} /></>
                        ) : (
                          <>Complete Setup <Check size={16} /></>
                        )}
                      </motion.button>
                    </motion.div>

                    {(step === 4 || step === 5) && (
                      <motion.button type="button" onClick={() => {
                        const gamingProfile = { username: formData.username || formData.fullName, bio: formData.bio, game: formData.game, role: formData.role, region: formData.region, rank: formData.rank, discord: formData.discord, profileImagePreview, bannerImagePreview }
                        sessionStorage.setItem('sns_gaming_profile', JSON.stringify(gamingProfile))
                        handleClose()
                      }} className="w-full text-center text-sm text-gray-500 hover:text-gray-400 transition mt-3 py-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        Skip for now
                      </motion.button>
                    )}

                    {step === 1 && (
                      <motion.div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
                        <span className="text-gray-500 text-sm">Already have an account? </span>
                        <button type="button" onClick={() => { handleClose(); if (onSwitchToLogin) onSwitchToLogin() }} className="text-purple-400 hover:text-purple-300 text-sm font-semibold transition">Sign in</button>
                      </motion.div>
                    )}
                  </motion.form>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
