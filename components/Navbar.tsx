"use client";

import Link from 'next/link';
import React from 'react';
import { useLanguage } from './LanguageProvider';

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const hostname = process.env.NEXT_PUBLIC_R2_PUBLIC_HOSTNAME;
  const logoUrl = hostname ? `https://${hostname}/logo.png` : null;

  return (
    <nav className="topbar">
      <div className="topbar__inner shell">
        <Link href="/" className="topbar__brand">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="Keydeon" className="topbar__logo" />
          ) : (
            'Manual DIY'
          )}
        </Link>

        <div className="topbar__actions">
          <div className="language-switcher language-switcher--top" aria-label="language selector">
            <button type="button" className={language === 'es' ? 'is-active' : ''} onClick={() => setLanguage('es')}>
              Español
            </button>
            <button type="button" className={language === 'en' ? 'is-active' : ''} onClick={() => setLanguage('en')}>
              English
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
