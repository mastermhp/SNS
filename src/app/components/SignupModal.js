"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X } from "lucide-react"

const districts = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barisal",
  "Bhola",
  "Bogra",
  "Brahmanbaria",
  "Chandpur",
  "Chittagong",
  "Chuadanga",
  "Comilla",
  "Cox's Bazar",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jessore",
  "Jhalokati",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachhari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Nawabganj",
  "Netrakona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
  "Jashore",
]

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

const sponsorshipOptions = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
  { value: "ending_soon", label: "Yes but ending soon" },
]

export default function SignupModal({ isOpen, onClose, selectedPlan }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    ingameName: "",
    email: "",
    phone: "",
    district: "",
    platform: "",
    primaryGameTitles: "",
    secondaryGameTitles: [],
    isSponsored: "",
    monthlyIncomeRange: "",
    socials: [{ platform: "", url: "" }],
    bio: "",
  })

  const getPlanFeatures = (planName) => {
    const planFeatures = {
      BASIC: [
        "Global Gamer Profile on Slice N Share",
        "Access to Free Training Resources",
        "Monthly Gamer Meetups",
        "Discount on 20 Lifestyle Apps",
        "Mental Health Support",
        "Exclusive Networking Opportunities",
        "Limited Chance to Be Scouted by Sponsors",
        "Limited Community Support & Feedback",
        "Entry in Tournaments with Prize Pools",
        "Earn from Limited Scrims",
        "Limited Opportunities for Brand Collaboration",
        "Noob to Pro Pathway",
      ],
      STANDARD: [
        "Monthly Salary Based on Performance",
        "Personalized Gamer Profile",
        "Bootcamp once in 4 months",
        "Content Creation Support & Guidelines",
        "Mental Health Support from Specialized Doctors",
        "Priority Entry in Monthly Tournaments",
        "Unlimited Scrims Earning Priority",
        "Priority Access to Sponsorship Deals",
        "Regular in-person coaching from Pro Players",
        "Multiple Brand Collaborations",
        "Support for International Tournaments",
        "Priority Selection in Slice N Share Esports Teams",
        "Exclusive Slice N Share Branding",
        "AI Tools for Gamers",
        "Device Support on Demand",
        "Discounts at 100+ Lifestyle Brands",
      ],
      ADVANCED: [
        "Global Gamer Profile on Slice N Share",
        "Content Creation Support",
        "Access to Slice N Share HQ for Bootcamps",
        "Mental Health Support with Doctors (Priority++)",
        "Device Support on Demand",
        "Entry in Ranked Monthly Tournaments",
        "Unlimited Scrim Earning Opportunities",
        "Unlimited Sponsorship Matchmaking",
        "1:1 Coaching & Elite Mentorship",
        "Full Support for International Tournaments",
        "Priority Recruitment to Slice N Share Esports Team",
        "Unlimited Specialized Slice N Share Branding",
        "Unlimited Global Media Features",
        "Access to AI-Powered Training & Performance Tools",
        "500+ Discounts on Global & Local Lifestyle Brands",
      ],
    }
    return planFeatures[planName?.toUpperCase()] || []
  }

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
        displayName: formData.ingameName, // Map ingameName to displayName for API compatibility
        plan: selectedPlan?.toLowerCase() || "basic",
        socials: formData.socials.filter((social) => social.platform && social.url),
        platform: [formData.platform], // Convert single platform to array for API
        primaryGameTitles: [formData.primaryGameTitles], // Convert single game to array for API
        avatar: {
          url: "https://example.com/avatar.jpg",
          publicId: "avatar_public_id",
        },
      }

      const response = await fetch("https://api.slicenshare.com/api/v1/auth/streamers/signup", {
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
          ingameName: "",
          email: "",
          phone: "",
          district: "",
          platform: "",
          primaryGameTitles: "",
          secondaryGameTitles: [],
          isSponsored: "",
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

            {/* Plan Features Display */}
            {!success && selectedPlan && (
              <div className="mb-8 bg-[#171717] rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">{selectedPlan} Plan Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                  {getPlanFeatures(selectedPlan).map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="flex-shrink-0 mt-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      </div>
                      <span className="text-gray-300 text-sm leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                    <label className="block text-white text-sm font-medium mb-2">In-Game Name (IGN) *</label>
                    <input
                      type="text"
                      name="ingameName"
                      value={formData.ingameName}
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

                {/* District and Monthly Income */}
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

                {/* Gaming Platform - Single Selection */}
                <div>
                  <label className="block text-white text-sm font-medium mb-3">Gaming Platform *</label>
                  <div className="flex flex-wrap gap-4">
                    {platforms.map((platform) => (
                      <label key={platform} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="platform"
                          value={platform}
                          checked={formData.platform === platform}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-purple-600 bg-[#171717] border-gray-600 focus:ring-purple-500"
                          required
                        />
                        <span className="text-gray-300">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Primary Game - Single Selection Required */}
                <div>
                  <label className="block text-white text-sm font-medium mb-3">Primary Game Title *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {gamesList.map((game) => (
                      <label key={game} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="primaryGameTitles"
                          value={game}
                          checked={formData.primaryGameTitles === game}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-purple-600 bg-[#171717] border-gray-600 focus:ring-purple-500"
                          required
                        />
                        <span className="text-gray-300 text-sm">{game}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Secondary Games - Multiple Selection Optional */}
                <div>
                  <label className="block text-white text-sm font-medium mb-3">Secondary Game Titles (Optional)</label>
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

                {/* Sponsorship - Three Options */}
                <div>
                  <label className="block text-white text-sm font-medium mb-3">Do you have any Sponsorship? *</label>
                  <div className="flex flex-wrap gap-4">
                    {sponsorshipOptions.map((option) => (
                      <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="isSponsored"
                          value={option.value}
                          checked={formData.isSponsored === option.value}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-purple-600 bg-[#171717] border-gray-600 focus:ring-purple-500"
                          required
                        />
                        <span className="text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    What kind of supports do you need from us?
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Write down your answers"
                    className="w-full px-4 py-3 bg-[#171717] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                  />
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
                    "Submit & Join Slice N Share"
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
