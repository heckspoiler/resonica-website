import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { createClient } from '@/prismicio';

import styles from './page.module.css';

import OverlayPageContent from '../components/OverlayPageContent/OverlayPageContent';
import BackToHomeOverlay from '../components/backToHomeOverlay/BackToHomeOverlay';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('2m').catch(() => notFound());
  const data = page.data;

  return (
    <section className={styles.main}>
      <OverlayPageContent
        title={data.page_title}
        description={data.zweim_description}
        socials={data.zweim_socials}
        links={data.zweim_links}
        image={data.hero_image}
      />
      <BackToHomeOverlay />
    </section>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('2m').catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
