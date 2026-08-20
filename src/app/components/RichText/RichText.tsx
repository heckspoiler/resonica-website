import { PrismicRichText, type JSXMapSerializer } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';
import { asText, isFilled, type RichTextField } from '@prismicio/client';

import styles from './RichText.module.css';

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

const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => (
    <PrismicNextLink field={node.data}>{children}</PrismicNextLink>
  ),
};

/**
 * Renders a description with the shared rich-text styles. Supports
 * paragraphs, h4/h5, bold, italic, lists and links.
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
