# 🗂️ ROADMAP MAKE IT ART - Export Trello

> **Version 2.0** — Janvier 2026

<div align="center">

🌃 **Make It Art** — *Where Art Meets the Future* 💜

</div>

---

## 📥 INSTRUCTIONS D'IMPORT TRELLO

1. Créer un board **"Make It Art MVP"**
2. Créer les listes :
   - `📋 Backlog`
   - `🎯 Sprint X - To Do`
   - `🚧 In Progress`
   - `👀 Code Review`
   - `🧪 Testing`
   - `✅ Done`
3. Copier chaque tâche ci-dessous comme une carte
4. Ajouter les labels selon la légende
5. Configurer les Power-Ups : Calendar, GitHub, Slack

---

## 🏷️ LÉGENDE DES LABELS

| Label | Couleur | Description |
|-------|---------|-------------|
| `Backend` | 🟢 Vert | API Express, logique serveur |
| `Frontend` | 🔵 Bleu | Nuxt/Vue, composants UI |
| `3D` | 🟣 Violet | Three.js, expérience immersive |
| `DevOps` | ⚪ Gris | Infrastructure, CI/CD, Docker |
| `Database` | 🟡 Jaune | PostgreSQL, migrations, Redis |
| `Auth` | 🔴 Rouge | Authentification, sécurité |
| `E-Commerce` | 🩷 Rose | Panier, paiement, commandes |
| `RGPD` | ⚫ Noir | Conformité légale |
| `P0 - Critique` | 🟠 Orange | Bloquant pour le MVP |
| `P1 - Important` | 🔵 Bleu clair | Nécessaire mais non bloquant |
| `P2 - Nice to have` | 🟢 Vert clair | Optionnel pour le MVP |

---

## 📊 VUE D'ENSEMBLE

```
┌─────────────────────────────────────────────────────────────────┐
│                    PLANNING GLOBAL MVP                           │
└─────────────────────────────────────────────────────────────────┘

Phase 1 ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Fondations
Phase 2 ░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░  Authentification
Phase 3 ░░░░░░░░░░░░░░░░████████████░░░░░░░░░░░░  Core Features
Phase 4 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████░░░░  E-Commerce
Phase 5 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████  Finalisation
        ─────────────────────────────────────────
        S1   S2   S3   S4   S5   S6   S7   S8   S9   S10  S11  S12
```

| Phase | Sprint | Focus | Tâches |
|-------|--------|-------|--------|
| 1 | 1-2 | Infrastructure + BDD | 35 |
| 2 | 3-4 | Auth complète | 31 |
| 3 | 5-7 | Artworks + 3D + Dashboard | 55 |
| 4 | 8-10 | E-Commerce complet | 28 |
| 5 | 11-12 | RGPD + Tests + Launch | 31 |
| **Total** | **12** | | **180** |

---

## 📅 PHASE 1 : FONDATIONS (Sprint 1-2)

### 🏗️ INFRASTRUCTURE (DevOps)

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 1.01 | **Setup repository GitHub** - Monorepo /frontend, /backend, /infrastructure | `DevOps` | 2h | Ethan | P0 |
| 1.02 | **Configurer branches protégées** - main, develop, règles PR | `DevOps` | 1h | Ethan | P0 |
| 1.03 | **Docker Compose dev** - PostgreSQL, Redis, Backend, Frontend, Adminer | `DevOps` | 4h | Ethan | P0 |
| 1.04 | **Dockerfiles optimisés** - Multi-stage builds Node 20 | `DevOps` | 3h | Mimi | P0 |
| 1.05 | **Provisionner VPS** - Scaleway/Hetzner, Ubuntu 22.04 | `DevOps` | 1h | Ethan | P0 |
| 1.06 | **Sécuriser VPS** - UFW, Fail2Ban, SSH hardening | `DevOps` | 4h | Mimi | P0 |
| 1.07 | **Installer Docker VPS** - Engine + Compose plugin | `DevOps` | 1h | Ethan | P0 |
| 1.08 | **Config Nginx production** - Reverse proxy, SSL Let's Encrypt | `DevOps` | 3h | Mimi | P0 |
| 1.09 | **CI Pipeline** - GitHub Actions : lint + tests | `DevOps` | 4h | Ethan | P0 |
| 1.10 | **CD Pipeline** - Deploy auto sur merge main | `DevOps` | 4h | Mimi | P1 |

