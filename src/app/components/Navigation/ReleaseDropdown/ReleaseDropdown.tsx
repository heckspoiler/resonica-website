'use client';

import React from 'react';

import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';

import styles from './ReleaseDropdown.module.css';
import Link from 'next/link';
import Arrow from '../../Arrow/Arrow';

export default function DateDropdown({
  releases,
  showReleasesDropdown,
}: {
  releases: any;
  showReleasesDropdown: boolean;
}) {
  const sortedReleases = releases.sort((a: any, b: any) => {
    return b.data.release_index - a.data.release_index;
  });
  return (
    <div
      className={`${styles.itemsContainer} ${showReleasesDropdown ? styles.isHovered : null}`}
    >
      {releases &&
        sortedReleases.length > 0 &&
        sortedReleases.map((item: any, index: number) => (
          <div key={index} className={styles.item}>
            <PrismicNextLink href={item.url}>
              <div className={styles.typeContainer}>
                <p>{item.data.release_number}</p>
              </div>
              <div className={styles.leftContainer}>
                <div className={styles.dateContainer}>
                  <PrismicRichText field={item.data.release_date} />
                </div>
                <span>-</span>
                <div className={styles.titleContainer}>
                  <PrismicRichText field={item.data.release_title} />
                </div>
              </div>
            </PrismicNextLink>
          </div>
        ))}
      <div className={styles.seeMore}>
        <Link href="/releases">
          More Releases
          <span>
            <Arrow width={10} height={11} />
          </span>
        </Link>
      </div>
    </div>
  );
}
