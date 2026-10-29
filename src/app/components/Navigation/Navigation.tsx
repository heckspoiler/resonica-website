import React from 'react';

import { createClient } from '@/prismicio';
import { todayIso } from '@/app/lib/eventDates';
import {
  compareReleases,
  resolveNavigation,
  toNavDate,
  toNavRelease,
  toNavShopItem,
} from '@/app/lib/navigation';

import styles from './Navigation.module.css';
import NavigationContent from './NavigationContent';

export default async function Navigation() {
  const client = createClient();
  const [settings, socialBar, dates, releases, shopItems] = await Promise.all([
    client.getSingle('settings'),
    client.getSingle('social_bar'),
    client.getAllByType('date'),
    client.getAllByType('release'),
    client.getAllByType('shop_element'),
  ]);

  // Only the fields the dropdowns render are sent to the browser.
  return (
    <nav className={styles.main}>
      <NavigationContent
        navigation={resolveNavigation(settings.data.navigation)}
        logo={settings.data.logo}
        dates={dates.map(toNavDate)}
        releases={[...releases].sort(compareReleases).slice(0, 10).map(toNavRelease)}
        shopItems={shopItems.map(toNavShopItem)}
        socialBarItems={socialBar.data.social_bar}
        renderedOn={todayIso()}
      />
    </nav>
  );
}
