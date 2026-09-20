import Link from 'next/link'
import { Briefcase, Camera, Users } from 'lucide-react'
import { navLinks, siteConfig } from '@/content/site'

// lucide-react no longer ships brand/logo icons (trademark reasons), so these use brand-neutral
// glyphs instead — fitting anyway, since no real social accounts exist behind this fictional project.
const socialLinks = [
  { label: 'Instagram', icon: Camera },
  { label: 'Facebook', icon: Users },
  { label: 'LinkedIn', icon: Briefcase },
]

/** Footer: developer info, fictional address, social icons, and the portfolio disclaimer (SPEC.md section 4F). Social icons are decorative — there are no real accounts behind this fictional project. */
export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto max-w-[1440px] px-6 py-10 md:px-16 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-foreground font-serif text-2xl">{siteConfig.name}</p>
            <p className="text-muted-foreground mt-2 text-sm font-medium">{siteConfig.developer}</p>
            <p className="text-muted-foreground mt-2 text-sm">{siteConfig.developerBlurb}</p>
            <p className="text-muted-foreground mt-3 text-sm">1 Harbor Quarter Promenade, Aveline</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-(--duration-fast)"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <span
                key={social.label}
                aria-hidden
                title={social.label}
                className="border-border text-muted-foreground inline-flex size-10 items-center justify-center rounded-full border"
              >
                <social.icon aria-hidden className="size-4" />
              </span>
            ))}
          </div>
        </div>

        <p className="text-muted-foreground border-border mt-10 border-t pt-6 text-xs">
          Lumina Residences is a fictional project created for portfolio purposes. Names, imagery, and figures shown are
          invented and do not represent a real development.
        </p>
      </div>
    </footer>
  )
}
