export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Category =
  | "Tees"
  | "Hoodies"
  | "Jerseys"
  | "Outerwear"
  | "Bottoms"
  | "Accessories";

export interface ProductImage {
  src: string;
  alt: string;
  label: string;
  /** Used to simulate alternate angles / detail crops in the gallery. */
  position?: string;
  scale?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  images: ProductImage[];
  description: string;
  story: string;
  category: Category;
  colorway: string;
  sizes: Size[];
  /** Sizes that are sold out for this drop. */
  soldOutSizes: Size[];
  inStock: boolean;
  isNew: boolean;
  isSale: boolean;
  featured: boolean;
  releaseDate: string;
  details: string[];
  fit: string;
  material: string;
}

export const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const CATEGORIES: Category[] = [
  "Tees",
  "Hoodies",
  "Jerseys",
  "Outerwear",
  "Bottoms",
  "Accessories",
];

/** Builds a pseudo gallery (front / detail / fabric) from a single hero shot. */
function gallery(src: string, name: string): ProductImage[] {
  return [
    {
      src,
      alt: `${name} — front view`,
      label: "Front",
      position: "center",
      scale: 1,
    },
    {
      src,
      alt: `${name} — graphic detail`,
      label: "Detail",
      position: "center 32%",
      scale: 1.85,
    },
    {
      src,
      alt: `${name} — fit and fabric`,
      label: "Fit",
      position: "center 78%",
      scale: 1.45,
    },
  ];
}

interface Seed {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  description: string;
  story: string;
  category: Category;
  colorway: string;
  soldOutSizes?: Size[];
  isNew?: boolean;
  isSale?: boolean;
  featured?: boolean;
  releaseDate: string;
  details: string[];
  fit: string;
  material: string;
}

