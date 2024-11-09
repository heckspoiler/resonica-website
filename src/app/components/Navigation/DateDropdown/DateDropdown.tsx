'use client';

import React from 'react';

import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';

import styles from './DateDropdown.module.css';
import Link from 'next/link';

export default function DateDropdown({
  dates,
  showDateDropdown,
}: {
  dates: any;
  showDateDropdown: boolean;
}) {
  return (
    <div
      className={`${styles.itemsContainer} ${showDateDropdown ? styles.isHovered : null}`}
    >
      {dates &&
        dates.map((date: any, index: number) => (
          <div key={index} className={styles.item}>
            <PrismicNextLink href={date.url}>
              <div className={styles.typeContainer}>
                <p>{date.data.date_type[0].text[0]}</p>
              </div>
              <div className={styles.leftContainer}>
                <div className={styles.dateContainer}>
                  <PrismicRichText field={date.data.event_start_date} />
                </div>
                <span>-</span>
                <div className={styles.titleContainer}>
                  <PrismicRichText field={date.data.date_title} />
                </div>
              </div>
            </PrismicNextLink>
          </div>
        ))}
      <div className={styles.seeMore}>
        <Link href="/dates">More Dates & Events</Link>
      </div>
    </div>
  );
}
