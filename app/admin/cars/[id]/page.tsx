import Link from 'next/link'
import { ArrowLeft, Check, ImagePlus, Save, Upload, Eye, Sparkles } from 'lucide-react'
import { vehicles, getVehicle } from '@/lib/data'

export function generateStaticParams() {
  return vehicles.map(v => ({ id: v.id }))
}

export default async function AdminCar({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const v = getVehicle(vehicles.find(x => x.id === id)?.slug || '')

  if (!v) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center p-10 text-center">
        <p className="font-serif text-3xl font-light text-[#F7F5F0]">Vehicle Not Found</p>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#6B6B6B]">
          The requested record does not exist or has been removed.
        </p>
        <Link
          href="/admin/cars"
          className="mt-6 border border-[#D8D3CB]/20 px-6 py-2.5 text-xs uppercase tracking-[0.18em] text-[#F7F5F0] transition-colors hover:border-[#F7F5F0] hover:bg-[#F7F5F0]/5"
        >
          Return to Inventory
        </Link>
      </main>
    )
  }

  const lifecycleStates = ['Draft', 'Available', 'Reserved', 'Sold', 'Archived']

  return (
    <main className="min-h-screen text-[#F7F5F0] antialiased">
      {/* Editorial Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <Link
          href="/admin/cars"
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#6B6B6B] transition-colors hover:text-[#F7F5F0]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Inventory Catalog</span>
        </Link>
      </nav>

      {/* Header Section */}
      <header className="mt-6 flex flex-col justify-between gap-6 border-b border-[#D8D3CB]/15 pb-8 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
              Dossier Specification
            </span>
            <span className="text-[#D8D3CB]/20">/</span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#E7E0D4]/70">
              {v.id}
            </span>
          </div>
          <h1 className="mt-2 font-serif text-4xl font-light tracking-tight text-[#F7F5F0] sm:text-6xl md:text-7xl">
            {v.brand} <span className="font-normal text-[#E7E0D4]">{v.model}</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="group inline-flex items-center justify-center gap-2.5 bg-[#F7F5F0] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111] transition-all duration-200 hover:bg-[#E7E0D4] hover:shadow-[0_0_25px_rgba(231,224,212,0.15)] active:scale-[0.98]"
          >
            <Save className="h-4 w-4 stroke-[2] transition-transform duration-200 group-hover:scale-110" />
            <span>Save Changes</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] xl:gap-12">
        <div className="space-y-8">
          {/* Section 01: Identity */}
          <section className="border border-[#D8D3CB]/15 bg-[#111111]/40 p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-[#D8D3CB]/10 pb-5">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#6B6B6B]">
                  01 / Identity & Core Specs
                </p>
                <h2 className="mt-1 font-serif text-2xl font-light tracking-tight text-[#F7F5F0]">
                  Vehicle Details
                </h2>
              </div>
              <span className="border border-[#D8D3CB]/20 bg-[#F7F5F0]/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E7E0D4]">
                {v.status}
              </span>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:gap-6">
              <Field label="Brand" value={v.brand} />
              <Field label="Model" value={v.model} />
              <Field label="Variant" value={v.variant} />
              <Field label="Manufacturing Year" value={String(v.year)} />
              <Field label="Registration Year" value={String(v.registrationYear)} />
              <Field label="Kilometres" value={String(v.kilometres)} />
              <Field label="Price" value={String(v.price)} />
              <Field label="Ownership" value={v.ownership} />
              <Field label="Fuel Type" value={v.fuel} />
              <Field label="Transmission" value={v.transmission} />
              <Field label="Body Type" value={v.body} />
              <Field label="Exterior Colour" value={v.colour} />
            </div>
          </section>

          {/* Section 02: Description */}
          <section className="border border-[#D8D3CB]/15 bg-[#111111]/40 p-6 sm:p-8 backdrop-blur-sm">
            <div className="border-b border-[#D8D3CB]/10 pb-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#6B6B6B]">
                02 / Vehicle Narrative
              </p>
              <h2 className="mt-1 font-serif text-2xl font-light tracking-tight text-[#F7F5F0]">
                Editorial Description
              </h2>
            </div>
            <div className="mt-6">
              <textarea
                defaultValue={v.description}
                rows={6}
                className="w-full border border-[#D8D3CB]/15 bg-[#111111] p-4 font-sans text-sm leading-relaxed text-[#F7F5F0] placeholder-[#6B6B6B] transition-colors duration-200 outline-none focus:border-[#E7E0D4] focus:ring-1 focus:ring-[#E7E0D4]/20"
                placeholder="Detail vehicle condition, certified check highlights, and ownership history..."
              />
            </div>
          </section>

          {/* Section 03: Media */}
          <section className="border border-[#D8D3CB]/15 bg-[#111111]/40 p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-[#D8D3CB]/10 pb-5">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#6B6B6B]">
                  03 / Media Dossier
                </p>
                <h2 className="mt-1 font-serif text-2xl font-light tracking-tight text-[#F7F5F0]">
                  Vehicle Gallery
                </h2>
              </div>
              <button
                type="button"
                className="group flex items-center gap-2 border border-[#D8D3CB]/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-[#F7F5F0] transition-colors hover:border-[#F7F5F0] hover:bg-[#F7F5F0]/5"
              >
                <Upload className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span>Upload</span>
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {v.images.map((x, i) => (
                <div
                  key={x}
                  className="group relative aspect-[4/3] overflow-hidden border border-[#D8D3CB]/15 bg-black/40"
                >
                  <img
                    src={x}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-all duration-500 will-change-transform group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                  <span className="absolute bottom-2.5 left-2.5 border border-white/10 bg-[#111111]/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#E7E0D4] backdrop-blur-xs">
                    {i === 0 ? 'Primary Cover' : `Plate 0${i + 1}`}
                  </span>
                </div>
              ))}

              <button
                type="button"
                className="flex aspect-[4/3] flex-col items-center justify-center gap-2 border border-dashed border-[#D8D3CB]/20 bg-[#F7F5F0]/[0.01] p-4 text-[#6B6B6B] transition-all duration-200 hover:border-[#E7E0D4]/60 hover:bg-[#F7F5F0]/[0.03] hover:text-[#F7F5F0]"
              >
                <ImagePlus className="h-5 w-5 stroke-[1.5]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.16em]">
                  Append View
                </span>
              </button>
            </div>
          </section>

          {/* Section 04: Publishing */}
          <section className="border border-[#D8D3CB]/15 bg-[#111111]/40 p-6 sm:p-8 backdrop-blur-sm">
            <div className="border-b border-[#D8D3CB]/10 pb-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#6B6B6B]">
                04 / Lifecycle Status
              </p>
              <h2 className="mt-1 font-serif text-2xl font-light tracking-tight text-[#F7F5F0]">
                Publishing Visibility
              </h2>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {lifecycleStates.map(x => {
                const isActive = v.status === x
                return (
                  <button
                    key={x}
                    type="button"
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200 ${
                      isActive
                        ? 'border border-[#F7F5F0] bg-[#F7F5F0] text-[#111111] shadow-[0_0_20px_rgba(247,245,240,0.15)]'
                        : 'border border-[#D8D3CB]/15 bg-[#111111] text-[#6B6B6B] hover:border-[#D8D3CB]/40 hover:text-[#F7F5F0]'
                    }`}
                  >
                    {isActive && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
                    {x}
                  </button>
                )
              })}
            </div>
          </section>
        </div>

        {/* Aside Dossier Preview */}
        <aside className="h-fit border border-[#D8D3CB]/15 bg-[#111111]/60 p-6 backdrop-blur-md lg:sticky lg:top-24">
          <div className="flex items-center justify-between border-b border-[#D8D3CB]/10 pb-4">
            <div className="flex items-center gap-2">
              <Eye className="h-3.5 w-3.5 text-[#6B6B6B]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]">
                Live Showcase Card
              </p>
            </div>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500/80" />
          </div>

          <div className="mt-5 aspect-[4/3] overflow-hidden border border-[#D8D3CB]/10 bg-black/40">
            <img
              src={v.images[0]}
              alt={`${v.brand} ${v.model}`}
              className="h-full w-full object-cover transition-transform duration-700 will-change-transform hover:scale-105"
            />
          </div>

          <div className="mt-5 border-b border-[#D8D3CB]/10 pb-5">
            <div className="flex items-baseline justify-between">
              <p className="font-serif text-xl font-light tracking-tight text-[#F7F5F0]">
                {v.brand} <span className="text-[#E7E0D4]">{v.model}</span>
              </p>
              <span className="text-xs font-semibold text-[#E7E0D4]">
                {v.year}
              </span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-wider text-[#6B6B6B]">
              {v.variant}
            </p>
          </div>

          <div className="mt-5 space-y-3 text-xs leading-relaxed text-[#6B6B6B]">
            <div className="flex items-start gap-2.5">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E7E0D4]" />
              <p>
                Status changes propagate instantly to the catalog index and dynamic vehicle dossier routes.
              </p>
            </div>
            <p className="text-[11px] border-t border-[#D8D3CB]/10 pt-3 text-[#6B6B6B]/80">
              Active state enables lead intake via WhatsApp, direct telephony, and authenticated reservation workflows.
            </p>
          </div>
        </aside>
      </div>
    </main>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="group block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B6B6B] transition-colors group-focus-within:text-[#E7E0D4]">
        {label}
      </span>
      <input
        defaultValue={value}
        className="w-full border border-[#D8D3CB]/15 bg-[#111111] px-4 py-3 text-sm tracking-wide text-[#F7F5F0] transition-colors duration-200 outline-none placeholder-[#6B6B6B] focus:border-[#E7E0D4] focus:ring-1 focus:ring-[#E7E0D4]/20"
      />
    </label>
  )
}