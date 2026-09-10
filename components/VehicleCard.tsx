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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative flex flex-col border border-[#D8D3CB] bg-[#F7F5F0] transition-colors duration-300 hover:border-[#111111]"
    >
      <Link href={`/cars/${v.slug}`} className="flex flex-col h-full">
        {/* Cover Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E7E0D4]">
          <Image
            src={v.images[0]}
            alt={`${v.brand} ${v.model} ${v.variant}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Status Badge */}
          <div className="absolute left-3 top-3">
            <span
              className={`inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                isAvailable
                  ? 'bg-[#111111] text-[#F7F5F0]'
                  : 'bg-[#E7E0D4] text-[#111111] border border-[#111111]/20'
              }`}
            >
              {v.status}
            </span>
          </div>

          {/* Quick Location Pin Tag */}
          <div className="absolute right-3 top-3">
            <span className="bg-[#F7F5F0]/90 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-[#111111] backdrop-blur-xs">
              {v.location}
            </span>
          </div>
        </div>

        {/* Identity & Pricing Header */}
        <div className="p-5 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">
                {v.year} · {v.ownership}
              </p>
              <h3 className="font-editorial mt-1 text-xl font-semibold tracking-tight text-[#111111]">
                {v.brand} {v.model}
              </h3>
              <p className="mt-0.5 text-xs text-[#6B6B6B] truncate max-w-[220px]">
                {v.variant}
              </p>
            </div>

            <div className="text-right">
              <div className="font-mono-num text-lg font-bold tracking-tight text-[#111111]">
                {formatINR(v.price)}
              </div>
              {v.originalPrice && (
                <div className="font-mono-num text-xs text-[#6B6B6B] line-through">
                  {formatINR(v.originalPrice)}
                </div>
              )}
            </div>
          </div>

          {/* Technical Specs Strip */}
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#D8D3CB]/60 pt-3 text-[11px] text-[#6B6B6B]">
            <div className="flex items-center gap-1.5">
              <Gauge className="h-3 w-3 text-[#111111]" />
              <span className="font-mono-num font-medium text-[#111111]">
                {v.kilometres.toLocaleString('en-IN')} km
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="h-3 w-3 text-[#111111]" />
              <span>{v.fuel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cog className="h-3 w-3 text-[#111111]" />
              <span>{v.transmission}</span>
            </div>
          </div>
        </div>

        {/* Dossier Footer Action */}
        <div className="mt-auto flex items-center justify-between border-t border-[#D8D3CB] px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-semibold text-[#111111] transition-colors group-hover:bg-[#111111] group-hover:text-[#F7F5F0]">
          <span>View Dossier</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>
    </motion.div>
  )
}