'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parseISO, startOfToday } from 'date-fns'
import { AnimatePresence, motion } from 'motion/react'
import { Calendar as CalendarIcon, Check } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { BentoCard } from '@/components/bento/BentoCard'
import { eyebrowClassName } from '@/components/cells/cell-styles'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { unitCategories, type UnitCategory } from '@/content/unit-types'
import { duration, easeLuxury } from '@/lib/motion'
import { cn } from '@/lib/utils'

const TYPE_LABEL: Record<UnitCategory, string> = {
  studio: 'Studio',
  '1-bed': '1 Bedroom',
  '2-bed': '2 Bedroom',
}

const tourRequestSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().min(7, 'Enter a valid phone number'),
  preferredDate: z.string().min(1, 'Select a preferred date'),
  residenceType: z.enum(unitCategories),
  message: z.string().trim().max(500, 'Keep your message under 500 characters').optional(),
})

type TourRequestValues = z.infer<typeof tourRequestSchema>

const fieldClassName =
  'rounded-control border-border bg-background/60 text-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full border px-3.5 py-2.5 text-sm outline-none focus-visible:ring-3'

const labelClassName = 'ps-3 text-muted-foreground text-xs tracking-wide uppercase'

/** Tour request section: client-validated form (zod + react-hook-form), mock submit and success state (SPEC.md section 4E). No backend — nothing is actually sent. */
export function TourForm() {
  const [submitted, setSubmitted] = useState(false)
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TourRequestValues>({
    resolver: zodResolver(tourRequestSchema),
    defaultValues: { residenceType: 'studio', preferredDate: '' },
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
    <BentoCard className="flex h-full flex-col overflow-y-auto p-6 md:p-8">
      <span className={eyebrowClassName}>Schedule a Tour</span>
      <h2 className="text-foreground mt-2 font-serif text-2xl md:text-3xl">Request a Private Tour</h2>
      <p className="text-muted-foreground mt-2 text-sm">This is a portfolio demo — no request is actually sent.</p>

      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, ease: easeLuxury }}
            role="status"
            className="mt-6 flex flex-col items-start gap-3"
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
            className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2"
          >
            <label className="flex flex-col gap-1.5 md:col-span-2">
              <span className={labelClassName}>Full name</span>
              <input
                {...register('name')}
                type="text"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                tabIndex={1}
                className={fieldClassName}
              />
              {errors.name && (
                <span id="name-error" role="alert" className="text-destructive ps-3 text-xs">
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
                tabIndex={2}
                className={fieldClassName}
              />
              {errors.email && (
                <span id="email-error" role="alert" className="text-destructive ps-3 text-xs">
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
                tabIndex={3}
                className={fieldClassName}
              />
              {errors.phone && (
                <span id="phone-error" role="alert" className="text-destructive ps-3 text-xs">
                  {errors.phone.message}
                </span>
              )}
            </label>

            <div className="flex flex-col gap-1.5">
              <span id="preferred-date-label" className={labelClassName}>
                Preferred date
              </span>
              <Controller
                control={control}
                name="preferredDate"
                render={({ field }) => (
                  <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                    <PopoverTrigger
                      type="button"
                      aria-labelledby="preferred-date-label"
                      aria-invalid={!!errors.preferredDate}
                      aria-describedby={errors.preferredDate ? 'preferred-date-error' : undefined}
                      tabIndex={4}
                      className={cn(fieldClassName, 'flex items-center justify-between gap-2 text-left')}
                    >
                      <span className={field.value ? undefined : 'text-muted-foreground'}>
                        {field.value ? format(parseISO(field.value), 'PPP') : 'Select a date'}
                      </span>
                      <CalendarIcon aria-hidden className="text-muted-foreground size-4 shrink-0" />
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ? parseISO(field.value) : undefined}
                        onSelect={(date) => {
                          field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                          setDatePickerOpen(false)
                        }}
                        disabled={{ before: startOfToday() }}
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.preferredDate && (
                <span id="preferred-date-error" role="alert" className="text-destructive ps-3 text-xs">
                  {errors.preferredDate.message}
                </span>
              )}
            </div>

            <label className="flex flex-col gap-1.5">
              <span className={labelClassName}>Residence type</span>
              <select {...register('residenceType')} tabIndex={5} className={fieldClassName}>
                {unitCategories.map((type) => (
                  <option key={type} value={type}>
                    {TYPE_LABEL[type]}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 md:col-span-2">
              <span className={labelClassName}>Message (optional)</span>
              <textarea
                {...register('message')}
                rows={3}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                tabIndex={6}
                className={`${fieldClassName} resize-none`}
              />
              {errors.message && (
                <span id="message-error" role="alert" className="text-destructive ps-3 text-xs">
                  {errors.message.message}
                </span>
              )}
            </label>

            <div className="flex justify-end md:col-span-2">
              <Button type="submit" size="lg" disabled={isSubmitting} tabIndex={7} className="w-full md:w-auto">
                {isSubmitting ? 'Sending…' : 'Request a Tour'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </BentoCard>
  )
}
