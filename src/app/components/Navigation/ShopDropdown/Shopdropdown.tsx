'use client';

import React from 'react';
import styles from './Shopdropdown.module.css';
import ShopItem from './components/ShopItem';
import type { NavShopItem } from '@/app/lib/navigation';

export default function Shopdropdown({
  shopItems,
  isOpen,
  onNavigate,
}: {
  shopItems: NavShopItem[];
  isOpen: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className={`${styles.container} ${isOpen ? styles.containerVisible : ''}`}
      onClick={onNavigate} // Close dropdown when clicking inside
    >
      <ShopItem shopItems={shopItems} isOpen={isOpen} />
    </div>
  );
}
