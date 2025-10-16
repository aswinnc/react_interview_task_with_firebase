# React Interview Task - Scaffold (with Firebase Google Login support)

This repository is a ready scaffold implementing the interview task features:
- Fake REST API using **json-server** (server/db.json).
- Products & categories with `stock` field.
- Frontend built with **Vite + React** (simple components).
- Dynamic search, sorting and category filter.
- Products with `stock = 0` cannot be added to cart or wishlist.
- Simple cart, wishlist, order flow and a demo login. Orders are saved to `localStorage` with status `On Process`.
- Firebase Google Login integration helpers included (you must paste your firebase config into `src/firebase.js`).

## How to run

1. Install dependencies:
```bash
npm install
```

2. Start json-server (on port 4000) and frontend:
```bash
npm run json-server
# in another terminal:
npm run dev
```
Or use both with concurrently:
```bash
npm run start:all
```

3. Open app at `http://localhost:5173` (Vite default).

## Firebase Google Login (optional — real auth)

To enable real Google sign-in in the app:

1. Create a Firebase project at https://console.firebase.google.com/
2. In **Authentication → Sign-in method**, enable **Google**.
3. In **Project settings → General**, under "Your apps" add a Web app (if not already) and copy the config.
4. Replace the `firebaseConfig` object in `src/firebase.js` with the values from the Firebase console.
5. Add `http://localhost:5173` to **Authorized domains** in Authentication → Settings.
6. Install Firebase dependency (already added to package.json):
   ```bash
   npm install
   ```
7. Start the app:
   ```bash
   npm run json-server
   npm run dev
   ```
8. Click **Sign in with Google** on the Login page. After signing in you'll be taken to the Dashboard with your Firebase user info.

Notes:
- If you deploy the frontend, add your deployed URL to Firebase authorized domains.
- The demo login still works for offline/demo use.

## Files included
- `package.json` - scripts to run vite and json-server
- `index.html`, `src/` - React app
- `src/firebase.js` - Firebase helper (paste your config)
- `server/db.json` - fake API with products & categories
- `README.md` - this file

