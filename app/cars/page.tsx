'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, Search, RotateCcw, ArrowUpDown } from 'lucide-react'
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
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between border-b border-[#D8D3CB] pb-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111]">
            Vehicle Manufacturer
          </span>
          {brand !== 'All brands' && (
            <button
              onClick={() => setBrand('All brands')}
              className="text-[10px] uppercase tracking-wider text-[#6B6B6B] hover:text-[#111111]"
            >
              Clear
            </button>
          )}
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {BRANDS.map((item) => (
            <button
              key={item}
              onClick={() => setBrand(item)}
              className={`px-2.5 py-1.5 text-xs transition-all ${
                brand === item
                  ? 'border border-[#111111] bg-[#111111] font-medium text-[#F7F5F0]'
                  : 'border border-[#D8D3CB] bg-[#F7F5F0] text-[#111111] hover:border-[#111111]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between border-b border-[#D8D3CB] pb-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111]">
            Body Architecture
          </span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {BODIES.map((item) => (
            <button
              key={item}
              onClick={() => setBody(item)}
              className={`px-2.5 py-1.5 text-xs transition-all ${
                body === item
                  ? 'border border-[#111111] bg-[#111111] font-medium text-[#F7F5F0]'
                  : 'border border-[#D8D3CB] bg-[#F7F5F0] text-[#111111] hover:border-[#111111]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between border-b border-[#D8D3CB] pb-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111]">
            Powertrain / Fuel
          </span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {FUELS.map((item) => (
            <button
              key={item}
              onClick={() => setFuel(item)}
              className={`px-2.5 py-1.5 text-xs transition-all ${
                fuel === item
                  ? 'border border-[#111111] bg-[#111111] font-medium text-[#F7F5F0]'
                  : 'border border-[#D8D3CB] bg-[#F7F5F0] text-[#111111] hover:border-[#111111]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between border-b border-[#D8D3CB] pb-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111]">
            Transmission
          </span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {TRANSMISSIONS.map((item) => (
            <button
              key={item}
              onClick={() => setTransmission(item)}
              className={`px-2.5 py-1.5 text-xs transition-all ${
                transmission === item
                  ? 'border border-[#111111] bg-[#111111] font-medium text-[#F7F5F0]'
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
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F7F5F0] text-[#111111] antialiased">
      <Header />
      <main className="pt-20 sm:pt-24 md:pt-28">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 sm:py-12 md:px-10 lg:px-12">
          {/* Header Section */}
          <Reveal>
            <div className="flex flex-col justify-between gap-6 border-b border-[#D8D3CB] pb-8 lg:flex-row lg:items-end">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B]">
                  Live Inventory / {vehicles.length} Units Cataloged
                </span>
                <h1 className="mt-3 font-serif text-4xl font-light tracking-tight text-[#111111] sm:text-6xl md:text-7xl lg:text-8xl">
                  Curated Fleet<span className="text-[#6B6B6B]">.</span>
                </h1>
              </div>
              <p className="max-w-md text-xs sm:text-sm font-normal leading-relaxed text-[#6B6B6B]">
                Explore inspected and documented pre-owned automobiles. Every listing includes verified service histories and clear ownership status[cite: 1].
              </p>
            </div>
          </Reveal>

          {/* Catalog Layout */}
          <div className="mt-6 flex flex-col gap-8 lg:grid lg:grid-cols-[260px_1fr]">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block border-r border-[#D8D3CB] pr-8">
              <div className="sticky top-28 space-y-6">
                <div className="flex items-center justify-between border-b border-[#D8D3CB] pb-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#111111]">
                    Refine Selection
                  </span>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="inline-flex items-center gap-1 text-xs text-[#6B6B6B] transition-colors hover:text-[#111111]"
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
              {/* Responsive Search & Sort Controls */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                {/* Search Bar */}
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6B6B6B]" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search make, model, variant..."
                    className="w-full border border-[#D8D3CB] bg-[#F7F5F0] py-2.5 pl-9 pr-8 text-xs tracking-wide text-[#111111] placeholder:text-[#6B6B6B]/60 transition-colors focus:border-[#111111] focus:outline-none"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      aria-label="Clear query"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#6B6B6B] hover:text-[#111111]"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Trigger & Sorter */}
                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                  <button
                    onClick={() => setMobileDrawer(true)}
                    className="inline-flex items-center justify-center gap-1.5 border border-[#D8D3CB] bg-[#F7F5F0] px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111111] transition-colors hover:border-[#111111] lg:hidden"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
                  </button>

                  <div className="relative col-span-1">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="w-full appearance-none border border-[#D8D3CB] bg-[#F7F5F0] py-2.5 pl-3 pr-7 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111111] transition-colors focus:border-[#111111] focus:outline-none"
                    >
                      {SORTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ArrowUpDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[#6B6B6B]" />
                  </div>
                </div>
              </div>

              {/* Status Indicator Bar */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#D8D3CB] pb-3 text-xs text-[#6B6B6B]">
                <span>
                  Showing <strong className="font-mono text-[#111111]">{filtered.length}</strong>{' '}
                  {filtered.length === 1 ? 'vehicle' : 'vehicles'}
                </span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] uppercase tracking-wider text-[#111111] underline underline-offset-4"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              {/* Vehicle Cards Grid */}
              {filtered.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((car) => (
                      <motion.div
                        key={car.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <VehicleCard v={car} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="mt-8 border border-[#D8D3CB] bg-[#E7E0D4]/20 p-8 text-center sm:p-14">
                  <h3 className="font-serif text-2xl font-light text-[#111111] sm:text-3xl">
                    No vehicles match your criteria.
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-xs text-[#6B6B6B]">
                    Try clearing search queries or loosening specifications to explore the full showroom fleet.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-5 inline-flex items-center gap-2 bg-[#111111] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#F7F5F0] transition-transform active:scale-95"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawer(false)}
              className="fixed inset-0 z-50 bg-[#111111]/60 backdrop-blur-xs lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-[#F7F5F0] p-5 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-[#D8D3CB] pb-3">
                <h3 className="font-serif text-xl font-light tracking-tight text-[#111111]">
                  Filter Fleet
                </h3>
                <button
                  onClick={() => setMobileDrawer(false)}
                  aria-label="Close filters"
                  className="p-1 text-[#6B6B6B] hover:text-[#111111]"
                >
                  <X className="h-5 w-5 stroke-[1.5]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-5">
                <FilterPanel />
              </div>

              <div className="border-t border-[#D8D3CB] pt-3">
                <button
                  onClick={() => setMobileDrawer(false)}
                  className="w-full bg-[#111111] py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#F7F5F0] transition-transform active:scale-95"
                >
                  Apply & Show ({filtered.length})
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