import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import ReleasesPageContent from './[uid]/components/ReleasesPageContent';

import styles from './page.module.css';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('releases');
  const releases = await client.getAllByType('release');

  return (
    <section className={styles.main}>
      <ReleasesPageContent releases={releases} />
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
