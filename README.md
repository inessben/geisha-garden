# 🌸 Geisha Garden

> **Marketplace d'art digital immersive — Univers cyberpunk 3D**

![Version](https://img.shields.io/badge/version-2.0--dev-purple)
![Nuxt](https://img.shields.io/badge/Nuxt-4.x-00DC82)
![Express](https://img.shields.io/badge/Express-4.x-000000)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🎯 Le Projet

Plateforme de vente d'art digital avec une expérience 3D immersive. Les artistes exposent et vendent leurs œuvres, les collectionneurs découvrent et achètent dans un environnement cyberpunk unique.

**Équipe** : Ethan, Iness, Théa, Mimi

---

## 🛠️ Stack Technique

| Couche | Technologie |
|--------|-------------|
| **Frontend** | Nuxt 4, Vue 3, Three.js, TypeScript |
| **Backend** | Node.js 20, Express.js |
| **Base de données** | PostgreSQL 16, Redis |
| **Infra** | Docker, Nginx, VPS Linux |
| **CI/CD** | GitHub Actions |

---

## 📦 Installation

```bash
# Cloner le projet
git clone https://github.com/inessben/geisha-garden-mvp.git
cd geisha-garden-mvp

# Lancer avec Docker (recommandé)
docker-compose up -d

# OU manuellement (frontend seul)
npm install && npm run dev
```

**Accès** : http://localhost:3000 (frontend) • http://localhost:4000 (API)

---

## 📁 Structure

```
geisha-garden/
├── frontend/              # Nuxt.js (Vue 3 + Three.js)
├── backend/               # Express.js - Architecture MVC
│   ├── src/
│   │   ├── models/        # M - Modèles Sequelize (BDD)
│   │   ├── views/         # V - Templates emails
│   │   ├── controllers/   # C - Logique métier
│   │   ├── routes/        # Endpoints API
│   │   └── middlewares/   # Auth, validation, errors
│   └── ...
├── infrastructure/        # Docker, Nginx, scripts
└── .github/workflows/     # CI/CD
```

---

## 📅 Roadmap

| Phase | Contenu | Durée |
|-------|---------|-------|
| **1. Fondations** | Infra Docker, BDD PostgreSQL, API Express | 3-4 sem |
| **2. Auth** | OAuth2 (Google/GitHub), JWT, 2FA TOTP | 2-3 sem |
| **3. Core** | CRUD Artworks, Profils artistes, Favoris | 4-5 sem |
| **4. E-Commerce** | Panier, Stripe, Téléchargements | 3-4 sem |
| **5. Finalisation** | RGPD, Tests, Monitoring, Go-live | 2-3 sem |

**Estimation totale** : ~3.5 mois (4 devs)

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [CAHIER_DES_CHARGES.md](./CAHIER_DES_CHARGES.md) | Architecture, BDD, Auth, Infra, RGPD — **Document complet** |
| [ROADMAP_TRELLO.md](./ROADMAP_TRELLO.md) | 166 tâches détaillées avec assignations |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Guidelines de contribution |

---

## 🚀 Commandes

```bash
npm run dev       # Dev frontend (port 3000)
npm run build     # Build production
npm run lint      # Linter
```

---

## 👥 Équipe & Workflow

- **Branches** : `main` (prod) ← `develop` ← `feature/*`
- **Commits** : Conventional Commits (`feat:`, `fix:`, `docs:`)
- **Reviews** : PR obligatoire, 1 approval minimum
- **Sprints** : 2 semaines

---

<div align="center">

**🌸 Where art meets the future 💜**

[Cahier des charges](./CAHIER_DES_CHARGES.md) • [Roadmap](./ROADMAP_TRELLO.md) • [Discord](https://discord.gg/37T53Q6FSU)

</div>
