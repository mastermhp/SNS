"use client"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source src="/Hero_video/hero_video.webm" type="video/webm" />
        </video>
      </div>

      {/* Circular Dot Overlay Pattern */}
      <div className="absolute inset-0 z-10 opacity-40">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='4' cy='4' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "5px 5px",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/70 via-black/80 to-black"></div>

      {/* Hero Content */}
      <div className="relative z-30 text-center -mt-32 sm:-mt-64 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-1"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <img src="/Logo/Logo_Dark.png" className="h-8 w-20 sm:h-12 w-30 md:h-16 w-40" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-8 leading-tight"
        >
          <span className="display-alt text-xl sm:text-xl md:text-4xl lg:text-5xl xl:text-6xl">
            EMPOWERING THE NEXT
          </span>
          <br />
          <span className="display-alt text-xl sm:text-xl md:text-4xl lg:text-5xl xl:text-6xl">
            GENERATION OF ESPORTS TALENT
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-gray-200 text-base sm:text-lg md:text-xl mb-12 sm:mb-16 font-medium px-4"
        >
          Join us early — as a user, a believer, or a backer.
        </motion.p>
      </div>
    </section>
  )
}
