'use client';

import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import React, { useState, useEffect } from 'react';

import styles from './ReleaseItem.module.css';
import { truncateText } from '@/app/dates/components/DateElement';
import Link from 'next/link';
import Arrow from '@/app/components/Arrow/Arrow';

export default function ReleaseItem({ releases }: { releases: any }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredLinkIndex, setHoveredLinkIndex] = useState<number | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const characterAmount = isMobile ? 150 : 260;

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
                  {truncateText(
                    release.data.release_description[0].text,
                    characterAmount
                  )}
                  <Link href={release.url}>[MORE]</Link>
                </p>
              </div>
              <div className={styles.linkContainer} key={index}>
                {release.data.buylink_container.map(
                  (item: any, linkIndex: number) => (
                    <span
                      key={linkIndex}
                      onMouseEnter={() => setHoveredLinkIndex(linkIndex)}
                      onMouseLeave={() => setHoveredLinkIndex(null)}
                    >
                      <PrismicNextLink field={item.buylink_label}>
                        <p>{item.buylink_label.text}</p>
                        <span>
                          <Arrow
                            fill={
                              hoveredLinkIndex === linkIndex
                                ? 'white'
                                : 'var(--black)'
                            }
                          />
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
