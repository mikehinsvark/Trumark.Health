# Trumark Health · Dreams Agent Hub

Website: **https://trumark.health/**

The complete Connected Care, Quantum Health Benefits, LifeX, CRC Benefits, and Dreams Insurance Solutions website, migrated to this repository on October 15, 2026. Includes the five-card orbital carousel, appointment links, compensation illustrations, training replays, brochure library, original artwork, and shared Dreams ecosystem footer.

## Publish

GitHub Pages serves **main / (root)**. The `CNAME` file sets `trumark.health`; `.nojekyll` serves the supplied files directly. Push changes to `main` to publish them. Keep the domain and HTTPS settings in Settings → Pages.

## Pages

- `index.html`: Connected Care and appointments (code `Dreams1`).
- `quantum.html`: Quantum Health Benefits, the featured training replay, two Dreams courses, testimonials, and brochures.
- `lifex.html`: LifeX.
- `crc-benefits.html`: CRC Benefits.
- `dreams-insurance.html`: Dreams Insurance Solutions and Vantage.
- `resource-viewer.html`: Original document preview/download reader.

No framework installation, database, analytics, or build step is required. All page styling, scripts, images, brochure covers, and document files are included. The website links to the appointment providers; it does not collect contracting or client information.

## Edit and check

Run commands from the repository root:

```text
node verify.mjs
python -m http.server 8819 --bind 127.0.0.1
```

Open `http://127.0.0.1:8819/` for a local preview. `node build-products.mjs` regenerates the four product pages and shared navigation/footer from the source templates and `product-resources.json`. Edit `site-footer.mjs` for shared footer content, and `ecosystem-footer.css` for its styling. The Connected Care page itself is maintained in `index.html`.

Quantum training content and destination links live in `quantum-training.mjs`. Its scoped styles and passcode-copy interaction are in `quantum-training.css` and `quantum-training.js`. After changing the training content, run `node build-products.mjs` to regenerate `quantum.html` before publishing.

The Quantum calculator link and personalized employer-page panel live in `quantum-next-steps.mjs`, with scoped CSS and browser behavior in the matching `.css` and `.js` files. The agent-ID box accepts `AA` plus four digits or four digits alone, uses `AA0233` by default, and stores a validated ID under `trumark-health-agent-id` in this site's browser storage. Saving, copying, and clearing only affect the Trumark Health link in this panel. They do not update the visitor's other sites or verify an ID's ownership.

## Documents

The original PDFs and presentations preserve their supplied bytes. Three larger documents use `download-parts/`; `resource-files.mjs` reassembles and checks them against the sizes and SHA-256 hashes in `resource-downloads.json`. Preserve those files and the reader together. HTTPS is required for the browser integrity checks.

Source dates, audience notes, compensation qualifications, and plan limitations remain visible on the corresponding resource cards. The Vantage Format System is identified as internal use, the financial checkup retains its supplied sample name and editable fields, and the LifeX HSA reference uses the date printed inside the document.

This public GitHub Pages deployment is separate from the earlier ChatGPT Sites preview. Development notes, local research, credentials, archives, and the earlier hosting metadata are excluded from this repository.
