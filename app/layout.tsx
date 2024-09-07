'use client';

import { ReactNode, useEffect } from 'react'
import './global.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Remove Grammarly attributes after initial render
    const body = document.querySelector('body');
    if (body) {
      body.removeAttribute('data-new-gr-c-s-check-loaded');
      body.removeAttribute('data-gr-ext-installed');
    }
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}