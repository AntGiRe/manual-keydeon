"use client";

import { useEffect } from 'react';
import { Stitch } from '@/lib/manual-data';

interface StitchModalProps {
  stitch: Stitch | null;
  language: 'es' | 'en';
  onClose: () => void;
}

export function StitchModal({ stitch, language, onClose }: StitchModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!stitch) return null;

  const stepLabel = language === 'es' ? 'Paso' : 'Step';
  const watchVideo = language === 'es' ? 'Ver video en YouTube' : 'Watch on YouTube';
  const close = language === 'es' ? 'Cerrar' : 'Close';

  const steps = stitch.steps[language] || [];

  return (
    <>
      <div className="stitch-modal-overlay" onClick={onClose} />
      <dialog className="stitch-modal" open>
        <div className="stitch-modal-content">
          <button className="stitch-modal-close" onClick={onClose}>
            ✕
          </button>

          <div className="stitch-modal-header">
            {stitch.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={stitch.imageUrl} alt={stitch.name[language]} className="stitch-modal-image" />
            )}
            <div>
              {language === 'es' ? (
                <>
                  <h2 className="stitch-modal-title-en">{stitch.name['en']}</h2>
                  <div className="stitch-modal-subtitle">{stitch.name['es']}</div>
                </>
              ) : (
                <h2>{stitch.name[language]}</h2>
              )}

              <p className="stitch-modal-description">{stitch.description[language]}</p>
            </div>
          </div>

          <section className="stitch-modal-steps">
            <h3>{language === 'es' ? 'Pasos explicados' : 'Step-by-step'}</h3>
            <ol className="stitch-steps-list">
              {steps.map((step, idx) => (
                <li key={idx} className="stitch-step-item">
                  <span className="stitch-step-number">{stepLabel} {idx + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="stitch-modal-actions">
            {stitch.videoUrl && (
              <a
                href={stitch.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="stitch-modal-video-btn"
              >
                ▶ {watchVideo}
              </a>
            )}
            <button className="stitch-modal-close-btn" onClick={onClose}>
              {close}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