const seeds: Seed[] = [
  {
    id: "p-001",
    slug: "blue-flame-tee",
    name: "Blue Flame Tee",
    price: 39.99,
    salePrice: 33.99,
    image: "/images/products/blue-flame-tee.jpg",
    description:
      "The drop that started the fire. A heavyweight 240gsm tee carrying our hand-drawn Blue Flame emblem — a kanji-styled flame that burns colder than it looks. Boxy, dropped shoulder, built to be worn until the print cracks.",
    story:
      "Fire in Japanese folklore doesn't only destroy. It resets the ground. The Blue Flame is our reminder that every beginning needs a little burn.",
    category: "Tees",
    colorway: "Midnight Black / Azure",
    soldOutSizes: ["XS"],
    isNew: true,
    isSale: true,
    featured: true,
    releaseDate: "2026-01-18",
    details: [
      "240gsm heavyweight combed cotton",
      "Oversized boxy fit with dropped shoulders",
      "Screen-printed Blue Flame emblem",
      "Ribbed collar that holds its shape",
      "Woven ZENJI sleeve tab",
    ],
    fit: "Oversized — size down for a regular fit",
    material: "100% combed cotton",
  },
  {
    id: "p-002",
    slug: "crimson-samurai-hoodie",
    name: "Crimson Samurai Hoodie",
    price: 89.99,
    image: "/images/products/crimson-samurai-hoodie.jpg",
    description:
      "Our flagship warrior piece. A 420gsm brushed-back fleece hoodie with a full-scale samurai illustration across the back, drawn frame by frame in the style of a 90s anime celsheet.",
    story:
      "Bushido never left the frame — it just changed medium. This piece is a tribute to the lone swordsman archetype that shaped a generation of animation.",
    category: "Hoodies",
    colorway: "Crimson",
    isNew: true,
    featured: true,
    releaseDate: "2026-01-18",
    details: [
      "420gsm brushed-back cotton fleece",
      "Oversized fit with structured hood",
      "Full-back samurai illustration print",
      "Kangaroo pocket and flat drawcords",
      "Double-needle stitched seams",
    ],
    fit: "Oversized — true to size for a relaxed look",
    material: "80% cotton / 20% recycled polyester",
  },
  {
    id: "p-003",
    slug: "oni-mask-tee",
    name: "Oni Mask Tee",
    price: 44.99,
    image: "/images/products/oni-mask-tee.jpg",
    description:
      "A washed charcoal tee carrying a hand-inked oni mask. In folklore the oni punishes arrogance — here it's printed in bone-white ink on garment-dyed cotton that softens with every wash.",
    story:
      "Masks hide the wearer, but never the intent. The Oni Mask tee is for the nights when you'd rather be feared than understood.",
    category: "Tees",
    colorway: "Washed Charcoal",
    soldOutSizes: ["XXL"],
    featured: true,
    releaseDate: "2025-12-04",
    details: [
      "Garment-dyed 220gsm cotton",
      "Relaxed fit with a soft hand feel",
      "Water-based white ink print",
      "Pre-shrunk and wash-tested",
    ],
    fit: "Relaxed — true to size",
    material: "100% garment-dyed cotton",
  },
  {
    id: "p-004",
    slug: "shogun-cargo-pants",
    name: "Shogun Cargo Pants",
    price: 109.99,
    salePrice: 89.99,
    image: "/images/products/shogun-cargo-pants.jpg",
    description:
      "Utility built for the streets. Ripstop cargo pants with six pockets, adjustable ankle straps and an embroidered kanji patch on the thigh. Rugged, silent, and cut to stack on your sneakers.",
    story:
      "Armour became uniform, uniform became clothing. The Shogun cargo is armour for a city that never formally declared war.",
    category: "Bottoms",
    colorway: "Black",
    isSale: true,
    releaseDate: "2025-11-22",
    details: [
      "Durable ripstop cotton blend",
      "Six-pocket utility construction",
      "Adjustable ankle straps and webbing belt",
      "Embroidered kanji thigh patch",
      "YKK hardware throughout",
    ],
    fit: "Relaxed straight — stacks at the ankle",
    material: "65% cotton / 35% nylon ripstop",
  },
  {
    id: "p-005",
    slug: "katana-zip-jacket",
    name: "Katana Zip Jacket",
    price: 129.99,
    image: "/images/products/katana-zip-jacket.jpg",
    description:
      "A technical bomber with a katana graphic running the length of the sleeve. Matte nylon shell, crimson chest emblem, and a cut that sits sharp over a hoodie.",
    story:
      "One cut. No wasted movement. The Katana jacket is cut with the same philosophy a bladesmith brings to steel.",
    category: "Outerwear",
    colorway: "Black / Crimson",
    isNew: true,
    featured: true,
    releaseDate: "2026-01-18",
    details: [
      "Matte technical nylon shell",
      "Full-length sleeve katana print",
      "Embroidered crimson chest emblem",
      "Ribbed cuffs and hem",
      "Interior storm flap and zip pocket",
    ],
    fit: "Regular — layer over heavyweight fleece",
    material: "100% technical nylon with mesh lining",
  },
  {
    id: "p-006",
    slug: "neon-tokyo-jersey",
    name: "Neon Tokyo Jersey",
    price: 74.99,
    salePrice: 59.99,
    image: "/images/products/neon-tokyo-jersey.jpg",
    description:
      "A relaxed mesh jersey built from late-night Tokyo. Skyline sublimation print, katakana wordmark across the chest, and a breathable open-hole body made for summer sessions.",
    story:
      "Shinjuku at 2am: vending machine light, train announcements, a city that hums. This is that hour, printed on mesh.",
    category: "Jerseys",
    colorway: "Black / Electric Blue",
    isSale: true,
    releaseDate: "2025-12-04",
    details: [
      "Breathable open-hole mesh body",
      "Sublimated skyline artwork",
      "Katakana chest wordmark",
      "Ribbed v-neck collar",
      "Relaxed, slightly longline cut",
    ],
    fit: "Relaxed — true to size",
    material: "100% recycled polyester mesh",
  },
  {
    id: "p-007",
    slug: "rising-sun-cap",
    name: "Rising Sun Cap",
    price: 29.99,
    image: "/images/products/rising-sun-cap.jpg",
    description:
      "A structured six-panel cap with an embroidered rising sun emblem and a small kanji hit on the side panel. Cotton twill, curved brim, adjustable strap.",
    story:
      "The sun rises whether or not you stayed up to watch it. Wear the reminder.",
    category: "Accessories",
    colorway: "Black / Crimson",
    releaseDate: "2025-11-22",
    details: [
      "Structured six-panel cotton twill",
      "Embroidered rising sun emblem",
      "Kanji side-panel embroidery",
      "Adjustable metal clasp strap",
    ],
    fit: "One size — adjustable",
    material: "100% cotton twill",
  },
  {
    id: "p-008",
    slug: "zenji-kanji-tee",
    name: "Zenji Kanji Tee",
    price: 39.99,
    image: "/images/products/zenji-kanji-tee.jpg",
    description:
      "Minimalism with a temper. A bone-coloured boxy tee with vertical kanji down the chest and a tiny crimson seal stamp — the quietest piece in the archive.",
    story:
      "ZENJI — the name means 'the accomplished one'. Earn it quietly; let the work speak.",
    category: "Tees",
    colorway: "Bone",
    isNew: true,
    releaseDate: "2026-01-18",
    details: [
      "240gsm heavyweight cotton",
      "Boxy cut with a wide neckline rib",
      "Vertical kanji chest print",
      "Crimson seal stamp detail",
    ],
    fit: "Boxy — size down for a cleaner line",
    material: "100% combed cotton",
  },
  {
    id: "p-009",
    slug: "hannya-beanie",
    name: "Hannya Beanie",
    price: 34.99,
    salePrice: 27.99,
    image: "/images/products/hannya-beanie.jpg",
    description:
      "A ribbed knit beanie with a jacquard hannya motif in crimson and bone. Warm enough for a Melbourne winter, loud enough to be seen in it.",
    story:
      "The hannya mask is jealousy turned into art — proof that even the sharpest emotion can be made beautiful.",
    category: "Accessories",
    colorway: "Black / Crimson",
    isSale: true,
    releaseDate: "2025-12-04",
    details: [
      "Ribbed knit with jacquard motif",
      "Woven ZENJI cuff label",
      "Snug cuffed fit",
    ],
    fit: "One size — stretch fit",
    material: "100% acrylic knit",
  },
];

