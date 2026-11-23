import type { Product } from '../types';

type ComingSoonInput = {
  name: string;
  profile: string;
  top: string;
  heart: string;
  base: string;
  description: string;
  perfectFor: string;
  highlights: [string, string, string];
  gender?: string;
};

let houseId = -3;

const HOUSE_BOTTLE_SIZE = '30ml';
const HOUSE_BOTTLE_PRICE = 350;

function houseBottleVariant() {
  return {
    size: HOUSE_BOTTLE_SIZE,
    price: HOUSE_BOTTLE_PRICE,
    inStock: true,
    stockQuantity: 50,
  };
}

function comingSoonFragrance(input: ComingSoonInput): Product {
  return {
    id: houseId--,
    collectionId: 0,
    name: input.name,
    slug: input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    subtitle: input.profile,
    description: `${input.description}\n\nPerfect for: ${input.perfectFor}`,
    concentration: 'Extrait De Parfum',
    scentFamily: input.profile,
    gender: input.gender ?? 'Unisex',
    sillage: 'Strong',
    longevity: 'Long lasting',
    price: HOUSE_BOTTLE_PRICE,
    imageUrl: '/dion-fragrance.jpg',
    rating: 5,
    reviewCount: 0,
    isBestSeller: false,
    isNew: true,
    showInHero: false,
    comingSoon: false,
    highlightOne: input.highlights[0],
    highlightTwo: input.highlights[1],
    highlightThree: input.highlights[2],
    inStock: true,
    stockQuantity: 50,
    notes: [
      { layer: 'top', noteName: input.top },
      { layer: 'heart', noteName: input.heart },
      { layer: 'base', noteName: input.base },
    ],
    variants: [houseBottleVariant()],
  };
}

