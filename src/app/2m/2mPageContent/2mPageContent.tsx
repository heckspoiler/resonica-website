'use client';

import React, { useState } from 'react';
import styles from './2mPageContent.module.css';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';
import Arrow from '@/app/components/Arrow/Arrow';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

export default function PageContent({ data }: { data: any }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.titleContainer}>
            <PrismicRichText field={data.page_title} />
          </div>
          <div className={styles.descriptionContainer}>
            <PrismicRichText field={data.zweim_description} />
          </div>
          <div className={styles.socialsContainer}>
            {data.zweim_socials.map((item: any, index: number) => (
              <div className={styles.socialContainer} key={index}>
                <Link href={item.social_link.url} target="_blank">
                  <PrismicNextImage field={item.social_icon} />
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.pressContainer}>
            {data.zweim_links.map((item: any, index: number) => (
              <div
                className={styles.presslinkContainer}
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <PrismicNextLink field={item.link} />
                <Link href={item.link.url}>
                  <Arrow
                    fill={hoveredIndex === index ? 'white' : 'var(--black)'}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageContainer}>
          <PrismicNextImage field={data.hero_image} />{' '}
        </div>
      </div>
    </div>
  );
}
