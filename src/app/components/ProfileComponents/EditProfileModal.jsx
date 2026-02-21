'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, AtSign, Gamepad2, Globe, Award, MessageCircle, FileText, Loader, Check, Camera, ImageIcon, Phone } from 'lucide-react'
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
      { label: 'Bangladesh', type: 'country' }, { label: 'India', type: 'country' }, { label: 'Pakistan', type: 'country' }, { label: 'Sri Lanka', type: 'country' }, { label: 'Nepal', type: 'country' },
    ]},
    { label: 'Southeast Asia', type: 'subcontinent', children: [
      { label: 'Indonesia', type: 'country' }, { label: 'Philippines', type: 'country' }, { label: 'Thailand', type: 'country' }, { label: 'Vietnam', type: 'country' }, { label: 'Malaysia', type: 'country' }, { label: 'Singapore', type: 'country' },
    ]},
    { label: 'East Asia', type: 'subcontinent', children: [
      { label: 'Japan', type: 'country' }, { label: 'South Korea', type: 'country' }, { label: 'China', type: 'country' },
    ]},
    { label: 'Middle East', type: 'subcontinent', children: [
      { label: 'UAE', type: 'country' }, { label: 'Saudi Arabia', type: 'country' }, { label: 'Turkey', type: 'country' },
    ]},
  ]},
  { label: 'Europe', type: 'continent', children: [
    { label: 'Western Europe', type: 'subcontinent', children: [{ label: 'United Kingdom', type: 'country' }, { label: 'Germany', type: 'country' }, { label: 'France', type: 'country' }] },
    { label: 'Eastern Europe', type: 'subcontinent', children: [{ label: 'Poland', type: 'country' }, { label: 'Russia', type: 'country' }] },
    { label: 'Northern Europe', type: 'subcontinent', children: [{ label: 'Sweden', type: 'country' }, { label: 'Denmark', type: 'country' }, { label: 'Finland', type: 'country' }] },
  ]},
  { label: 'North America', type: 'continent', children: [{ label: 'United States', type: 'country' }, { label: 'Canada', type: 'country' }, { label: 'Mexico', type: 'country' }] },
  { label: 'South America', type: 'continent', children: [{ label: 'Brazil', type: 'country' }, { label: 'Argentina', type: 'country' }] },
  { label: 'Africa', type: 'continent', children: [{ label: 'South Africa', type: 'country' }, { label: 'Nigeria', type: 'country' }, { label: 'Egypt', type: 'country' }] },
  { label: 'Oceania', type: 'continent', children: [{ label: 'Australia', type: 'country' }, { label: 'New Zealand', type: 'country' }] },
]

function flattenRegions(nodes, depth = 0) {
  const result = []
  for (const node of nodes) {
    result.push({ label: node.label, type: node.type, depth })
    if (node.children) result.push(...flattenRegions(node.children, depth + 1))
  }
  return result
}
const FLAT_REGIONS = flattenRegions(REGIONS)

