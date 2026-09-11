'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Menu, X, ShieldCheck } from 'lucide-react'

const NAV_LINKS = [
  { href: '/cars', label: 'Inventory', num: '01' },
  { href: '/about', label: 'Showroom Story', num: '02' },
  { href: '/services', label: 'Services', num: '03' },
  { href: '/contact', label: 'Contact', num: '04' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scroll propagation when full mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-[#D8D3CB] bg-[#F7F5F0]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(17,17,17,0.03)]'
            : 'border-b border-[#D8D3CB]/60 bg-[#F7F5F0]/80 backdrop-blur-xs'
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Brand Wordmark */}
          <Link href="/" className="group flex items-center gap-3">
            <span className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-[#111111] transition-opacity duration-200 group-hover:opacity-75">
              LUXE MOTORS
            </span>
            <span className="hidden sm:inline-block border border-[#111111]/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#6B6B6B]">
              Curated Fleet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:gap-10 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative py-1 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${
                    isActive ? 'text-[#111111]' : 'text-[#6B6B6B] hover:text-[#111111]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive ? (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#111111]"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  ) : (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] scale-x-0 bg-[#111111] transition-transform duration-200 group-hover:scale-x-100" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/admin"
              className="group inline-flex items-center gap-2 border border-[#111111] bg-transparent px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#111111] transition-all duration-200 hover:bg-[#111111] hover:text-[#F7F5F0] active:scale-[0.98]"
            >
              <span>CMS Portal</span>
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center border border-[#111111]/20 bg-transparent text-[#111111] transition-all duration-200 hover:border-[#111111] hover:bg-[#111111]/5 active:scale-95 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5 stroke-[1.5]" /> : <Menu className="h-5 w-5 stroke-[1.5]" />}
          </button>
        </div>
      </header>

      {/* Immersive Editorial Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-[#111111]/60 backdrop-blur-xs md:hidden"
              aria-hidden="true"
            />

            {/* Slide Sheet Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 top-20 z-40 max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-[#D8D3CB] bg-[#F7F5F0] px-6 py-8 shadow-2xl md:hidden"
            >
              <div className="flex flex-col space-y-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
                  Catalog Navigation
                </p>

                <div className="divide-y divide-[#D8D3CB]/60 border-y border-[#D8D3CB]/60">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center justify-between py-4 transition-colors duration-150 ${
                          isActive ? 'text-[#111111] font-semibold' : 'text-[#6B6B6B] hover:text-[#111111]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[11px] text-[#6B6B6B]/80">{link.num}</span>
                          <span className="font-serif text-2xl font-light tracking-tight">{link.label}</span>
                        </div>
                        <ArrowUpRight className={`h-4 w-4 ${isActive ? 'text-[#111111]' : 'text-[#6B6B6B]'}`} />
                      </Link>
                    )
                  })}
                </div>

                <div className="pt-2 space-y-4">
                  <Link
                    href="/admin"
                    className="flex w-full items-center justify-between border border-[#111111] bg-[#111111] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#F7F5F0] shadow-sm transition-transform active:scale-[0.98]"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-[#E7E0D4]" />
                      Access CMS Portal
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  <div className="flex items-center justify-between px-1 text-[11px] text-[#6B6B6B]">
                    <span>Luxe Motors Private Showroom</span>
                    <span>Verified Inventory</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}