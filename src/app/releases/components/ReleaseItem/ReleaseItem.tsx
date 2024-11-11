'use client';

import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import React from 'react';

import styles from './ReleaseItem.module.css';

import { truncateText } from '@/app/dates/components/DateElement';
import Link from 'next/link';
import Arrow from '@/app/components/Arrow/Arrow';

export default function ReleaseItem({ releases }: { releases: any }) {
  console.log(releases);
  return (
    <>
      {releases &&
        releases.map((release: any, index: number) => (
          <div key={index} className={styles.item}>
            <div className={styles.imageContainer}>
              <PrismicNextImage field={release.data.release_image} />
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.titleContainer}>
                <PrismicRichText field={release.data.release_title} />
                <div className={styles.releaseDate}>
                  <h3>RELEASE DATE:</h3>
                  <PrismicRichText field={release.data.release_date} />
                </div>
              </div>
              <div className={styles.textContainer}>
                <p>
                  {truncateText(release.data.release_description[0].text, 260)}
                  <Link href={release.url}>[MORE]</Link>
                </p>
              </div>
              <div className={styles.linkContainer} key={index}>
                {release.data.buylink_container.map(
                  (item: any, index: number) => (
                    <span key={index}>
                      <PrismicNextLink field={item.buylink_label}>
                        <p>{item.buylink_label.text}</p>
                        <span>
                          <Arrow width={11} height={11} fill="var(--black)" />
                        </span>
                      </PrismicNextLink>
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
