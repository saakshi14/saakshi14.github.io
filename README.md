# Saakshi's academic website

A lightweight, responsive website for GitHub Pages. No installation or build step required.

## Preview

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this folder and visit http://localhost:8000.

## Personalise before publishing

Your name, university, research field, and contact email are included. Your CV download and one arXiv publication entry are included. Add further publications when ready. Edit `index.html` to update the text, `style.css` for the design, and `script.js` for the illustrative animation and theme controls.

To add your CV, place a publicly shareable file named `cv.pdf` in this folder, then replace the CV availability paragraph with `<a href="cv.pdf">Download my CV (PDF)</a>`.

Colours, spacing, and typography are in `style.css`. Fonts load from Google Fonts, with local fallbacks if offline.

## Publish on GitHub Pages

1. Sign into GitHub as `saakshi14`.
2. If it does not already exist, create a public repository named `saakshi14.github.io`. If it exists, inspect its contents before replacing anything.
3. Upload `index.html`, `style.css`, `script.js`, and `.nojekyll` to the repository root. Upload `cv.pdf` too once ready. Commit the changes to `main`.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**, then **main** and **/(root)**. Save.
6. Wait for the Pages deployment to finish, then visit https://saakshi14.github.io/.

Upload only this website's files, not the surrounding PhD workspace. Files uploaded to a public repository are public.

Official instructions: https://docs.github.com/en/pages/quickstart

## Update later

Edit the HTML or CSS in GitHub and commit your changes. GitHub Pages will redeploy the website.
