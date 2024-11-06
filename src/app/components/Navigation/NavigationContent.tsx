'use client';

import React from 'react';

import styles from './Navigation.module.css';

import { PrismicNextLink } from '@prismicio/next';
import SocialBar from './SocialBar/SocialBar';

export default function NavigationContent({
  settings,
  socialBarItems,
}: {
  settings: any;
  socialBarItems: any;
}) {
  return (
    <>
      {settings && socialBarItems ? (
        <section className={styles.container}>
          <div className={`${styles.titleContainer} ${styles.linkContainer}`}>
            <PrismicNextLink field={settings.data.navigation[0]?.link} />
          </div>
          <div className={styles.linkContainer}>
            <PrismicNextLink field={settings.data.navigation[1]?.link} />
          </div>
          <div className={styles.linkContainer}>
            <PrismicNextLink field={settings.data.navigation[2]?.link} />
          </div>
          <div className={styles.linkContainer}>
            <PrismicNextLink field={settings.data.navigation[3]?.link} />
          </div>
          <div className={styles.linkContainer}>
            <PrismicNextLink field={settings.data.navigation[4]?.link} />
          </div>
          <div className={styles.linkContainer}>
            <PrismicNextLink field={settings.data.navigation[5]?.link} />
          </div>
          <div className={styles.linkContainer}>
            <SocialBar socialBarItems={socialBarItems} />
          </div>
        </section>
      ) : null}
    </>
  );
}
