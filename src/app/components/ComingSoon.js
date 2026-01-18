"use client"

export default function ComingSoon() {
  return (
    <div className="coming-soon-wrapper">
      {/* Floating Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Main Card */}
      <div className="card">
        <span className="tag">Something Magical Is Coming</span>

        <h1 className="title">
          COMING <span>SOON</span>
        </h1>

        <p className="subtitle">
          We are crafting an experience powered by innovation, elegance, and
          next-level technology.
        </p>

        <div className="glow-line" />
      </div>

      <style jsx>{`
        .coming-soon-wrapper {
          position: relative;
          min-height: 56vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: "Inter", sans-serif;
        }

        /* Floating Orbs */
        .orb {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.55;
          animation: float 14s infinite ease-in-out;
          pointer-events: none;
        }

        .orb-1 {
          background: #ff2f92;
          top: -80px;
          left: -80px;
        }

        .orb-2 {
          background: #7b2cff;
          bottom: -100px;
          right: -80px;
          animation-delay: 3s;
        }

        .orb-3 {
          background: #ff5fd2;
          top: 45%;
          left: 60%;
          animation-delay: 6s;
        }

        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -40px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        /* Glass Card */
        .card {
          position: relative;
          z-index: 2;
          padding: 64px 56px;
          border-radius: 28px;
          background: rgba(30, 0, 50, 0.55);
          backdrop-filter: blur(18px);
          box-shadow:
            0 0 40px rgba(255, 47, 146, 0.25),
            inset 0 0 40px rgba(123, 44, 255, 0.15);
          text-align: center;
          animation: fadeUp 1.2s ease-out forwards;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .tag {
          display: inline-block;
          padding: 8px 18px;
          margin-bottom: 26px;
          border-radius: 999px;
          font-size: 12px;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          background: linear-gradient(90deg, #ff2f92, #a855f7);
          color: #fff;
          box-shadow: 0 0 18px rgba(255, 47, 146, 0.6);
        }

        .title {
          font-size: clamp(48px, 7vw, 96px);
          font-weight: 900;
          letter-spacing: 4px;
          margin: 0;
          color: #ffffff;
          text-shadow: 0 0 30px rgba(255, 47, 146, 0.8);
        }

        .title span {
          background: linear-gradient(90deg, #ff2f92, #7b2cff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .subtitle {
          margin-top: 22px;
          max-width: 520px;
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.82);
        }

        .glow-line {
          width: 150px;
          height: 4px;
          margin: 38px auto 0;
          border-radius: 999px;
          background: linear-gradient(90deg, #ff2f92, #7b2cff);
          box-shadow: 0 0 24px rgba(255, 47, 146, 0.9);
          animation: pulse 2.4s infinite ease-in-out;
        }

        @keyframes pulse {
          0% {
            opacity: 0.6;
            transform: scaleX(0.8);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
          100% {
            opacity: 0.6;
            transform: scaleX(0.8);
          }
        }

        @media (max-width: 640px) {
          .card {
            padding: 48px 28px;
          }
        }
      `}</style>
    </div>
  )
}
