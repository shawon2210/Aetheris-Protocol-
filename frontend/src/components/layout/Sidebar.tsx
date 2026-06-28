'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { icon: 'explore', label: 'NAVIGATOR', href: '/', exact: true },
  { icon: 'radar', label: 'SCANNER', href: '/sectors' },
  { icon: 'database', label: 'ARCHIVE', href: '/archive' },
  { icon: 'settings', label: 'SYSTEM', href: '/system' },
  { icon: 'terminal', label: 'TERMINAL', href: '/terminal' },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (item: typeof NAV_ITEMS[number]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <aside className="fixed left-0 top-0 h-full z-40 hidden md:flex flex-col border-r border-outline-variant bg-surface/20 backdrop-blur-xl w-20 hover:w-64 transition-all duration-500 overflow-hidden pt-28 group">
      <nav className="flex-1 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={
              isActive(item)
                ? 'flex items-center gap-10 px-7 py-5 text-primary bg-primary/10 border-r-2 border-primary transition-all no-underline'
                : 'flex items-center gap-10 px-7 py-5 text-on-surface-variant hover:text-primary hover:bg-white/[0.06] transition-all no-underline'
            }
          >
            <span className="material-symbols-outlined text-[24px]">
              {item.icon}
            </span>
            <span className="font-label-mono text-label-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
      <div className="p-4 mt-auto mb-8 border-t border-outline-variant pt-8">
        <Link
          href="/"
          className="w-full h-10 flex items-center justify-center gap-6 text-on-surface-variant/50 hover:text-error transition-colors no-underline"
        >
          <span className="material-symbols-outlined text-[24px]">
            power_settings_new
          </span>
          <span className="font-label-mono text-label-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase">
            Disconnect
          </span>
        </Link>
      </div>
    </aside>
  );
}
