'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Award, Zap, Trophy } from 'lucide-react'

export default function AchievementsSection() {
  const achievements = [
    {
      id: 1,
      name: 'First Victory',
      description: 'Won your first match',
      icon: Trophy,
      unlockedAt: '2024-01-15',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 2,
      name: 'Streak Master',
      description: '10 consecutive wins',
      icon: Zap,
      unlockedAt: '2024-02-01',
      color: 'from-pink-500 to-pink-600',
    },
    {
      id: 3,
      name: 'Elite Player',
      description: 'Reached Immortal 3',
      icon: Star,
      unlockedAt: '2024-02-10',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 4,
      name: 'Tournament Champion',
      description: 'Won a major tournament',
      icon: Award,
      unlockedAt: null,
      color: 'from-gray-600 to-gray-700',
      locked: true,
    },
  ]

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
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      className="relative rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-black p-8 overflow-hidden backdrop-blur-xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {/* Animated background orbs */}
      <motion.div
        className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-pink-500" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star size={24} className="text-purple-400" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white">Achievements</h3>
          <div className="ml-auto text-sm text-gray-400 font-semibold">
            <span className="text-purple-400">3</span>/4
          </div>
        </div>

        {/* Achievements Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon
            return (
              <motion.div
                key={achievement.id}
                variants={itemVariants}
                className="group relative"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.color} rounded-2xl blur opacity-0 ${
                    !achievement.locked ? 'group-hover:opacity-100' : ''
                  } transition duration-300`}
                  animate={!achievement.locked ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div
                  className={`relative p-6 rounded-2xl border backdrop-blur-sm transition duration-300 flex flex-col items-center text-center ${
                    achievement.locked
                      ? 'bg-gray-900/30 border-gray-500/20 opacity-60'
                      : `bg-gradient-to-br from-${achievement.color.split(' ')[1].split('-')[0]}-900/30 to-black border-${achievement.color.split(' ')[1].split('-')[0]}-500/30 group-hover:border-opacity-100`
                  }`}
                >
                  <motion.div
                    className="mb-3"
                    animate={
                      !achievement.locked
                        ? { y: [0, -5, 0], rotate: [0, 5, -5, 0] }
                        : {}
                    }
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <IconComponent
                      size={32}
                      className={
                        achievement.locked ? 'text-gray-500' : 'text-white'
                      }
                    />
                  </motion.div>
                  <h4 className="text-white font-bold text-sm mb-1">
                    {achievement.name}
                  </h4>
                  <p className="text-gray-400 text-xs">
                    {achievement.description}
                  </p>
                  {achievement.unlockedAt && (
                    <p className="text-purple-400 text-xs mt-2 font-semibold">
                      Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-transparent" />
    </motion.div>
  )
}
