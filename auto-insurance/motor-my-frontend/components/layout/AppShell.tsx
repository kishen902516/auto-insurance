'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface AppShellProps {
  children: React.ReactNode;
}

// Common CSS classes for consistent focus styles
const FOCUS_CLASSES = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500';
const FOOTER_LINK_CLASSES = `text-sm text-gray-600 hover:text-gray-900 ${FOCUS_CLASSES}`;

// Footer section data structure for DRY principle
const FOOTER_SECTIONS = [
  {
    key: 'company',
    links: [
      { href: '/about', key: 'about' },
      { href: '/contact', key: 'contact' }
    ]
  },
  {
    key: 'support',
    links: [
      { href: '/help', key: 'help' },
      { href: '/faq', key: 'faq' }
    ]
  },
  {
    key: 'legal',
    links: [
      { href: '/privacy', key: 'privacy' },
      { href: '/terms', key: 'terms' }
    ]
  }
] as const;

function FooterSection({ sectionKey, links, t }: { 
  sectionKey: string; 
  links: readonly { href: string; key: string }[];
  t: (key: string) => string;
}) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-2">
        {t(`footer.${sectionKey}`)}
      </h3>
      <ul className="space-y-1">
        {links.map(({ href, key }) => (
          <li key={key}>
            <Link href={href} className={FOOTER_LINK_CLASSES}>
              {t(`footer.${key}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AppShell({ children }: AppShellProps) {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header 
        className="bg-white border-b border-gray-200 sticky top-0 z-50"
        role="banner"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className={`font-bold text-xl text-gray-900 ${FOCUS_CLASSES}`}
              aria-label={t('common.home')}
            >
              Motor Insurance MY
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-4" aria-label="Main navigation">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors ${FOCUS_CLASSES}`}
                aria-label={t('common.changeLanguage')}
                aria-pressed={language === 'en' ? 'true' : 'false'}
                type="button"
              >
                {language === 'en' ? 'BM' : 'EN'}
              </button>

              {/* Sign In Link */}
              <Link
                href="/signin"
                className={`text-sm font-medium text-gray-700 hover:text-gray-900 ${FOCUS_CLASSES}`}
              >
                {t('common.signIn')}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1" role="main">
        {children}
      </main>

      {/* Footer */}
      <footer 
        className="bg-gray-50 border-t border-gray-200 mt-auto"
        role="contentinfo"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FOOTER_SECTIONS.map(({ key, links }) => (
              <FooterSection 
                key={key}
                sectionKey={key}
                links={links}
                t={t}
              />
            ))}
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Motor Insurance MY. {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}