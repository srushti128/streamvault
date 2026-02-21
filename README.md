# StreamVault v2 — Netflix-Inspired Streaming UI

## 🚀 Setup Instructions

### 1. Get OMDb API Key
- Go to https://www.omdbapi.com/apikey.aspx
- Sign up for free (1000 req/day)
- Activate via email

### 2. Add API Key
Edit `.env`:
```
VITE_OMDB_API_KEY=your_actual_key_here
```

### 3. Install & Run
```bash
npm install
npm run dev
```
Open → http://localhost:5173

## ✅ Features

### Auth
- Sign Up / Sign In with email + password
- Password show/hide toggle
- Form validation
- Stored in localStorage
- Protected routes (redirect to /auth if not logged in)
- Profile dropdown with sign out

### Navigation
- Home | TV Shows | Movies | New & Popular | My List
- Active link highlighting
- Mobile hamburger menu
- Scrolled navbar background

### Home
- Auto-sliding Hero Banner (top 5 trending)
- Horizontal scrollable movie rows
- Debounced search with grid results

### Pages
- TV Shows — 5 curated rows
- Movies — 7 genre rows
- New & Popular — new releases, awards, etc.
- My List — saved titles

### Movie Card
- SVG placeholder when no image
- Hover overlay with play + list buttons
- Smooth animations

### Movie Details
- Full details: plot, cast, director, rating, awards
- In-app video player (real streaming, no YouTube)
- Add/remove from My List
