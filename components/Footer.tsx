import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY, FOOTER_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-navy-deep border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="Parvathy Investments"
                width={160}
                height={64}
                className="h-12 w-auto rounded-lg"
              />
            </div>
            <p className="font-body text-sm text-gray-400 leading-relaxed mb-4 max-w-xs">
              A disciplined investment platform focused on responsible capital deployment and long-term value creation across diversified asset classes.
            </p>
            <p className="font-body text-sm text-gold italic">{COMPANY.tagline}</p>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h4 className="overline-label mb-5">Navigation</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-gray-400 hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Investments */}
          <div>
            <h4 className="overline-label mb-5">Investments</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.investments.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-gray-400 hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Company */}
          <div>
            <h4 className="overline-label mb-5">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-gray-400 hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-white/10 space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="font-body text-sm text-gray-400 hover:text-gold transition-colors duration-200"
                >
                  {COMPANY.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="font-body text-sm text-gray-400">{COMPANY.location}</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="font-body text-sm text-gray-400">Available upon request</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-xs text-gray-600">© {new Date().getFullYear()} Parvathy Investment Company. All rights reserved.</p>
            <p className="font-body text-xs text-gray-600 italic tracking-wide">
              Disciplined Capital. Long-Term Value.
            </p>
          </div>
          <p className="font-body text-xs text-gray-700 text-center leading-relaxed">
            All investments involve risk, including the possible loss of principal. Past performance is not indicative of future results. Investment opportunities are subject to eligibility and regulatory requirements.
          </p>
        </div>
      </div>
    </footer>
  );
}
