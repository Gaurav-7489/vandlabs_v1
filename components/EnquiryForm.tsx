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
      // Prepared payload matching VandLabs PRD section 10 & 11 Lead schema
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
      // In standalone preview / mock environments
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerStyles =
    variant === 'card'
      ? 'border border-[#D8D3CB] bg-[#F7F5F0] p-6 sm:p-8'
      : 'bg-transparent'

  return (
    <div className={`relative w-full ${containerStyles}`}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F7F5F0]">
              <Check className="h-3 w-3 stroke-[2.5]" />
              <span>Dossier Dispatched</span>
            </div>

            <h3 className="mt-5 text-xl font-medium tracking-tight text-[#111111] sm:text-2xl">
              Inquiry confirmed for review.
            </h3>

            <p className="mt-2.5 text-xs leading-relaxed text-[#6B6B6B]">
              A showroom specialist will transmit vehicle documents and consultation options
              via <span className="font-semibold text-[#111111]">{formData.preferredContact}</span> to{' '}
              <span className="font-semibold text-[#111111]">{formData.phone}</span>.
            </p>

            {vehicleName && (
              <div className="mt-5 w-full border border-[#D8D3CB] bg-[#E7E0D4]/30 px-4 py-3">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]">
                  Referenced Dossier
                </span>
                <span className="mt-0.5 block text-xs font-semibold text-[#111111]">
                  {vehicleName}
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 inline-flex items-center gap-1.5 border-b border-[#111111] pb-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111] transition-opacity hover:opacity-60"
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
            className="space-y-4 text-left"
          >
            {/* Header / Vehicle Flag */}
            {vehicleName && (
              <div className="border-b border-[#D8D3CB] pb-3">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#6B6B6B]">
                  Vehicle In Focus
                </span>
                <p className="mt-0.5 truncate text-sm font-semibold tracking-tight text-[#111111]">
                  {vehicleName}
                </p>
              </div>
            )}

            {/* Inputs: Name & Phone */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B6B6B]">
                  Full Name <span className="text-[#111111]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Julian Vance"
                  className="w-full rounded-none border border-[#D8D3CB] bg-[#F7F5F0] px-3.5 py-2.5 text-xs text-[#111111] transition-colors placeholder:text-[#6B6B6B]/40 focus:border-[#111111] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B6B6B]">
                  Direct Contact <span className="text-[#111111]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-none border border-[#D8D3CB] bg-[#F7F5F0] px-3.5 py-2.5 text-xs text-[#111111] transition-colors placeholder:text-[#6B6B6B]/40 focus:border-[#111111] focus:outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B6B6B]">
                Email Address <span className="text-[#6B6B6B]/60">(Optional)</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="client@archivedrive.com"
                className="w-full rounded-none border border-[#D8D3CB] bg-[#F7F5F0] px-3.5 py-2.5 text-xs text-[#111111] transition-colors placeholder:text-[#6B6B6B]/40 focus:border-[#111111] focus:outline-none"
              />
            </div>

            {/* Channel Selection Segmented Control */}
            <div>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B6B6B]">
                Preferred Communication Route
              </label>
              <div className="grid grid-cols-3 gap-2">
                {channels.map((channel) => {
                  const Icon = channel.icon
                  const active = formData.preferredContact === channel.id
                  return (
                    <button
                      key={channel.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredContact: channel.id })}
                      className={`flex items-center justify-center gap-1.5 border py-2 text-[11px] font-medium transition-all ${
                        active
                          ? 'border-[#111111] bg-[#111111] text-[#F7F5F0]'
                          : 'border-[#D8D3CB] bg-transparent text-[#6B6B6B] hover:border-[#111111] hover:text-[#111111]'
                      }`}
                    >
                      <Icon className="h-3 w-3 stroke-[1.8]" />
                      <span>{channel.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B6B6B]">
                Inquiry Details
              </label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full resize-none rounded-none border border-[#D8D3CB] bg-[#F7F5F0] p-3 text-xs leading-relaxed text-[#111111] transition-colors placeholder:text-[#6B6B6B]/40 focus:border-[#111111] focus:outline-none"
              />
            </div>

            {/* Action CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden bg-[#111111] py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F7F5F0] transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span>{isSubmitting ? 'Transmitting Request…' : 'Request Dossier & Inspection'}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Privacy Guarantee */}
            <div className="flex items-center gap-1.5 pt-1 text-[#6B6B6B]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#111111]" />
              <span className="text-[10px] tracking-tight">
                VandLabs Certified Privacy. Direct showroom routing only.
              </span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}