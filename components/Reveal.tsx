'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  amount?: number | 'some' | 'all'
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  amount = 0.15,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  const getDirectionalOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 20, x: 0 }
      case 'down':
        return { y: -20, x: 0 }
      case 'left':
        return { x: 20, y: 0 }
      case 'right':
        return { x: -20, y: 0 }
      case 'none':
        return { x: 0, y: 0 }
    }
  }

  const offset = getDirectionalOffset()

  return (
    <motion.div
      className={`will-change-[transform,opacity] ${className}`}
      initial={
        shouldReduceMotion
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...offset }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1], // Clean high-performance cubic bezier
      }}
    >
      {children}
    </motion.div>
  )
}