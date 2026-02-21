"use client"
import "./globals.css"
import Script from "next/script"
import { AuthProvider } from "@/app/context/AuthContext"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Slice N Share - Esports Platform</title>
        <meta
          name="description"
          content="Slice N Share - Bangladesh's premier esports platform for tournaments, events, and gaming community."
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=bebas-neue@400&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XL5SWYB0WF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XL5SWYB0WF');
          `}
        </Script>
      </head>
      <body
        className="bg-black text-white overflow-x-hidden"
        style={{ fontFamily: "General Sans, sans-serif" }}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
