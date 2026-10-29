import React from 'react';
import type { Content } from '@prismicio/client';

import SocialBarContent from './SocialBarContent/SocialBarContent';

export default function SocialBar({
  socialBarItems,
}: {
  socialBarItems: Content.SocialBarDocumentDataSocialBarItem[];
}) {
  return socialBarItems.length > 0 ? (
    <SocialBarContent socialBarItems={socialBarItems} />
  ) : null;
}
