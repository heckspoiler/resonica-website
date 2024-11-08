'use client';

import React from 'react';

import { PrismicRichText } from '@prismicio/react';

import styles from './EventPageContent.module.css';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

export default function EventPageContent({ data }: { data: any }) {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.titleContainer}>
            <PrismicRichText field={data.date_title} />
            <div className={styles.timeContainer}>
              <PrismicRichText field={data.event_date} />
              <PrismicRichText field={data.date_time} />
            </div>
          </div>
          <div className={styles.descriptionContainer}>
            <p>{data.event_description}</p>
          </div>
          <div className={styles.ticketContainer}>
            <PrismicNextLink field={data.ticket_link} />
          </div>
          <div className={styles.actsContainer}>
            {data.date_acts.map((item: any, index: number) => (
              <div key={index} className={styles.act}>
                <PrismicNextLink field={item.date_act} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageContainer}>
          <PrismicNextImage field={data.hero_image} />{' '}
        </div>
      </div>
    </div>
  );
}
