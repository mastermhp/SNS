"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import NewSignupModal from "./NewSignupModal";

const plans = [
  {
    name: "BASIC",
    price: "Free",
    period: "/ Monthly",
    team: " (Single Gamer)",
    // subtitle: "🎮 Slice N Share – Free Tier Benefits",
    description: "Your journey from Noob to Pro starts here",
    features: [
      "Global Gamer Profile on Slice N Share – Get seen. Be known. Build your legacy.",
      "Access to Free Training Resources – Learn smarter with SnS AI tools.",
      "Monthly Gamer Meetups – Connect, grow, and stay inspired.",
      "Discount on 20 Lifestyle Apps",
      "Mental Health Support*",
      "Exclusive Networking Opportunities – Engage with top players, mentors & scouts.",
      "Limited Chance to Be Scouted by Sponsors – We refer rising talents based on potential.",
      "Limited Community Support & Feedback – Level up with like-minded gamers.",
      "Entry in Tournaments with Prize Pools – Compete based on available slots.",
      "Earn from Limited Scrims – Play. Improve. Get rewarded.",
      "Limited Opportunities for Brand Collaboration – Show your value, attract attention.",
      "Noob to Pro Pathway – You grow, we guide.",
    ],
    buttonText: "Get Started",
    popular: false,
    type: "basic",
    topHeight: "h-64 sm:h-64 md:h-68",
  },
  {
    name: "STANDARD",
    price: "1000 BDT",
    period: "/ Monthly",
    team: " (Single Gamer)",
    // subtitle: "🔥 Slice N Share Elite Gamer Benefits 🔥",
    description: "Unleash your Potential. Dominate globally.",
    features: [
      "Monthly Salary Based on Performance – Play hard, get rewarded.",
      "Personalized Gamer Profile on Slice N Share Platform",
      "Bootcamp once in 4 months",
      "Content Creation Support & Guidelines",
      "Mental Health Support from Specialized Doctors",
      "Priority Entry in Monthly Tournaments – Win up to 10x your subscription.",
      "Unlimited Scrims Earning Priority – Compete & earn with top squads.",
      "Priority Access to Sponsorship Deals – Get noticed by global brands.",
      "Regular in-person coaching from Pro Players – Improve with 1:1 mentorship.",
      "Multiple Brand Collaborations – Land national & international deals.",
      "Support for International Tournaments – Flights & hotels, we've got you covered.",
      "Priority Selection in Slice N Share Esports Teams – Be the face of our roster.",
      "Exclusive Slice N Share Branding – Get noticed across platforms.",
      "AI Tools for Gamers – Access cutting-edge tools to level up your grind.",
      "Device Support on Demand – Need a better PC, phone, or gear? We'll back you.",
      "Discounts at 100+ Lifestyle Brands – In Bangladesh and worldwide.",
    ],
    buttonText: "Get Started",
    popular: true,
    type: "standard",
    topHeight: "h-72 sm:h-80 md:h-96",
  },
  {
    name: "ADVANCED",
    price: "4500 BDT",
    period: "/Monthly",
    team: " (Team - 6 People)",
    // subtitle: "🔥 Unlimited Benefits – Based on Potential & Availability",
    description: "With all the Premium features",
    features: [
      "Global Gamer Profile on Slice N Share",
      "Content Creation Support (YouTube, TikTok, Insta, FB, etc.)",
      "Access to Slice N Share HQ for Bootcamps & Practice – Train in a professional environment whenever needed.",
      "Mental Health Support with Doctors (Priority++)",
      "Device Support on Demand (Gaming PC, Mobile, Accessories) – No tech barrier – we'll upgrade your gear.",
      "Entry in Ranked Monthly Tournaments (Up to 10x Subscription Rewards) – Compete in high-stakes brackets monthly.",
      "Unlimited Scrim Earning Opportunities with Ranked Gamers",
      "Unlimited Sponsorship Matchmaking (Local + Global)",
      "1:1 Coaching & Elite Mentorship by Pro Players – Sharpen your game with expert guidance.",
      "Full Support for International Tournaments (Flight + Hotel) – Play worldwide with no financial barrier.",
      "Priority Recruitment to Slice N Share Esports Team – Be part of Bangladesh's next global esports icons.",
      "Unlimited Specialized Slice N Share Branding",
      "Unlimited Global Media Features – Get featured, get noticed – globally.",
      "Access to AI-Powered Training & Performance Tools (SnS) – Train smarter with custom tools built for competitive players.",
      "500+ Discounts on Global & Local Lifestyle Brands",
    ],
    buttonText: "Get Started",
    popular: false,
    type: "advanced",
    topHeight: "h-68 sm:h-72 md:h-76",
  },
];

