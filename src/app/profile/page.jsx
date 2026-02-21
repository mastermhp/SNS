'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProfileHeroBanner from '../components/ProfileComponents/ProfileHeroBanner'
import ProfileHeader from '../components/ProfileComponents/ProfileHeader'
import CareerStats from '../components/ProfileComponents/CareerStats'
import QuickInfo from '../components/ProfileComponents/QuickInfo'
import SubscriptionsSection from '../components/ProfileComponents/SubscriptionsSection'
import MatchHistory from '../components/ProfileComponents/MatchHistory'
import Availability from '../components/ProfileComponents/Availability'
import StatsVisualizer from '../components/ProfileComponents/StatsVisualizer'
import AchievementsSection from '../components/ProfileComponents/AchievementsSection'
import StreamingContent from '../components/ProfileComponents/StreamingContent'

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin" />
          </div>
          <p className="mt-4 text-gray-400">Loading profile...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-20">
        {/* Animated background - Purple and Pink only */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl"
            animate={{ 
              y: [0, 30, 0],
              x: [0, 20, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-40 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl"
            animate={{ 
              y: [0, -30, 0],
              x: [0, -20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-purple-400 transition duration-300"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to directory
          </motion.button>

          {/* Hero Banner Section */}
          <div className="mb-10">
            <ProfileHeroBanner user={user} />
          </div>

          {/* Profile Header */}
          <div className="mb-10">
            <ProfileHeader user={user} />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 mb-10">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              <QuickInfo user={user} />
              <Availability user={user} />
            </div>

            {/* Right Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Career Stats */}
              <CareerStats stats={user.stats} />

              {/* Match History */}
              <MatchHistory matches={user.matchHistory} />
            </div>
          </div>

          {/* Stats Visualizer Section */}
          <div className="mb-10">
            <StatsVisualizer stats={user.stats} />
          </div>

          {/* Streaming & Content Section */}
          <div className="mb-10">
            <StreamingContent />
          </div>

          {/* Achievements Section */}
          <div className="mb-10">
            <AchievementsSection />
          </div>

          {/* Subscriptions Section */}
          <div className="mb-10">
            <SubscriptionsSection user={user} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