### 🗄️ BASE DE DONNÉES

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 1.11 | **Installer PostgreSQL 16** - Config dev + prod | `Database` `DevOps` | 2h | Iness | P0 |
| 1.12 | **Schéma users + artists** - Tables, relations, contraintes | `Database` | 4h | Iness | P0 |
| 1.13 | **Schéma artworks** - artworks, collections, categories | `Database` | 3h | Iness | P0 |
| 1.14 | **Schéma e-commerce** - orders, order_items, reviews | `Database` | 3h | Iness | P1 |
| 1.15 | **Schéma auth** - refresh_tokens, audit_logs, consent | `Database` | 2h | Iness | P0 |
| 1.16 | **Index optimisation** - B-tree, GIN, pg_trgm | `Database` | 2h | Iness | P1 |
| 1.17 | **Triggers automatiques** - updated_at, stats, order_number | `Database` | 2h | Iness | P1 |
| 1.18 | **Setup ORM Prisma** - Schema, migrations, types | `Database` `Backend` | 3h | Iness | P0 |
| 1.19 | **Seeders données test** - Users, artworks, categories | `Database` | 3h | Iness | P1 |

### ⚙️ BACKEND - STRUCTURE

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 1.20 | **Init Express + TypeScript** - Structure MVC, config | `Backend` | 2h | Iness | P0 |
| 1.21 | **ESLint + Prettier** - Config équipe, scripts | `Backend` | 1h | Iness | P0 |
| 1.22 | **Variables environnement** - dotenv, validation Zod | `Backend` | 1h | Iness | P0 |
| 1.23 | **Error handler global** - Format erreurs API cohérent | `Backend` | 2h | Iness | P0 |
| 1.24 | **Logging structuré** - Morgan + Winston | `Backend` | 2h | Iness | P1 |
| 1.25 | **Route health check** - GET /api/v1/health | `Backend` | 1h | Iness | P0 |
| 1.26 | **Setup Jest** - Tests unitaires + intégration | `Backend` | 2h | Iness | P1 |
| 1.27 | **Connexion PostgreSQL** - Pool, Prisma client | `Backend` | 2h | Iness | P0 |
| 1.28 | **Connexion Redis** - Sessions, cache | `Backend` | 1h | Iness | P1 |

### 🎨 FRONTEND - SETUP

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 1.29 | **Composable useApi** - Fetch wrapper, interceptors | `Frontend` | 3h | Théa | P0 |
| 1.30 | **Gestion erreurs API** - Toast, error boundaries | `Frontend` | 2h | Théa | P0 |
| 1.31 | **Variables env Nuxt** - API URL, runtime config | `Frontend` | 1h | Théa | P0 |
| 1.32 | **Test connexion API** - Verify health check | `Frontend` `Backend` | 1h | Théa | P0 |
| 1.33 | **Design System base** - Couleurs, typo, spacing | `Frontend` | 3h | Théa | P0 |
| 1.34 | **Composants UI base** - Button, Input, Modal, Card | `Frontend` | 4h | Théa | P0 |
| 1.35 | **Layout principal** - Navbar, Footer, structure | `Frontend` | 3h | Théa | P0 |

---

## 📅 PHASE 2 : AUTHENTIFICATION (Sprint 3-4)

### 🔐 AUTH EMAIL/PASSWORD

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 2.01 | **POST /auth/register** - Validation, hash bcrypt | `Backend` `Auth` | 4h | Iness | P0 |
| 2.02 | **POST /auth/login** - Vérification, JWT generation | `Backend` `Auth` | 4h | Iness | P0 |
| 2.03 | **POST /auth/logout** - Révocation refresh token | `Backend` `Auth` | 2h | Iness | P0 |
| 2.04 | **POST /auth/refresh** - Token rotation | `Backend` `Auth` | 3h | Iness | P0 |
| 2.05 | **Middleware authRequired** - JWT verification | `Backend` `Auth` | 3h | Iness | P0 |
| 2.06 | **Rate limiting auth** - 5 tentatives/heure | `Backend` `Auth` | 2h | Iness | P0 |
| 2.07 | **Tests auth** - Register, login, refresh, logout | `Backend` `Auth` | 4h | Iness | P1 |

