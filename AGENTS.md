# Notes for agents editing this site

Emily Mo's personal website: plain HTML, CSS and JavaScript. There is no build step, framework or package manager.

## Run it locally

```sh
python3 _dev-server.py
```

Serves the repo at http://localhost:8000. It maps extensionless URLs to `.html` files (`/work` → `work.html`) the same way GitHub Pages does, so use links like `/work`, not `work.html`. There is no live reload; refresh the browser after edits.

## Deploying

- Pushing to `main` deploys automatically through `.github/workflows/` (GitHub Pages uploads the whole repo).
- The live site is **https://emilymo.me** (`emilymo999.github.io` redirects there). It usually updates 1–2 minutes after a push.
- GitHub Pages sends `cache-control: max-age=600`, so a browser can show a page up to 10 minutes old. If a change "isn't showing", check with `curl https://emilymo.me/<page>` and suggest a hard refresh (Cmd + Shift + R) before changing code.
- Only commit or push when Emily asks. She sometimes keeps a feature as an unpushed draft while pushing other changes. When that happens, leave the draft's nav links and CSS out of the commit too, so the live site never links to a missing page.

## Pages

| URL | File | Notes |
| --- | --- | --- |
| `/` | `index.html` | Homepage: intro, bullet list of roles, contact links |
| `/work` | `work.html` | Timeline of jobs (`.timeline-entry` blocks) |
| `/other` | `other.html` | Interests in three columns, plus a "Messages" quote list |
| `/24` | `24.html` + `twentyfour.js` | The 24 card game (see below) |

The nav (`<nav class="site-nav">`) is copied into each of those four pages. When adding a page, add its link to all of them.

**Legacy, not linked from the nav:** `about-me.html`, `interests.html` and `vanilla-latte.html` are identical "work in progress" placeholders. `cube.html` is a standalone experiment, and `old/` is a previous version of the site. `color-mode.js`, `dark-mode.js`, `pixel-in.js` and `typing-effect.js` are only used by those legacy pages. Leave them alone unless asked.

## Styling

Everything shares one stylesheet, `style.css`. The 24 game's styles live in its own `/* 24 game */` section there.

- **Palette:** background `#f7f4ef`, body text `#444444`, headings and links `#222222`, muted text `#666666` / `#999999`, borders `#ddd6c9`. The 24 page overrides the background to pastel orange `#fde8d4` via `<html class="page-24">`, with card borders `#f5b98a`.
- **Sizes:** body text is small (12px), `h1` is 28px, and the content column is at most 668px wide.
- **Fonts:** every font stack lists the Windows font first, then a Google Font, e.g. `'Segoe UI', 'Open Sans', sans-serif` and `Garamond, 'Libre Baskerville', 'Times New Roman', serif`. That way Windows keeps Segoe UI and Garamond, while Macs and phones (which lack them) get Open Sans and Libre Baskerville. The Google Fonts `@import` is the first line of `style.css`. Keep this order when adding new font stacks. If you add an italic or a new weight, add it to that `@import` as well, or Macs will fake it.
- **Load-in animation:** `.site-nav` and `.page-layout` fade in on page load. All motion respects `prefers-reduced-motion`.
- The look is minimalist on purpose: no heavy shadows, gradients or large rounded cards.

## The 24 game (`twentyfour.js`)

- It deals four cards from 1–10. `solvable()` checks every order, operation and grouping using exact fractions, and `deal()` redeals until the hand can make 24. Every hand shown is guaranteed solvable, so there is intentionally no "New cards" / skip button.
- To play, the player clicks a card, then an operation, then another card. The two merge into one card in the second card's slot. When one card is left, the game checks whether it equals 24.
- Start runs a 60-second round that counts solves. Undo and Reset work on the current hand.
- Keyboard: keys 1–4 select cards, `+ - x * /` select operations, Backspace undoes.
- On page load, `rain()` shows a shower of sparkles, rainbows and unicorns. It is skipped when the user prefers reduced motion.
- **Leaderboard:** removed for now (commit `358bb30`). The earlier version saved scores in `localStorage`, so each visitor only saw their own scores. A shared leaderboard needs an outside database such as Firebase or Supabase, because the site is static.

## Working with Emily

- She edits files herself too, sometimes with an editor that still has an older copy open. Run `git diff` before and after editing, and if something you removed reappears, point it out rather than silently redoing work.
- Keep her own wording in page text. Fix obvious typos, but mention what you changed.
