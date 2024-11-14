import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

import styles from './page.module.css';

import PageContent from './2mPageContent/2mPageContent';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('2m');
  const data = page.data;

  console.log(data);

  return (
    <section className={styles.main}>
      <PageContent data={data} />
    </section>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('2m');

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
