'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle } from 'lucide-react'

export default function Availability({ user }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-900/20 to-black p-6 overflow-hidden backdrop-blur-sm relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      variants={itemVariants}
    >
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent to-pink-500" />

      <motion.h3 
        className="text-xl font-bold text-white mb-4 flex items-center gap-2"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Clock size={20} className="text-pink-400" />
        </motion.div>
        Availability
      </motion.h3>

      <motion.div className="space-y-3">
        <motion.div 
          className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-pink-500/30 hover:border-pink-500/50 transition duration-300"
          whileHover={{ y: -2 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            <CheckCircle size={18} className="text-purple-400 flex-shrink-0 mt-0.5" />
          </motion.div>
          <div className="flex-1">
            <p className="text-gray-300 text-sm font-semibold">Open to opportunities</p>
            <p className="text-gray-400 text-xs mt-1">Typically available evenings & weekends (local time)</p>
          </div>
        </motion.div>

        <div className="space-y-2 text-sm p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Timezone</p>
          <p className="text-white font-bold text-base">UTC-5 (EST)</p>
        </div>

        <motion.button
          className="w-full py-2 mt-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 transition duration-300 font-medium text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Edit Availability
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
