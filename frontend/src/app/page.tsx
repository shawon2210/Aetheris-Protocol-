import { EarthScene } from '@/components/three/EarthScene';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { ChronosClock } from '@/components/hud/ChronosClock';
import { NetworkLatencyIndicator } from '@/components/hud/NetworkLatencyIndicator';
import { HeroModule } from '@/components/hero/HeroModule';
import { NeuralArchiveCard } from '@/components/dashboard/NeuralArchiveCard';
import { SectorStatusCard } from '@/components/dashboard/SectorStatusCard';
import { LiveDataStream } from '@/components/dashboard/LiveDataStream';

export default function Home() {
  return (
    <>
      <EarthScene />

      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70" />
      </div>

      <Header />
      <Sidebar />
      <ChronosClock />
      <NetworkLatencyIndicator />

      <main className="relative z-10 min-h-screen pl-24 md:pl-32 pt-48 pb-24 pr-margin-desktop flex flex-col items-center">
        <HeroModule />

        <div className="grid grid-cols-12 gap-8 w-full max-w-6xl">
          <NeuralArchiveCard />
          <SectorStatusCard />
          <LiveDataStream />
        </div>
      </main>

      <Footer />
    </>
  );
}