### 🔗 AUTH OAUTH2

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 2.08 | **Config Google OAuth** - Google Cloud credentials | `Auth` `DevOps` | 1h | Iness | P0 |
| 2.09 | **Config GitHub OAuth** - OAuth App credentials | `Auth` `DevOps` | 1h | Iness | P0 |
| 2.10 | **GET /auth/google** - Redirect consent | `Backend` `Auth` | 2h | Iness | P0 |
| 2.11 | **GET /auth/google/callback** - Process + JWT | `Backend` `Auth` | 4h | Iness | P0 |
| 2.12 | **GET /auth/github** - Redirect consent | `Backend` `Auth` | 2h | Iness | P0 |
| 2.13 | **GET /auth/github/callback** - Process + JWT | `Backend` `Auth` | 4h | Iness | P0 |
| 2.14 | **Lier OAuth à compte existant** - Merge accounts | `Backend` `Auth` | 3h | Iness | P1 |
| 2.15 | **Tests OAuth** - Mocks providers | `Backend` `Auth` | 3h | Iness | P1 |

### 🔑 AUTH 2FA TOTP

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 2.16 | **POST /auth/2fa/setup** - Générer secret + QR | `Backend` `Auth` | 3h | Iness | P1 |
| 2.17 | **POST /auth/2fa/verify** - Activer 2FA | `Backend` `Auth` | 2h | Iness | P1 |
| 2.18 | **POST /auth/2fa/disable** - Désactiver 2FA | `Backend` `Auth` | 2h | Iness | P1 |
| 2.19 | **Backup codes** - 10 codes hashés | `Backend` `Auth` | 2h | Iness | P1 |
| 2.20 | **Login avec 2FA** - requires_2fa flag | `Backend` `Auth` | 2h | Iness | P1 |
| 2.21 | **POST /auth/2fa/validate** - Valider code TOTP | `Backend` `Auth` | 2h | Iness | P1 |

### 🖥️ FRONTEND AUTH

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 2.22 | **Composable useAuth** - State, login, logout | `Frontend` `Auth` | 4h | Théa | P0 |
| 2.23 | **Middleware auth Nuxt** - Route protection | `Frontend` `Auth` | 2h | Théa | P0 |
| 2.24 | **Page Login** - Form + boutons OAuth | `Frontend` `Auth` | 3h | Théa | P0 |
| 2.25 | **Page Signup** - Formulaire inscription | `Frontend` `Auth` | 3h | Théa | P0 |
| 2.26 | **Flux OAuth frontend** - Redirect, callback | `Frontend` `Auth` | 3h | Théa | P0 |
| 2.27 | **Page 2FA Setup** - QR code display | `Frontend` `Auth` | 3h | Théa | P1 |
| 2.28 | **Modal 2FA Login** - Code input | `Frontend` `Auth` | 2h | Théa | P1 |
| 2.29 | **Backup codes display** - Modal sauvegarde | `Frontend` `Auth` | 2h | Théa | P1 |
| 2.30 | **Token refresh auto** - Interceptor | `Frontend` `Auth` | 3h | Théa | P0 |

---

## 📅 PHASE 3 : CORE FEATURES (Sprint 5-7)

### 🎨 ARTWORKS BACKEND

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 3.01 | **GET /artworks** - Liste paginée, filtres | `Backend` | 4h | Iness | P0 |
| 3.02 | **GET /artworks/:id** - Détails + artiste | `Backend` | 2h | Iness | P0 |
| 3.03 | **POST /artworks** - Création (artiste only) | `Backend` | 3h | Iness | P0 |
| 3.04 | **PUT /artworks/:id** - Modification | `Backend` | 2h | Iness | P0 |
| 3.05 | **DELETE /artworks/:id** - Suppression | `Backend` | 2h | Iness | P0 |
| 3.06 | **Filtres avancés** - Catégorie, prix, tags | `Backend` | 3h | Iness | P0 |
| 3.07 | **Recherche full-text** - pg_trgm search | `Backend` | 3h | Iness | P1 |
| 3.08 | **Tri artworks** - Date, prix, popularité | `Backend` | 2h | Iness | P0 |
| 3.09 | **Upload images S3** - Resize, thumbnails | `Backend` | 6h | Iness | P0 |
| 3.10 | **Validation fichiers** - Types, taille, dimensions | `Backend` | 2h | Iness | P0 |

