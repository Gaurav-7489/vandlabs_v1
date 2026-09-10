'use client'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import VehicleCard from './VehicleCard'
import type { Vehicle } from '@/lib/data'
export default function FeaturedRail({cars}:{cars:Vehicle[]}){const ref=useRef<HTMLDivElement>(null); return <div ref={ref} className="no-scrollbar flex snap-x gap-5 overflow-x-auto pb-3">{cars.map((v,i)=><motion.div key={v.id} className="min-w-[85vw] snap-start md:min-w-[38vw] lg:min-w-[31vw]" initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.07}}><VehicleCard v={v}/></motion.div>)}</div>}
