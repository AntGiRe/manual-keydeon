import embroideryData from '../data/embroidery.json';
import stitchesData from '../data/stitches.json';

export type Language = 'es' | 'en';

export type Stitch = {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  videoUrl?: string;
  imageUrl?: string;
  steps: Record<Language, string[]>;
};

export type ManualItem = {
  id: string;
  code: string;
  name: Record<Language, string>;
  summary: Record<Language, string>;
  details?: Record<Language, string>;
  palette: string;
  image?: string;
  diagramUrl?: string;
  threadMap?: Record<string, string>;
  stitches?: string[];
  threadHandling?: Record<Language, string>;
  hoopUsage?: Record<Language, string>;
  hoopVideoUrl?: string;
  threadVideoUrl?: string;
};

export type ManualCategory = {
  slug: 'embroidery' | 'blocks' | 'painting';
  name: Record<Language, string>;
  tagline: Record<Language, string>;
  intro: Record<Language, string>;
  searchPlaceholder: Record<Language, string>;
  emptyState: Record<Language, string>;
  items: ManualItem[];
};

export const categoryOrder: ManualCategory['slug'][] = ['embroidery', 'blocks', 'painting'];

// Make stitches data easily accessible
export const stitches: Record<string, Stitch> = (stitchesData as Stitch[]).reduce(
  (acc, stitch) => {
    acc[stitch.id] = stitch;
    return acc;
  },
  {} as Record<string, Stitch>
);

// Helper function to get stitch details by ID
export function getStitch(stitchId: string): Stitch | undefined {
  return stitches[stitchId];
}