export const products: Product[] = seeds.map((seed) => ({
  id: seed.id,
  slug: seed.slug,
  name: seed.name,
  price: seed.price,
  salePrice: seed.salePrice,
  images: gallery(seed.image, seed.name),
  description: seed.description,
  story: seed.story,
  category: seed.category,
  colorway: seed.colorway,
  sizes: SIZES,
  soldOutSizes: seed.soldOutSizes ?? [],
  inStock: true,
  isNew: seed.isNew ?? false,
  isSale: seed.isSale ?? false,
  featured: seed.featured ?? false,
  releaseDate: seed.releaseDate,
  details: seed.details,
  fit: seed.fit,
  material: seed.material,
}));

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((product) => product.featured).slice(0, limit);
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return products.slice(0, limit);
  const sameCategory = products.filter(
    (product) => product.slug !== slug && product.category === current.category,
  );
  const others = products.filter(
    (product) => product.slug !== slug && product.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/** Lowest price a customer pays for a product (sale price when available). */
export function effectivePrice(product: Product): number {
  return product.salePrice ?? product.price;
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "newest", label: "Newest" },
];

export type FilterKey = "all" | "new" | "sale";

export const filterOptions: { value: FilterKey; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "sale", label: "Sale" },
];

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    case "price-desc":
      return copy.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    case "newest":
      return copy.sort(
        (a, b) =>
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
      );
    default:
      return copy.sort((a, b) => {
        const featuredRank = Number(b.featured) - Number(a.featured);
        if (featuredRank !== 0) return featuredRank;
        return (
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
      });
  }
}
