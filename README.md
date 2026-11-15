# ozan hessick — portfolio

A static, dependency-free portfolio styled as a manga chapter. Plain HTML/CSS/JS, so no build step is needed.

## Deploy to GitHub Pages
1. Create a repo named `Sensxy.github.io` (or any name).
2. Push these files to the `main` branch root.
3. Settings → Pages → Source: "Deploy from a branch" → `main` / `(root)`.
4. The site goes live at `https://sensxy.github.io` (or `https://sensxy.github.io/<repo>`).

## Deploy to Vercel
Import the repo in Vercel and choose the "Other" framework preset. You don't need a build command, and the output directory is `.`.

## Editing
- **The game (Chapter 3):** search `index.html` for `TODO(Ozan)`. Drop a screenshot or GIF in `assets/` and swap the placeholder.
- **Projects:** each card in Chapter 2 opens a `<dialog id="dlg-…">` near the bottom of `index.html`.
- **Résumé:** replace `assets/Ozan_Hessick_Resume.pdf`.
- **Colors and fonts:** these are the CSS variables at the top of `styles.css`.

## Interactions
- Speed lines on the title page and the ending follow the cursor. They stay static when the visitor has reduced motion turned on.
- ← / → turn the page between chapters.
- Project panels open as full spreads (Esc or the backdrop closes them).
