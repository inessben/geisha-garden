# ROADMAP MAKE IT ART

> **Version 2.0** — Janvier 2026

<div align="center">

**Make It Art** — *Where Art Meets the Future*

</div>

---

## ÉQUIPE

**Membres** : Ethan, Iness, Théa, Mimi

**Philosophie** : Équipe polyvalente où chacun contribue à toutes les parties du projet.

---

## LÉGENDE

| Priorité | Description |
|----------|-------------|
| **Élevée** | Bloquant pour le MVP |
| **Moyenne** | Nécessaire mais non bloquant |
| **Faible** | Optionnel / Nice to have |

---

## STRUCTURATION

| # | Tâche | Priorité |
|---|-------|----------|
| S1 | Définition de l'architecture technique | Élevée |
| S2 | Définition du business model | Moyenne |
| S3 | Définition des stratégies SEO | Faible |
| S4 | Étude des solutions NFT et wallets ETH | Élevée |
| S5 | Tests de marketplaces décentralisées | Élevée |
| S6 | Rédaction du cahier des charges | Élevée |

<details>
<summary><strong>Détails des tâches</strong></summary>

**S1 - Définition de l'architecture technique**
- Choix du stack (Nuxt 4, Express, PostgreSQL, Three.js)
- Architecture monorepo (frontend/, backend/, infrastructure/)
- Définition des environnements (dev, staging, prod)
- Hébergement : Hetzner Cloud (33 containers, ~32€/mois)

**S2 - Définition du business model**
- Commission plateforme (15% standard, 10% artistes vérifiés)
- Abonnement Artiste Pro (9.99€/mois)
- Services premium (mise en avant, promotion)
- Projections financières MVP

**S3 - Définition des stratégies SEO**
- Analyse mots-clés art digital
- Structure URLs optimisée
- Meta tags et Open Graph
- Stratégie de contenu

**S4 - Étude des solutions NFT et wallets ETH**
- Comparatif Solana vs Ethereum vs Polygon
- Intégration wallet (MetaMask, Phantom)
- Smart contracts pour certificats
- Coûts de gas et alternatives

**S5 - Tests de marketplaces décentralisées**
- Analyse OpenSea, Rarible, Foundation
- Benchmark fonctionnalités
- UX/UI inspirations
- Points de différenciation

**S6 - Rédaction du cahier des charges**
- Spécifications fonctionnelles
- Spécifications techniques
- User stories et parcours
- Maquettes wireframes

</details>

---

## DESIGN

| # | Tâche | Priorité |
|---|-------|----------|
| D1 | Hero + Parallax landing page | Moyenne |
| D2 | Prototype V2 (Figma) | Faible |
| D3 | Maquette du prototype MVP | Élevée |
| D4 | Design System complet | Moyenne |

<details>
<summary><strong>Détails des tâches</strong></summary>

**D1 - Hero + Parallax landing page**
- Animation Three.js en hero
- Effet parallax au scroll
- CTA principal visible
- Responsive mobile/desktop

**D2 - Prototype V2 (Figma)**
- Itération sur les retours utilisateurs
- Nouvelles fonctionnalités v2
- Animations et micro-interactions
- Exports pour développeurs

**D3 - Maquette du prototype MVP**
- Pages principales (Home, Galerie, Artwork, Profil, Dashboard)
- Composants réutilisables
- États (hover, active, disabled)
- Mode sombre cyberpunk

**D4 - Design System complet**
- Palette couleurs (violet, cyan, magenta, noir)
- Typographie (titres, corps, code)
- Spacing et grille
- Composants UI (boutons, inputs, cards, modals)
- Iconographie

</details>

---

## DÉVELOPPEMENT (MVP)

| # | Tâche | Priorité |
|---|-------|----------|
| DEV1 | Infrastructure & DevOps (Hetzner Cloud) | Élevée |
| DEV2 | Base de données & MLD | Élevée |
| DEV3 | Backend API | Élevée |
| DEV4 | Authentification complète | Élevée |
| DEV5 | Front-end core | Moyenne |
| DEV6 | Expérience 3D immersive | Élevée |
| DEV7 | Gestion des artworks | Élevée |
| DEV8 | Profils artistes | Moyenne |
| DEV9 | Paiement sécurisé (Stripe) | Élevée |
| DEV10 | Système de téléchargement | Élevée |
| DEV11 | Dashboard utilisateur | Moyenne |
| DEV12 | Déploiement du MVP | Élevée |

<details>
<summary><strong>Détails des tâches</strong></summary>

**DEV1 - Infrastructure & DevOps (Hetzner Cloud)**
- Créer le repository GitHub en monorepo
- Configurer les branches protégées (main, develop)
- Provisionner Hetzner Cloud (33 containers, ~32€/mois)
- Configurer les containers Docker
- Configurer Nginx en reverse proxy avec SSL
- Mettre en place les pipelines CI/CD (GitHub Actions)

