# Space Systems Engineering Portfolio

A lightweight, single-page engineering project portfolio for **María González Rodríguez**. It complements the CV by giving more space to project videos, simulation recordings, plots, technical diagrams, methods, validation evidence and engineering conclusions.

The site is positioned around simulation, modelling, verification and validation, optimisation and MBSE-related workflows for the space sector. Programming is presented as an engineering tool rather than as the main professional identity.

## Repository structure

```text
/
├── index.html
├── styles.css
├── script.js
├── data/
│   └── portfolio-data.js
├── assets/
│   ├── CV.pdf
│   ├── projects/
│   │   └── README.md
│   ├── images/
│   │   └── social-card.svg
│   └── icons/
│       └── favicon.svg
├── projects/
│   └── project-template.html
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── 404.html
├── README.md
└── .gitignore
```

## Preview locally

Open the repository folder in VS Code and use either Live Server or a small Python server:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

No package installation or build step is required.

## Where to edit content

Most normal updates belong in:

```text
data/portfolio-data.js
```

It stores:

- personal and contact details
- projects
- experience
- education
- workshops
- publications
- skills
- languages

The main hero wording and section order are in `index.html`. Colours, spacing and layouts are in `styles.css`. Interactions and data rendering are in `script.js`.

## Add or edit projects

Each project contains engineering case-study fields:

```js
{
  id: "unique-id",
  title: "Project title",
  year: "2026",
  context: "Organisation or course",
  tags: ["Simulation", "Aerospace"],
  visual: "terrain",
  preview: { enabled: false, type: "image", src: "assets/projects/project-id/preview.webp", alt: "..." },
  media: [],
  problem: "Engineering problem",
  model: "Model or method",
  assumptions: "Assumptions and constraints",
  implementation: "What was implemented",
  validation: "Verification or validation approach",
  result: "Supported result or insight",
  limitations: "Limitations and missing evidence",
  tools: ["MATLAB"],
  links: [{ label: "GitHub repository", url: "https://..." }],
  missingLinks: ["[Add report link]"]
}
```

Projects appear in the order used in the data file. There are no project filters.

## Add images and videos

A complete, project-by-project shot list is available in:

```text
assets/projects/README.md
```

Each planned media item is already defined in `data/portfolio-data.js` with `enabled: false`. To add it:

1. Put the file at the specified path.
2. Change the matching item to `enabled: true`.
3. Refresh the site.

Example:

```js
{
  enabled: true,
  type: "video",
  src: "assets/projects/lunar-terrain/terrain-flythrough.mp4",
  poster: "assets/projects/lunar-terrain/preview.webp",
  role: "Simulation demo",
  title: "Generated terrain fly-through",
  caption: "A short rover-level fly-through showing terrain scale and morphology.",
  layout: "wide"
}
```

Supported presentation fields include:

- `layout: "wide"` to span both gallery columns
- `fit: "contain"` for plots and diagrams that should not be cropped
- `role`, `title` and `caption` for an engineering-focused explanation
- `poster` for a video preview image

Images open at full size in a new tab. Videos use controls, `playsinline` and metadata-only preloading. Keep videos compressed; for long demonstrations, link to an external video rather than storing a large file in the repository.

## Update the CV

Replace:

```text
assets/CV.pdf
```

Keep the same filename so all download buttons continue to work.

## Update links

Edit `data/portfolio-data.js` for GitHub, LinkedIn, project and publication links. Canonical and Open Graph URLs also appear in `index.html`.

## GitHub Pages deployment

1. Put the files at the repository root.
2. Push or commit them to `main`.
3. Open **Settings → Pages**.
4. Set **Source** to **GitHub Actions**.
5. Confirm the deployment in the **Actions** tab.

`.github/workflows/deploy-pages.yml` uploads and deploys the static repository. There is no build step.

For this user-site repository, the expected public address is:

```text
https://magonrod.github.io/
```

## Custom domain later

1. Enter the domain in **Settings → Pages → Custom domain**.
2. Configure the DNS records shown by GitHub.
3. Add a root `CNAME` file containing the domain.
4. Enable HTTPS after DNS verification.
5. Update canonical and Open Graph URLs in `index.html` and `data/portfolio-data.js`.

## Accessibility and technical behaviour

- semantic page landmarks and consistent heading order
- keyboard-accessible mobile navigation and native project `<details>` elements
- visible focus styles and a skip link
- `prefers-reduced-motion` support
- useful no-JavaScript fallback
- responsive images and videos
- relative internal paths
- no trackers, cookies, external fonts or third-party runtime dependencies

## Remaining placeholders

Search for `[Add` to find incomplete information. The main remaining items are:

- project images, videos, plots and diagrams
- project thesis, report, publication and demonstration links
- quantitative project results and validation metrics supported by project evidence

## Publishing checklist

- [ ] Add project media under `assets/projects/`.
- [ ] Add missing project links and any research links once they are public.
- [ ] Add only supported numerical results.
- [ ] Replace `assets/CV.pdf` with the latest CV.
- [ ] Preview at desktop, tablet and mobile widths.
- [ ] Test keyboard navigation and project expansion.
- [ ] Test CV, GitHub, LinkedIn and public research links.
- [ ] Push to `main` and confirm the Pages workflow succeeds.
