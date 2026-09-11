'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  ShieldCheck,
  FileCheck2,
  BadgePercent,
  KeyRound,
  Coins,
  Wrench,
  ChevronRight,
  MessageSquare,
} from 'lucide-react'
import Hero from '@/components/Hero'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import FeaturedRail from '@/components/FeaturedRail'
import { featuredCars } from '@/lib/data'

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: '150-Point Quality Inspection',
    desc: 'Every mechanical, structural, and electrical element verified before listing.',
  },
  {
    icon: FileCheck2,
    title: 'Verified Documentation',
    desc: 'Unencumbered registration certificates, NOC verification, and complete service histories.',
  },
  {
    icon: BadgePercent,
    title: 'Transparent Pricing',
    desc: 'No hidden handling fees or inflated showroom margins. Fixed, fair market values.',
  },
  {
    icon: KeyRound,
    title: 'Test-Drive Prepared',
    desc: 'Vehicles detailed, fuel-ready, and sanitized for immediate unaccompanied evaluation.',
  },
  {
    icon: Coins,
    title: 'Finance & Exchange Support',
    desc: 'Partnerships with major Tier-1 banking networks for fast, flexible loan processing.',
  },
  {
    icon: Wrench,
    title: 'After-Sales Care',
    desc: 'Direct access to trusted partner service centers and post-delivery guidance.',
  },
]

