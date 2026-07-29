import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Sidebar } from '@/shared/layout/Sidebar';
import { CommandPalette } from '@/core/command/commandPalette';

export const metadata: Metadata = {
  title: 'Project HIM OS — Executive Personal Operating System',
  description: 'Prototype Today. Legacy Tomorrow.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#09090B',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-[#0A0E1A] text-gray-100 min-h-screen flex antialiased select-none">
        <Sidebar />
        <CommandPalette />
        <main className="flex-1 min-h-screen p-8 overflow-y-auto bg-[#0A0E1A]">
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
