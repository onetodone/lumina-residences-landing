import Link from 'next/link'
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/SocialIcons'
import { navLinks, siteConfig } from '@/content/site'

// Decorative only — there are no real social accounts behind this fictional project.
const socialLinks = [
  { label: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/swipeek' },
  { label: 'LinkedIn', icon: LinkedinIcon, url: 'https://www.linkedin.com/in/anton-holubeu/' },
  { label: 'Facebook', icon: FacebookIcon, url: 'https://www.facebook.com/profile.php?id=61593807187808' },
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

          <div className="ms-auto flex gap-3">
            {socialLinks.map((social) => (
              <a
                href={social.url}
                key={social.label}
                aria-hidden
                title={social.label}
                target="_blank"
                className="border-border text-muted-foreground inline-flex size-10 items-center justify-center rounded-full border"
              >
                <social.icon aria-hidden className="size-4" />
              </a>
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
