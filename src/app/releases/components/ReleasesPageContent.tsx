'use client';

import React from 'react';

import styles from './ReleasesPageContent.module.css';
import ReleaseItem from './ReleaseItem/ReleaseItem';

export default function ReleasesPageContent({ releases }: { releases: any }) {
  return (
    <div className={styles.container}>
      <ReleaseItem releases={releases} />
    </div>
  );
}
