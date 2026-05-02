"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'es' | 'en';

type LangContext = {
  language: Language;
  setLanguage: (l: Language) => void;
};

const ctx = createContext<LangContext | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('site-language');
      if (saved === 'es' || saved === 'en') setLanguage(saved);
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('site-language', language);
    } catch (e) {
      // ignore
    }
  }, [language]);

  return <ctx.Provider value={{ language, setLanguage }}>{children}</ctx.Provider>;
}

export function useLanguage() {
  const v = useContext(ctx);
  if (!v) throw new Error('useLanguage must be used within LanguageProvider');
  return v;
}
