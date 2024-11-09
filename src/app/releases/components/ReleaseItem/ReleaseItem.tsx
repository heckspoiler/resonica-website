'use client';

import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import React from 'react';

import styles from './ReleaseItem.module.css';

import { truncateText } from '@/app/dates/components/DateElement';
import Link from 'next/link';
import Arrow from '@/app/components/Arrow/Arrow';

export default function ReleaseItem({ releases }: { releases: any }) {
  return (
    <>
      {releases &&
        releases.map((release: any, index: number) => (
          <div key={index} className={styles.item}>
            <div className={styles.imageContainer}>
              <PrismicNextImage field={release.data.hero_image} />
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.titleContainer}>
                <PrismicRichText field={release.data.date_title} />
                <PrismicRichText field={release.data.event_start_date} />
              </div>
              <div className={styles.textContainer}>
                <p>
                  {truncateText(release.data.event_description, 260)}
                  <Link href={release.url}>[MORE]</Link>
                </p>
              </div>
              {/* <div className={styles.linkContainer}>
                <PrismicNextLink field={release.data}>
                  <p>{release.data.ticket_link.text}</p>
                  <span>
                    <Arrow width={12} height={13} fill="var(--black)" />
                  </span>
                </PrismicNextLink>
              </div> */}
            </div>
          </div>
        ))}
    </>
  );
}
