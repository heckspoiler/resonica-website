'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';
import { PrismicNextLink } from '@prismicio/next';
import SocialBar from './SocialBar/SocialBar';
import DateDropdown from './DateDropdown/DateDropdown';
import ReleaseDropdown from './ReleaseDropdown/ReleaseDropdown';

export default function NavigationContent({
  dates,
  releases,
  settings,
  socialBarItems,
}: {
  settings: any;
  releases: any;
  dates: any;
  socialBarItems: any;
}) {
  const [dateHovered, setDateHovered] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [releasesHovered, setReleasesHovered] = useState(false);
  const [showReleasesDropdown, setShowReleasesDropdown] = useState(false);
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

  useEffect(() => {
    if (releasesHovered) {
      setShowReleasesDropdown(true);
    } else {
      setShowReleasesDropdown(false);
    }
  }, [releasesHovered]);

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
            <p>{settings.data.navigation[1]?.link.text}</p>
            <DateDropdown dates={dates} showDateDropdown={showDateDropdown} />
          </div>
          <div
            className={`${styles.linkContainer} ${
              activeLink === 'releases' ? styles.active : ''
            }`}
            onMouseEnter={() => setReleasesHovered(true)}
            onMouseLeave={() => setReleasesHovered(false)}
          >
            <ReleaseDropdown
              releases={releases}
              showReleasesDropdown={showReleasesDropdown}
            />
            <p>{settings.data.navigation[2]?.link.text}</p>
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
