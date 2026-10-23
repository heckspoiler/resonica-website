import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { createClient } from '@/prismicio';

import styles from './page.module.css';

import OverlayPageContent from '../components/OverlayPageContent/OverlayPageContent';
import BackToHomeOverlay from '../components/backToHomeOverlay/BackToHomeOverlay';
import VideoGallery from '../components/VideoGallery/VideoGallery';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('studio').catch(() => notFound());
  const data = page.data;

  return (
    <section className={styles.main}>
      <OverlayPageContent
        title={data.page_title}
        subtitle={data.subtitle}
        description={data.studio_description}
        richDescription
        socials={data.studio_socials}
        links={data.studio_links}
        image={data.hero_image}
        video={data.hero_video}
      >
        <VideoGallery items={data.studio_videos} />
      </OverlayPageContent>
      <BackToHomeOverlay />
    </section>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('studio').catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
