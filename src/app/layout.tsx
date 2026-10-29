import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import localFont from 'next/font/local';

import Navigation from './components/Navigation/Navigation';

import Script from 'next/script';

import './styles/tokens.css';
import './globals.css';

import Background from './components/Background';

// next/font preloads the faces and serves them with font-display: swap.
// tokens.css maps the role tokens (--font-ui, …) onto these variables.
const gtBlack = localFont({
  src: '../../public/fonts/GT-America-Expanded-Black.woff2',
  variable: '--font-gt-black',
});
const gtRegular = localFont({
  src: '../../public/fonts/GT-America-Expanded-Regular.woff2',
  variable: '--font-gt-regular',
});
const gtText = localFont({
  src: '../../public/fonts/GT-America-Extended-Regular.otf',
  variable: '--font-gt-text',
});
const gtThin = localFont({
  src: '../../public/fonts/GT-America-Expanded-Thin.woff2',
  variable: '--font-gt-thin',
  preload: false,
});

const fontVariables = [gtBlack, gtRegular, gtText, gtThin]
  .map((font) => font.variable)
  .join(' ');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <Background />
        <Navigation />
        {children}
        <Script
          async
          src="https://scripts.simpleanalyticscdn.com/latest.js"
        ></Script>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
