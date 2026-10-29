import { Metadata } from 'next';

import * as prismic from '@prismicio/client';

import { createClient } from '@/prismicio';
import MarqueeContent from './components/Marquee/MarqueeContent/MarqueeContent';

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID('page', 'home').catch(() => null);
  if (!home) return {};

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: home.data.meta_image.url ? [{ url: home.data.meta_image.url }] : [],
    },
  };
}

export default async function Index() {
  const client = createClient();
  // The home page is the background and navigation; the marquee is optional.
  const marquee = await client.getSingle('marquee').catch(() => null);

  return marquee?.data.show_marquee ? <MarqueeContent marquee={marquee.data} /> : null;
}
