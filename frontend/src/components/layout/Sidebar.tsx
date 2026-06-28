const NAV_ITEMS = [
  { icon: 'explore', label: 'NAVIGATOR', active: true },
  { icon: 'radar', label: 'SCANNER', active: false },
  { icon: 'database', label: 'REPOSITORIES', active: false },
  { icon: 'memory', label: 'CORE_SYSTEM', active: false },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full z-40 flex flex-col border-r border-outline-variant bg-surface/20 backdrop-blur-xl w-20 hover:w-64 transition-all duration-500 overflow-hidden pt-28 group">
      <nav className="flex-1 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            className={
              item.active
                ? 'flex items-center gap-10 px-7 py-5 text-primary bg-primary/10 border-r-2 border-primary transition-all'
                : 'flex items-center gap-10 px-7 py-5 text-on-surface-variant hover:text-primary hover:bg-white/[0.06] transition-all'
            }
          >
            <span className="material-symbols-outlined text-[24px]">
              {item.icon}
            </span>
            <span className="font-label-mono text-label-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
      <div className="p-4 mt-auto mb-8 border-t border-outline-variant pt-8">
        <button
          type="button"
          className="w-full h-10 flex items-center justify-center gap-6 text-on-surface-variant/50 hover:text-error transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">
            power_settings_new
          </span>
          <span className="font-label-mono text-label-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase">
            Terminate
          </span>
        </button>
      </div>
    </aside>
  );
}
