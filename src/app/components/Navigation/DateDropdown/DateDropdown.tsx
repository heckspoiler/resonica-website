'use client';

import React from 'react';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/client';
import styles from './DateDropdown.module.css';
import Link from 'next/link';
import Arrow from '../../Arrow/Arrow';
import {
  compareByFirstDate,
  firstEventDate,
  formatEventDate,
  isUpcoming,
} from '@/app/lib/eventDates';

export default function DateDropdown({
  dates,
  showDateDropdown,
  setShowDateDropdown,
}: {
  dates: any;
  showDateDropdown: boolean;
  setShowDateDropdown: any;
}) {
  // An event stays "upcoming" until its last day is over.
  const upcomingDates = dates.filter((date: any) => isUpcoming(date.data));
  const pastDates = dates.filter((date: any) => !isUpcoming(date.data));

  // Upcoming: earliest first. Past: most recent first, only the last 3.
  const sortedUpcomingDates = [...upcomingDates]
    .sort(compareByFirstDate)
    .slice(0, 10);
  const sortedPastDates = [...pastDates]
    .sort((a: any, b: any) => -compareByFirstDate(a, b))
    .slice(0, 3);

  // Function to close the dropdown
  const handleLinkClick = () => {
    setShowDateDropdown(false);
  };

  return (
    <div
      className={`${styles.itemsContainer} ${showDateDropdown ? styles.isHovered : ''}`}
    >
      {/* Upcoming Dates Section */}
      {dates && sortedUpcomingDates.length > 0 && (
        <>
          <div className={styles.sectionLabel}>
            <h3>Upcoming Dates</h3>
          </div>
          {sortedUpcomingDates.map((date: any, index: number) => (
            <div key={index} className={styles.item}>
              <PrismicNextLink href={date.url} onClick={handleLinkClick}>
                <div className={styles.typeContainer}>
                  <p>{(asText(date.data.date_type) ?? '').charAt(0)}</p>
                </div>
                <div className={styles.leftContainer}>
                  <div className={styles.dateContainer}>
                    <h3>{formatEventDate(firstEventDate(date.data))}</h3>
                  </div>
                  <span>-</span>
                  <div className={styles.titleContainer}>
                    <PrismicRichText field={date.data.date_title} />
                  </div>
                </div>
              </PrismicNextLink>
            </div>
          ))}
        </>
      )}

      {/* Past Dates Section */}
      {dates && sortedPastDates.length > 0 && (
        <>
          <div className={styles.sectionLabel}>
            <h3>Past Dates</h3>
          </div>
          {sortedPastDates.map((date: any, index: number) => (
            <div key={index} className={styles.item}>
              <PrismicNextLink href={date.url} onClick={handleLinkClick}>
                <div className={styles.typeContainer}>
                  <p>{(asText(date.data.date_type) ?? '').charAt(0)}</p>
                </div>
                <div className={styles.leftContainer}>
                  <div className={styles.dateContainer}>
                    <h3>{formatEventDate(firstEventDate(date.data))}</h3>
                  </div>
                  <span>-</span>
                  <div className={styles.titleContainer}>
                    <PrismicRichText field={date.data.date_title} />
                  </div>
                </div>
              </PrismicNextLink>
            </div>
          ))}
        </>
      )}

      <div className={styles.seeMore}>
        <Link href="/dates" onClick={handleLinkClick}>
          {/* onClick to close dropdown on "More Dates & Events" click */}
          More Dates & Events
          <span>
            <Arrow />
          </span>
        </Link>
      </div>
    </div>
  );
}
