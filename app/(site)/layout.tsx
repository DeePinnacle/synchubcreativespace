import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Sora, Inter, Italianno } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layouts/SiteChrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700", "600"]
})

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600"]
})

const italianno = Italianno({
  variable: "--font-italianno",
  subsets: ["latin"],
  weight: ["400"]
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"]
})

export const metadata: Metadata = {
  metadataBase: new URL("https://synchubcreativeweek.com"),

  title: {
    default: "Synchub Creative Week 2026 | Future Forward: Reimagining Africa's Creative Power",
    template: "%s | Synchub Creative Week 2026",
  },

  description:
    "Synchub Creative Week 2026 is a six-day celebration of Africa's creative industries, bringing together innovators, creators, entrepreneurs, filmmakers, artists, and technology leaders to explore the future of creativity. Join us from 23–28 November 2026 at the Synchub Creative Centre, Abuja.",

  applicationName: "Synchub Creative Week 2026",

  keywords: [
    "Synchub Creative Week",
    "Synchub Creative Centre",
    "Creative Week Nigeria",
    "Abuja events",
    "Creative conference Africa",
    "African creativity",
    "Creative industries event",
    "Tech and innovation conference",
    "Film makers event Nigeria",
    "Creative entrepreneurs",
    "Creative festival Africa",
    "Creative community Nigeria",
    "1 Million Creatives",
    "Creative networking event",
    "Innovation conference Abuja",
    "Creative economy Africa",
    "Business growth conference",
    "African creators",
    "Creative technology event",
    "Future Forward",
    "Creative summit Nigeria",
    "Creative exhibition Abuja",
    "Creative ecosystem Africa",
    "Synchub",
    "Creative leadership conference",
  ],

  authors: [
    {
      name: "Synchub Creative Centre",
      url: "https://synchubcreativeweek.com",
    },
  ],

  creator: "Synchub Creative Centre",
  publisher: "Synchub Creative Centre",
  category: "Event",

  alternates: {
    canonical: "https://synchubcreativeweek.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://synchubcreativeweek.com",
    siteName: "Synchub Creative Week 2026",

    title:
      "Synchub Creative Week 2026 | Future Forward: Reimagining Africa's Creative Power",

    description:
      "Experience six transformative days of creativity, innovation, technology, business, film, and culture at Synchub Creative Week 2026 in Abuja, Nigeria.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Synchub Creative Week 2026 — Future Forward: Reimagining Africa's Creative Power",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Synchub Creative Week 2026 | Future Forward: Reimagining Africa's Creative Power",

    description:
      "Join Africa's leading creators, innovators, entrepreneurs, and industry leaders for six days of inspiration, networking, and creativity in Abuja.",

    images: ["/og-image.png"],
    creator: "@synchubcreative",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
    // yandex: "YOUR_YANDEX_VERIFICATION_CODE",
    // yahoo: "YOUR_YAHOO_VERIFICATION_CODE",
  },

  other: {
    "event:start_date": "2026-11-23",
    "event:end_date": "2026-11-28",
    "event:location": "Synchub Creative Centre, Abuja, Nigeria",
    "theme": "Future Forward: Reimagining Africa's Creative Power",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${sora.variable} ${inter.variable} ${italianno.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteChrome />
        {children}
      </body>
    </html>
  );
}
