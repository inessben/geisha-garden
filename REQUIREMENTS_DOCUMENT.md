# CAHIER DES CHARGES TECHNIQUE
## Make It Art - Marketplace d'Art Digital Immersive

**Version** : 2.0
**Date** : Janvier 2026
**Équipe** : Ethan, Iness, Théa, Mimi
**Statut** : MVP -> Production

---

<div align="center">

### « Where Art Meets the Future »

</div>

---

## TABLE DES MATIÈRES

1. [Présentation du Projet](#1-présentation-du-projet)
2. [Expérience Utilisateur & Parcours](#2-expérience-utilisateur--parcours)
3. [Architecture Technique](#3-architecture-technique)
4. [Base de Données](#4-base-de-données)
5. [Authentification & Sécurité](#5-authentification--sécurité)
6. [Expérience 3D Immersive](#6-expérience-3d-immersive)
7. [Système E-Commerce](#7-système-e-commerce)
8. [Modèle Économique](#8-modèle-économique)
9. [Environnements](#9-environnements)
10. [Infrastructure & Déploiement](#10-infrastructure--déploiement)
11. [CI/CD Pipeline](#11-cicd-pipeline)
12. [Conformité RGPD](#12-conformité-rgpd)
13. [Organisation de l'Équipe](#13-organisation-de-léquipe)
14. [Livrables & Planning](#14-livrables--planning)
15. [Annexes](#15-annexes)

---

## 1. PRÉSENTATION DU PROJET

### 1.1 Vision

**Make It Art** est bien plus qu'une simple marketplace, c'est un **univers immersif** où l'art digital prend vie. Inspirée par l'esthétique cyberpunk et les néons de la culture futuriste, la plateforme offre aux artistes un espace unique pour exposer et vendre leurs créations, tandis que les collectionneurs explorent une galerie 3D interactive.

> *Imaginez déambuler dans une galerie virtuelle aux lumières néon, où chaque oeuvre flotte dans l'espace, prête à être découverte...*

### 1.2 Proposition de Valeur

| Pour les Artistes | Pour les Collectionneurs |
|-------------------|--------------------------|
| Commission réduite (10-15%) | Découvrir des talents uniques |
| Dashboard analytics complet | Expérience 3D immersive |
| Visibilité internationale | Fichiers HD + certificat d'authenticité |
| Protection des oeuvres | Paiement sécurisé |
| Système de vérification | Collections personnalisées |

### 1.3 Description Fonctionnelle

**Make It Art** est une marketplace d'art digital immersive avec une esthétique cyberpunk 3D. La plateforme permet aux artistes de vendre leurs oeuvres numériques et aux collectionneurs de les acheter, avec une future intégration crypto/NFT.

### 1.4 Objectifs Fonctionnels

**Core Features (MVP)** :
- Galerie d'oeuvres d'art avec navigation 3D immersive
- Gestion des profils artistes et collectionneurs
- Système de vente/achat d'oeuvres digitales
- Système de favoris et collections personnelles
- Recherche et filtres avancés (catégorie, prix, style, tags)
- Dashboard artiste avec statistiques et analytics

**Features Avancées (v1.1+)** :
- Galeries virtuelles personnalisées par artiste
- Système de commissions personnalisées
- Abonnements artistes premium
- Enchères en temps réel
- Intégration wallet crypto/NFT (v2)

### 1.5 Contraintes Techniques

| Métrique | Objectif | Critique |
|----------|----------|----------|
| **Temps de réponse API** | < 200ms | < 500ms |
| **Uptime** | > 99.5% | > 99% |
| **Time to First Byte (TTFB)** | < 600ms | < 1s |
| **Largest Contentful Paint** | < 2.5s | < 4s |
| **Concurrent Users** | 1,000+ | 500+ |
| **File Upload** | < 50MB | < 100MB |

### 1.6 Cibles Utilisateurs

**Artiste Émergent (25-35 ans)** :
- Cherche une plateforme pour se faire connaître
- Veut des commissions raisonnables
- A besoin d'outils de promotion intégrés

**Artiste Professionnel (30-45 ans)** :
- Portfolio existant, cherche nouveaux canaux
- Veut des analytics détaillés
- Intéressé par les commissions personnalisées

**Collectionneur Débutant (20-40 ans)** :
- Découvre l'art digital
- Budget modéré (50-200€)
- Attrait pour l'expérience immersive

**Collectionneur Passionné (30-55 ans)** :
- Collectionne activement
- Budget conséquent (200€+)
- Cherche l'exclusivité et l'authenticité

---

## 2. EXPÉRIENCE UTILISATEUR & PARCOURS

### 2.1 User Stories Principales

#### Artiste

| ID | En tant que... | Je veux... | Afin de... |
|----|----------------|------------|------------|
| A1 | Artiste | M'inscrire et créer mon profil | Rejoindre la communauté |
| A2 | Artiste | Uploader mes oeuvres avec tous les détails | Les exposer et les vendre |
| A3 | Artiste | Créer des collections thématiques | Organiser mon portfolio |
| A4 | Artiste | Voir mes statistiques de ventes | Comprendre mes performances |
| A5 | Artiste | Recevoir des notifications de vente | Être informé en temps réel |
| A6 | Artiste | Retirer mes gains | Monétiser mon travail |
| A7 | Artiste | Personnaliser ma galerie 3D | Me démarquer |
| A8 | Artiste | Proposer des oeuvres en édition limitée | Créer de la rareté |

#### Collectionneur

| ID | En tant que... | Je veux... | Afin de... |
|----|----------------|------------|------------|
| C1 | Collectionneur | Parcourir la galerie 3D | Découvrir des oeuvres |
| C2 | Collectionneur | Filtrer par style/prix/artiste | Trouver ce qui me plaît |
| C3 | Collectionneur | Ajouter des favoris | Sauvegarder mes coups de coeur |
| C4 | Collectionneur | Acheter une oeuvre | Posséder de l'art digital |
| C5 | Collectionneur | Télécharger en HD | Obtenir mes fichiers |
| C6 | Collectionneur | Suivre des artistes | Être notifié des nouveautés |
| C7 | Collectionneur | Voir mon historique d'achats | Gérer ma collection |
| C8 | Collectionneur | Laisser des avis | Partager mon expérience |

### 2.2 Parcours Utilisateur (User Flows)

**Parcours Découverte -> Achat** :

1. **Landing Page** : Arrivée sur le site
2. **Galerie 3D** : Navigation libre dans l'univers immersif
3. **Page Artwork** : Preview HD, prix, détails, reviews
4. **Profil Artiste** : Bio, portfolio, galerie personnelle, followers
5. **Ajout au Panier** : Si non connecté, redirection vers inscription/connexion
6. **Checkout** : Résumé panier, paiement Stripe, confirmation
7. **Email Confirmation** : Liens de téléchargement + certificat d'authenticité

### 2.3 Wireframes & Maquettes

**Pages principales à designer** :

| Page | Priorité | Responsable | Statut |
|------|----------|-------------|--------|
| Landing Page + Hero 3D | Haute | Design Lead | À faire |
| Galerie 3D (navigation) | Haute | 3D Dev | À faire |
| Page Artwork (détail) | Haute | Frontend | À faire |
| Profil Artiste | Moyenne | Frontend | À faire |
| Dashboard Artiste | Moyenne | Frontend | À faire |
| Checkout Flow | Haute | Frontend | À faire |
| Page Recherche/Filtres | Moyenne | Frontend | À faire |
| Admin Dashboard | Basse | Fullstack | À faire |

---

## 3. ARCHITECTURE TECHNIQUE

### 3.1 Stack Technologique

| Couche | Technologie | Version | Justification |
|--------|-------------|---------|---------------|
| **Frontend** | Nuxt.js | 4.x | SSR, SEO, performances |
| **Frontend** | Vue.js | 3.x | Composition API, TypeScript |
| **Frontend** | Three.js | 0.181.x | Rendu 3D WebGL |
| **Backend** | Node.js | 20 LTS | Stabilité, support long terme |
| **Backend** | Express.js | 4.x | Framework minimaliste, flexible |
| **ORM** | Prisma | Latest | Type-safe, migrations, excellent DX |
| **BDD** | PostgreSQL | 16.x | Relationnel, ACID, performant |
| **Cache** | Redis | 7.x | Sessions, cache requêtes |
| **Conteneurs** | Docker | 24.x | Isolation, reproductibilité |
| **Orchestration** | Docker Compose | 2.x | Dev local multi-services |
| **Reverse Proxy** | Nginx | 1.25.x | Load balancing, SSL |

### 3.2 Architecture Globale

L'architecture suit un modèle **client-serveur classique** avec séparation frontend/backend :

- **Internet** -> **Nginx (Reverse Proxy)** avec SSL/TLS et Load Balancing
- **Frontend (Nuxt)** : Container sur port 3000
- **Backend (Express)** : Container sur port 4000
- **PostgreSQL** : Container sur port 5432
- **Redis** : Container sur port 6379
- **File Storage** : S3 ou MinIO

### 3.3 Structure du Projet

| Dossier | Contenu |
|---------|---------|
| **frontend/** | Application Nuxt.js 4 |
| frontend/assets/ | Styles, images |
| frontend/components/ | Composants Vue réutilisables |
| frontend/composables/ | Logique partagée (useAuth, useCart, useApi) |
| frontend/pages/ | Routes automatiques Nuxt |
| frontend/public/ | Fichiers statiques |
| frontend/stores/ | Pinia stores |
| **backend/** | API Express.js + Prisma |
| backend/src/routes/ | Endpoints API REST |
| backend/src/services/ | Logique métier |
| backend/src/middlewares/ | Auth, validation, upload |
| backend/src/utils/ | Helpers (jwt, email, storage) |
| backend/prisma/ | Schéma BDD + migrations |
| backend/tests/ | Tests unitaires et intégration |
| **infrastructure/** | Docker, Nginx, scripts |
| **.github/workflows/** | CI/CD |

### 3.4 API REST - Conventions

**Base URL** : `https://api.makeitart.io/v1`

**Codes HTTP utilisés** :

| Code | Utilisation |
|------|-------------|
| 200 | Succès (GET, PUT, PATCH) |
| 201 | Création réussie (POST) |
| 204 | Suppression réussie (DELETE) |
| 400 | Erreur de validation |
| 401 | Non authentifié |
| 403 | Non autorisé |
| 404 | Ressource non trouvée |
| 429 | Rate limiting |
| 500 | Erreur serveur |

---

## 4. BASE DE DONNÉES

### 4.1 Choix du SGBD : PostgreSQL

**Pourquoi PostgreSQL ?**

1. **Données fortement relationnelles** : Users <-> Artworks <-> Orders <-> Collections
2. **Transactions financières** : ACID complet obligatoire pour les paiements
3. **Requêtes complexes** : Recherche multi-critères, statistiques, agrégations
4. **Intégrité référentielle** : Foreign keys, cascades, contraintes
5. **JSON natif** : JSONB pour les métadonnées flexibles
6. **Full-text search** : Recherche intégrée performante
7. **Extensions** : PostGIS (géolocalisation), pg_trgm (fuzzy search)
8. **Maturité** : 35+ ans, communauté massive, documentation excellente

### 4.2 Modèle de Données

**Tables principales** :

| Table | Description | Relations |
|-------|-------------|-----------|
| `users` | Comptes utilisateurs | -> artists, orders, favorites |
| `artists` | Profils artistes | -> users, artworks, collections |
| `artworks` | Oeuvres d'art | -> artists, categories, reviews |
| `categories` | Catégories (hiérarchiques) | -> artworks |
| `collections` | Groupes d'oeuvres | -> artists, artworks |
| `orders` | Commandes | -> users, order_items |
| `order_items` | Lignes de commande | -> orders, artworks |
| `reviews` | Avis utilisateurs | -> users, artworks |
| `favorites` | Favoris | -> users, artworks |
| `follows` | Abonnements artistes | -> users, artists |
| `refresh_tokens` | Tokens JWT refresh | -> users |
| `audit_logs` | Logs d'activité | -> users |
| `consent_records` | Consentements RGPD | -> users |

**Schéma géré via Prisma** : Le fichier `prisma/schema.prisma` définit l'ensemble du modèle de données avec les relations, contraintes et index.

### 4.3 Modélisation (MLD)

**Outils recommandés pour créer le MLD (Modèle Logique de Données)** :

| Outil | Usage |
|-------|-------|
| **Mermaid.js** | Diagrammes ERD en markdown, intégré à GitHub |
| **Azimutt** | Visualisation et exploration de schémas BDD |

Le MLD doit être créé avant l'implémentation pour visualiser les relations entre tables.

### 4.4 Outils de Gestion

| Outil | Usage |
|-------|-------|
| **pgAdmin 4** | Interface web pour administration |
| **DBeaver** | Client SQL universel (alternative) |
| **Prisma Studio** | GUI intégrée à Prisma ORM |

---

## 5. AUTHENTIFICATION & SÉCURITÉ

### 5.1 Architecture d'Authentification

**Flux d'authentification** :

1. **Email/Password** ou **OAuth2 (Google/GitHub)** : Validation initiale
2. **2FA TOTP** (si activé) : Vérification code temporaire
3. **JWT Access Token** : Généré, expire en 15 minutes
4. **JWT Refresh Token** : Expire en 7 jours, stocké en BDD (révocable)

### 5.2 OAuth2 - Fournisseurs Tiers

**Fournisseurs supportés** :
- Google (obligatoire)
- GitHub (obligatoire)
- Apple (optionnel - recommandé pour mobile)

**Librairies** : `passport` + `passport-google-oauth20` + `passport-github2`

### 5.3 2FA - TOTP (Time-based One-Time Password)

**Implémentation** :
- Librairie : `otplib` ou `speakeasy`
- QR Code : `qrcode`
- Backup codes : 10 codes uniques générés à l'activation

**Flux d'activation 2FA** :
1. L'utilisateur demande l'activation dans ses paramètres
2. Le serveur génère un secret TOTP (base32, 20 bytes)
3. Le serveur retourne un QR code (URI otpauth://)
4. L'utilisateur scanne avec son app (Google Authenticator, Authy)
5. L'utilisateur entre un code pour vérifier
6. Le serveur stocke `totp_secret` (chiffré) et génère les backup codes
7. `totp_enabled = true`

**Flux de login avec 2FA** :
1. Email/password OU OAuth validé
2. Si `totp_enabled = true` -> retourner `requires_2fa: true`
3. L'utilisateur entre le code TOTP (ou backup code)
4. Validation -> génération JWT

### 5.4 Sécurité des Tokens

**JWT Access Token** :
- Expiration : 15 minutes
- Signature : RS256 (asymétrique) recommandé
- Payload : user ID, email, role

**Refresh Token** :
- Expiration : 7 jours
- Stocké en base de données (table `refresh_tokens`)
- Hashé avec SHA-256 avant stockage
- Révocable individuellement
- Rotation à chaque utilisation

### 5.5 Sécurité Applicative

**Headers de sécurité** : via `helmet` (CSP, HSTS, X-Frame-Options, etc.)

**Rate Limiting** :

| Endpoint | Limite | Fenêtre |
|----------|--------|---------|
| Global | 100 req | 15 min |
| Auth (login) | 5 tentatives | 1 heure |
| Upload | 10 fichiers | 1 heure |

**Validation des entrées** : `zod` + `sanitize-html`

**Protection CSRF** : SameSite cookies + tokens CSRF

---

## 6. EXPÉRIENCE 3D IMMERSIVE

### 6.1 Vision Artistique

L'expérience 3D est le **coeur différenciant** de Make It Art. L'utilisateur ne navigue pas sur un site web classique, mais **explore un univers cyberpunk**.

**Ambiance visuelle** :
- Cityscape néon cyberpunk en arrière-plan
- Palette de couleurs : violet, cyan, magenta, noir profond
- Effets de particules et lumières dynamiques
- Soundtrack ambient optionnel (désactivable)

### 6.2 Architecture Three.js

**Structure de la scène 3D** :

- **Scene (Three.js)** : Conteneur principal
  - **Camera** : PerspectiveCamera avec OrbitControls / FirstPersonControls
  - **Lighting** : AmbientLight (faible), PointLight[] (néons), SpotLight[] (oeuvres)
  - **Environment** : Skybox (cityscape), Ground (réflexions), Fog (profondeur)
  - **Gallery** : Frames[] (cadres flottants), Pedestals[] (sculptures), Navigation
  - **UI Overlay** : Artwork Info Panel, Search/Filter Panel, Cart Preview

### 6.3 Composants 3D Principaux

| Composant | Description | Technologie |
|-----------|-------------|-------------|
| **GalleryScene** | Scène principale de la galerie | Three.js + Vue |
| **ArtworkFrame** | Cadre flottant avec l'oeuvre | Mesh + Texture |
| **ArtworkModal** | Popup 3D au clic sur une oeuvre | HTML/CSS overlay |
| **NavigationPath** | Système de déplacement | Raycasting |
| **ParticleSystem** | Effets ambiants (poussière, lumières) | Points/Sprites |
| **NeonLights** | Éclairages néon dynamiques | PointLight + Glow |

### 6.4 Modes de Navigation

**Modes disponibles** :
- **Orbit** (défaut) : Vue orbitale autour de la galerie
- **First Person** : Déplacement libre en vue première personne
- **Guided** : Tour guidé automatique
- **VR** : Mode réalité virtuelle (v2)

**Contrôles** :

| Action | Desktop | Mobile |
|--------|---------|--------|
| Rotation caméra | Clic gauche + drag | Touch drag |
| Zoom | Molette | Pinch |
| Déplacement | WASD / Flèches | Joystick virtuel |
| Sélection oeuvre | Clic | Tap |
| Menu | Échap / E | Bouton UI |

### 6.5 Optimisation Performance

**Techniques à implémenter** :
- **LOD (Level of Detail)** : Réduire la qualité des objets distants
- **Frustum Culling** : Ne pas rendre les objets hors caméra
- **Texture Atlases** : Combiner les textures similaires
- **Instance Meshes** : Réutiliser les géométries identiques
- **Lazy Loading** : Charger les oeuvres progressivement
- **WebGL Compression** : Formats Basis/KTX2 pour les textures

**Objectifs performance** :

| Métrique | Cible | Acceptable |
|----------|-------|------------|
| FPS (desktop) | 60 | 30 |
| FPS (mobile) | 30 | 20 |
| Temps de chargement initial | < 3s | < 5s |
| Mémoire GPU | < 500MB | < 1GB |

### 6.6 Fallback Mode

Pour les appareils incompatibles WebGL ou les préférences utilisateur :
- Mode "Grid View" classique 2D
- Détection automatique des capacités
- Toggle accessible dans les settings

---

## 7. SYSTÈME E-COMMERCE

### 7.1 Types de Produits

| Type | Description | Livrable |
|------|-------------|----------|
| **Artwork Standard** | Oeuvre unique, prix fixe | Fichier HD + certificat |
| **Édition Limitée** | N exemplaires disponibles | Fichier HD + certificat numéroté |
| **Pack/Bundle** | Collection d'oeuvres | Plusieurs fichiers + certificat |
| **Commission** | Oeuvre sur commande | Négociation -> Livraison |

### 7.2 Structure des Prix

**Prix affiché** = Prix artiste + Frais plateforme (inclus)

| Élément | Montant | Pourcentage |
|---------|---------|-------------|
| Prix affiché | 100€ | 100% |
| Part artiste | 85€ | 85% |
| Commission Make It Art | 15€ | 15% |

### 7.3 Formats de Fichiers Supportés

**Livraison** :

| Format | Résolution max | Usage |
|--------|----------------|-------|
| PNG | 8000x8000 px | Standard, transparence |
| JPEG | 8000x8000 px | Photos, pas de transparence |
| TIFF | 8000x8000 px | Impression pro |
| PSD | 8000x8000 px | Éditable (premium) |
| SVG | Vectoriel | Logos, illustrations |

**Preview** (générés automatiquement) :
- Thumbnail : 400x400 px (WebP)
- Preview : 1200x1200 px (WebP)
- Watermarked : 800x800 px avec filigrane

### 7.4 Workflow d'Achat

1. **Ajout panier** : Vérification disponibilité (éditions limitées)
2. **Checkout** : Connexion requise, récapitulatif, email de livraison
3. **Paiement (Stripe)** : Carte bancaire, Apple Pay, Google Pay
4. **Confirmation** : Email, génération liens téléchargement, certificat
5. **Livraison digitale** : Liens valides 30 jours, 5 téléchargements max, accès permanent dans "Mes achats"

### 7.5 Certificat d'Authenticité

Chaque achat génère un **certificat PDF** contenant :
- Titre de l'oeuvre
- Nom de l'artiste
- Date d'achat
- Numéro unique de transaction
- Hash du fichier (preuve d'intégrité)
- Numéro d'édition (si applicable)
- QR code de vérification

### 7.6 Intégration Stripe

**Endpoints** :

| Route | Description |
|-------|-------------|
| `POST /api/v1/orders/checkout` | Créer une session de paiement |
| `POST /api/v1/webhooks/stripe` | Recevoir les événements Stripe |

**Events Stripe gérés** : `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.failed`

**Configuration** :
- Mode live pour production
- Mode test pour développement
- Webhook signature verification obligatoire

---

## 8. MODÈLE ÉCONOMIQUE

### 8.1 Sources de Revenus

| Source | Détail | Tarif |
|--------|--------|-------|
| **Commissions sur ventes** | Standard | 15% par vente |
| | Artistes vérifiés | 10% par vente |
| **Abonnement Artiste Pro** | Commission réduite, analytics avancés, galerie personnalisée, badge vérifié | 9.99€/mois |
| **Services Premium** | Mise en avant | 29€/semaine |
| | Promotion newsletter | 49€ |
| | Featured homepage | 99€ |

### 8.2 Programme Artiste Vérifié

**Critères de vérification** :
- Profil complet (bio, avatar, liens)
- Minimum 10 oeuvres publiées
- Minimum 5 ventes réalisées
- Aucun signalement de contenu
- Identité vérifiée (KYC optionnel pour gros vendeurs)

**Avantages** :
- Badge "Vérifié" sur le profil
- Commission réduite à 10%
- Priorité dans les résultats de recherche
- Accès aux features bêta

### 8.3 Paiement des Artistes

**Méthodes de retrait** :
- Virement bancaire (SEPA)
- PayPal
- Stripe Connect (Express)

**Conditions** :
- Seuil minimum de retrait : 50€
- Fréquence : Sur demande ou automatique (mensuel)
- Délai : 3-5 jours ouvrés

### 8.4 Projections Financières (MVP)

| Métrique | Mois 1 | Mois 6 | Mois 12 |
|----------|--------|--------|---------|
| Artistes inscrits | 50 | 500 | 2,000 |
| Oeuvres publiées | 200 | 5,000 | 25,000 |
| Ventes mensuelles | 20 | 200 | 1,000 |
| GMV mensuel | 1,000€ | 15,000€ | 80,000€ |
| Revenus plateforme | 150€ | 2,250€ | 12,000€ |

---

## 9. ENVIRONNEMENTS

### 9.1 Environnement de Développement Local

**Prérequis** :
- Docker Desktop 24.x+
- Node.js 20 LTS
- Git
- VS Code (recommandé) avec extensions : ESLint, Prettier, Docker, GitLens, Thunder Client

**Configuration Docker Compose** :

Les services suivants sont configurés :
- **postgres** : PostgreSQL 16 Alpine sur port 5432
- **redis** : Redis 7 Alpine sur port 6379
- **backend** : Express.js sur port 4000
- **frontend** : Nuxt.js sur port 3000
- **adminer** : Interface BDD sur port 8080

**Variables d'environnement** :

Les variables essentielles à configurer dans `.env.development` :
- NODE_ENV, PORT, DATABASE_URL, REDIS_URL
- JWT_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_EXPIRES, JWT_REFRESH_EXPIRES
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
- GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
- FRONTEND_URL
- STORAGE_* (pour MinIO en local)

### 9.2 Environnement de Production

**Variables d'environnement** :

Les variables essentielles à configurer dans `.env.production` :
- NODE_ENV=production
- DATABASE_URL avec mot de passe sécurisé
- REDIS_URL avec authentification
- JWT secrets générés avec `openssl rand -base64 64`
- OAuth credentials de production
- URLs de production (FRONTEND_URL, API_URL)
- Configuration S3 pour le stockage
- Clés Stripe live
- DSN Sentry pour le monitoring

---

## 10. INFRASTRUCTURE & DÉPLOIEMENT

### 10.1 Choix de l'hébergement : Hetzner Cloud

**Solution retenue** : **Hetzner Cloud** (pas de serveur physique, containers managés)

| Élément | Configuration |
|---------|---------------|
| **Type** | Cloud containers |
| **Capacité** | 33 containers |
| **Prix** | ~32€/mois |
| **Avantages** | Scalabilité, pas de gestion serveur physique, excellent rapport qualité/prix |

**Pourquoi Hetzner Cloud ?**
- Infrastructure containerisée (pas de VPS physique à gérer)
- Scaling horizontal facile
- Datacenter européen (RGPD compliant)
- Prix très compétitif
- Interface simple et API complète

### 10.2 Architecture Production

**Structure des containers Hetzner Cloud** :

| Container | Service | Port |
|-----------|---------|------|
| **nginx** | Reverse proxy + SSL | 80, 443 |
| **frontend** | Nuxt.js | 3000 |
| **backend** | Express.js | 4000 |
| **postgres** | PostgreSQL 16 | 5432 |
| **redis** | Cache/Sessions | 6379 |

**Routing** :
- makeitart.io -> frontend:3000
- api.makeitart.io -> backend:4000

### 10.3 Sécurisation

**Configuration sécurité** :
- SSL/TLS via Let's Encrypt (auto-renew)
- Réseau privé entre containers
- Variables d'environnement sécurisées
- Secrets managés
- Logs centralisés
- Backups automatiques

### 10.4 Configuration Nginx Production

**Configuration** :
- Redirection HTTP -> HTTPS
- SSL/TLS avec Let's Encrypt
- Headers de sécurité (X-Frame-Options, X-Content-Type-Options, HSTS, etc.)
- Rate limiting sur l'API
- CORS configuré pour le domaine frontend
- Limite upload à 50MB
- Cache des fichiers statiques

---

## 11. CI/CD PIPELINE

### 11.1 Structure GitHub

**Branches** :
- `main` : Production (protégée, merge via PR uniquement)
- `develop` : Intégration (tests automatiques)
- `feature/*` : Fonctionnalités
- `fix/*` : Corrections de bugs
- `hotfix/*` : Corrections urgentes production

**Protection de la branche `main`** :
- Require pull request reviews (1 minimum)
- Require status checks to pass
- Require branches to be up to date
- Include administrators

### 11.2 Workflow CI (Tests)

**Déclencheurs** : Push sur develop, feature/**, fix/** et PR vers main/develop

**Jobs** :
1. **Backend Tests** : Lint, migrations, tests unitaires, tests intégration, coverage
2. **Frontend Tests** : Lint, TypeScript check, build
3. **Security Audit** : npm audit sur backend et frontend

### 11.3 Workflow CD (Déploiement)

**Déclencheur** : Push sur main

**Jobs** :
1. **Build** : Construction et push des images Docker vers GitHub Container Registry
2. **Deploy** : Connexion SSH au VPS, pull des images, backup BDD, déploiement, migrations, health check

### 11.4 Secrets GitHub à configurer

| Secret | Description |
|--------|-------------|
| `VPS_HOST` | IP ou domaine du VPS |
| `VPS_USER` | Utilisateur SSH (deploy) |
| `VPS_SSH_KEY` | Clé privée SSH |
| `SLACK_WEBHOOK` | URL webhook Slack pour notifications |
| `CODECOV_TOKEN` | Token Codecov (optionnel) |

---

## 12. CONFORMITÉ RGPD

### 12.1 Pages Légales Obligatoires

| Page | URL | Contenu |
|------|-----|---------|
| Politique de confidentialité | `/privacy` | Collecte, traitement, droits |
| CGU | `/terms` | Conditions d'utilisation |
| Mentions légales | `/legal` | Éditeur, hébergeur |
| Politique cookies | `/cookies` | Types de cookies, gestion |

### 12.2 Données Collectées

**Données obligatoires** :

| Donnée | Finalité | Base légale | Durée conservation |
|--------|----------|-------------|-------------------|
| Email | Compte utilisateur | Contrat | Durée du compte + 3 ans |
| Nom d'affichage | Identification | Contrat | Durée du compte |
| Adresse IP | Sécurité, logs | Intérêt légitime | 12 mois |
| Historique achats | Comptabilité | Obligation légale | 10 ans |

**Données optionnelles** :

| Donnée | Finalité | Base légale |
|--------|----------|-------------|
| Avatar | Personnalisation | Consentement |
| Bio | Profil public | Consentement |
| Réseaux sociaux | Profil artiste | Consentement |

### 12.3 Consentement Cookies

**Catégories de cookies** :

| Catégorie | Exemples | Consentement |
|-----------|----------|--------------|
| **Essentiels** | Session, CSRF, préférences | Non requis |
| **Analytics** | Google Analytics, Plausible | **Requis** |
| **Marketing** | Facebook Pixel, Google Ads | **Requis** |
| **Fonctionnels** | Chat support, vidéos embed | **Requis** |

**Implémentation** :
- Librairie recommandée : `cookie-consent` ou `tarteaucitron.js`
- Banner au premier accès
- Possibilité de modifier les préférences à tout moment
- Stockage du consentement en BDD (table `consent_records`)

### 12.4 Droits des Utilisateurs

**Fonctionnalités à implémenter** :

| Droit | Implémentation |
|-------|----------------|
| **Accès** | Export des données (JSON/PDF) depuis le dashboard |
| **Rectification** | Édition du profil |
| **Suppression** | Bouton "Supprimer mon compte" avec confirmation |
| **Portabilité** | Export format standard (JSON) |
| **Opposition** | Désinscription newsletter, désactivation analytics |

**Délai de réponse** : 30 jours maximum

### 12.5 Template Politique de Confidentialité

La page doit contenir :
1. Identité du responsable de traitement
2. Coordonnées du DPO
3. Liste des données collectées
4. Finalités et bases légales
5. Durées de conservation
6. Droits des utilisateurs et comment les exercer
7. Politique cookies (ou lien vers page dédiée)
8. Transferts hors UE
9. Contact et réclamation CNIL

---

## 13. ORGANISATION DE L'ÉQUIPE

### 13.1 Philosophie de l'équipe

L'équipe fonctionne en mode **polyvalent** : chaque membre contribue à toutes les parties du projet (frontend, backend, infrastructure, 3D). Il n'y a pas de rôles fixes ou de spécialisations imposées.

**Membres** : Ethan, Iness, Théa, Mimi

**Principes** :
- Chacun peut travailler sur n'importe quelle partie du code
- Les tâches sont assignées selon la disponibilité et l'intérêt
- Le partage de connaissances est encouragé via le pair programming et les code reviews croisées
- Tout le monde participe aux décisions d'architecture

### 13.2 Workflow Git

**Flow** :
- `main` (production) <- `develop` <- `feature/*` ou `fix/*`
- `hotfix/*` -> `main` directement (urgences)

**Conventions de commit** (Conventional Commits) :
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Maintenance

### 13.3 Process de Développement

**Sprint** : 2 semaines

**Cérémonies** :
- **Daily standup** : 15 min, 9h30
- **Sprint planning** : 2h, lundi matin (semaine 1)
- **Sprint review** : 1h, vendredi après-midi (semaine 2)
- **Retrospective** : 30 min, après la review

**Definition of Done** :
- Code reviewé et approuvé par 1 dev minimum
- Tests unitaires écrits (couverture > 80%)
- Tests d'intégration si applicable
- Documentation mise à jour
- Pas d'erreurs ESLint
- Pas de vulnérabilités npm audit high/critical
- Fonctionnalité testée en environnement de dev

### 13.4 Outils Recommandés

| Catégorie | Outil | Usage |
|-----------|-------|-------|
| **Gestion projet** | GitHub Projects / Notion | Kanban, backlog |
| **Communication** | Discord / Slack | Chat équipe |
| **Documentation** | Notion / GitBook | Docs techniques |
| **Design** | Figma | Maquettes, design system |
| **API Testing** | Postman / Thunder Client | Tests manuels API |
| **Monitoring** | Sentry | Erreurs production |
| **Analytics** | Plausible / PostHog | Métriques produit |

---

## 14. LIVRABLES & PLANNING

### 14.1 Phases du Projet

**PHASE 1 - FONDATIONS** :
- Setup infrastructure (Docker, CI/CD, VPS)
- Base de données PostgreSQL + migrations
- API Express.js : structure, auth basique
- Connexion frontend <-> backend

**PHASE 2 - AUTHENTIFICATION** :
- OAuth2 Google + GitHub
- JWT Access/Refresh tokens
- 2FA TOTP
- Gestion des sessions

**PHASE 3 - CORE FEATURES** :
- CRUD Artworks + upload images
- Profils artistes
- Recherche et filtres
- Favoris et collections
- Dashboard utilisateur

**PHASE 4 - E-COMMERCE** :
- Panier
- Checkout + intégration Stripe
- Historique commandes
- Téléchargement oeuvres achetées

**PHASE 5 - FINALISATION** :
- Pages légales (RGPD, CGU)
- Bandeau cookies
- Tests de charge
- Audit sécurité
- Documentation finale
- Mise en production

### 14.2 Livrables par Phase

**Phase 1 - Fondations** :
- Repository GitHub configuré (branches, protection)
- Docker Compose dev fonctionnel
- VPS provisionné et sécurisé
- CI/CD pipeline opérationnel
- BDD PostgreSQL avec schéma initial
- API Express : health check, structure de base
- Frontend connecté à l'API

**Phase 2 - Authentification** :
- Inscription/Connexion email + password
- OAuth2 Google fonctionnel
- OAuth2 GitHub fonctionnel
- 2FA TOTP avec QR code et backup codes
- Refresh token rotation
- Rate limiting sur les routes auth

**Phase 3 - Core Features** :
- CRUD complet artworks
- Upload images (S3/MinIO)
- Profil artiste complet
- Recherche full-text
- Filtres (catégorie, prix, tags)
- Système de favoris
- Collections personnelles

**Phase 4 - E-Commerce** :
- Ajout/suppression panier
- Page checkout
- Intégration Stripe
- Confirmation commande par email
- Page historique commandes
- Téléchargement sécurisé des fichiers

**Phase 5 - Finalisation** :
- Page Politique de confidentialité
- Page CGU
- Bandeau consentement cookies
- Export données utilisateur (RGPD)
- Suppression compte (RGPD)
- Tests de performance (>100 req/s)
- Audit sécurité (OWASP top 10)
- Documentation API (Swagger/OpenAPI)

---

## 15. ANNEXES

### 15.1 Checklist Sécurité (OWASP Top 10)

- **A01 - Broken Access Control** : Vérifier les autorisations à chaque endpoint
- **A02 - Cryptographic Failures** : HTTPS partout, mots de passe hashés (bcrypt)
- **A03 - Injection** : Requêtes paramétrées, validation inputs
- **A04 - Insecure Design** : Threat modeling, security by design
- **A05 - Security Misconfiguration** : Headers sécurité, pas de debug en prod
- **A06 - Vulnerable Components** : npm audit, dépendances à jour
- **A07 - Authentication Failures** : Rate limiting, MFA, session management
- **A08 - Integrity Failures** : Vérification des mises à jour, CI/CD sécurisé
- **A09 - Logging Failures** : Logs des événements sécurité, alerting
- **A10 - SSRF** : Validation des URLs externes

### 15.2 Checklist Performance

- Pagination sur toutes les listes
- Index BDD sur les colonnes filtrées/triées
- Cache Redis pour les données fréquentes
- Compression gzip/brotli (Nginx)
- Images optimisées (WebP, lazy loading)
- CDN pour les assets statiques (optionnel)
- Connection pooling PostgreSQL
- Queries analysées avec EXPLAIN ANALYZE

### 15.3 Endpoints API (aperçu)

**Authentication** :
- POST /api/v1/auth/register, login, logout, refresh
- POST /api/v1/auth/google, github
- POST /api/v1/auth/2fa/setup, verify, disable

**Users** :
- GET/PUT/DELETE /api/v1/users/me
- GET /api/v1/users/me/favorites, orders
- POST /api/v1/users/me/export (RGPD)

**Artists** :
- GET /api/v1/artists, artists/:id
- POST /api/v1/artists (become artist)
- PUT /api/v1/artists/:id
- GET /api/v1/artists/:id/artworks
- POST/DELETE /api/v1/artists/:id/follow

**Artworks** :
- GET /api/v1/artworks, artworks/:id
- POST/PUT/DELETE /api/v1/artworks/:id
- POST/DELETE /api/v1/artworks/:id/favorite

**Categories** :
- GET /api/v1/categories

**Collections** :
- GET/POST/PUT/DELETE /api/v1/collections
- POST/DELETE /api/v1/collections/:id/artworks

**Cart** :
- GET /api/v1/cart
- POST/DELETE /api/v1/cart/items
- DELETE /api/v1/cart (clear)

**Orders** :
- POST /api/v1/orders/checkout
- GET /api/v1/orders/:id
- GET /api/v1/orders/:id/download/:itemId

**Reviews** :
- GET /api/v1/artworks/:id/reviews
- POST /api/v1/artworks/:id/reviews
- PUT/DELETE /api/v1/reviews/:id

**Admin** (protected) :
- GET /api/v1/admin/users, orders, stats

### 15.4 Contacts & Ressources

**Documentation** :
- [Nuxt.js](https://nuxt.com/docs)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Prisma](https://www.prisma.io/docs)
- [Passport.js](http://www.passportjs.org/)
- [Docker](https://docs.docker.com/)

**Support équipe** :
- Channel Discord : #make-it-art-dev
- Documentation interne : Notion

### 15.5 Glossaire

| Terme | Définition |
|-------|------------|
| **GMV** | Gross Merchandise Value - Valeur totale des ventes sur la plateforme |
| **JWT** | JSON Web Token - Standard pour l'authentification |
| **TOTP** | Time-based One-Time Password - Code temporaire pour 2FA |
| **SSR** | Server-Side Rendering - Rendu côté serveur |
| **WebGL** | Web Graphics Library - API pour le rendu 3D dans le navigateur |
| **LOD** | Level of Detail - Technique d'optimisation 3D |
| **KYC** | Know Your Customer - Vérification d'identité |
| **RGPD** | Règlement Général sur la Protection des Données |

### 15.6 Références Design

**Inspirations visuelles** :
- [ArtStation](https://www.artstation.com) - Référence marketplace art
- [Cyberpunk 2077](https://www.cyberpunk.net) - Esthétique néon
- [Superrare](https://superrare.com) - Expérience achat NFT
- [Dribbble](https://dribbble.com) - UX/UI inspiration

**Assets 3D recommandés** :
- [Sketchfab](https://sketchfab.com) - Modèles 3D
- [Poly Haven](https://polyhaven.com) - HDRIs, textures
- [Kenney](https://kenney.nl) - Assets UI 3D

---

## VALIDATION DU CAHIER DES CHARGES

| Membre | Date | Signature |
|--------|------|-----------|
| Ethan | | |
| Iness | | |
| Théa | | |
| Mimi | | |

---

<div align="center">

**Document rédigé en Janvier 2026**
**Version 2.0**

---

**Make It Art** — *Where Art Meets the Future*

[GitHub](https://github.com/inessben/make-it-art) | [Discord](https://discord.gg/37T53Q6FSU)

</div>
