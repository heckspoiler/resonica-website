'use client';

import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import type { Content } from '@prismicio/client';
import React, { useEffect, useState } from 'react';

import Marquee from 'react-fast-marquee';

import styles from './MarqueeContent.module.css';

export default function MarqueeContent({
  marquee,
}: {
  marquee: Content.MarqueeDocument['data'];
}) {
  const [showMarquee, setShowMarquee] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowMarquee(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`${styles.marquee} ${showMarquee ? styles.marqueeVisible : ''}`}
    >
      <div className={styles.marqueeContent}>
        <Marquee autoFill={true} pauseOnHover={true} speed={20}>
          <PrismicNextLink field={marquee.marquee_link}>
            <div className={styles.marqueeElement}>
              <p>{marquee.marquee_text}</p>
              <div className={styles.imageContainer}>
                <PrismicNextImage field={marquee.logo} fallbackAlt="" />
              </div>
              <p>{marquee.second_marquee_text}</p>
            </div>
          </PrismicNextLink>
        </Marquee>
      </div>
    </div>
  );
}
