'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, Language } from './translations';
import Cookies from 'js-cookie';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_COOKIE_KEY = 'preferred_language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from cookie on mount
  useEffect(() => {
    const savedLanguage = Cookies.get(LANGUAGE_COOKIE_KEY) as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bm')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    Cookies.set(LANGUAGE_COOKIE_KEY, lang, { expires: 365 });
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'en' ? 'bm' : 'en';
    setLanguage(newLang);
  }, [language, setLanguage]);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}