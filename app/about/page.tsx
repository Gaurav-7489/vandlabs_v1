import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'

const CORE_PILLARS = [
  {
    num: '01',
    title: 'Absolute Clarity',
    desc: 'Unfiltered mechanical inspection reports, verified service logs, and transparent pricing. No inflated showroom markups or concealed defects.',
  },
  {
    num: '02',
    title: 'Curatorial Restraint',
    desc: 'We reject over 70% of evaluated pre-owned cars. Only vehicles with spotless provenance and verified odometers earn entry to the showroom.',
  },
  {
    num: '03',
    title: 'Dignified Custody',
    desc: 'From paperwork and ownership transfers to Tier-1 finance coordination, we handle every administrative friction point with discretion.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#111111] antialiased selection:bg-[#111111] selection:text-[#F7F5F0]">
      <Header />
      
      <main className="relative flex w-full flex-col overflow-hidden pt-32 md:pt-40 lg:pt-44">
        {/* Header Hero Section */}
        <section className="mx-auto max-w-[1440px] px-6 pb-20 sm:px-10 md:px-16 md:pb-28 lg:px-20 lg:pb-32">
          <Reveal>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.24em] text-[#6B6B6B]">
              <span className="h-1.5 w-1.5 bg-[#111111]" />
              SHOWROOM HERITAGE & MANIFESTO
            </div>
            <h1 className="font-editorial mt-6 max-w-5xl text-5xl leading-[0.88] tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              Pre-owned, <br />
              <span className="italic font-light text-[#6B6B6B]">properly presented.</span>
            </h1>
          </Reveal>

          <div className="mt-16 sm:mt-20 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center xl:gap-20">
            <Reveal>
              <div className="relative aspect-[16/11] overflow-hidden border border-[#D8D3CB] bg-[#E7E0D4]">
                <Image
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85"
                  alt="VandLabs Showroom Floor"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-5 left-5 border border-white/20 bg-black/75 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  Aesthetic Standard · Shimla Studio
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-6 text-sm leading-relaxed text-[#6B6B6B] md:text-base md:space-y-7">
                <p className="font-editorial text-2xl font-normal leading-snug text-[#111111] md:text-3xl">
                  Purchasing a pre-owned vehicle shouldn’t require blind faith or defensive skepticism.
                </p>
                <p>
                  VandLabs was founded to counter the opaque, high-friction climate of traditional classified portals. We operate with an editorial eye: treating each automobile not as commodified inventory, but as a finely engineered machine deserving of rigorous provenance.
                </p>
                <p>
                  Every automobile listed is backed by physically verified registration certificates, non-objection clearances, and exhaustive 150-point mechanical assessments conducted by senior technicians.
                </p>
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 border border-[#111111] bg-[#111111] px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#F7F5F0] transition-colors hover:bg-black/85"
                  >
                    <span>Connect With Our Curators</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Pillars Strip: Warm Accent Foundation */}
        <section className="border-y border-[#D8D3CB] bg-[#E7E0D4] text-[#111111]">
          <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:px-16 md:py-28 lg:px-20 lg:py-32">
            <div className="flex flex-col border-b border-[#D8D3CB] pb-10 sm:pb-14">
              <Reveal>
                <div className="flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.24em] text-[#6B6B6B]">
                  <span className="h-1.5 w-1.5 bg-[#111111]" />
                  OPERATING PRINCIPLES
                </div>
                <h2 className="font-editorial mt-5 text-3xl font-light tracking-tight text-[#111111] sm:text-5xl md:text-6xl">
                  The VandLabs Benchmark.
                </h2>
              </Reveal>
            </div>

            {/* Swiss Structural Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#D8D3CB]">
              {CORE_PILLARS.map((pillar, i) => (
                <Reveal key={pillar.num} delay={i * 0.08}>
                  <div
                    className={`group relative flex flex-col justify-between p-8 sm:p-10 lg:p-12 transition-colors hover:bg-[#F7F5F0]/60 ${
                      i !== 0 ? 'border-t md:border-t-0 md:border-l border-[#D8D3CB]' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#6B6B6B] group-hover:text-[#111111] transition-colors">
                          / {pillar.num}
                        </span>
                      </div>

                      <h3 className="font-editorial mt-8 text-2xl font-normal tracking-tight text-[#111111] sm:text-3xl">
                        {pillar.title}
                      </h3>

                      <p className="mt-4 text-xs sm:text-sm font-normal leading-relaxed text-[#6B6B6B]">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="mt-10 h-px w-0 bg-[#111111] transition-all duration-300 group-hover:w-10" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}