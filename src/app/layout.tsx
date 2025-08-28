import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';

import { Analytics } from '@vercel/analytics/react';
import Navigation from './components/Navigation/Navigation';

import Script from 'next/script';

import './globals.css';

import Background from './components/Background';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Background />
        <Navigation />
        {children}
        <Analytics />
        <Script
          async
          src="https://scripts.simpleanalyticscdn.com/latest.js"
        ></Script>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
