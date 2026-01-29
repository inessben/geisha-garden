# Guide de Contribution - Make It Art

Merci de votre intérêt pour contribuer à **Make It Art** ! Ce guide vous aidera à configurer votre environnement de développement.

---

## Table des matières

- [Prérequis](#prérequis)
- [Installation complète](#installation-complète)
- [Configuration](#configuration)
- [Développement](#développement)
- [Tests](#tests)
- [Conventions](#conventions)
- [Workflow Git](#workflow-git)

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

### Outils de base
- **Node.js** >= 18.0.0 ([Télécharger](https://nodejs.org/))
- **npm** >= 9.0.0 (inclus avec Node.js)
- **Git** ([Télécharger](https://git-scm.com/))
- **PostgreSQL** >= 16 ([Télécharger](https://www.postgresql.org/download/))
- **Redis** >= 7.x ([Télécharger](https://redis.io/download/))
- **Docker** (recommandé) ([Télécharger](https://www.docker.com/))

---

## Installation complète

### 1. Cloner le repository

Fork le projet sur GitHub puis clone ton fork. Ajoute ensuite le repository original comme remote upstream.

### 2. Installer les dépendances

**Backend** : Lancer `npm install` dans le dossier backend.

**Frontend** : Lancer `npm install` dans le dossier frontend.

**Dépendances principales** :
- Backend : express, prisma, passport, stripe, etc.
- Frontend : nuxt, vue, three.js, tailwindcss, pinia, etc.

---

## Configuration

### 1. Variables d'environnement

Copier le fichier `.env.example` vers `.env` à la racine du projet et remplir les variables nécessaires.

**Variables à configurer** :
- **Base & Database** : NODE_ENV, PORT, DATABASE_URL
- **JWT** : JWT_SECRET, JWT_EXPIRE, JWT_REFRESH_EXPIRE
- **OAuth2 Google** : Créer des credentials sur Google Cloud Console
- **OAuth2 GitHub** : Créer une OAuth App sur GitHub Developer Settings
- **2FA TOTP** : TOTP_ISSUER, TOTP_WINDOW, TOTP_STEP
- **AWS S3** (optionnel) : Credentials pour le stockage des fichiers
- **Stripe** (optionnel) : Clés API pour les paiements
- **Blockchain** (optionnel) : Configuration Solana/Ethereum

### 2. Démarrer les services

Avec Docker Compose, lancer tous les services (PostgreSQL, Redis, Backend, Frontend) en une seule commande.

Sans Docker, démarrer manuellement PostgreSQL et Redis, puis lancer le backend et le frontend séparément.

---

## Développement

### Lancer le projet en mode développement

1. **Backend API** : Démarre sur le port 4000
2. **Frontend Nuxt** : Accessible sur le port 3000
3. **Base de données** : PostgreSQL sur le port 5432

### Accès

- Frontend : http://localhost:3000
- API : http://localhost:4000
- Adminer (BDD) : http://localhost:8080

---

## Tests

### Backend
- Tests unitaires : `npm test`
- Couverture : `npm run test:coverage`

### Frontend
- Tests : `npm run test`

---

## Conventions

### Commits (Conventional Commits)

Format : `<type>(<scope>): <description>`

**Types** :
| Type | Description |
|------|-------------|
| feat | Nouvelle fonctionnalité |
| fix | Correction de bug |
| docs | Documentation |
| style | Formatage (pas de changement de code) |
| refactor | Refactoring |
| test | Ajout/modification de tests |
| chore | Maintenance (build, dépendances) |
| perf | Amélioration de performance |

### Code Style

**Backend (JavaScript/Node.js)** :
- Utiliser `const` et `let` (pas `var`)
- Points-virgules obligatoires
- 2 espaces d'indentation
- Nommer les fonctions en camelCase

**Frontend (Vue/TypeScript)** :
- Composition API (pas Options API)
- TypeScript pour les types
- Composants en PascalCase
- Props typées

---

## Workflow Git

### 1. Synchroniser avec le repo principal

Fetch upstream, checkout main, merge upstream/main.

### 2. Créer une branche pour votre feature

Nommer les branches : `feature/nom-de-la-feature` ou `fix/nom-du-bug`

### 3. Faire vos modifications

Ajouter les fichiers modifiés et commit avec un message conventionnel.

### 4. Pousser vers votre fork

Push vers origin sur votre branche feature.

### 5. Créer une Pull Request

1. Aller sur GitHub
2. Cliquer sur "Compare & pull request"
3. Remplir le template de PR :
   - **Description** : Que fait votre PR ?
   - **Tests** : Comment tester ?
   - **Screenshots** : Si changement visuel
4. Assigner des reviewers
5. Attendre la review et les retours

### 6. Mettre à jour votre PR après review

Faire les modifications demandées, commit et push.

---

## Checklist avant PR

- [ ] Le code compile sans erreurs
- [ ] Les tests passent (`npm test`)
- [ ] Le code est formaté correctement
- [ ] Les commits suivent les conventions
- [ ] La documentation est à jour (si nécessaire)
- [ ] Les variables sensibles ne sont pas commitées
- [ ] Le `.env.example` est à jour (si nouvelles variables)

---

## Ressources

### Documentation officielle
- [Node.js](https://nodejs.org/docs)
- [Express](https://expressjs.com/)
- [Nuxt.js](https://nuxt.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Prisma](https://www.prisma.io/docs)

---

## Support

- **Issues** : [GitHub Issues](https://github.com/inessben/make-it-art/issues)
- **Discussions** : [GitHub Discussions](https://github.com/inessben/make-it-art/discussions)

---

## Merci !

Merci de contribuer à **Make It Art** ! Chaque contribution compte, qu'elle soit petite ou grande.

**Where art meets the future**

