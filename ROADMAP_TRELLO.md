# 🗂️ ROADMAP GEISHA GARDEN - Export Trello

> **Instructions d'import Trello** :
> 1. Créer un board "Geisha Garden MVP"
> 2. Créer les listes : `Backlog`, `Sprint X - To Do`, `In Progress`, `Review`, `Done`
> 3. Copier chaque tâche ci-dessous comme une carte
> 4. Ajouter les labels selon la légende

---

## 🏷️ LÉGENDE DES LABELS

| Label | Couleur | Description |
|-------|---------|-------------|
| `Backend` | 🟢 Vert | Tâches API/serveur |
| `Frontend` | 🔵 Bleu | Tâches Nuxt/Vue |
| `DevOps` | 🟣 Violet | Infrastructure/CI-CD |
| `Database` | 🟡 Jaune | BDD/migrations |
| `Auth` | 🔴 Rouge | Authentification/sécurité |
| `RGPD` | ⚫ Noir | Conformité légale |
| `Urgent` | 🟠 Orange | Priorité haute |

---

## 📅 PHASE 1 : FONDATIONS (Sprint 1-2)
**Durée estimée : 3-4 semaines**

### INFRASTRUCTURE

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 1.1 | **Créer repository GitHub** - Structure monorepo avec /frontend, /backend, /infrastructure | `DevOps` | 2h | Ethan |
| 1.2 | **Configurer branches protégées** - main (PR obligatoire), develop, règles de merge | `DevOps` | 1h | Iness |
| 1.3 | **Setup Docker Compose dev** - PostgreSQL, Redis, Backend, Frontend, Adminer | `DevOps` | 4h | Ethan |
| 1.4 | **Créer Dockerfiles** - Backend (Node 20) + Frontend (Nuxt) optimisés multi-stage | `DevOps` | 3h | Iness |
| 1.5 | **Provisionner VPS** - Commander VPS (Scaleway/Hetzner), OS Ubuntu 22.04 | `DevOps` `Urgent` | 1h | Théa |
| 1.6 | **Sécuriser VPS** - Script setup (UFW, Fail2Ban, SSH hardening, user deploy) | `DevOps` | 4h | Mimi |
| 1.7 | **Installer Docker sur VPS** - Docker Engine + Compose plugin | `DevOps` | 1h | Ethan |
| 1.8 | **Configurer Nginx** - Reverse proxy, SSL Let's Encrypt, config prod | `DevOps` | 3h | Iness |
| 1.9 | **Setup CI Pipeline** - GitHub Actions : lint + tests sur push | `DevOps` | 4h | Théa |
| 1.10 | **Setup CD Pipeline** - GitHub Actions : deploy auto sur merge main | `DevOps` | 4h | Mimi |

### BASE DE DONNÉES

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 1.11 | **Installer PostgreSQL** - Version 16, config locale + production | `Database` `DevOps` | 2h | Ethan |
| 1.12 | **Créer schéma initial** - Tables users, artists, categories | `Database` | 4h | Iness |
| 1.13 | **Créer tables artworks** - artworks, collections, collection_artworks | `Database` | 3h | Théa |
| 1.14 | **Créer tables commerce** - orders, order_items, reviews | `Database` | 3h | Mimi |
| 1.15 | **Créer tables auth** - refresh_tokens, consent_records, audit_logs | `Database` | 2h | Ethan |
| 1.16 | **Ajouter index optimisation** - Index B-tree, GIN, pg_trgm | `Database` | 2h | Iness |
| 1.17 | **Créer triggers** - updated_at auto, stats artiste, numéro commande | `Database` | 2h | Théa |
| 1.18 | **Setup migrations** - Prisma ou Sequelize, scripts migrate/rollback | `Database` `Backend` | 3h | Mimi |
| 1.19 | **Créer seeders** - Données de test (users, artworks, categories) | `Database` | 3h | Ethan |

