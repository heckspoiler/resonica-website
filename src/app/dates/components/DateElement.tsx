'use client';
import React, { useState, useEffect } from 'react';
import { PrismicRichText } from '@prismicio/react';

import styles from './DateElement.module.css';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import Link from 'next/link';
import Image from 'next/image';

import arrow from '../../../../public/arrow.png';
import Arrow from '@/app/components/Arrow/Arrow';

export const truncateText = (text: string, maxLength: number) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + '... ';
  }
  return text;
};

export default function DateElement({ dates }: { dates: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const [arrowColor, setArrowColor] = useState('var(--black)');

  useEffect(() => {
    if (isHovered) {
      setArrowColor('white');
    } else {
      setArrowColor('var(--black)');
    }
  });

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
                <div className={styles.dateContainer}>
                  <PrismicRichText field={date.data.event_start_date} />
                </div>
              </div>
              <div className={styles.textContainer}>
                <p>
                  {truncateText(date.data.event_description, 260)}
                  <Link href={date.url}> [MORE]</Link>
                </p>
              </div>
              <div
                className={styles.linkContainer}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {date.data.ticket_link.url && (
                  <PrismicNextLink field={date.data.ticket_link}>
                    <p>{date.data.ticket_link.text}</p>
                    <span>
                      <Arrow fill={arrowColor} />
                    </span>
                  </PrismicNextLink>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
