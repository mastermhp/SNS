'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trophy, Swords, Briefcase, Search, ChevronDown, ChevronUp,
  MapPin, Monitor, Users, Calendar, DollarSign, Clock, Flag,
  Bell, Heart, Share2, ExternalLink, CheckCircle2
} from 'lucide-react'
import Image from 'next/image'

// Games data (from NewSignupModal)
const games = [
  { id: "apex", name: "Apex Legends", image: "/games/apex.png" },
  { id: "cod-bo7", name: "Call of Duty: Black Ops 7", image: "/games/codm.png" },
  { id: "cod-warzone", name: "Call of Duty: Warzone", image: "/games/codm.png" },
  { id: "chess", name: "Chess", image: "/games/chess.png" },
  { id: "cs2", name: "Counter-Strike 2", image: "/games/csgo.png" },
  { id: "crossfire", name: "Crossfire", image: "/games/cf.jpeg" },
  { id: "dota2", name: "Dota 2", image: "/games/dota2.png" },
  { id: "fc26-pc", name: "FC26 - PC", image: "/games/fifapc.png" },
  { id: "fc26-consoles", name: "FC26 - Consoles", image: "/games/fcconsole.png" },
  { id: "fc26-mobile", name: "FC26 - Mobile", image: "/games/fcmobile.png" },
  { id: "efootball-pc", name: "eFootball - PC", image: "/games/efootballpc.png" },
  { id: "efootball-consoles", name: "eFootball - Consoles", image: "/games/efootballconsole.png" },
  { id: "efootball-mobile", name: "eFootball - Mobile", image: "/games/efootballmobile.png" },
  { id: "fatal-fury", name: "Fatal Fury: City of the Wolves", image: "/games/ff.jpeg" },
  { id: "freefire", name: "Free Fire", image: "/games/freefire.png" },
  { id: "hok", name: "Honor of Kings", image: "/games/hk.jpeg" },
  { id: "lol", name: "League of Legends", image: "/games/lol.png" },
  { id: "mlbb", name: "Mobile Legends: Bang Bang", image: "/games/mlbb.png" },
  { id: "overwatch2", name: "Overwatch 2", image: "/games/overwatch.png" },
  { id: "pubg", name: "PUBG / PUBG: Battlegrounds", image: "/games/pubg.png" },
  { id: "pubg-mobile", name: "PUBG Mobile", image: "/games/pubg.png" },
  { id: "r6x", name: "Rainbow Six Siege X", image: "/games/r6.jpeg" },
  { id: "sf6", name: "Street Fighter 6", image: "/games/sf6.png" },
  { id: "tft", name: "Teamfight Tactics", image: "/games/tt.jpeg" },
  { id: "valorant", name: "VALORANT", image: "/games/valorant.png" },
  { id: "valorant-mobile", name: "VALORANT Mobile", image: "/games/valorant.png" },
  { id: "coc", name: "Clash of Clans", image: "/games/coc.png" },
  { id: "tekken8", name: "Tekken 8", image: "/games/tekken.jpeg" },
  { id: "mk11", name: "Mortal Kombat 11", image: "/games/mk11.png" },
  { id: "brawlstars", name: "Brawl Stars", image: "/games/brawlstars.png" },
]

