import "./globals.css"

export const metadata = {
  title: "Slice N Share - Empowering Esports Talent",
  description: "Join us early — as a user, a believer, or a backer.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=bebas-neue@400&display=swap"
          rel="stylesheet"
        />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XL5SWYB0WF"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XL5SWYB0WF');
            `,
          }}
        />
      </head>
      <body className="bg-black text-white overflow-x-hidden" style={{ fontFamily: "General Sans, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
