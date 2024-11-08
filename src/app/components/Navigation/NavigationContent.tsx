'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';
import { PrismicNextLink } from '@prismicio/next';
import SocialBar from './SocialBar/SocialBar';
import DateDropdown from './DateDropdown/DateDropdown';

export default function NavigationContent({
  dates,
  settings,
  socialBarItems,
}: {
  settings: any;
  dates: any;
  socialBarItems: any;
}) {
  const [dateHovered, setDateHovered] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const pathname = usePathname();

  const [first, second, third] = pathname.split('/').filter(Boolean);

  console.log(first, second, third);

  useEffect(() => {
    switch (true) {
      case pathname.includes('dates'):
        setActiveLink('dates');
        break;
      case pathname.includes('releases'):
        setActiveLink('releases');
        break;
      default:
        setActiveLink('');
    }
  }, [pathname]);

  useEffect(() => {
    if (dateHovered) {
      setShowDateDropdown(true);
    } else {
      setShowDateDropdown(false);
    }
  }, [dateHovered]);

  return (
    <>
      {settings && socialBarItems ? (
        <section className={styles.container}>
          <div className={`${styles.titleContainer} ${styles.linkContainer}`}>
            <PrismicNextLink field={settings.data.navigation[0]?.link} />
          </div>
          <div
            className={`${styles.linkContainer} ${
              activeLink === 'dates' ? styles.active : ''
            }`}
            onMouseEnter={() => setDateHovered(true)}
            onMouseLeave={() => setDateHovered(false)}
          >
            <PrismicNextLink field={settings.data.navigation[1]?.link} />
            <DateDropdown dates={dates} showDateDropdown={showDateDropdown} />
          </div>
          <div
            className={`${styles.linkContainer} ${
              activeLink === 'releases' ? styles.active : ''
            }`}
          >
            <PrismicNextLink field={settings.data.navigation[2]?.link} />
          </div>
          <div className={styles.linkContainer}>
            <PrismicNextLink field={settings.data.navigation[3]?.link} />
          </div>
          <div className={styles.linkContainer}>
            <PrismicNextLink field={settings.data.navigation[4]?.link} />
          </div>
          <div className={styles.linkContainer}>
            <PrismicNextLink field={settings.data.navigation[5]?.link} />
          </div>
          <div className={styles.linkContainer}>
            <SocialBar socialBarItems={socialBarItems} />
          </div>
        </section>
      ) : null}
    </>
  );
}
