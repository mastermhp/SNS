'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Edit3, Mail, Phone, Shield, MessageCircle } from 'lucide-react'

export default function ProfileHeader({ user, onEditProfile }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  }

  const infoItems = [
    { label: 'Email', value: user?.email, icon: Mail },
    { label: 'Phone', value: user?.phone || 'Not provided', icon: Phone },
    { label: 'Discord', value: user?.discord || 'Not linked', icon: MessageCircle },
    { label: 'Auth Method', value: user?.authMethod === 'firebase' ? 'Google' : 'Email / OTP', icon: Shield },
  ]

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c0c12]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <motion.div
        className="relative p-6 sm:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Account Details</h3>
          {onEditProfile && (
            <motion.button
              onClick={onEditProfile}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/15 text-purple-400 text-sm font-medium transition border border-purple-500/20 hover:border-purple-500/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Edit3 size={14} />
              Edit Profile
            </motion.button>
          )}
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {infoItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/15 transition">
                  <Icon size={16} className="text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">{item.label}</p>
                  <p className="text-sm text-white font-medium truncate mt-0.5">{item.value}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* User ID */}
        {user?.id && (
          <motion.div
            variants={itemVariants}
            className="mt-4 px-3.5 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center gap-2"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">ID</span>
            <span className="text-xs text-gray-400 font-mono truncate">{user.id}</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
