'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import styles from './VideoGallery.module.css';

type VideoGalleryProps = {
  items: Content.StudioDocumentDataStudioVideosItem[];
};

const SWIPE_THRESHOLD = 60;

export default function VideoGallery({ items }: VideoGalleryProps) {
  // Skip entries without an uploaded video.
  const videos = (items ?? []).filter((item) =>
    isFilled.linkToMedia(item.video)
  );

  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  if (videos.length === 0) return null;

  const step = (direction: 1 | -1) =>
    setOpenIndex((index) =>
      index === null
        ? index
        : (index + direction + videos.length) % videos.length
    );

  const onKeyDown = (event: React.KeyboardEvent) => {
    // A focused player uses the arrow keys to seek.
    if (event.target instanceof HTMLVideoElement) return;
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  };

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || videos.length < 2) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      step(dx < 0 ? 1 : -1);
    }
  };

  const current = openIndex === null ? null : videos[openIndex];
  const currentUrl =
    current && isFilled.linkToMedia(current.video) ? current.video.url : '';

  return (
    <div className={styles.gallery}>
      <ul className={styles.grid}>
        {videos.map((item, index) => (
          <li key={index}>
            <button
              type="button"
              className={styles.thumb}
              onClick={() => setOpenIndex(index)}
              aria-label={`Play ${item.title || `video ${index + 1}`}`}
            >
              <span className={styles.preview}>
                {isFilled.image(item.preview) ? (
                  <PrismicNextImage field={item.preview} alt="" />
                ) : (
                  // No preview image: show a frame of the video itself.
                  <video
                    src={`${isFilled.linkToMedia(item.video) ? item.video.url : ''}#t=0.1`}
                    preload="metadata"
                    muted
                    playsInline
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                )}
                <span className={styles.playIcon} aria-hidden="true" />
              </span>
              {item.title && (
                <span className={styles.thumbTitle}>{item.title}</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label="Video gallery"
        onClose={() => setOpenIndex(null)}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={(event) => {
          // Click on the backdrop area (not the player or controls) closes.
          if (event.target === event.currentTarget) setOpenIndex(null);
        }}
      >
        {current && (
          <>
            <button
              type="button"
              className={styles.close}
              onClick={() => setOpenIndex(null)}
            >
              Close
            </button>

            <div
              className={styles.stage}
              onClick={(event) => {
                if (event.target === event.currentTarget) setOpenIndex(null);
              }}
            >
              {/* Unmounting the player on close/step stops playback. */}
              <video
                key={openIndex}
                className={styles.player}
                src={currentUrl}
                poster={
                  isFilled.image(current.preview)
                    ? current.preview.url
                    : undefined
                }
                controls
                autoPlay
                playsInline
              />
            </div>

            <div className={styles.footer}>
              {videos.length > 1 && (
                <button
                  type="button"
                  className={styles.nav}
                  onClick={() => step(-1)}
                >
                  Prev
                </button>
              )}
              <span className={styles.caption}>
                {current.title && <span>{current.title}</span>}
                {videos.length > 1 && (
                  <span className={styles.counter}>
                    {(openIndex ?? 0) + 1} / {videos.length}
                  </span>
                )}
              </span>
              {videos.length > 1 && (
                <button
                  type="button"
                  className={styles.nav}
                  onClick={() => step(1)}
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
