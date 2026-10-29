import React from 'react';

import styles from './BackToHomeOverlay.module.css';
import Link from 'next/link';

/** Full-screen click target behind the card: clicking outside it goes home. */
export default function BackToHomeOverlay() {
  return (
    <section className={styles.main}>
      <Link href="/" aria-label="Back to home">
        <div className={styles.linkContainer}></div>
      </Link>
    </section>
  );
}
