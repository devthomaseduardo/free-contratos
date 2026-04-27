# paper‑contracts

**paper‑contracts** – A premium, open‑source contract generator built with React (Vite) and Express. It creates beautiful, multi‑page PDFs with automatic watermarks for draft, review, final, and paid phases, integrates ViaCEP address lookup, a native date picker, and AI‑assisted clause generation via Gemini.

---

## ✨ Features

- **Premium UI** – Modern dark theme, glassmorphism headers, smooth micro‑animations.
- **Sectioned workflow** – Identification & branding, scope & items, financial & dates, legal clauses & AI, colors & identity, digital signature.
- **Automatic status stamps** – Draft, Review, Final, Paid watermarks appear in the exported PDF.
- **ViaCEP integration** – Auto‑fill address from Brazilian ZIP code.
- **Native calendar** – Quick date shortcuts (Today, +7d, +15d, +30d, +60d).
- **AI‑assisted improvements** – Service description refinement & legal clause generation using Gemini.
- **One‑command dev** – `npm run dev` launches frontend and backend concurrently.
- **Export to PDF** – Clean pagination with horizontal‑band CV layout.

---

## 📦 Installation & Development

```bash
# Clone the repository
git clone https://github.com/devthomas/paper-contracts.git
cd paper-contracts

# Install dependencies for both workspaces
npm install

# Start backend and frontend together
npm run dev
```

The app will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000`

---

## 🔧 Configuration

Create a `.env` file inside the `backend` folder with your Gemini API key:
```
GEMINI_API_KEY=AIzaSyAweOosr__r23hFxxh99PC6ve18DSS4IWs
```

You can also change the default accent colour in the UI via the **Cores & Identidade** section.

---

## 📂 Project Structure

```
paper-contracts/
├─ frontend/          # Vite + React UI
│   └─ src/
│       ├─ components/   # ContractForm, ContractPreview, etc.
│       └─ App.jsx
├─ backend/           # Express server (AI & CEP endpoints)
│   └─ src/
│       └─ config.js
└─ README.md          # (this file)
```

---

## 🛠️ Building for Production

```bash
npm run build   # Builds both frontend and backend
```

The compiled frontend will be placed in `frontend/dist` and can be served statically by the backend.

---

## 📄 License

MIT – Feel free to fork, modify, and publish your own version.
