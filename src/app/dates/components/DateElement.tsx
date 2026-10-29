import React from 'react';
import Link from 'next/link';
import { asText, type Content } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import styles from './DateElement.module.css';
import ui from '@/app/components/CardText/CardText.module.css';
import Arrow from '@/app/components/Arrow/Arrow';
import { Excerpt } from '@/app/components/RichText/RichText';
import { formatEventDate, getEventDates } from '@/app/lib/eventDates';
import { linkUrl } from '@/app/lib/links';

export default function DateElement({
  dates,
}: {
  dates: Content.DateDocument[];
}) {
  return (
    <>
      {dates.map((date) => {
        const days = getEventDates(date.data).filter((day) => day.date);

        return (
          <article key={date.id} className={styles.item}>
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
                <Excerpt field={date.data.event_description_rich} />{' '}
                <Link href={date.url ?? ''} className={ui.more}>
                  [MORE]
                </Link>
              </p>

              {linkUrl(date.data.ticket_link) && (
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
