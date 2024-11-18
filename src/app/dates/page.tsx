import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import DatesPageContent from './components/DatesPageContent';

import styles from './page.module.css';
import BackToHomeOverlay from '../components/backToHomeOverlay/BackToHomeOverlay';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('dates');
  const dates = await client.getAllByType('date');

  const sortedDates = dates.sort((a: any, b: any) => {
    return b.data.date_index - a.data.date_index;
  });

  return (
    <section className={styles.main}>
      <DatesPageContent dates={sortedDates} />
      <BackToHomeOverlay />
    </section>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('dates');

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