### 👨‍🎨 ARTISTES BACKEND

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 3.11 | **GET /artists** - Liste paginée | `Backend` | 2h | Iness | P0 |
| 3.12 | **GET /artists/:id** - Profil complet | `Backend` | 2h | Iness | P0 |
| 3.13 | **POST /artists** - Devenir artiste | `Backend` | 3h | Iness | P0 |
| 3.14 | **PUT /artists/:id** - Modifier profil | `Backend` | 2h | Iness | P0 |
| 3.15 | **GET /artists/:id/artworks** - Œuvres artiste | `Backend` | 2h | Iness | P0 |
| 3.16 | **POST /artists/:id/follow** - Suivre | `Backend` | 2h | Iness | P1 |
| 3.17 | **DELETE /artists/:id/follow** - Ne plus suivre | `Backend` | 1h | Iness | P1 |
| 3.18 | **Stats artiste** - Ventes, revenus, followers | `Backend` | 3h | Iness | P1 |

### ❤️ FAVORIS & COLLECTIONS

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 3.19 | **POST /artworks/:id/favorite** - Ajouter favori | `Backend` | 2h | Iness | P0 |
| 3.20 | **DELETE /artworks/:id/favorite** - Retirer | `Backend` | 1h | Iness | P0 |
| 3.21 | **GET /users/me/favorites** - Liste favoris | `Backend` | 2h | Iness | P0 |
| 3.22 | **CRUD /collections** - Gestion collections | `Backend` | 4h | Iness | P1 |
| 3.23 | **Artworks in collections** - Add/remove | `Backend` | 3h | Iness | P1 |

### 🌌 EXPÉRIENCE 3D

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 3.24 | **Setup Three.js** - Scene, renderer, camera | `3D` `Frontend` | 4h | Théa | P0 |
| 3.25 | **Skybox cyberpunk** - Environment HDR | `3D` `Frontend` | 3h | Théa | P0 |
| 3.26 | **Système d'éclairage** - Néons, ambiance | `3D` `Frontend` | 4h | Théa | P0 |
| 3.27 | **ArtworkFrame 3D** - Cadres flottants | `3D` `Frontend` | 4h | Théa | P0 |
| 3.28 | **Navigation OrbitControls** - Desktop + mobile | `3D` `Frontend` | 3h | Théa | P0 |
| 3.29 | **Raycasting sélection** - Clic sur œuvres | `3D` `Frontend` | 3h | Théa | P0 |
| 3.30 | **Chargement lazy œuvres** - Performance | `3D` `Frontend` | 4h | Théa | P0 |
| 3.31 | **Effets particules** - Ambiance cyberpunk | `3D` `Frontend` | 3h | Théa | P1 |
| 3.32 | **Transitions caméra** - Smooth animations | `3D` `Frontend` | 3h | Théa | P1 |
| 3.33 | **Mode fallback 2D** - Grid classique | `3D` `Frontend` | 3h | Théa | P0 |
| 3.34 | **Optimisation LOD** - Performance mobile | `3D` `Frontend` | 4h | Théa | P1 |

### 🖥️ FRONTEND ARTWORKS

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 3.35 | **Page Galerie 3D** - Container Three.js | `Frontend` `3D` | 6h | Théa | P0 |
| 3.36 | **Composant ArtworkCard** - 2D fallback | `Frontend` | 3h | Mimi | P0 |
| 3.37 | **Page Artwork Detail** - Full info, achat | `Frontend` | 4h | Mimi | P0 |
| 3.38 | **Composant FilterBar** - Catégories, prix | `Frontend` | 4h | Mimi | P0 |
| 3.39 | **Pagination/Infinite scroll** - Loading | `Frontend` | 3h | Mimi | P0 |
| 3.40 | **Bouton Favori** - Toggle animé | `Frontend` | 2h | Mimi | P0 |

