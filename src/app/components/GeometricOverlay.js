"use client"
import { motion } from "framer-motion"

export default function GeometricOverlay() {
  return (
    <motion.div
      className="absolute inset-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 2 }}
    >
      {/* Diamond/Hexagonal Pattern Overlay */}
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.15'%3E%3Cpath d='M40 40l20-20v40l-20-20zm-20 0l20 20v-40l-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Additional texture layer */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpolygon points='20,1 40,20 20,39 1,20'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
          backgroundRepeat: "repeat",
        }}
      />
    </motion.div>
  )
}
