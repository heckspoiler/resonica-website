'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { asText } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import styles from './DateElement.module.css';
import ui from '@/app/components/CardText/CardText.module.css';
import Arrow from '@/app/components/Arrow/Arrow';
import {
  descriptionToText,
  truncateText,
} from '@/app/components/RichText/RichText';
import { formatEventDate, getEventDates } from '@/app/lib/eventDates';

export default function DateElement({ dates }: { dates: any }) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const maxChars = isMobile ? 90 : 260;

  return (
    <>
      {dates &&
        dates.map((date: any, index: number) => {
          const days = getEventDates(date.data).filter((day) => day.date);
          const excerpt = truncateText(
            descriptionToText(date.data.event_description_rich),
            maxChars
          );

          return (
            <article key={date.id ?? index} className={styles.item}>
              <div className={styles.imageContainer}>
                <PrismicNextImage
                  field={date.data.hero_image}
                  fallbackAlt=""
                  sizes="(max-width: 1120px) 77vw, 14.25rem"
                />
              </div>
              <div className={styles.contentContainer}>
                <header className={ui.header}>
                  <h2 className={ui.title}>{asText(date.data.date_title)}</h2>
                  {days.length > 0 && (
                    <p className={ui.meta}>
                      {days.map((day, dayIndex) => (
                        <React.Fragment key={dayIndex}>
                          {dayIndex > 0 && (
                            <span className={ui.sep} aria-hidden="true" />
                          )}
                          <span>{formatEventDate(day.date)}</span>
                        </React.Fragment>
                      ))}
                    </p>
                  )}
                </header>

                <p className={styles.excerpt}>
                  {excerpt}{' '}
                  <Link href={date.url} className={ui.more}>
                    [MORE]
                  </Link>
                </p>

                {date.data.ticket_link?.url && (
                  <PrismicNextLink
                    field={date.data.ticket_link}
                    className={ui.link}
                  >
                    {date.data.ticket_link.text || 'Tickets'}
                    <Arrow />
                  </PrismicNextLink>
                )}
              </div>
            </article>
          );
        })}
    </>
  );
}
