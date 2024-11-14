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
  const pathname = usePathname();

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

  useEffect(() => {
    // This effect will handle all dropdown visibility
  }, [hovered]);

  const handleMouseEnter = (section: string) => {
    setHovered(section);
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
              showDateDropdown={showDropdown('dates')}
              setShowDateDropdown={showDropdown}
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
              showReleasesDropdown={showDropdown('releases')}
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
              showShopDropdown={showDropdown('shop')}
            />
          </div>
          <div className={styles.linkContainer}>
            <PrismicNextLink field={settings.data.navigation[5]?.link} />
          </div>
          <div className={styles.linkContainer}>
            <SocialBar socialBarItems={socialBarItems} />
          </div>
          <div
            className={`${styles.overlay} ${hovered !== null ? styles.overlayVisible : ''}`}
          ></div>
        </section>
      ) : null}
    </>
  );
}
