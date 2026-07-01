import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'SLATracker — Monitor & Enforce SLAs',
  description: 'Automated breach detection, compliance reporting, and real-time status dashboards for internal IT and customer-facing SLAs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    return (
      <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <head>
          <script dangerouslySetInnerHTML={{ __html: `
            try {
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            } catch (e) {}
          ` }} />
        </head>
        <body className="font-sans antialiased bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
          {children}
        </body>
      </html>
    );
  } catch (error) {
    console.error('Layout error:', error);
    return (
      <html lang="en">
        <body className="bg-slate-50 text-slate-900">
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold text-red-500">Application Error</h1>
            <p className="mt-2 text-slate-600">Failed to load application layout.</p>
          </div>
        </body>
      </html>
    );
  }
}