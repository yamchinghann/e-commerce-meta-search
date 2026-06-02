# E-commerce Meta-Search App

A client-side React app for searching Malaysian marketplace listings across Shopee, Lazada, and Taobao from one form.

## Features

- Search keyword input with URL-safe query encoding
- Platform checkboxes for Shopee, Lazada, and Taobao
- Select All control for every supported platform
- Disabled search button until a keyword and at least one platform are selected
- Opens selected marketplace searches in separate browser tabs
- Tailwind CSS responsive interface
- Vite configuration ready for GitHub Pages deployment under `/shopping-search/`

## Tech Stack*tech

- Vite
- React
- Tailwind CSS
- Lucide React icons

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Marketplace URLs

The app opens these search URLs with the encoded keyword:

- Shopee: `https://shopee.com.my/search?keyword={query}`
- Lazada: `https://www.lazada.com.my/catalog/?q={query}`
- Taobao: `https://s.taobao.com/search?q={query}`

## GitHub Pages Deployment

The Vite base path is already configured in `vite.config.js`:

```js
base: '/shopping-search/'
```

To deploy the built `dist` folder with `gh-pages`, run:

```bash
npm run deploy
```

Make sure the GitHub repository name is `shopping-search`, or update the Vite `base` value to match the repository path.
