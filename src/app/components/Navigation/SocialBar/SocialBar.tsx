'use client';

import React from 'react';

import SocialBarContent from './SocialBarContent/SocialBarContent';

export default function SocialBar({ socialBarItems }: { socialBarItems: any }) {
  return socialBarItems && <SocialBarContent socialBarItems={socialBarItems} />;
}
