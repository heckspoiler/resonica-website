import React from 'react';
import { createClient } from '@/prismicio';

import styles from './BackToHomeOverlay.module.css';
import Link from 'next/link';

export default async function BackToHomeOverlay() {
  const client = createClient();
  const settings = await client.getSingle('settings');

  const homeLink = settings.data.navigation[0];
  return (
    <section className={styles.main}>
      <Link href="/">
        <div className={styles.linkContainer}></div>
      </Link>
    </section>
  );
}
