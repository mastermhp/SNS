"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import EventInterestModal from "./EventInterestModal"

const events = [
  {
    title: "Slice N Share Tournament",
    description: "Get ready to battle it out! Big prizes, bigger glory.",
    date: "20 Jul 2025",
    time: "2 PM - 6 PM",
    location: "University of Dhaka",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "Campus Ambassador Program",
    description: "Host games, gain perks and opportunities.",
    date: "20 Jul 2025",
    time: "2 PM - 6 PM",
    location: "North South University Auditorium",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "Meet-Up & Concert Vibes",
    description: "Gamers, fans & music—an epic night awaits! Network, chill & enjoy live beats.",
    date: "20 Jul 2025",
    time: "2 PM - 6 PM",
    location: "South East University",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
]

export default function UpcomingEvents() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const handleEventInterest = (event) => {
    setSelectedEvent(event)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedEvent(null)
  }

  return (
    <section id="events" className="py-40 bg-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wider"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            UPCOMING EVENTS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-[#1a1a1a] rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              {/* Event Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>

              {/* Event Content */}
              <div className="p-6 space-y-4">
                {/* Event Title with Gradient */}
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    backgroundImage:
                      "linear-gradient(300deg, var(--token-dc9856fd-0400-432f-8bac-dca82295da25, rgb(255, 0, 64)) 0%, rgb(255, 145, 173) 19.91370160204264%, rgb(182, 214, 241) 36.19087837837838%, rgb(254, 221, 194) 52.43997912726201%, rgb(255, 195, 161) 65.35754504504504%, rgb(252, 161, 43) 82.6090811186774%, var(--token-8a3f945e-7097-47e8-ae48-c03cf8e5cf8b, rgb(129, 23, 241)) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {event.title}
                </h3>

                {/* Event Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{event.description}</p>

                {/* Date and Time */}
                <div className="flex items-center space-x-2 text-sm text-gray-300 mb-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{event.date}</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{event.time}</span>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 text-sm text-gray-300 mb-6">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{event.location}</span>
                </div>

                {/* Interested Button */}
                <motion.button
                  onClick={() => handleEventInterest(event)}
                  className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-300 font-medium py-3 px-6 rounded-full transition-all flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Interested</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Interest Modal */}
      <EventInterestModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        eventTitle={selectedEvent?.title}
        eventImage={selectedEvent?.image}
      />
    </section>
  )
}
