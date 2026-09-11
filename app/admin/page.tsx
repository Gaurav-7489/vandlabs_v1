'use client'

import Link from 'next/link'
import { Plus, ArrowUpRight, Eye } from 'lucide-react'
import { vehicles, formatINR } from '@/lib/data'

export default function AdminPage() {
  const availableCount = vehicles.filter((v) => v.status === 'Available').length
  const reservedCount = vehicles.filter((v) => v.status === 'Reserved').length
  const totalValuation = vehicles.reduce((sum, v) => sum + v.price, 0)

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 antialiased">
      {/* Title & Action Header */}
      <div className="flex flex-col justify-between gap-5 border-b border-[#D8D3CB]/15 pb-6 sm:flex-row sm:items-end sm:pb-8">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
            Showroom Control Center
          </span>
          <h1 className="mt-2 font-serif text-3xl font-light tracking-tight text-[#F7F5F0] sm:text-5xl md:text-6xl">
            Fleet Command<span className="text-[#E7E0D4]">.</span>
          </h1>
        </div>

        <Link
          href="/admin/cars/new"
          className="group inline-flex items-center justify-center gap-2.5 bg-[#F7F5F0] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#111111] transition-all duration-200 hover:bg-[#E7E0D4] hover:shadow-[0_0_20px_rgba(231,224,212,0.15)] active:scale-95"
        >
          <Plus className="h-4 w-4 stroke-[2.2] transition-transform duration-200 group-hover:rotate-90" />
          <span>Add Vehicle Record</span>
        </Link>
      </div>

      {/* High-Level Metric Tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="border border-[#D8D3CB]/15 bg-[#111111]/40 p-5 backdrop-blur-sm sm:p-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]">
            Live Available Inventory
          </span>
          <div className="mt-3 font-serif text-3xl font-light text-[#F7F5F0] sm:text-4xl">
            {availableCount}
          </div>
          <p className="mt-1.5 text-xs text-[#6B6B6B]">Unrestricted public visibility</p>
        </div>

        <div className="border border-[#D8D3CB]/15 bg-[#111111]/40 p-5 backdrop-blur-sm sm:p-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]">
            Held / Reserved Units
          </span>
          <div className="mt-3 font-serif text-3xl font-light text-[#F7F5F0] sm:text-4xl">
            {reservedCount}
          </div>
          <p className="mt-1.5 text-xs text-[#6B6B6B]">Active customer deposits held</p>
        </div>

        <div className="border border-[#D8D3CB]/15 bg-[#111111]/40 p-5 backdrop-blur-sm sm:col-span-2 sm:p-6 lg:col-span-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]">
            Active Showroom Valuation
          </span>
          <div className="mt-3 font-serif text-2xl font-light text-[#F7F5F0] sm:text-3xl lg:text-4xl">
            {formatINR(totalValuation)}
          </div>
          <p className="mt-1.5 text-xs text-[#6B6B6B]">Combined live inventory asset total</p>
        </div>
      </div>

      {/* Inventory Table & Administrative Workflow */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Active Fleet Ledger */}
        <div className="border border-[#D8D3CB]/15 bg-[#111111]/40 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-[#D8D3CB]/10 p-5">
            <div>
              <h3 className="font-serif text-xl font-light text-[#F7F5F0] sm:text-2xl">
                Published Inventory
              </h3>
              <p className="mt-0.5 text-xs text-[#6B6B6B]">
                Manage state, update pricing, or edit dossiers
              </p>
            </div>
            <Link
              href="/admin/cars"
              className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-[#6B6B6B] transition-colors hover:text-[#F7F5F0]"
            >
              <span>Full Table</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#D8D3CB]/10">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="flex flex-col justify-between gap-4 p-4 transition-colors hover:bg-[#F7F5F0]/[0.02] sm:flex-row sm:items-center sm:p-5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#6B6B6B]">
                      {v.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] ${
                        v.status === 'Available'
                          ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border border-amber-500/30 bg-amber-500/10 text-amber-300'
                      }`}
                    >
                      {v.status}
                    </span>
                  </div>
                  <h4 className="mt-1 text-sm font-semibold text-[#F7F5F0]">
                    {v.brand} {v.model} <span className="font-normal text-[#E7E0D4]/80">{v.variant}</span>
                  </h4>
                  <p className="mt-0.5 text-xs text-[#6B6B6B]">
                    {v.year} · {v.kilometres.toLocaleString('en-IN')} km · {v.fuel}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-5 sm:justify-end">
                  <div className="sm:text-right">
                    <p className="font-mono text-sm font-medium tracking-tight text-[#F7F5F0]">
                      {formatINR(v.price)}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-[#6B6B6B]">{v.ownership}</p>
                  </div>

                  <Link
                    href={`/cars/${v.slug}`}
                    target="_blank"
                    className="flex h-9 w-9 items-center justify-center border border-[#D8D3CB]/20 text-[#6B6B6B] transition-colors hover:border-[#F7F5F0] hover:text-[#F7F5F0]"
                    title="Inspect Public Dossier"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow & Policy Guidance */}
        <div className="border border-[#D8D3CB]/20 bg-[#E7E0D4] p-6 text-[#111111] sm:p-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
            Administrative SOP
          </span>
          <h3 className="mt-2 font-serif text-2xl font-light tracking-tight sm:text-3xl">
            Publishing Standard
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-[#6B6B6B]">
            Before toggling any vehicle record to <strong>Available</strong>, confirm that the physical 150-point inspection check has been signed by the workshop lead and registration docs are verified[cite: 1].
          </p>

          <div className="mt-6 space-y-4">
            {[
              { title: 'Draft Record Creation', desc: 'Input VIN, variants, and complete technical specifications.' },
              { title: 'High-Res Asset Upload', desc: 'Add minimum 3 studio images with primary angle selection.' },
              { title: 'Verification Audit', desc: 'Confirm insurance validity dates and RC clearance.' },
              { title: 'Publication & Escrow', desc: 'Live in public index with immediate lead routing.' },
            ].map((step, idx) => (
              <div
                key={step.title}
                className="border-t border-[#111111]/15 pt-3"
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-semibold text-[#111111]">{step.title}</h5>
                  <span className="font-mono text-[10px] text-[#6B6B6B]">0{idx + 1}</span>
                </div>
                <p className="mt-1 text-[11px] leading-normal text-[#6B6B6B]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}