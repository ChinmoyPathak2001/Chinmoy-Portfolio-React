# Chinmoy Pathak — React Portfolio

A complete, editable React conversion of the portfolio developed in this conversation. It includes seven personal photos, portraits, four project videos, detailed project screenshots, résumé, project links, loader, headline reveals, pinned scroll scenes, parallax, floating navigation, cursor effects, and responsive layouts.

## Run in VS Code on Windows

1. Install Node.js 24 LTS from https://nodejs.org/ if it is not installed. Restart VS Code after installing Node.
2. Extract this ZIP completely. Do not open files while they are still inside the ZIP.
3. In VS Code, select **File → Open Folder** and choose `chinmoy-portfolio-react`, the folder containing `package.json`.
4. Select **Terminal → New Terminal**. Run:

```bash
npm ci
npm run dev
```

5. Open the local URL printed in the terminal (normally `http://localhost:5173`). Keep the terminal running.
6. Edit files under `src/` and save to see updates. Press Ctrl+C in the terminal to stop the server.

Use Vite's server, not the VS Code Live Server extension and not a double-click on index.html. If PowerShell says scripts are disabled, select **Command Prompt** from the terminal dropdown, or use `npm.cmd ci` and `npm.cmd run dev`. You do not need to change your computer's execution policy.

`npm ci` installs the exact versions from package-lock.json and needs an internet connection. No account, API key, database, or Cloudinary setup is required to run this project.

## Technology mapping

| Requested technology | Included implementation |
| --- | --- |
| React | React 19.3.0 with editable JSX components |
| GSAP | GSAP 3.15.0 with ScrollTrigger for loader, reveals, parallax and pinned sections |
| Google Font API | Plus Jakarta Sans through Google Fonts CSS API; local font fallback also included |
| Lenis 1.1.9 | Exact requested version, integrated with the GSAP animation ticker |
| Framer Motion | framer-motion 14.0.0, used for navigation hover/tap gestures |
| Open Graph | Metadata in index.html; set your production domain and absolute preview image before publishing |
| Priority Hints | High-priority hero image/preload and lazy-loaded lower-page imagery |
| Cloudinary CDN / asset management | Optional image delivery configuration with automatic format/quality and local fallback; no account is connected or assets uploaded |
| Framer Sites | Not included as a local runtime. This is a React/Vite project, not a Framer editor project or Framer source export |
| HTTP/3 | Determined by your production HTTPS host/CDN, not a React package or localhost setting |
| SVG | Editable arrow and favicon files in public/; inline SVG hero arrow |

Framer Sites is a hosted website-building platform. It is different from the open-source Framer Motion library. A package installed with npm cannot reproduce the Framer editor/hosting service. Official platform documentation: https://www.framer.com/help/articles/can-i-export-my-website-to-html-and-self-host-it/

Only Lenis had a version specified in the supplied technology list; the other installed versions are pinned in package.json/package-lock.json. Vite 8.3.2 supplies the development server and production build. This project does not use Next.js.

## Files to edit

| What to change | File |
| --- | --- |
| Section composition | src/App.jsx |
| Hero title and introduction | src/components/Hero.jsx |
| Header name and copy-email interaction | src/components/Header.jsx, src/components/CopyEmail.jsx |
| Email recipient and Gmail enquiry template | src/config/contact.js |
| Project copy, media and live links | src/config/projects.js |
| Project cards and detail views | src/components/Projects.jsx, ProjectMedia.jsx, ProjectDialog.jsx |
| Personal photo gallery | src/components/PersonalGallery.jsx, public/personal/ |
| About, education and skills | src/components/About.jsx |
| GitHub repository links | src/components/Archive.jsx |
| Contact details and social links | src/components/Contact.jsx |
| Floating navigation and Framer Motion gestures | src/components/Navigation.jsx |
| Loader, scroll timing, easing and cursor motion | src/hooks/usePortfolioMotion.js |
| Colors, typography, spacing and mobile rules | src/styles.css |
| Cloudinary mapping and asset paths | src/config/media.js |
| Search and social-sharing metadata | index.html |
| Portraits and loader thumbnails | public/images/ |
| Project videos and screenshots | public/videos/, public/work/ |
| Downloadable résumé | public/files/chinmoy-pathak-resume.pdf |

ScrollCopy.jsx renders accessible word spans through React. GSAP changes their opacity without replacing React's text nodes. The motion hook cleans up its ticker, Lenis instance, ScrollTriggers, animation context and event handlers on unmount. React StrictMode is enabled for development. Reduced-motion preferences disable the heavy animation sequence.

## Optional Cloudinary setup

1. Upload your own images to your Cloudinary account.
2. Copy `.env.example` to `.env.local` in the project root.
3. Set `VITE_CLOUDINARY_CLOUD_NAME` to your public cloud name.
4. In `src/config/media.js`, add the real public ID for each uploaded filename. For example, only after uploading it: `'hero.webp': 'portfolio/hero'`.
5. Restart `npm run dev`.