### 🖥️ FRONTEND ARTISTES

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 3.41 | **Page Profil Artiste** - Header, stats | `Frontend` | 6h | Mimi | P0 |
| 3.42 | **Onglet Artworks** - Grille artiste | `Frontend` | 3h | Mimi | P0 |
| 3.43 | **Onglet About** - Bio, skills | `Frontend` | 3h | Mimi | P1 |
| 3.44 | **Bouton Follow** - Toggle compteur | `Frontend` | 2h | Mimi | P1 |
| 3.45 | **Page Become Artist** - Form inscription | `Frontend` | 4h | Mimi | P0 |

### 🖥️ FRONTEND DASHBOARD

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 3.46 | **Page Dashboard** - Layout tabs | `Frontend` | 4h | Mimi | P0 |
| 3.47 | **Tab Profil** - Édition infos | `Frontend` | 3h | Mimi | P0 |
| 3.48 | **Tab Favoris** - Liste favoris | `Frontend` | 2h | Mimi | P0 |
| 3.49 | **Tab Collections** - Gestion collections | `Frontend` | 4h | Mimi | P1 |
| 3.50 | **Tab Paramètres** - Sécurité, 2FA | `Frontend` | 3h | Mimi | P0 |
| 3.51 | **Tab Mes Œuvres** - Artiste only | `Frontend` | 4h | Mimi | P0 |
| 3.52 | **Tab Statistiques** - Analytics artiste | `Frontend` | 4h | Mimi | P1 |

---

## 📅 PHASE 4 : E-COMMERCE (Sprint 8-10)

### 🛒 PANIER

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 4.01 | **GET /cart** - Récupérer panier | `Backend` `E-Commerce` | 2h | Iness | P0 |
| 4.02 | **POST /cart/items** - Ajouter item | `Backend` `E-Commerce` | 2h | Iness | P0 |
| 4.03 | **DELETE /cart/items/:id** - Retirer item | `Backend` `E-Commerce` | 1h | Iness | P0 |
| 4.04 | **DELETE /cart** - Vider panier | `Backend` `E-Commerce` | 1h | Iness | P0 |
| 4.05 | **Calcul totaux** - Subtotal, taxes | `Backend` `E-Commerce` | 2h | Iness | P0 |
| 4.06 | **Vérification disponibilité** - Stock check | `Backend` `E-Commerce` | 2h | Iness | P0 |

### 💳 CHECKOUT & PAIEMENT

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 4.07 | **Config Stripe** - Account, keys, webhooks | `E-Commerce` `DevOps` | 2h | Ethan | P0 |
| 4.08 | **POST /orders/checkout** - Create order + Stripe session | `Backend` `E-Commerce` | 6h | Iness | P0 |
| 4.09 | **Webhook Stripe** - Payment events handler | `Backend` `E-Commerce` | 4h | Iness | P0 |
| 4.10 | **Order status updates** - pending → completed | `Backend` `E-Commerce` | 2h | Iness | P0 |
| 4.11 | **Génération liens download** - Signed URLs | `Backend` `E-Commerce` | 3h | Iness | P0 |
| 4.12 | **Email confirmation** - Template + envoi | `Backend` `E-Commerce` | 4h | Iness | P0 |
| 4.13 | **Certificat authenticité** - PDF generation | `Backend` `E-Commerce` | 4h | Iness | P1 |
| 4.14 | **GET /orders/:id** - Order details | `Backend` `E-Commerce` | 2h | Iness | P0 |
| 4.15 | **GET /orders/:id/download/:itemId** - File download | `Backend` `E-Commerce` | 3h | Iness | P0 |

### 🖥️ FRONTEND E-COMMERCE

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 4.16 | **Composable useCart** - State, actions | `Frontend` `E-Commerce` | 3h | Mimi | P0 |
| 4.17 | **Page Cart** - Liste items, totaux | `Frontend` `E-Commerce` | 4h | Mimi | P0 |
| 4.18 | **Composant CartItem** - Item row | `Frontend` `E-Commerce` | 2h | Mimi | P0 |
| 4.19 | **Badge panier navbar** - Counter | `Frontend` `E-Commerce` | 1h | Mimi | P0 |
| 4.20 | **Bouton Add to Cart** - Avec feedback | `Frontend` `E-Commerce` | 2h | Mimi | P0 |
| 4.21 | **Page Checkout** - Récap + paiement | `Frontend` `E-Commerce` | 6h | Mimi | P0 |
| 4.22 | **Stripe Elements** - Card input sécurisé | `Frontend` `E-Commerce` | 4h | Mimi | P0 |
| 4.23 | **États paiement** - Loading, success, error | `Frontend` `E-Commerce` | 2h | Mimi | P0 |
| 4.24 | **Page Order Confirmation** - Success + downloads | `Frontend` `E-Commerce` | 3h | Mimi | P0 |
| 4.25 | **Page Order History** - Liste commandes | `Frontend` `E-Commerce` | 3h | Mimi | P0 |
| 4.26 | **Page Order Detail** - Details + re-download | `Frontend` `E-Commerce` | 2h | Mimi | P0 |

