import { Metadata } from 'next';

import { createClient } from '@/prismicio';
import DatesPageContent from './components/DatesPageContent';

import styles from './page.module.css';
import BackToHomeOverlay from '../components/backToHomeOverlay/BackToHomeOverlay';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('dates');
  const dates = await client.getAllByType('date');

  const sortedDates = dates
    .sort((a: any, b: any) => {
      const dateA = new Date(a.data.event_date_start);
      const dateB = new Date(b.data.event_date_start);

      // Handle invalid dates
      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;

      return dateB.getTime() - dateA.getTime();
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
