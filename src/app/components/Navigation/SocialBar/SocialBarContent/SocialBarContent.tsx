import React from 'react';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import styles from './SocialBarContent.module.css';

export default function SocialBarContent({
  socialBarItems,
}: {
  socialBarItems: any;
}) {
  return (
    <div className={styles.socialsContainer}>
      {socialBarItems.map((item: any, index: number) => (
        <div key={index} className={styles.socialsItem}>
          <PrismicNextLink field={item.social_link as any}>
            <PrismicNextImage field={item.social_icon} />
            <p>{item.social_link.text} </p>
          </PrismicNextLink>
        </div>
      ))}
    </div>
  );
}
