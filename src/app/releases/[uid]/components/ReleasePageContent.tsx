'use client';

import React, { useState, useEffect } from 'react';
import { PrismicRichText } from '@prismicio/react';
import styles from './ReleasePageContent.module.css';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import Arrow from '@/app/components/Arrow/Arrow';

export default function EventPageContent({ data }: { data: any }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
            <PrismicRichText field={data.release_description} />
          </div>

          <div className={styles.songsContainer}>
            {data.release_titlelist.reduce(
              (acc: any, _: any, index: number) => {
                if (index % 2 === 0) {
                  acc.push(
                    <div key={index} className={styles.pairContainer}>
                      <div className={styles.act}>
                        <p>
                          <span>
                            {data.release_titlelist[index]?.artist_name}
                          </span>{' '}
                          -{' '}
                          <span>
                            {data.release_titlelist[index]?.track_name}
                          </span>
                        </p>
                        <p>{data.release_titlelist[index]?.track_time}</p>
                      </div>
                      {index + 1 < data.release_titlelist.length && (
                        <div className={styles.act}>
                          <p>
                            <span>
                              {data.release_titlelist[index + 1]?.artist_name}
                            </span>{' '}
                            -{' '}
                            <span>
                              {data.release_titlelist[index + 1]?.track_name}
                            </span>
                          </p>
                          <p>{data.release_titlelist[index + 1]?.track_time}</p>
                        </div>
                      )}
                    </div>
                  );
                }
                return acc;
              },
              []
            )}
          </div>

          <div className={styles.linkContainer}>
            {data.buylink_container.map((item: any, index: number) => (
              <div
                key={index}
                className={styles.buyLink}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <PrismicNextLink field={item.buylink_label} />
                <span>
                  <Arrow
                    width={isMobile ? 8 : 10}
                    height={isMobile ? 8 : 10}
                    fill={hoveredIndex === index ? 'white' : 'var(--black)'}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageContainer}>
          <PrismicNextImage field={data.release_image} />
        </div>
      </div>
    </div>
  );
}
