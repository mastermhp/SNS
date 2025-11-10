"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import Image from "next/image";

const games = [
  { id: "pubg", name: "PUBG Mobile", image: "/games/pubg.png" },
  { id: "valorant", name: "Valorant", image: "/games/valorant.png" },
  { id: "mlbb", name: "Mobile Legends", image: "/games/mlbb.png" },
  { id: "freefire", name: "Free Fire", image: "/games/freefire.png" },
  { id: "codm", name: "Call of Duty Mobile", image: "/games/codm.png" },
  { id: "lol", name: "League of Legends", image: "/games/lol.png" },
  { id: "dota2", name: "Dota 2", image: "/games/dota2.png" },
  { id: "csgo", name: "CS:GO", image: "/games/csgo.png" },
  { id: "fortnite", name: "Fortnite", image: "/games/fortnite.png" },
  { id: "apex", name: "Apex Legends", image: "/games/apex.png" },
  { id: "overwatch", name: "Overwatch 2", image: "/games/overwatch.png" },
  { id: "ff", name: "Fatal Fury", image: "/games/ff.jpeg" },
  
  { id: "r6", name: "Rainbow Six Siege", image: "/games/r6.jpeg" },
  { id: "fifa", name: "FIFA 23", image: "/games/fifa.png" },
  { id: "efootball", name: "eFootball", image: "/games/efootball.png" },
  { id: "chess", name: "Chess", image: "/games/chess.png" },
  { id: "tekken", name: "Tekken 8", image: "/games/tekken.jpeg" },
  { id: "sf6", name: "Street Fighter 6", image: "/games/sf6.png" },
  { id: "hk", name: "Honor Kings", image: "/games/hk.jpeg" },
  { id: "cf", name: "Cross Fire", image: "/games/cf.jpeg" },
  { id: "tt", name: "Teamfight Tactics", image: "/games/tt.jpeg" },
];

