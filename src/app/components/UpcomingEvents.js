"use client";
import { MapPin, Clock } from "lucide-react";
import EventInterestModal from "./EventInterestModal";
import { useState } from "react";

export default function UpcomingEvents() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const events = [
    {
      title: "NSU Startup Next X SnS",
      location: "NSU Plaza",
      time: "9 AM - 6 PM",
      date: "10-11",
      month: "NOV",
      facebookLink: "https://www.facebook.com/share/p/1CUBDZxJdm/",

      // logo: "SLICE/SHARE",
      // venue: "NSU",
      image: "/Event/coming-to-nsu.png",
    },
    // {
    //   title: "NSU Startup Next X SnS",
    //   location: "NSU Plaza",
    //   time: "9 AM - 6 PM",
    //   date: "28-29",
    //   month: "JAN",
    //   logo: "SLICE/SHARE",
    //   venue: "NSU",
    //   image: "/nsu-university-building.jpg",
    // },
    // {
    //   title: "NSU Startup Next X SnS",
    //   location: "NSU Plaza",
    //   time: "9 AM - 6 PM",
    //   date: "28-29",
    //   month: "JAN",
    //   logo: "SLICE/SHARE",
    //   venue: "NSU",
    //   image: "/nsu-university-building.jpg",
    // },
  ];

  const handleEventInterest = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const nextSlide = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <section
      className="relative py-20 px-4 overflow-hidden"
      style={{ backgroundColor: "#0a0a14" }}
    >
      {/* Top-right radial gradient */}
      <div
        className="absolute -top-40 -right-80 pointer-events-none"
        style={{
          width: "483px",
          height: "608px",
          background:
            "radial-gradient(circle, rgba(141, 21, 222, 0.5) 0%, transparent 50%)",
          filter: "blur(200px)",
        }}
      />

      {/* Bottom-left diagonal gradient */}
      <div
        className="absolute -bottom-92 -left-40 pointer-events-none"
        style={{
          width: "348px",
          height: "498px",
          background:
            "linear-gradient(135deg, rgba(248, 2, 74, 0.61) 0%, rgba(54, 28, 82, 1) 100%)",
          filter: "blur(320px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2
            className="text-5xl md:text-6xl font-bold text-white mb-4 md:mb-0"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Upcoming Events
          </h2>
          <a
            href="#"
            className="text-white hover:text-purple-400 transition flex items-center gap-2 text-lg"
          >
            Explore All <span className="text-2xl">›</span>
          </a>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl overflow-hidden"
              style={{
                minHeight: "460px",
                border: "2px solid #7c3aed",
                background: "linear-gradient(135deg, #4a1d7e 0%, #2d1450 100%)",
              }}
            >
              {/* Background Image with Gradient Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${event.image}')`,
                }}
              />

              {/* Gradient Overlay - allows background to show through */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(74, 29, 126, 0.6) 0%, rgba(45, 20, 80, 0.3) 40%, rgba(20, 10, 35, 0.9) 100%)",
                }}
              />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6">
                {/* Top Section */}
                <div>
                  {/* Date Badge */}
                  <div
                    className="inline-block px-4 py-2 rounded-xl mb-4"
                    style={{ backgroundColor: "#8117ee" }}
                  >
                    <div className="text-white font-bold text-lg text-center leading-tight">
                      {event.date}
                      <br />
                      {event.month}
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="text-7xl font-bold text-purple-200 mt-4">
                    {event.venue}
                  </div>
                </div>

                {/* Bottom Card - Event Details */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    backgroundColor: "rgba(21, 2, 43, 0.85)",
                    backdropFilter: "blur(10px)",
                    opacity: "58%",
                  }}
                >
                  {/* Event Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {event.title}
                  </h3>

                  {/* Location & Time */}
                  <div className="flex items-center justify-between text-white mb-8">
                    <div className="flex items-center gap-2">
                      <MapPin size={20} />
                      <span className="text-base">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={20} />
                      <span className="text-base">{event.time}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  {/* <button
                    className="w-32 py-2 rounded-full font-bold text-white transition"
                    style={{
                      backgroundColor: "#8117EE",
                      fontSize: "14px",
                    }}
                    onClick={() => handleEventInterest(event)}
                  >
                    View Details
                  </button> */}

                  <a
                    href={event.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-36 py-2 rounded-full font-bold text-white text-center transition hover:opacity-90"
                    style={{
                      backgroundColor: "#8117ee",
                    }}
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
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
  );
}
