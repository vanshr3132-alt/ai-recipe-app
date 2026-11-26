# AI Recipe Generator 🍳

A React application that generates recipes using Google's Gemini API based on ingredients entered by the user.

## Features

- Add ingredients dynamically
- AI-generated recipes using Gemini API
- React state management
- Loading state
- Error handling
- Markdown formatted recipe output

## Tech Stack

- React
- JavaScript
- Vite
- Gemini API
- CSS

## Live Demo
https://ai-recipe-app-chi.vercel.app

## Installation

```bash
npm install
npm run dev
```
## Environment Variables

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/).
2. In the project root (next to `package.json`), create a file named `.env`:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

3. Restart the dev server (`npm run dev`) so the key is picked up.

`.env` is listed in `.gitignore`, so your key is never committed.

> **Note:** Vite exposes variables that start with `VITE_` to the browser, so the key is visible in the frontend bundle. This is fine for a learning project. For production, call the Gemini API from a small backend instead.

## Author

Vansh Rana
