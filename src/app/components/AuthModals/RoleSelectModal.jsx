'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Users, Building2 } from 'lucide-react'

export default function RoleSelectModal({ isOpen, onClose, onSelectRole }) {
  const roles = [
    {
      id: 'player',
      title: 'Player',
      description: 'Compete, showcase your skills, and find opportunities',
      icon: Users,
      color: 'from-purple-600 to-purple-400',
      borderColor: 'border-purple-500',
    },
    {
      id: 'company',
      title: 'Organization',
      description: 'Recruit talents, host tournaments, and manage teams',
      icon: Building2,
      color: 'from-pink-600 to-pink-400',
      borderColor: 'border-pink-500',
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="relative bg-gradient-to-b from-[#171717] to-[#0a0a14] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <motion.div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                    Join as
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">Choose your account type</p>
                </motion.div>
                <motion.button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition p-2 hover:bg-white/10 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {roles.map((role) => {
                    const Icon = role.icon
                    return (
                      <motion.button
                        key={role.id}
                        variants={itemVariants}
                        onClick={() => onSelectRole(role.id)}
                        className={`w-full p-6 relative overflow-hidden rounded-xl border-2 transition-all duration-300 group`}
                        whileHover={{ scale: 1.02, translateY: -5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent group-hover:from-white/10 transition-all duration-300" />

                        {/* Animated Border */}
                        <div className={`absolute inset-0 border-2 ${role.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                        {/* Content */}
                        <div className="relative flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${role.color} group-hover:scale-110 transition-transform duration-300`}>
                            <Icon size={28} className="text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className="text-lg font-bold text-white">{role.title}</h3>
                            <p className="text-gray-400 text-sm mt-1">{role.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    )
                  })}
                </motion.div>

                {/* Footer */}
                <motion.p variants={itemVariants} className="text-center text-gray-500 text-xs mt-6">
                  You can change your account type later in settings
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
