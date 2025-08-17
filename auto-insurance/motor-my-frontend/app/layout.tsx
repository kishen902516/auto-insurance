import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppShell } from '@/components/layout/AppShell'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Motor Insurance Malaysia',
  description: 'Comprehensive motor insurance for Malaysian drivers',
  keywords: 'motor insurance, car insurance, Malaysia, JPJ, NCD',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <AppShell>
            {children}
          </AppShell>
        </LanguageProvider>
      </body>
    </html>
  )
}