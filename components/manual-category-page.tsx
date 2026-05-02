"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { categories, stitches, type Language, type ManualItem } from '@/lib/manual-data';
import { useLanguage } from './LanguageProvider';

type Props = {
  category: 'embroidery' | 'blocks' | 'painting';
};

export default function ManualCategoryPage({ category }: Props) {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');

  const current = categories[category];
  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return current.items;
    }

    return current.items.filter((item: ManualItem) => {
      const haystack = [
        item.code,
        item.name.es,
        item.name.en,
        item.summary.es,
        item.summary.en,
        ...(item.details ? [item.details.es, item.details.en] : [])
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [current.items, query]);

  const copy = {
    es: {
      back: 'Volver a colecciones',
      language: 'Idioma',
      search: 'Buscador de modelos',
      results: 'modelos encontrados',
      models: 'Modelos',
      updated: 'Estás a un paso de ponerte manos a la obra con este modelo.'
    },
    en: {
      back: 'Back to collections',
      language: 'Language',
      search: 'Model search',
      results: 'models found',
      models: 'Models',
      updated: "You're one step away from getting hands-on with this model."
    }
  }[language];

  return (
    <main className="shell section-page">
      <header className="section-hero">
        <div>
          <div className="section-back-wrapper">
            <Link className="section-back" href="/">
              {copy.back}
            </Link>
          </div>
          <span className="section-kicker">{current.name[language]}</span>
          <h1>{current.tagline[language]}</h1>
          <p className="section-intro">{current.intro[language]}</p>
        </div>

        <div className="section-toolbar">
          <label className="search-box">
            <span>{copy.search}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={current.searchPlaceholder[language]}
            />
          </label>
        </div>
      </header>

      <section className="model-summary">
        <div>
          <strong>{filteredItems.length}</strong>
          <span>{copy.results}</span>
        </div>
        <p>{copy.updated}</p>
      </section>

      <section className="model-grid" aria-label={copy.models}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item: ManualItem) => (
            <Link key={item.id} href={`/${category}/${item.id}`} className={`model-card model-card--${item.palette}`}>
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={item.name[language]} className="model-card__image" />
              ) : null}
              <div className="model-card__content">
                <div className="model-card__header">
                  <span>{item.code}</span>
                  <h2>{item.name[language]}</h2>
                </div>
                <p className="model-card__summary">{item.summary[language]}</p>
                {item.details && <p className="model-card__details">{item.details[language]}</p>}
                {item.stitches && (
                  <div className="model-card__stitches">
                    <strong>{language === 'es' ? 'Puntadas de este kit' : 'Kit stitches'}</strong>
                    <ul>
                      {item.stitches.map((stitchId, idx) => {
                        const stitch = stitches[stitchId];
                        return (
                          <li key={idx}>{stitch ? stitch.name[language] : stitchId}</li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state">{current.emptyState[language]}</div>
        )}
      </section>
    </main>
  );
}
