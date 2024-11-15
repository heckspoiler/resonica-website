'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import SocialBar from './SocialBar/SocialBar';
import DateDropdown from './DateDropdown/DateDropdown';
import ReleaseDropdown from './ReleaseDropdown/ReleaseDropdown';
import Shopdropdown from './ShopDropdown/Shopdropdown';
import Link from 'next/link';

export default function NavigationContent({
  dates,
  releases,
  settings,
  socialBarItems,
  shopItems,
}: {
  settings: any;
  releases: any;
  dates: any;
  socialBarItems: any;
  shopItems: any[];
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState('');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showReleasesDropdown, setShowReleasesDropdown] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const pathname = usePathname();

  // Determine the active link based on the pathname
  useEffect(() => {
    switch (true) {
      case pathname.includes('dates'):
        setActiveLink('dates');
        break;
      case pathname.includes('releases'):
        setActiveLink('releases');
        break;
      case pathname.includes('2m'):
        setActiveLink('2m');
        break;
      default:
        setActiveLink('');
    }
  }, [pathname]);

  // Close dropdowns when hovered state changes to null
  useEffect(() => {
    if (!hovered) {
      setShowDateDropdown(false);
      setShowReleasesDropdown(false);
      setShowShopDropdown(false);
    }
  }, [hovered]);

  // Function to check if any dropdown is visible
  const isAnyDropdownVisible = () =>
    showDateDropdown || showReleasesDropdown || showShopDropdown;

  const handleMouseEnter = (section: string) => {
    setHovered(section);
    if (section === 'dates') {
      setShowDateDropdown(true);
      setShowReleasesDropdown(false);
      setShowShopDropdown(false);
    }
    if (section === 'releases') {
      setShowDateDropdown(false);
      setShowReleasesDropdown(true);
      setShowShopDropdown(false);
    }
    if (section === 'shop') {
      setShowDateDropdown(false);
      setShowReleasesDropdown(false);
      setShowShopDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const showDropdown = (section: string) => hovered === section;

  return (
    <>
      {settings && socialBarItems ? (
        <section className={styles.container}>
          <div className={`${styles.titleContainer} ${styles.linkContainer}`}>
            <Link href={settings.data.navigation[0]?.link.url}>
              <PrismicNextImage field={settings.data.logo} />
            </Link>
          </div>
          <div
            className={`${styles.linkContainer} ${
              activeLink === 'dates' ? styles.active : ''
            }`}
            onMouseEnter={() => handleMouseEnter('dates')}
            onMouseLeave={handleMouseLeave}
          >
            <p>{settings.data.navigation[1]?.link.text}</p>
            <DateDropdown
              dates={dates}
              showDateDropdown={showDateDropdown}
              setShowDateDropdown={setShowDateDropdown}
              hovered={hovered}
              setHovered={setHovered}
            />
          </div>
          <div
            className={`${styles.linkContainer} ${
              activeLink === 'releases' ? styles.active : ''
            }`}
            onMouseEnter={() => handleMouseEnter('releases')}
            onMouseLeave={handleMouseLeave}
          >
            <p>{settings.data.navigation[2]?.link.text}</p>
            <ReleaseDropdown
              releases={releases}
              showReleasesDropdown={showReleasesDropdown}
              setShowReleasesDropdown={setShowReleasesDropdown}
            />
          </div>
          <div
            className={`${styles.linkContainer} ${
              activeLink === '2m' ? styles.active : ''
            }`}
          >
            <PrismicNextLink field={settings.data.navigation[3]?.link} />
          </div>
          <div
            className={styles.linkContainer}
            onMouseEnter={() => handleMouseEnter('shop')}
            onMouseLeave={handleMouseLeave}
          >
            <PrismicNextLink field={settings.data.navigation[4]?.link} />
            <Shopdropdown
              shopItems={shopItems}
              showShopDropdown={showShopDropdown}
              setShowShopDropdown={setShowShopDropdown}
            />
          </div>
          <div className={styles.linkContainer}>
            <Link
              href={`mailto:${settings.data.navigation[5]?.link.url}`}
              target="_blank"
            >
              {settings.data.navigation[5]?.link.text}
            </Link>
          </div>
          <div className={styles.linkContainer}>
            <SocialBar socialBarItems={socialBarItems} />
          </div>
          <div
            className={`${styles.overlay} ${
              isAnyDropdownVisible() ? styles.overlayVisible : ''
            }`}
          ></div>
        </section>
      ) : null}
    </>
  );
}
