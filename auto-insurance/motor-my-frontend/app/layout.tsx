import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-primary-600">
                  Motor Insurance MY
                </h1>
              </div>
              <nav className="space-x-8">
                <a href="/quote" className="text-gray-600 hover:text-gray-900">
                  Get Quote
                </a>
                <a href="/claims" className="text-gray-600 hover:text-gray-900">
                  Claims
                </a>
                <a href="/login" className="btn-primary">
                  Login
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-gray-400">
              © 2024 Motor Insurance Malaysia. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}