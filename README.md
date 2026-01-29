# Make It Art

> **Marketplace d'art digital immersive — Univers cyberpunk 3D**

![Version](https://img.shields.io/badge/version-2.0--dev-purple)
![Nuxt](https://img.shields.io/badge/Nuxt-4.x-00DC82)
![Express](https://img.shields.io/badge/Express-4.x-000000)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## Le Projet

Plateforme de vente d'art digital avec une expérience 3D immersive. Les artistes exposent et vendent leurs oeuvres, les collectionneurs découvrent et achètent dans un environnement cyberpunk unique.

**Équipe** : Ethan, Iness, Théa, Mimi

---

## Stack Technique

| Couche | Technologie |
|--------|-------------|
| **Frontend** | Nuxt 4, Vue 3, Three.js, TypeScript |
| **Backend** | Node.js 20, Express.js, Prisma |
| **Base de données** | PostgreSQL 16, Redis |
| **Infra** | Docker, Nginx, VPS Linux |
| **CI/CD** | GitHub Actions |

---

## Installation

1. Cloner le projet depuis GitHub
2. Lancer avec Docker Compose (recommandé) ou manuellement avec npm install && npm run dev

**Accès** : http://localhost:3000 (frontend) | http://localhost:4000 (API)

---

## Structure

| Dossier | Description |
|---------|-------------|
| **frontend/** | Application Nuxt.js (Vue 3 + Three.js) |
| **backend/** | API Express.js avec Prisma |
| **infrastructure/** | Docker, Nginx, scripts de déploiement |
| **.github/workflows/** | Pipelines CI/CD |

---

## Roadmap

| Phase | Contenu |
|-------|---------|
| **1. Fondations** | Infra Docker, BDD PostgreSQL, API Express |
| **2. Auth** | OAuth2 (Google/GitHub), JWT, 2FA TOTP |
| **3. Core** | CRUD Artworks, Profils artistes, Favoris |
| **4. E-Commerce** | Panier, Stripe, Téléchargements |
| **5. Finalisation** | RGPD, Tests, Monitoring, Go-live |

---

## Documentation

| Document | Description |
|----------|-------------|
| [CAHIER_DES_CHARGES.md](./CAHIER_DES_CHARGES.md) | Architecture, BDD, Auth, Infra, RGPD — **Document complet** |
| [ROADMAP_TRELLO.md](./ROADMAP_TRELLO.md) | Tâches détaillées avec assignations |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Guidelines de contribution |

---

## Commandes

- **Dev frontend** : npm run dev (port 3000)
- **Build production** : npm run build
- **Linter** : npm run lint

---

## Équipe & Workflow

- **Branches** : `main` (prod) <- `develop` <- `feature/*`
- **Commits** : Conventional Commits (`feat:`, `fix:`, `docs:`)
- **Reviews** : PR obligatoire, 1 approval minimum
- **Sprints** : 2 semaines

---

<div align="center">

**Where art meets the future**

[Cahier des charges](./CAHIER_DES_CHARGES.md) | [Roadmap](./ROADMAP_TRELLO.md) | [Discord](https://discord.gg/37T53Q6FSU)

</div>
