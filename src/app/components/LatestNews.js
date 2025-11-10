"use client"

export default function LatestNews() {
  const newsList = [
    {
      title: "Slice N Share is with - ShareTrip",
      description:
        "We extend our heartfelt gratitude to ShareTrip for being the Title Sponsor and Official eSports Travel & Booking Partner for eSports Campus Scrims Tournament.Your trust and support added immense value to our startup exhibition, helping us create an inspiring platform for innovation and collaboration. We truly appreciate your partnership in making this event a success! We hope to make a long term partnership for better eSports Scene at Bangladesh  & beyond the border.... #ShareTrip #Slicenshare #tournamentSponsor #campusScrims",
      image: "/News/sharetrip.png",
      readMore: true,
    },
  ]

  const smallNews = [
    {
      title: "This PMSL CSA Fall 2025 will take place at the renowned Pixoul Gaming in Abu Dhabi...",
      image: "/News/pmsl.png",
      category: "E-sports",
      time: "12 hours ago",
    },
    {
      title: "This PMSL CSA Fall 2025 will take place at the renowned Pixoul Gaming in Abu Dhabi...",
      image: "/News/pmsl.png",
      category: "E-sports",
      time: "12 hours ago",
    },
    {
      title: "This PMSL CSA Fall 2025 will take place at the renowned Pixoul Gaming in Abu Dhabi...",
      image: "/News/pmsl.png",
      category: "E-sports",
      time: "12 hours ago",
    },
    {
      title: "This PMSL CSA Fall 2025 will take place at the renowned Pixoul Gaming in Abu Dhabi...",
      image: "/News/pmsl.png",
      category: "E-sports",
      time: "12 hours ago",
    },
  ]

  return (
    <section id="news" className="py-20 px-4" style={{ backgroundColor: "#0a0a14" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start md:items-center justify-between mb-12">
          <h2
            className="text-2xl md:text-6xl font-bold text-white mb-4 md:mb-0"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Latest News
          </h2>
          <a href="#" className="text-white hover:text-purple-400 transition flex items-center gap-2 text-sm md:text-lg">
            Explore All <span>›</span>
          </a>
        </div>

        <div className="rounded-3xl p-[3px] bg-gradient-to-br from-[#A076CC] to-[#40057C] mb-12">
          <div
            className="relative rounded-3xl overflow-hidden min-h-[400px] md:min-h-[1000px] flex items-end"
            style={{
              backgroundImage: `url('${newsList[0].image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#0a0a14",
            }}
          >
            {/* 70% gradient overlay from bottom - dark to transparent */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, 
                  rgba(0, 0, 0, 0.95) 0%, 
                  rgba(0, 0, 0, 0.85) 25%, 
                  rgba(0, 0, 0, 0.6) 50%, 
                  rgba(0, 0, 0, 0.2) 70%, 
                  transparent 100%)`,
              }}
            />

            {/* Text content on top of overlay */}
            <div className="relative z-10 p-4 md:p-12 max-w-3xl">
              <h3 className="text-lg md:text-4xl font-bold text-white mb-3 md:mb-4">{newsList[0].title}</h3>
              <p className="text-gray-200 text-sm md:text-lg mb-2 md:mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">
                {newsList[0].description}
              </p>
              <a
                href="https://www.facebook.com/share/p/1TdPFRpfQ7/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-3 md:px-8 py-1 md:py-3 rounded-full font-bold text-sm text-white transition hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #8117EE 0%, #A076CC 100%)",
                }}
              >
                Read More
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {smallNews.map((news, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden group cursor-pointer transform transition duration-300 hover:scale-[1.02]"
              style={{
                border: "2px solid transparent",
                backgroundImage: "linear-gradient(#0a0a14, #0a0a14), linear-gradient(135deg, #A076CC 0%, #40057C 100%)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              {/* Card Image with gradient overlay from bottom */}
              <div
                className="relative h-64 overflow-hidden"
                style={{
                  backgroundImage: `url('${news.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Gradient overlay from bottom */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, 
                      rgba(0, 0, 0, 0.9) 0%, 
                      rgba(0, 0, 0, 0.7) 40%, 
                      rgba(0, 0, 0, 0.3) 70%, 
                      transparent 100%)`,
                  }}
                />

                {/* Category badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-300 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                    {news.category}
                  </span>
                  <span className="text-xs text-gray-400">• {news.time}</span>
                </div>

                {/* Title at bottom on top of gradient */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <h4 className="text-sm md:text-base font-bold text-white line-clamp-3 group-hover:text-purple-300 transition">
                    {news.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
