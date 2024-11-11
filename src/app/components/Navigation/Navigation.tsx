import React from 'react';

import { createClient } from '@/prismicio';

import styles from './Navigation.module.css';
import NavigationContent from './NavigationContent';

export default async function Navigation() {
  const client = createClient();
  const settings = await client.getSingle('settings');
  const socialBar = await client.getSingle('social_bar');

  const socialBarItems = socialBar.data.social_bar;

  const dates = await client.getAllByType('date');
  const releases = await client.getAllByType('release');

  return (
    <nav className={styles.main}>
      <NavigationContent
        dates={dates}
        releases={releases}
        settings={settings}
        socialBarItems={socialBarItems}
      />
    </nav>
  );
}
