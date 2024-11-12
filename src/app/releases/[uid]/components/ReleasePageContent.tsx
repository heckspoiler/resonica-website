'use client';

import React, { useState, useEffect } from 'react';

import { PrismicRichText } from '@prismicio/react';

import styles from './ReleasePageContent.module.css';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import Arrow from '@/app/components/Arrow/Arrow';

export default function EventPageContent({ data }: { data: any }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.titleContainer}>
            <PrismicRichText field={data.release_title} />
            <div className={styles.timeContainer}>
              <h3>Release Date: </h3>
              <PrismicRichText field={data.release_date} />
            </div>
          </div>
          <div className={styles.descriptionContainer}>
            <PrismicRichText field={data.release_description} />{' '}
          </div>

          <div className={styles.songsContainer}>
            {data.release_titlelist.map((item: any, index: number) => (
              <div key={index} className={styles.act}>
                <p>
                  <span>{item.artist_name}</span> -{' '}
                  <span>{item.track_name}</span>
                </p>
                <p>{item.track_time}</p>
              </div>
            ))}
          </div>
          <div className={styles.linkContainer}>
            {data.buylink_container.map((item: any, index: number) => (
              <div key={index} className={styles.buyLink}>
                <PrismicNextLink field={item.buylink_label} />
                <span>
                  <Arrow
                    width={isMobile ? 8 : 11}
                    height={isMobile ? 8 : 11}
                    fill="var(--black)"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageContainer}>
          <PrismicNextImage field={data.release_image} />{' '}
        </div>
      </div>
    </div>
  );
}
