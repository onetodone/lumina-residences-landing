'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ctaLabel, navLinks, siteConfig } from '@/content/site'
import { useScrollHeader } from '@/lib/hooks/useScrollHeader'
import { useFocusTrap } from '@/lib/hooks/useFocusTrap'
import { duration, easeLuxury } from '@/lib/motion'

export function Header() {
  const scrolled = useScrollHeader()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useFocusTrap<HTMLDivElement>(menuOpen)

  const closeMenu = () => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          'ease-luxury absolute inset-0 transition-colors duration-(--duration-base)',
          scrolled
            ? 'border-border bg-obsidian/70 border-b backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      />
      <div className="relative mx-auto flex h-(--header-height) max-w-[1440px] items-center justify-between px-6 md:h-(--header-height-md) md:px-16">
        <Link href="#top" className="text-foreground font-serif text-xl md:text-2xl">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-(--duration-fast)"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button nativeButton={false} render={<Link href="#tour">{ctaLabel}</Link>} />
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="text-foreground inline-flex size-10 items-center justify-center md:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, ease: easeLuxury }}
            className="bg-obsidian fixed inset-x-0 top-(--header-height) bottom-0 flex flex-col justify-between gap-8 overflow-y-auto px-6 py-10 md:hidden"
          >
            <nav className="flex flex-col gap-6" aria-label="Primary">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-foreground font-serif text-3xl"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Button
              size="lg"
              nativeButton={false}
              render={
                <Link href="#tour" onClick={closeMenu}>
                  {ctaLabel}
                </Link>
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
