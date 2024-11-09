'use client';
import React, { useState, useEffect } from 'react';
import { PrismicRichText } from '@prismicio/react';

import styles from './DateElement.module.css';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import Link from 'next/link';
import Image from 'next/image';

import arrow from '../../../../public/arrow.png';

export default function DateElement({ dates }: { dates: any }) {
  const truncateText = (text: string, maxLength: number) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '... ';
    }
    return text;
  };

  return (
    <>
      {dates &&
        dates.map((date: any, index: number) => (
          <div key={index} className={styles.item}>
            <div className={styles.imageContainer}>
              <PrismicNextImage field={date.data.hero_image} />
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.titleContainer}>
                <PrismicRichText field={date.data.date_title} />
                <PrismicRichText field={date.data.event_date} />
              </div>
              <div className={styles.textContainer}>
                <p>
                  {truncateText(date.data.event_description, 230)}
                  <Link href={date.url}>[MORE]</Link>
                </p>
              </div>
              <div className={styles.linkContainer}>
                <PrismicNextLink field={date.data.ticket_link}>
                  <p>Tickets</p>
                  <Image src={arrow} alt="Arrow Image" />
                </PrismicNextLink>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
