import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import DatesPageContent from './components/DatesPageContent';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('dates');
  const dates = await client.getAllByType('date');

  return (
    <section>
      <DatesPageContent dates={dates} />
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