export default function Home() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#F7F5F0] text-[#111111] antialiased selection:bg-[#111111] selection:text-[#F7F5F0]">
      <Header />

      <main className="relative flex w-full flex-col">
        <Hero />

        {/* Section 01: Curated Fleet Rail */}
        <section 
          className="relative border-b border-[#D8D3CB] bg-[#F7F5F0]"
          aria-labelledby="section-01-heading"
        >
          <div className="pointer-events-none absolute inset-y-0 left-6 hidden w-px bg-[#D8D3CB]/50 sm:left-8 md:block lg:left-12 xl:left-16" />
          <div className="pointer-events-none absolute inset-y-0 right-6 hidden w-px bg-[#D8D3CB]/50 sm:left-8 md:block lg:right-12 xl:right-16" />

          <div className="mx-auto w-full max-w-[1440px] px-4 py-14 sm:px-8 sm:py-20 md:px-10 md:py-24 lg:px-16 lg:py-28">
            <div className="flex flex-col border-b border-[#D8D3CB] pb-8 sm:pb-12 lg:flex-row lg:items-end lg:justify-between">
              <Reveal>
                <div className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
                  <span className="h-1.5 w-1.5 bg-[#111111]" />
                  INDEX 01 / VERIFIED INVENTORY
                </div>
                <h2 
                  id="section-01-heading"
                  className="mt-3 font-serif text-3xl font-light tracking-tight text-[#111111] sm:text-5xl md:text-6xl"
                >
                  Cars worth <br />
                  <span className="italic text-[#6B6B6B]">looking twice</span> at.
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-6 flex flex-col items-start gap-4 lg:mt-0 lg:items-end">
                  <p className="max-w-sm text-xs sm:text-sm font-normal leading-relaxed text-[#6B6B6B] lg:text-right">
                    Hand-selected for low ownership wear, complete maintenance logs, and high road presence.
                  </p>
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href="/cars"
                      className="group inline-flex w-full items-center justify-center gap-2.5 border border-[#111111] bg-[#111111] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#F7F5F0] transition-colors hover:bg-transparent hover:text-[#111111] sm:w-auto"
                    >
                      <span>View Complete Inventory</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </motion.div>
                </div>
              </Reveal>
            </div>

            <div className="mt-8 sm:mt-12 w-full">
              <Reveal delay={0.15}>
                <FeaturedRail cars={featuredCars} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Section 02: Verification Dossier (Dark Industrial Contrast) */}
        <section 
          className="relative border-b border-[#111111] bg-[#111111] text-[#F7F5F0]"
          aria-labelledby="section-02-heading"
        >
          <div className="mx-auto w-full max-w-[1440px] px-4 py-14 sm:px-8 sm:py-20 md:px-10 md:py-24 lg:px-16 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 xl:gap-20">
              
              <Reveal>
                <div className="flex flex-col items-start lg:sticky lg:top-28">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">
                    <span className="h-1.5 w-1.5 bg-[#E7E0D4]" />
                    INDEX 02 / BENCHMARK PROTOCOL
                  </div>
                  <h2 
                    id="section-02-heading"
                    className="mt-3 font-serif text-3xl font-light leading-[1.08] tracking-tight text-[#F7F5F0] sm:text-5xl md:text-6xl"
                  >
                    Trust is built <br />
                    <span className="italic text-white/40">before</span> the keys turn.
                  </h2>
                  <p className="mt-4 max-w-md text-xs sm:text-sm font-light leading-relaxed text-white/60">
                    Every vehicle undergoes exhaustive physical validation. If it fails our checks, it never touches our digital showroom[cite: 1].
                  </p>

                  <div className="mt-8 hidden border-l border-white/20 pl-4 lg:block">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Certification Gate</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/80">Strict adherence to structural zero-tolerance standards[cite: 1].</p>
                  </div>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2">
                {TRUST_POINTS.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <Reveal key={item.title} delay={idx * 0.04}>
                      <div className="group relative flex flex-col justify-between border-b border-white/10 p-5 sm:p-7 transition-colors hover:bg-white/[0.02] sm:even:border-l sm:even:border-white/10">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-white/30 transition-colors group-hover:text-white/70">
                              / 0{idx + 1}
                            </span>
                            <Icon className="h-4 w-4 stroke-[1.5] text-white/50 transition-colors group-hover:text-[#E7E0D4]" />
                          </div>

                          <h3 className="mt-6 font-serif text-base font-normal tracking-wide text-[#F7F5F0]">
                            {item.title}
                          </h3>

                          <p className="mt-2 text-xs font-light leading-relaxed text-white/50">
                            {item.desc}
                          </p>
                        </div>

                        <div className="mt-6 h-px w-0 bg-[#E7E0D4] transition-all duration-300 group-hover:w-8" />
                      </div>
                    </Reveal>
                  )
                })}
              </div>

            </div>
          </div>
        </section>

        {/* Section 03: Editorial Story & Ledger Metrics */}
        <section 
          className="relative border-b border-[#D8D3CB] bg-[#F7F5F0]"
          aria-labelledby="section-03-heading"
        >
          <div className="mx-auto w-full max-w-[1440px] px-4 py-14 sm:px-8 sm:py-20 md:px-10 md:py-24 lg:px-16 lg:py-28">
            
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center xl:gap-16">
              
              <div className="lg:col-span-6">
                <Reveal>
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
                    <span className="h-1.5 w-1.5 bg-[#111111]" />
                    INDEX 03 / STUDIO ETHOS
                  </div>
                  <h2 
                    id="section-03-heading"
                    className="mt-3 font-serif text-3xl font-light leading-[1.08] tracking-tight text-[#111111] sm:text-5xl"
                  >
                    A dignified way to buy pre-owned.
                  </h2>
                  <p className="mt-4 max-w-lg text-xs sm:text-sm font-normal leading-relaxed text-[#6B6B6B]">
                    The traditional used-car market is flooded with opaque histories, manipulated odometers, and high-pressure sales pitches. We established Luxe Motors to offer an alternative: an editorial, transparent buying experience built on verified evidence and quiet confidence[cite: 1].
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/about"
                      className="group inline-flex items-center gap-2 border-b border-[#111111] pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111] transition-opacity hover:opacity-70"
                    >
                      <span>Read The Full Story</span>
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-6">
                <Reveal delay={0.1}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#D8D3CB] bg-[#E7E0D4] lg:aspect-[16/11]">
                    <Image
                      src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=85"
                      alt="Luxe Motors Showroom Floor"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover grayscale contrast-[1.05] transition-all duration-700 ease-out hover:scale-105 hover:grayscale-0"
                    />
                    <div className="absolute right-3 top-3 bg-[#111111] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F7F5F0]">
                      Location / Shimla
                    </div>
                  </div>
                </Reveal>
              </div>

            </div>

            {/* Structured Stats Rail */}
            <div className="mt-14 sm:mt-18 border border-[#D8D3CB] bg-[#E7E0D4]/30">
              <div className="grid grid-cols-1 sm:grid-cols-3">
                {[
                  ['Showroom Heritage', '8+ Years'],
                  ['Vehicles Placed', '1,250+'],
                  ['Repeat Collectors', '42%'],
                ].map(([label, metric], i) => (
                  <div
                    key={label}
                    className={`flex flex-col justify-between p-6 sm:p-8 ${
                      i !== 2 ? 'border-b border-[#D8D3CB] sm:border-b-0 sm:border-r' : ''
                    }`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B6B6B]">
                      {label}
                    </p>
                    <div className="mt-3 font-mono text-2xl font-light tracking-tight text-[#111111] sm:text-3xl md:text-4xl">
                      {metric}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Section 04: Concierge Acquisition Banner */}
        <section 
          className="bg-[#F7F5F0]"
          aria-labelledby="section-04-heading"
        >
          <div className="mx-auto w-full max-w-[1440px] px-4 py-14 sm:px-8 sm:py-20 md:px-10 md:py-24 lg:px-16 lg:py-28">
            <Reveal>
              <div className="relative border border-[#111111] bg-[#E7E0D4] p-6 sm:p-10 md:p-12 lg:p-16">
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                  
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
                      <span className="h-1.5 w-1.5 bg-[#111111]" />
                      INDEX 04 / CONCIERGE ACCESS
                    </div>
                    <h2 
                      id="section-04-heading"
                      className="mt-3 font-serif text-3xl font-light leading-[1.05] tracking-tight text-[#111111] sm:text-5xl md:text-6xl"
                    >
                      Come for a car. <br />
                      <span className="italic text-[#6B6B6B]">Stay for the clarity.</span>
                    </h2>
                    <p className="mt-4 max-w-lg text-xs sm:text-sm font-normal leading-relaxed text-[#6B6B6B]">
                      Whether you are seeking a specific European saloon, an adventure-ready SUV, or looking to consign your vehicle, our specialists are ready to consult[cite: 1].
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { y: -2 }}
                      whileTap={shouldReduceMotion ? {} : { y: 0 }}
                      transition={{ duration: 0.15 }}
                      className="w-full sm:w-auto"
                    >
                      <Link
                        href="/contact"
                        className="inline-flex w-full items-center justify-center gap-2.5 border border-[#111111] bg-[#111111] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F7F5F0] transition-colors hover:bg-transparent hover:text-[#111111] sm:w-auto"
                      >
                        <span>Schedule Appointment</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </motion.div>

                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { y: -2 }}
                      whileTap={shouldReduceMotion ? {} : { y: 0 }}
                      transition={{ duration: 0.15 }}
                      className="w-full sm:w-auto"
                    >
                      <a
                        href="https://wa.me/919999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2.5 border border-[#111111] bg-transparent px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#111111] transition-colors hover:bg-[#111111] hover:text-[#F7F5F0] sm:w-auto"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </motion.div>
                  </div>

                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}