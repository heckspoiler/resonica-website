'use client';

import { PrismicRichText } from '@prismicio/react';
import React from 'react';

import styles from './DateElement.module.css';
import { PrismicNextImage } from '@prismicio/next';
import Link from 'next/link';

export default function DateElement({ dates }: { dates: any }) {
  console.log(dates);

  const truncateText = (text: string, maxLength: number) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '... [MORE]';
    }
    return text;
  };

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
                <PrismicRichText field={date.data.event_date} />
              </div>
              <div className={styles.textContainer}>
                <p>
                  {truncateText(date.data.description, 100)}{' '}
                  <Link href={date.url}>[...MORE]</Link>
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
