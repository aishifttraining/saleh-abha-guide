# Sirius Abha

A polished, browser-only visitor guide for discovering Abha, Saudi Arabia. Sirius pairs a cinematic introduction to the city with a private trip planner and a browsable collection of places to explore.

## What it does

- **Discover Abha** — a three-part, full-screen visual story of Abha's city life, cloud-filled mountains, and stone-built heritage.
- **Trip Planning** — choose a group size, one or more travel styles, and a month to receive a tailored day outline and seasonal planning advice.
- **Tourist Attractions** — browse 31 curated restaurants, cafés, natural attractions, and heritage sites.
- **Language and appearance** — the menu offers full English/Arabic (RTL) and light/dark modes. Theme changes crossfade the supplied day/night imagery; preferences stay in the current browser.
- **Maps links** — selecting an attraction explicitly opens a Google Maps search for that place in a new browser tab.

## Who it is for

Visitors who want a calm, thoughtful starting point for an Abha visit — especially people looking for nature, heritage, art, cafés, or family-friendly moments.

## Needs

A modern browser. No installation, account, internet connection, external library, or server is required.

## How to run it

1. Download or clone this repository, keeping all files and folders together.
2. Double-click `index.html` to open the home page.
3. Use the menu to visit `trip-planning.html` and `tourist-attractions.html`.

The website works directly from `file://`, so it is intentionally built with plain HTML, CSS, JavaScript, and local assets only.

## Try it with the sample data

The trip planner shows a built-in made-up example when opened fresh. Select **Load example** at any time to populate the traveller count, travel styles, and visit month.

The example lives in `sample-data/data.js`, which is loaded with a normal script tag because a page opened directly from disk cannot reliably load a local JSON file. Example month data is based on the current browser date.

Your own planner choices are stored only in `localStorage` in your browser. They are never sent to a server or included in GitHub.

## Local assets

All visual assets are kept in `assets/`:

- `abha-city-day.jpg` / `abha-city-night.jpg` — Abha city and Saudi flag scenes for the home introduction
- `abha-mountains-day.jpg` / `abha-mountains-night.jpg` — mountain and cloud scenes for the nature chapter
- `abha-heritage-day.jpg` / `abha-heritage-night.jpg` — stone architecture scenes for the heritage chapter
- `trip-planning-day.jpg` / `trip-planning-night.jpg` — the supplied `n abha` pair used behind Trip Planning
- `tourist-attractions-day.jpg` / `tourist-attractions-night.jpg` — the supplied `na abha` pair used behind Tourist Attractions
- `al-qatt-asiri-pattern.jpg` — colorful Al-Qatt Al-Asiri motif used for the Sirius mark and responsive decorative borders

Attraction-card imagery is a local category illustration made from these supplied assets. It does not claim to be a photo of an individual venue.

## Quick manual checks

- Open the menu, then test its links, language switch, theme switch, close button, backdrop, and Escape key.
- On Trip Planning, choose personas, change the traveller count, select every month, save a plan, reload, load the example, and clear the saved plan.
- On Tourist Attractions, test all five filters (7 restaurants, 14 cafés, 5 natural attractions, 5 heritage sites), hover and keyboard-focus a card to reveal its preview, then press Enter to confirm the explicit Maps link opens a new tab.
- Toggle themes on every page and confirm the local day/night images crossfade while overlays remain readable; enable reduced motion in the browser or operating system to confirm changes become immediate.
- Switch to Arabic and confirm the full page direction changes to RTL while all controls remain usable.
- Test each page at 320, 375, 480, and 768px widths: there must be no horizontal scroll; headings and long copy must remain readable; the drawer must scroll on short phone viewports; and every control must remain comfortably touch-sized.
- Reduce the browser width to a phone-sized viewport and ensure all controls remain available.

There are no timers or levels in Sirius, so a demo-speed or skip control is not applicable.

Built with Claude Code during the KKU Claude Code hackathon.
