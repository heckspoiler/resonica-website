'use client';

import { PrismicNextImage } from '@prismicio/next';
import React from 'react';
import styles from './ShopItem.module.css';
import type { NavShopItem } from '@/app/lib/navigation';

export default function ShopItem({
  shopItems,
  isOpen,
}: {
  shopItems: NavShopItem[];
  isOpen: boolean;
}) {
  return (
    <div className={`${styles.container} ${isOpen ? styles.containerVisible : ''}`}>
      {shopItems
        .filter((item) => item.url)
        .map((item) => (
          <a href={item.url} target="_blank" rel="noopener noreferrer" key={item.id}>
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                <PrismicNextImage field={item.image} fallbackAlt="" />
              </div>
              <div className={styles.paraContainer}>
                <p>{item.description}</p>
              </div>
            </div>
          </a>
        ))}
    </div>
  );
}
