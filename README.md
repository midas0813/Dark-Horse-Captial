# Portfolio Progress – Concept Demo

A single-page, mobile-friendly progress tracker for U.S. critical mineral projects: company cards, milestone timelines, a latest-updates feed and an investor FAQ.

Built with Next.js 15 (static export) and Tailwind CSS 4.

## Updating content

All content lives in `data/portfolio.json`. To add a milestone, add one entry to the company's `milestones` array:

```json
{ "date": "2026-11-15", "title": "Q3 2026 report released", "status": "done", "source": "Company report, Nov 15, 2026" }
```

`status` is one of `done`, `in_progress`, `upcoming`. Dates can be `YYYY-MM-DD` or `YYYY-MM`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Deployment (GitHub Actions → Vercel)

`.github/workflows/deploy.yml` deploys a preview for pull requests and production on pushes to `main`.

Add these repository secrets (Settings → Secrets and variables → Actions):

- `VERCEL_TOKEN`: Vercel → Account Settings → Tokens
- `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`: run `npx vercel link` once locally and copy them from `.vercel/project.json`

The site is set to `noindex` (meta tag + `robots.txt`).

---

Concept demo, not affiliated with any company. Information summarized from public announcements. Not investment advice.