---

## 📅 PHASE 5 : FINALISATION (Sprint 11-12)

### ⚖️ RGPD BACKEND

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 5.01 | **POST /users/me/export** - Export JSON | `Backend` `RGPD` | 4h | Iness | P0 |
| 5.02 | **DELETE /users/me** - Account deletion | `Backend` `RGPD` | 4h | Iness | P0 |
| 5.03 | **POST /consent** - Cookie consent | `Backend` `RGPD` | 2h | Iness | P0 |
| 5.04 | **PUT /consent** - Update consent | `Backend` `RGPD` | 1h | Iness | P0 |
| 5.05 | **Anonymisation script** - Données >3 ans | `Backend` `RGPD` `Database` | 3h | Iness | P1 |

### ⚖️ RGPD FRONTEND

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 5.06 | **Page Privacy Policy** | `Frontend` `RGPD` | 3h | Mimi | P0 |
| 5.07 | **Page Terms of Service** | `Frontend` `RGPD` | 2h | Mimi | P0 |
| 5.08 | **Page Legal Mentions** | `Frontend` `RGPD` | 1h | Mimi | P0 |
| 5.09 | **Page Cookie Policy** | `Frontend` `RGPD` | 2h | Mimi | P0 |
| 5.10 | **Cookie Banner** - Consent options | `Frontend` `RGPD` | 4h | Mimi | P0 |
| 5.11 | **Cookie preferences modal** | `Frontend` `RGPD` | 3h | Mimi | P0 |
| 5.12 | **Bouton Export données** | `Frontend` `RGPD` | 2h | Mimi | P0 |
| 5.13 | **Bouton Supprimer compte** | `Frontend` `RGPD` | 2h | Mimi | P0 |

### 🧪 TESTS & QUALITÉ

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 5.14 | **Tests E2E** - Playwright critical paths | `Frontend` `Backend` | 6h | Mimi | P0 |
| 5.15 | **Tests de charge** - k6, 100+ req/s | `Backend` `DevOps` | 4h | Ethan | P1 |
| 5.16 | **Audit npm** - Fix high/critical vulns | `Backend` `Frontend` | 2h | Ethan | P0 |
| 5.17 | **Audit OWASP** - Checklist top 10 | `Backend` `Auth` | 4h | Ethan | P0 |
| 5.18 | **Coverage >80%** - Complete tests | `Backend` | 4h | Iness | P1 |

### 📚 DOCUMENTATION

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 5.19 | **API Swagger/OpenAPI** - Spec complète | `Backend` | 4h | Iness | P0 |
| 5.20 | **README Backend** - Setup guide | `Backend` | 2h | Iness | P0 |
| 5.21 | **README Frontend** - Setup guide | `Frontend` | 2h | Théa | P0 |
| 5.22 | **Guide déploiement** - Manual deploy | `DevOps` | 2h | Ethan | P1 |
| 5.23 | **Runbook incidents** - Debug procedures | `DevOps` | 3h | Ethan | P1 |

### 🚀 PRODUCTION & MONITORING

| # | Tâche | Labels | Est. | Assigné | Priorité |
|---|-------|--------|------|---------|----------|
| 5.24 | **Setup Sentry** - Error tracking | `DevOps` | 2h | Ethan | P0 |
| 5.25 | **Setup Plausible** - Analytics RGPD | `DevOps` `RGPD` | 2h | Ethan | P1 |
| 5.26 | **Alertes monitoring** - Uptime, errors | `DevOps` | 2h | Ethan | P0 |
| 5.27 | **Backup auto BDD** - Cron + external | `DevOps` `Database` | 3h | Ethan | P0 |
| 5.28 | **Test restore backup** - Recovery test | `DevOps` `Database` | 2h | Ethan | P0 |
| 5.29 | **DNS & domaine** - Config + pointing | `DevOps` | 1h | Ethan | P0 |
| 5.30 | **SSL production** - Let's Encrypt | `DevOps` | 1h | Ethan | P0 |
| 5.31 | **Go-live checklist** - Final verification | `DevOps` | 2h | Ethan | P0 |

