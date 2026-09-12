import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

const editorialSerif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-editorial',
  display: 'swap',
})

const modernSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const technicalMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: 'Luxe Motors — Curated Automotive Showroom',
    template: '%s — Luxe Motors',
  },
  description:
    'A premium digital showroom for inspected, documented and carefully selected pre-owned vehicles.',
  metadataBase: new URL('https://example.com'),
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${editorialSerif.variable} ${modernSans.variable} ${technicalMono.variable}`}
    >
      <body className="min-h-screen bg-[#F7F5F0] font-sans text-[#111111] antialiased selection:bg-[#111111] selection:text-[#F7F5F0] [text-rendering:optimizeLegibility]">
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}