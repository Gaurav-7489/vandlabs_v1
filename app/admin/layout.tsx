'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CarFront,
  MessageSquareText,
  Settings2,
  LogOut,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close the drawer automatically on route navigation
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/cars', label: 'Inventory', icon: CarFront },
    { href: '#', label: 'Leads', icon: MessageSquareText },
    { href: '#', label: 'Content', icon: Settings2 },
  ]

  return (
    <div className="min-h-screen w-full bg-[#111111] text-[#F7F5F0] antialiased selection:bg-[#E7E0D4] selection:text-[#111111]">
      {/* 1. Desktop Persistent Sidebar (>= 1024px) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-[#D8D3CB]/15 bg-[#111111] lg:flex">
        {/* Brand Anchor */}
        <div className="border-b border-[#D8D3CB]/10 px-6 py-6">
          <Link href="/" className="group block transition-opacity hover:opacity-80">
            <span className="font-serif text-2xl font-light tracking-tight text-[#F7F5F0]">
              Luxe Motors
            </span>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#6B6B6B]">
                Showroom CMS · V1
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]/80">
            Navigation
          </p>
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={label}
                href={href}
                className={`group relative flex items-center gap-3.5 px-3 py-3 text-xs tracking-wider uppercase transition-colors ${
                  isActive
                    ? 'bg-[#F7F5F0]/[0.06] text-[#F7F5F0]'
                    : 'text-[#6B6B6B] hover:bg-[#F7F5F0]/[0.03] hover:text-[#F7F5F0]'
                }`}
              >
                <Icon
                  className={`h-4 w-4 stroke-[1.5] transition-colors ${
                    isActive ? 'text-[#E7E0D4]' : 'group-hover:text-[#E7E0D4]'
                  }`}
                />
                <span className="font-medium tracking-[0.14em]">{label}</span>
                <span
                  className={`absolute inset-y-0 left-0 w-[2px] bg-[#E7E0D4] transition-transform duration-200 ${
                    isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* Desktop Footer Exit */}
        <div className="border-t border-[#D8D3CB]/10 p-5 space-y-3">
          <div className="flex items-center gap-2 px-2 text-[10px] uppercase tracking-wider text-[#6B6B6B]">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500/80" />
            <span>Session Secured</span>
          </div>

          <Link
            href="/"
            className="group flex items-center gap-2.5 border border-[#D8D3CB]/15 px-3.5 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B] transition-all hover:border-[#F7F5F0]/40 hover:bg-[#F7F5F0]/[0.02] hover:text-[#F7F5F0]"
          >
            <LogOut className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Exit Showroom</span>
          </Link>
        </div>
      </aside>

      {/* 2. Mobile/Tablet Slide-Out Drawer (< 1024px) */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#D8D3CB]/15 bg-[#111111] transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#D8D3CB]/10 px-6 py-5">
          <div>
            <span className="font-serif text-xl font-light tracking-tight text-[#F7F5F0]">
              Luxe Motors
            </span>
            <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#6B6B6B]">
              Showroom CMS · V1
            </p>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="border border-[#D8D3CB]/15 p-1.5 text-[#6B6B6B] hover:text-[#F7F5F0]"
          >
            <X className="h-5 w-5 stroke-[1.5]" />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]/80">
            Navigation
          </p>
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3.5 px-3.5 py-3 text-xs tracking-wider uppercase transition-colors ${
                  isActive
                    ? 'bg-[#F7F5F0]/10 font-semibold text-[#F7F5F0]'
                    : 'text-[#6B6B6B] hover:bg-[#F7F5F0]/5 hover:text-[#F7F5F0]'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-[#E7E0D4]' : ''}`} />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-[#D8D3CB]/10 p-5 space-y-3">
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 border border-[#D8D3CB]/20 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#6B6B6B] transition-colors hover:text-[#F7F5F0]"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Exit Showroom</span>
          </Link>
        </div>
      </aside>

      {/* 3. Main Workspace Area */}
      <div className="flex min-h-screen flex-col lg:pl-64">
        {/* Universal Top Bar with Hamburger */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#D8D3CB]/10 bg-[#111111]/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Hamburger Trigger for Mobile & Tablets */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation drawer"
              className="flex items-center justify-center border border-[#D8D3CB]/20 p-2 text-[#F7F5F0] transition-colors hover:bg-white/5 lg:hidden active:scale-95"
            >
              <Menu className="h-4 w-4" />
            </button>

            <Link href="/" className="font-serif text-lg font-light tracking-tight text-[#F7F5F0] lg:hidden">
              Luxe Motors
            </Link>

            <div className="hidden items-center gap-3 lg:flex">
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
                Admin Workspace
              </span>
              <span className="text-[#D8D3CB]/20">/</span>
              <span className="text-[11px] font-normal tracking-wide text-[#E7E0D4]/80">
                Editorial Control Panel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <span className="block text-[11px] font-medium tracking-wide text-[#F7F5F0]">
                Showroom Admin
              </span>
              <span className="block text-[9px] uppercase tracking-wider text-[#6B6B6B]">
                Demo Showroom
              </span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center border border-[#D8D3CB]/20 bg-[#F7F5F0]/[0.04] font-serif text-xs text-[#E7E0D4]">
              LM
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 w-full max-w-full overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}