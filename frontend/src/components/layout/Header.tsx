'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'STATIONS', href: '/', exact: true },
  { label: 'SECTORS', href: '/sectors' },
  { label: 'ARCHIVE', href: '/archive' },
  { label: 'SYSTEM', href: '/system' },
  { label: 'TERMINAL', href: '/terminal' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (link: typeof NAV_LINKS[number]) => {
    if (link.exact) return pathname === link.href;
    return pathname.startsWith(link.href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 md:px-margin-desktop py-6 border-b border-outline-variant bg-surface/20 backdrop-blur-xl">
        <div className="flex items-center gap-6 md:gap-12">
          <Link href="/" className="font-display-lg text-[20px] md:text-[22px] tracking-[-0.06em] font-bold text-primary drop-shadow-[0_0_12px_rgba(0,219,233,0.4)] no-underline">
            NEBULA_OS
          </Link>
          <nav className="hidden md:flex gap-8 lg:gap-10 items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={
                  isActive(link)
                    ? 'font-label-mono text-label-mono uppercase text-primary border-b border-primary pb-0.5 no-underline'
                    : 'font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors no-underline'
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-white/[0.06] border border-white/[0.12] rounded-full px-4 py-1.5 focus-within:border-primary/50 transition-all">
            <span className="material-symbols-outlined text-outline text-[18px]">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-label-mono font-label-mono placeholder:text-outline/50 text-[11px] w-32 lg:w-44 ml-2"
              placeholder="ENCRYPTED QUERY..."
              type="text"
            />
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="hidden md:block material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-[22px]"
          >
            notifications
          </button>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden material-symbols-outlined text-primary text-[24px]"
          >
            {mobileOpen ? 'close' : 'menu'}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
          <nav className="relative z-50 flex flex-col items-center justify-center h-full gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={
                  isActive(link)
                    ? 'font-headline-lg text-headline-lg-mobile text-primary no-underline'
                    : 'font-headline-lg text-headline-lg-mobile text-on-surface-variant hover:text-primary transition-colors no-underline'
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
