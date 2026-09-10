'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronRight, ShieldCheck } from 'lucide-react'

const CURATED_SPECIMENS = [
  {
    id: '01',
    name: 'Porsche 911 Carrera S',
    meta: '2022 · 14,200 KM · PDK',
    price: '₹1.85 Cr',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: '02',
    name: 'Audi R8 V10 Performance',
    meta: '2021 · 9,800 KM · S-Tronic',
    price: '₹2.10 Cr',
    image:
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=2400&q=88',
  },
  {
    id: '03',
    name: 'BMW M4 Competition',
    meta: '2023 · 6,100 KM · M xDrive',
    price: '₹1.48 Cr',
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2000&q=85',
  },
]

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const [activeSpecimen, setActiveSpecimen] = useState(0)

  const activeCar = CURATED_SPECIMENS[activeSpecimen]

  return (
    <section className="relative overflow-hidden bg-[#F7F5F0] text-[#111111]">
      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        {/* Main Hero */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left Content */}
          <motion.div
            className="lg:col-span-5"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[#77736d]">
              Premium pre-owned automobiles
            </p>

            <h1 className="font-editorial text-[clamp(4rem,8vw,7.8rem)] leading-[0.82] tracking-[-0.045em]">
              Cars
              <br />
              worth
              <br />
              <span className="italic font-light text-[#77736d]">
                owning.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-base leading-7 text-[#66635e] sm:text-lg sm:leading-8">
              Exceptional pre-owned cars, carefully selected and thoroughly
              verified. No guesswork. No unnecessary hassle. Just the right
              car.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/cars"
                className="group inline-flex items-center gap-3 bg-[#111111] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:bg-[#2b2b2b]"
              >
                Explore Cars
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 border border-[#111111] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#111111] transition-all duration-200 hover:bg-[#111111] hover:text-white"
              >
                Book a Test Drive
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Simple Trust Point */}
            <div className="mt-10 flex items-center gap-3 border-t border-[#d8d3cb] pt-5">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#111111]" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em]">
                  Every car verified
                </p>
                <p className="mt-1 text-xs text-[#77736d]">
                  History, condition and mileage checked before listing.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Vehicle Showcase */}
          <motion.div
            className="lg:col-span-7"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: 1, scale: 1 }
            }
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: 'easeOut',
            }}
          >
            <div className="relative">
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ded9d1]">
                <motion.div
                  key={activeCar.id}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, scale: 1.025 }
                  }
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeCar.image}
                    alt={activeCar.name}
                    fill
                    priority={activeSpecimen === 0}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </motion.div>

                {/* Image Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 sm:p-7 lg:p-8">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/65">
                        Featured automobile
                      </p>

                      <h2 className="font-editorial text-3xl leading-none text-white sm:text-4xl lg:text-5xl">
                        {activeCar.name}
                      </h2>

                      <p className="mt-2 text-xs tracking-wide text-white/70">
                        {activeCar.meta}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-white/55">
                        Asking price
                      </p>

                      <p className="font-editorial text-3xl text-white sm:text-4xl">
                        {activeCar.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Car Selector */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {CURATED_SPECIMENS.map((car, index) => {
                  const isActive = activeSpecimen === index

                  return (
                    <button
                      key={car.id}
                      type="button"
                      onClick={() => setActiveSpecimen(index)}
                      aria-label={`View ${car.name}`}
                      aria-pressed={isActive}
                      className={`group relative overflow-hidden text-left transition-all duration-200 ${
                        isActive
                          ? 'ring-2 ring-[#111111] ring-offset-2 ring-offset-[#F7F5F0]'
                          : 'opacity-65 hover:opacity-100'
                      }`}
                    >
                      <div className="relative aspect-[16/9] overflow-hidden bg-[#ded9d1]">
                        <Image
                          src={car.image}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 33vw, 20vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-2.5">
                          <p className="truncate text-[10px] font-medium text-white sm:text-xs">
                            {car.name}
                          </p>

                          <p className="mt-0.5 text-[9px] text-white/70 sm:text-[10px]">
                            {car.price}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Trust Strip */}
        <motion.div
          className="mt-14 border-t border-[#d8d3cb] pt-6 sm:mt-20"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <div className="grid gap-5 sm:grid-cols-3 sm:gap-0">
            <div className="sm:border-r sm:border-[#d8d3cb] sm:pr-8">
              <p className="text-sm font-semibold">
                Thoroughly verified
              </p>
              <p className="mt-1 text-xs leading-5 text-[#77736d]">
                Every vehicle is inspected before it reaches our inventory.
              </p>
            </div>

            <div className="sm:px-8">
              <p className="text-sm font-semibold">
                Transparent history
              </p>
              <p className="mt-1 text-xs leading-5 text-[#77736d]">
                Verified mileage, ownership and service information.
              </p>
            </div>

            <div className="sm:border-l sm:border-[#d8d3cb] sm:pl-8">
              <p className="text-sm font-semibold">
                Delivered across India
              </p>
              <p className="mt-1 text-xs leading-5 text-[#77736d]">
                Based in Shimla, with delivery available across India.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}