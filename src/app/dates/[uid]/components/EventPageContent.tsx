'use client';

import React from 'react';

import { PrismicRichText } from '@prismicio/react';

import styles from './EventPageContent.module.css';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import Arrow from '@/app/components/Arrow/Arrow';
import Link from 'next/link';

export default function EventPageContent({ data }: { data: any }) {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.titleContainer}>
            <PrismicRichText field={data.date_title} />
            <div className={styles.timeContainer}>
              <PrismicRichText field={data.event_start_date} />
              <PrismicRichText field={data.date_time} />
            </div>
          </div>
          <div className={styles.descriptionContainer}>
            <p>{data.event_description}</p>
          </div>
          <div className={styles.ticketContainer}>
            <Link href={data.ticket_link.url} target="_blank">
              <span>{data.ticket_link.text}</span>
              <span>
                <Arrow width={12} height={13} fill="var(--black)" />
              </span>
            </Link>
          </div>
          <div className={styles.actsContainer}>
            {data.date_acts.map((item: any, index: number) => (
              <div key={index} className={styles.act}>
                <Link href={item.date_act.url} target="_blank">
                  <span>{item.date_act.text}</span>
                  <span>
                    <Arrow width={12} height={13} fill="var(--black)" />
                  </span>
                </Link>
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