// Generate sample events - one event per game per event type (all games)
const generateSampleEvents = () => {
  const eventTypes = ['Tournament', 'Scrims', 'Brand Deal']
  const statuses = ['Upcoming', 'Ongoing', 'Completed']
  const platforms = ['PC', 'Mobile', 'Console']
  const teamTypes = ['Solo', 'Duo', 'Squad']
  const locations = ['Bangladesh', 'India', 'Southeast Asia', 'Global']
  
  const events = []
  let eventId = 0
  
  // Create events for each game for each event type
  games.forEach((game, gameIdx) => {
    eventTypes.forEach((eventType, typeIdx) => {
      const idx = eventId
      const status = statuses[idx % 3]
      const platform = platforms[gameIdx % 3]
      const teamType = teamTypes[gameIdx % 3]
      
      const baseDate = new Date()
      baseDate.setDate(baseDate.getDate() + (idx * 2) - 30)
      
      events.push({
        id: `event-${eventId}`,
        title: `SNS ${game.name} ${eventType} ${eventType === 'Brand Deal' ? 'Opportunity' : 'Championship'}`,
        game: game,
        eventType: eventType,
        status: status,
        date: baseDate.toISOString(),
        endDate: new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: locations[gameIdx % 4],
        platform: platform,
        teamType: teamType,
        prizePool: eventType === 'Brand Deal' ? 0 : (gameIdx + 1) * 5000,
        currency: 'BDT',
        totalSlots: 64,
        filledSlots: Math.floor(Math.random() * 64),
        registrationStart: new Date(baseDate.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        registrationEnd: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        tournamentStart: baseDate.toISOString(),
        tournamentEnd: new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        host: 'Slice N Share',
        description: `Join the ${game.name} ${eventType.toLowerCase()} and compete against the best players in ${locations[gameIdx % 4]}!`,
        rules: [
          'All participants must be registered before the deadline',
          'Fair play policy strictly enforced',
          'All matches will be streamed on official channels',
          'Prizes will be distributed within 7 days of event completion',
        ],
        address: eventType !== 'Brand Deal' ? 'Online Event' : 'Contact for Details',
      })
      eventId++
    })
  })
  
  return events
}

const SAMPLE_EVENTS = generateSampleEvents()

const FILTER_TABS = [
  { id: 'all', label: 'All', count: SAMPLE_EVENTS.length },
  { id: 'Tournament', label: 'Tournaments', count: SAMPLE_EVENTS.filter(e => e.eventType === 'Tournament').length, icon: Trophy },
  { id: 'Scrims', label: 'Scrims', count: SAMPLE_EVENTS.filter(e => e.eventType === 'Scrims').length, icon: Swords },
  { id: 'Brand Deal', label: 'Brand Deals', count: SAMPLE_EVENTS.filter(e => e.eventType === 'Brand Deal').length, icon: Briefcase },
]

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${days[date.getDay()]} ${date.getDate()}${getOrdinalSuffix(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()}`
}

function formatDateTime(dateStr) {
  const date = new Date(dateStr)
  return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`
}

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th'
  switch (day % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

function getStatusColor(status) {
  switch (status) {
    case 'Upcoming': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    case 'Ongoing': return 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    case 'Completed': return 'text-red-400 bg-red-500/10 border-red-500/30'
    default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30'
  }
}

function getStatusText(status, date) {
  switch (status) {
    case 'Upcoming': return 'Registration Open'
    case 'Ongoing': return 'In Progress'
    case 'Completed': return 'Tournament Ended'
    default: return status
  }
}

// Event Card Component
function EventCard({ event, onClick }) {
  const [expanded, setExpanded] = useState(false)
  const slotsPercentage = (event.filledSlots / event.totalSlots) * 100

  return (
    <motion.div
      className="bg-[#111115] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-300"
      whileHover={{ y: -4 }}
      layout
    >
      {/* Banner - Game Image */}
      <div 
        className="relative h-48 cursor-pointer overflow-hidden"
        onClick={() => onClick(event)}
      >
        <Image
          src={event.game.image}
          alt={event.game.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Game Logo Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg">
              <Calendar size={14} className="text-amber-400" />
              <span className="text-white text-sm font-medium">
                {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase().replace(/ /g, ' ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Game + Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
              <Image
                src={event.game.image}
                alt={event.game.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white text-sm font-medium truncate max-w-[120px]">
              {event.game.name.length > 15 ? event.game.name.split(':')[0].split(' ').slice(0, 2).join(' ') : event.game.name}
            </span>
          </div>
          <span className={`px-2 py-0.5 text-xs font-semibold rounded border ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
        </div>

        {/* Title */}
        <h3 
          className="text-white font-bold text-lg mb-2 cursor-pointer hover:text-purple-400 transition-colors line-clamp-2"
          onClick={() => onClick(event)}
        >
          {event.title}
        </h3>

        {/* Date & Status */}
        <div className="flex items-center gap-2 text-sm mb-3">
          <Calendar size={14} className="text-red-400" />
          <span className="text-red-400 font-medium">{formatDate(event.date)}</span>
          <span className="text-gray-500">·</span>
          <span className="text-red-400">{getStatusText(event.status, event.date)}</span>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Flag size={12} />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Monitor size={12} />
            <span>{event.platform}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={12} />
            <span>{event.teamType}</span>
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              {/* Slots Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Slots</span>
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    <span>{event.status === 'Completed' ? 'Slots Closed' : `${event.filledSlots}/${event.totalSlots}`}</span>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${slotsPercentage}%` }}
                  />
                </div>
              </div>

              {/* Prize Pool */}
              <div className="flex items-center gap-2 text-sm mb-3">
                <DollarSign size={14} className="text-amber-400" />
                <span className="text-white font-semibold">
                  {event.prizePool > 0 ? `${event.currency} ${event.prizePool.toLocaleString()}` : '0'} PrizePool
                </span>
              </div>

              {/* Event Type Tag */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-medium text-gray-300 bg-gray-800 rounded-full border border-gray-700">
                  {event.eventType}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show More/Less */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-purple-400 text-sm font-medium mt-3 hover:text-purple-300 transition-colors ml-auto"
        >
          {expanded ? 'Show Less' : 'Show More'}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
    </motion.div>
  )
}

// Main Events Section Component
export default function EventsSection({ user }) {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEvents = SAMPLE_EVENTS.filter(event => {
    const matchesFilter = activeFilter === 'all' || event.eventType === activeFilter
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.game.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleEventClick = (event) => {
    // Navigate to event detail page instead of opening modal
    router.push(`/profile/events/${event.id}`)
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#111115] p-1 rounded-xl border border-white/[0.06]">
          {FILTER_TABS.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeFilter === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {IconComponent && <IconComponent size={14} />}
                {tab.label}
                <span className={`text-xs ${activeFilter === tab.id ? 'text-purple-200' : 'text-gray-500'}`}>
                  ({tab.count})
                </span>
              </button>
            )
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#111115] border border-white/[0.06] rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Events Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <EventCard event={event} onClick={handleEventClick} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
            <Search size={24} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </motion.div>
      )}

          </motion.div>
  )
}
