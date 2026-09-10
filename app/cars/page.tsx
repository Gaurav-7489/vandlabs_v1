'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, Search, RotateCcw } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VehicleCard from '@/components/VehicleCard'
import Reveal from '@/components/Reveal'
import { vehicles } from '@/lib/data'

const BRANDS = ['All brands', ...Array.from(new Set(vehicles.map((v) => v.brand)))]
const FUELS = ['All fuel', 'Petrol', 'Diesel']
const TRANSMISSIONS = ['All transmission', 'Automatic', 'Manual']
const BODIES = ['All body', 'SUV', 'Sedan']
const SORTS = [
  'Newest added',
  'Price low-to-high',
  'Price high-to-low',
  'Newest year',
  'Lowest kilometres',
]

export default function CarsPage() {
  const [brand, setBrand] = useState('All brands')
  const [fuel, setFuel] = useState('All fuel')
  const [transmission, setTransmission] = useState('All transmission')
  const [body, setBody] = useState('All body')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('Newest added')
  const [mobileDrawer, setMobileDrawer] = useState(false)

  const filtered = useMemo(() => {
    let result = vehicles.filter((v) => {
      const matchBrand = brand === 'All brands' || v.brand === brand
      const matchFuel = fuel === 'All fuel' || v.fuel === fuel
      const matchTrans = transmission === 'All transmission' || v.transmission === transmission
      const matchBody = body === 'All body' || v.body === body
      const matchQuery = `${v.brand} ${v.model} ${v.variant} ${v.colour}`
        .toLowerCase()
        .includes(query.toLowerCase().trim())
      return matchBrand && matchFuel && matchTrans && matchBody && matchQuery
    })

    if (sort === 'Price low-to-high') result.sort((a, b) => a.price - b.price)
    if (sort === 'Price high-to-low') result.sort((a, b) => b.price - a.price)
    if (sort === 'Lowest kilometres') result.sort((a, b) => a.kilometres - b.kilometres)
    if (sort === 'Newest year') result.sort((a, b) => b.year - a.year)

    return result
  }, [brand, fuel, transmission, body, query, sort])

  const activeFilterCount = [
    brand !== 'All brands',
    fuel !== 'All fuel',
    transmission !== 'All transmission',
    body !== 'All body',
    Boolean(query),
  ].filter(Boolean).length

  const resetFilters = () => {
    setBrand('All brands')
    setFuel('All fuel')
    setTransmission('All transmission')
    setBody('All body')
    setQuery('')
  }

  const FilterPanel = () => (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[#D8D3CB]">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111111]">
            Vehicle Manufacturer
          </span>
          {brand !== 'All brands' && (
            <button
              onClick={() => setBrand('All brands')}
              className="text-[10px] text-[#6B6B6B] hover:text-[#111111]"
            >
              Clear
            </button>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {BRANDS.map((item) => (
            <button
              key={item}
              onClick={() => setBrand(item)}
              className={`px-3 py-1.5 text-xs transition-all ${
                brand === item
                  ? 'bg-[#111111] text-[#F7F5F0] font-medium'
                  : 'border border-[#D8D3CB] bg-[#F7F5F0] text-[#111111] hover:border-[#111111]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[#D8D3CB]">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111111]">
            Body Architecture
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {BODIES.map((item) => (
            <button
              key={item}
              onClick={() => setBody(item)}
              className={`px-3 py-1.5 text-xs transition-all ${
                body === item
                  ? 'bg-[#111111] text-[#F7F5F0] font-medium'
                  : 'border border-[#D8D3CB] bg-[#F7F5F0] text-[#111111] hover:border-[#111111]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[#D8D3CB]">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111111]">
            Powertrain / Fuel
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {FUELS.map((item) => (
            <button
              key={item}
              onClick={() => setFuel(item)}
              className={`px-3 py-1.5 text-xs transition-all ${
                fuel === item
                  ? 'bg-[#111111] text-[#F7F5F0] font-medium'
                  : 'border border-[#D8D3CB] bg-[#F7F5F0] text-[#111111] hover:border-[#111111]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[#D8D3CB]">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111111]">
            Transmission
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {TRANSMISSIONS.map((item) => (
            <button
              key={item}
              onClick={() => setTransmission(item)}
              className={`px-3 py-1.5 text-xs transition-all ${
                transmission === item
                  ? 'bg-[#111111] text-[#F7F5F0] font-medium'
                  : 'border border-[#D8D3CB] bg-[#F7F5F0] text-[#111111] hover:border-[#111111]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#111111] antialiased">
      <Header />
      <main className="pt-24 md:pt-32">
        <div className="mx-auto max-w-[1440px] px-6 py-10 md:px-10 md:py-16">
          {/* Header Bar */}
          <Reveal>
            <div className="flex flex-col justify-between gap-8 border-b border-[#D8D3CB] pb-10 lg:flex-row lg:items-end">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
                  Live Inventory / {vehicles.length} Stock Available
                </span>
                <h1 className="font-editorial mt-4 text-5xl leading-[0.9] tracking-tight md:text-7xl lg:text-8xl">
                  Curated Fleet.
                </h1>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#6B6B6B]">
                Explore inspected and documented pre-owned automobiles. Every listing includes verified service histories and clear ownership status.
              </p>
            </div>
          </Reveal>

          {/* Catalog Controls */}
          <div className="mt-8 flex flex-col gap-10 lg:grid lg:grid-cols-[260px_1fr]">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block border-r border-[#D8D3CB] pr-8">
              <div className="sticky top-28">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.16em] font-semibold text-[#111111]">
                    Refine Selection
                  </span>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="inline-flex items-center gap-1 text-xs text-[#6B6B6B] hover:text-[#111111]"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
                <FilterPanel />
              </div>
            </aside>

            {/* Catalog Main Feed */}
            <div className="min-w-0">
              {/* Search & Sort Bar */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6B6B]" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by make, model, or variant (e.g. BMW, Fortuner)..."
                    className="w-full border border-[#D8D3CB] bg-[#F7F5F0] py-3 pl-10 pr-4 text-xs tracking-wide text-[#111111] placeholder:text-[#6B6B6B]/60 focus:border-[#111111] focus:outline-none"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#111111]"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMobileDrawer(true)}
                    className="inline-flex flex-1 items-center justify-center gap-2 border border-[#D8D3CB] bg-[#F7F5F0] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] lg:hidden"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
                  </button>

                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border border-[#D8D3CB] bg-[#F7F5F0] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#111111] focus:border-[#111111] focus:outline-none"
                  >
                    {SORTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live Count Bar */}
              <div className="mt-6 flex items-center justify-between border-b border-[#D8D3CB] pb-3 text-xs text-[#6B6B6B]">
                <span>
                  Showing <strong className="text-[#111111] font-mono-num">{filtered.length}</strong>{' '}
                  {filtered.length === 1 ? 'vehicle' : 'vehicles'} matching criteria
                </span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-[#111111] underline underline-offset-4"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              {/* Grid List */}
              {filtered.length > 0 ? (
                <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2">
                  <AnimatePresence>
                    {filtered.map((car) => (
                      <motion.div
                        layout
                        key={car.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.35 }}
                      >
                        <VehicleCard v={car} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="mt-12 border border-[#D8D3CB] bg-[#E7E0D4]/30 p-16 text-center">
                  <h3 className="font-editorial text-3xl font-normal text-[#111111]">
                    No vehicles match your criteria.
                  </h3>
                  <p className="mt-3 text-xs text-[#6B6B6B]">
                    Try loosening your filters or clearing search queries to explore the full showroom fleet.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-6 inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-5 py-2.5 text-xs uppercase tracking-[0.14em] font-semibold text-[#F7F5F0]"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {mobileDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawer(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-[#F7F5F0] p-6 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-[#D8D3CB] pb-4">
                <h3 className="font-editorial text-2xl font-bold tracking-tight text-[#111111]">
                  Filter Fleet
                </h3>
                <button
                  onClick={() => setMobileDrawer(false)}
                  className="p-1 text-[#6B6B6B] hover:text-[#111111]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6">
                <FilterPanel />
              </div>

              <div className="border-t border-[#D8D3CB] pt-4">
                <button
                  onClick={() => setMobileDrawer(false)}
                  className="w-full bg-[#111111] py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F7F5F0]"
                >
                  Apply & Show {filtered.length} Cars
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}