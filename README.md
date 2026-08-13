# AI Student Doubt Solver 🎓

A modern student doubt-solving web application with subject selection, Telugu/English support, answer history, and a clean responsive UI.

## Features
- Ask questions by subject
- Telugu / English interface
- AI-ready backend endpoint
- Demo mode works without an API key
- Recent doubt history
- Responsive student-friendly UI
- Express.js backend
- Easy deployment to Render

## Tech Stack
- HTML, CSS, JavaScript
- Node.js
- Express.js

## Run locally

```bash
npm install
npm start
```

Open: http://localhost:3000

## Optional AI API
The project works in demo mode by default. To connect an AI provider, set environment variables in `.env` and implement the provider call in `server.js`.

## GitHub
```bash
git init
git add .
git commit -m "Initial commit - AI Student Doubt Solver"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Deployment
For Render:
- Build Command: `npm install`
- Start Command: `npm start`
- Environment: Node