const addedHouseFragrances: Product[] = [
  comingSoonFragrance({
    name: 'Velvet Oud',
    profile: 'Floral, Oud, Ambery',
    top: 'Bulgarian Rose',
    heart: 'Oud',
    base: 'Amber',
    highlights: ['Velvety rose', 'Precious oud', 'Golden amber'],
    description: 'Velvet Oud is the art of seduction dressed in luxury. A delicate veil of velvety rose unfolds over the mysterious depth of precious oud, creating a fragrance that feels both tender and commanding. Warm vanilla and golden amber melt into the richness of smooth woods, leaving a sensual trail that feels like silk against the skin.',
    perfectFor: 'Romantic evenings, special occasions, and those who love rich, sophisticated fragrances.',
  }),
  comingSoonFragrance({
    name: 'Wanted Desire',
    profile: 'Spicy, Gourmand, Ambery, Woody',
    top: 'Cardamom',
    heart: 'Sweet Gourmand Accords',
    base: 'Amberwood, Warm Woods',
    highlights: ['Aromatic spice', 'Caramel sweetness', 'Amber woods'],
    description: 'Wanted Desire opens with the seductive spark of aromatic spice, unfolding into a rich, addictive caramel sweetness that draws people closer. Beneath its delicious warmth lies a deep amber-woody foundation, smooth and sensual, creating a confident trail that speaks of ambition, charm, and undeniable attraction.',
    perfectFor: 'Romantic evenings, parties, special occasions, and making a lasting impression.',
  }),
  comingSoonFragrance({
    name: 'Pure Elegance',
    profile: 'Fresh, Aromatic, Creamy, Woody',
    top: 'Rosemary',
    heart: 'Neroli',
    base: 'Sandalwood',
    highlights: ['Aromatic rosemary', 'Clean neroli', 'Creamy sandalwood'],
    gender: 'Men',
    description: 'Pure Elegance is a refined, luxurious fragrance known for its clean floral character, aromatic freshness, and creamy woody warmth. It balances freshness with elegance, creating a polished scent that feels timeless, sophisticated, and effortlessly attractive.',
    perfectFor: 'Office wear, daytime elegance, formal occasions, and the modern gentleman who appreciates understated luxury.',
  }),
  comingSoonFragrance({
    name: 'Forbidden Fruit',
    profile: 'Fruity, Fresh, Sweet, Juicy, Clean',
    top: 'Juicy Melon',
    heart: 'Honeydew Melon',
    base: 'Soft Vanilla',
    highlights: ['Ripe melon', 'Juicy sweetness', 'Soft vanilla'],
    description: 'A taste of summer captured in a fragrance. Forbidden Fruit opens with the mouthwatering freshness of ripe melon, bursting with juicy sweetness and a cool, refreshing touch. Soft fruity accords blend beautifully with delicate florals, while a smooth base of musk and creamy sweetness leaves the skin smelling clean, playful, and irresistibly inviting. Fresh, fruity, and effortlessly charming, Forbidden Fruit is the perfect scent for those who love to smell delicious without being overpowering.',
    perfectFor: 'Everyday wear, sunny days, casual outings, and anyone who loves refreshing fruity fragrances.',
  }),
  comingSoonFragrance({
    name: 'King',
    profile: 'Fresh, Spicy, Woody, Ambery, Masculine',
    top: 'Bergamot, Black Pepper',
    heart: 'Lavender, Aromatic Herbs, Geranium',
    base: 'Amber, Cedarwood, Patchouli, Musk',
    highlights: ['Fresh citrus', 'Aromatic herbs', 'Warm amber'],
    gender: 'Men',
    description: 'King opens with a commanding burst of fresh citrus and vibrant spices, capturing the confidence of a man who knows exactly who he is. As the fragrance unfolds, refined aromatic notes blend with rich woods, creating a powerful balance of sophistication and masculine strength. A deep, warm base of amber, musk, and smooth woods leaves an unforgettable trail of authority and elegance. Bold in character. Royal in spirit. Unmatched in presence.',
    perfectFor: 'Everyday luxury, business meetings, special occasions, and evening wear.',
  }),
  comingSoonFragrance({
    name: 'Rosso Amore',
    profile: 'Fruity, Aquatic, Sweet, Fresh, Musky',
    top: 'Tangerine',
    heart: 'Watermelon, Strawberry, Apple',
    base: 'Praline, Musk, Amber',
    highlights: ['Juicy tangerine', 'Fresh fruit', 'Sweet praline'],
    description: 'A vibrant, seductive fragrance built around juicy fruits, delicious sweetness, and sensual warmth. Rosso Amore evokes the feeling of a luxurious Italian dessert on a summer evening — playful, rich, and impossible to resist.',
    perfectFor: 'Sunny days, holidays, casual outings, and anyone who loves juicy, refreshing fragrances.',
  }),
  comingSoonFragrance({
    name: 'Juicy Apple',
    profile: 'Juicy, Fruity, Sweet, Floral, Musky',
    top: 'Red Apple',
    heart: 'Raspberry Blossom',
    base: 'Vanilla Flower',
    highlights: ['Red apple', 'Wild berries', 'Creamy vanilla'],
    description: 'Juicy Apple awakens the senses with sparkling citrus, blackcurrant, and exotic lychee before unfolding into a luscious garden of wild berries, delicate rose, and intoxicating jasmine. As the sweetness settles, creamy vanilla, golden amber, sensual musk, and soft moss wrap the skin in a deliciously addictive finish.',
    perfectFor: 'Everyday wear, dates, brunch, sunny afternoons, and anyone who loves irresistible fruity-floral scents.',
  }),
  comingSoonFragrance({
    name: 'Eclipse Oud',
    profile: 'Smoky, Spicy, Resinous, Woody, Ambery',
    top: 'Bergamot',
    heart: 'Frankincense',
    base: 'Sandalwood',
    highlights: ['Bright bergamot', 'Smouldering incense', 'Creamy sandalwood'],
    description: 'A flash of bergamot cuts through the darkness, sharpened by wild oregano and fiery pimento berry. Then comes the soul of the fragrance: a hypnotic cloud of smouldering incense, golden amber, and rich resins that feels ancient, mysterious, and deeply captivating. As the smoke settles, dark oud, supple leather, patchouli, and creamy sandalwood emerge, creating a powerful, textured trail that feels bold, commanding, and almost untouchable.',
    perfectFor: 'Evening wear, special occasions, cooler weather, and those who appreciate bold niche perfumery.',
  }),
  comingSoonFragrance({
    name: 'Royale Oud',
    profile: 'Resinous, Honeyed, Woody, Warm, Oriental',
    top: 'Frankincense (Luban)',
    heart: 'Golden Honey',
    base: 'Precious Oud (Agarwood)',
    highlights: ['Sacred frankincense', 'Golden honey', 'Precious oud'],
    description: 'The fragrance opens with the sacred, resinous character of frankincense, evoking the warmth of traditional Arabian perfumery. Golden honey then flows through the heart, softening the smoky resin with a rich, seductive sweetness. Finally, deep agarwood emerges, leaving a dark, woody signature that feels regal, mysterious, and timeless.',
    perfectFor: 'Evening wear, special occasions, cultural gatherings, and lovers of rich Arabian fragrances.',
  }),
  comingSoonFragrance({
    name: 'Obsidian Kiss',
    profile: 'Almond, Sweet, Floral, Creamy, Sensual',
    top: 'Bitter Almond, Caraway',
    heart: 'Jasmine Sambac, Mysterious Floral Accords',
    base: 'Vanilla, Musk, Sandalwood',
    highlights: ['Bitter almond', 'White florals', 'Creamy vanilla'],
    description: 'Obsidian Kiss opens with the mysterious allure of bitter almond, drawing you into a velvety heart of intoxicating white florals. Beneath this seductive layer, creamy vanilla and sensual woods melt together, creating a warm, addictive finish that feels intimate, elegant, and dangerously irresistible.',
    perfectFor: 'Romantic evenings, special occasions, and lovers of rich, seductive gourmand fragrances.',
  }),
  comingSoonFragrance({
    name: 'Golden Nectar',
    profile: 'Sweet, Floral, Fresh, Musky, Playful',
    top: 'Honeysuckle, Grapefruit',
    heart: 'Water Lily, Freesia',
    base: 'Sweet Sugar, Skin Musk',
    highlights: ['Sparkling grapefruit', 'Airy florals', 'Skin musk'],
    description: 'A playful sweetness wrapped in effortless sensuality. Golden Nectar opens with sparkling grapefruit and delicate honeysuckle, creating a bright, flirtatious first impression. A soft heart of water lily and freesia adds an airy floral elegance, while a delicious blend of sweet sugar and intimate skin musk leaves a smooth, addictive finish.',
    perfectFor: 'Everyday wear, dates, brunch, and anyone who loves soft, sweet fragrances.',
  }),
  comingSoonFragrance({
    name: 'Nomade',
    profile: 'Smoky, Oud, Fruity, Leathery, Resinous',
    top: 'Raspberry, Dark Fruity Accords',
    heart: 'Smoky Incense, Rich Oud',
    base: 'Benzoin, Leather, Deep Woody Accords',
    highlights: ['Seductive raspberry', 'Smoky oud', 'Leather and resin'],
    description: 'Nomade is a journey into the untamed beauty of precious oud. A seductive touch of raspberry cuts through the darkness, creating a striking contrast between fruity sweetness and deep, smoky woods. As the fragrance unfolds, mysterious incense and rich benzoin rise like smoke over desert sands, wrapping the senses in warmth, leather, and resinous depth. Its powerful, lingering character is made for those who don’t simply enter a room — they transform its atmosphere.',
    perfectFor: 'Evening wear, special occasions, cooler nights, and lovers of bold Arabian-inspired luxury.',
  }),
  comingSoonFragrance({
    name: 'Amber Veil',
    profile: 'Woody, Airy, Sweet, Sophisticated',
    top: 'Saffron, Jasmine',
    heart: 'Amberwood, Ambergris Accord',
    base: 'Cedarwood, Resinous Sweetness, Mineral Woods',
    highlights: ['Saffron and jasmine', 'Amber woods', 'Cedarwood'],
    description: 'Amber Veil surrounds you with a luminous blend of airy sweetness, delicate florals, and warm amber woods. It opens with a radiant, almost crystalline freshness before unfolding into an elegant heart of jasmine and saffron. As the fragrance settles, ambergris-like accords, cedarwood, and a subtle sugary warmth create a sophisticated, addictive trail that feels both weightless and powerful.',
    perfectFor: 'Special occasions, evening wear, luxury everyday styling, and those who want a distinctive signature scent.',
  }),
  comingSoonFragrance({
    name: 'Coco Bliss',
    profile: 'Tropical, Creamy, Sweet, Warm, Sensual',
    top: 'Tropical Coconut',
    heart: 'Creamy Vanilla, Soft Floral Accords',
    base: 'Warm Musk, Smooth Sweetness',
    highlights: ['Tropical coconut', 'Velvety vanilla', 'Warm musk'],
    description: 'Coco Bliss wraps you in a delicious blend of tropical coconut and velvety vanilla, creating a soft, comforting sweetness that feels warm, playful, and effortlessly sensual. Its creamy finish melts beautifully into the skin, leaving behind the inviting impression of a sun-kissed paradise.',
    perfectFor: 'Everyday wear, holidays, sunny afternoons, and anyone who loves soft tropical fragrances.',
  }),
  comingSoonFragrance({
    name: 'Imperial Elixir',
    profile: 'Spicy, Aromatic, Woody, Warm, Powerful',
    top: 'Grapefruit, Cinnamon, Nutmeg, Cardamom',
    heart: 'Lavender',
    base: 'Amber, Licorice, Sandalwood, Patchouli, Haitian Vetiver',
    highlights: ['Spiced grapefruit', 'Aromatic lavender', 'Sandalwood and vetiver'],
    gender: 'Men',
    description: 'Imperial Elixir ignites the senses with a fierce burst of grapefruit and commanding spices, setting the stage for a rich heart of aromatic lavender. Beneath this bold opening lies a darker world of warm amber, smooth sandalwood, earthy vetiver, and seductive patchouli, creating a powerful signature that feels refined, intense, and undeniably masculine.',
    perfectFor: 'Evening wear, special occasions, cooler nights, and men who appreciate bold, sophisticated fragrances.',
  }),
  comingSoonFragrance({
    name: 'Paradiso Gold',
    profile: 'Fruity, Citrus, Sweet, Musky, Ambery',
    top: 'Sicilian Orange, Lemon, Calabrian Bergamot',
    heart: 'Mediterranean Fruit Accord',
    base: 'Amber, Madagascar Vanilla, White Musk',
    highlights: ['Sun-ripened citrus', 'Ripe fruit', 'Madagascar vanilla'],
    description: 'Imagine a burst of sun-ripened citrus dissolving into a vibrant basket of exotic fruits. Paradiso Gold is bright, juicy, and irresistibly smooth, wrapping the senses in a luxurious cloud of fruity sweetness. As the fragrance unfolds, its sparkling citrus opening gives way to a rich medley of ripe fruits, creating an alluring, almost addictive character. Finally, golden amber, creamy Madagascar vanilla, and soft white musk melt together into a velvety finish that feels warm, sensual, and beautifully refined.',
    perfectFor: 'Daytime luxury, evening outings, special occasions, and anyone who loves vibrant, attention-grabbing fruity fragrances.',
  }),
  comingSoonFragrance({
    name: 'Golden Aura',
    profile: 'Musky, Warm, Sweet, Powdery, Elegant',
    top: 'Soft Musk, Delicate Citrus',
    heart: 'Golden Amber, Floral Accords',
    base: 'White Musk, Creamy Vanilla, Warm Woods',
    highlights: ['Soft musk', 'Golden amber', 'Creamy vanilla'],
    description: 'Golden Aura is a luxurious, smooth and captivating fragrance that wraps your skin in a warm golden aura. Its soft musky character blends beautifully with sweet amber and creamy warmth, creating an elegant scent that feels clean, sensual and effortlessly sophisticated. A fragrance for those who appreciate quiet luxury, lasting impressions and the beauty of simplicity.',
    perfectFor: 'Everyday luxury, special occasions and anyone who loves a smooth, sensual scent.',
  }),
  comingSoonFragrance({
    name: 'Seductive Bloom',
    profile: 'Fruity, Sweet, Fresh, Flirty, Sensual',
    top: 'Red Plum, Crushed Berries',
    heart: 'Sweet Florals, Fresh Fruity Accords',
    base: 'Soft Musk, Warm Woods',
    highlights: ['Red plum', 'Sweet florals', 'Soft musk'],
    gender: 'Women',
    description: 'Seductive Bloom is a deliciously sweet and captivating fragrance that awakens the senses. Bursting with juicy fruits and playful sweetness, it melts into a soft, sensual finish that feels feminine, confident and irresistibly attractive.',
    perfectFor: 'Everyday wear, dates, outings and anyone who loves sweet, attention-grabbing fragrances.',
  }),
  comingSoonFragrance({
    name: 'Velvet Temptation',
    profile: 'Sweet, Floral, Warm, Creamy, Seductive',
    top: 'Almond, Coffee',
    heart: 'Jasmine Sambac, Tuberose',
    base: 'Tonka Bean, Cocoa, Vanilla, Warm Woods',
    highlights: ['Almond and coffee', 'White florals', 'Cocoa and vanilla'],
    gender: 'Women',
    description: 'Velvet Temptation is a captivating fragrance that celebrates the duality of a woman — sweet yet daring, elegant yet rebellious. It opens with a sparkling touch of almond and coffee before unfolding into a beautiful floral heart. As it settles, creamy tonka bean, warm cocoa and rich woods create a sensual trail that commands attention.',
    perfectFor: 'Romantic evenings, special occasions, nights out and making a lasting impression.',
  }),
];

