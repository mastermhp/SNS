"use client"
import { motion, useAnimation } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Enhanced fallback data with real streamer info from your API
const fallbackPlayers = [
  {
    ingameName: "TorpedoGaming",
    fullName: "Rifat Khondokar",
    avatar: "/Streamers/Torpedo.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/gaming/torpedo.gaming.bd" },
      { platform: "YouTube", url: "https://www.youtube.com/@torpedo.121" },
    ],
    isSponsored: false,
    borderColor: "border-red-500",
  },
  {
    ingameName: "DeathTrio",
    fullName: "Nasif Ahmed",
    avatar: "/Streamers/DeathTrio.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/deathtrio/" },
      { platform: "YouTube", url: "https://www.youtube.com/@DeathTrio99" },
    ],
    isSponsored: false,
    borderColor: "border-purple-500",
  },
  {
    ingameName: "InsaneRuly",
    fullName: "Atik Yasir Risad",
    avatar: "/Streamers/InsaneRuly.jpg",
    primaryGameTitles: ["PUBG PC"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/InsaneRuly" },
      { platform: "YouTube", url: "https://www.youtube.com/@insaneruly2392" },
    ],
    isSponsored: false,
    borderColor: "border-red-500",
  },
  {
    ingameName: "Moonstone",
    fullName: "Sabrina M Sarah",
    avatar: "/Streamers/Moonstone.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/themoonstone98" },
      { platform: "YouTube", url: "https://www.youtube.com/@moonstoneherself" },
    ],
    isSponsored: false,
    borderColor: "border-purple-500",
  },
  {
    ingameName: "IkuSensei",
    fullName: "Mr. IKU",
    avatar: "/Streamers/MrIKU.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/ikusensei" },
      { platform: "YouTube", url: "https://www.youtube.com/@ikusensei2528" },
    ],
    isSponsored: false,
    borderColor: "border-red-500",
  },
  {
    ingameName: "SavageSteam",
    fullName: "Raihanul Islam",
    avatar: "/Streamers/Savage.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [{ platform: "Facebook", url: "https://www.facebook.com/HHxSavage" }],
    isSponsored: false,
    borderColor: "border-purple-500",
  },
  {
    ingameName: "ApySheikh",
    fullName: "Apy Sheikh",
    avatar: "/Streamers/sonic.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/share/16bmDrNYjU/" },
      { platform: "YouTube", url: "https://youtube.com/@sonicfps709?si=aKE-l228cUN3uomq" },
    ],
    isSponsored: false,
    borderColor: "border-red-500",
  },
  {
    ingameName: "Swajan",
    fullName: "Effat Bin Hossain Swajan",
    avatar: "/Streamers/URLoveBlank.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/share/173Aa2eydL/?mibextid=qi2Omg" },
      { platform: "YouTube", url: "https://youtube.com/@urloveblank?si=tNtY5du6Y-mAFk7Z" },
    ],
    isSponsored: false,
    borderColor: "border-purple-500",
  },
  {
    ingameName: "XtropeGaming",
    fullName: "ANAYET HOSSAIN",
    avatar: "/Streamers/Xenternite.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/xenterniteofficial" },
      { platform: "YouTube", url: "https://www.youtube.com/@xtropegaming" },
    ],
    isSponsored: false,
    borderColor: "border-red-500",
  },
  {
    ingameName: "SifhPlays",
    fullName: "Md Abdulla Al Mamun",
    avatar: "/Streamers/Gameoverr.jpg",
    primaryGameTitles: ["Valorant"],
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/share/1CBnQpQ8js/" },
      { platform: "YouTube", url: "https://m.youtube.com/@sifh_plays" },
    ],
    isSponsored: false,
    borderColor: "border-purple-500",
  },
]

// Function to get avatar based on display name
const getAvatarForStreamer = (ingameName) => {
  const avatarMap = {
    TorpedoGaming: "/Streamers/Torpedo.jpg",
    DeathTrio: "/Streamers/DeathTrio.jpg",
    InsaneRuly: "/Streamers/InsaneRuly.jpg",
    Moonstone: "/Streamers/Moonstone.jpg",
    IkuSensei: "/Streamers/MrIKU.jpg",
    SavageSteam: "/Streamers/Savage.jpg",
    ApySheikh: "/Streamers/sonic.jpg",
    Swajan: "/Streamers/URLoveBlank.jpg",
    XtropeGaming: "/Streamers/Xenternite.jpg",
    SifhPlays: "/Streamers/Gameoverr.jpg",
    MHFiroz: "/Streamers/Torpedo.jpg", // Default fallback
  }

  return avatarMap[ingameName] || "/Streamers/Torpedo.jpg"
}

