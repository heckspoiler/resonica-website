import React from 'react';
import type { Content } from '@prismicio/client';

import styles from './DatesPageContent.module.css';

import DateElement from './DateElement';

export default function DatesPageContent({
  dates,
}: {
  dates: Content.DateDocument[];
}) {
  return (
    <div className={styles.container}>
      <DateElement dates={dates} />
    </div>
  );
}