/** Fragrances written into the shop before they exist in the database. */
export const houseFragrances: Product[] = [
  {
    id: -1,
    collectionId: 0,
    name: 'Midnight Aura',
    slug: 'midnight-aura',
    subtitle: 'Fruity, Sweet, Warm',
    description:
      'Born for the nights that turn into unforgettable stories, Midnight Aura is a daring blend of juicy fruits, vibrant spices, and addictive sweetness. It opens with a fresh, energetic burst before revealing an aromatic heart that balances playful charm with rebellious confidence. As the night deepens, creamy vanilla, warm amber, and sensual woods create a magnetic trail that lingers long after you’ve left the room.\n\nPerfect for: Nightlife, dates, parties, and making unforgettable first impressions.',
    concentration: 'Extrait De Parfum',
    scentFamily: 'Fruity, Sweet, Warm',
    gender: 'Unisex',
    sillage: 'Strong',
    longevity: 'Long lasting',
    price: HOUSE_BOTTLE_PRICE,
    imageUrl: '/dion-fragrance.jpg',
    rating: 5,
    reviewCount: 0,
    isBestSeller: false,
    isNew: true,
    showInHero: false,
    comingSoon: false,
    highlightOne: 'Juicy pineapple',
    highlightTwo: 'Aromatic lavender',
    highlightThree: 'Creamy vanilla',
    inStock: true,
    stockQuantity: 50,
    notes: [
      { layer: 'top', noteName: 'Pineapple', description: 'A fresh, energetic burst of juicy fruit' },
      { layer: 'heart', noteName: 'Lavender', description: 'Playful charm with rebellious confidence' },
      { layer: 'base', noteName: 'Vanilla', description: 'Creamy sweetness, warm amber, and sensual woods' },
    ],
    variants: [houseBottleVariant()],
  },
  {
    id: -2,
    collectionId: 0,
    name: 'Solaris',
    slug: 'solaris',
    subtitle: 'Citrus, Fresh, Amber',
    description:
      'This fragrance captures the feeling of cool citrus, sparkling spices, and sophisticated woods. Bright and invigorating at first, it develops into a smooth, refined scent that feels clean, confident, and irresistibly modern. Solaris opens with an electrifying burst of sun-ripened mandarin and bergamot, awakening the senses with crisp, radiant freshness. A vibrant heart of aromatic spices adds energy and character, while earthy vetiver grounds the fragrance in a smooth, confident finish.\n\nPerfect for: Everyday luxury, business wear, warm weather, and signature-scent lovers.',
    concentration: 'Extrait De Parfum',
    scentFamily: 'Citrus, Fresh, Amber',
    gender: 'Unisex',
    sillage: 'Moderate',
    longevity: 'Long lasting',
    price: HOUSE_BOTTLE_PRICE,
    imageUrl: '/dion-fragrance.jpg',
    rating: 5,
    reviewCount: 0,
    isBestSeller: false,
    isNew: true,
    showInHero: false,
    comingSoon: false,
    highlightOne: 'Bright citrus',
    highlightTwo: 'Aromatic spices',
    highlightThree: 'Earthy woods',
    inStock: true,
    stockQuantity: 50,
    notes: [
      { layer: 'top', noteName: 'Bergamot', description: 'Sun-ripened mandarin and crisp, radiant freshness' },
      { layer: 'heart', noteName: 'Cardamom', description: 'Sparkling spices with energy and character' },
      { layer: 'base', noteName: 'Earthy Woods', description: 'Earthy vetiver in a smooth, confident finish' },
    ],
    variants: [houseBottleVariant()],
  },
  ...addedHouseFragrances,
];

