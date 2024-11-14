'use client';

import { PrismicNextImage } from '@prismicio/next';
import React from 'react';
import styles from './ShopItem.module.css';
import Link from 'next/link';

export default function ShopItem({
  shopItems,
  showShopDropdown,
}: {
  shopItems: any;
  showShopDropdown: boolean;
}) {
  return (
    <div
      className={`${styles.container} ${showShopDropdown ? styles.containerVisible : ''}`}
    >
      {shopItems &&
        shopItems.map((item: any, index: any) => (
          <Link href={item.data.product_link.url} target="_blank" key={index}>
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                <PrismicNextImage field={item.data.product_image} />
              </div>
              <div className={styles.paraContainer}>
                <p>{item.data.product_description}</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
