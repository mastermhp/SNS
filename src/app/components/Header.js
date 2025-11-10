"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import SignupModal from "./NewSignupModal"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signupModalOpen, setSignupModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 py-3 md:py-4 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md rounded-b-[8px]" : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="#home" className="flex items-center space-x-2 flex-shrink-0">
            <img src="/Logo/Logo.png" alt="Slice N Share" className="h-7 sm:h-8 md:h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 w-full justify-center">
            <Link href="#home" className="text-white text-[16px] font-medium hover:text-purple-400 transition">
              Home
            </Link>
            <Link href="#tournament" className="text-white text-[16px] font-medium hover:text-purple-400 transition">
              Tournament
            </Link>
            <Link href="#events" className="text-white text-[16px] font-medium hover:text-purple-400 transition">
              Events
            </Link>
            <Link href="#news" className="text-white text-[16px] font-medium hover:text-purple-400 transition">
              News
            </Link>
            <Link href="#contact" className="text-white text-[16px] font-medium hover:text-purple-400 transition">
              Contact Us
            </Link>
          </nav>
{/* 
          <button
            onClick={() => setSignupModalOpen(true)}
            className="hidden sm:block px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full font-bold text-white transition hover:opacity-90 flex-shrink-0"
            style={{
              backgroundColor: "#8117EE",
              fontSize: "12px",
            }}
          >
            Sign Up
          </button> */}

          <button
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed top-[60px] sm:top-[64px] md:top-[72px] left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-b border-purple-500/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col p-4 sm:p-6">
              <Link
                href="#home"
                className="text-white text-base font-medium py-3 border-b border-purple-500/10 hover:text-purple-400 transition"
                onClick={handleLinkClick}
              >
                Home
              </Link>
              <Link
                href="#tournament"
                className="text-white text-base font-medium py-3 border-b border-purple-500/10 hover:text-purple-400 transition"
                onClick={handleLinkClick}
              >
                Tournament
              </Link>
              <Link
                href="#events"
                className="text-white text-base font-medium py-3 border-b border-purple-500/10 hover:text-purple-400 transition"
                onClick={handleLinkClick}
              >
                Events
              </Link>
              <Link
                href="#news"
                className="text-white text-base font-medium py-3 border-b border-purple-500/10 hover:text-purple-400 transition"
                onClick={handleLinkClick}
              >
                News
              </Link>
              <Link
                href="#contact"
                className="text-white text-base font-medium py-3 border-b border-purple-500/10 hover:text-purple-400 transition"
                onClick={handleLinkClick}
              >
                Contact Us
              </Link>

              {/* <button
                onClick={() => {
                  setSignupModalOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="mt-4 w-full px-6 py-3 rounded-full font-bold text-white transition hover:opacity-90"
                style={{
                  backgroundColor: "#8117EE",
                  fontSize: "14px",
                }}
              >
                Sign Up
              </button> */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SignupModal isOpen={signupModalOpen} onClose={() => setSignupModalOpen(false)} />
    </>
  )
}
