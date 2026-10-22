'use client';

import React, { useState } from 'react';
import styles from './OverlayPageContent.module.css';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';
import Arrow from '@/app/components/Arrow/Arrow';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

type OverlayPageContentProps = {
  title: any;
  description: any;
  socials: any[];
  links: any[];
  image: any;
};

export default function OverlayPageContent({
  title,
  description,
  socials,
  links,
  image,
}: OverlayPageContentProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.titleContainer}>
            <PrismicRichText field={title} />
          </div>
          <div className={styles.descriptionContainer}>
            <PrismicRichText field={description} />
          </div>
          <div className={styles.socialsContainer}>
            {socials.map((item: any, index: number) => (
              <div className={styles.socialContainer} key={index}>
                <Link href={item.social_link.url} target="_blank">
                  <PrismicNextImage field={item.social_icon} />
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.pressContainer}>
            {links.map((item: any, index: number) => (
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
          <PrismicNextImage field={image} />{' '}
        </div>
      </div>
    </div>
  );
}
