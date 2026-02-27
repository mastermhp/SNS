'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, Calendar } from 'lucide-react'

export default function Availability({ user }) {
  return (
    <motion.div
      className="rounded-2xl border border-white/[0.06] bg-[#0c0c12] overflow-hidden relative h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />

      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock size={16} className="text-pink-400" />
          Availability
        </h3>

        <div className="space-y-3">
          {/* Status */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/10">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle size={14} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-white font-medium">Open to opportunities</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Available evenings & weekends</p>
            </div>
          </div>

          {/* Timezone */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <Calendar size={14} className="text-purple-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">Timezone</p>
              <p className="text-sm text-white font-medium mt-0.5">
                {user?.region === 'Bangladesh' || user?.region === 'South Asia' ? 'UTC+6 (BDT)' : 'UTC+6'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
