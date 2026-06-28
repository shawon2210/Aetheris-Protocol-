import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { FrameAccents } from '@/components/hud/FrameAccents';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aetheris Protocol | NEBULA_OS',
  description:
    'A high-fidelity orbital command center interface with a live 3D Earth simulation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Material Symbols isn't distributed as a variable-axis Google Font
            next/font can optimize, so it's loaded the same way the original
            mock did: a direct stylesheet link. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body-md selection:bg-primary/30 selection:text-primary">
        {children}
        <FrameAccents />
      </body>
    </html>
  );
}
