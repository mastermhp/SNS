'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Users2, Award, MapPin, Mail, Hash } from 'lucide-react'

export default function QuickInfo({ user }) {
  const infoItems = [
    {
      label: 'Game',
      value: user?.game,
      icon: Gamepad2,
      color: 'text-purple-400',
    },
    {
      label: 'Role',
      value: user?.role,
      icon: Users2,
      color: 'text-pink-400',
    },
    {
      label: 'Rank',
      value: user?.rank,
      icon: Award,
      color: 'text-purple-400',
    },
    {
      label: 'Region',
      value: user?.region,
      icon: MapPin,
      color: 'text-pink-400',
    },
    {
      label: 'Email',
      value: user?.email,
      icon: Mail,
      color: 'text-purple-400',
    },
    {
      label: 'Discord',
      value: user?.discord || 'Not provided',
      icon: Hash,
      color: 'text-pink-400',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black p-6 overflow-hidden backdrop-blur-sm relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-transparent" />

      <motion.h3 
        className="text-xl font-bold text-white mb-6 flex items-center gap-2"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        Quick Info
      </motion.h3>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {infoItems.map((item, index) => {
          if (!item.value) return null
          const Icon = item.icon
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition duration-300"
              whileHover={{ x: 5 }}
            >
              <Icon size={20} className={`${item.color} flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs font-medium">{item.label}</p>
                <p className="text-white text-sm font-semibold truncate">{item.value}</p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
