'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/cars', label: 'Inventory' },
  { href: '/about', label: 'Showroom Story' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'border-b border-[#D8D3CB]/80 bg-[#F7F5F0]/90 backdrop-blur-md shadow-xs'
            : 'border-b border-[#D8D3CB]/40 bg-[#F7F5F0]/40 backdrop-blur-xs'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] h-20 items-center justify-between px-6 md:px-10 lg:px-12">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="font-editorial text-2xl font-bold tracking-tighter text-[#111111] transition-opacity duration-300 group-hover:opacity-70">
              VAND<span className="text-[#6B6B6B] font-light">/</span>LABS
            </span>
            <span className="hidden sm:inline-block border border-[#111111]/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-[#6B6B6B]">
              Motors
            </span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative py-1 text-xs uppercase tracking-[0.18em] font-medium text-[#111111] transition-colors hover:text-[#6B6B6B]"
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#111111]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/admin"
              className="group inline-flex items-center gap-1.5 border border-[#111111] bg-transparent px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] transition-all duration-300 hover:bg-[#111111] hover:text-[#F7F5F0]"
            >
              <span>CMS Portal</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center border border-[#111111]/15 text-[#111111] transition-colors hover:border-[#111111] md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[80px] z-40 border-b border-[#D8D3CB] bg-[#F7F5F0] px-6 py-8 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="font-editorial text-2xl font-medium tracking-tight text-[#111111] hover:text-[#6B6B6B]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-5 border-t border-[#D8D3CB]">
                <Link
                  href="/admin"
                  className="flex items-center justify-between border border-[#111111] px-4 py-3.5 text-xs uppercase tracking-[0.16em] font-semibold text-[#111111]"
                >
                  Showroom CMS
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}