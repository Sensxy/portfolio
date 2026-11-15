# ozan hessick — portfolio

A static, dependency-free portfolio styled as a manga chapter. Plain HTML/CSS/JS, so no build step is needed.

## Deploy to GitHub Pages
Live at https://sensxy.github.io/portfolio/ from the `main` branch of `Sensxy/portfolio` (Settings → Pages → Deploy from a branch → `main` / root). Commit changes to `main` and the site updates within a minute or two.

## Deploy to Vercel
Import the repo in Vercel and choose the "Other" framework preset. You don't need a build command, and the output directory is `.`.

## Editing
- **The game (Chapter 3):** the screenshot is `assets/inchoate.png`.
- **Projects:** each card in Chapter 2 opens a `<dialog id="dlg-…">` near the bottom of `index.html`.
- **Résumé:** replace `assets/Ozan_Hessick_Resume.pdf`.
- **Colors and fonts:** these are the CSS variables at the top of `styles.css`.

## Interactions
- Speed lines on the title page and the ending follow the cursor. They stay static when the visitor has reduced motion turned on.
- ← / → turn the page between chapters.
- Project panels open as full spreads (Esc or the backdrop closes them).
