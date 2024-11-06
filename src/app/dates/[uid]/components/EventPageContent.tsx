'use client';

import React from 'react';

import { PrismicRichText } from '@prismicio/react';

import styles from './EventPageContent.module.css';

export default function EventPageContent({ data }: { data: any }) {
  return (
    <div className={styles.container}>
      <PrismicRichText field={data.date_title} />
    </div>
  );
}
