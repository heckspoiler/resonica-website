'use client';

import { PrismicNextImage } from '@prismicio/next';
import React, { useEffect, useState } from 'react';

import Marquee from 'react-fast-marquee';

import styles from './MarqueeContent.module.css';
import Link from 'next/link';

export default function MarqueeContent({ marquee }: { marquee: any }) {
  const [showMarquee, setShowMarquee] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMarquee(true);
    }, 1000);
  }, []);

  return (
    <div
      className={`${styles.marquee} ${showMarquee && styles.marqueeVisible}`}
    >
      <div className={styles.marqueeContent}>
        <Marquee autoFill={true} pauseOnHover={true} speed={20}>
          <Link href={marquee.marquee_link.url} target="_blank">
            <div className={styles.marqueeElement}>
              <p>{marquee.marquee_text}</p>
              <div className={styles.imageContainer}>
                <PrismicNextImage field={marquee.logo} />
              </div>
              <p>{marquee.second_marquee_text}</p>
            </div>
          </Link>
        </Marquee>
      </div>
    </div>
  );
}
