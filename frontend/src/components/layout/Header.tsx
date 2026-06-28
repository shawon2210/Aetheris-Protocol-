import Image from 'next/image';

const NAV_LINKS = [
  { label: 'STATIONS', href: '#', active: true },
  { label: 'SECTORS', href: '#', active: false },
  { label: 'ARCHIVE', href: '#', active: false },
  { label: 'COMS', href: '#', active: false },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop py-6 border-b border-outline-variant bg-surface/20 backdrop-blur-xl">
      <div className="flex items-center gap-12">
        <h1 className="font-display-lg text-[22px] tracking-[-0.06em] font-bold text-primary drop-shadow-[0_0_12px_rgba(0,219,233,0.4)]">
          NEBULA_OS
        </h1>
        <nav className="hidden md:flex gap-10 items-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? 'font-label-mono text-label-mono uppercase text-primary border-b border-primary pb-0.5'
                  : 'font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors'
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center bg-white/[0.06] border border-white/[0.12] rounded-full px-4 py-1.5 focus-within:border-primary/50 transition-all">
          <span className="material-symbols-outlined text-outline text-[18px]">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-label-mono font-label-mono placeholder:text-outline/50 text-[11px] w-44 ml-2"
            placeholder="ENCRYPTED QUERY..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-[22px]"
          >
            notifications
          </button>
          <button
            type="button"
            aria-label="Settings"
            className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-[22px]"
          >
            settings
          </button>
          <div className="w-9 h-9 rounded-full overflow-hidden border border-primary/30 ring-1 ring-primary/20">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRW6Om3eAw5v0vtXQ4y8XGrbeXyxzkAksvzU9aSSzbKTtpd03EdViA8Nz58orHjaUPL9kM6ImKC4Q12CiSVCRjxzWAyl0RIgGc12BHgVYBAvGnNuLn8u0wfzS371siKyn_qjlv6zqKOc4TGkKs3gsCZffwEmTtPsQZFr7-EarYlwdTj2OpzJEoOWgssrol42Ca3Dnk1ndjfyERnGufVBDrzmFmz0ab1_zUSc9itjRNdGDDri71vvE_4haQSe9Uhkhbuc3d1iOZeCKf"
              alt="Operator avatar"
              width={36}
              height={36}
              className="w-full h-full object-cover grayscale opacity-90"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
