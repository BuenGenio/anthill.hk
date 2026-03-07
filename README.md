# anthill.hk

Turn-key eCommerce agency website for Anthill HK.

## Quick Start

Open `index.html` in a browser, or serve locally:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Structure

```
anthill.hk/
├── index.html            # Single-page agency site
├── css/
│   ├── theme.css         # Theme variables (light + dark)
│   └── main.css          # Layout, components, responsive
├── js/
│   └── main.js           # Theme toggle, scroll FX, animations
├── assets/
│   ├── icons/
│   │   └── favicon.svg
│   └── img/
└── README.md
```

## Features

- **Light/Dark mode** with system preference detection
- **Hong Kong skyline** hero with gradient sky
- **Scroll-reveal animations** via IntersectionObserver
- **Fully responsive** — mobile, tablet, desktop
- **Zero dependencies** — pure HTML, CSS, JS
- **Theme system** via CSS custom properties (easy to extend)

## Theming

Edit `css/theme.css` to create custom themes. All colours, spacing, and effects are controlled by CSS custom properties under `[data-theme="light"]` and `[data-theme="dark"]`.
