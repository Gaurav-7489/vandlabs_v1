import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Fuel,
  Gauge,
  Cog,
  Calendar,
  Layers,
  FileText,
  BadgeCheck,
  Check,
  Phone,
  MessageSquare,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import EnquiryForm from '@/components/EnquiryForm'
import { vehicles, getVehicle, formatINR } from '@/lib/data'

export function generateStaticParams() {
  return vehicles
    .filter((v) => v.status !== 'Draft' && v.status !== 'Archived')
    .map((v) => ({ slug: v.slug }))
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const v = getVehicle(slug)

  if (!v || v.status === 'Draft' || v.status === 'Archived') {
    notFound()
  }

  const primarySpecs = [
    { label: 'Manufacture Year', val: v.year, icon: Calendar },
    { label: 'Odometer Reading', val: `${v.kilometres.toLocaleString('en-IN')} km`, icon: Gauge },
    { label: 'Fuel Powertrain', val: v.fuel, icon: Fuel },
    { label: 'Transmission', val: v.transmission, icon: Cog },
    { label: 'Chassis Type', val: v.body, icon: Layers },
    { label: 'Exterior Finish', val: v.colour, icon: BadgeCheck },
    { label: 'Displacement', val: v.engine, icon: Gauge },
    { label: 'Peak Output', val: v.power, icon: Cog },
  ]

  const dossierRecords = [
    { label: 'Registration Year', val: v.registrationYear },
    { label: 'Ownership Count', val: v.ownership },
    { label: 'Insurance Status', val: v.insurance },
    { label: 'Service History', val: v.serviceHistory },
    { label: 'RC (Registration) Status', val: v.rcStatus },
    { label: 'NOC / Hypothecation', val: v.nocStatus },
    { label: 'Registered Location', val: v.location },
    { label: 'Estimated Mileage', val: v.mileage },
  ]

  const whatsappText = encodeURIComponent(
    `Hello Luxe Motors, I would like to enquire about the ${v.year} ${v.brand} ${v.model} (${v.id}) listed at ${formatINR(v.price)}.`
  )

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#111111] antialiased">
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Navigation Breadcrumb */}
        <div className="mx-auto max-w-[1440px] px-6 py-4 md:px-10">
          <Link
            href="/cars"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#6B6B6B] hover:text-[#111111]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Return to Fleet Catalog</span>
          </Link>
        </div>

        {/* Hero Gallery Grid */}
        <section className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="grid gap-3 md:grid-cols-12">
            {/* Primary Cover Image */}
            <div className="relative aspect-[16/10] overflow-hidden border border-[#D8D3CB] bg-[#E7E0D4] md:col-span-8">
              <Image
                src={v.images[0]}
                alt={`${v.brand} ${v.model} ${v.variant} Cover`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
              />
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="bg-[#111111] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#F7F5F0]">
                  {v.status}
                </span>
                <span className="border border-[#111111]/20 bg-[#F7F5F0]/90 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#111111] backdrop-blur-xs">
                  Stock Ref: {v.id}
                </span>
              </div>
            </div>

            {/* Thumbnail Stack */}
            <div className="grid grid-cols-2 gap-3 md:col-span-4 md:grid-cols-1">
              {v.images.slice(1, 3).map((src, idx) => (
                <div
                  key={src}
                  className="relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden border border-[#D8D3CB] bg-[#E7E0D4]"
                >
                  <Image
                    src={src}
                    alt={`${v.brand} ${v.model} perspective ${idx + 2}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Identity & Commercial Snapshot */}
        <section className="border-b border-[#D8D3CB] mt-10">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-6 pb-16 md:px-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]">
                <span>{v.year} Vintage</span>
                <span>·</span>
                <span>{v.ownership}</span>
                <span>·</span>
                <span>{v.location} Hub</span>
              </div>

              <h1 className="font-editorial mt-3 text-5xl leading-[0.92] tracking-tight md:text-7xl lg:text-8xl">
                {v.brand} <br />
                <span className="italic font-light text-[#6B6B6B]">{v.model}</span>
              </h1>
              <p className="mt-4 text-base font-medium tracking-tight text-[#111111]">
                {v.variant}
              </p>

              <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#6B6B6B]">
                {v.description}
              </p>

              {/* Technical Blueprint Strip */}
              <div className="mt-12 grid grid-cols-2 border-y border-[#D8D3CB] sm:grid-cols-4">
                {primarySpecs.map((spec) => {
                  const Icon = spec.icon
                  return (
                    <div
                      key={spec.label}
                      className="border-b border-[#D8D3CB] py-4 pr-3 sm:border-r sm:last:border-r-0 sm:px-4 sm:first:pl-0"
                    >
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[#6B6B6B]">
                        <Icon className="h-3 w-3 text-[#111111]" />
                        <span>{spec.label}</span>
                      </div>
                      <p className="font-mono-num mt-2 text-sm font-semibold text-[#111111]">
                        {spec.val}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Sticky Commercial Docket */}
            <aside>
              <div className="sticky top-28 border border-[#111111] bg-[#E7E0D4]/30 p-8">
                <div className="flex items-center justify-between border-b border-[#D8D3CB] pb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#6B6B6B]">
                    Transparent Asking Price
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#111111] bg-[#F7F5F0] px-2 py-0.5 border border-[#D8D3CB]">
                    Fixed & Verified
                  </span>
                </div>

                <div className="font-mono-num font-editorial mt-5 text-4xl font-bold tracking-tight text-[#111111] md:text-5xl">
                  {formatINR(v.price)}
                </div>

                {v.originalPrice && (
                  <div className="mt-1 text-xs text-[#6B6B6B]">
                    Original showroom invoice:{' '}
                    <span className="font-mono-num line-through">{formatINR(v.originalPrice)}</span>
                  </div>
                )}

                <div className="mt-8 space-y-3">
                  <a
                    href={`https://wa.me/919999999999?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 bg-[#111111] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F7F5F0] transition-colors hover:bg-black/80"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>WhatsApp Concierge</span>
                  </a>

                  <a
                    href="tel:+919999999999"
                    className="flex w-full items-center justify-center gap-2 border border-[#111111] bg-transparent px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#111111] transition-colors hover:bg-[#111111] hover:text-[#F7F5F0]"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Showroom</span>
                  </a>
                </div>

                <div className="mt-8 border-t border-[#D8D3CB] pt-6 space-y-2 text-xs text-[#6B6B6B]">
                  <div className="flex justify-between">
                    <span>Showroom Location:</span>
                    <strong className="text-[#111111]">{v.location}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Registration Status:</span>
                    <strong className="text-[#111111]">{v.rcStatus}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Available For:</span>
                    <strong className="text-[#111111]">Immediate Test Drive</strong>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Section: Specification Dossier & Equipment */}
        <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#6B6B6B]">
                  Documentation & Provenance
                </div>
                <h2 className="font-editorial mt-3 text-4xl font-normal tracking-tight md:text-5xl">
                  Verification Records
                </h2>
                <p className="mt-4 text-xs leading-relaxed text-[#6B6B6B]">
                  Private identity markers and original vehicle registration scans are held securely in escrow. Complete documents are disclosed during vehicle handover[cite: 1].
                </p>
              </Reveal>

              <div className="mt-10 grid border-y border-[#D8D3CB] sm:grid-cols-2">
                {dossierRecords.map((item, idx) => (
                  <div
                    key={item.label}
                    className={`border-b border-[#D8D3CB] py-4 ${
                      idx % 2 === 1 ? 'sm:pl-8' : ''
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[#6B6B6B]">
                      {item.label}
                    </span>
                    <p className="mt-1.5 text-sm font-semibold text-[#111111]">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reusable Equipment Library */}
            <div>
              <Reveal>
                <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#6B6B6B]">
                  Equipment & Packages
                </div>
                <h2 className="font-editorial mt-3 text-4xl font-normal tracking-tight md:text-5xl">
                  Installed Features
                </h2>
              </Reveal>

              <div className="mt-8 flex flex-wrap gap-2">
                {v.features.map((feat) => (
                  <span
                    key={feat}
                    className="inline-flex items-center gap-1.5 border border-[#D8D3CB] bg-[#F7F5F0] px-3.5 py-2 text-xs tracking-wide text-[#111111]"
                  >
                    <Check className="h-3 w-3 text-[#111111]" />
                    {feat}
                  </span>
                ))}
              </div>

              <div className="mt-12 border-l-2 border-[#111111] pl-6">
                <div className="text-xs uppercase tracking-[0.18em] font-semibold text-[#111111]">
                  Luxe Motors Quality Warranty
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#6B6B6B]">
                  This vehicle has been physically evaluated against water-logging, chassis compromise, and unauthorized ECU alterations. Test report available on premise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Direct Lead Capture Form */}
        <section className="border-t border-[#D8D3CB] bg-[#E7E0D4]/40">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <Reveal>
              <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#6B6B6B]">
                Reserve or Enquire
              </div>
              <h2 className="font-editorial mt-3 text-4xl font-normal leading-none md:text-6xl lg:text-7xl">
                Ready for the <br />
                <span className="italic font-light text-[#6B6B6B]">driver’s seat?</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-[#6B6B6B]">
                Submit your direct enquiry. Our concierge confirms vehicle availability, prepares the service dossier, and reserves your unaccompanied test-drive window.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border border-[#D8D3CB] bg-[#F7F5F0] p-8 shadow-xs md:p-12">
                <EnquiryForm vehicleId={`${v.brand} ${v.model} ${v.variant} (${v.id})`} />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}