export default function PricingPlans() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for smooth entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleGetStarted = (planName) => {
    setSelectedPlan(planName);
    setModalOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="plans"
      className="py-20 sm:py-32 lg:py-40 bg-black relative"
    >
      <div className="container mx-auto px-4 py-28">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 z-50 flex items-center justify-center"
          >
            <div className="relative w-full max-w-7xl mx-auto">
              {/* Background blur overlay */}
              <div className="absolute inset-0 bg-black/0 backdrop-blur-sm rounded-3xl"></div>

              {/* Coming Soon Content */}
              <div className="relative z-10 text-center py-56 px-8">
                {/* Animated Gaming Icon */}
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="mb-8"
                >
                  <div className="w-24 h-24 mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 animate-pulse"></div>
                    <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Coming Soon Text */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-3xl sm:text-3xl lg:text-4xl font-bold mb-4"
                  style={{
                    backgroundImage:
                      "linear-gradient(300deg, rgb(255, 0, 64) 0%, rgb(255, 145, 173) 19.91%, rgb(182, 214, 241) 36.19%, rgb(254, 221, 194) 52.44%, rgb(255, 195, 161) 65.36%, rgb(252, 161, 43) 82.61%, rgb(129, 23, 241) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  UNLOCKING SOON <br/> New Plans & Enhanced Benefits
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl sm:text-2xl text-gray-300 mb-6"
                >
                  The next level of gaming is almost here. <br />
                  Stay connected....
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-gray-400 mb-8 max-w-2xl mx-auto"
                >
                  We are introducing a Free Plan alongside all-new pricing
                  options designed to empower our gaming community. Expect
                  enhanced features, exclusive rewards, and more opportunities
                  to grow your journey with us.
                </motion.p>

                {/* Animated Progress Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="max-w-md mx-auto"
                >
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"
                      initial={{ width: "0%" }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">75% Complete</p>
                </motion.div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="opacity-30 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <p className="callout mb-2  gradient-text-primary">
                No gatekeeping. Your skills, our platform.
              </p>
              <h2 className="h4-alt mb-4 flex justify-center text-center-inline">
                WE HAVE GOT YOUR BACK — PICK YOUR PLAN
              </h2>
            </motion.div>

            {/* Mobile: Stack cards vertically, Desktop: Flex layout */}
            <div className="flex flex-col lg:flex-row lg:justify-center lg:items-end gap-6 sm:gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={
                    isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative flex-1 max-w-sm mx-auto lg:mx-0"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Standard Card with Special Gradient Border Around Entire Card */}
                  {plan.type === "standard" ? (
                    <motion.div
                      className="flex flex-col p-0.5 rounded-2xl overflow-hidden"
                      style={{
                        background:
                          hoveredIndex === index
                            ? "linear-gradient(90deg, #8117f1 0%, rgb(255, 0, 64) 43.46%, rgb(27, 20, 100) 75.92%, rgb(129, 23, 241) 100%)"
                            : "linear-gradient(247deg, #8117f1 0%, rgb(255, 0, 64) 43.46%, rgb(27, 20, 100) 75.92%, rgb(129, 23, 241) 100%)",
                        transition: "background 0.3s ease",
                      }}
                      whileHover={{
                        scale: 1.02,
                        transition: {
                          duration: 0.2,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          type: "tween",
                        },
                      }}
                    >
                      <div className="w-full bg-black rounded-2xl overflow-hidden">
                        {/* Top Section with Variable Height */}
                        <div
                          className={`${plan.topHeight} w-full p-4 sm:p-6 flex flex-col relative overflow-hidden`}
                        >
                          {/* Background Image */}
                          <div className="absolute inset-0 overflow-hidden">
                            <img
                              src="/How_It_Works_SNS/2.webp"
                              alt="Gaming background"
                              className="w-full h-full object-cover opacity-30"
                              crossOrigin="anonymous"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-900/40 to-black/80"></div>
                          </div>

                          {/* Content */}
                          <div className="relative z-10 flex flex-col justify-center h-full">
                            {/* Popular Badge */}
                            <div className="text-center mt-32">
                              {/* <span className="text-white text-xs font-medium">Most Popular</span> */}
                            </div>

                            {/* Plan Name */}
                            <div className="text-center mb-4">
                              <h3
                                className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6"
                                style={{
                                  backgroundImage:
                                    "linear-gradient(300deg, var(--token-dc9856fd-0400-432f-8bac-dca82295da25, rgb(255, 0, 64)) 0%, rgb(255, 145, 173) 19.91370160204264%, rgb(182, 214, 241) 36.19087837837838%, rgb(254, 221, 194) 52.43997912726201%, rgb(255, 195, 161) 65.35754504504504%, rgb(252, 161, 43) 82.6090811186774%, var(--token-8a3f945e-7097-47e8-ae48-c03cf8e5cf8b, rgb(129, 23, 241)) 100%)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  backgroundClip: "text",
                                  lineHeight: "1.2",
                                  whiteSpace: "pre",
                                }}
                              >
                                {/* {plan.name} */}
                              </h3>
                              <div className="mb-3 mt-8">
                                {/* <span className="text-2xl sm:text-3xl font-bold text-white">{plan.price}</span> */}
                                {/* {plan.period && (
                                  <span className="text-gray-400 ml-1 text-xs sm:text-sm">{plan.period}</span>
                                )} */}
                              </div>
                              {/* <p className="text-gray-300 text-xs mb-12">{plan.team}</p> */}
                              <h3
                                className="text-lg font-bold mb-2"
                                style={{
                                  backgroundImage:
                                    "linear-gradient(300deg, var(--token-dc9856fd-0400-432f-8bac-dca82295da25, rgb(255, 0, 64)) 0%, rgb(255, 145, 173) 19.91370160204264%, rgb(182, 214, 241) 36.19087837837838%, rgb(254, 221, 194) 52.43997912726201%, rgb(255, 195, 161) 65.35754504504504%, rgb(252, 161, 43) 82.6090811186774%, var(--token-8a3f945e-7097-47e8-ae48-c03cf8e5cf8b, rgb(129, 23, 241)) 100%)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  backgroundClip: "text",
                                }}
                              >
                                {/* {plan.description} */}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Section - Same Height for All Cards */}
                        <div className="h-64 sm:h-72 md:h-80 w-full bg-black p-4 sm:p-6 flex flex-col">
                          {/* Features */}
                          <div className="flex-grow mb-4 overflow-y-auto">
                            <ul className="space-y-1.5 text-xs">
                              {plan.features.map((feature, featureIndex) => (
                                <li
                                  key={featureIndex}
                                  className="flex items-start space-x-2"
                                >
                                  <div className="flex-shrink-0 mt-2">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                  </div>
                                  {/* <span className="text-gray-500 text-[18px] leading-tight">{feature}</span> */}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Button */}
                          <motion.button
                            onClick={() => handleGetStarted(plan.name)}
                            className="w-full py-3 px-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 text-sm"
                            whileHover={{
                              scale: 1.02,
                              transition: {
                                duration: 0.2,
                                ease: [0.25, 0.46, 0.45, 0.94],
                                type: "tween",
                              },
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="flex items-center justify-center space-x-2">
                              <span>{plan.buttonText}</span>
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* Basic and Advanced Cards */
                    <motion.div
                      className="flex flex-col"
                      whileHover={{
                        scale: 1.02,
                        transition: {
                          duration: 0.2,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          type: "tween",
                        },
                      }}
                    >
                      {/* Top Section with Variable Height */}
                      <div
                        className={`${plan.topHeight} w-full bg-gray-900/50 backdrop-blur-sm rounded-t-2xl p-4 sm:p-6 border-t border-l border-r border-gray-800 hover:border-purple-500 transition-all duration-300 flex flex-col relative overflow-hidden`}
                      >
                        {/* Background Image for Advanced */}
                        {plan.type === "advanced" && (
                          <div className="absolute inset-0 rounded-t-2xl overflow-hidden">
                            <img
                              src="/How_It_Works_SNS/3.webp"
                              alt="Advanced background"
                              className="w-full h-full object-cover opacity-20"
                              crossOrigin="anonymous"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-black/80"></div>
                          </div>
                        )}

                        {/* Background Image for Basic */}
                        {plan.type === "basic" && (
                          <div className="absolute inset-0 rounded-t-2xl overflow-hidden">
                            <img
                              src="/How_It_Works_SNS/1.webp"
                              alt="Basic background"
                              className="w-full h-full object-cover opacity-20"
                              crossOrigin="anonymous"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-900/40 to-black/80"></div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="relative z-10 flex flex-col justify-center h-full">
                          {/* Plan Name */}
                          <div className="text-center mb-4">
                            <h3
                              className="font-semibold text-xl sm:text-2xl mt-8 mb-4 sm:mb-6"
                              style={{
                                backgroundImage: `linear-gradient(300deg, 
                                    rgb(255, 0, 64) 0%, 
                                    rgb(255, 145, 173) 19.913701602042644%, 
                                    rgb(182, 214, 241) 36.19087837837838%, 
                                    rgb(254, 221, 194) 52.43997912726201%, 
                                    rgb(255, 195, 161) 65.35754504504504%, 
                                    rgb(252, 161, 43) 82.60908111867774%, 
                                    rgb(129, 23, 241) 100%)`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                lineHeight: "1.2",
                                whiteSpace: "pre",
                              }}
                            >
                              {/* {plan.name} */}
                            </h3>
                            <div className="mb-3">
                              {/* <span className="text-2xl sm:text-3xl font-bold text-white">{plan.price}</span> */}
                              {/* {plan.period && (
                                <span className="text-gray-400 ml-1 text-xs sm:text-sm">{plan.period}</span>
                              )} */}
                            </div>
                            {/* <p className="text-gray-300 text-xs mb-12">{plan.team}</p> */}
                            <h3
                              className="text-xl font-bold"
                              style={{
                                backgroundImage:
                                  "linear-gradient(300deg, var(--token-dc9856fd-0400-432f-8bac-dca82295da25, rgb(255, 0, 64)) 0%, rgb(255, 145, 173) 19.91370160204264%, rgb(182, 214, 241) 36.19087837837838%, rgb(254, 221, 194) 52.43997912726201%, rgb(255, 195, 161) 65.35754504504504%, rgb(252, 161, 43) 82.6090811186774%, var(--token-8a3f945e-7097-47e8-ae48-c03cf8e5cf8b, rgb(129, 23, 241)) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                              }}
                            >
                              {/* {plan.description} */}
                            </h3>
                            {/* {plan.subtitle && (
                              <h4 className="text-xs font-semibold text-orange-400">{plan.subtitle}</h4>
                            )} */}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section - Same Height for All Cards */}
                      <div className="h-64 sm:h-72 md:h-80 w-full backdrop-blur-sm rounded-b-2xl p-4 sm:p-6 border-b border-l border-r border-gray-800 hover:border-purple-500 transition-all duration-300 flex flex-col">
                        {/* Features */}
                        <div className="flex-grow mb-4 overflow-y-auto">
                          <ul className="space-y-1.5 text-xs">
                            {plan.features.map((feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-start space-x-2"
                              >
                                <div className="flex-shrink-0 items-center justify-center mt-2">
                                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                </div>
                                {/* <span className="text-gray-500 text-[18px] leading-tight">{feature}</span> */}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Button */}
                        <motion.button
                          onClick={() => handleGetStarted(plan.name)}
                          className="w-full py-3 px-4 rounded-full font-semibold text-white bg-gray-800 hover:bg-gray-700 transition-all text-sm"
                          whileHover={{
                            scale: 1.02,
                            transition: {
                              duration: 0.2,
                              ease: [0.25, 0.46, 0.45, 0.94],
                              type: "tween",
                            },
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex items-center justify-center space-x-2">
                            <span>{plan.buttonText}</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <NewSignupModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        showPayment={selectedPlan !== "BASIC"}
        price={selectedPlan === "STANDARD" ? 1000 : selectedPlan === "ADVANCED" ? 4500 : 0}
        eventType={`${selectedPlan} Plan Subscription`}
        flowType="subscription"
      />
    </section>
  );
}
