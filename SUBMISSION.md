Submission checklist and deployment instructions

1) Deploy to Vercel (recommended)

- Create a GitHub repository and push the project (example commands below).
- Import the repo in Vercel (vercel.com) using your GitHub account.
- Vercel will detect a Vite project. Default settings should work.
  - Build command: npm run build
  - Output directory: dist
- Deploy. Copy the public URL that Vercel gives you and include it in your submission.

2) Source code (GitHub)

- Make the repository public or share access with reviewers.
- Include the README.md (this repo already contains one) and this SUBMISSION.md.

3) README notes

- The README includes: Quick start (install + dev), assumptions, tech stack, and deployment tips.
- If you want me to replace the README content with a different version, tell me and I can update it.

Quick git commands (local -> GitHub)

```bash
# create repo locally and push to remote
git init
git add .
git commit -m "Initial commit: Tria Contacts"
# Create a GitHub repo via the web UI (recommended), then add remote
git remote add origin git@github.com:<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

Vercel import notes

- Sign in to Vercel with GitHub
- Import project -> choose repository
- Set build command: npm run build (default)
- Set output directory: dist (default)
- Environment variables: none required for this static demo
- Deploy and copy the resulting URL into your submission

Alternative: Deploy to Netlify

- Connect your GitHub repo in Netlify
- Set build command: npm run build
- Publish directory: dist

Optional: push the built `dist/` to GitHub Pages or use `gh-pages` to publish.

If you want, I can provide the exact `git` and Vercel steps tailored to your GitHub username and repo name.
