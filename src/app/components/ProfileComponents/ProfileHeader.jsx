'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, MapPin } from 'lucide-react'

export default function ProfileHeader({ user }) {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-pink-500/30 bg-gradient-to-r from-purple-900/30 via-black to-pink-900/30 backdrop-blur-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-pink-500" />

      {/* Content */}
      <motion.div
        className="relative p-8 sm:p-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
          {/* Avatar */}
          <motion.div
            variants={itemVariants}
            className="relative flex-shrink-0"
          >
            {/* Avatar Container with gradient border */}
            <motion.div
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-1 shadow-2xl"
              animate={{
                boxShadow: ['0 0 20px rgba(168, 85, 247, 0.5)', '0 0 30px rgba(236, 72, 153, 0.5)', '0 0 20px rgba(168, 85, 247, 0.5)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-xl bg-black flex items-center justify-center text-white text-4xl sm:text-5xl font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            </motion.div>
            
            {/* Status indicator */}
            <motion.div
              className="absolute bottom-2 right-2 w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-black"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* User Info */}
          <motion.div
            variants={itemVariants}
            className="flex-1"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {user?.username}
                </h1>
                {user?.realName && (
                  <span className="text-gray-400 text-lg">@{user?.realName}</span>
                )}
              </div>

              {/* Tags/Badges */}
              <div className="flex flex-wrap gap-2 mt-3">
                {user?.games?.map((game) => (
                  <motion.span
                    key={game}
                    className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    {game}
                  </motion.span>
                ))}
              </div>

              {/* Bio */}
              {user?.bio && (
                <p className="text-gray-300 mt-3 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {user.bio}
                </p>
              )}

              {/* Quick Stats Row */}
              <div className="flex gap-6 mt-4 pt-4 border-t border-purple-500/20">
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                  <Award size={18} className="text-purple-400" />
                  <span className="text-sm text-gray-300">
                    <span className="font-bold text-white">1,243</span> Wins
                  </span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                  <MapPin size={18} className="text-pink-400" />
                  <span className="text-sm text-gray-300">
                    <span className="font-bold text-white">{user?.region}</span>
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-transparent" />
    </motion.div>
  )
}
