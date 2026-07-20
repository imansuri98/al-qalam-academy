import type { Metadata } from 'next'
import { Amiri, Noto_Sans_Arabic } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import Navigation from '@/components/Navigation'
import './globals.css'

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
})

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-arabic',
})

export const metadata: Metadata = {
  title: 'Al Qalam Academy - Classical Arabic Self-Study',
  description: 'Learn Classical Arabic grammar (Qawa\'id) systematically with interactive, feedback-driven lessons and exercises.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${amiri.variable} ${notoArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-tr from-slate-50 via-slate-100 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 text-slate-800 dark:text-slate-200 font-sans">
        <SessionProvider>
          <Navigation />
          <main className="flex-1 flex flex-col">{children}</main>
        </SessionProvider>
      </body>
    </html>
  )
}
