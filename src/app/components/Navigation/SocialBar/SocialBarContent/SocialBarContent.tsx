import React from 'react';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { isFilled, type Content } from '@prismicio/client';

import styles from './SocialBarContent.module.css';

export default function SocialBarContent({
  socialBarItems,
}: {
  socialBarItems: Content.SocialBarDocumentDataSocialBarItem[];
}) {
  return (
    <div className={styles.socialsContainer}>
      {socialBarItems
        .filter((item) => isFilled.link(item.social_link))
        .map((item, index) => (
          <div key={index} className={styles.socialsItem}>
            <PrismicNextLink field={item.social_link}>
              <PrismicNextImage field={item.social_icon} fallbackAlt="" />
              <p>{item.social_link.text} </p>
            </PrismicNextLink>
          </div>
        ))}
    </div>
  );
}
