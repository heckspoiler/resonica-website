import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';

import { Analytics } from '@vercel/analytics/next';

import Navigation from './components/Navigation/Navigation';

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
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
