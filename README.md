# Portfolio Progress

A mobile-friendly progress tracker for U.S. critical mineral projects: company cards, milestone timelines, a latest-updates feed and an investor FAQ.

Built with Next.js 15 (static export) and Tailwind CSS 4. Deployed to Vercel through GitHub Actions.

## Updating content

All content lives in one file: `data/portfolio.json`. No code changes are needed for routine updates.

### Add a new milestone

Add one entry to the company's `milestones` array (order does not matter; the page sorts by date):

```json
{ "date": "2026-11-15", "title": "Q3 2026 report released", "status": "done", "source": "Company report, Nov 15, 2026" }
```

| Field    | Values                                           |
| -------- | ------------------------------------------------ |
| `date`   | `YYYY-MM-DD`, or `YYYY-MM` when only the month is known |
| `title`  | One short sentence                               |
| `status` | `done`, `in_progress` or `upcoming`              |
| `source` | Where the information comes from (optional)      |

### Mark an upcoming milestone as completed

Change its `status` from `"upcoming"` to `"done"` and set the exact `date`.

### Other edits

- **Last updated date** (shown in the header): `updatedAt` at the top of the file.
- **Company stage and progress bar**: `stage` (text) and `progress` (0–100) on each company.
- **Company summary**: `summary` on each company.
- **FAQ**: add or edit entries in the `faq` array (`q` and `a`).

### Publish the change

Commit and push to `main`. GitHub Actions builds and deploys to Vercel automatically, usually within 1–2 minutes. You can also edit `data/portfolio.json` directly on github.com (pencil icon → Commit changes); that triggers the same deployment.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Deployment setup (one time)

`.github/workflows/deploy.yml` deploys a preview for pull requests and production on pushes to `main`.

Add these repository secrets (Settings → Secrets and variables → Actions):

- `VERCEL_TOKEN`: Vercel → Account Settings → Tokens
- `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`: run `npx vercel link` once locally and copy them from `.vercel/project.json`

## Search engine visibility

The site is currently hidden from search engines. To make it public, remove `robots` from `app/layout.tsx` and delete `public/robots.txt`.
