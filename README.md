# 🌸 Geisha Garden

> Marketplace interactive moderne avec React et Express.

## 🎯 Vue d'ensemble

- **Frontend** : React + TypeScript + Vite + Tailwind CSS
- **Backend** : Express.js + MongoDB
- **Architecture** : Monorepo unifié sur `localhost:4000`

## 🛠️ Technologies

- **React 18** + TypeScript + Vite
- **Express.js** + MongoDB + Mongoose
- **Tailwind CSS**

## 🚀 Installation

**Prérequis** : Node.js ≥ 18, MongoDB

```bash
# Cloner et installer
git clone https://github.com/inessben/geisha-garden.git
cd geisha-garden
npm run install:all

# Configuration
cp backend/.env.example backend/.env
# Éditer backend/.env avec vos paramètres

# Démarrer
npm run dev
# → http://localhost:4000
```

## 💻 Scripts

- `npm run dev` - Mode unifié (recommandé)
- `npm run dev:watch` - Frontend hot reload
- `npm run dev:frontend` - Frontend seul
- `npm run dev:backend` - Backend seul

## 📁 Structure

```
geisha-garden/
├── frontend/     # React + TypeScript + Vite
├── backend/      # Express.js + MongoDB
└── shared/       # Code partagé
```

---

**Licence** : ISC © [inessben](https://github.com/inessben)
---