'use client';

import React from 'react';
import styles from './Shopdropdown.module.css';
import ShopItem from './components/ShopItem';

export default function Shopdropdown({
  shopItems,
  showShopDropdown,
  setShowShopDropdown,
}: {
  shopItems: any;
  showShopDropdown: boolean;
  setShowShopDropdown: (value: boolean) => void;
}) {
  // Function to close the dropdown
  const handleLinkClick = () => {
    setShowShopDropdown(false);
  };

  return (
    <div
      className={`${styles.container} ${showShopDropdown ? styles.containerVisible : ''}`}
      onClick={handleLinkClick} // Close dropdown when clicking inside
    >
      <ShopItem shopItems={shopItems} showShopDropdown={showShopDropdown} />
    </div>
  );
}
