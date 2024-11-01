import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';

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
        {children}
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
