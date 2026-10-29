import React from 'react';
import type { Content } from '@prismicio/client';

import styles from './ReleasesPageContent.module.css';
import ReleaseItem from './ReleaseItem/ReleaseItem';

export default function ReleasesPageContent({
  releases,
}: {
  releases: Content.ReleaseDocument[];
}) {
  return (
    <div className={styles.container}>
      <ReleaseItem releases={releases} />
    </div>
  );
}