### BACKEND - STRUCTURE

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 1.20 | **Init projet Express** - Structure dossiers, TypeScript config | `Backend` | 2h | Iness |
| 1.21 | **Config ESLint + Prettier** - Règles équipe, scripts lint | `Backend` | 1h | Théa |
| 1.22 | **Setup variables env** - dotenv, .env.example, validation | `Backend` | 1h | Mimi |
| 1.23 | **Middleware error handling** - Global error handler, format erreurs API | `Backend` | 2h | Ethan |
| 1.24 | **Middleware logging** - Morgan + Winston, logs structurés | `Backend` | 2h | Iness |
| 1.25 | **Route health check** - GET /api/v1/health (status BDD, Redis) | `Backend` | 1h | Théa |
| 1.26 | **Setup Jest** - Config tests unitaires + intégration | `Backend` | 2h | Mimi |
| 1.27 | **Connexion PostgreSQL** - Pool de connexion, config Prisma/Sequelize | `Backend` | 2h | Ethan |
| 1.28 | **Connexion Redis** - Client Redis, config sessions/cache | `Backend` | 1h | Iness |

### FRONTEND - CONNEXION API

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 1.29 | **Créer service API** - Composable useApi avec fetch, interceptors | `Frontend` | 3h | Théa |
| 1.30 | **Gestion erreurs API** - Toast notifications, error boundaries | `Frontend` | 2h | Mimi |
| 1.31 | **Variables env frontend** - NUXT_PUBLIC_API_URL, config runtime | `Frontend` | 1h | Ethan |
| 1.32 | **Test connexion API** - Vérifier appel health check depuis frontend | `Frontend` `Backend` | 1h | Iness |

---

## 📅 PHASE 2 : AUTHENTIFICATION (Sprint 3-4)
**Durée estimée : 2-3 semaines**

### AUTH - EMAIL/PASSWORD

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 2.1 | **Route POST /auth/register** - Validation, hash bcrypt, création user | `Backend` `Auth` | 4h | Théa |
| 2.2 | **Route POST /auth/login** - Vérification credentials, génération JWT | `Backend` `Auth` | 4h | Mimi |
| 2.3 | **Route POST /auth/logout** - Révocation refresh token | `Backend` `Auth` | 2h | Ethan |
| 2.4 | **Route POST /auth/refresh** - Rotation refresh token, nouveau access | `Backend` `Auth` | 3h | Iness |
| 2.5 | **Middleware authRequired** - Vérification JWT, injection user dans req | `Backend` `Auth` | 3h | Théa |
| 2.6 | **Rate limiting auth** - 5 tentatives/heure sur login | `Backend` `Auth` | 2h | Mimi |
| 2.7 | **Tests unitaires auth** - Register, login, refresh, logout | `Backend` `Auth` | 4h | Ethan |

### AUTH - OAUTH2

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 2.8 | **Config Google OAuth** - Créer app Google Cloud, credentials | `Auth` `DevOps` | 1h | Iness |
| 2.9 | **Config GitHub OAuth** - Créer OAuth App GitHub, credentials | `Auth` `DevOps` | 1h | Théa |
| 2.10 | **Route GET /auth/google** - Redirect vers Google consent | `Backend` `Auth` | 2h | Mimi |
| 2.11 | **Route GET /auth/google/callback** - Traitement callback, création/login user | `Backend` `Auth` | 4h | Ethan |
| 2.12 | **Route GET /auth/github** - Redirect vers GitHub consent | `Backend` `Auth` | 2h | Iness |
| 2.13 | **Route GET /auth/github/callback** - Traitement callback, création/login user | `Backend` `Auth` | 4h | Théa |
| 2.14 | **Gestion compte existant** - Lier OAuth à compte email existant | `Backend` `Auth` | 3h | Mimi |
| 2.15 | **Tests intégration OAuth** - Mocks providers, flux complet | `Backend` `Auth` | 3h | Ethan |

### AUTH - 2FA TOTP

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 2.16 | **Route POST /auth/2fa/setup** - Générer secret, retourner QR code | `Backend` `Auth` | 3h | Iness |
| 2.17 | **Route POST /auth/2fa/verify** - Vérifier code, activer 2FA | `Backend` `Auth` | 2h | Théa |
| 2.18 | **Route POST /auth/2fa/disable** - Désactiver 2FA (avec code) | `Backend` `Auth` | 2h | Mimi |
| 2.19 | **Générer backup codes** - 10 codes uniques, hashés en BDD | `Backend` `Auth` | 2h | Ethan |
| 2.20 | **Modifier login pour 2FA** - Retourner requires_2fa si activé | `Backend` `Auth` | 2h | Iness |
| 2.21 | **Route POST /auth/2fa/validate** - Valider code TOTP après login | `Backend` `Auth` | 2h | Théa |
| 2.22 | **Support backup codes** - Utilisation one-time des backup codes | `Backend` `Auth` | 2h | Mimi |

