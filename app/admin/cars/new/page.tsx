import Link from 'next/link'
import { ArrowLeft, Check, ImagePlus, Save, ShieldAlert } from 'lucide-react'

export default function NewCar() {
  const lifecycleStates = ['Draft', 'Available', 'Reserved', 'Sold', 'Archived']

  return (
    <main className="min-h-screen text-[#F7F5F0] antialiased">
      {/* Editorial Navigation */}
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
      <header className="mt-6 border-b border-[#D8D3CB]/15 pb-8">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
            CMS Pipeline
          </span>
          <span className="text-[#D8D3CB]/20">/</span>
          <span className="text-xs uppercase tracking-wider text-[#E7E0D4]/70">
            Intake Workflow
          </span>
        </div>
        <h1 className="mt-3 font-serif text-4xl font-light tracking-tight text-[#F7F5F0] sm:text-6xl md:text-7xl">
          Add a vehicle<span className="text-[#E7E0D4]">.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-xs sm:text-sm font-normal leading-relaxed text-[#6B6B6B]">
          This staged V1 form mirrors the final CMS workflow. Inputs are presentation-ready and can be wired directly to the backend schema later.
        </p>
      </header>

      {/* Structured Intake Form */}
      <div className="mt-8 max-w-4xl space-y-8">
        {/* Section 01: Basic Details */}
        <section className="border border-[#D8D3CB]/15 bg-[#111111]/40 p-6 sm:p-8 backdrop-blur-sm">
          <div className="border-b border-[#D8D3CB]/10 pb-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#6B6B6B]">
              01 / Vehicle Identity
            </p>
            <h2 className="mt-1 font-serif text-2xl font-light tracking-tight text-[#F7F5F0]">
              Basic Details
            </h2>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:gap-6">
            <Field label="Brand" placeholder="e.g. BMW" />
            <Field label="Model" placeholder="e.g. 3 Series" />
            <Field label="Variant" placeholder="e.g. 330i M Sport" />
            <Field label="Manufacturing year" placeholder="2022" />
            <Field label="Registration year" placeholder="2022" />
            <Field label="Price" placeholder="₹ 00,00,000" />
            <Field label="Kilometres" placeholder="28,400" />
            <Field label="Location" placeholder="Showroom location" />
          </div>
        </section>

        {/* Section 02: Specification */}
        <section className="border border-[#D8D3CB]/15 bg-[#111111]/40 p-6 sm:p-8 backdrop-blur-sm">
          <div className="border-b border-[#D8D3CB]/10 pb-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#6B6B6B]">
              02 / Engineering & Provenance
            </p>
            <h2 className="mt-1 font-serif text-2xl font-light tracking-tight text-[#F7F5F0]">
              Technical Specification
            </h2>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:gap-6">
            <Field label="Fuel" placeholder="Petrol / Diesel / EV" />
            <Field label="Transmission" placeholder="Automatic / Manual" />
            <Field label="Body type" placeholder="SUV / Sedan" />
            <Field label="Colour" placeholder="Colour" />
            <Field label="Ownership" placeholder="1st Owner" />
            <Field label="Engine / power" placeholder="2.0L / 190 bhp" />
          </div>
        </section>

        {/* Section 03: Media */}
        <section className="border border-[#D8D3CB]/15 bg-[#111111]/40 p-6 sm:p-8 backdrop-blur-sm">
          <div className="border-b border-[#D8D3CB]/10 pb-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#6B6B6B]">
              03 / Visual Dossier
            </p>
            <h2 className="mt-1 font-serif text-2xl font-light tracking-tight text-[#F7F5F0]">
              Showroom Media
            </h2>
          </div>
          <div className="group mt-6 flex min-h-56 cursor-pointer items-center justify-center border border-dashed border-[#D8D3CB]/20 bg-[#F7F5F0]/[0.01] p-6 transition-all duration-200 hover:border-[#E7E0D4]/60 hover:bg-[#F7F5F0]/[0.03]">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#D8D3CB]/20 bg-[#111111] transition-transform duration-200 group-hover:scale-105">
                <ImagePlus className="h-5 w-5 stroke-[1.5] text-[#E7E0D4]" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#F7F5F0]">
                Drop vehicle imagery or click to browse
              </p>
              <p className="mt-1.5 text-[11px] uppercase tracking-wider text-[#6B6B6B]">
                Cover image · exterior · interior · dashboard · wheels
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Lifecycle State & Rules */}
        <div className="border border-[#D8D3CB]/15 bg-[#111111]/40 p-6 sm:p-8 backdrop-blur-sm">
          <div className="border-b border-[#D8D3CB]/10 pb-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#6B6B6B]">
              04 / Initial State
            </p>
            <h2 className="mt-1 font-serif text-2xl font-light tracking-tight text-[#F7F5F0]">
              Lifecycle Target
            </h2>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {lifecycleStates.map((x, i) => (
              <span
                key={x}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200 ${
                  i === 0
                    ? 'border border-[#F7F5F0] bg-[#F7F5F0] text-[#111111] shadow-[0_0_20px_rgba(247,245,240,0.12)]'
                    : 'border border-[#D8D3CB]/15 bg-[#111111] text-[#6B6B6B]'
                }`}
              >
                {i === 0 && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
                {x}
              </span>
            ))}
          </div>
        </div>

        {/* Section 05: Action Bar */}
        <section className="flex flex-col justify-between gap-5 border border-[#D8D3CB]/15 bg-[#111111]/60 p-6 sm:flex-row sm:items-center backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-3.5 w-3.5 text-[#E7E0D4]" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F7F5F0]">
                Save as draft
              </p>
            </div>
            <p className="text-xs text-[#6B6B6B]">
              Publishing remains a deliberate separate step.
            </p>
          </div>
          <button
            type="button"
            className="group inline-flex items-center justify-center gap-2.5 bg-[#F7F5F0] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111] transition-all duration-200 hover:bg-[#E7E0D4] hover:shadow-[0_0_25px_rgba(231,224,212,0.15)] active:scale-[0.98]"
          >
            <Save className="h-4 w-4 stroke-[2] transition-transform duration-200 group-hover:scale-110" />
            <span>Save draft</span>
          </button>
        </section>
      </div>
    </main>
  )
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="group block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B6B6B] transition-colors group-focus-within:text-[#E7E0D4]">
        {label}
      </span>
      <input
        placeholder={placeholder}
        className="w-full border border-[#D8D3CB]/15 bg-[#111111] px-4 py-3 text-sm tracking-wide text-[#F7F5F0] transition-colors duration-200 outline-none placeholder-[#6B6B6B]/40 focus:border-[#E7E0D4] focus:ring-1 focus:ring-[#E7E0D4]/20"
      />
    </label>
  )
}