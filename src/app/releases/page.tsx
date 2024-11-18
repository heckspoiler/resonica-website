import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import ReleasesPageContent from './components/ReleasesPageContent';

import styles from './page.module.css';
import BackToHomeOverlay from '../components/backToHomeOverlay/BackToHomeOverlay';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('releases');
  const releases = await client.getAllByType('release');

  const sortedReleases = releases.sort((a: any, b: any) => {
    return b.data.release_index - a.data.release_index;
  });

  return (
    <section className={styles.main}>
      <ReleasesPageContent releases={sortedReleases} />
      <BackToHomeOverlay />
    </section>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('releases');

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
