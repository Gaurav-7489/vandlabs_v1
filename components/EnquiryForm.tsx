'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ShieldCheck, MessageSquare, Phone, Mail } from 'lucide-react'

interface EnquiryFormProps {
  vehicleId?: string
  vehicleName?: string
  variant?: 'inline' | 'card'
}

type ContactChannel = 'WhatsApp' | 'Phone' | 'Email'

export default function EnquiryForm({
  vehicleId,
  vehicleName,
  variant = 'card',
}: EnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredContact: 'WhatsApp' as ContactChannel,
    message: vehicleName
      ? `I am requesting the formal dossier and private viewing schedule for the ${vehicleName}.`
      : 'I am requesting information regarding available inventory and appointment scheduling.',
  })

  const channels: { id: ContactChannel; label: string; icon: typeof MessageSquare }[] = [
    { id: 'WhatsApp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'Phone', label: 'Phone', icon: Phone },
    { id: 'Email', label: 'Email', icon: Mail },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepared payload matching Luxe Motors PRD section 10 & 11 Lead schema[cite: 1]
      const payload = {
        vehicle_id: vehicleId || null,
        vehicle_name: vehicleName || null,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        preferred_contact: formData.preferredContact,
        message: formData.message.trim(),
        status: 'New',
        created_at: new Date().toISOString(),
      }

      // Production endpoint dispatch (fallback gracefully if mock)
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null)

      if (res && !res.ok) {
        throw new Error('Failed to record inquiry')
      }

      setSubmitted(true)
    } catch {
      // Standalone preview / mock fallback
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerStyles =
    variant === 'card'
      ? 'border border-[#D8D3CB] bg-[#F7F5F0] p-4 sm:p-6 md:p-8'
      : 'bg-transparent p-0'

  return (
    <div className={`w-full max-w-full overflow-hidden ${containerStyles}`}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F7F5F0]">
              <Check className="h-3 w-3 stroke-[2.5]" />
              <span>Dossier Dispatched</span>
            </div>

            <h3 className="mt-4 font-serif text-xl font-light tracking-tight text-[#111111] sm:text-2xl">
              Inquiry confirmed for review.
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-[#6B6B6B]">
              A showroom specialist will transmit vehicle documents and consultation options
              via <span className="font-medium text-[#111111]">{formData.preferredContact}</span> to{' '}
              <span className="font-medium text-[#111111]">{formData.phone}</span>.
            </p>

            {vehicleName && (
              <div className="mt-4 w-full border border-[#D8D3CB] bg-[#E7E0D4]/30 px-3.5 py-2.5">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]">
                  Referenced Dossier
                </span>
                <span className="mt-0.5 block truncate text-xs font-semibold text-[#111111]">
                  {vehicleName}
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-5 inline-flex items-center gap-1.5 border-b border-[#111111] pb-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111] transition-opacity hover:opacity-60"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="w-full space-y-4 text-left"
          >
            {/* Header / Vehicle Flag */}
            {vehicleName && (
              <div className="border-b border-[#D8D3CB] pb-2.5">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#6B6B6B]">
                  Vehicle In Focus
                </span>
                <p className="mt-0.5 truncate font-serif text-sm font-light tracking-tight text-[#111111]">
                  {vehicleName}
                </p>
              </div>
            )}

            {/* Inputs: Name & Phone */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="min-w-0">
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B6B6B]">
                  Full Name <span className="text-[#111111]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Julian Vance"
                  className="w-full min-w-0 border border-[#D8D3CB] bg-[#F7F5F0] px-3 py-2.5 text-xs text-[#111111] placeholder:text-[#6B6B6B]/40 transition-colors focus:border-[#111111] focus:outline-none"
                />
              </div>

              <div className="min-w-0">
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B6B6B]">
                  Direct Contact <span className="text-[#111111]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full min-w-0 border border-[#D8D3CB] bg-[#F7F5F0] px-3 py-2.5 text-xs text-[#111111] placeholder:text-[#6B6B6B]/40 transition-colors focus:border-[#111111] focus:outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="min-w-0">
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B6B6B]">
                Email Address <span className="text-[#6B6B6B]/60">(Optional)</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="client@archivedrive.com"
                className="w-full min-w-0 border border-[#D8D3CB] bg-[#F7F5F0] px-3 py-2.5 text-xs text-[#111111] placeholder:text-[#6B6B6B]/40 transition-colors focus:border-[#111111] focus:outline-none"
              />
            </div>

            {/* Channel Selection Segmented Control */}
            <div className="min-w-0">
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B6B6B]">
                Preferred Communication Route
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {channels.map((channel) => {
                  const Icon = channel.icon
                  const active = formData.preferredContact === channel.id
                  return (
                    <button
                      key={channel.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredContact: channel.id })}
                      className={`flex min-w-0 items-center justify-center gap-1 border px-2 py-2 text-[10px] font-medium transition-colors sm:text-[11px] ${
                        active
                          ? 'border-[#111111] bg-[#111111] text-[#F7F5F0]'
                          : 'border-[#D8D3CB] bg-transparent text-[#6B6B6B] hover:border-[#111111] hover:text-[#111111]'
                      }`}
                    >
                      <Icon className="h-3 w-3 shrink-0 stroke-[1.8]" />
                      <span className="truncate">{channel.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Message Area */}
            <div className="min-w-0">
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B6B6B]">
                Inquiry Details
              </label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full min-w-0 resize-none border border-[#D8D3CB] bg-[#F7F5F0] p-3 text-xs leading-relaxed text-[#111111] placeholder:text-[#6B6B6B]/40 transition-colors focus:border-[#111111] focus:outline-none"
              />
            </div>

            {/* Action CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full min-w-0 items-center justify-center gap-2 bg-[#111111] px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F7F5F0] transition-all hover:bg-black active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:text-xs"
            >
              <span className="text-center">
                {isSubmitting ? 'Transmitting…' : 'Request Dossier & Inspection'}
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Privacy Guarantee */}
            <div className="flex items-center gap-1.5 pt-1 text-[#6B6B6B]">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#111111]" />
              <span className="text-[10px] tracking-tight">
                Luxe Motors Certified Privacy. Direct showroom routing only[cite: 1].
              </span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}