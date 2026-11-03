# Narwhal Revelations: write-up site

A static website describing the Narwhal Revelations modpack (version 1.1.0): a NeoForge 1.21.1 port of a customised Beyond Mines: Revelations II 1.2.1 server.

## Files

- `index.html` is the whole page (content is plain HTML, readable without JavaScript).
- `style.css` has the styles (light and dark through `prefers-color-scheme`, responsive).
- `site.js` is small vanilla JavaScript for sortable and filterable tables, tabs and the section highlight in the nav.
- `.nojekyll` tells GitHub Pages to serve the files as they are.

## Hosting

No build step and no external requests (no CDNs, fonts or trackers). All links between files are relative, so it works from a subpath such as `/narwhal-revelations/`. To publish on GitHub Pages, put these files at the root of the published branch or folder.

Preview locally with `python3 -m http.server` in this folder and open `http://localhost:8000/`.

## Notes

- `downloads/Narwhal_Revelations-1.1.0.zip` is the client modpack (CurseForge import zip, 22 MB). It contains configs and a manifest, plus a few bundled jars; no server pack is hosted here.
- To change the server address, edit the text inside `<code id="server-address">` in the *Join the server* section of `index.html`. To publish a new pack version, replace the zip in `downloads/` and update the file name in the download links (`#dl-pack`, hero button and Install card).
- The page content is generated from a one-off report; facts were checked on 3 Nov 2026 against CurseForge and Modrinth and can go out of date.
- Mods and the unofficial ports belong to their authors.
