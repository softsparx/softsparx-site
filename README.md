# softsparx website

A static, dependency-free website (HTML + CSS + JS). No build step: open `index.html` in a browser, or use the VS Code **Live Server** extension for auto-reload.

## Structure

```
index.html          page content
css/styles.css      all styling (colors/fonts are variables at the top)
js/main.js          nav, scroll reveal, hero animation
assets/             logo files (web-sized)
favicon.ico
.nojekyll           tells GitHub Pages to serve files as-is
```

## Things to edit before launch

1. **Email**: set to `info@softsparx.com` in `index.html`.
2. **Media links**: the "Resources" section has placeholder links (GitHub, LinkedIn, video). Update each `href`, title and description. Duplicate a `<a class="link">` block to add more.
3. **Colors**: change the variables at the top of `css/styles.css` (`--accent` is the logo yellow `#ffd75b`).
4. **Copy**: all text is plain HTML in `index.html`.

## Deploy on GitHub Pages

1. Create a new GitHub repository and push these files to the `main` branch (files at the repo root).
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder `/ (root)`. Save.
3. After a minute the site is live at `https://<username>.github.io/<repo>/`.

## Connect your Porkbun domain

1. The repo already includes a `CNAME` file containing `softsparx.com`. Change it if your domain differs.
2. In Porkbun → your domain → **DNS Records**, delete any default parking records (`ALIAS`/`CNAME` pointing to pixie.porkbun.com), then add:

   | Type  | Host  | Answer              |
   |-------|-------|---------------------|
   | A     | (blank) | 185.199.108.153   |
   | A     | (blank) | 185.199.109.153   |
   | A     | (blank) | 185.199.110.153   |
   | A     | (blank) | 185.199.111.153   |
   | CNAME | www   | `<username>.github.io` |

3. Back in **Settings → Pages**, once DNS check passes, tick **Enforce HTTPS**. DNS can take from a few minutes up to a few hours.

(GitHub's published IPs can change; confirm them at docs.github.com under "Managing a custom domain for your GitHub Pages site".)
