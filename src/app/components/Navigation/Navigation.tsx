import React from 'react';

import * as prismic from '@prismicio/client';
import { createClient } from '@/prismicio';

import styles from './Navigation.module.css';
import { PrismicNextLink } from '@prismicio/next';

export default async function Navigation() {
  const client = createClient();
  const settings = await client.getSingle('settings');

  console.log(settings.data.navigation[0]?.link.text);

  return (
    <nav className={styles.main}>
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
          <PrismicNextLink field={settings.data.navigation[6]?.link} />
        </div>
      </section>
    </nav>
  );
}
