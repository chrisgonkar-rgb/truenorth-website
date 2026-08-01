# TrueNorth Group — Website Rebuild

Plain HTML, CSS, and JavaScript. No build step, no framework, no GSAP. That
also fixes the navigation jank from the old version — there's no scroll-linked
animation library fighting with oversized images anymore, just native smooth
scroll and a small IntersectionObserver-based fade-in.

The color palette (navy `#0B1F3F` / `#1A3359`, gold `#C9A227` / `#D4B43A`) and
fonts (Montserrat for headings, Open Sans for body) are carried over exactly
from your original build.

## 1. Preview it right now

Double-click `index.html` to open it in a browser. Everything works locally,
no server needed. You'll see gray boxes with a camera icon and a text label
wherever a real photo is still needed — that's intentional (see below).

## 2. Add your photos

Every photo on the site is missing on purpose. Drop your real image files into
the `images/` folder using **exactly** these filenames, and they'll appear
automatically — no code editing required:

| Filename | Where it appears | Suggested shape |
|---|---|---|
| `images/hero.jpg` | Hero section, top of page | Landscape, ~1600×1240px |
| `images/leadership-portrait.jpg` | "Why TrueNorth" section | Portrait, ~900×1200px |
| `images/capabilities.jpg` | Capabilities section | Landscape, ~1400×1050px |
| `images/greenflow.jpg` | GreenFlow subsidiary card | Landscape, ~1200×750px |
| `images/oasis-pure.jpg` | Oasis Pure subsidiary card | Landscape, ~1200×750px |
| `images/logistics.jpg` | TrueNorth Logistics card | Landscape, ~1200×750px |
| `images/governance.jpg` | Governance section | Portrait or landscape, ~1100×1400px |
| `images/accountability.jpg` | Accountability section | Landscape, ~1300×1000px |
| `images/principles.jpg` | Operating Principles section | Portrait, ~1000×1300px |
| `images/readiness.jpg` | Institutional Readiness section | Landscape, ~1300×1000px |
| `images/news-1.jpg`, `news-2.jpg`, `news-3.jpg` | News teaser cards | Landscape, ~1200×750px |

This is exactly where you and your wife's photos can go — use whichever
headshot fits `hero.jpg` or `leadership-portrait.jpg` best, and use real
photos of your GreenFlow, Oasis Pure, and logistics operations for the
subsidiary cards. Real, slightly imperfect photos of your actual team and
vehicles will read as far more credible than any stock or AI-generated image.

The `Oasis Pure` logo mark used elsewhere on the old site had garbled,
misspelled text baked into it. I didn't recreate that — for now the brand
name appears as clean text instead. If you have a real vector/print logo file
for Oasis Pure, send it over and I'll drop it in properly.

## 3. Two things to fill in yourself

- **Phone number**: search `index.html` for `Add your phone number here` (in
  the Contact section) and replace it with a real `tel:` link, e.g.
  `<a href="tel:+231XXXXXXXXX">+231 XX XXX XXXX</a>`.
- **Street address**: currently just shows "Monrovia, Liberia." Add a full
  address in the same contact block if you want one listed.

## 4. What's temporarily stubbed, and why

- **Contact form** currently opens the visitor's email app with the message
  pre-filled (`mailto:`), since a static site has no server to receive form
  submissions. For a real inbox-delivered form, connect it to a free service
  like Formspree or Netlify Forms — I can wire that up once you pick one.
- **Resource downloads** (corporate profile, capability statements, etc.)
  currently send a request email rather than downloading a file, because
  those PDFs don't exist yet. Once you have them, I can turn each into a
  direct download link.
- **News cards** are teaser cards only — there's no blog engine behind them
  yet. Fine for now; if you want full articles later, that's a bigger addition.

## 5. Deploying via GitHub → Netlify

This site has no build step (no npm, no Vite, unlike the old one) — it's just
static files. That matters for your Netlify settings.

1. **Push these files to a GitHub repo.** Either a fresh repo, or replace the
   contents of your existing one — `index.html` needs to sit at the repo
   root, not inside a `dist/` or `build/` folder.
   ```
   git init
   git add .
   git commit -m "Rebuild: real photos, no build step"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
   No git experience needed either — GitHub's web UI has an "Add file →
   Upload files" button that lets you drag the whole folder in directly.

2. **In Netlify → Site settings → Build & deploy**, make sure:
   - **Build command** is blank (there's nothing to build)
   - **Publish directory** is `.` (repo root) — not `dist`
   
   The included `netlify.toml` sets both of these automatically, so if
   Netlify reads that file correctly you shouldn't need to touch this. But if
   this repo was previously connected to Netlify for the old Vite site,
   double-check these two fields aren't still set to `npm run build` /
   `dist` from before — that's the most common reason a redeploy fails.

3. **`_redirects` is included** — same one from the old site
   (`growflow.truenorthgroupltd.com` → your Growflow app on Netlify). That's
   unrelated to this rebuild, just carried over so it doesn't get dropped.

4. Once it deploys, you'll get a random `something.netlify.app` URL first —
   good for checking everything works before pointing your real domain at it
   in **Domain settings**.