---

## 👥 RÉPARTITION PAR MEMBRE

### 📊 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                    CHARGE PAR MEMBRE (ESTIMÉE)                   │
└─────────────────────────────────────────────────────────────────┘

Ethan (DevOps)    ████████████████████████░░░░░░░░░░░░░░░░  ~70h
Iness (Backend)   ████████████████████████████████████████  ~150h
Théa  (Frontend)  ████████████████████████████████░░░░░░░░  ~100h
Mimi  (Fullstack) ████████████████████████████████░░░░░░░░  ~100h
                  ────────────────────────────────────────────────
                                                    Total: ~420h
```

### 🧑‍💻 ETHAN — Lead DevOps

| Phase | Focus | Tâches |
|-------|-------|--------|
| 1 | Infrastructure, Docker, CI/CD | 1.01-1.10 |
| 4 | Stripe config | 4.07 |
| 5 | Monitoring, Sécurité, Launch | 5.15-5.31 |

### 👩‍💻 INESS — Backend Lead

| Phase | Focus | Tâches |
|-------|-------|--------|
| 1 | BDD, Express setup | 1.11-1.28 |
| 2 | Auth complète | 2.01-2.21 |
| 3 | API Artworks, Artistes, Favoris | 3.01-3.23 |
| 4 | API Panier, Checkout | 4.01-4.15 |
| 5 | RGPD Backend, Docs | 5.01-5.05, 5.18-5.20 |

### 👩‍💻 THÉA — Frontend & 3D Lead

| Phase | Focus | Tâches |
|-------|-------|--------|
| 1 | Frontend setup, Design System | 1.29-1.35 |
| 2 | Frontend Auth | 2.22-2.30 |
| 3 | **Expérience 3D**, Galerie | 3.24-3.35 |
| 5 | Documentation Frontend | 5.21 |

### 👩‍💻 MIMI — Fullstack

| Phase | Focus | Tâches |
|-------|-------|--------|
| 1 | Docker, VPS security | 1.04, 1.06, 1.08, 1.10 |
| 3 | Frontend Artworks, Artistes, Dashboard | 3.36-3.52 |
| 4 | Frontend E-Commerce | 4.16-4.26 |
| 5 | RGPD Frontend, Tests E2E | 5.06-5.14 |

---

## 🎯 MILESTONES

| Milestone | Sprint | Date cible | Critères de succès |
|-----------|--------|------------|-------------------|
| **M1: Infra Ready** | S2 | +4 sem | Docker, CI/CD, VPS opérationnels |
| **M2: Auth Complete** | S4 | +8 sem | OAuth + 2FA fonctionnels |
| **M3: Gallery MVP** | S6 | +12 sem | Galerie 3D + listing artworks |
| **M4: Artist Profiles** | S7 | +14 sem | Profils artistes + dashboard |
| **M5: E-Commerce** | S9 | +18 sem | Panier + paiement Stripe |
| **M6: Download System** | S10 | +20 sem | Téléchargements sécurisés |
| **M7: RGPD Ready** | S11 | +22 sem | Conformité légale complète |
| **M8: 🚀 LAUNCH** | S12 | +24 sem | Production live |

---

## ✅ CHECKLIST IMPORT TRELLO

- [ ] Créer board **"Make It Art MVP"**
- [ ] Créer labels selon la légende
- [ ] Créer listes par état (Backlog → Done)
- [ ] Importer toutes les tâches
- [ ] Assigner membres équipe
- [ ] Ajouter due dates par milestone
- [ ] Activer Power-Ups : Calendar, GitHub
- [ ] Configurer notifications Slack/Discord

---

<div align="center">

**Document généré en Janvier 2026**
**Version 2.0**

---

🌃 **Make It Art** — *Where Art Meets the Future* 💜

</div>
