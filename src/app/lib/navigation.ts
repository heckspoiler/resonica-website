import { asText, type Content } from '@prismicio/client';

import { getEventDates, type EventDate } from './eventDates';
import { linkUrl } from './links';

type NavigationItem = Content.SettingsDocumentDataNavigationItem;

/** The Settings navigation entries, looked up by what they point to. */
export type SiteNavigation = {
  dates?: NavigationItem;
  releases?: NavigationItem;
  zweim?: NavigationItem;
  shop?: NavigationItem;
  contact?: { email: string; label: string };
  studio?: NavigationItem;
};

const linksToType = (item: NavigationItem, type: string) =>
  item.link.link_type === 'Document' && 'type' in item.link && item.link.type === type;

const labelOf = (item: NavigationItem) =>
  (item.label || ('text' in item.link ? item.link.text : '') || '').trim();

/**
 * Resolves the Settings navigation by link target rather than position, so
 * reordering the entries in Prismic can't shuffle the menu. Entries without a
 * document (Shop, Contact) are matched by label and by an email address.
 */
export function resolveNavigation(items: NavigationItem[]): SiteNavigation {
  const byType = (type: string) => items.find((item) => linksToType(item, type));

  const contactItem = items.find(
    (item) =>
      item.link.link_type === 'Web' &&
      'url' in item.link &&
      item.link.url?.includes('@')
  );
  const contactUrl = linkUrl(contactItem?.link);

  return {
    dates: byType('dates'),
    releases: byType('releases'),
    zweim: byType('2m'),
    shop: items.find((item) => labelOf(item).toLowerCase() === 'shop'),
    contact: contactItem && {
      // Prismic stores the address as a web link; drop any scheme it picked up.
      email: contactUrl.replace(/^(mailto:|https?:\/\/)/, ''),
      label: labelOf(contactItem),
    },
    studio: byType('studio'),
  };
}

export { labelOf as navigationLabel };

/** Just what the dates dropdown renders, to keep it out of every page's payload. */
export type NavDate = {
  id: string;
  url: string;
  type: string;
  title: string;
  eventDates: EventDate[];
};

export const toNavDate = (doc: Content.DateDocument): NavDate => ({
  id: doc.id,
  url: doc.url ?? '',
  type: (asText(doc.data.date_type) ?? '').charAt(0),
  title: asText(doc.data.date_title) ?? '',
  eventDates: getEventDates(doc.data),
});

export type NavRelease = {
  id: string;
  url: string;
  number: string;
  date: string;
  title: string;
};

export const toNavRelease = (doc: Content.ReleaseDocument): NavRelease => ({
  id: doc.id,
  url: doc.url ?? '',
  number: doc.data.release_number ?? '',
  date: asText(doc.data.release_date) ?? '',
  title: asText(doc.data.release_title) ?? '',
});

/** Highest `release_index` first. */
export const compareReleases = (
  a: Content.ReleaseDocument,
  b: Content.ReleaseDocument
) => Number(b.data.release_index) - Number(a.data.release_index);

export type NavShopItem = {
  id: string;
  url: string;
  image: Content.ShopElementDocument['data']['product_image'];
  description: string;
};

export const toNavShopItem = (doc: Content.ShopElementDocument): NavShopItem => ({
  id: doc.id,
  url: linkUrl(doc.data.product_link),
  image: doc.data.product_image,
  description: doc.data.product_description ?? '',
});
