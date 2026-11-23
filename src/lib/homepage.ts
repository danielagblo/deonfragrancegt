export const HERO_SLIDES = [
  {
    src: '/hero/perfume.jpg',
    alt: 'A glass perfume bottle on pale silk',
    href: '/collections',
    kicker: 'Extrait De Parfum',
    title: 'Dion Fragrance',
  },
  {
    src: '/hero/citrus.jpg',
    alt: 'A full frame of bright oranges',
    href: '/collections',
    kicker: 'Citrus',
    title: 'Bright and fresh',
  },
  {
    src: '/hero/florals.jpg',
    alt: 'A full field of golden flowers',
    href: '/collections',
    kicker: 'Florals',
    title: 'Soft bloom',
  },
  {
    src: '/hero/woods.jpg',
    alt: 'An amber bottle in warm light',
    href: '/collections',
    kicker: 'Woods',
    title: 'Warm amber',
  },
];

export const HOMEPAGE_IMAGE_DEFAULTS = {
  founder: '/profile.jpg',
  story: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1000&q=80',
  philosophy: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
};

export type HomepageImageKey = keyof typeof HOMEPAGE_IMAGE_DEFAULTS;
export type HomepageImages = Record<HomepageImageKey, string>;

export const HOMEPAGE_IMAGE_FIELDS: { key: HomepageImageKey; label: string; help: string }[] = [
  {
    key: 'founder',
    label: 'Owner portrait',
    help: 'The photo beside Sacred Wisdom, Bottled.',
  },
  {
    key: 'story',
    label: 'Sacred Olfaction',
    help: 'The photo beside the house story.',
  },
  {
    key: 'philosophy',
    label: 'Brand philosophy',
    help: 'The photo beside Sacred Wisdom, Bottled in the story.',
  },
];
