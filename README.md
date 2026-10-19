# Ujjwal Pratap: Developer Portfolio

A dark, editorial portfolio built with **React + Vite + TypeScript**, animated with **GSAP**.
It shows your projects, your real GitHub activity, your real LeetCode numbers, skills, certificates, a LinkedIn card and a resume download.

Nothing in it is invented. Anything you have not filled in yet shows an honest "coming soon" state, never a fake number or a broken link.

---

## What you will edit (and nothing else)

| What | Where |
| --- | --- |
| Name, bio, links, usernames, email, skills, projects, journey | `src/data/portfolioData.ts` |
| Certificates | `src/data/certificates.ts` |
| Your photo (transparent PNG) | `public/assets/portrait.png` |
| Your resume | `public/assets/resume.pdf` |
| Certificate files | `public/assets/certificates/` |
| Project screenshots (optional) | `public/assets/projects/` |

Colors live at the top of `src/index.css` (the `:root` block).

---

## Part 1: Run it on your computer

### 1. Get the project folder
Unzip `ujjwal-portfolio.zip`. Put the folder somewhere easy, for example `C:\Users\YourName\Documents\ujjwal-portfolio`.

### 2. Open it in VS Code
Open VS Code, then **File > Open Folder** and choose the `ujjwal-portfolio` folder (the one that contains `package.json`).

### 3. Install Node.js (once)
1. Go to https://nodejs.org and download the **LTS** version.
2. Install it with the default options.
3. Restart VS Code.
4. To check: in VS Code open **Terminal > New Terminal**, type `node --version` and press Enter. You should see something like `v20.x.x`.

### 4. Open the terminal in the right folder
In VS Code choose **Terminal > New Terminal**. It opens inside your project folder automatically. If you are unsure, type `dir` (Windows) and check that you can see `package.json` in the list.

> If PowerShell says scripts are disabled, click the small arrow next to the **+** in the terminal panel and choose **Command Prompt**, then try again.

### 5. Install dependencies (once)
In that terminal type:

```
npm install
```

Wait until it finishes. A `node_modules` folder and a `package-lock.json` file appear. This is normal.

### 6. Start the website
```
npm run dev
```
Open the address it prints (usually http://localhost:5173) in your browser. Stop it any time with `Ctrl + C`.

---

## Part 2: Make it yours

### 7. Replace the portrait
Save your photo with the background removed as **`public/assets/portrait.png`**. About 900 x 1100 px, subject standing or seated, shoulders and up, works best. Until then a grey silhouette placeholder is shown.

### 8. Add your resume
Copy your PDF to **`public/assets/resume.pdf`** (exact name). The "Download Resume" buttons switch on by themselves once the file exists. Without it they show "Resume coming soon".

### 9. Add certificates
1. Copy each file into `public/assets/certificates/`.
2. Open `src/data/certificates.ts`, copy the example in the comment, and fill in the real title, issuer, date and file path.
3. Save. The gallery builds itself. Add as many as you like.

### 10. Update links and usernames
Open `src/data/portfolioData.ts` and fill in:
- `links.github.username` (turns on the live GitHub section)
- `links.leetcode.username` (turns on the live LeetCode section)
- `links.linkedin.url`
- `email`
- `phone` and `whatsapp` (international format, for example `'+919876543210'`). These switch on the Call, WhatsApp and Save contact buttons. Only add a number you are happy to make public: anyone, including spammers, can read it.
- `education.stage` (when you move up a year)

Also check the **skill levels** in `skillGroups`. They are a best guess from your notes. Change any that are not true.

### 11. Add a new project
In `src/data/portfolioData.ts`, find `projects`, copy one project block, paste it below, and change:
`id`, `title`, `tagline`, `description`, `category`, `stack`, `github`, `live`, `status`, `features`.
Set `featured: true` for a big showcase or `false` for the small "More projects" row.
For a real screenshot put it in `public/assets/projects/` and set `image: 'assets/projects/name.png'`.
Mark a feature `built` only if it really works today.

---

## Part 3: Put it online with GitHub Pages

> **Source vs build.** The folder you upload to GitHub is the **source** (your files, without `node_modules` and `dist`; `.gitignore` already excludes them). GitHub's robot (Actions) runs `npm run build` for you and publishes the generated `dist` folder. You never upload `dist` yourself.

### 12. Create a GitHub repository
1. Sign in at https://github.com and click **New repository**.
2. Name it, for example `portfolio`. Keep it **Public**. Do **not** add a README (this project has one).
3. Click **Create repository**.

### 13. Upload the code
In the VS Code terminal, run these one at a time (replace the URL with yours):

```
git init
git add .
git commit -m "First version of my portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
```
Git may ask you to sign in. Use the browser sign-in it offers.

### 14. Turn on GitHub Pages
1. In your repository open **Settings > Pages**.
2. Under **Build and deployment > Source** choose **GitHub Actions**.

That is all. The file `.github/workflows/deploy.yml` is already in the project.

### 15. Find your website address
1. Open the **Actions** tab. Wait for "Deploy to GitHub Pages" to show a green tick (about 1 to 2 minutes).
2. Your address is `https://YOUR-USERNAME.github.io/portfolio/` (also shown in **Settings > Pages**).

If the run shows a red cross, click it and read the error. The most common cause is a typo in a data file.

### 16. Update the site later
Edit a file, then in the terminal:
```
git add .
git commit -m "Update portfolio"
git push
```
The site rebuilds and goes live automatically. To test a production build locally first: `npm run build` then `npm run preview`.

---

## How the live statistics work

- **GitHub profile** (avatar, public repositories): GitHub's official public API.
- **GitHub contribution graph**: GitHub has no public API for this, so the site reads your public contribution calendar through a free service, `github-contributions-api.jogruber.de`.
- **LeetCode**: LeetCode has no official public stats API. Two free community services are tried in turn (`leetcode-stats-api.herokuapp.com`, then `alfa-leetcode-api.onrender.com`).

All of these are requested from the visitor's browser, with an 8 to 9 second timeout, and cached in the browser for 6 hours. If every service fails, the section shows a clear message and a link to your profile. If an older saved copy exists, it is shown and labelled with its date. No token or secret is used anywhere. Because these third-party services are free, they can be slow or disappear. If one stops working, only `src/lib/github.ts` or `src/lib/leetcode.ts` needs changing.

**Honest fallback for LeetCode:** you may set `leetcodeManual` in `portfolioData.ts`. It is only shown if live data fails, and it is labelled "last updated by hand, not live".

## Accessibility and motion
- Respects "reduce motion" (no intro, no parallax, no auto-animation, nothing hidden).
- Keyboard navigation, visible focus rings, a "Skip to content" link.
- The intro plays once per browser and can be skipped.
- The custom cursor ring and tilt effects only run on desktop with a mouse.

## Project layout
```
src/
  data/        portfolioData.ts, certificates.ts   <- your content
  lib/         data fetching, caching, scroll animation helpers
  components/  reusable pieces (nav, intro, buttons, cursor, particles ...)
  sections/    one file per page section
  index.css    all styling and colors
public/assets/ portrait, resume, certificates
.github/workflows/deploy.yml   automatic deployment
```

## Useful commands
| Command | What it does |
| --- | --- |
| `npm install` | Downloads the libraries (once) |
| `npm run dev` | Starts the local preview |
| `npm run build` | Checks types and creates the production build in `dist/` |
| `npm run preview` | Serves the production build locally |
