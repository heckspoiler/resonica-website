import React from 'react';

import * as prismic from '@prismicio/client';
import { createClient } from '@/prismicio';

import styles from './Navigation.module.css';
import SocialBarContent from './SocialBarContent/SocialBarContent';

export default async function SocialBar() {
  const client = createClient();
  const socialBar = await client.getSingle('social_bar');

  const socialBarItems = socialBar.data.social_bar;

  return <SocialBarContent socialBarItems={socialBarItems} />;
}
