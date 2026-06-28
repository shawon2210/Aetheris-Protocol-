const FOOTER_LINKS = ['Protocol', 'Security', 'Support'];

export function Footer() {
  return (
    <footer className="relative z-10 w-full py-8 md:py-16 px-5 md:px-margin-desktop flex flex-col items-center bg-surface/20 backdrop-blur-md">
      <div className="font-label-mono text-[10px] md:text-[12px] text-primary/50 tracking-[0.2em] font-bold uppercase mb-6 md:mb-8">
        &copy; 2142 NEBULA_OS // SECTOR-7G NODE-42
      </div>
      <div className="flex gap-8 md:gap-14 justify-center">
        {FOOTER_LINKS.map((label) => (
          <a
            key={label}
            href="#"
            className="font-label-mono text-[10px] md:text-[12px] text-primary/50 hover:text-primary transition-colors uppercase tracking-[0.2em] font-bold"
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
