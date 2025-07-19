"use client"

import { motion } from "framer-motion"

// Constants
const ANIMATION_DELAYS = {
  logo: 0.5,
  title: 0.7,
  subtitle: 0.9,
}

const ANIMATION_DURATION = 1

// Components
const BackgroundVideo = () => (
  <div className="absolute inset-0 z-0">
    <video 
      autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          style={{
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
          }}
    >
      <source src="/Hero_Video/hero_video.webm" type="video/webm" />
      <source src="/Hero_Video/hero_video.mp4" type="video/mp4" />
    </video>
  </div>
)

const DotPattern = () => (
  <div className="absolute inset-0 z-10 opacity-40 hero-dot-pattern" />
)

const GradientOverlay = () => (
  <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/70 via-black/80 to-black" />
)

const Logo = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAYS.logo }}
    className="mb-1"
  >
    <div className="flex items-center justify-center space-x-2 mb-2">
      <img 
        src="/Logo/SNS_Logo.svg" 
        alt="SNS Logo" 
        className="hero-logo"
      />
    </div>
  </motion.div>
)

const Title = () => (
  <motion.h1
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAYS.title }}
    className="hero-title"
  >
    <span className="display-alt hero-title-line">
      EMPOWERING THE NEXT
    </span>
    <br />
    <span className="display-alt hero-title-line">
      GENERATION OF ESPORTS TALENT
    </span>
  </motion.h1>
)

const Subtitle = () => (
  <motion.p
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAYS.subtitle }}
    className="hero-subtitle"
  >
    Join us early — as a user, a believer, or a backer.
  </motion.p>
)

// Main Component
export default function HeroSection() {
  return (
    <section id="home" className="hero-section mb-[50px] -mt-[30px] md:-mt-0 lg:-mt-0">
      <BackgroundVideo />
      <DotPattern />
      <GradientOverlay />

      {/* Hero Content */}
      <div className="hero-content">
        <Logo />
        <Title />
        <Subtitle />
      </div>
    </section>
  )
}
