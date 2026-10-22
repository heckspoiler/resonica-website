'use client';

import React, { useState } from 'react';
import styles from './OverlayPageContent.module.css';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';
import Arrow from '@/app/components/Arrow/Arrow';
import RichText from '@/app/components/RichText/RichText';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { isFilled } from '@prismicio/client';

type OverlayPageContentProps = {
  title: any;
  subtitle?: any;
  description: any;
  /** Render the description with the shared RichText styles (lists, h5/h6, links). */
  richDescription?: boolean;
  socials: any[];
  links: any[];
  image: any;
};

export default function OverlayPageContent({
  title,
  subtitle,
  description,
  richDescription = false,
  socials,
  links,
  image,
}: OverlayPageContentProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Skip empty repeatable entries: no link or icon → nothing rendered.
  const filledSocials = (socials ?? []).filter(
    (item: any) =>
      isFilled.link(item.social_link) &&
      item.social_link.url &&
      isFilled.image(item.social_icon)
  );
  const filledLinks = (links ?? []).filter(
    (item: any) => isFilled.link(item.link) && item.link.url
  );

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.titleContainer}>
            <PrismicRichText field={title} />
            {isFilled.richText(subtitle) && (
              <PrismicRichText field={subtitle} />
            )}
          </div>
          <div className={styles.descriptionContainer}>
            {richDescription ? (
              <RichText field={description} />
            ) : (
              <PrismicRichText field={description} />
            )}
          </div>
          {filledSocials.length > 0 && (
            <div className={styles.socialsContainer}>
              {filledSocials.map((item: any, index: number) => (
                <div className={styles.socialContainer} key={index}>
                  <Link href={item.social_link.url} target="_blank">
                    <PrismicNextImage field={item.social_icon} />
                  </Link>
                </div>
              ))}
            </div>
          )}
          {filledLinks.length > 0 && (
            <div className={styles.pressContainer}>
              {filledLinks.map((item: any, index: number) => (
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
          )}
        </div>

        {isFilled.image(image) && (
          <div className={styles.imageContainer}>
            <PrismicNextImage field={image} />
          </div>
        )}
      </div>
    </div>
  );
}
