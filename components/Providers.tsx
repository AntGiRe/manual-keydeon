"use client";

import React from 'react';
import { LanguageProvider } from './LanguageProvider';
import Navbar from './Navbar';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Navbar />
      {children}
    </LanguageProvider>
  );
}
