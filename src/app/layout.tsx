import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Sidebar } from '@/shared/layout/Sidebar';
import { CommandPalette } from '@/core/command/commandPalette';
import { QuickCaptureModal } from '@/shared/ui/QuickCaptureModal';

export const metadata: Metadata = {
  title: 'Project HIM OS — Personal Operating System',
  description: 'Prototype today. Legacy tomorrow.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#071A12',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-[#071A12] text-[#F9FAFB] min-h-screen flex antialiased select-none">
        <Sidebar />
        <CommandPalette />
        <QuickCaptureModal />
        <main className="flex-1 min-h-screen p-4 md:p-8 overflow-y-auto bg-[#071A12]">
          {children}
        </main>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(() => {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
