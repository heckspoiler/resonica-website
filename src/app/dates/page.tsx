import { Metadata } from 'next';

import { createClient } from '@/prismicio';
import DatesPageContent from './components/DatesPageContent';

import styles from './page.module.css';
import BackToHomeOverlay from '../components/backToHomeOverlay/BackToHomeOverlay';
import { compareByFirstDate } from '@/app/lib/eventDates';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('dates');
  const dates = await client.getAllByType('date');

  // Newest first; events without a date go last.
  const sortedDates = [...dates]
    .sort((a: any, b: any) => {
      const order = compareByFirstDate(a, b);
      return order === 0 ? 0 : -order;
    })
    .slice(0, 10);

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
