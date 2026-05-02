"use client";

import { useEffect } from 'react';

interface HoopModalProps {
  open: boolean;
  content?: { es?: string; en?: string };
  language: 'es' | 'en';
  videoUrl?: string;
  onClose: () => void;
}

export default function HoopModal({ open, content, language, videoUrl, onClose }: HoopModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  const closeLabel = language === 'es' ? 'Cerrar' : 'Close';
  const watchLabel = language === 'es' ? 'Ver en YouTube' : 'Watch on YouTube';

  return (
    <>
      <div className="stitch-modal-overlay" onClick={onClose} />
      <dialog className="stitch-modal" open>
        <div className="stitch-modal-content">
          <button className="stitch-modal-close" onClick={onClose}>✕</button>

          <div style={{ marginBottom: 8 }}>
            <h2>{language === 'es' ? 'Uso del bastidor' : 'Hoop usage'}</h2>
            <p className="stitch-modal-description">{(content && content[language]) || ''}</p>
          </div>

          <div className="stitch-modal-actions">
            {videoUrl && (
              <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="stitch-modal-video-btn">
                ▶ {watchLabel}
              </a>
            )}
            <button className="stitch-modal-close-btn" onClick={onClose}>{closeLabel}</button>
          </div>
        </div>
      </dialog>
    </>
  );
}
