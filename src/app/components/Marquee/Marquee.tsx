import React from 'react';

import { createClient } from '@/prismicio';

import styles from './Marquee.module.css';
import MarqueeContent from './MarqueeContent/MarqueeContent';

export default async function Marquee() {
  const client = createClient();

  const marqueeFetch = await client.getByType('marquee');

  const marquee = marqueeFetch.results[0].data;

  return <MarqueeContent marquee={marquee} />;
}
