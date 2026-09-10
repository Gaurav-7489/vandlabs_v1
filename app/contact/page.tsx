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
    <div className="min-h-screen bg-[#F7F5F0] text-[#111111] antialiased">
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-10 md:py-20">
          <Reveal>
            <div className="inline-block border-b border-[#111111] pb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B]">
              Direct Showroom Connection
            </div>
            <h1 className="font-editorial mt-6 max-w-5xl text-5xl leading-[0.9] tracking-tight md:text-8xl lg:text-9xl">
              Let’s make this <br />
              <span className="italic font-light text-[#6B6B6B]">less complicated.</span>
            </h1>
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Direct Channel Cards */}
            <Reveal>
              <div className="grid gap-4">
                {SHOWROOM_CHANNELS.map((ch) => {
                  const Icon = ch.icon
                  const Content = (
                    <div className="border border-[#D8D3CB] bg-[#F7F5F0] p-6 transition-colors hover:border-[#111111]">
                      <div className="flex items-center justify-between">
                        <Icon className="h-5 w-5 text-[#111111]" />
                        {ch.href && <ArrowUpRight className="h-4 w-4 text-[#6B6B6B]" />}
                      </div>
                      <p className="mt-6 text-[10px] uppercase tracking-[0.18em] font-semibold text-[#6B6B6B]">
                        {ch.label}
                      </p>
                      <p className="font-editorial mt-1 text-xl font-medium text-[#111111]">
                        {ch.val}
                      </p>
                      <p className="mt-2 text-xs text-[#6B6B6B]">{ch.caption}</p>
                    </div>
                  )

                  return ch.href ? (
                    <a key={ch.label} href={ch.href} target={ch.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                      {Content}
                    </a>
                  ) : (
                    <div key={ch.label}>{Content}</div>
                  )
                })}
              </div>
            </Reveal>

            {/* Structured Enquiry Form */}
            <Reveal delay={0.1}>
              <div className="border border-[#111111] bg-[#E7E0D4]/40 p-8 md:p-12">
                <div className="border-b border-[#D8D3CB] pb-6 mb-8">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#6B6B6B]">
                    Enquiry & Appraisal Desk
                  </div>
                  <h2 className="font-editorial mt-2 text-3xl font-medium tracking-tight text-[#111111] md:text-4xl">
                    Dispatch Your Brief
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