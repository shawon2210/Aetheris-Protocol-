export function FrameAccents() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[100] border-[0.5px] border-primary/10 mix-blend-screen scanline-overlay" />
      <div className="hidden sm:block fixed top-6 left-6 w-24 md:w-48 h-12 md:h-24 border-t-[0.5px] border-l-[0.5px] border-primary/30 pointer-events-none z-[100]" />
      <div className="hidden sm:block fixed bottom-6 right-6 w-24 md:w-48 h-12 md:h-24 border-b-[0.5px] border-r-[0.5px] border-primary/30 pointer-events-none z-[100]" />
    </>
  );
}