export default function SignupModal({ isOpen, onClose, showPayment = false, eventType = "", price = 0 }) {
  const [selectedGame, setSelectedGame] = useState(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    University: "",
    district: "",
    fbUrl: "",
    youtubeUrl: "",
    trnxId: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState({ show: false, type: "", message: "" })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formatPhoneNumber = (phone) => {
    // Remove all spaces and dashes
    let cleaned = phone.replace(/[\s-]/g, "")

    // If starts with 0, replace with +880
    if (cleaned.startsWith("0")) {
      cleaned = "+880" + cleaned.substring(1)
    }
    // If starts with 880, add +
    else if (cleaned.startsWith("880") && !cleaned.startsWith("+880")) {
      cleaned = "+" + cleaned
    }
    // If doesn't start with +, assume it needs +880
    else if (!cleaned.startsWith("+")) {
      cleaned = "+880" + cleaned
    }

    return cleaned
  }

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message })
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" })
      if (type === "success") {
        onClose()
      }
    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formattedPhone = formatPhoneNumber(formData.phone)

      if (!showPayment && !eventType) {
        // Newsletter signup for header/hero sections
        const payload = {
          name: formData.fullName,
          email: formData.email,
          phone: formattedPhone,
          source: "website",
        }

        // Only add interests if there's a selected game and map to valid values
        if (selectedGame) {
          // Map game names to valid interest values like "gaming", "esports"
          payload.interests = ["gaming", "esports"]
        }

        const res = await fetch("https://api.slicenshare.com/api/v2/public/newsletter/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        const responseData = await res.json()

        if (res.ok) {
          showNotification("success", "Thanks for subscribing! We'll keep you updated.")
          // Reset form
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            University: "",
            district: "",
            fbUrl: "",
            youtubeUrl: "",
            trnxId: "",
          })
          setSelectedGame(null)
        } else {
          const errorMsg = responseData.errors
            ? responseData.errors.map((e) => e.message || e).join(", ")
            : responseData.message || "Something went wrong. Please try again."
          showNotification("error", errorMsg)
        }
      } else {
        // Event signup for tournament carousel
        const payload = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formattedPhone,
          University: formData.University,
          district: formData.district,
          gameName: selectedGame?.name || "",
          eventName: eventType || "General Signup",
        }

        // trnxId is required for event signups
        payload.trnxId = formData.trnxId || `TXN${Date.now()}`

        // Only add optional fields if they have values
        if (formData.fbUrl) {
          payload.fbUrl = formData.fbUrl
        }
        if (formData.youtubeUrl) {
          payload.youtubeUrl = formData.youtubeUrl
        }

        const res = await fetch("https://api.slicenshare.com/api/v2/public/events/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        const responseData = await res.json()

        if (res.ok) {
          showNotification("success", "Registration successful! We'll contact you soon.")
          // Reset form
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            University: "",
            district: "",
            fbUrl: "",
            youtubeUrl: "",
            trnxId: "",
          })
          setSelectedGame(null)
        } else {
          const errorMsg = responseData.errors
            ? responseData.errors.map((e) => e.message || e).join(", ")
            : responseData.message || "Something went wrong. Please try again."
          showNotification("error", errorMsg)
        }
      }
    } catch (error) {
      console.error("[v0] Signup error:", error)
      showNotification("error", "Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const isNewsletterMode = !showPayment && !eventType

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
          style={{
            border: "2px solid transparent",
            backgroundImage: "linear-gradient(#111827, #111827), linear-gradient(135deg, #8117EE, #E91E63, #FF6B35)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-50">
            <X size={28} />
          </button>

          <AnimatePresence>
            {notification.show && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50"
              >
                <div
                  className={`px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 ${
                    notification.type === "success"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600"
                      : "bg-gradient-to-r from-red-500 to-pink-600"
                  }`}
                >
                  {notification.type === "success" ? (
                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-6 h-6 flex-shrink-0" />
                  )}
                  <p className="font-semibold">{notification.message}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-6 md:p-8">
            {/* Step 1: Game Selection */}
            {!selectedGame && (
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Select Your Game
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {games.map((game) => (
                    <motion.div
                      key={game.id}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer rounded-xl overflow-hidden border-2 border-gray-700 hover:border-purple-500 transition-all"
                      onClick={() => setSelectedGame(game)}
                    >
                      <Image
                        src={game.image || "/placeholder.svg"}
                        alt={game.name}
                        width={200}
                        height={120}
                        className="object-cover w-full h-24"
                      />
                      <p className="text-center py-2 text-xs md:text-sm font-medium bg-gray-800">{game.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Signup Form */}
            {selectedGame && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col items-center mb-6">
                  <Image
                    src={selectedGame.image || "/placeholder.svg"}
                    alt={selectedGame.name}
                    width={200}
                    height={120}
                    className="rounded-xl shadow-lg border-2 border-purple-500"
                  />
                  <h3 className="text-2xl font-bold mt-3 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    {selectedGame.name} {isNewsletterMode ? "Newsletter" : "Registration"}
                  </h3>
                  {eventType && (
                    <p className="text-gray-400 text-sm mt-1">
                      {eventType} {price > 0 && `- ৳${price}`}
                    </p>
                  )}
                </div>

                {isNewsletterMode ? (
                  // Newsletter mode - only name, email, phone
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name *"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 p-3 rounded-lg outline-none transition-all"
                      required
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 p-3 rounded-lg outline-none transition-all"
                      required
                    />

                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number (01XXXXXXXXX) *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 p-3 rounded-lg outline-none transition-all"
                      required
                    />
                  </div>
                ) : (
                  // Event mode - all fields
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 p-3 rounded-lg outline-none transition-all"
                        required
                      />

                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 p-3 rounded-lg outline-none transition-all"
                        required
                      />

                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number (01XXXXXXXXX) *"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 p-3 rounded-lg outline-none transition-all"
                        required
                      />

                      <input
                        type="text"
                        name="University"
                        placeholder="University *"
                        value={formData.University}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 p-3 rounded-lg outline-none transition-all"
                        required
                      />

                      <input
                        type="text"
                        name="district"
                        placeholder="District *"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 p-3 rounded-lg outline-none transition-all"
                        required
                      />

                      <input
                        type="url"
                        name="fbUrl"
                        placeholder="Facebook URL (Optional)"
                        value={formData.fbUrl}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 p-3 rounded-lg outline-none transition-all"
                      />

                      <input
                        type="url"
                        name="youtubeUrl"
                        placeholder="YouTube URL (Optional)"
                        value={formData.youtubeUrl}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 p-3 rounded-lg outline-none transition-all"
                      />
                    </div>

                    {showPayment && (
                      <div className="text-center mt-6 p-4 bg-gray-800 rounded-lg border border-purple-500/30">
                        <p className="text-lg font-semibold mb-3 text-purple-400">Scan & Pay ৳{price}</p>
                        <Image
                          src="/qr.jpeg"
                          alt="Payment QR"
                          width={200}
                          height={200}
                          className="mx-auto rounded-lg border-2 border-purple-500"
                        />
                        <p className="text-xs text-gray-400 mt-2">Scan with bKash or Nagad</p>
                      </div>
                    )}

                    {/* Transaction ID - Always required for event signups */}
                    <input
                      type="text"
                      name="trnxId"
                      placeholder={showPayment ? "Enter Transaction ID (Required) *" : "Transaction ID (Required) *"}
                      value={formData.trnxId}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 p-3 rounded-lg outline-none transition-all"
                      required
                    />
                  </>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
                >
                  {isSubmitting ? "Submitting..." : isNewsletterMode ? "Subscribe" : "Submit Registration"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
