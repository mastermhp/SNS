"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X } from "lucide-react"

const districts = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"]

const platforms = ["PC", "Mobile", "Console"]

const gamesList = [
  "PUBG",
  "Valorant",
  "CS:GO",
  "Fortnite",
  "League of Legends",
  "Dota 2",
  "Apex Legends",
  "Call of Duty",
  "Overwatch",
  "Rocket League",
  "FIFA",
  "Free Fire",
]

const socialPlatforms = ["YouTube", "Twitch", "Facebook", "Instagram", "TikTok", "Discord"]

export default function SignupModal({ isOpen, onClose, selectedPlan }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    displayName: "",
    email: "",
    phone: "",
    district: "",
    platform: [],
    primaryGameTitles: [],
    secondaryGameTitles: [],
    isSponsored: false,
    monthlyIncomeRange: "",
    socials: [{ platform: "", url: "" }],
    bio: "",
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleArrayChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value) ? prev[name].filter((item) => item !== value) : [...prev[name], value],
    }))
  }

  const handleSocialChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.map((social, i) => (i === index ? { ...social, [field]: value } : social)),
    }))
  }

  const addSocialField = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, { platform: "", url: "" }],
    }))
  }

  const removeSocialField = (index) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const payload = {
        ...formData,
        plan: selectedPlan?.toLowerCase() || "basic",
        socials: formData.socials.filter((social) => social.platform && social.url),
        avatar: {
          url: "https://example.com/avatar.jpg",
          publicId: "avatar_public_id",
        },
      }

      const response = await fetch("http://localhost:3001/api/v1/auth/streamers/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to sign up. Please try again.")
      }

      setSuccess(true)
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setFormData({
          fullName: "",
          displayName: "",
          email: "",
          phone: "",
          district: "",
          platform: [],
          primaryGameTitles: [],
          secondaryGameTitles: [],
          isSponsored: false,
          monthlyIncomeRange: "",
          socials: [{ platform: "", url: "" }],
          bio: "",
        })
      }, 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#0D0D0D] rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Join Slice N Share - {selectedPlan} Plan</h2>
                <p className="text-gray-400">Fill out the form to get started</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {success ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Welcome to Slice N Share!</h3>
                <p className="text-gray-400">Your registration was successful. We will be in touch soon!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#171717] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Display Name *</label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#171717] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#171717] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+8801XXXXXXXXX"
                      className="w-full px-4 py-3 bg-[#171717] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                {/* District and Platform */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">District *</label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#171717] rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select District</option>
                      {districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Monthly Income Range</label>
                    <select
                      name="monthlyIncomeRange"
                      value={formData.monthlyIncomeRange}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#171717] rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    >
                      <option value="">Select Range</option>
                      <option value="0-3K">0-3K BDT</option>
                      <option value="3-6K">3-6K BDT</option>
                      <option value="6-10K">6-10K BDT</option>
                      <option value="10K+">10K+ BDT</option>
                    </select>
                  </div>
                </div>

                {/* Gaming Platforms */}
                <div>
                  <label className="block text-white text-sm font-medium mb-3">Gaming Platforms *</label>
                  <div className="flex flex-wrap gap-3">
                    {platforms.map((platform) => (
                      <label key={platform} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.platform.includes(platform)}
                          onChange={() => handleArrayChange("platform", platform)}
                          className="w-4 h-4 text-purple-600 bg-[#171717] border-gray-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-300">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Primary Games */}
                <div>
                  <label className="block text-white text-sm font-medium mb-3">Primary Game Titles *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {gamesList.map((game) => (
                      <label key={game} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.primaryGameTitles.includes(game)}
                          onChange={() => handleArrayChange("primaryGameTitles", game)}
                          className="w-4 h-4 text-purple-600 bg-[#171717] border-gray-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-300 text-sm">{game}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Secondary Games */}
                <div>
                  <label className="block text-white text-sm font-medium mb-3">Secondary Game Titles</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {gamesList.map((game) => (
                      <label key={game} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.secondaryGameTitles.includes(game)}
                          onChange={() => handleArrayChange("secondaryGameTitles", game)}
                          className="w-4 h-4 text-purple-600 bg-[#171717] border-gray-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-300 text-sm">{game}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <label className="block text-white text-sm font-medium mb-3">Social Media Profiles</label>
                  {formData.socials.map((social, index) => (
                    <div key={index} className="flex gap-3 mb-3">
                      <select
                        value={social.platform}
                        onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                        className="px-4 py-3 bg-[#171717] rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="">Select Platform</option>
                        {socialPlatforms.map((platform) => (
                          <option key={platform} value={platform}>
                            {platform}
                          </option>
                        ))}
                      </select>
                      <input
                        type="url"
                        value={social.url}
                        onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                        placeholder="Profile URL"
                        className="flex-1 px-4 py-3 bg-[#171717] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />
                      {formData.socials.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSocialField(index)}
                          className="px-3 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSocialField}
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    + Add Another Social Profile
                  </button>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 bg-[#171717] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                  />
                </div>

                {/* Sponsored */}
                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isSponsored"
                      checked={formData.isSponsored}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-purple-600 bg-[#171717] border-gray-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-300">I am currently sponsored</span>
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing Up...</span>
                    </div>
                  ) : (
                    "Join Slice N Share"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