// Function to get background image based on game
const getGameBackground = (games) => {
  if (!games || games.length === 0)
    return "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"

  const game = games[0].toLowerCase()
  if (game.includes("valorant")) {
    return "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  } else if (game.includes("pubg")) {
    return "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
  } else {
    return "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  }
}

// Function to get border color based on plan or random
const getBorderColor = (index) => {
  const colors = [
    // "border-white",
    "border-purple-500",
    "border-red-500",
    // "border-yellow-500",
    // "border-orange-500",
    // "border-green-500",
    // "border-blue-500",
    // "border-cyan-500",
    // "border-pink-500",
    // "border-indigo-500",
    // "border-teal-500",
  ]
  return colors[index % colors.length]
}

export default function RisingStarsCarousel() {
  const [streamers, setStreamers] = useState(fallbackPlayers)
  const [loading, setLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentX, setCurrentX] = useState(0)
  const [apiStatus, setApiStatus] = useState("fallback")
  const controls = useAnimation()
  const autoScrollRef = useRef(null)

  useEffect(() => {
    const fetchStreamers = async () => {
      const shouldFetchAPI =
        process.env.NODE_ENV === "production" ||
        window.location.hostname === "localhost" ||
        window.location.hostname === "slicenshare.com" ||
        window.location.hostname.includes("vercel.app")

      if (!shouldFetchAPI) {
        console.log("🔧 Development mode: Using enhanced fallback data with real streamer info")
        setApiStatus("fallback")
        return
      }

      try {
        setLoading(true)
        setApiStatus("loading")

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)

        const response = await fetch("https://api.slicenshare.com/api/v1/auth/streamers", {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          const apiData = await response.json()

          if (apiData.success && apiData.data && apiData.data.length > 0) {
            const transformedStreamers = apiData.data.map((streamer, index) => ({
              ...streamer,
              avatar: getAvatarForStreamer(streamer.ingameName),
              gameImage: getGameBackground(streamer.primaryGameTitles),
              borderColor: getBorderColor(index),
            }))

            setStreamers(transformedStreamers)
            setApiStatus("success")
            console.log("✅ Successfully loaded", apiData.count, "streamers from API")
          } else {
            throw new Error("Invalid API response structure")
          }
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
      } catch (error) {
        setApiStatus("error")
        if (error.name === "AbortError") {
          console.log("⚠️ API request timed out, using enhanced fallback data")
        } else if (error.message.includes("CORS")) {
          console.log("🔒 CORS restriction detected, using enhanced fallback data")
        } else {
          console.log("⚠️ API error, using enhanced fallback data:", error.message)
        }
        setStreamers(fallbackPlayers)
      } finally {
        setLoading(false)
      }
    }

    if (typeof window !== "undefined") {
      fetchStreamers()
    }
  }, [])

  // Create infinite loop by tripling the array
  const infiniteCards = [...streamers, ...streamers, ...streamers]
  const cardWidth = 300
  const totalWidth = streamers.length * cardWidth

  // Auto-scroll function
  const startAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current)
    }

    autoScrollRef.current = setInterval(() => {
      if (!isHovered && !isPaused && streamers.length > 0 && !loading) {
        setCurrentX((prevX) => {
          const newX = prevX - 2 // Move 2px at a time for smooth scrolling
          // Reset position when we've scrolled through one full set
          if (Math.abs(newX) >= totalWidth) {
            return 0
          }
          return newX
        })
      }
    }, 50) // Update every 50ms for smooth animation
  }

  // Start auto-scroll when component mounts and conditions are met
  useEffect(() => {
    const startAutoScrollInternal = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }

      autoScrollRef.current = setInterval(() => {
        if (!isHovered && !isPaused && streamers.length > 0 && !loading) {
          setCurrentX((prevX) => {
            const newX = prevX - 2
            if (Math.abs(newX) >= totalWidth) {
              return 0
            }
            return newX
          })
        }
      }, 50)
    }

    if (!isHovered && !isPaused && streamers.length > 0 && !loading) {
      startAutoScrollInternal()
    } else {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isHovered, isPaused, streamers.length, loading, totalWidth])

  // Update the animation based on currentX
  useEffect(() => {
    controls.set({ x: currentX })
  }, [currentX, controls])

  // FIXED NAVIGATION FUNCTIONS
  const handlePrevious = () => {
    console.log("Previous button clicked")
    setIsPaused(true)

    // Clear auto-scroll
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current)
    }

    // Move one card width to the right (previous)
    setCurrentX((prevX) => {
      const newX = prevX + cardWidth
      console.log("Moving from", prevX, "to", newX)
      return newX
    })

    // Resume auto-scroll after 3 seconds
    setTimeout(() => {
      console.log("Resuming auto-scroll")
      setIsPaused(false)
    }, 3000)
  }

  const handleNext = () => {
    console.log("Next button clicked")
    setIsPaused(true)

    // Clear auto-scroll
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current)
    }

    // Move one card width to the left (next)
    setCurrentX((prevX) => {
      const newX = prevX - cardWidth
      console.log("Moving from", prevX, "to", newX)
      return newX
    })

    // Resume auto-scroll after 3 seconds
    setTimeout(() => {
      console.log("Resuming auto-scroll")
      setIsPaused(false)
    }, 3000)
  }

  const getStatusMessage = () => {
    switch (apiStatus) {
      case "loading":
        return { text: "Loading live streamer data...", color: "text-blue-500", icon: "🔄" }
      case "success":
        return { text: `Our ${streamers.length} July Stars`, color: "text-green-500", icon: "✅" }
      case "error":
        return { text: "API temporarily unavailable - showing featured streamers", color: "text-yellow-500", icon: "⚠️" }
      case "fallback":
      default:
        return { text: `Our ${streamers.length} July Stars (default)`, color: "text-purple-500", icon: "⭐" }
    }
  }

  const status = getStatusMessage()

  if (loading) {
    return (
      <section className="relative -mt-[300px] md:-mt-[400px] z-30 py-32" style={{ top: "-10%" }}>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-7xl relative">
            <div className="text-center mb-12">
              <h2 className="rising-title">OUR RISING STARS</h2>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <div className="w-4 h-4 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm">Loading our amazing streamers...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative -mt-[450px] md:-mt-[500px] z-30 py-32" style={{ top: "-10%" }}>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="h4-alt flex items-center justify-center text-3xl">THE RISING STARS</h2>
            <p className={`text-white/65 text-lg mt-2 flex items-center justify-center space-x-1`}>
              <span>{status.text}</span>
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all border border-gray-600 hover:border-purple-500 hover:scale-110"
            style={{ cursor: "pointer" }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all border border-gray-600 hover:border-purple-500 hover:scale-110"
            style={{ cursor: "pointer" }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Container with Fade Edges */}
          <div className="relative">
            {/* Left Fade Overlay */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-30 pointer-events-none"></div>

            {/* Right Fade Overlay */}
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-30 pointer-events-none"></div>

            <div
              className="overflow-hidden"
              onMouseEnter={() => {
                console.log("Mouse entered carousel")
                setIsHovered(true)
              }}
              onMouseLeave={() => {
                console.log("Mouse left carousel")
                setIsHovered(false)
              }}
            >
              <motion.div
                className="flex gap-6 px-16"
                animate={controls}
                style={{
                  width: `${infiniteCards.length * cardWidth}px`,
                  transform: `translateX(${currentX}px)`,
                }}
              >
                {infiniteCards.map((player, index) => (
                  <motion.div
                    key={`${player.ingameName}-${index}`}
                    className="flex-shrink-0 w-72 h-[500px] relative group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Card Container */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
                      {/* Top Section - Background Game Image (50% height) */}
                      <div className="relative h-2/5 overflow-hidden">
                        <img
                          src={player.gameImage || getGameBackground(player.primaryGameTitles)}
                          alt={`${player.ingameName} background`}
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                        {/* Player Avatar - Centered in the background section */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div
                            className={`w-24 h-24 rounded-full overflow-hidden border-b-5 ${player.borderColor || "border-white"} bg-white shadow-lg`}
                          >
                            <img
                              src={player.avatar || getAvatarForStreamer(player.ingameName)}
                              alt={player.ingameName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "/Streamers/Torpedo.jpg"
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section - Solid Dark Background (50% height) */}
                      <div className="h-3/5 bg-[#0D0D0D] flex flex-col justify-between">
                        {/* Player Name with Static 7-Color Gradient */}
                        <div className="text-center mb-4">
                          <h3
                            className="text-2xl font-bold"
                            style={{
                              backgroundImage:
                                "linear-gradient(300deg, var(--token-dc9856fd-0400-432f-8bac-dca82295da25, rgb(255, 0, 64)) 0%, rgb(255, 145, 173) 19.91370160204264%, rgb(182, 214, 241) 36.19087837837838%, rgb(254, 221, 194) 52.43997912726201%, rgb(255, 195, 161) 65.35754504504504%, rgb(252, 161, 43) 82.6090811186774%, var(--token-8a3f945e-7097-47e8-ae48-c03cf8e5cf8b, rgb(129, 23, 241)) 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            {player.ingameName}
                          </h3>
                        </div>

                        {/* Social Icons */}
                        <div className="social-bg">
                          {player.socials?.slice(0, 3).map((social, socialIndex) => (
                            <motion.a
                              key={socialIndex}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {social.platform === "YouTube" && (
                                <svg className="w-5 h-5 hover:text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                              )}
                              {social.platform === "Facebook" && (
                                <svg className="w-5 h-5 hover:text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                              )}
                              {social.platform === "Twitch" && (
                                <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                                </svg>
                              )}
                              {!["YouTube", "Facebook", "Twitch"].includes(social.platform) && (
                                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                              )}
                            </motion.a>
                          )) || (
                            <>
                              <motion.a
                                href="#"
                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                              </motion.a>
                              <motion.a
                                href="#"
                                className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                              </motion.a>
                            </>
                          )}
                        </div>

                        {/* Game Info */}
                        <div className="space-y-2 p-6">
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-purple-500 text-xs">Plays</span>
                          </div>
                          <p className="play-game">
                            {player.primaryGameTitles?.filter((game) => game !== "N/A").join(", ") || "Various Games"}
                          </p>

                          <div className="flex items-center justify-center space-x-2 mt-6">
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-400 text-xs">Status</span>
                          </div>
                          <p className="text-white text-center flex items-center justify-center font-medium text-xs">
                            VERIFIED BY{" "}
                            <img src="/Logo/SNS_Logo.svg" alt="Slice N Share Logo" className="ml-2 w-16 h-8" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
