import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'TAI — Cinematic Underground Artist Experience',
  description: 'An immersive, cinematic artist website for Turkish underground rap artist TAI, featuring dynamic 3D WebGL scenes, interactive discography, video archive, and audio visualizer.',
  openGraph: {
    title: 'TAI — Cinematic Underground Artist Experience',
    description: 'An immersive, cinematic artist website for Turkish underground rap artist TAI, featuring dynamic 3D WebGL scenes, interactive discography, video archive, and audio visualizer.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TAI — Cinematic Underground Artist Experience',
    description: 'An immersive, cinematic artist website for Turkish underground rap artist TAI, featuring dynamic 3D WebGL scenes, interactive discography, video archive, and audio visualizer.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
