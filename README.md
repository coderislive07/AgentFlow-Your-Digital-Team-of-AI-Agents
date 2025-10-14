# AgentFlow — Your Digital Team of AI Agents

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js&style=for-the-badge)](https://nextjs.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)
[![Built with ❤️](https://img.shields.io/badge/built%20with-%E2%9D%A4%EF%B8%8F-red?style=for-the-badge)](https://github.com)

A beautiful demo of a multi-agent orchestration front-end built with Next.js and Tailwind-like utilities — AgentFlow lets you present an elegant visualization of cooperating AI agents (Planner, Researcher, Developer, Tester, Reporter, Memory, Orchestrator) and a modern landing experience.

---

## 🎨 Hero Preview

![AgentFlow Hero](/public/Community/hero-screenshot.png "AgentFlow Hero")

> If `/public/Community/hero-screenshot.png` is not present, replace this with your preferred screenshot or host one and update the path.

---

## 🚀 Quickstart

Clone the repo and run locally:

```bash
git clone https://github.com/coderislive07/AgentFlow-Your-Digital-Team-of-AI-Agents.git
cd AgentFlow-Your-Digital-Team-of-AI-Agents/myagentflow
npm install
npm run dev
```

Open http://localhost:3000 to view the app.

Notes:
- The project uses the Next.js App Router and modern React (client components where necessary).
- Tailwind-like utility classes are used in many components; ensure PostCSS is installed via the project dependencies.

---

## ✨ Features

- Interactive SVG visualization of multiple agents following an animated path.
- Clean landing page with hero, community section, and workers showcase components.
- Small, focused React components in `src/components` for quick iteration.
- Accessible and responsive layout (desktop and mobile friendly).

---

## 📂 Project Structure (high level)

- `src/app` — app routes and page composition
- `src/components` — React components (Hero, Navbar, Footer, Landing sections)
- `public` — static assets (fonts, images)
- `next.config.mjs`, `package.json` — project config

---

## 🛠 Development notes

- Build: `npm run build`
- Dev server: `npm run dev`
- Lint: `npm run lint` (Next.js includes ESLint rules by default)

Tip: Long inline `className` strings in JSX must not include raw newlines; use template literals or helper functions (clsx/twMerge) for readability.

---

## 🧪 How the Hero component works (brief)

The hero visualization (`src/components/home/Hero.jsx`) computes points along an SVG path and renders animated glowing nodes for each agent. If you see a "Module parse failed: Unterminated string constant" error during build, check for unescaped newlines inside JSX attribute strings (commonly `className`).

---

## 🤝 Contributing

Contributions are welcome! A simple workflow:

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes and run the dev server
4. Open a pull request with a short description of your changes

Please adhere to existing code styles and run the linter before opening a PR.

---

## 📜 License

This project is available under the MIT License. See `LICENSE` for details.

---

If you'd like, I can:
- Generate a polished hero screenshot and add it to `/public/Community/hero-screenshot.png`.
- Add badges for CI, coverage, or package status.
- Add a short CONTRIBUTING.md and CODE_OF_CONDUCT.md.

Enjoy building with AgentFlow! 🚀
