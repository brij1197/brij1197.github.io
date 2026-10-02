
# Portfolio Website

This repository contains the source code for my personal portfolio website.

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/brij1197/brij1197.github.io.git
npm install
```

## Usage

After installing the dependencies, you can run the app locally using:

```bash
npm run dev
```

Then open http://localhost:3000.

To generate a production build (a static site in `out/`):
```bash
npm run build
```

## Deployment

The site is published to GitHub Pages from the `gh-pages` branch:

```bash
npm run deploy
```

This runs the tests, builds the site, and pushes the contents of `out/` to `gh-pages`.
Deploy from an up-to-date `main`, since it publishes whatever is in your working copy.

The previous Vite version of the site is kept under the `old-vite-site` tag.
