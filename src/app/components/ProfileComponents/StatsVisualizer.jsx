'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Zap } from 'lucide-react'

export default function StatsVisualizer({ stats }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      className="relative rounded-3xl border border-pink-500/30 bg-gradient-to-br from-purple-900/40 via-black to-pink-900/30 p-8 overflow-hidden backdrop-blur-xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-purple-500/30 to-transparent rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-pink-500/30 to-transparent rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-pink-500" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <TrendingUp size={24} className="text-purple-400" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white">Performance Analytics</h3>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Win Rate */}
          <motion.div variants={itemVariants} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="relative bg-gradient-to-br from-purple-900/30 to-black p-4 rounded-2xl border border-purple-500/30 text-center">
              <motion.div
                className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                81%
              </motion.div>
              <p className="text-gray-400 text-xs sm:text-sm mt-2 font-semibold">Win Rate</p>
            </div>
          </motion.div>

          {/* Avg K/D */}
          <motion.div variants={itemVariants} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="relative bg-gradient-to-br from-pink-900/30 to-black p-4 rounded-2xl border border-pink-500/30 text-center">
              <motion.div
                className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                2.4
              </motion.div>
              <p className="text-gray-400 text-xs sm:text-sm mt-2 font-semibold">Avg K/D Ratio</p>
            </div>
          </motion.div>

          {/* Headshots */}
          <motion.div variants={itemVariants} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="relative bg-gradient-to-br from-purple-900/30 to-black p-4 rounded-2xl border border-purple-500/30 text-center">
              <motion.div
                className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                48%
              </motion.div>
              <p className="text-gray-400 text-xs sm:text-sm mt-2 font-semibold">Headshot %</p>
            </div>
          </motion.div>

          {/* Accuracy */}
          <motion.div variants={itemVariants} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="relative bg-gradient-to-br from-pink-900/30 to-black p-4 rounded-2xl border border-pink-500/30 text-center">
              <motion.div
                className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                76%
              </motion.div>
              <p className="text-gray-400 text-xs sm:text-sm mt-2 font-semibold">Accuracy</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-transparent" />
    </motion.div>
  )
}
