'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Play, Twitch, YouTube, Music, Youtube } from 'lucide-react'

export default function StreamingContent() {
  const [selectedContent, setSelectedContent] = React.useState('clips')

  const clips = [
    {
      id: 1,
      title: 'Insane 1v5 Clutch',
      thumbnail: 'gradient-to-br from-purple-600 to-purple-400',
      views: '245K',
      duration: '1:32',
      date: '2 days ago',
    },
    {
      id: 2,
      title: 'Headshot Montage',
      thumbnail: 'gradient-to-br from-pink-600 to-pink-400',
      views: '187K',
      duration: '3:45',
      date: '1 week ago',
    },
    {
      id: 3,
      title: 'Tournament Finals',
      thumbnail: 'gradient-to-br from-purple-600 to-pink-500',
      views: '512K',
      duration: '25:10',
      date: '2 weeks ago',
    },
    {
      id: 4,
      title: 'Pro Tips & Tricks',
      thumbnail: 'gradient-to-br from-pink-600 to-purple-400',
      views: '96K',
      duration: '12:05',
      date: '3 weeks ago',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  }

  return (
    <motion.div
      className="relative rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-black p-8 overflow-hidden backdrop-blur-xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      {/* Animated orbs */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-3xl"
        animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-pink-500" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Play size={24} className="text-purple-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white">Streaming & Content</h3>
          </div>

          {/* Streaming platforms */}
          <motion.div className="flex gap-2">
            <motion.button
              className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition"
              whileHover={{ scale: 1.1 }}
            >
              <Twitch size={20} />
            </motion.button>
            <motion.button
              className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 hover:bg-pink-500/20 transition"
              whileHover={{ scale: 1.1 }}
            >
              <Youtube size={20} />
            </motion.button>
          </motion.div>
        </div>

        {/* Content tabs */}
        <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
          {['clips', 'streams', 'highlights'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setSelectedContent(tab)}
              className={`pb-2 px-4 font-semibold transition text-sm sm:text-base ${
                selectedContent === tab
                  ? 'text-white border-b-2 border-gradient-to-r border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Clips Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {clips.map((clip) => (
            <motion.div
              key={clip.id}
              variants={itemVariants}
              className="group relative cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative rounded-xl overflow-hidden h-40 sm:h-48 mb-3">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${clip.thumbnail}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300 flex items-center justify-center">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play size={24} className="text-black fill-black ml-1" />
                  </motion.div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-white text-xs font-bold">
                  {clip.duration}
                </div>
              </div>

              {/* Info */}
              <div>
                <h4 className="text-white font-bold text-sm mb-1 group-hover:text-purple-400 transition">
                  {clip.title}
                </h4>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{clip.views} views</span>
                  <span>{clip.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View more button */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="px-6 py-2 rounded-full border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 transition font-semibold text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Content
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-transparent" />
    </motion.div>
  )
}
