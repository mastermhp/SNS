"use client"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

const steps = [
  {
    title: "You've Got Skill, But No Support",
    description: "Your talent is real — but access is missing.",
    type: "devices",
  },
  {
    title: "Slice N Share Has Your Back",
    description: "We connect you to support, sponsors & growth",
    type: "circle",
  },
  {
    title: "Rise to the Global Stage",
    description: "From local player to global eSports icon.",
    type: "devices-advanced",
  },
]

export default function HowItWorks() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [visibleCards, setVisibleCards] = useState(new Set())
  const [isClient, setIsClient] = useState(false)
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  // Initialize client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Detect mobile screen size
  useEffect(() => {
    if (!isClient) return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [isClient])

  // Intersection Observer for smooth entrance and mobile card visibility
  useEffect(() => {
    if (!isClient) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    )

    // Observer for individual cards on mobile with staggered delays
    const cardObserver = new IntersectionObserver(
      (entries) => {
        if (isMobile) {
          entries.forEach((entry) => {
            const cardIndex = Number.parseInt(entry.target.dataset.cardIndex)
            if (entry.isIntersecting) {
              // Add a delay before making the card colorful
              setTimeout(() => {
                setVisibleCards((prev) => new Set([...prev, cardIndex]))
              }, cardIndex * 200) // Staggered delay: 0ms, 200ms, 400ms
            }
          })
        }
      },
      { threshold: 0.6, rootMargin: "0px" },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // Observe individual cards for mobile
    if (isMobile && cardRefs.current.length > 0) {
      cardRefs.current.forEach((ref) => {
        if (ref) cardObserver.observe(ref)
      })
    }

    return () => {
      observer.disconnect()
      cardObserver.disconnect()
    }
  }, [isClient, isMobile])

  const isCardActive = (index) => {
    if (isMobile) {
      return visibleCards.has(index)
    }
    return hoveredIndex === index
  }

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <section className="py-40 bg-[#0D0D0D]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="how-title">HOW IT WORKS</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="how-card">
                <div className="relative mb-8 h-64 flex items-center justify-center">
                  <div className="rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="relative">
                      <div className="relative w-60 h-40 flex items-center justify-center">
                        <img
                          src={`/How_It_Works_SNS/${index + 1}.webp`}
                          alt={`${step.type} illustration`}
                          className="w-full h-full object-contain"
                          style={{
                            filter: "grayscale(100%) brightness(0.7) saturate(0.5)",
                            transform: "translateZ(0)",
                            backfaceVisibility: "hidden",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="h5" style={{ color: "var(--sns-grey)" }}>
                  {step.title}
                </h3>
                <p className="how-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="how-it-works" className="how-it-works-section">
      <div className="how-it-works-container">
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "tween",
          }}
          className="text-center mb-16"
        > */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="how-it-works-header"
        >
          <h2 className="h4-alt flex items-center justify-center">HOW IT WORKS</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              data-card-index={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "tween",
              }}
              className="how-card"
              onMouseEnter={() => !isMobile && setHoveredIndex(index)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                perspective: "1000px",
              }}
            >
              <div className="relative mb-8 h-64 flex items-center justify-center">
                {/* Card Background */}
                <motion.div
                  className="rounded-2xl flex items-center justify-center relative overflow-hidden"
                  animate={{
                    scale: isCardActive(index) ? 1.02 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    type: "tween",
                  }}
                >
                  {/* First Card - Original Devices Design */}
                  {step.type === "devices" && (
                    <div className="how-card-image-container">
                      <motion.div
                        className="how-card-image-wrapper flex items-center justify-center"
                        animate={{
                          scale: isCardActive(index) ? 1.05 : 1,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                          type: "tween",
                        }}
                      >
                        <img
                          src="/How_It_Works_SNS/1.webp"
                          alt="Devices illustration"
                          className="how-card-image"
                          style={{
                            filter: isCardActive(index)
                              ? "grayscale(0%) brightness(1.2) saturate(1.3) drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))"
                              : "grayscale(100%) brightness(0.7) saturate(0.5)",
                            transition: isMobile
                              ? "filter 1.2s ease-in-out" // Slower transition on mobile
                              : "filter 0.4s ease", // Faster on desktop
                            transform: "translateZ(0)",
                            backfaceVisibility: "hidden",
                          }}
                        />
                      </motion.div>
                    </div>
                  )}

                  {/* Second Card - Circular Progress Design */}
                  {step.type === "circle" && (
                    <div className="how-card-image-container flex items-center justify-center">
                      <motion.div
                        className="how-card-image-wrapper flex items-center justify-center"
                        animate={{
                          scale: isCardActive(index) ? 1.05 : 1,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                          type: "tween",
                        }}
                      >
                        <img
                          src="/How_It_Works_SNS/2.webp"
                          alt="Circular progress illustration"
                          className="how-card-image"
                          style={{
                            filter: isCardActive(index)
                              ? "grayscale(0%) brightness(1.2) saturate(1.3) drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))"
                              : "grayscale(100%) brightness(0.7) saturate(0.5)",
                            transition: isMobile
                              ? "filter 1.2s ease-in-out" // Slower transition on mobile
                              : "filter 0.4s ease", // Faster on desktop
                            transform: "translateZ(0)",
                            backfaceVisibility: "hidden",
                          }}
                        />
                      </motion.div>
                    </div>
                  )}

                  {/* Third Card - Advanced Devices with Badge */}
                  {step.type === "devices-advanced" && (
                    <div className="how-card-image-container">
                      <motion.div
                        className="how-card-image-wrapper flex items-center justify-center"
                        animate={{
                          scale: isCardActive(index) ? 1.05 : 1,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                          type: "tween",
                        }}
                      >
                        <img
                          src="/How_It_Works_SNS/3.webp"
                          alt="Advanced devices illustration"
                          className="how-card-image"
                          style={{
                            filter: isCardActive(index)
                              ? "grayscale(0%) brightness(1.2) saturate(1.3) drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))"
                              : "grayscale(100%) brightness(0.7) saturate(0.5)",
                            transition: isMobile
                              ? "filter 1.2s ease-in-out" // Slower transition on mobile
                              : "filter 0.4s ease", // Faster on desktop
                            transform: "translateZ(0)",
                            backfaceVisibility: "hidden",
                          }}
                        />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </div>

              <motion.h3
                className="h5"
                animate={{
                  color: isCardActive(index) ? "#A855F7" : "var(--sns-grey)",
                }}
                transition={{
                  duration: isMobile ? 0.8 : 0.3, // Slower color transition on mobile
                  ease: "easeOut",
                  type: "tween",
                }}
              >
                {step.title}
              </motion.h3>

              <p className="how-desc">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
