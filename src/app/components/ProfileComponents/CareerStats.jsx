'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Flame, DollarSign, TrendingUp } from 'lucide-react'

export default function CareerStats({ stats }) {
  const [displayStats, setDisplayStats] = useState({
    totalWins: 0,
    tournaments: 0,
    earnings: 0,
    winRate: 0,
  })

  // Animate counter
  useEffect(() => {
    const duration = 1500
    const start = Date.now()

    const timer = setInterval(() => {
      const now = Date.now()
      const progress = Math.min((now - start) / duration, 1)

      setDisplayStats({
        totalWins: Math.floor(stats.totalWins * progress),
        tournaments: Math.floor(stats.tournaments * progress),
        earnings: Math.floor(stats.earnings * progress),
        winRate: Math.floor(stats.winRate * progress),
      })

      if (progress === 1) clearInterval(timer)
    }, 16)

    return () => clearInterval(timer)
  }, [stats])

  const statItems = [
    {
      label: 'Total Wins',
      value: displayStats.totalWins,
      icon: Trophy,
      gradient: 'from-purple-600 to-purple-400',
      borderColor: 'border-purple-500/30',
    },
    {
      label: 'Tournaments',
      value: displayStats.tournaments,
      icon: Flame,
      gradient: 'from-pink-600 to-pink-400',
      borderColor: 'border-pink-500/30',
    },
    {
      label: 'Earnings',
      value: `$${displayStats.earnings.toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-purple-600 to-pink-400',
      borderColor: 'border-purple-500/30',
    },
    {
      label: 'Win Rate',
      value: `${displayStats.winRate}%`,
      icon: TrendingUp,
      gradient: 'from-pink-600 to-purple-400',
      borderColor: 'border-pink-500/30',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, type: 'spring', stiffness: 100 },
    },
  }

  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#171717] to-[#0a0a14] p-8 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
        <Trophy size={24} className="text-yellow-400" />
        Career Stats
      </h2>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statItems.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-xl border ${stat.borderColor} bg-gradient-to-br from-white/5 to-white/0 p-4 sm:p-6 group`}
              whileHover={{ scale: 1.05, translateY: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative">
                <div className={`inline-block p-2 rounded-lg bg-gradient-to-br ${stat.gradient} mb-3`}>
                  <Icon size={20} className="text-white" />
                </div>
                <p className="text-gray-400 text-xs sm:text-sm font-medium mb-2">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
              </div>

              {/* Hover effect line */}
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
              />
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
