import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'VandLabs Motors — Curated Used Cars', template: '%s — VandLabs Motors' },
  description: 'A premium digital showroom for inspected, documented and carefully selected pre-owned vehicles.',
  metadataBase: new URL('https://example.com'),
  robots: { index: true, follow: true }
}

export default function RootLayout({ children }: { children: React.ReactNode }) { return <>{children}</> }
