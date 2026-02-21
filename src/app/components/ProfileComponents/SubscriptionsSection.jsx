'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Swords, Zap, Briefcase, Briefcase2, Gamepad2, Check } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function SubscriptionsSection({ user }) {
  const { updateSubscription } = useAuth()
  const [localSubs, setLocalSubs] = useState(user?.subscriptions || {})

  const subscriptions = [
    {
      id: 'gamingTournament',
      name: 'Gaming Tournament',
      description: 'Complete in organized tournaments with prizes',
      icon: Trophy,
      color: 'from-purple-600 to-purple-400',
      borderColor: 'border-purple-500/30',
      features: ['Tournament access', 'Prize pools', 'Rankings'],
    },
    {
      id: 'weeklyScrims',
      name: 'Weekly Scrims',
      description: 'Join weekly practice matches with teams',
      icon: Swords,
      color: 'from-pink-600 to-pink-400',
      borderColor: 'border-pink-500/30',
      features: ['Weekly matches', 'Team pairings', 'Skill tracking'],
    },
    {
      id: 'dailyScrims',
      name: 'Daily Scrims',
      description: 'Daily scrimmage sessions for consistent practice',
      icon: Zap,
      color: 'from-purple-600 to-pink-400',
      borderColor: 'border-purple-500/30',
      features: ['Daily matches', 'Fast matchmaking', 'Performance stats'],
    },
    {
      id: 'brandDeal',
      name: 'Brand Deal',
      description: 'Get matched with brand partnership opportunities',
      icon: Briefcase,
      color: 'from-pink-600 to-purple-400',
      borderColor: 'border-pink-500/30',
      features: ['Sponsorship access', 'Brand matching', 'Contract support'],
    },
    {
      id: 'jobOffer',
      name: 'Job Offer',
      description: 'Receive job offers from esports organizations',
      icon: Briefcase2,
      color: 'from-purple-600 to-pink-500',
      borderColor: 'border-purple-500/30',
      features: ['Job listings', 'Direct offers', 'Career guidance'],
    },
  ]

  const handleToggle = (subscriptionId) => {
    const newValue = !localSubs[subscriptionId]
    setLocalSubs((prev) => ({
      ...prev,
      [subscriptionId]: newValue,
    }))
    updateSubscription(subscriptionId, newValue)
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const activeCount = Object.values(localSubs).filter(Boolean).length
  const totalCount = Object.keys(localSubs).length

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Header with Counter */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            <Gamepad2 size={32} className="text-purple-400" />
            My Subscriptions
          </h2>
          <p className="text-gray-400 mt-2">Manage your slice n share ecosystem subscriptions</p>
        </div>
        <motion.div
          className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {activeCount}/{totalCount} Active
        </motion.div>
      </div>

      {/* Subscriptions Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {subscriptions.map((sub) => {
          const IconComponent = sub.icon
          const isActive = localSubs[sub.id]

          return (
            <motion.div
              key={sub.id}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -5 }}
            >
              {/* Card */}
              <div
                className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
                  isActive ? `${sub.borderColor} bg-gradient-to-br ${sub.color} bg-opacity-10` : 'border-white/10 bg-gradient-to-br from-[#171717] to-[#0a0a14]'
                }`}
              >
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${sub.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative p-6">
                  {/* Icon and Toggle */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className={`p-3 rounded-lg bg-gradient-to-br ${sub.color} group-hover:scale-110 transition-transform duration-300`}
                      animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                      transition={isActive ? { duration: 2, repeat: Infinity } : {}}
                    >
                      {IconComponent && <IconComponent size={24} className="text-white" />}
                    </motion.div>

                    {/* Toggle Switch */}
                    <motion.button
                      onClick={() => handleToggle(sub.id)}
                      className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                        isActive ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-white/10'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
                        animate={{ x: isActive ? 24 : 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        {isActive && <Check size={16} className="text-purple-600" />}
                      </motion.div>
                    </motion.button>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-lg font-bold text-white mb-2">{sub.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{sub.description}</p>

                  {/* Features */}
                  <motion.ul className="space-y-2">
                    {sub.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${sub.color}`} />
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* Status */}
                  <motion.div
                    className={`mt-6 p-3 rounded-lg text-center text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${sub.color} text-white`
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                    animate={isActive ? { opacity: [1, 0.8, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isActive ? '✓ Active' : 'Inactive'}
                  </motion.div>
                </div>

                {/* Hover border effect */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${sub.borderColor}`}
                />
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Info Section */}
      <motion.div
        className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-bold text-white mb-4">💡 About Subscriptions</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Toggle any subscription to express your interest in various opportunities. These help us match you with the best tournaments, teams, brands, and job opportunities tailored to your gaming profile and goals.
        </p>
      </motion.div>
    </motion.div>
  )
}
