'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Gauge, Fuel, Cog } from 'lucide-react'
import type { Vehicle } from '@/lib/data'
import { formatINR } from '@/lib/data'

export default function VehicleCard({ v }: { v: Vehicle }) {
  const isAvailable = v.status === 'Available'

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full w-full flex-col border border-[#D8D3CB] bg-[#F7F5F0] transition-colors duration-200 hover:border-[#111111]"
    >
      <Link href={`/cars/${v.slug}`} className="flex h-full flex-col">
        {/* Cover Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E7E0D4]/50">
          <Image
            src={v.images[0]}
            alt={`${v.brand} ${v.model} ${v.variant}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-60" />

          {/* Status Badge */}
          <div className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3">
            <span
              className={`inline-block px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] sm:px-2.5 sm:py-1 sm:text-[10px] ${
                isAvailable
                  ? 'bg-[#111111] text-[#F7F5F0]'
                  : 'border border-[#111111]/20 bg-[#E7E0D4] text-[#111111]'
              }`}
            >
              {v.status}
            </span>
          </div>

          {/* Location Badge */}
          {v.location && (
            <div className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3">
              <span className="border border-[#D8D3CB]/60 bg-[#F7F5F0]/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#111111] backdrop-blur-xs">
                {v.location}
              </span>
            </div>
          )}
        </div>

        {/* Identity & Valuation Block */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#6B6B6B]">
                {v.year} · {v.ownership}
              </p>
              <h3 className="mt-1 font-serif text-lg font-normal tracking-tight text-[#111111] transition-colors group-hover:text-black sm:text-xl">
                {v.brand} {v.model}
              </h3>
              <p className="mt-0.5 truncate text-[11px] font-normal uppercase tracking-wider text-[#6B6B6B]">
                {v.variant}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <div className="font-mono text-base font-semibold tracking-tight text-[#111111] sm:text-lg">
                {formatINR(v.price)}
              </div>
              {v.originalPrice && (
                <div className="font-mono text-[11px] text-[#6B6B6B] line-through">
                  {formatINR(v.originalPrice)}
                </div>
              )}
            </div>
          </div>

          {/* Technical Specs Strip */}
          <div className="mt-4 grid grid-cols-3 items-center gap-1 border-t border-[#D8D3CB]/60 pt-3 text-[10px] text-[#6B6B6B] sm:text-[11px]">
            <div className="flex min-w-0 items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 shrink-0 text-[#111111]" />
              <span className="truncate font-mono font-medium text-[#111111]">
                {v.kilometres.toLocaleString('en-IN')} km
              </span>
            </div>
            <div className="flex min-w-0 items-center justify-center gap-1.5">
              <Fuel className="h-3.5 w-3.5 shrink-0 text-[#111111]" />
              <span className="truncate">{v.fuel}</span>
            </div>
            <div className="flex min-w-0 items-center justify-end gap-1.5">
              <Cog className="h-3.5 w-3.5 shrink-0 text-[#111111]" />
              <span className="truncate">{v.transmission}</span>
            </div>
          </div>
        </div>

        {/* Dossier Footer Action */}
        <div className="mt-auto flex items-center justify-between border-t border-[#D8D3CB] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#111111] transition-colors duration-200 group-hover:bg-[#111111] group-hover:text-[#F7F5F0] sm:px-5 sm:text-[11px]">
          <span>View Dossier</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  )
}