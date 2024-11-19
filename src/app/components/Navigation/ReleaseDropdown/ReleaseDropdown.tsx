'use client';

import React from 'react';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import styles from './ReleaseDropdown.module.css';
import Link from 'next/link';
import Arrow from '../../Arrow/Arrow';

export default function ReleaseDropdown({
  releases,
  showReleasesDropdown,
  setShowReleasesDropdown,
}: {
  releases: any;
  showReleasesDropdown: boolean;
  setShowReleasesDropdown: (value: boolean) => void;
}) {
  const sortedReleases = releases
    .sort((a: any, b: any) => {
      return b.data.release_index - a.data.release_index;
    })
    .slice(0, 10);

  // Function to close the dropdown
  const handleLinkClick = () => {
    setShowReleasesDropdown(false);
  };

  return (
    <div
      className={`${styles.itemsContainer} ${showReleasesDropdown ? styles.isHovered : ''}`}
    >
      {releases &&
        sortedReleases.length > 0 &&
        sortedReleases.map((item: any, index: number) => (
          <div key={index} className={styles.item}>
            <PrismicNextLink href={item.url} onClick={handleLinkClick}>
              {/* Added onClick handler to close dropdown */}
              <div className={styles.typeContainer}>
                <p>{item.data.release_number}</p>
              </div>
              <div className={styles.leftContainer}>
                <div className={styles.titleContainer}>
                  <PrismicRichText field={item.data.release_title} />
                </div>
                <span>-</span>
                <div className={styles.dateContainer}>
                  <PrismicRichText field={item.data.release_date} />
                </div>
              </div>
            </PrismicNextLink>
          </div>
        ))}
      <div className={styles.seeMore}>
        <Link href="/releases" onClick={handleLinkClick}>
          {/* Added onClick handler to close dropdown */}
          More Releases
          <span>
            <Arrow />
          </span>
        </Link>
      </div>
    </div>
  );
}
