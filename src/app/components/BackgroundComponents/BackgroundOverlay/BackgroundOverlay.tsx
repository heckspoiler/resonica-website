'use client';

import React, { useState } from 'react';
import styles from './BackgroundOverlay.module.css';

import logo from '../../../icon.png';

export default function BackgroundOverlay() {
  const amount = 200;
  const [hoveredIndices, setHoveredIndices] = useState<number[]>([]);

  const handleMouseEnter = (index: number) => {
    if (!hoveredIndices.includes(index)) {
      setHoveredIndices((prev) => [...prev, index]);

      // Set a timeout to remove the index from the array after 1.5 seconds
      setTimeout(() => {
        setHoveredIndices((prev) => prev.filter((i) => i !== index));
      }, 1000);
    }
  };

  return (
    <div className={styles.OverlayContainer}>
      {[...Array(amount)].map((_, i) => (
        <div
          key={i}
          className={`${styles.Overlay} ${hoveredIndices.includes(i) ? styles.OverlayHover : ''}`}
          onMouseEnter={() => handleMouseEnter(i)}
        >
          <img src="../../../icon.png" alt="logo" />
        </div>
      ))}
    </div>
  );
}
