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
  hovered,
  setHovered,
}: {
  dates: any;
  showDateDropdown: boolean;
  setShowDateDropdown: any;
  hovered: string | null;
  setHovered: any;
}) {
  const upcomingDates = dates.filter((date: any) => {
    const currentDate = new Date();
    const dateString = date.data.event_date_start;
    const eventDate = new Date(dateString);

    return eventDate >= currentDate;
  });

  const sortedDates = upcomingDates.sort((a: any, b: any) => {
    return a.data.date_index - b.data.date_index;
  });

  // Function to close the dropdown
  const handleLinkClick = () => {
    setShowDateDropdown(false);
  };

  return (
    <div
      className={`${styles.itemsContainer} ${showDateDropdown ? styles.isHovered : ''}`}
    >
      {dates &&
        sortedDates.length > 0 &&
        sortedDates.map((date: any, index: number) => (
          <div key={index} className={styles.item}>
            <PrismicNextLink href={date.url} onClick={handleLinkClick}>
              {/* onClick to close dropdown on link click */}
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
