"use client";

import { useEffect, useState } from 'react';

interface ImageModalProps {
  src: string | undefined;
  alt?: string;
  open: boolean;
  onClose: () => void;
}

export default function ImageModal({ src, alt, open, onClose }: ImageModalProps) {
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setZoom(true);
      if (e.key === '-') setZoom(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open || !src) return null;

  return (
    <>
      <div className="image-modal-overlay" onClick={onClose} />
      <dialog className="image-modal" open>
        <div className="image-modal-inner">
          <button className="image-modal-close" onClick={onClose}>✕</button>
          <button
            className="image-modal-zoom"
            onClick={() => setZoom((z) => !z)}
            aria-label={zoom ? 'Zoom out' : 'Zoom in'}
          >
            {zoom ? '–' : '+'}
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || 'diagram'}
            className={`image-modal-image ${zoom ? 'zoomed' : ''}`}
            onClick={() => setZoom(true)}
          />
        </div>
      </dialog>
    </>
  );
}
