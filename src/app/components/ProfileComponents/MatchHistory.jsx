'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Target, Calendar, Star } from 'lucide-react'

export default function MatchHistory({ matches = [] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
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

  const getResultColor = (result) => {
    switch (result) {
      case 'WIN':
        return 'from-purple-600 to-purple-400'
      case 'LOSS':
        return 'from-pink-600 to-pink-400'
      default:
        return 'from-purple-600 to-pink-400'
    }
  }

  const getResultBgColor = (result) => {
    switch (result) {
      case 'WIN':
        return 'bg-purple-500/10 border-purple-500/30'
      case 'LOSS':
        return 'bg-pink-500/10 border-pink-500/30'
      default:
        return 'bg-purple-500/10 border-purple-500/30'
    }
  }

  if (!matches || matches.length === 0) {
    return (
      <motion.div
        className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#171717] to-[#0a0a14] p-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Target size={40} className="mx-auto text-gray-500 mb-4 opacity-50" />
        <p className="text-gray-400">No match history yet. Start competing!</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-purple-900/20 to-black p-8 overflow-hidden backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-pink-500" />

      {/* Header */}
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Target size={24} className="text-purple-400" />
        </motion.div>
        Match History
      </h2>

      {/* Matches List */}
      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {matches.slice(0, 6).map((match, index) => (
          <motion.div
            key={match.id}
            variants={itemVariants}
            className={`group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 ${getResultBgColor(match.result)}`}
            whileHover={{ scale: 1.02, x: 5 }}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${getResultColor(match.result)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

            {/* Content */}
            <div className="relative flex items-center gap-4">
              {/* Result Badge */}
              <motion.div
                className={`flex-shrink-0 px-4 py-2 rounded-lg bg-gradient-to-r ${getResultColor(match.result)} text-white font-bold text-sm`}
                whileHover={{ scale: 1.1 }}
              >
                {match.result}
              </motion.div>

              {/* Match Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm sm:text-base truncate">
                  {match.opponent}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Score: <span className="text-white font-semibold">{match.score}</span>
                </p>
              </div>

              {/* MVP Badge */}
              {match.mvp && (
                <motion.div
                  className="flex-shrink-0 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-white flex items-center gap-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star size={14} />
                  <span className="text-xs font-bold">MVP</span>
                </motion.div>
              )}

              {/* Date */}
              <div className="flex-shrink-0 text-right">
                <div className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
                  <Calendar size={16} />
                  {new Date(match.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>

            {/* Hover effect line */}
            <motion.div
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${getResultColor(match.result)} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* View More Button */}
      {matches.length > 6 && (
        <motion.button
          className="w-full mt-6 py-3 border border-purple-500/30 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition duration-300 font-semibold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View all matches ({matches.length})
        </motion.button>
      )}
    </motion.div>
  )
}