export default function EditProfileModal({ isOpen, onClose, user, gamingProfile, onProfileUpdate }) {
  const { updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    fullName: '', phone: '', username: '', bio: '', game: '', role: '', region: '', rank: '', discord: '',
  })
  const [profileImagePreview, setProfileImagePreview] = useState(null)
  const [bannerImagePreview, setBannerImagePreview] = useState(null)
  const profileInputRef = useRef(null)
  const bannerInputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: user?.fullName || '', phone: user?.phone || '',
        username: gamingProfile?.username || user?.username || '',
        bio: gamingProfile?.bio || user?.bio || '',
        game: gamingProfile?.game || user?.game || '',
        role: gamingProfile?.role || user?.role || '',
        region: gamingProfile?.region || user?.region || '',
        rank: gamingProfile?.rank || user?.rank || '',
        discord: gamingProfile?.discord || user?.discord || '',
      })
      setProfileImagePreview(gamingProfile?.profileImagePreview || null)
      setBannerImagePreview(gamingProfile?.bannerImagePreview || null)
      setMessage(''); setError('')
    }
  }, [isOpen, user, gamingProfile])

  const handleImageChange = (e, type) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { setError('Image must be less than 5MB'); return }
    const reader = new FileReader()
    reader.onloadend = () => {
      if (type === 'profile') setProfileImagePreview(reader.result)
      else setBannerImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
    if (name === 'game') setFormData(prev => ({ ...prev, [name]: value, role: '', rank: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      if (formData.fullName.trim()) {
        await updateProfile({ fullName: formData.fullName, phone: formData.phone || undefined })
      }
      const updatedGamingProfile = {
        username: formData.username, bio: formData.bio, game: formData.game,
        role: formData.role, region: formData.region, rank: formData.rank, discord: formData.discord,
        profileImagePreview, bannerImagePreview,
      }
      onProfileUpdate(updatedGamingProfile)
      setMessage('Profile updated successfully!')
      setTimeout(() => onClose(), 1000)
    } catch (err) { setError(err.message || 'Failed to update profile') }
    finally { setLoading(false) }
  }

  const inputClass = "w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition text-sm"
  const selectClass = "w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition text-sm appearance-none cursor-pointer"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.92, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 28 }}
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(168,85,247,0.3) transparent' }}
          >
            <div className="relative bg-[#111118] rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                <div>
                  <h2 className="text-xl font-bold text-white">Edit Profile</h2>
                  <p className="text-gray-500 text-xs mt-1">Update your personal and gaming information</p>
                </div>
                <motion.button onClick={onClose} className="text-gray-500 hover:text-white transition p-2 hover:bg-white/5 rounded-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <X size={20} />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <AnimatePresence mode="wait">
                  {message && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-300 text-sm">{message}</motion.div>}
                  {error && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">{error}</motion.div>}
                </AnimatePresence>

                {/* Images Section */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Images</h4>
                  {/* Banner */}
                  <div onClick={() => bannerInputRef.current?.click()} className="relative w-full h-28 rounded-xl border-2 border-dashed border-white/[0.1] hover:border-purple-500/30 bg-white/[0.02] cursor-pointer transition-all overflow-hidden group mb-3">
                    {bannerImagePreview ? (
                      <><img src={bannerImagePreview} alt="Banner" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><Camera size={20} className="text-white" /></div></>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-1.5 text-gray-600"><ImageIcon size={22} /><span className="text-[10px]">Upload banner image</span></div>
                    )}
                    <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'banner')} />
                  </div>
                  {/* Profile pic */}
                  <div className="flex items-center gap-4">
                    <div onClick={() => profileInputRef.current?.click()} className="relative w-20 h-20 rounded-2xl border-2 border-dashed border-white/[0.1] hover:border-purple-500/30 bg-white/[0.02] cursor-pointer transition-all overflow-hidden group flex-shrink-0">
                      {profileImagePreview ? (
                        <><img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><Camera size={16} className="text-white" /></div></>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-0.5 text-gray-600"><Camera size={18} /><span className="text-[9px]">Upload</span></div>
                      )}
                      <input ref={profileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'profile')} />
                    </div>
                    <div><p className="text-xs text-gray-400">Profile picture</p><p className="text-[10px] text-gray-600 mt-0.5">Square, max 5MB</p></div>
                  </div>
                </div>

                {/* Personal Section */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Personal</h4>
                  <div className="space-y-3">
                    <div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" /><input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className={inputClass} /></div>
                    <div className="relative"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" /><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" className={inputClass} /></div>
                    <div className="relative"><AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" /><input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Gamer Tag / Username" className={inputClass} /></div>
                    <div className="relative"><MessageCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" /><input type="text" name="discord" value={formData.discord} onChange={handleChange} placeholder="Discord username" className={inputClass} /></div>
                    <div className="relative"><FileText className="absolute left-3.5 top-3 text-gray-600 w-4 h-4" /><textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" rows={2} className={`${inputClass} resize-none`} /></div>
                  </div>
                </div>

                {/* Gaming Section */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Gaming</h4>
                  <div className="space-y-3">
                    <div className="relative">
                      <Gamepad2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                      <select name="game" value={formData.game} onChange={handleChange} className={selectClass}>
                        <option value="" className="bg-[#1a1a24]">Select game</option>
                        {GAMES.map(g => <option key={g} value={g} className="bg-[#1a1a24]">{g}</option>)}
                      </select>
                    </div>
                    {formData.game && ROLES[formData.game] && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Role</p>
                        <div className="flex flex-wrap gap-1.5">
                          {ROLES[formData.game].map(r => (
                            <button key={r} type="button" onClick={() => setFormData(prev => ({ ...prev, role: r }))}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${formData.role === r ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:text-gray-300'}`}>{r}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    {formData.game && RANKS[formData.game] && (
                      <div className="relative">
                        <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                        <select name="rank" value={formData.rank} onChange={handleChange} className={selectClass}>
                          <option value="" className="bg-[#1a1a24]">Select rank</option>
                          {RANKS[formData.game].map(rank => <option key={rank} value={rank} className="bg-[#1a1a24]">{rank}</option>)}
                        </select>
                      </div>
                    )}
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                      <select name="region" value={formData.region} onChange={handleChange} className={selectClass}>
                        <option value="" className="bg-[#1a1a24]">Select region</option>
                        {FLAT_REGIONS.map((reg, idx) => {
                          const prefix = reg.type === 'continent' ? '' : reg.type === 'subcontinent' ? '\u00A0\u00A0' : '\u00A0\u00A0\u00A0\u00A0'
                          return (
                            <option key={`${reg.label}-${idx}`} value={reg.label} className="bg-[#1a1a24]" disabled={reg.type === 'continent'}
                              style={{ fontWeight: reg.type !== 'country' ? 'bold' : 'normal', color: reg.type === 'continent' ? '#a78bfa' : reg.type === 'subcontinent' ? '#c084fc' : '#e2e8f0' }}>
                              {prefix}{reg.label}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <motion.button type="submit" disabled={loading}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  {loading ? <><Loader size={16} className="animate-spin" /> Saving...</> : <><Check size={16} /> Save Changes</>}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
