import React from 'react';

import styles from './DatesPageContent.module.css';

import DateElement from './DateElement';

export default function DatesPageContent({ dates }: { dates: any }) {
  return (
    <div className={styles.container}>
      <DateElement dates={dates} />
      <DateElement dates={dates} />
      <DateElement dates={dates} />
      <DateElement dates={dates} />
      <DateElement dates={dates} />
      <DateElement dates={dates} />
      <DateElement dates={dates} />
      <DateElement dates={dates} />
      <DateElement dates={dates} />
      <DateElement dates={dates} />
    </div>
  );
}