### FRONTEND - AUTH

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 2.23 | **Composable useAuth** - State user, login, logout, refresh auto | `Frontend` `Auth` | 4h | Ethan |
| 2.24 | **Middleware auth Nuxt** - Protection routes, redirect login | `Frontend` `Auth` | 2h | Iness |
| 2.25 | **Page Login** - Formulaire email/password, boutons OAuth | `Frontend` `Auth` | 3h | Théa |
| 2.26 | **Page Signup** - Formulaire inscription, validation | `Frontend` `Auth` | 3h | Mimi |
| 2.27 | **Flux OAuth frontend** - Redirect, callback, stockage token | `Frontend` `Auth` | 3h | Ethan |
| 2.28 | **Page 2FA Setup** - Affichage QR code, input vérification | `Frontend` `Auth` | 3h | Iness |
| 2.29 | **Modal 2FA Login** - Input code TOTP après login | `Frontend` `Auth` | 2h | Théa |
| 2.30 | **Affichage backup codes** - Modal avec codes à sauvegarder | `Frontend` `Auth` | 2h | Mimi |
| 2.31 | **Gestion token expiration** - Refresh automatique, redirect si invalide | `Frontend` `Auth` | 3h | Ethan |

---

## 📅 PHASE 3 : CORE FEATURES (Sprint 5-7)
**Durée estimée : 4-5 semaines**

### ARTWORKS - BACKEND

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 3.1 | **Route GET /artworks** - Liste paginée, filtres, tri | `Backend` | 4h | |
| 3.2 | **Route GET /artworks/:id** - Détails artwork + artiste | `Backend` | 2h | |
| 3.3 | **Route POST /artworks** - Création (artiste only) | `Backend` | 3h | |
| 3.4 | **Route PUT /artworks/:id** - Modification (owner only) | `Backend` | 2h | |
| 3.5 | **Route DELETE /artworks/:id** - Suppression (owner only) | `Backend` | 2h | |
| 3.6 | **Filtres artworks** - Par catégorie, prix, tags, artiste | `Backend` | 3h | |
| 3.7 | **Recherche full-text** - Recherche titre/description avec pg_trgm | `Backend` | 3h | |
| 3.8 | **Tri artworks** - Par date, prix, popularité | `Backend` | 2h | |
| 3.9 | **Upload images** - Intégration S3/MinIO, resize, thumbnails | `Backend` | 6h | |
| 3.10 | **Validation fichiers** - Types autorisés, taille max, dimensions | `Backend` | 2h | |

### ARTISTES - BACKEND

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 3.11 | **Route GET /artists** - Liste artistes paginée | `Backend` | 2h | |
| 3.12 | **Route GET /artists/:id** - Profil complet artiste | `Backend` | 2h | |
| 3.13 | **Route POST /artists** - Devenir artiste (user → artist) | `Backend` | 3h | |
| 3.14 | **Route PUT /artists/:id** - Modifier profil artiste | `Backend` | 2h | |
| 3.15 | **Route GET /artists/:id/artworks** - Artworks d'un artiste | `Backend` | 2h | |
| 3.16 | **Route POST /artists/:id/follow** - Suivre un artiste | `Backend` | 2h | |
| 3.17 | **Route DELETE /artists/:id/follow** - Ne plus suivre | `Backend` | 1h | |
| 3.18 | **Statistiques artiste** - Calcul ventes, revenus, followers | `Backend` | 3h | |

### FAVORIS & COLLECTIONS - BACKEND

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 3.19 | **Route POST /artworks/:id/favorite** - Ajouter aux favoris | `Backend` | 2h | |
| 3.20 | **Route DELETE /artworks/:id/favorite** - Retirer des favoris | `Backend` | 1h | |
| 3.21 | **Route GET /users/me/favorites** - Liste favoris user | `Backend` | 2h | |
| 3.22 | **Route GET /collections** - Collections de l'user | `Backend` | 2h | |
| 3.23 | **Route POST /collections** - Créer collection | `Backend` | 2h | |
| 3.24 | **Route PUT /collections/:id** - Modifier collection | `Backend` | 2h | |
| 3.25 | **Route DELETE /collections/:id** - Supprimer collection | `Backend` | 1h | |
| 3.26 | **Route POST /collections/:id/artworks** - Ajouter artwork | `Backend` | 2h | |
| 3.27 | **Route DELETE /collections/:id/artworks/:artworkId** - Retirer artwork | `Backend` | 1h | |