Unmapped images stay local. Failed remote image loads fall back to included local files. Never put a Cloudinary API secret in a VITE_ variable: these variables are visible in browser code. This project performs image delivery only; it does not upload assets or administer your Cloudinary account.

Cloudinary URL documentation: https://cloudinary.com/documentation/image_transformations

## Production build

```bash
npm run build
npm run preview
```

`npm run build` creates the deployable `dist/` directory. Upload the contents of dist to your static host, or configure its build command as `npm run build` and output directory as `dist`. `npm run preview` is a local build check, not a production hosting service. HTTP/3 must be provided by the hosting/CDN service.

Before publishing, set `og:url` and replace the relative `og:image` in index.html with an absolute HTTPS URL on your own domain. The Google Fonts request needs internet access; the included local font fallback remains available if it fails.

## What's in this ZIP

All source components, styles, configuration, exact dependency lockfile, project videos, screenshots, personal photos, fonts, SVG files, résumé and this guide. node_modules, temporary preview files, repository metadata, and generated dist output are excluded. npm ci and npm run build recreate them as needed.

## Validation and remaining visual limits

The production build passed using Node 24.19.0 and npm 11.9.0. Local asset references and dependency versions were checked. The browser preview was unavailable in this session, so the React conversion has not had a fresh visual browser QA pass. The preceding static version was checked on desktop and mobile.

The supplied OBYS, ThirtySixStudio, AROCK and VYRA screen recordings now power the moving showcases. They are trimmed, resized H.264 clips with audio removed; the VYRA browser toolbar is cropped out. Hover previews use different supplied screenshots. Seven supplied café portraits form a horizontal personal gallery. The three numbered cards describe development approach, not client testimonials. This is a personalized reconstruction from the recordings, not the original site's source code or a promise of identical animation timing.

## Cursor correction (October 5, 2026)

Fixed the fade/scale tweens cancelling persistent cursor and project-preview x/y animations. Pointer appearance now uses property-level GSAP overwrite. Leaving and re-entering the viewport restores cursor visibility. Project hover exit resets rotation through its existing rotation tween.

This update changes multiple components and adds media. Extract it into a new folder, run `npm ci` and `npm run dev`. Keep any personal edits in your old folder until you have transferred them.

`npm run test:cursor` exercises the actual pointer event handlers against plain animation targets with real GSAP, including repeated movement, project entry/exit and viewport re-entry. This is a logic regression check, not a visual browser test.

## Media and interaction update (October 5, 2026)

- Five floating screenshot panels pass the pinned intro copy in pairs around a central panel.
- Four lazy-loaded, muted video showcases play while visible and pause when offscreen or the tab is hidden. Reduced-motion or data-saving preferences retain still posters.
- Project images and titles open a keyboard-accessible native dialog with a recorded walkthrough, full screenshots and live/source links. Escape or Close dismisses it.
- Next-project links navigate between featured projects. The cursor uses independent hover imagery and preserves the movement fix.
- Three approach cards move sequentially across the pinned heading on desktop; mobile uses readable stacked cards.
- Seven personal portraits scroll horizontally on desktop; swipe the gallery on mobile. Reduced-motion mode provides a manually scrollable gallery and readable static approach cards.
- Header email copies to clipboard, with a mailto fallback if copying is unavailable. The contact pill reveals a speech icon on hover or keyboard focus.

The build and cursor regression check pass. A fresh browser visual review is still needed to assess spacing and timing against the reference on your machine.

## Responsive and Gmail update

Reviewed the supplied 89-second recording showing narrow phone layouts and resizing up to tablet width. Fixed the hero SVG viewBox, mobile headline/description spacing, narrow-navigation avatar compression, and tablet text sizing. The mobile approach section now uses stacked cards instead of a long pinned scene. The intro pin is shorter on mobile. GSAP matchMedia rebuilds scroll scenes and cursor handlers across the 650px breakpoint, reverting old pins and transforms.

“Let’s talk” and the footer email open Gmail in a new tab with the recipient, subject and a project-details template filled in. The visitor can edit the draft and send it themselves; this site does not send email automatically. Gmail sign-in may be required. The footer also offers a regular email-app link. Change the address and template in src/config/contact.js.

Production build and cursor regression checks pass, and the generated compose URL was checked for its recipient and template fields. The revised layout and Gmail navigation have not had a live browser verification in this environment.

## Loader and animation lifecycle correction

The loader now runs on each normal page load/refresh, including refreshes from a scrolled position or a section URL. Startup temporarily disables native scroll restoration and begins at the top; a section hash is honored after the intro. Reduced-motion mode intentionally skips the loader.

ScrollTrigger scenes start after the loader releases the hero transforms. Delayed image readiness cannot restart an intro after a skip, timeout or unmount. Development remounts reset loader visibility, and breakpoint changes rebuild the relevant animations without accumulating pointer listeners.

`npm run test:startup` exercises the actual hook with lifecycle mocks: refresh from a scrolled position, hash navigation, intro/scroll handoff, duplicate completion, StrictMode cleanup, skip and timeout races. `npm run test:cursor` checks the cursor with real GSAP. Both pass; these are logic checks, not a replacement for an interactive browser check.
