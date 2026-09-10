'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Clock,
  Car,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react'
import { vehicles, formatINR } from '@/lib/data'

export default function AdminPage() {
  const availableCount = vehicles.filter((v) => v.status === 'Available').length
  const reservedCount = vehicles.filter((v) => v.status === 'Reserved').length
  const totalValuation = vehicles.reduce((sum, v) => sum + v.price, 0)

  return (
    <div className="min-h-screen bg-[#111111] text-[#F7F5F0] antialiased">
      {/* Top Admin Status Header */}
      <header className="border-b border-white/10 px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-xl font-bold tracking-tight text-[#F7F5F0]">
              VAND<span className="text-white/40">/</span>LABS
            </span>
            <span className="border border-white/20 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-white/60">
              CMS Operations
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs uppercase tracking-[0.14em] text-white/60 hover:text-white"
            >
              Public Showroom
            </Link>
            <div className="h-3.5 w-px bg-white/20" />
            <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Auth: Root Admin
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] p-6 md:p-10">
        {/* Title Bar */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono-num text-[10px] uppercase tracking-[0.24em] text-white/40">
              Showroom Control Center
            </span>
            <h1 className="font-editorial mt-3 text-4xl font-normal tracking-tight md:text-6xl text-[#F7F5F0]">
              Fleet Command.
            </h1>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin/cars/new"
              className="inline-flex items-center gap-2 bg-[#F7F5F0] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#111111] transition-transform active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Add Vehicle Record</span>
            </Link>
          </div>
        </div>

        {/* High-Level Metric Tiles */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="border border-white/10 bg-white/[0.02] p-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              Live Available Inventory
            </span>
            <div className="font-mono-num font-editorial mt-3 text-4xl font-semibold text-[#F7F5F0]">
              {availableCount}
            </div>
            <p className="mt-2 text-xs text-white/50">Unrestricted public visibility</p>
          </div>

          <div className="border border-white/10 bg-white/[0.02] p-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              Held / Reserved Units
            </span>
            <div className="font-mono-num font-editorial mt-3 text-4xl font-semibold text-[#F7F5F0]">
              {reservedCount}
            </div>
            <p className="mt-2 text-xs text-white/50">Active customer deposits held</p>
          </div>

          <div className="border border-white/10 bg-white/[0.02] p-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              Active Showroom Valuation
            </span>
            <div className="font-mono-num font-editorial mt-3 text-4xl font-semibold text-[#F7F5F0]">
              {formatINR(totalValuation)}
            </div>
            <p className="mt-2 text-xs text-white/50">Combined live inventory asset total</p>
          </div>
        </div>

        {/* Inventory Table & Administrative Workflow */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Active Fleet Ledger */}
          <div className="border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <h3 className="font-editorial text-2xl font-normal text-[#F7F5F0]">
                  Published Inventory
                </h3>
                <p className="mt-0.5 text-xs text-white/40">
                  Manage state, update pricing, or edit technical dossiers
                </p>
              </div>
              <Link
                href="/admin/cars"
                className="text-xs uppercase tracking-[0.14em] text-white/60 hover:text-white"
              >
                View Full Table
              </Link>
            </div>

            <div className="divide-y divide-white/10">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center hover:bg-white/[0.02] transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono-num text-[10px] text-white/40">
                        {v.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] ${
                          v.status === 'Available'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {v.status}
                      </span>
                    </div>
                    <h4 className="mt-1 text-sm font-semibold text-white">
                      {v.brand} {v.model} {v.variant}
                    </h4>
                    <p className="text-xs text-white/40">
                      {v.year} · {v.kilometres.toLocaleString('en-IN')} km · {v.fuel}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-6 sm:justify-end">
                    <div className="text-right">
                      <p className="font-mono-num text-sm font-bold text-white">
                        {formatINR(v.price)}
                      </p>
                      <p className="text-[10px] text-white/40">{v.ownership}</p>
                    </div>

                    <Link
                      href={`/cars/${v.slug}`}
                      target="_blank"
                      className="flex h-9 w-9 items-center justify-center border border-white/20 text-white hover:border-white transition-colors"
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
          <div className="border border-white/10 bg-[#E7E0D4] p-8 text-[#111111]">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#6B6B6B]">
              Administrative SOP
            </span>
            <h3 className="font-editorial mt-3 text-3xl font-medium tracking-tight">
              Publishing Standard
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-[#6B6B6B]">
              Before toggling any vehicle record to <strong>Available</strong>, confirm that the physical 150-point inspection check has been signed by the workshop lead and registration docs are verified[cite: 1].
            </p>

            <div className="mt-8 space-y-4">
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
                    <span className="font-mono-num text-[10px] text-[#6B6B6B]">0{idx + 1}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#6B6B6B]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}