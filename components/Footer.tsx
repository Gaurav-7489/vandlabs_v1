import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#D8D3CB] bg-[#111111] text-[#F7F5F0]">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr_0.6fr_0.8fr]">
          {/* Col 1: Brand & Manifesto */}
          <div>
            <Link href="/" className="font-editorial text-3xl font-bold tracking-tight text-[#F7F5F0]">
              VAND<span className="text-white/40 font-light">/</span>LABS
            </Link>
            <p className="mt-5 max-w-sm text-xs leading-relaxed text-white/60">
              An independent automotive showroom delivering high-tier curated pre-owned vehicles. Built upon verified histories, strict mechanical inspection, and transparent commercial practices.
            </p>
            <div className="mt-6">
              <span className="inline-block border border-white/20 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-white/60">
                Licensed Used Showroom Operator
              </span>
            </div>
          </div>

          {/* Col 2: Exploration */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Inventory
            </p>
            <ul className="mt-5 space-y-3 text-xs text-white/80">
              <li>
                <Link href="/cars" className="transition-colors hover:text-white">
                  Available Fleet
                </Link>
              </li>
              <li>
                <Link href="/cars?body=SUV" className="transition-colors hover:text-white">
                  Luxury SUVs
                </Link>
              </li>
              <li>
                <Link href="/cars?body=Sedan" className="transition-colors hover:text-white">
                  Executive Sedans
                </Link>
              </li>
              <li>
                <Link href="/cars?fuel=Diesel" className="transition-colors hover:text-white">
                  Diesel Tourers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Company
            </p>
            <ul className="mt-5 space-y-3 text-xs text-white/80">
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  Showroom Story
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition-colors hover:text-white">
                  Finance & Exchange
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Private Consignment
                </Link>
              </li>
              <li>
                <Link href="/admin" className="inline-flex items-center gap-1 transition-colors hover:text-white">
                  Admin CMS <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Operating Hours */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Locations & Hours
            </p>
            <div className="mt-5 space-y-2 text-xs leading-relaxed text-white/70">
              <p className="font-medium text-white">Hubs: Shimla · Chandigarh · Kullu</p>
              <p>Monday – Saturday: 09:30 – 19:00 IST</p>
              <p>Sunday: By Prior Appointment Only</p>
            </div>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 border-b border-white/40 pb-0.5 text-xs text-white transition-colors hover:border-white"
              >
                <span>Request Showroom Directions</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[11px] text-white/40 sm:flex-row sm:items-center">
          <p>© 2026 VandLabs Motors. Built strictly to digital product specification v1.0.</p>
          <p className="font-mono-num">SECURED ENTERPRISE ARCHITECTURE</p>
        </div>
      </div>
    </footer>
  )
}