**DEV2 - Base de données & ORM**
- Créer le MLD (Modèle Logique de Données) avec Mermaid.js ou Azimutt
- Installer et configurer PostgreSQL 16
- Configurer Prisma ORM avec migrations
- Créer les schémas (users, artists, artworks, orders, auth)
- Ajouter les index d'optimisation
- Implémenter les triggers automatiques
- Créer les seeders de données de test

**DEV3 - Backend API**
- Initialiser Express avec TypeScript
- Configurer ESLint, Prettier, variables d'environnement
- Établir les connexions PostgreSQL et Redis
- Implémenter le gestionnaire d'erreurs global
- Configurer le logging (Morgan + Winston)
- Créer la route health check
- Configurer Jest pour les tests

**DEV4 - Authentification complète**
- Implémenter register/login avec JWT
- Créer le middleware authRequired
- Implémenter refresh token et logout
- Ajouter le rate limiting
- Configurer OAuth2 (Google, GitHub)
- Implémenter 2FA TOTP avec backup codes
- Créer les pages frontend (Login, Signup, 2FA)

**DEV5 - Front-end core**
- Configurer les variables d'environnement Nuxt
- Définir le design system (couleurs, typo, spacing)
- Créer les composants UI de base (Button, Input, Modal, Card)
- Implémenter le layout principal (Navbar, Footer)
- Créer le composable useApi avec interceptors
- Implémenter la gestion d'erreurs (toasts)

**DEV6 - Expérience 3D immersive**
- Initialiser Three.js (scene, renderer, camera)
- Créer le skybox cyberpunk et système d'éclairage néon
- Implémenter OrbitControls (desktop + mobile)
- Créer les cadres flottants pour les oeuvres
- Implémenter le raycasting pour la sélection
- Ajouter le chargement lazy et optimisation LOD
- Créer le mode fallback 2D (grille)

**DEV7 - Gestion des artworks**
- Implémenter l'upload d'images vers S3
- Valider les fichiers (type, taille, dimensions)
- Créer le CRUD /artworks
- Ajouter filtres, tri et recherche full-text
- Implémenter les favoris et collections
- Créer les pages frontend (Galerie, Détail artwork)

**DEV8 - Profils artistes**
- Implémenter le CRUD /artists
- Créer le système de follow/unfollow
- Calculer les stats artiste (ventes, revenus)
- Créer les pages frontend (Devenir artiste, Profil artiste)

**DEV9 - Paiement sécurisé (Stripe)**
- Configurer le compte Stripe et webhooks
- Implémenter le CRUD /cart
- Créer POST /orders/checkout
- Implémenter le webhook Stripe
- Envoyer l'email de confirmation
- Intégrer Stripe Elements côté frontend
- Créer les pages (Panier, Checkout, Confirmation)

**DEV10 - Système de téléchargement**
- Générer les liens de téléchargement signés
- Implémenter GET /orders/:id/download/:itemId
- Générer le certificat d'authenticité PDF
- Créer la page Détail commande avec downloads

**DEV11 - Dashboard utilisateur**
- Créer la page Dashboard avec tabs
- Implémenter les onglets (Profil, Paramètres, Favoris)
- Créer l'onglet Mes Oeuvres (artiste)
- Créer l'onglet Statistiques (artiste)
- Créer l'onglet Collections

**DEV12 - Déploiement du MVP**
- Configurer le DNS et le domaine
- Configurer le certificat SSL production
- Déployer les containers Docker
- Vérifier les variables d'environnement prod
- Tester le parcours utilisateur complet

</details>

---

## LANCEMENT + COMMUNICATION

| # | Tâche | Priorité |
|---|-------|----------|
| L1 | Conformité RGPD | Élevée |
| L2 | Tests & Qualité | Élevée |
| L3 | Documentation | Moyenne |
| L4 | Optimisation SEO & Performance | Moyenne |
| L5 | Campagne de lancement | Faible |
| L6 | Partenariats artistes et galeries | Moyenne |

<details>
<summary><strong>Détails des tâches</strong></summary>

**L1 - Conformité RGPD**
- Implémenter les endpoints consent (POST/PUT /consent)
- Implémenter l'export données (POST /users/me/export)
- Implémenter la suppression compte (DELETE /users/me)
- Créer le bandeau de consentement cookies
- Créer les pages légales (CGU, Mentions légales, Politique confidentialité, Cookies)
- Ajouter les boutons Export/Supprimer dans le dashboard

**L2 - Tests & Qualité**
- Corriger les vulnérabilités npm audit
- Réaliser l'audit OWASP top 10
- Écrire les tests E2E avec Playwright
- Atteindre 80% de couverture de tests
- Exécuter les tests de charge avec k6

**L3 - Documentation**
- Générer la documentation API Swagger
- Rédiger le README Backend
- Rédiger le README Frontend
- Rédiger le guide de déploiement
- Rédiger le runbook incidents

**L4 - Optimisation SEO & Performance**
- Configurer les meta tags et Open Graph
- Optimiser les images (WebP, lazy loading)
- Configurer le cache et CDN
- Améliorer le Lighthouse score (>90)
- Configurer Plausible pour les analytics

