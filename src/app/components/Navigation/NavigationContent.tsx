'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { isFilled, type Content, type ImageField } from '@prismicio/client';

import styles from './Navigation.module.css';
import SocialBar from './SocialBar/SocialBar';
import DateDropdown from './DateDropdown/DateDropdown';
import ReleaseDropdown from './ReleaseDropdown/ReleaseDropdown';
import Shopdropdown from './ShopDropdown/Shopdropdown';
import {
  navigationLabel,
  type NavDate,
  type NavRelease,
  type NavShopItem,
  type SiteNavigation,
} from '@/app/lib/navigation';

type Dropdown = 'dates' | 'releases' | 'shop';

/** Top-level section of a path: "/dates/foo" → "dates". */
const sectionOf = (pathname: string) => pathname.split('/')[1] ?? '';

export default function NavigationContent({
  navigation,
  logo,
  dates,
  releases,
  shopItems,
  socialBarItems,
  renderedOn,
}: {
  navigation: SiteNavigation;
  logo: ImageField;
  dates: NavDate[];
  releases: NavRelease[];
  shopItems: NavShopItem[];
  socialBarItems: Content.SocialBarDocumentDataSocialBarItem[];
  renderedOn: string;
}) {
  const [open, setOpen] = useState<Dropdown | null>(null);
  const activeSection = sectionOf(usePathname());

  const close = () => setOpen(null);
  const hoverProps = (dropdown: Dropdown) => ({
    onMouseEnter: () => setOpen(dropdown),
    onMouseLeave: close,
  });
  const linkClass = (section?: string) =>
    `${styles.linkContainer} ${section && activeSection === section ? styles.active : ''}`;

  const { dates: datesItem, releases: releasesItem, zweim, shop, contact, studio } =
    navigation;

  return (
    <section className={styles.container}>
      <div className={`${styles.titleContainer} ${styles.linkContainer}`}>
        <Link href="/" aria-label="Home">
          <PrismicNextImage field={logo} fallbackAlt="" />
        </Link>
      </div>
      {datesItem && (
        <div className={linkClass('dates')} {...hoverProps('dates')}>
          <p>{navigationLabel(datesItem)}</p>
          <DateDropdown
            dates={dates}
            renderedOn={renderedOn}
            isOpen={open === 'dates'}
            onNavigate={close}
          />
        </div>
      )}
      {releasesItem && (
        <div className={linkClass('releases')} {...hoverProps('releases')}>
          <p>{navigationLabel(releasesItem)}</p>
          <ReleaseDropdown
            releases={releases}
            isOpen={open === 'releases'}
            onNavigate={close}
          />
        </div>
      )}
      {zweim && (
        <div className={linkClass('2m')}>
          <PrismicNextLink field={zweim.link} />
        </div>
      )}
      {shop && (
        <div className={linkClass()} {...hoverProps('shop')}>
          <PrismicNextLink field={shop.link} />
          <Shopdropdown
            shopItems={shopItems}
            isOpen={open === 'shop'}
            onNavigate={close}
          />
        </div>
      )}
      {contact && (
        <div className={linkClass()}>
          <a href={`mailto:${contact.email}`}>{contact.label}</a>
        </div>
      )}
      <div className={linkClass()}>
        <SocialBar socialBarItems={socialBarItems} />
      </div>
      {studio && isFilled.link(studio.link) && (
        <div className={`${linkClass('studio')} ${styles.studioContainer}`}>
          <PrismicNextLink field={studio.link} />
        </div>
      )}
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}
      ></div>
    </section>
  );
}
