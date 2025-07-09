/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-duplicate-props */
"use client"
import { motion } from "framer-motion"
import { useState } from "react"

const floatingIcons = [
  {
    icon: "/Contact/1x/Chat.png",
    x: 58,
    y: 30,
    size: "w-8 h-8 sm:w-10 sm:h-10",
  },
  {
    icon: "/Contact/1x/Arrow.png",
    x: 44,
    y: 53,
    size: "w-8 h-8 sm:w-10 sm:h-10",
    rotate: -45,
  },
  {
    icon: "/Contact/1x/Main.png",
    x: 45,
    y: 40,
    size: "w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56",
  },
  {
    icon: "/Contact/1x/Check.png",
    x: 75,
    y: 65,
    size: "w-8 h-8 sm:w-10 sm:h-10",
  },
  {
    icon: "/Contact/1x/Doc.png",
    x: 56,
    y: 83,
    size: "w-8 h-8 sm:w-10 sm:h-10",
  },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:3001/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.")
      }

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        message: "",
      })

      // Show success message (you can add a success state if needed)
      alert("Message sent successfully! We'll get back to you soon.")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-32 lg:py-40 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h3
            className="font-bold text-base sm:text-lg tracking-wider"
            style={{
              backgroundImage:
                "linear-gradient(300deg, var(--token-dc9856fd-0400-432f-8bac-dca82295da25, rgb(255, 0, 64)) 0%, rgb(255, 145, 173) 19.91370160204264%, rgb(182, 214, 241) 36.19087837837838%, rgb(254, 221, 194) 52.43997912726201%, rgb(255, 195, 161) 65.35754504504504%, rgb(252, 161, 43) 82.6090811186774%, var(--token-8a3f945e-7097-47e8-ae48-c03cf8e5cf8b, rgb(129, 23, 241)) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Contact Us
          </h3>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">STAY IN THE LOOP</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Animated Icons (Hidden on mobile, shown on lg+) */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] hidden lg:block">
            {/* Floating Icons */}
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: item.rotate ? `rotate(${item.rotate}deg)` : "none",
                }}
                initial={{ opacity: 1, scale: 1, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: item.delay,
                  type: "spring",
                  stiffness: 100,
                }}
                animate={{
                  y: [0, -8, 0],
                  rotate: item.rotate ? [item.rotate, item.rotate + 5, item.rotate - 5, item.rotate] : [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
              >
                <img
                  src={item.icon || "/placeholder.svg"}
                  alt={`Contact icon ${index + 1}`}
                  className={`${item.size} object-contain`}
                  style={{
                    filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md mx-auto lg:mx-0 bg-[#0D0D0D] p-6 sm:p-8 lg:p-10 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {error && (
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
              <div>
                <label className="block text-white text-sm font-medium mb-2 ml-4 sm:ml-6">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 sm:py-4 bg-[#171717] rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all backdrop-blur-sm text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2 ml-4 sm:ml-6">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jane@framer.com"
                  className="w-full px-4 py-3 sm:py-4 bg-[#171717] rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all backdrop-blur-sm text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2 ml-4 sm:ml-6">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 sm:py-4 bg-[#171717] rounded-3xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none backdrop-blur-sm text-sm sm:text-base"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-full hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                whileHover={{
                  scale: loading ? 1 : 1.02,
                  boxShadow: loading ? "none" : "0 10px 30px rgba(139, 92, 246, 0.4)",
                }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
