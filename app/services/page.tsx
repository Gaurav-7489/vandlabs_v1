import Link from 'next/link'
import {
  ArrowUpRight,
  BadgeDollarSign,
  ArrowLeftRight,
  Car,
  FileCheck,
  SearchCheck,
  Compass,
  CheckCircle2,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'

const SERVICE_ITEMS = [
  {
    icon: BadgeDollarSign,
    num: '01',
    title: 'Tier-1 Bespoke Finance',
    desc: 'Low-friction loan processing coordinated directly with authorized institutional banking networks. Transparent EMI projections with zero undisclosed processing markups.',
  },
  {
    icon: ArrowLeftRight,
    num: '02',
    title: 'Transparent Vehicle Exchange',
    desc: 'Upgrade seamlessly. Bring your current car for a 45-minute physical inspection and receive a genuine, fair-market valuation applicable directly against your next purchase.',
  },
  {
    icon: Car,
    num: '03',
    title: 'Showroom Consignment & Sale',
    desc: 'Entrust your car to our digital and physical showroom. We handle professional editorial photography, buyer screening, and secure escrow transaction settlements.',
  },
  {
    icon: FileCheck,
    num: '04',
    title: 'Title, RC & NOC Conveyancing',
    desc: 'Complete administrative conveyance. We oversee the legal RTO ownership transfer, NOC issuance across states, and comprehensive insurance endorsements.',
  },
  {
    icon: SearchCheck,
    num: '05',
    title: 'Independent 150-Point Inspection',
    desc: 'Comprehensive structural, electrical, and powertrain diagnostic auditing. Every client receives the diagnostic sheet before making any commercial commitment.',
  },
  {
    icon: Compass,
    num: '06',
    title: 'Unaccompanied Test Evaluations',
    desc: 'Experience the drive on your own terms. We prepare sanitized, route-cleared vehicles for comprehensive real-world driving appraisals.',
  },
]

export default function Services() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#111111] antialiased">
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-10 md:py-20">
          <Reveal>
            <div className="inline-block border-b border-[#111111] pb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B]">
              Integrated Client Capabilities
            </div>
            <h1 className="font-editorial mt-6 max-w-5xl text-5xl leading-[0.9] tracking-tight md:text-8xl lg:text-9xl">
              Everything around <br />
              <span className="italic font-light text-[#6B6B6B]">the machine.</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#6B6B6B]">
              Comprehensive automotive custodial services engineered to remove paperwork fatigue and financial ambiguity from ownership.
            </p>
          </Reveal>

          {/* Architectural Services Matrix */}
          <div className="mt-16 grid border-t border-[#D8D3CB] md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_ITEMS.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal
                  key={s.title}
                  delay={i * 0.05}
                  className="border-b border-[#D8D3CB] p-8 md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-num text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B]">
                      {s.num}
                    </span>
                    <Icon className="h-5 w-5 text-[#111111]" />
                  </div>

                  <h3 className="font-editorial mt-10 text-2xl font-semibold tracking-tight text-[#111111]">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-xs leading-relaxed text-[#6B6B6B]">
                    {s.desc}
                  </p>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* Action Panel */}
        <section className="border-t border-[#D8D3CB] bg-[#E7E0D4]/60">
          <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-24">
            <Reveal>
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
                    Consultation
                  </span>
                  <h2 className="font-editorial mt-3 text-4xl tracking-tight md:text-6xl text-[#111111]">
                    Require custom service assistance?
                  </h2>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex shrink-0 items-center gap-2 bg-[#111111] px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#F7F5F0] transition-colors hover:bg-black/85"
                >
                  <span>Connect With Desk</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}