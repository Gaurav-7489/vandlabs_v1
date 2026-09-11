import Link from 'next/link'
import { Plus, Search, ArrowUpRight, SlidersHorizontal } from 'lucide-react'
import { vehicles, formatINR } from '@/lib/data'

export default function AdminCars() {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
      case 'reserved':
        return 'border-amber-500/30 bg-amber-500/10 text-amber-300'
      case 'sold':
        return 'border-[#D8D3CB]/20 bg-[#F7F5F0]/5 text-[#6B6B6B]'
      default:
        return 'border-[#D8D3CB]/20 bg-transparent text-[#E7E0D4]'
    }
  }

  return (
    <main className="min-h-screen text-[#F7F5F0] antialiased">
      {/* Header Section */}
      <header className="flex flex-col justify-between gap-6 border-b border-[#D8D3CB]/15 pb-8 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
              Showroom CMS
            </span>
            <span className="text-[#D8D3CB]/20">/</span>
            <span className="text-xs uppercase tracking-wider text-[#E7E0D4]/70">
              Live Stock
            </span>
          </div>
          <h1 className="mt-3 font-serif text-4xl font-light tracking-tight text-[#F7F5F0] sm:text-6xl md:text-7xl">
            Inventory<span className="text-[#E7E0D4]">.</span>
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#6B6B6B]">
            {vehicles.length} curated vehicles registered
          </p>
        </div>

        <Link
          href="/admin/cars/new"
          className="group inline-flex items-center justify-center gap-2.5 bg-[#F7F5F0] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111] transition-all duration-200 hover:bg-[#E7E0D4] hover:shadow-[0_0_25px_rgba(231,224,212,0.15)] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4 stroke-[2.2] transition-transform duration-200 group-hover:rotate-90" />
          <span>Add vehicle</span>
        </Link>
      </header>

      {/* Structured Inventory Table Frame */}
      <div className="mt-8 border border-[#D8D3CB]/15 bg-[#111111]/40 backdrop-blur-sm">
        {/* Filter Controls Bar */}
        <div className="flex flex-col gap-3 border-b border-[#D8D3CB]/10 p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="group flex flex-1 items-center border border-[#D8D3CB]/15 bg-[#111111] px-4 transition-colors focus-within:border-[#E7E0D4] focus-within:ring-1 focus-within:ring-[#E7E0D4]/20">
            <Search className="h-4 w-4 text-[#6B6B6B] transition-colors group-focus-within:text-[#E7E0D4]" />
            <input
              placeholder="Search inventory by brand, model, or ID..."
              className="w-full bg-transparent px-3 py-3 text-sm tracking-wide text-[#F7F5F0] outline-none placeholder:text-[#6B6B6B]/50"
            />
          </div>

          <div className="relative flex items-center">
            <select className="w-full appearance-none border border-[#D8D3CB]/15 bg-[#111111] py-3 pl-4 pr-10 text-xs font-medium uppercase tracking-[0.14em] text-[#F7F5F0] outline-none transition-colors hover:border-[#D8D3CB]/40 focus:border-[#E7E0D4] sm:w-auto">
              <option className="bg-[#111111] text-[#F7F5F0]">All statuses</option>
              <option className="bg-[#111111] text-[#F7F5F0]">Available</option>
              <option className="bg-[#111111] text-[#F7F5F0]">Reserved</option>
              <option className="bg-[#111111] text-[#F7F5F0]">Sold</option>
            </select>
            <SlidersHorizontal className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-[#6B6B6B]" />
          </div>
        </div>

        {/* Desktop Table Headers */}
        <div className="hidden grid-cols-[1fr_120px_160px_140px_40px] items-center border-b border-[#D8D3CB]/10 bg-[#F7F5F0]/[0.02] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B] md:grid">
          <span>Vehicle Spec</span>
          <span>Build Year</span>
          <span>Valuation</span>
          <span>Status</span>
          <span className="text-right">Link</span>
        </div>

        {/* Dynamic Records Rows */}
        <div className="divide-y divide-[#D8D3CB]/10">
          {vehicles.map(v => (
            <Link
              href={`/admin/cars/${v.id}`}
              key={v.id}
              className="group grid grid-cols-1 gap-3 p-5 transition-colors duration-150 hover:bg-[#F7F5F0]/[0.03] md:grid-cols-[1fr_120px_160px_140px_40px] md:items-center md:px-6 md:py-4"
            >
              <div>
                <p className="font-serif text-base font-normal tracking-tight text-[#F7F5F0] transition-colors group-hover:text-[#E7E0D4]">
                  {v.brand} {v.model}
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-[#6B6B6B]">
                  {v.variant} <span className="text-[#D8D3CB]/20">·</span> <span className="font-mono text-[10px] text-[#6B6B6B]/80">{v.id}</span>
                </p>
              </div>

              <div className="text-xs font-mono text-[#6B6B6B] md:text-sm">
                <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B] md:hidden">Year: </span>
                {v.year}
              </div>

              <div className="font-mono text-sm font-medium tracking-tight text-[#F7F5F0]">
                {formatINR(v.price)}
              </div>

              <div>
                <span
                  className={`inline-block border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${getStatusStyle(
                    v.status
                  )}`}
                >
                  {v.status}
                </span>
              </div>

              <div className="hidden text-right md:block">
                <ArrowUpRight className="inline-block h-4 w-4 text-[#6B6B6B] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F7F5F0]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}