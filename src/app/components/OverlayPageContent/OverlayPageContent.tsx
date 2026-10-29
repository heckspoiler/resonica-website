import React from 'react';
import styles from './OverlayPageContent.module.css';
import { PrismicRichText } from '@prismicio/react';
import Arrow from '@/app/components/Arrow/Arrow';
import RichText from '@/app/components/RichText/RichText';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import {
  isFilled,
  type ImageField,
  type LinkField,
  type LinkToMediaField,
  type RichTextField,
} from '@prismicio/client';
import { linkUrl } from '@/app/lib/links';

type OverlayPageContentProps = {
  title: RichTextField;
  subtitle?: RichTextField;
  description: RichTextField;
  socials: { social_link: LinkField; social_icon: ImageField }[];
  links: { link: LinkField }[];
  image: ImageField;
  /** When filled it replaces the image, which becomes the poster. */
  video?: LinkToMediaField;
  /**
   * Extra content (e.g. the video gallery) inside the card's usual size:
   * under the info column on desktop, at the very bottom on mobile/tablet.
   */
  children?: React.ReactNode;
};

export default function OverlayPageContent({
  title,
  subtitle,
  description,
  socials,
  links,
  image,
  video,
  children,
}: OverlayPageContentProps) {
  // Skip empty repeatable entries: no link or icon → nothing rendered.
  const filledSocials = socials.filter(
    (item) => linkUrl(item.social_link) && isFilled.image(item.social_icon)
  );
  const filledLinks = links.filter((item) => linkUrl(item.link));

  return (
    <div className={styles.container}>
      <div
        className={`${styles.contentContainer} ${children ? styles.withExtra : ''}`}
      >
        <div className={styles.infoContainer}>
          <div className={styles.titleContainer}>
            <PrismicRichText field={title} />
            {isFilled.richText(subtitle) && (
              <PrismicRichText field={subtitle} />
            )}
          </div>
          <div className={styles.descriptionContainer}>
            <RichText field={description} />
          </div>
          {filledSocials.length > 0 && (
            <div className={styles.socialsContainer}>
              {filledSocials.map((item, index) => (
                <div className={styles.socialContainer} key={index}>
                  <a
                    href={linkUrl(item.social_link)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PrismicNextImage field={item.social_icon} />
                  </a>
                </div>
              ))}
            </div>
          )}
          {filledLinks.length > 0 && (
            <div className={styles.pressContainer}>
              {filledLinks.map((item, index) => (
                <div className={styles.presslinkContainer} key={index}>
                  <PrismicNextLink field={item.link} />
                  <PrismicNextLink field={item.link} aria-hidden tabIndex={-1}>
                    <Arrow />
                  </PrismicNextLink>
                </div>
              ))}
            </div>
          )}
        </div>

        {isFilled.linkToMedia(video) ? (
          <div className={styles.imageContainer}>
            {/* GIF-like: muted + playsInline are required for autoplay on iOS. */}
            <video
              src={video.url}
              poster={isFilled.image(image) ? image.url : undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
        ) : (
          isFilled.image(image) && (
            <div className={styles.imageContainer}>
              <PrismicNextImage field={image} />
            </div>
          )
        )}
        {children && <div className={styles.extraContainer}>{children}</div>}
      </div>
    </div>
  );
}