export function findHouseFragrance(slug: string): Product | null {
  return houseFragrances.find((product) => product.slug === slug) ?? null;
}

export function appendHouseFragrances(products: Product[], filter: {
  collectionSlug?: string;
  collection?: string;
  scentFamily?: string;
  gender?: string;
  concentration?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
} = {}): Product[] {
  const slugs = new Set(products.map((product) => product.slug));
  const extras = houseFragrances.filter((product) => !slugs.has(product.slug) && matchesHouseFilter(product, filter));
  return [...products, ...extras];
}

function matchesHouseFilter(product: Product, filter: {
  collectionSlug?: string;
  collection?: string;
  scentFamily?: string;
  gender?: string;
  concentration?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}): boolean {
  const collection = filter.collectionSlug || filter.collection;
  if (collection && collection !== 'all') return false;
  if (filter.scentFamily && filter.scentFamily !== 'all' && product.scentFamily.toLowerCase() !== filter.scentFamily.toLowerCase()) return false;
  if (filter.gender && filter.gender !== 'all' && product.gender.toLowerCase() !== filter.gender.toLowerCase()) return false;
  if (filter.concentration && filter.concentration !== 'all' && !product.concentration.toLowerCase().includes(filter.concentration.toLowerCase())) return false;
  if (filter.minPrice && filter.minPrice > 0 && product.price < filter.minPrice) return false;
  if (filter.maxPrice && filter.maxPrice > 0 && product.price > filter.maxPrice) return false;
  if (filter.search?.trim()) {
    const needle = filter.search.toLowerCase();
    const notes = product.notes.map((note) => `${note.noteName} ${note.description || ''}`).join(' ');
    const haystack = `${product.name} ${product.subtitle} ${product.description} ${product.scentFamily} ${notes}`.toLowerCase();
    if (!haystack.includes(needle)) return false;
  }
  return true;
}

/** Attars are the oud-oil line. Every other fragrance is a perfume. */
export function isAttar(product: Pick<Product, 'name' | 'subtitle' | 'concentration' | 'scentFamily' | 'collection'>): boolean {
  const group = [product.collection?.name, product.collection?.slug, product.name]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return /\battars?\b|oud perfume oils?|oud-perfume-oils?|oud oils?/.test(group);
}
