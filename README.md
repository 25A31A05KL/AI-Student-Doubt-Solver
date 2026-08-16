# 🎓 AI Student Doubt Solver

An AI-powered web application that helps students understand academic concepts through simple, structured explanations.

## ✨ Features

- 🤖 AI-powered doubt solving
- 📚 Subject selection
- 🌐 English, Telugu and Hindi answer options
- 💡 Beginner-friendly explanations
- 💻 Programming examples
- 🌙 Dark mode
- 📋 Copy answers
- 📱 Responsive design
- 🔐 API key kept on the server using environment variables

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- Gemini API

## 📁 Project Structure

```text
AI-Student-Doubt-Solver/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd AI-Student-Doubt-Solver
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

Copy `.env.example` to `.env` and add your Gemini API key:

```env
PORT=3000
GEMINI_API_KEY=YOUR_KEY_HERE
GEMINI_MODEL=gemini-1.5-flash
```

**Never upload `.env` to GitHub.** It is already included in `.gitignore`.

### 4. Start the application

```bash
npm start
```

Open:

```text
http://localhost:3000
```

For development:

```bash
npm run dev
```

## 🌍 Deployment

This project can be deployed to services such as Render.

Build/Install command:

```bash
npm install
```

Start command:

```bash
npm start
```

Add these environment variables in the deployment dashboard:

```text
GEMINI_API_KEY
GEMINI_MODEL
PORT
```

## 🔑 API Key Safety

The Gemini API key is used only by the Node.js backend. Do not place the key inside `public/script.js` or any frontend file.

## 🎯 Future Improvements

- Student login and profiles
- MongoDB doubt history
- Bookmark answers
- Voice input
- PDF/image doubt support
- Admin dashboard
- Quiz generation from a doubt
- Progress analytics

## 📄 License

MIT License