**L5 - Campagne de lancement**
- Préparer les assets marketing
- Rédiger les posts réseaux sociaux
- Contacter les influenceurs art digital
- Préparer le communiqué de presse
- Planifier le lancement (date, heure)

**L6 - Partenariats artistes et galeries**
- Identifier les artistes cibles
- Contacter les galeries partenaires
- Négocier les conditions
- Onboarder les premiers artistes
- Collecter les témoignages

</details>

---

## AMÉLIORATION (Post-MVP)

| # | Tâche | Priorité |
|---|-------|----------|
| A1 | Ajout du paiement crypto et NFTs | Élevée |
| A2 | Développement de partenariats | Élevée |
| A3 | Intégration de nouvelles fonctionnalités immersives | Élevée |
| A4 | Système d'enchères en temps réel | Moyenne |
| A5 | Application mobile | Moyenne |
| A6 | Galeries virtuelles personnalisées | Faible |

<details>
<summary><strong>Détails des tâches</strong></summary>

**A1 - Ajout du paiement crypto et NFTs**
- Intégrer les wallets (MetaMask, Phantom)
- Déployer les smart contracts (Solana/Polygon)
- Créer le mint de NFTs à l'achat
- Implémenter le paiement en crypto
- Afficher la blockchain proof sur les certificats

**A2 - Développement de partenariats**
- Partenariats avec écoles d'art
- Collaborations avec galeries physiques
- Programme ambassadeurs artistes
- Intégrations avec autres plateformes

**A3 - Intégration de nouvelles fonctionnalités immersives**
- Mode VR (WebXR)
- Visites guidées virtuelles
- Chat en temps réel dans la galerie
- Événements live (vernissages virtuels)

**A4 - Système d'enchères en temps réel**
- WebSocket pour les enchères live
- Timer et notifications
- Système de surenchère automatique
- Historique des enchères

**A5 - Application mobile**
- App React Native / Flutter
- Notifications push
- Mode AR pour visualiser les oeuvres
- Paiement mobile (Apple Pay, Google Pay)

**A6 - Galeries virtuelles personnalisées**
- Éditeur de galerie 3D pour artistes
- Templates de galeries
- Personnalisation des lumières et ambiance
- Partage de galeries (liens, embed)

</details>

---

## ADMIN (Backoffice)

| # | Tâche | Priorité |
|---|-------|----------|
| AD1 | Dashboard admin | Moyenne |
| AD2 | Gestion des utilisateurs | Élevée |
| AD3 | Modération du contenu | Élevée |
| AD4 | Gestion financière | Élevée |
| AD5 | Analytics et rapports | Moyenne |

<details>
<summary><strong>Détails des tâches</strong></summary>

**AD1 - Dashboard admin**
- Vue d'ensemble (stats clés, graphiques)
- Alertes et notifications
- Accès rapide aux fonctions principales

**AD2 - Gestion des utilisateurs**
- Liste des utilisateurs avec recherche/filtres
- Détail utilisateur (profil, activité, achats)
- Actions (ban, vérification artiste, reset password)
- Gestion des rôles et permissions

**AD3 - Modération du contenu**
- File de modération des artworks
- Signalements utilisateurs
- Actions (approuver, rejeter, supprimer)
- Blacklist mots-clés

**AD4 - Gestion financière**
- Suivi des transactions
- Gestion des paiements artistes
- Rapports de revenus
- Remboursements et litiges

**AD5 - Analytics et rapports**
- Métriques business (GMV, conversions, rétention)
- Rapports automatisés
- Export CSV/PDF
- Intégration Metabase/Grafana

</details>

---

## MILESTONES

| Milestone | Critères de succès |
|-----------|-------------------|
| **M1: Structuration** | Architecture validée, cahier des charges complété |
| **M2: Design Ready** | Maquettes MVP validées, design system défini |
| **M3: Backend Ready** | API fonctionnelle, auth complète, BDD opérationnelle |
| **M4: Frontend Ready** | UI core, galerie 3D, parcours utilisateur complet |
| **M5: E-Commerce Ready** | Paiement Stripe, téléchargements, emails |
| **M6: Launch Ready** | RGPD, tests, documentation, monitoring |
| **M7: MVP LIVE** | Production déployée, premiers utilisateurs |
| **M8: Post-Launch** | Crypto/NFT, nouvelles fonctionnalités |

---

## CHECKLIST IMPORT

- [ ] Créer le board avec les colonnes (Structuration, Design, Développement, Lancement, Amélioration, Admin)
- [ ] Importer les tâches principales
- [ ] Ajouter les détails en commentaires de chaque tâche
- [ ] Configurer les priorités (Élevée, Moyenne, Faible)
- [ ] Ajouter les due dates par milestone

---

<div align="center">

**Document généré en Janvier 2026**
**Version 2.0**

---

**Make It Art** — *Where Art Meets the Future*

</div>