export const categories: Record<ManualCategory['slug'], ManualCategory> = {  
  embroidery: {
    slug: 'embroidery',
    name: {
      es: 'Bordado y Costura',
      en: 'Embroidery & Sewing'
    },
    tagline: {
      es: 'Todo lo que necesitas para crear tu obra maestra en tela, puntada a puntada.',
      en: 'Everything you need to create your textile masterpiece, stitch by stitch.'
    },
    intro: {
      es: 'Elige tu kit botánico, animal o paisajístico y accede a los diagramas. Te acompañamos desde el enhebrado hasta el enmarcado final.',
      en: 'Choose your botanical, animal, or landscape kit and access in-depth diagrams. We\'ll guide you from the first thread to the final frame.'
    },
    searchPlaceholder: {
      es: 'Busca tu kit, código o nombre del diseño...',
      en: 'Search for your kit, serial code, or design name...'
    },
    emptyState: {
      es: 'No encontramos un manual con esa búsqueda. Revisa el código en la caja de tu kit e intenta nuevamente.',
      en: 'We couldn\'t find a manual for that search. Check the serial code on your kit box and try again.'
    },
    items: (embroideryData as ManualItem[])
  },
  blocks: {
    slug: 'blocks',
    name: {
      es: 'Bloques de Construcción',
      en: 'Building Blocks'
    },
    tagline: {
      es: 'Arquitectura en miniatura en la palma de tu mano, disfruta el montaje.',
      en: 'Miniature architecture in the palm of your hand, enjoy the build.'
    },
    intro: {
      es: 'Sabemos que ver tantas pequeñas piezas juntas al abrir la caja puede abrumar. Aquí tienes secuencias e instrucciones visuales claras para guiarte sin estrés.',
      en: 'We know opening a box with hundreds of tiny pieces can feel overwhelming. We provide crystal-clear visual instructions so you can build without stress.'
    },
    searchPlaceholder: {
      es: 'Busca por personaje, nombre del edificio o código...',
      en: 'Search by character, building name, or serial code...'
    },
    emptyState: {
      es: 'Ups, no encontramos instrucciones para este set de bloques. Revisa el código impreso en la caja.',
      en: 'Oops, we couldn\'t find a manual for this blocks set. Double-check the serial code printed on the box.'
    },
    items: [
      {
        id: 'blocks-01',
        code: 'BLK-042',
        name: {
          es: 'Casa de Campo',
          en: 'Country Cottage'
        },
        summary: {
          es: 'Construye tu propio refugio con tejado a dos aguas.',
          en: 'Build your cozy getaway with a classic gable roof.'
        },
        details: {
          es: 'Sigue el orden numérico de las bolsas y ensambla las paredes maestras antes de pasar a la chimenea.',
          en: 'Follow our numbered bag sequence to snap the load-bearing walls before capping it with the chimney.'
        },
        palette: 'olive',
        image: '/images/blocks-01.svg'
      },
      {
        id: 'blocks-02',
        code: 'BLK-118',
        name: {
          es: 'Ciudad Miniatura',
          en: 'Micro Skyline'
        },
        summary: {
          es: 'Replica un rascacielos y calles animadas en tu mesa.',
          en: 'Replicate a soaring skyscraper and bustling street on your desk.'
        },
        details: {
          es: 'Un manual por capas. Cimenta la base urbana y luego eleva los cristales del edificio bloque por bloque.',
          en: 'A layered manual. Lay down the urban foundation and stack the glass panes block by block.'
        },
        palette: 'clay'
      },
      {
        id: 'blocks-03',
        code: 'BLK-205',
        name: {
          es: 'Bosque Escondido',
          en: 'Hidden Forest'
        },
        summary: {
          es: 'Arma tu propio ecosistema con árboles y arbustos entrelazados.',
          en: 'Piece together a living forest with interlocking foliage.'
        },
        details: {
          es: 'Desde el tronco hasta las copas más altas, te guiaremos visualmente para no perder ninguna pieza verde.',
          en: 'From the sturdy trunks to the delicate top leaves, we visually guide you through every tiny green brick.'
        },
        palette: 'moss'
      }
    ]
  },
  painting: {
    slug: 'painting',
    name: {
      es: 'Pintar por Números',
      en: 'Paint by Numbers'
    },
    tagline: {
      es: 'Llena de color tu lienzo y enmarca tu propia obra maestra.',
      en: 'Fill your space with color and frame your own masterpiece.'
    },
    intro: {
      es: 'El arte está en ti. Sigue nuestra guía de tonos recomendada, la técnica de pincel y descubre el orden perfecto para darle profundidad a tu cuadro.',
      en: 'The art is inside you. Follow our recommended shades, brush stroke techniques, and discover the perfect layering to make your painting pop.'
    },
    searchPlaceholder: {
      es: 'Busca el paisaje, figura o código de tu lienzo...',
      en: 'Search for the landscape, figure, or canvas serial...'
    },
    emptyState: {
      es: 'No encontramos ese código de pintura en nuestro archivo. Asegúrate de ingresarlo tal cual en la caja.',
      en: 'We didn\'t find that painting serial in our archive. Make sure it matches exactly what\'s printed on your box.'
    },
    items: [
      {
        id: 'paint-01',
        code: 'PBN-008',
        name: {
          es: 'Acantilado Sereno',
          en: 'Serene Cliffs'
        },
        summary: {
          es: 'Evoca el relajante movimiento del mar golpeando la costa.',
          en: 'Capture the calming motion of ocean waves crashing on the coast.'
        },
        details: {
          es: 'Un cuadro que requiere sombras frías marinas. Recomendamos comenzar siempre por el cielo iluminado.',
          en: 'Requires layering deep cool blues. We recommend beginning your journey with the bright sky.'
        },
        palette: 'sea',
        image: '/images/paint-01.svg'
      },
      {
        id: 'paint-02',
        code: 'PBN-017',
        name: {
          es: 'Atardecer Dorado',
          en: 'Golden Twilight'
        },
        summary: {
          es: 'Sumérgete en la calidez de un horizonte anaranjado y lleno de luz.',
          en: 'Bask in a warm, orange-hued horizon as the sun sets.'
        },
        details: {
          es: 'Guía para difuminar tonos cálidos hasta fundirlos con las siluetas en sombra.',
          en: 'Master completely seamless transitions to blend warm tones into dark silhouettes.'
        },
        palette: 'sun'
      },
      {
        id: 'paint-03',
        code: 'PBN-029',
        name: {
          es: 'Jardín Escondido',
          en: 'Hidden Courtyard'
        },
        summary: {
          es: 'Una escena primaveral en medio del resurgir natural de las flores.',
          en: 'A quiet afternoon resting patiently in a blooming floral refuge.'
        },
        details: {
          es: 'Rellena primero las grandes áreas de follaje verde antes de dar vida a los pétalos vibrantes.',
          en: 'Complete the large greenery layers first before adding color-popping details to the delicate rose petals.'
        },
        palette: 'rose'
      }
    ]
  }
};
