import { PrismicRichText, type JSXMapSerializer } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';
import { asText, isFilled, type RichTextField } from '@prismicio/client';

import styles from './RichText.module.css';
import ui from '@/app/components/CardText/CardText.module.css';

export type DescriptionField = RichTextField | null | undefined;

/** Plain-text version of a description (used for truncated previews). */
export function descriptionToText(field: DescriptionField): string {
  return asText(field) ?? '';
}

export function truncateText(text: string, maxLength: number) {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength).trimEnd() + '... ';
  }
  return text;
}

/**
 * Truncated plain-text preview for list cards: 90 characters on phones,
 * 260 on larger screens.
 */
export function Excerpt({ field }: { field: DescriptionField }) {
  const text = descriptionToText(field);
  return (
    <>
      <span className={ui.excerptLong}>{truncateText(text, 260)}</span>
      <span className={ui.excerptShort}>{truncateText(text, 90)}</span>
    </>
  );
}

const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => (
    <PrismicNextLink field={node.data}>{children}</PrismicNextLink>
  ),
};

/**
 * Renders a description with the shared rich-text styles. Supports
 * paragraphs, h4/h5/h6, bold, italic, lists and links.
 */
export default function RichText({
  field,
  className,
}: {
  field: DescriptionField;
  className?: string;
}) {
  const cls = className ? `${styles.rich} ${className}` : styles.rich;

  if (!isFilled.richText(field)) return null;

  return (
    <div className={cls}>
      <PrismicRichText field={field} components={components} />
    </div>
  );
}
