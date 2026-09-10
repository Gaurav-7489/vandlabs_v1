'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import VehicleCard from './VehicleCard'
import type { Vehicle } from '@/lib/data'

interface FeaturedRailProps {
  cars: Vehicle[]
  title?: string
  eyebrow?: string
}

export default function FeaturedRail({
  cars,
  eyebrow = 'Curated Inventory',
  title = 'Featured Acquisitions',
}: FeaturedRailProps) {
  const railRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(1)

  const updateScrollState = useCallback(() => {
    const el = railRef.current
    if (!el) return

    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 12)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 12)

    // Calculate approximate active vehicle index for Swiss-style counter
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 24
      : 360
    const currentIndex = Math.min(
      Math.max(1, Math.round(scrollLeft / cardWidth) + 1),
      cars.length
    )
    setActiveIndex(currentIndex)
  }, [cars.length])

  useEffect(() => {
    const el = railRef.current
    if (!el) return

    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const scrollByDirection = (direction: 'left' | 'right') => {
    const el = railRef.current
    if (!el) return

    const scrollAmount = el.clientWidth * 0.75
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  if (!cars || cars.length === 0) return null

  return (
    <section className="w-full border-b border-[#D8D3CB] bg-[#F7F5F0] py-16 md:py-24">
      {/* Editorial Header & Manual Slide Controls */}
      <div className="mx-auto mb-10 flex max-w-7xl items-end justify-between px-6 lg:px-12">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
            {eyebrow}
          </span>
          <h2 className="mt-2 text-2xl font-medium tracking-tight text-[#111111] sm:text-3xl lg:text-4xl">
            {title}
          </h2>
        </div>

        {/* Index counter and architectural navigation triggers */}
        <div className="flex items-center gap-6">
          <div className="hidden font-mono text-xs text-[#6B6B6B] sm:block">
            <span className="font-semibold text-[#111111]">
              {String(activeIndex).padStart(2, '0')}
            </span>
            <span className="mx-1 text-[#D8D3CB]">/</span>
            <span>{String(cars.length).padStart(2, '0')}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByDirection('left')}
              disabled={!canScrollLeft}
              aria-label="Previous vehicles"
              className="group flex h-11 w-11 items-center justify-center border border-[#D8D3CB] bg-transparent text-[#111111] transition-all hover:border-[#111111] hover:bg-[#111111] hover:text-[#F7F5F0] disabled:cursor-not-allowed disabled:border-[#D8D3CB]/40 disabled:text-[#6B6B6B]/30 disabled:hover:bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={() => scrollByDirection('right')}
              disabled={!canScrollRight}
              aria-label="Next vehicles"
              className="group flex h-11 w-11 items-center justify-center border border-[#D8D3CB] bg-transparent text-[#111111] transition-all hover:border-[#111111] hover:bg-[#111111] hover:text-[#F7F5F0] disabled:cursor-not-allowed disabled:border-[#D8D3CB]/40 disabled:text-[#6B6B6B]/30 disabled:hover:bg-transparent"
            >
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 pt-2 scrollbar-none lg:px-12"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {cars.map((car, index) => (
          <motion.div
            key={car.id}
            className="w-[84vw] flex-none snap-start sm:w-[50vw] md:w-[42vw] lg:w-[31vw] xl:w-[26vw]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.45,
              delay: Math.min(index * 0.05, 0.3),
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <VehicleCard v={car} />
          </motion.div>
        ))}

        {/* Trailing edge spacer for snap margin consistency */}
        <div className="w-2 flex-none shrink-0" aria-hidden="true" />
      </div>

      {/* Mobile-only Progress Ticker */}
      <div className="mt-4 flex items-center justify-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B] sm:hidden">
        <span className="font-semibold text-[#111111]">
          {String(activeIndex).padStart(2, '0')}
        </span>
        <span className="text-[#D8D3CB]">/</span>
        <span>{String(cars.length).padStart(2, '0')}</span>
      </div>
    </section>
  )
}