### CATÉGORIES - BACKEND

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 3.28 | **Route GET /categories** - Liste catégories (arbre) | `Backend` | 2h | |
| 3.29 | **Seeder catégories** - Digital Art, Photography, 3D, Vector, NFT | `Backend` `Database` | 1h | |

### FRONTEND - ARTWORKS

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 3.30 | **Page Artworks** - Grille avec filtres, pagination | `Frontend` | 6h | |
| 3.31 | **Composant ArtworkCard** - Image, titre, artiste, prix, hover | `Frontend` | 3h | |
| 3.32 | **Page Artwork Detail** - Image full, infos, artiste, bouton achat | `Frontend` | 4h | |
| 3.33 | **Composant FilterBar** - Catégories, prix, recherche, tri | `Frontend` | 4h | |
| 3.34 | **Infinite scroll ou pagination** - Chargement progressif | `Frontend` | 3h | |
| 3.35 | **Bouton Favori** - Toggle avec animation | `Frontend` | 2h | |

### FRONTEND - ARTISTES

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 3.36 | **Page Profil Artiste** - Header, stats, onglets | `Frontend` | 6h | |
| 3.37 | **Onglet Artworks artiste** - Grille artworks de l'artiste | `Frontend` | 3h | |
| 3.38 | **Onglet About artiste** - Bio, skills, parcours, contact | `Frontend` | 3h | |
| 3.39 | **Onglet Collections artiste** - Collections publiques | `Frontend` | 2h | |
| 3.40 | **Bouton Follow** - Toggle avec compteur | `Frontend` | 2h | |
| 3.41 | **Page Become Artist** - Formulaire devenir artiste | `Frontend` | 4h | |

### FRONTEND - DASHBOARD USER

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 3.42 | **Page Dashboard** - Navigation tabs, layout | `Frontend` | 4h | |
| 3.43 | **Tab Profil** - Édition infos personnelles | `Frontend` | 3h | |
| 3.44 | **Tab Favoris** - Liste artworks favoris | `Frontend` | 2h | |
| 3.45 | **Tab Collections** - Gestion collections personnelles | `Frontend` | 4h | |
| 3.46 | **Tab Paramètres** - Sécurité, 2FA, préférences | `Frontend` | 3h | |
| 3.47 | **Tab Historique** - Commandes passées | `Frontend` | 2h | |

---

## 📅 PHASE 4 : E-COMMERCE (Sprint 8-10)
**Durée estimée : 3-4 semaines**

### PANIER - BACKEND

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 4.1 | **Route GET /cart** - Récupérer panier (Redis ou BDD) | `Backend` | 2h | |
| 4.2 | **Route POST /cart/items** - Ajouter artwork au panier | `Backend` | 2h | |
| 4.3 | **Route DELETE /cart/items/:id** - Retirer du panier | `Backend` | 1h | |
| 4.4 | **Route DELETE /cart** - Vider le panier | `Backend` | 1h | |
| 4.5 | **Calcul totaux** - Subtotal, réductions, taxes, total | `Backend` | 2h | |
| 4.6 | **Vérification stock** - Artwork toujours disponible | `Backend` | 2h | |

### CHECKOUT - BACKEND

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 4.7 | **Config Stripe** - Account Stripe, clés API, webhooks | `Backend` `DevOps` | 2h | |
| 4.8 | **Route POST /orders/checkout** - Créer commande + payment intent | `Backend` | 6h | |
| 4.9 | **Webhook Stripe** - Traitement événements paiement | `Backend` | 4h | |
| 4.10 | **Mise à jour status commande** - pending → confirmed → completed | `Backend` | 2h | |
| 4.11 | **Génération liens téléchargement** - URLs signées, expiration | `Backend` | 3h | |
| 4.12 | **Email confirmation** - Template + envoi (Nodemailer/SendGrid) | `Backend` | 4h | |
| 4.13 | **Route GET /orders/:id** - Détails commande | `Backend` | 2h | |
| 4.14 | **Route GET /orders/:id/download/:itemId** - Téléchargement fichier | `Backend` | 3h | |

### FRONTEND - PANIER

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 4.15 | **Composable useCart** - State panier, actions add/remove | `Frontend` | 3h | |
| 4.16 | **Page Cart** - Liste items, quantités, totaux | `Frontend` | 4h | |
| 4.17 | **Composant CartItem** - Image, titre, prix, bouton supprimer | `Frontend` | 2h | |
| 4.18 | **Badge panier navbar** - Compteur items | `Frontend` | 1h | |
| 4.19 | **Bouton Add to Cart** - Sur page artwork, avec feedback | `Frontend` | 2h | |

