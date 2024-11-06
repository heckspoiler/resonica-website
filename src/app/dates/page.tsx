import { Metadata } from 'next';
import { PrismicRichText, SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import Link from 'next/link';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('dates');
  const events = await client.getAllByType('event');

  console.log(events[0].data.event_title);

  return (
    <section>
      {events.map((event, index) => {
        return (
          <div>
            <PrismicRichText field={event.data.event_title} />
            <Link href={`/dates/${event.uid}`}>Read more</Link>
          </div>
        );
      })}
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
