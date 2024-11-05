import React from 'react';

import * as prismic from '@prismicio/client';
import { createClient } from '@/prismicio';

export default async function Navigation() {
  const client = createClient();
  const settings = await client.getSingle('settings');

  console.log(settings);
  return <div>Navigation</div>;
}
