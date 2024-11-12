'use client';

import React from 'react';

import styles from './Shopdropdown.module.css';
import ShopItem from './components/ShopItem';

export default function Shopdropdown({
  shopItems,
  showShopDropdown,
}: {
  shopItems: any;
  showShopDropdown: any;
}) {
  return (
    <div className={styles.container}>
      <ShopItem shopItems={shopItems} showShopDropdown={showShopDropdown} />
    </div>
  );
}
