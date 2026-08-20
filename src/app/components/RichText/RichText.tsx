import React from 'react';
import { PrismicRichText, type JSXMapSerializer } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';
import { asText, isFilled, type RichTextField } from '@prismicio/client';

import styles from './RichText.module.css';

/**
 * A description as it may arrive from Prismic: the rich text model, or the
 * legacy plain `Text` value still stored on documents that were published
 * before the field was converted.
 */
export type DescriptionField = RichTextField | string | null | undefined;

/** Plain-text version of a description (used for truncated previews). */
export function descriptionToText(field: DescriptionField): string {
  if (!field) return '';
  return typeof field === 'string' ? field : asText(field);
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
 * paragraphs, h4/h5, bold, italic, lists and links. Legacy string values
 * are rendered as paragraphs, keeping their line breaks.
 */
export default function RichText({
  field,
  className,
}: {
  field: DescriptionField;
  className?: string;
}) {
  const cls = className ? `${styles.rich} ${className}` : styles.rich;

  if (typeof field === 'string') {
    const paragraphs = field
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    if (paragraphs.length === 0) return null;

    return (
      <div className={cls}>
        {paragraphs.map((paragraph, i) => (
          <p key={i}>
            {paragraph.split('\n').map((line, j, lines) => (
              <React.Fragment key={j}>
                {line}
                {j < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        ))}
      </div>
    );
  }

  if (!isFilled.richText(field)) return null;

  return (
    <div className={cls}>
      <PrismicRichText field={field} components={components} />
    </div>
  );
}
