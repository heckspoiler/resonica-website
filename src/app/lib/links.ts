import { isFilled, type LinkField } from '@prismicio/client';

/** The resolved URL of a link field, or '' when it's empty or text-only. */
export function linkUrl(field: LinkField | null | undefined): string {
  return field && isFilled.link(field) && 'url' in field ? field.url ?? '' : '';
}
