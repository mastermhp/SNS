"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import SignupModal from "./NewSignupModal"

const ANIMATION_DELAYS = {
  logo: 0.5,
  title: 0.7,
  subtitle: 0.9,
}

const ANIMATION_DURATION = 1

export default function HeroSection() {
  const [signupModalOpen, setSignupModalOpen] = useState(false)

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 px-4"
        style={{ backgroundColor: "#0a0a14" }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/Hero/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />

        {/* Gradient overlay from Figma */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, rgba(23, 3, 43, 0.2) 2%, rgba(13, 2, 26, 1) 96%)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl -mt-72">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAYS.logo }}
            className="mb-1"
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <img src="/Logo/SNS_Logo.svg" alt="SNS Logo" className="hero-logo" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAYS.title }}
            className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "Bebas Neue, sans-serif", letterSpacing: "-0.02em" }}
          >
            EMPOWERING THE NEXT
            <br />
            GENERATION OF ESPORTS TALENT
          </motion.h1>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 mt-20 bg-black/30 px-6 py-4">
          <h1 className="text-[40px] text-red-700">Maintanence Going On</h1>
            {/* <button
              onClick={() => setSignupModalOpen(true)}
              className="px-8 py-3 rounded-full text-white transition flex items-center justify-center gap-1 md:gap-2"
              style={{
                backgroundColor: "#8117EE",
              }}
            >
              <img src="/Logo/SNS_Logo.svg" alt="SNS Logo" className="w-18 md:w-28" />{" "}
              <p className="text-[16px] md:text-[24px]">Network</p>
            </button> */}
            {/* <button
            className="px-8 py-3 rounded-full font-bold text-white transition border-2"
            style={{
              borderColor: "#8117EE",
              backgroundColor: "transparent",
              width: "180px",
            }}
          >
            Explore Sns
          </button> */}
          </div>
        </div>
      </section>

      <SignupModal
        isOpen={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        showPlanSelection={true}
        flowType="network"
      />
    </>
  )
}
