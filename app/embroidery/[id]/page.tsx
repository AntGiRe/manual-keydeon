"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { categories, stitches, Stitch, ManualItem } from '@/lib/manual-data';
import { useLanguage } from '@/components/LanguageProvider';
import { StitchModal } from '@/components/StitchModal';

export default function KitDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { language } = useLanguage();
  const [selectedStitch, setSelectedStitch] = useState<Stitch | null>(null);

  const diagramRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const stitchesRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const current = categories.embroidery;
  const item = current.items.find((i: ManualItem) => i.id === id);

  if (!item) {
    return (
      <main className="shell section-page">
        <Link className="section-back" href="/embroidery">
          {language === 'es' ? 'Volver a bordado' : 'Back to embroidery'}
        </Link>
        <div style={{ textAlign: 'center', marginTop: '60px', color: 'var(--muted)' }}>
          {language === 'es' ? 'Kit no encontrado' : 'Kit not found'}
        </div>
      </main>
    );
  }

  const copy = {
    es: {
      back: 'Volver a bordado',
      materials: 'Materiales incluidos',
      techniques: 'Técnicas necesarias',
      timeEstimate: 'Tiempo estimado',
      difficulty: 'Nivel de dificultad',
      instructions: 'Instrucciones detalladas',
      step: 'Paso'
    },
    en: {
      back: 'Back to embroidery',
      materials: 'Included materials',
      techniques: 'Required techniques',
      timeEstimate: 'Estimated time',
      difficulty: 'Difficulty level',
      instructions: 'Detailed instructions',
      step: 'Step'
    }
  }[language];

  return (
    <main className="shell section-page">
      <Link className="section-back" href="/embroidery">
        {copy.back}
      </Link>

      <header className="kit-detail-hero">
        <div className="kit-detail-image-container">
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.image} alt={item.name[language]} className="kit-detail-image" />
          ) : (
            <div className="kit-detail-image-placeholder" />
          )}
        </div>

        <div className="kit-detail-info">
          <span className="kit-detail-code">{item.code}</span>
          <h1>{item.name[language]}</h1>
          <p className="kit-detail-summary">{item.summary[language]}</p>

          {(item.threadHandling || item.hoopUsage) && (
            <section className="kit-detail-common">
              {item.threadHandling && (
                <div className="kit-thread-handling">
                  <h4>{language === 'es' ? 'Cómo manejar el hilo' : 'Thread handling'}</h4>
                  <p>{item.threadHandling[language]}</p>
                  {item.threadVideoUrl && (
                    <div style={{ marginTop: 8 }}>
                      <a
                        href={item.threadVideoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="kit-hoop-btn"
                      >
                        ▶ {language === 'es' ? 'Ver en YouTube' : 'Watch on YouTube'}
                      </a>
                    </div>
                  )}
                </div>
              )}

              {item.hoopUsage && (
                <div className="kit-hoop-usage">
                  <h4>{language === 'es' ? 'Uso del bastidor' : 'Hoop usage'}</h4>
                  <p>{item.hoopUsage[language]}</p>
                  {item.hoopVideoUrl && (
                    <div style={{ marginTop: 8 }}>
                      <a
                        href={item.hoopVideoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="kit-hoop-btn"
                      >
                        ▶ {language === 'es' ? 'Ver en YouTube' : 'Watch on YouTube'}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Internal navigation: Diagram -> Map -> Techniques */}
          {(item.diagramUrl || item.threadMap || item.stitches) && (
            <nav className="kit-detail-nav">
              <div className="kit-detail-nav-inner">
                {item.diagramUrl && (
                  <button type="button" onClick={() => scrollToSection(diagramRef)} className="kit-detail-nav-btn">
                    📐 {language === 'es' ? 'Diagrama' : 'Diagram'}
                  </button>
                )}
                {item.threadMap && (
                  <button type="button" onClick={() => scrollToSection(mapRef)} className="kit-detail-nav-btn">
                    🧵 {language === 'es' ? 'Mapa' : 'Map'}
                  </button>
                )}
                {item.stitches && (
                  <button type="button" onClick={() => scrollToSection(stitchesRef)} className="kit-detail-nav-btn">
                    ✨ {language === 'es' ? 'Técnicas' : 'Techniques'}
                  </button>
                )}
              </div>
            </nav>
          )}

          {item.diagramUrl && (
            <section ref={diagramRef} className="kit-detail-diagram kit-detail-section">
              <h3>{language === 'es' ? 'Diagrama del diseño' : 'Design diagram'}</h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.diagramUrl} alt={`${item.name[language]} diagram`} className="kit-detail-diagram-image" />
            </section>
          )}

          {item.threadMap && (
            <section ref={mapRef} className="kit-detail-threads kit-detail-section">
              <h3>{language === 'es' ? 'Mapa de hilos' : 'Thread mapping'}</h3>
              <div className="thread-map">
                {Object.entries(item.threadMap as Record<string, string>).map(([designNum, threadNum]) => (
                  <div key={designNum} className="thread-map-item">
                    <span className="thread-map-design">{designNum}</span>
                    <span className="thread-map-arrow">→</span>
                    <span className="thread-map-thread">{threadNum}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {item.stitches && (
            <section ref={stitchesRef} className="kit-detail-stitches kit-detail-section">
              <h3>{copy.techniques}</h3>
              <div className="kit-detail-stitches-grid">
                {item.stitches.map((stitchId: string) => {
                  const stitch = stitches[stitchId];
                  if (!stitch) return null;
                  return (
                    <button
                      key={stitch.id}
                      onClick={() => setSelectedStitch(stitch)}
                      className="stitch-card stitch-card-btn"
                    >
                      {stitch.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={stitch.imageUrl} alt={stitch.name[language]} className="stitch-card__image" />
                      )}
                      <div className="stitch-card__content">
                        <h4>
                          {language === 'es' ? (
                            <>
                              <span className="stitch-name-en">{stitch.name['en']}</span>
                              <span className="stitch-name-es">{stitch.name['es']}</span>
                            </>
                          ) : (
                            stitch.name[language]
                          )}
                        </h4>
                        <p>{stitch.description[language]}</p>
                        {stitch.videoUrl && <span className="stitch-card__video">▶ Ver pasos</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </header>

      <StitchModal stitch={selectedStitch} language={language} onClose={() => setSelectedStitch(null)} />
    </main>
  );
}
