import React from 'react';
import Link from 'next/link';
import { asText, type Content } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import styles from './ReleaseItem.module.css';
import ui from '@/app/components/CardText/CardText.module.css';
import Arrow from '@/app/components/Arrow/Arrow';
import { Excerpt } from '@/app/components/RichText/RichText';
import { linkUrl } from '@/app/lib/links';

export default function ReleaseItem({
  releases,
}: {
  releases: Content.ReleaseDocument[];
}) {
  return (
    <>
      {releases.map((release) => {
        const releaseDate = asText(release.data.release_date);
        const links = release.data.buylink_container.filter((item) =>
          linkUrl(item.buylink_label)
        );

        return (
          <article key={release.id} className={styles.item}>
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
                <Excerpt field={release.data.release_description} />{' '}
                <Link href={release.url ?? ''} className={ui.more}>
                  [MORE]
                </Link>
              </p>

              {links.length > 0 && (
                <div className={ui.linkRow}>
                  {links.map((item, linkIndex) => (
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
