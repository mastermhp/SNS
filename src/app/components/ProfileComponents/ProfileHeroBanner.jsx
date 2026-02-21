'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Share2, Heart, MessageCircle } from 'lucide-react'

export default function ProfileHeroBanner({ user }) {
  return (
    <motion.div
      className="relative w-full h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border border-pink-500/30 backdrop-blur-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-black to-pink-600/40" />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{ x: [-500, 500] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-transparent rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-pink-500/30 to-transparent rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8">
        {/* Top section - Title and status */}
        <div>
          <motion.div
            className="flex items-start justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                Player Profile
              </h2>
              <motion.div
                className="flex items-center gap-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                <span className="text-green-400 text-sm font-semibold">
                  Online Now
                </span>
              </motion.div>
            </div>

            {/* Action buttons */}
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart size={20} />
              </motion.button>
              <motion.button
                className="p-3 rounded-lg bg-pink-500/20 border border-pink-500/30 text-pink-400 hover:bg-pink-500/30 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom section - Stats overview */}
        <motion.div
          className="flex items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex gap-6">
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Followers
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                12.4K
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Following
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                842
              </p>
            </div>
          </div>

          <motion.button
            className="px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-500 hover:to-pink-500 transition flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">Message</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-pink-500" />
    </motion.div>
  )
}
