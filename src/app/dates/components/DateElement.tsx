'use client';
import React, { useState } from 'react';
import { PrismicRichText } from '@prismicio/react';

import styles from './DateElement.module.css';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import Link from 'next/link';
import Arrow from '@/app/components/Arrow/Arrow';

export const truncateText = (text: string, maxLength: number) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + '... ';
  }
  return text;
};

export default function DateElement({ dates }: { dates: any }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {dates &&
        dates.map((date: any, index: number) => (
          <div key={index} className={styles.item}>
            <div className={styles.imageContainer}>
              <PrismicNextImage field={date.data.hero_image} />
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.titleContainer}>
                <PrismicRichText field={date.data.date_title} />
                <div className={styles.dateContainer}>
                  <PrismicRichText field={date.data.event_start_date} />
                </div>
              </div>
              <div className={styles.textContainer}>
                <p>
                  {truncateText(date.data.event_description, 260)}
                  <Link href={date.url}> [MORE]</Link>
                </p>
              </div>
              <div
                className={styles.linkContainer}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {date.data.ticket_link.url && (
                  <PrismicNextLink field={date.data.ticket_link}>
                    <p>{date.data.ticket_link.text}</p>
                    <span>
                      <Arrow
                        fill={hoveredIndex === index ? 'white' : 'var(--black)'}
                      />
                    </span>
                  </PrismicNextLink>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