### FRONTEND - CHECKOUT

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 4.20 | **Page Checkout** - Récap commande, formulaire paiement | `Frontend` | 6h | |
| 4.21 | **Intégration Stripe Elements** - Card input sécurisé | `Frontend` | 4h | |
| 4.22 | **Gestion états paiement** - Loading, success, error | `Frontend` | 2h | |
| 4.23 | **Page Order Confirmation** - Récap + liens téléchargement | `Frontend` | 3h | |
| 4.24 | **Page Order History** - Liste commandes passées | `Frontend` | 3h | |
| 4.25 | **Page Order Detail** - Détails + re-téléchargement | `Frontend` | 2h | |

---

## 📅 PHASE 5 : FINALISATION (Sprint 11-12)
**Durée estimée : 2-3 semaines**

### RGPD - BACKEND

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 5.1 | **Route POST /users/me/export** - Export données JSON | `Backend` `RGPD` | 4h | |
| 5.2 | **Route DELETE /users/me** - Suppression compte + données | `Backend` `RGPD` | 4h | |
| 5.3 | **Route POST /consent** - Enregistrer consentement cookies | `Backend` `RGPD` | 2h | |
| 5.4 | **Route PUT /consent** - Modifier consentement | `Backend` `RGPD` | 1h | |
| 5.5 | **Anonymisation données** - Script pour données >3 ans | `Backend` `RGPD` `Database` | 3h | |

### RGPD - FRONTEND

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 5.6 | **Page Privacy Policy** - Politique de confidentialité | `Frontend` `RGPD` | 3h | |
| 5.7 | **Page Terms of Service** - CGU/CGV | `Frontend` `RGPD` | 2h | |
| 5.8 | **Page Legal Mentions** - Mentions légales | `Frontend` `RGPD` | 1h | |
| 5.9 | **Page Cookie Policy** - Politique cookies | `Frontend` `RGPD` | 2h | |
| 5.10 | **Banner Cookies** - Consentement avec options | `Frontend` `RGPD` | 4h | |
| 5.11 | **Modal préférences cookies** - Gestion détaillée | `Frontend` `RGPD` | 3h | |
| 5.12 | **Bouton Export données** - Dans paramètres compte | `Frontend` `RGPD` | 2h | |
| 5.13 | **Bouton Supprimer compte** - Avec confirmation | `Frontend` `RGPD` | 2h | |

### TESTS & QUALITÉ

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 5.14 | **Tests E2E critiques** - Register, login, achat (Playwright) | `Frontend` `Backend` | 6h | |
| 5.15 | **Tests de charge** - k6 ou Artillery, 100+ req/s | `Backend` `DevOps` | 4h | |
| 5.16 | **Audit npm dependencies** - Fix vulnérabilités high/critical | `Backend` `Frontend` | 2h | |
| 5.17 | **Audit sécurité OWASP** - Checklist top 10 | `Backend` `Auth` | 4h | |
| 5.18 | **Coverage tests >80%** - Compléter tests manquants | `Backend` | 4h | |

### DOCUMENTATION

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 5.19 | **Documentation API** - Swagger/OpenAPI spec | `Backend` | 4h | |
| 5.20 | **README Backend** - Installation, config, scripts | `Backend` | 2h | |
| 5.21 | **README Frontend** - Installation, config, scripts | `Frontend` | 2h | |
| 5.22 | **Guide déploiement** - Process deploy manuel si besoin | `DevOps` | 2h | |
| 5.23 | **Runbook incidents** - Procédures debug/recovery | `DevOps` | 3h | |

### MONITORING & PRODUCTION

| # | Tâche | Labels | Estimation | Assigné |
|---|-------|--------|------------|---------|
| 5.24 | **Setup Sentry** - Error tracking backend + frontend | `DevOps` | 2h | |
| 5.25 | **Setup analytics** - Plausible ou équivalent RGPD-friendly | `DevOps` `RGPD` | 2h | |
| 5.26 | **Alertes monitoring** - Uptime, erreurs, performances | `DevOps` | 2h | |
| 5.27 | **Backup automatique BDD** - Script cron + stockage externe | `DevOps` `Database` | 3h | |
| 5.28 | **Test restore backup** - Vérifier procédure recovery | `DevOps` `Database` | 2h | |
| 5.29 | **DNS & domaine** - Config DNS, pointage VPS | `DevOps` | 1h | |
| 5.30 | **Certificat SSL prod** - Let's Encrypt + auto-renewal | `DevOps` | 1h | |
| 5.31 | **Go-live checklist** - Vérification finale avant launch | `DevOps` `Urgent` | 2h | |

