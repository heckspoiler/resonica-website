'use client';

import { asText } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import styles from './EventPageContent.module.css';
import ui from '@/app/components/CardText/CardText.module.css';
import RichText from '@/app/components/RichText/RichText';
import Arrow from '@/app/components/Arrow/Arrow';
import { formatEventDate, getEventDates } from '@/app/lib/eventDates';

export default function EventPageContent({ data }: { data: any }) {
  const eventDates = getEventDates(data);

  const acts = (data.date_acts ?? []).filter(
    (item: any) => item.date_act?.text || item.date_act?.url
  );

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <header className={ui.header}>
            <h2 className={ui.title}>{asText(data.date_title)}</h2>
            {eventDates.length > 0 && (
              <div className={ui.metaList}>
                {eventDates.map((day, index) => (
                  <p key={index} className={ui.meta}>
                    {day.date && <span>{formatEventDate(day.date)}</span>}
                    {day.date && day.time && (
                      <span className={ui.sep} aria-hidden="true" />
                    )}
                    {day.time && <span className={ui.muted}>{day.time}</span>}
                  </p>
                ))}
              </div>
            )}
          </header>

          <RichText field={data.event_description_rich} />

          {data.ticket_link?.url && (
            <PrismicNextLink field={data.ticket_link} className={ui.link}>
              {data.ticket_link.text || 'Tickets'}
              <Arrow />
            </PrismicNextLink>
          )}

          <section className={ui.section}>
            <p className={ui.label}>Line-up</p>
            {acts.length === 0 ? (
              <p className={styles.tba}>Acts tba</p>
            ) : (
              <ul className={ui.linkList}>
                {acts.map((item: any, index: number) => (
                  <li key={index}>
                    {item.date_act.url ? (
                      <PrismicNextLink
                        field={item.date_act}
                        className={ui.link}
                      >
                        {item.date_act.text}
                        <Arrow />
                      </PrismicNextLink>
                    ) : (
                      <span className={ui.link}>{item.date_act.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className={styles.imageContainer}>
          <PrismicNextImage field={data.hero_image} fallbackAlt="" />
        </div>
      </div>
    </div>
  );
}
