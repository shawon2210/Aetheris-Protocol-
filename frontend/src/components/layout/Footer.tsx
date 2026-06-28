const FOOTER_LINKS = ['Protocol', 'Security', 'Support'];

export function Footer() {
  return (
    <footer className="relative z-10 w-full py-16 px-margin-desktop flex flex-col md:flex-row justify-between items-end md:items-center bg-surface/20 backdrop-blur-md">
      <div className="font-label-mono text-[12px] text-primary/50 tracking-[0.2em] font-bold uppercase">
        © 2142 NEBULA_OS // SECTOR-7G NODE-42
      </div>
      <div className="flex gap-14 mt-8 md:mt-0">
        {FOOTER_LINKS.map((label) => (
          <a
            key={label}
            href="#"
            className="font-label-mono text-[12px] text-primary/50 hover:text-primary transition-colors uppercase tracking-[0.2em] font-bold"
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
