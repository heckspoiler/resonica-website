'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { asText } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import styles from './ReleaseItem.module.css';
import ui from '@/app/components/CardText/CardText.module.css';
import Arrow from '@/app/components/Arrow/Arrow';
import {
  descriptionToText,
  truncateText,
} from '@/app/components/RichText/RichText';

export default function ReleaseItem({ releases }: { releases: any }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const maxChars = isMobile ? 90 : 260;

  return (
    <>
      {releases &&
        releases.map((release: any, index: number) => {
          const releaseDate = asText(release.data.release_date);
          const excerpt = truncateText(
            descriptionToText(release.data.release_description),
            maxChars
          );
          const links = (release.data.buylink_container ?? []).filter(
            (item: any) => item.buylink_label?.url
          );

          return (
            <article key={release.id ?? index} className={styles.item}>
              <div className={styles.imageContainer}>
                <PrismicNextImage
                  field={release.data.release_image}
                  fallbackAlt=""
                  sizes="(max-width: 1120px) 77vw, 14.25rem"
                />
              </div>
              <div className={styles.contentContainer}>
                <header className={ui.header}>
                  <h2 className={ui.title}>
                    {asText(release.data.release_title)}
                  </h2>
                  {releaseDate && (
                    <p className={ui.meta}>
                      <span className={ui.label}>Release date</span>
                      <span>{releaseDate}</span>
                    </p>
                  )}
                </header>

                <p className={styles.excerpt}>
                  {excerpt}{' '}
                  <Link href={release.url} className={ui.more}>
                    [MORE]
                  </Link>
                </p>

                {links.length > 0 && (
                  <div className={ui.linkRow}>
                    {links.map((item: any, linkIndex: number) => (
                      <PrismicNextLink
                        key={linkIndex}
                        field={item.buylink_label}
                        className={ui.link}
                      >
                        {item.buylink_label.text}
                        <Arrow />
                      </PrismicNextLink>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
    </>
  );
}
