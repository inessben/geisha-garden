# ⚙️ Backend - Geisha Garden

> API Express.js avec MongoDB.

## 🛠️ Technologies

- **Express.js** + MongoDB + Mongoose
- **CORS** + JWT + bcrypt
- **Nodemon** pour le développement

## 🚀 Installation

```bash
cd backend
npm install
cp .env.example .env
# Éditer .env avec vos paramètres
npm run dev
# → http://localhost:4000
```

## 💻 Scripts

- `npm run dev` - Développement avec nodemon
- `npm start` - Production

## 📁 Structure

```
backend/
├── src/
│   ├── routes/      # Routes API
│   ├── models/      # Modèles MongoDB
│   ├── controllers/ # Logique métier
│   └── middleware/  # Middlewares
├── index.js         # Point d'entrée
└── .env.example     # Configuration
```

## 🔌 API Routes

- `GET /api` - Statut API
- `GET /api/health` - Health check
- `GET /*` - Sert le frontend

---

[← Retour au README principal](../README.md)
