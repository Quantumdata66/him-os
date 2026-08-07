'use client';

import React, { useState, useEffect } from 'react';
import type { Metadata, Viewport } from 'next';
import { useRouter } from 'next/navigation';
import './globals.css';
import { Sidebar } from '@/shared/layout/Sidebar';
import { Header } from '@/shared/layout/Header';
import { CommandPalette } from '@/core/command/commandPalette';
import { QuickCaptureModal } from '@/shared/ui/QuickCaptureModal';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  // Decision 003: Global modifier shortcuts (Alt+1 through Alt+7)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            router.push('/dashboard');
            break;
          case '2':
            e.preventDefault();
            router.push('/today');
            break;
          case '3':
            e.preventDefault();
            router.push('/build');
            break;
          case '4':
            e.preventDefault();
            router.push('/learn');
            break;
          case '5':
            e.preventDefault();
            router.push('/grow');
            break;
          case '6':
            e.preventDefault();
            router.push('/think');
            break;
          case '7':
            e.preventDefault();
            router.push('/review');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <html lang="en" className="dark">
      <head>
        <title>Project HIM OS — Personal Operating System</title>
        <meta name="description" content="Prototype today. Legacy tomorrow." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-bg-primary text-text-primary min-h-screen flex antialiased select-none font-sans">
        {/* Executive Sidebar */}
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Main Application Container */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          {/* Top Navigation Bar Header */}
          <Header onToggleMobileSidebar={() => setMobileOpen(!mobileOpen)} />

          {/* Decision 008: Content Viewport locked to max 1440px centered with auto margins */}
          <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-6 py-6 overflow-y-auto">
            {children}
          </main>
        </div>

        {/* Global Overlays */}
        <CommandPalette />
        <QuickCaptureModal />

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
