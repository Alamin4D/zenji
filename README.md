<div align="center">

<img src="public/images/hero.jpg" alt="ZENJI hero" width="100%" style="border-radius: 12px;" />

# ⛩️ ZENJI — Anime-Inspired Streetwear

**Anime culture · Japanese/samurai aesthetics · Modern streetwear · Limited drops**

A modern, fully-responsive e-commerce storefront for **ZENJI**, an anime-inspired streetwear brand blending the discipline of the samurai with the raw energy of the streets.

[Live Demo](https://your-project.vercel.app) · [GitHub Repository](https://github.com/your-username/zenji-store)

</div>

---

## ✨ Overview

ZENJI is a fictional anime-inspired streetwear brand. This project is a complete **frontend storefront** — no backend, no database, no payment gateway. Everything runs on static product data, with cart & wishlist state persisted in the browser via `localStorage`.

The design leans into the brand's identity: **dark, editorial, premium, and bold** — with strong typography, Japanese accents (禅 · 侍 · 道), limited-drop scarcity, and smooth, purposeful motion.

---

## 🚀 Features

### 🏠 Home
- Announcement marquee bar
- Sticky, responsive navigation bar with mobile menu
- Cinematic hero with entrance animation & **Shop the Drop** CTA
- Brand introduction
- Featured collection & latest drops
- Brand philosophy / manifesto
- Newsletter signup section
- Full footer (links, socials, newsletter, brand statement)

### 🛍️ Shop
- Responsive product grid (8 products)
- 🔍 **Live search**
- 🏷️ **Filters** — All / New / Sale + category chips
- 🔃 **Sorting** — Featured / Price low→high / Price high→low / Newest
- New & Sale badges, sold-out / low-stock states

### 👕 Product Details
- Image gallery
- Price, sale price & discount %
- Size selector (XS → XXL, plus One Size for accessories)
- Quantity selector
- Add to Cart (opens cart drawer)
- Shipping / return info + accordions (details, fabric & care, shipping)

### 🛒 Cart
- Fully functional & **persistent** (localStorage)
- Increase / decrease quantity, remove items
- Free-shipping progress bar
- Subtotal / shipping / total
- Empty cart state
- Demo checkout flow → order confirmation

### ❤️ Wishlist
- Add / remove products
- Persisted in localStorage

### 📄 Other Pages
- **Our Story** — brand storytelling (origin, samurai inspiration, anime influence, streetwear culture, manifesto)
- **Lookbook** — editorial masonry gallery with hover effects
- **FAQ** — animated, accessible accordion across 6 categories (Orders, Shipping, Products, Sizes, Returns, Drops)

### ♿ UX / Accessibility
- Semantic HTML & ARIA (menus, dialogs, accordions)
- Keyboard-friendly navigation & visible focus states
- Skeleton loading states & empty states
- Smooth scroll reveal & hover animations (Framer Motion)
- Fully responsive: **375px → 1440px+**

---

## 🧰 Tech Stack

| Area       | Technology                                        |
| ---------- | ------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router)     |
| Language   | [TypeScript](https://www.typescriptlang.org)      |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com)        |
| Animation  | [Framer Motion](https://www.framer.com/motion/)   |
| State      | [Zustand](https://zustand.docs.pmnd.rs) + persist |
| Icons      | [Lucide React](https://lucide.dev)                |
| Data       | Static local data (`src/data`)                    |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18.18+** (recommended: 20 LTS)
- **npm** 9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/zenji-store.git
cd zenji-store

# 2. Install dependencies
npm install

# 3. (Optional) Copy environment variables
#    The storefront runs entirely on static data — no DB required.
cp .env.example .env

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🔥

---

## 🛠 Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the development server         |
| `npm run build`    | Create an optimized production build |
| `npm run start`    | Serve the production build           |
| `npm run lint`     | Run ESLint                           |
| `npm run typecheck`| Run TypeScript checks (`tsc --noEmit`) |

---

## 🗂 Project Structure

```
├── public/
│   └── images/          # Generated brand & product imagery
├── src/
│   ├── app/             # Routes (home, shop, product, cart, story, lookbook, faq, wishlist)
│   ├── components/      # Reusable UI (navbar, footer, cart drawer, cards, etc.)
│   ├── data/            # Static data (products.ts, faq.ts, lookbook.ts)
│   ├── lib/             # Utilities (formatting, cart helpers, hooks)
│   ├── store/           # Zustand stores (cart, wishlist, UI)
│   └── types/           # Shared TypeScript types
├── .env.example
├── next.config.ts
└── package.json
```

---

## 📸 Screenshots

| Home | Shop | Product |
| :--: | :--: | :--: |
| ![Home](/public/images/hero.jpg) | *(add screenshot)* | *(add screenshot)* |

> **Tip:** Take screenshots after deploying and drop them in a `screenshots/` folder, then update the table above.

---

## 🚢 Deployment

The project is deployed on [Vercel](https://vercel.com):

1. Push the repository to GitHub
2. Import the repo on Vercel (**Add New → Project**)
3. Framework auto-detects as **Next.js**
4. Click **Deploy**

---

## 🌐 Live URL

🔗 **[https://zenji-rho.vercel.app/](https://zenji-rho.vercel.app/)**

## 📦 GitHub Repository

🔗 **[https://github.com/Alamin4D/zenji](https://github.com/Alamin4D/zenji)**

---

## 📜 License

Built for educational purposes as a web developer assessment project.

---

<div align="center">

**禅 — Wear your story.**

</div>
