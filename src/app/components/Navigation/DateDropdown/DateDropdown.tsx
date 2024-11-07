'use client';

import React from 'react';

import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';

import styles from './DateDropdown.module.css';
import Link from 'next/link';

export default function DateDropdown({ dates }: { dates: any }) {
  return (
    <>
      {dates &&
        dates.map((date: any, index: number) => (
          <div key={index} className={styles.item}>
            <div className={styles.contentContainer}>
              <div className={styles.titleContainer}>
                <PrismicRichText field={date.data.date_title} />
                <PrismicRichText field={date.data.event_date} />
              </div>
              <PrismicNextLink href={date.url}>See More</PrismicNextLink>
            </div>
          </div>
        ))}
      <Link href="/dates">See More Dates</Link>
    </>
  );
}
