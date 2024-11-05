import React from 'react';

import styles from './Background.module.css';

import BackgroundCanvas from './BackgroundComponents/BackgroundCanvas';
import BackgroundOverlay from './BackgroundComponents/BackgroundOverlay/BackgroundOverlay';

export default function Background() {
  return (
    <section className={styles.Main}>
      {/* <BackgroundOverlay /> */}
      <BackgroundCanvas />
    </section>
  );
}
