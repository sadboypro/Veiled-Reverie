# Deploying Veiled Reverie to Vercel

This is a standard Next.js 15 app — Vercel auto-detects everything. No `vercel.json` needed.

## Option A — Deploy from the Vercel dashboard (easiest)

1. Push this project to a GitHub repo (see "Git setup" below if it isn't a repo yet).
2. Go to https://vercel.com → **Add New… → Project** → import the repo.
3. Framework preset will auto-fill as **Next.js**. Leave build settings default.
4. Add the environment variables (see table below) under **Environment Variables**.
5. Click **Deploy**. Vercel builds and gives you a `*.vercel.app` URL.

## Option B — Deploy from the terminal (Vercel CLI)

```bash
npm i -g vercel       # one-time
vercel login          # opens browser to authenticate
vercel                # first run: links/creates the project (preview deploy)
vercel --prod         # production deploy
```
Set env vars either in the dashboard or with `vercel env add NAME`.

## Environment variables to set in Vercel

| Variable | Value | Needed for |
|---|---|---|
| `RESEND_API_KEY` | your Resend key (`re_…`) | Contact form sending |
| `CONTACT_TO_EMAIL` | inbox that receives inquiries | Contact form |
| `CONTACT_FROM_EMAIL` | verified sender (`onboarding@resend.dev` for testing) | Contact form |
| `NEXT_PUBLIC_SITE_URL` | your final URL, e.g. `https://veiledreverie.com` | Correct Open Graph / canonical URLs |

After the first deploy, copy the live URL into `NEXT_PUBLIC_SITE_URL` and redeploy so social-share previews use the right absolute paths.

## Git setup (if not a repo yet)

```bash
cd "C:/Users/Dell/Videos/VEILED REVERIE UX"
git init
git add .
git commit -m "Veiled Reverie site"
# create an empty repo on github.com, then:
git remote add origin https://github.com/<you>/veiled-reverie.git
git branch -M main
git push -u origin main
```
`.env.local` is already gitignored, so your keys won't be committed.

## Custom domain

In the Vercel project → **Settings → Domains**, add your domain and follow the DNS
instructions. Then update `NEXT_PUBLIC_SITE_URL` to match and redeploy.
