"use client";

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

type Language = 'es' | 'en';

type Copy = {
  badge: string;
  title: string;
  subtitle: string;
  intro: string;
  languageLabel: string;
  categoriesTitle: string;
  footer: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaDiscount: string;
  ctaCode: string;
  categories: Array<{
    id: string;
    title: string;
    description: string;
    accent: string;
    isLocked?: boolean;
  }>;
};

const copy: Record<Language, Copy> = {
  es: {
    badge: 'Centro de Creación',
    title: 'Da vida a tus ideas con nuestras guías paso a paso',
    subtitle: 'Encuentra las instrucciones de tu kit Keydeon y disfruta del proceso creativo.',
    intro:
      'Sabemos que todo arte está en los detalles. Selecciona la categoría de tu producto para visualizar tu manual y comenzar a crear hoy mismo, a tu propio ritmo.',
    languageLabel: 'Idioma',
    categoriesTitle: 'Explora nuestras colecciones',
    footer: 'Selecciona la línea de producto de tu kit para encontrar las instrucciones exactas.',
    ctaTitle: '¿Necesitas tu próximo kit?',
    ctaDescription: 'Descubre más proyectos y colecciones exclusivas en Keydeon.com',
    ctaButtonText: 'Explorar colección',
    ctaDiscount: '5% de descuento en tu próximo pedido',
    ctaCode: 'TEJAR5',
    categories: [
      {
        id: 'embroidery',
        title: 'Bordado y Costura',
        description: 'Sumérgete en el mundo del arte textil. Encuentra los patrones, gamas de hilos y técnicas para tu lienzo.',
        accent: 'textile',
        isLocked: false
      },
      {
        id: 'blocks',
        title: 'Bloques de Construcción',
        description: 'Pieza a pieza. Descubre diagramas claros e instrucciones visuales para armar tu set sin complicaciones.',
        accent: 'blocks',
        isLocked: true
      },
      {
        id: 'painting',
        title: 'Pintar por Números',
        description: 'Relájate y dale forma a tu lienzo. Guías de color, consejos de pincelada y el orden perfecto para pintar.',
        accent: 'painting',
        isLocked: true
      }
    ]
  },
  en: {
    badge: 'Creative Hub',
    title: 'Bring your ideas to life with our step-by-step guides',
    subtitle: 'Find the instructions for your Keydeon kit and enjoy the creative process.',
    intro:
      'We know that art is all about the details. Select your product\'s category to view your manual and start making your masterpiece today, at your own pace.',
    languageLabel: 'Language',
    categoriesTitle: 'Explore our collections',
    footer: 'Select your kit\'s product line to find the exact, easy-to-follow instructions.',
    ctaTitle: 'Ready for your next masterpiece?',
    ctaDescription: 'Discover more exclusive projects and kits at Keydeon.com',
    ctaButtonText: 'Explore collection',
    ctaDiscount: '5% off your next order',
    ctaCode: 'TEJAR5',
    categories: [
      {
        id: 'embroidery',
        title: 'Embroidery & Sewing',
        description: 'Dive into textile art. Find patterns, thread palettes, and techniques for your specific canvas.',
        accent: 'textile',
        isLocked: false
      },
      {
        id: 'blocks',
        title: 'Building Blocks',
        description: 'Brick by brick. Discover clear diagrams and visual instructions to assemble your set smoothly.',
        accent: 'blocks',
        isLocked: true
      },
      {
        id: 'painting',
        title: 'Paint by Numbers',
        description: 'Relax and color your canvas. Shade guides, brush tips, and the perfect painting order.',
        accent: 'painting',
        isLocked: true
      }
    ]
  }
};

export default function HomePage() {
  const { language } = useLanguage();
  const content = copy[language];

  return (
    <main className="shell">
      <section className="hero">
        <div className="hero__copy">
          <span className="badge">{content.badge}</span>
          <h1>{content.title}</h1>
          <p className="subtitle">{content.subtitle}</p>
          <p className="intro">{content.intro}</p>

          {/* Language selector moved to the top navbar */}
        </div>

        <aside className="hero__panel" aria-hidden="true">
          <div className="manual-mockup">
            <div className="manual-mockup__cover">
              <span>{language === 'es' ? 'Guía paso a paso' : 'Step-by-step guide'}</span>
              <strong>{language === 'es' ? 'Tu Manual de Armado' : 'Your Assembly Manual'}</strong>
              <p>{language === 'es' ? 'Instrucciones detalladas y visuales para guiarte con éxito de principio a fin.' : 'Detailed and highly visual instructions to guide you through to the end.'}</p>
            </div>
            <div className="manual-mockup__page">
              <div className="manual-mockup__line manual-mockup__line--wide" />
              <div className="manual-mockup__line" />
              <div className="manual-mockup__line manual-mockup__line--short" />
              <div className="manual-mockup__chips">
                <span>{language === 'es' ? 'Paso 1' : 'Step 1'}</span>
                <span>{language === 'es' ? 'Paso 2' : 'Step 2'}</span>
                <span>{language === 'es' ? 'Paso 3' : 'Step 3'}</span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* CTA Section: Keydeon.com with discount code */}
      <section className="homepage-cta">
        <div className="homepage-cta-inner">
          <div className="homepage-cta-content">
            <h2>{content.ctaTitle}</h2>
            <p className="homepage-cta-description">{content.ctaDescription}</p>
            <div className="homepage-cta-promo">
              <span className="homepage-cta-discount">{content.ctaDiscount}</span>
              <a href="https://keydeon.com" target="_blank" rel="noopener noreferrer" className="homepage-cta-button">
                {content.ctaButtonText}
                <span className="discount-voucher" style={{ marginLeft: '8px' }}>
                  <span className="discount-voucher-code">{content.ctaCode}</span>
                  <span className="discount-voucher-badge">-5%</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="catalogue" aria-labelledby="categories-title">
        <div className="catalogue__header">
          <div className="catalogue__header-titles">
            <h2 id="categories-title">{content.categoriesTitle}</h2>
            <p>{content.footer}</p>
          </div>
        </div>

        <div className="category-grid">
          {content.categories.map((category) => {
            const CardWrapper = category.isLocked ? 'div' : Link;
            return (
              <CardWrapper 
                key={category.id} 
                href={`/${category.id}`} 
                className={`category-card category-card--${category.accent} ${category.isLocked ? 'category-card--locked' : ''}`}
                {...(category.isLocked ? { 'aria-disabled': true, onClick: (e: any) => e.preventDefault() } : {})}
              >
                <div className="category-card__top">
                  <span className="category-card__eyebrow">
                    {category.isLocked 
                      ? (language === 'es' ? 'Próximamente' : 'Coming soon') 
                      : (language === 'es' ? 'Abrir manual' : 'Open manual')}
                  </span>
                  <h3>
                    {category.title} {category.isLocked && '🔒'}
                  </h3>
                </div>
                <p>{category.description}</p>
                <div className="category-card__actions">
                  <span>
                    {category.isLocked 
                      ? (language === 'es' ? 'Aún no disponible' : 'Not yet available') 
                      : (language === 'es' ? 'Ver colección' : 'View collection')}
                  </span>
                  {!category.isLocked && <span className="category-card__arrow">→</span>}
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </section>
    </main>
  );
}
