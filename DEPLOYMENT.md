# FileLite Studio — Deployment Status

## Project
- GitHub repository: https://github.com/eirchard/filelite-studio
- Production branch: `main`
- Cloudflare Worker: `filelitestudio`
- Production URL: https://filelitestudio.muhammadeirchard-m.workers.dev/
- Deployment command: `npx wrangler deploy`
- Static assets: `public/`

## Cloudflare Workers Git integration
1. Open the existing `filelitestudio` Worker in Cloudflare.
2. Go to **Settings → Builds** and connect `eirchard/filelite-studio`.
3. Use production branch `main`.
4. Leave build command empty.
5. Use deploy command `npx wrangler deploy`.
6. Check **Builds** and **Deployments** for the result of the subsequent Git push.

This document intentionally does not modify the site's HTML, JavaScript, CSS, or active Cloudflare deployment. Build/deploy must be verified in the Cloudflare dashboard.

## Files
- `public/index.html`: website
- `public/favicon.svg`: icon
- `wrangler.jsonc`: existing Worker's configuration
- `README_TH.md`: Thai guide
