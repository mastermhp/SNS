"use client";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const players = [
  {
    name: "Torpedo",
    avatar: "/Streamers/Torpedo.jpg?height=120&width=120",
    gameImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    borderColor: "border-white",
    game: "Resident Evil 4",
    achievement: "Most Recent Achievement",
    title: "Divisional Champion",
  },
  {
    name: "Death Trio",
    avatar: "/Streamers/DeathTrio.jpg?height=120&width=120",
    gameImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    borderColor: "border-purple-500",
    game: "Resident Evil 4",
    achievement: "Most Recent Achievement",
    title: "Divisional Champion",
  },
  {
    name: "Gameoverr",
    avatar: "/Streamers/Gameoverr.jpg?height=120&width=120",
    gameImage:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    borderColor: "border-red-500",
    game: "Resident Evil 4",
    achievement: "Most Recent Achievement",
    title: "Divisional Champion",
  },
  {
    name: "Insane Ruly",
    avatar: "/Streamers/InsaneRuly.jpg?height=120&width=120",
    gameImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2125&q=80",
    borderColor: "border-yellow-500",
    game: "Resident Evil 4",
    achievement: "Most Recent Achievement",
    title: "Divisional Champion",
  },
  {
    name: "Moonstone",
    avatar: "/Streamers/Moonstone.jpg?height=120&width=120",
    gameImage:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    borderColor: "border-orange-500",
    game: "Resident Evil 4",
    achievement: "Most Recent Achievement",
    title: "Divisional Champion",
  },
  {
    name: "Mr. IKU",
    avatar: "/Streamers/MrIKU.jpg?height=120&width=120",
    gameImage:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    borderColor: "border-orange-500",
    game: "Resident Evil 4",
    achievement: "Most Recent Achievement",
    title: "Divisional Champion",
  },
  {
    name: "Savage",
    avatar: "/Streamers/Savage.jpg?height=120&width=120",
    gameImage:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    borderColor: "border-orange-500",
    game: "Resident Evil 4",
    achievement: "Most Recent Achievement",
    title: "Divisional Champion",
  },
  {
    name: "Sonic",
    avatar: "/Streamers/sonic.jpg?height=120&width=120",
    gameImage:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    borderColor: "border-orange-500",
    game: "Resident Evil 4",
    achievement: "Most Recent Achievement",
    title: "Divisional Champion",
  },
  {
    name: "URLoveBlank",
    avatar: "/Streamers/URLoveBlank.jpg?height=120&width=120",
    gameImage:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    borderColor: "border-orange-500",
    game: "Resident Evil 4",
    achievement: "Most Recent Achievement",
    title: "Divisional Champion",
  },
  {
    name: "Xenternite",
    avatar: "/Streamers/Xenternite.jpg?height=120&width=120",
    gameImage:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    borderColor: "border-orange-500",
    game: "Resident Evil 4",
    achievement: "Most Recent Achievement",
    title: "Divisional Champion",
  },
];