---

## 📊 RÉCAPITULATIF

| Phase | Nb Tâches | Estimation Totale |
|-------|-----------|-------------------|
| Phase 1 - Fondations | 32 | ~75h |
| Phase 2 - Auth | 31 | ~85h |
| Phase 3 - Core | 47 | ~130h |
| Phase 4 - E-Commerce | 25 | ~75h |
| Phase 5 - Finalisation | 31 | ~80h |
| **TOTAL** | **166 tâches** | **~445h** |

**Avec 4 devs à 35h/semaine utiles** : ~3.5 mois

---

## 👥 CHARGE PAR MEMBRE (Sprint 1-4)

### 🧑‍💻 ETHAN
| Sprint | Tâches | Heures |
|--------|--------|--------|
| 1-2 | 1.1, 1.3, 1.7, 1.11, 1.15, 1.19, 1.23, 1.27, 1.31 | ~19h |
| 3-4 | 2.3, 2.7, 2.11, 2.15, 2.19, 2.23, 2.27, 2.31 | ~26h |
| **Total Sprint 1-4** | **17 tâches** | **~45h** |

### 👩‍💻 INESS
| Sprint | Tâches | Heures |
|--------|--------|--------|
| 1-2 | 1.2, 1.4, 1.8, 1.12, 1.16, 1.20, 1.24, 1.28, 1.32 | ~21h |
| 3-4 | 2.4, 2.8, 2.12, 2.16, 2.20, 2.24, 2.28 | ~18h |
| **Total Sprint 1-4** | **16 tâches** | **~39h** |

### 👩‍💻 THÉA
| Sprint | Tâches | Heures |
|--------|--------|--------|
| 1-2 | 1.5, 1.9, 1.13, 1.17, 1.21, 1.25, 1.29 | ~18h |
| 3-4 | 2.1, 2.5, 2.9, 2.13, 2.17, 2.21, 2.25, 2.29 | ~22h |
| **Total Sprint 1-4** | **15 tâches** | **~40h** |

### 👩‍💻 MIMI
| Sprint | Tâches | Heures |
|--------|--------|--------|
| 1-2 | 1.6, 1.10, 1.14, 1.18, 1.22, 1.26, 1.30 | ~19h |
| 3-4 | 2.2, 2.6, 2.10, 2.14, 2.18, 2.22, 2.26, 2.30 | ~21h |
| **Total Sprint 1-4** | **15 tâches** | **~40h** |

### 📈 Équilibre Charge Sprint 1-4

```
Ethan  ████████████████████████░░░░░░  45h
Iness  ███████████████████░░░░░░░░░░░  39h
Théa   ████████████████████░░░░░░░░░░  40h
Mimi   ████████████████████░░░░░░░░░░  40h
                                       ───
                              Total: 164h
```

✅ **Charge bien équilibrée** entre les 4 membres (~40h chacun sur 4 sprints)

---

---

> ⚠️ **Note** : Les assignations des Phases 3, 4 et 5 sont à définir lors des sprint plannings correspondants.

---

## 🎯 MILESTONES TRELLO

Créer ces milestones/labels de sprint :

1. **Sprint 1-2** : Infrastructure + BDD (Phase 1)
2. **Sprint 3-4** : Authentification complète (Phase 2)
3. **Sprint 5-6** : Artworks + Artistes (Phase 3a)
4. **Sprint 7** : Dashboard + Collections (Phase 3b)
5. **Sprint 8-9** : Panier + Paiement (Phase 4)
6. **Sprint 10** : Commandes + Downloads (Phase 4b)
7. **Sprint 11-12** : RGPD + Tests + Launch (Phase 5)

---

## ✅ CHECKLIST IMPORT TRELLO

- [ ] Créer board "Geisha Garden MVP"
- [ ] Créer labels (voir légende)
- [ ] Créer listes par sprint
- [ ] Importer tâches Phase 1 dans Sprint 1-2
- [ ] Assigner membres équipe
- [ ] Ajouter due dates par sprint
- [ ] Activer Power-Up Calendar

---

*Document généré le 18 Décembre 2025*


