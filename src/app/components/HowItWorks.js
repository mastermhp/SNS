"use client"
import { motion } from "framer-motion"
import { useState } from "react"

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

  return (
    <section id="how-it-works" className="py-20 sm:py-32 lg:py-40 bg-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="how-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl">HOW IT WORKS</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="how-card w-full max-w-sm mx-auto"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative mb-6 sm:mb-8 h-48 sm:h-56 md:h-64 flex items-center justify-center">
                {/* Card Background */}
                <motion.div
                  className="rounded-2xl flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* First Card - Original Devices Design */}
                  {step.type === "devices" && (
                    <div className="relative">
                      <motion.div
                        className="relative w-48 sm:w-56 md:w-60 h-32 sm:h-36 md:h-40 flex items-center justify-center"
                        animate={{
                          scale: hoveredIndex === index ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src="/How_It_Works_SNS/1.webp"
                          alt="Devices illustration"
                          className="w-full h-full object-contain"
                          style={{
                            filter:
                              hoveredIndex === index
                                ? "grayscale(0%) brightness(1.2) saturate(1.3) drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))"
                                : "grayscale(100%) brightness(0.7) saturate(0.5)",
                            transition: "filter 0.3s ease",
                          }}
                        />
                      </motion.div>
                    </div>
                  )}

                  {/* Second Card - Circular Progress Design */}
                  {step.type === "circle" && (
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        className="relative w-48 sm:w-56 md:w-60 h-32 sm:h-36 md:h-40 flex items-center justify-center"
                        animate={{
                          scale: hoveredIndex === index ? 1.05 : 1,
                          rotate: hoveredIndex === index ? 360 : 0,
                        }}
                        transition={{
                          scale: { duration: 0.3 },
                          rotate: {
                            duration: 4,
                            repeat: hoveredIndex === index ? Number.POSITIVE_INFINITY : 0,
                            ease: "linear",
                          },
                        }}
                      >
                        <img
                          src="/How_It_Works_SNS/2.webp"
                          alt="Circular progress illustration"
                          className="w-full h-full object-contain"
                          style={{
                            filter:
                              hoveredIndex === index
                                ? "grayscale(0%) brightness(1.2) saturate(1.3) drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))"
                                : "grayscale(100%) brightness(0.7) saturate(0.5)",
                            transition: "filter 0.3s ease",
                          }}
                        />
                      </motion.div>
                    </div>
                  )}

                  {/* Third Card - Advanced Devices with Badge */}
                  {step.type === "devices-advanced" && (
                    <div className="relative">
                      <motion.div
                        className="relative w-48 sm:w-56 md:w-60 h-32 sm:h-36 md:h-40 flex items-center justify-center"
                        animate={{
                          scale: hoveredIndex === index ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src="/How_It_Works_SNS/3.webp"
                          alt="Advanced devices illustration"
                          className="w-full h-full object-contain"
                          style={{
                            filter:
                              hoveredIndex === index
                                ? "grayscale(0%) brightness(1.2) saturate(1.3) drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))"
                                : "grayscale(100%) brightness(0.7) saturate(0.5)",
                            transition: "filter 0.3s ease",
                          }}
                        />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </div>

              <motion.h3
                className="how-h3 text-lg sm:text-xl md:text-2xl px-2 sm:px-4"
                animate={{
                  background: hoveredIndex === index ? "linear-gradient(45deg, #A855F7, #EC4899)" : "transparent",
                  WebkitBackgroundClip: hoveredIndex === index ? "text" : "unset",
                  WebkitTextFillColor: hoveredIndex === index ? "transparent" : "#FFFFFF",
                }}
                transition={{ duration: 0.3 }}
              >
                {step.title}
              </motion.h3>
              <motion.p
                className="how-desc text-sm sm:text-base"
                animate={{
                  color: hoveredIndex === index ? "#C084FC" : "#9CA3AF",
                }}
                transition={{ duration: 0.3 }}
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