export default function RisingStarsCarousel() {
  const [streamers, setStreamers] = useState(players); // Start with static data
  const [loading, setLoading] = useState(false); // Don't show loading initially
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentX, setCurrentX] = useState(0);
  const [apiError, setApiError] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const fetchStreamers = async () => {
      try {
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(
          "http://localhost:3001/api/v1/auth/streamers",
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.streamers && data.streamers.length > 0) {
            setStreamers(data.streamers);
            setApiError(false);
            console.log("✅ Successfully loaded streamers from API");
          } else {
            console.log(
              "⚠️ API returned empty streamers array, using static data"
            );
            setStreamers(players);
          }
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        setApiError(true);
        if (error.name === "AbortError") {
          console.log("⚠️ API request timed out, using static data");
        } else {
          console.log("⚠️ API unavailable, using static data:", error.message);
        }
        // Keep using static data - no need to set it again since it's the initial state
      } finally {
        setLoading(false);
      }
    };

    // Only try to fetch if we're in the browser (not during SSR)
    if (typeof window !== "undefined") {
      fetchStreamers();
    }
  }, []);

  // Create infinite loop by tripling the array
  const infiniteCards = [...streamers, ...streamers, ...streamers];
  const cardWidth = 300; // Width of each card including gap
  const totalWidth = streamers.length * cardWidth;

  // Continuous scroll animation
  useEffect(() => {
    if (!isHovered && !isPaused && streamers.length > 0) {
      const startContinuousScroll = async () => {
        await controls.start({
          x: [currentX, currentX - totalWidth],
          transition: {
            duration: streamers.length * 8,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          },
        });
      };
      startContinuousScroll();
    } else {
      controls.stop();
    }
  }, [isHovered, isPaused, controls, totalWidth, streamers.length, currentX]);

  const handlePrevious = () => {
    setIsPaused(true);
    const targetX = currentX + cardWidth;
    setCurrentX(targetX);

    controls.start({
      x: targetX,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });

    setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  const handleNext = () => {
    setIsPaused(true);
    const targetX = currentX - cardWidth;
    setCurrentX(targetX);

    controls.start({
      x: targetX,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });

    setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  return (
    <section
      className="relative -mt-[400px] z-30 py-32"
      style={{ top: "-10%" }}
    >
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="rising-title">OUR RISING STARS</h2>
            {/* Optional: Show API status indicator */}
            {apiError && (
              <p className="text-gray-500 text-xs mt-2">
                Showing featured streamers (API offline)
              </p>
            )}
            {loading && (
              <p className="text-gray-500 text-xs mt-2">
                Loading latest streamers...
              </p>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all border border-gray-600"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all border border-gray-600"
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
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="flex gap-6 px-16"
                animate={controls}
                style={{ width: `${infiniteCards.length * cardWidth}px` }}
              >
                {infiniteCards.map((player, index) => (
                  <motion.div
                    key={`${player.displayName || player.name}-${index}`}
                    className="flex-shrink-0 w-72 h-[500px] relative group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Card Container */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
                      {/* Top Section - Background Game Image (50% height) */}
                      <div className="relative h-2/5 overflow-hidden">
                        <img
                          src={
                            player.gameImage ||
                            player.avatar?.url ||
                            "/placeholder.svg?height=200&width=300"
                          }
                          alt={`${
                            player.displayName || player.name
                          } background`}
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                        {/* Player Avatar - Centered in the background section */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div
                            className={`w-24 h-24 rounded-full overflow-hidden border-4 ${
                              player.borderColor || "border-white"
                            } bg-white shadow-lg`}
                          >
                            <img
                              src={
                                player.avatar?.url ||
                                player.avatar ||
                                "/placeholder.svg?height=120&width=120"
                              }
                              alt={player.displayName || player.name}
                              className="w-full h-full object-cover"
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
                            {player.displayName || player.name}
                          </h3>
                        </div>

                        {/* Social Icons */}
                        <div className="social-bg">
                          {player.socials?.map((social, socialIndex) => (
                            <motion.a
                              key={socialIndex}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {social.platform === "YouTube" && (
                                <svg
                                  className="w-4 h-4 text-red-600"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                              )}
                              {social.platform === "Twitch" && (
                                <svg
                                  className="w-4 h-4 text-purple-600"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                                </svg>
                              )}
                              {!["YouTube", "Twitch"].includes(
                                social.platform
                              ) && (
                                <svg
                                  className="w-4 h-4 text-blue-600"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                              )}
                            </motion.a>
                          )) || (
                            // Fallback social icons if no socials data
                            <>
                              <motion.a
                                href="#"
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                {/* <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg> */}
                                <svg
                                  className="w-4 h-4 sm:w-5 sm:h-5 hover:text-purple-500 transition-colors duration-500"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                              </motion.a>
                              <motion.a
                                href="#"
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg
                                  className="w-6 h-6 hover:text-purple-500 transition-colors duration-500"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                              </motion.a>
                            </>
                          )}
                        </div>

                        {/* Game Info */}
                        <div className="space-y-2 p-6">
                          <div className="flex items-center space-x-2">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-400 text-xs">Plays</span>
                          </div>
                          <p className="play-game">
                            {player.primaryGameTitles?.join(", ") ||
                              player.game ||
                              "Various Games"}
                          </p>

                          <div className="flex items-center space-x-2 mt-3">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-400 text-xs">
                              {player.achievement || "Plan"}
                            </span>
                          </div>
                          <p className="text-white font-medium text-sm">
                            {player.plan?.toUpperCase() ||
                              player.title ||
                              "Rising Star"}
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
  );
}
