'use client';

import React from 'react';
import Link from 'next/link';
import styles from './ReleaseDropdown.module.css';
import Arrow from '../../Arrow/Arrow';
import type { NavRelease } from '@/app/lib/navigation';

export default function ReleaseDropdown({
  releases,
  isOpen,
  onNavigate,
}: {
  /** Already sorted newest first and capped by the server. */
  releases: NavRelease[];
  isOpen: boolean;
  onNavigate: () => void;
}) {
  return (
    <div className={`${styles.itemsContainer} ${isOpen ? styles.isHovered : ''}`}>
      {releases.map((item) => (
        <div key={item.id} className={styles.item}>
          <Link href={item.url} onClick={onNavigate}>
            <div className={styles.typeContainer}>
              <p>{item.number}</p>
            </div>
            <div className={styles.leftContainer}>
              <div className={styles.dateContainer}>
                <h3>{item.date}</h3>
              </div>
              <span>-</span>{' '}
              <div className={styles.titleContainer}>
                <h2>{item.title}</h2>
              </div>
            </div>
          </Link>
        </div>
      ))}
      <div className={styles.seeMore}>
        <Link href="/releases" onClick={onNavigate}>
          More Releases
          <span>
            <Arrow />
          </span>
        </Link>
      </div>
    </div>
  );
}
