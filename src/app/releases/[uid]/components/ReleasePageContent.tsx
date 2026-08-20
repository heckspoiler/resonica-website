'use client';

import { asText } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import styles from './ReleasePageContent.module.css';
import ui from '@/app/components/CardText/CardText.module.css';
import RichText from '@/app/components/RichText/RichText';
import Arrow from '@/app/components/Arrow/Arrow';

export default function ReleasePageContent({ data }: { data: any }) {
  const releaseDate = asText(data.release_date);

  const tracks = (data.release_titlelist ?? []).filter(
    (track: any) => track.track_name || track.artist_name
  );
  const links = (data.buylink_container ?? []).filter(
    (item: any) => item.buylink_label?.url
  );

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <header className={ui.header}>
            <h2 className={ui.title}>{asText(data.release_title)}</h2>
            {releaseDate && (
              <p className={ui.meta}>
                <span className={ui.label}>Release date</span>
                <span>{releaseDate}</span>
              </p>
            )}
          </header>

          <RichText field={data.release_description} />

          {tracks.length > 0 && (
            <section className={ui.section}>
              <p className={ui.label}>Tracklist</p>
              <ol className={ui.tracklist}>
                {tracks.map((track: any, index: number) => (
                  <li key={index} className={ui.track}>
                    <span className={ui.trackNo}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>
                      {track.artist_name && (
                        <span className={ui.trackArtist}>
                          {track.artist_name}
                        </span>
                      )}
                      {track.artist_name && track.track_name && ' – '}
                      {track.track_name && (
                        <span className={ui.trackName}>{track.track_name}</span>
                      )}
                    </span>
                    <span className={ui.trackTime}>{track.track_time}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {links.length > 0 && (
            <section className={ui.section}>
              <p className={ui.label}>Listen &amp; buy</p>
              <div className={ui.linkRow}>
                {links.map((item: any, index: number) => (
                  <PrismicNextLink
                    key={index}
                    field={item.buylink_label}
                    className={ui.link}
                  >
                    {item.buylink_label.text}
                    <Arrow />
                  </PrismicNextLink>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className={styles.imageContainer}>
          <PrismicNextImage field={data.release_image} fallbackAlt="" />
        </div>
      </div>
    </div>
  );
}
