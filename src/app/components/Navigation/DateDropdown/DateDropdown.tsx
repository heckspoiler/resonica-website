'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './DateDropdown.module.css';
import Arrow from '../../Arrow/Arrow';
import {
  compareByFirstDate,
  firstEventDate,
  formatEventDate,
  isUpcoming,
  todayIso,
} from '@/app/lib/eventDates';
import type { NavDate } from '@/app/lib/navigation';

function DateList({
  label,
  dates,
  onNavigate,
}: {
  label: string;
  dates: NavDate[];
  onNavigate: () => void;
}) {
  if (dates.length === 0) return null;

  return (
    <>
      <div className={styles.sectionLabel}>
        <h3>{label}</h3>
      </div>
      {dates.map((date) => (
        <div key={date.id} className={styles.item}>
          <Link href={date.url} onClick={onNavigate}>
            <div className={styles.typeContainer}>
              <p>{date.type}</p>
            </div>
            <div className={styles.leftContainer}>
              <div className={styles.dateContainer}>
                <h3>{formatEventDate(firstEventDate(date))}</h3>
              </div>
              <span>-</span>
              <div className={styles.titleContainer}>
                <h2>{date.title}</h2>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}

export default function DateDropdown({
  dates,
  renderedOn,
  isOpen,
  onNavigate,
}: {
  dates: NavDate[];
  /** The server's date when the cached page was rendered. */
  renderedOn: string;
  isOpen: boolean;
  onNavigate: () => void;
}) {
  // Hydrate with the server's date so the markup matches, then switch to the
  // visitor's: the cached page may have been rendered days ago.
  const [today, setToday] = useState(renderedOn);
  useEffect(() => setToday(todayIso()), []);

  // An event stays "upcoming" until its last day is over.
  // Upcoming: earliest first. Past: most recent first, only the last 3.
  const upcoming = dates
    .filter((date) => isUpcoming(date, today))
    .sort(compareByFirstDate)
    .slice(0, 10);
  const past = dates
    .filter((date) => !isUpcoming(date, today))
    .sort((a, b) => -compareByFirstDate(a, b))
    .slice(0, 3);

  return (
    <div className={`${styles.itemsContainer} ${isOpen ? styles.isHovered : ''}`}>
      <DateList label="Upcoming Dates" dates={upcoming} onNavigate={onNavigate} />
      <DateList label="Past Dates" dates={past} onNavigate={onNavigate} />

      <div className={styles.seeMore}>
        <Link href="/dates" onClick={onNavigate}>
          More Dates & Events
          <span>
            <Arrow />
          </span>
        </Link>
      </div>
    </div>
  );
}
