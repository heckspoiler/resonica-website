'use client';

import React from 'react';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import styles from './DateDropdown.module.css';
import Link from 'next/link';
import Arrow from '../../Arrow/Arrow';

export default function DateDropdown({
  dates,
  showDateDropdown,
  setShowDateDropdown,
}: {
  dates: any;
  showDateDropdown: boolean;
  setShowDateDropdown: any;
}) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Separate dates into upcoming and past
  const upcomingDates = dates.filter((date: any) => {
    const eventDate = new Date(date.data.event_date_start);
    const eventDateStart = new Date(eventDate);
    eventDateStart.setHours(0, 0, 0, 0);
    return eventDateStart >= currentDate;
  });

  const pastDates = dates.filter((date: any) => {
    const eventDate = new Date(date.data.event_date_start);
    const eventDateStart = new Date(eventDate);
    eventDateStart.setHours(0, 0, 0, 0);
    return eventDateStart < currentDate;
  });

  // Sort upcoming dates (chronologically, earliest first)
  const sortedUpcomingDates = upcomingDates
    .sort((a: any, b: any) => {
      const dateA = new Date(a.data.event_date_start);
      const dateB = new Date(b.data.event_date_start);

      // Handle invalid dates
      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;

      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 10);

  // Sort past dates (reverse chronologically, most recent first)
  const sortedPastDates = pastDates
    .sort((a: any, b: any) => {
      const dateA = new Date(a.data.event_date_start);
      const dateB = new Date(b.data.event_date_start);

      // Handle invalid dates
      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;

      return dateB.getTime() - dateA.getTime(); // Reverse order
    })
    .slice(0, 3); // Show only 3 most recent past dates

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
