import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { createClient } from '@/prismicio';
import { compareReleases } from '@/app/lib/navigation';
import ReleasesPageContent from './components/ReleasesPageContent';

import styles from './page.module.css';
import BackToHomeOverlay from '../components/backToHomeOverlay/BackToHomeOverlay';

export default async function Page() {
  const client = createClient();
  const releases = await client.getAllByType('release');

  return (
    <section className={styles.main}>
      <ReleasesPageContent releases={[...releases].sort(compareReleases)} />
      <BackToHomeOverlay />
    </section>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('releases').catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
