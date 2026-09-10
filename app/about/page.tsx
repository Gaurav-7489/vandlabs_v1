import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react'
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
    <div className="min-h-screen bg-[#F7F5F0] text-[#111111] antialiased">
      <Header />
      <main className="pt-24 md:pt-32">
        {/* Header Hero Section */}
        <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-10 md:py-20">
          <Reveal>
            <div className="inline-block border-b border-[#111111] pb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B]">
              Showroom Heritage & Manifesto
            </div>
            <h1 className="font-editorial mt-6 max-w-5xl text-5xl leading-[0.9] tracking-tight md:text-8xl lg:text-9xl">
              Pre-owned, <br />
              <span className="italic font-light text-[#6B6B6B]">properly presented.</span>
            </h1>
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden border border-[#D8D3CB] bg-[#E7E0D4]">
                <Image
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85"
                  alt="VandLabs Showroom Floor"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 border border-white/20 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-xs">
                  Aesthetic Standard · Shimla Studio
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-6 text-sm leading-relaxed text-[#6B6B6B] md:text-base">
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
                    className="inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F7F5F0] transition-colors hover:bg-black/85"
                  >
                    <span>Connect With Our Curators</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Pillars Strip */}
        <section className="border-t border-[#D8D3CB] bg-[#111111] text-[#F7F5F0]">
          <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
            <Reveal>
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
                Operating Principles
              </div>
              <h2 className="font-editorial mt-4 text-4xl tracking-tight md:text-6xl">
                The VandLabs Benchmark.
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-8 border-t border-white/15 pt-10 md:grid-cols-3">
              {CORE_PILLARS.map((pillar, i) => (
                <Reveal key={pillar.num} delay={i * 0.08}>
                  <div>
                    <span className="font-mono-num text-xs uppercase tracking-[0.2em] text-white/40">
                      // {pillar.num}
                    </span>
                    <h3 className="font-editorial mt-4 text-2xl font-medium tracking-tight text-[#F7F5F0]">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-white/60">
                      {pillar.desc}
                    </p>
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