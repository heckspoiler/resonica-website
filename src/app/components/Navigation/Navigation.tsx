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

  return (
    <nav className={styles.main}>
      <NavigationContent
        dates={dates}
        settings={settings}
        socialBarItems={socialBarItems}
      />
    </nav>
  );
}
