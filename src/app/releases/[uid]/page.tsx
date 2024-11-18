import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

import styles from './page.module.css';
import ReleasePageContent from './components/ReleasePageContent';
import BackToHomeOverlay from '@/app/components/backToHomeOverlay/BackToHomeOverlay';

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID('release', uid).catch(() => notFound());
  const data = page.data;

  return (
    <section className={styles.main}>
      <ReleasePageContent data={data} />
      <BackToHomeOverlay />
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID('release', uid).catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType('release');

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
