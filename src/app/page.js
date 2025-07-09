import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import RisingStarsCarousel from "./components/RisingStarsCarousel"
import HowItWorks from "./components/HowItWorks"
import PricingPlans from "./components/PricingPlans"
import UpcomingEvents from "./components/UpcomingEvents"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <RisingStarsCarousel />
      <HowItWorks />
      <PricingPlans />
      <UpcomingEvents />
      <ContactSection />
      <Footer />
    </main>
  )
}
