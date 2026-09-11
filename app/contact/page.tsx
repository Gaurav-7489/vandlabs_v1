import Link from 'next/link'
import { Phone, MessageSquare, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import EnquiryForm from '@/components/EnquiryForm'

const SHOWROOM_CHANNELS = [
  {
    icon: Phone,
    label: 'Direct Telephone Desk',
    val: '+91 99999 99999',
    href: 'tel:+919999999999',
    caption: 'Immediate availability check & telephone dossiers',
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp Concierge',
    val: 'Instant Digital Line',
    href: 'https://wa.me/919999999999',
    caption: 'HD walkaround video clips & spec PDF dispatches',
  },
  {
    icon: MapPin,
    label: 'Showroom Studios',
    val: 'Shimla · Chandigarh · Kullu',
    caption: 'Private viewing lounge access via prior reservation',
  },
  {
    icon: Clock,
    label: 'Operating Schedule',
    val: 'Mon – Sat: 09:30 – 19:00 IST',
    caption: 'Sunday: Reserved exclusively for scheduled handovers',
  },
]

export default function Contact() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F7F5F0] text-[#111111] antialiased selection:bg-[#E7E0D4] selection:text-[#111111]">
      <Header />
      <main className="pt-20 sm:pt-24 md:pt-28">
        <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 sm:py-12 md:px-10 md:py-16">
          <Reveal>
            <div className="inline-block border-b border-[#111111] pb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
              Direct Showroom Connection
            </div>
            <h1 className="mt-4 max-w-5xl font-serif text-4xl font-light leading-[1.02] tracking-tight text-[#111111] sm:text-6xl md:text-8xl lg:text-9xl">
              Let’s make this <br />
              <span className="italic font-normal text-[#6B6B6B]">less complicated.</span>
            </h1>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
            {/* Direct Channel Cards */}
            <Reveal>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
                {SHOWROOM_CHANNELS.map((ch) => {
                  const Icon = ch.icon
                  const Content = (
                    <div className="group h-full border border-[#D8D3CB] bg-[#F7F5F0] p-5 transition-all duration-200 hover:border-[#111111] sm:p-6">
                      <div className="flex items-center justify-between">
                        <Icon className="h-4 w-4 stroke-[1.75] text-[#111111]" />
                        {ch.href && (
                          <ArrowUpRight className="h-3.5 w-3.5 text-[#6B6B6B] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#111111]" />
                        )}
                      </div>
                      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]">
                        {ch.label}
                      </p>
                      <p className="mt-1 font-serif text-lg font-normal tracking-tight text-[#111111] sm:text-xl">
                        {ch.val}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[#6B6B6B]">{ch.caption}</p>
                    </div>
                  )

                  return ch.href ? (
                    <a
                      key={ch.label}
                      href={ch.href}
                      target={ch.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      {Content}
                    </a>
                  ) : (
                    <div key={ch.label} className="h-full">
                      {Content}
                    </div>
                  )
                })}
              </div>
            </Reveal>

            {/* Structured Enquiry Form Container */}
            <Reveal delay={0.1}>
              <div className="w-full border border-[#111111] bg-[#E7E0D4]/35 p-5 sm:p-8 md:p-12">
                <div className="mb-6 border-b border-[#D8D3CB] pb-4 sm:mb-8 sm:pb-6">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B6B6B]">
                    Enquiry & Appraisal Desk
                  </div>
                  <h2 className="mt-1.5 font-serif text-2xl font-light tracking-tight text-[#111111] sm:text-3xl md:text-4xl">
                    Dispatch Your Brief<span className="text-[#6B6B6B]">.</span>
                  </h2>
                </div>
                <EnquiryForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}