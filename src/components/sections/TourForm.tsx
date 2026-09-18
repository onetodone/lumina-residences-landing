'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { bentoSurfaceClassName } from '@/components/bento/BentoCard'
import { eyebrowClassName } from '@/components/cells/cell-styles'
import { Button } from '@/components/ui/button'
import type { ResidenceType } from '@/data/types'
import { duration, easeLuxury } from '@/lib/motion'
import { cn } from '@/lib/utils'

const TYPE_LABEL: Record<ResidenceType, string> = {
  studio: 'Studio',
  '1-bed': '1 Bedroom',
  '2-bed': '2 Bedroom',
  '3-bed': '3 Bedroom',
  penthouse: 'Penthouse',
}

const tourRequestSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().min(7, 'Enter a valid phone number'),
  preferredDate: z.string().min(1, 'Select a preferred date'),
  residenceType: z.enum(['studio', '1-bed', '2-bed', '3-bed', 'penthouse']),
  message: z.string().trim().max(500, 'Keep your message under 500 characters').optional(),
})

type TourRequestValues = z.infer<typeof tourRequestSchema>

const fieldClassName =
  'rounded-control border-border bg-background/60 text-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full border px-3.5 py-2.5 text-sm outline-none focus-visible:ring-3'

const labelClassName = 'text-muted-foreground text-xs tracking-wide uppercase'

/** Tour request section: client-validated form (zod + react-hook-form), mock submit and success state (SPEC.md section 4E). No backend — nothing is actually sent. */
export function TourForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TourRequestValues>({
    resolver: zodResolver(tourRequestSchema),
    defaultValues: { residenceType: 'studio' },
  })

  const onSubmit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSubmitted(true)
  })

  const requestAnother = () => {
    reset()
    setSubmitted(false)
  }

  return (
    <section id="tour" className="mx-auto max-w-[1440px] px-6 pt-3 pb-6 md:px-16 md:py-24">
      <div className={cn(bentoSurfaceClassName, 'rounded-panel mx-auto max-w-2xl p-8 md:p-12')}>
        <span className={eyebrowClassName}>Schedule a Tour</span>
        <h2 className="text-foreground mt-2 font-serif text-3xl md:text-4xl">Request a Private Tour</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Tell us a little about what you are looking for and our sales team will follow up. This is a portfolio demo,
          so no request is actually sent.
        </p>

        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.base, ease: easeLuxury }}
              role="status"
              className="mt-8 flex flex-col items-start gap-3"
            >
              <span className="bg-status-available/15 text-status-available inline-flex size-10 items-center justify-center rounded-full">
                <Check aria-hidden className="size-5" />
              </span>
              <p className="text-foreground font-serif text-xl">Request received</p>
              <p className="text-muted-foreground text-sm">
                Thank you. A member of the Lumina Residences sales team will reach out shortly to confirm your tour.
              </p>
              <button type="button" onClick={requestAnother} className="text-gold text-sm underline">
                Request another tour
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.fast, ease: easeLuxury }}
              onSubmit={onSubmit}
              noValidate
              className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              <label className="flex flex-col gap-1.5">
                <span className={labelClassName}>Full name</span>
                <input
                  {...register('name')}
                  type="text"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={fieldClassName}
                />
                {errors.name && (
                  <span id="name-error" role="alert" className="text-destructive text-xs">
                    {errors.name.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className={labelClassName}>Email</span>
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={fieldClassName}
                />
                {errors.email && (
                  <span id="email-error" role="alert" className="text-destructive text-xs">
                    {errors.email.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className={labelClassName}>Phone</span>
                <input
                  {...register('phone')}
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={fieldClassName}
                />
                {errors.phone && (
                  <span id="phone-error" role="alert" className="text-destructive text-xs">
                    {errors.phone.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className={labelClassName}>Preferred date</span>
                <input
                  {...register('preferredDate')}
                  type="date"
                  aria-invalid={!!errors.preferredDate}
                  aria-describedby={errors.preferredDate ? 'preferred-date-error' : undefined}
                  className={fieldClassName}
                />
                {errors.preferredDate && (
                  <span id="preferred-date-error" role="alert" className="text-destructive text-xs">
                    {errors.preferredDate.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className={labelClassName}>Residence type</span>
                <select {...register('residenceType')} className={fieldClassName}>
                  {(Object.keys(TYPE_LABEL) as ResidenceType[]).map((type) => (
                    <option key={type} value={type}>
                      {TYPE_LABEL[type]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className={labelClassName}>Message (optional)</span>
                <textarea
                  {...register('message')}
                  rows={4}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={fieldClassName}
                />
                {errors.message && (
                  <span id="message-error" role="alert" className="text-destructive text-xs">
                    {errors.message.message}
                  </span>
                )}
              </label>

              <div className="sm:col-span-2">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Request a Tour'}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
