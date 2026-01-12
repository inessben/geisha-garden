# 📋 CAHIER DES CHARGES TECHNIQUE
## Make It Art - Marketplace d'Art Digital

**Version** : 1.0  
**Date** : 18 Décembre 2025  
**Équipe** : 4 développeurs  
**Statut** : MVP → Production

---

## 📑 TABLE DES MATIÈRES

1. [Présentation du Projet](#1-présentation-du-projet)
2. [Architecture Technique](#2-architecture-technique)
3. [Base de Données](#3-base-de-données)
4. [Authentification & Sécurité](#4-authentification--sécurité)
5. [Environnements](#5-environnements)
6. [Infrastructure & Déploiement](#6-infrastructure--déploiement)
7. [CI/CD Pipeline](#7-cicd-pipeline)
8. [Conformité RGPD](#8-conformité-rgpd)
9. [Organisation de l'Équipe](#9-organisation-de-léquipe)
10. [Livrables & Planning](#10-livrables--planning)
11. [Annexes](#11-annexes)

---

## 1. PRÉSENTATION DU PROJET

### 1.1 Description
**Make It Art** est une marketplace d'art digital immersive avec une esthétique cyberpunk. La plateforme permet aux artistes de vendre leurs œuvres numériques et aux collectionneurs de les acheter, avec une future intégration crypto/NFT.

### 1.2 Objectifs Fonctionnels
- Galerie d'œuvres d'art avec navigation 3D immersive
- Gestion des profils artistes et collectionneurs
- Système de vente/achat d'œuvres digitales
- Système de favoris et collections
- Recherche et filtres avancés
- Dashboard artiste avec statistiques
- Intégration wallet crypto (v2)

### 1.3 Contraintes Techniques
- Application scalable pour une base de données conséquente
- Performance optimale (temps de réponse < 200ms pour les API)
- Haute disponibilité (uptime > 99.5%)
- Sécurité renforcée (données utilisateurs, paiements)

---

## 2. ARCHITECTURE TECHNIQUE

### 2.1 Stack Technologique

| Couche | Technologie | Version | Justification |
|--------|-------------|---------|---------------|
| **Frontend** | Nuxt.js | 4.x | SSR, SEO, performances |
| **Frontend** | Vue.js | 3.x | Composition API, TypeScript |
| **Frontend** | Three.js | 0.181.x | Rendu 3D WebGL |
| **Backend** | Node.js | 20 LTS | Stabilité, support long terme |
| **Backend** | Express.js | 4.x | Framework minimaliste, flexible |
| **BDD** | PostgreSQL | 16.x | Voir justification §3.1 |
| **Cache** | Redis | 7.x | Sessions, cache requêtes |
| **Conteneurs** | Docker | 24.x | Isolation, reproductibilité |
| **Orchestration** | Docker Compose | 2.x | Dev local multi-services |
| **Reverse Proxy** | Nginx | 1.25.x | Load balancing, SSL |

### 2.2 Architecture Globale

```
┌─────────────────────────────────────────────────────────────────┐
│                         INTERNET                                 │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NGINX (Reverse Proxy)                        │
│                    SSL/TLS Termination                          │
│                    Load Balancing                               │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┴───────────────┐
                ▼                               ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│      FRONTEND (Nuxt)      │   │      BACKEND (Express)    │
│      Container: 3000      │   │      Container: 4000      │
└───────────────────────────┘   └───────────────────────────┘
                                               │
                        ┌──────────────────────┼──────────────────────┐
                        ▼                      ▼                      ▼
            ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐
            │    PostgreSQL     │  │      Redis        │  │   File Storage    │
            │   Container: 5432 │  │  Container: 6379  │  │   (S3/MinIO)      │
            └───────────────────┘  └───────────────────┘  └───────────────────┘
```

### 2.3 Structure des Repositories

```
make-it-art/
├── frontend/                    # Repository Nuxt.js (existant)
│   ├── assets/
│   ├── components/
│   ├── composables/
│   ├── pages/
│   ├── public/
│   ├── Dockerfile
│   └── nuxt.config.ts
│
├── backend/                     # Repository Express.js (à créer)
│   ├── src/
│   │   ├── config/             # Configuration (DB, auth, env)
│   │   │   ├── database.js     # Connexion PostgreSQL
│   │   │   ├── redis.js        # Connexion Redis
│   │   │   └── auth.js         # Config OAuth, JWT
│   │   │
│   │   ├── models/             # M - Modèles (Sequelize/Prisma)
│   │   │   ├── User.js
│   │   │   ├── Artist.js
│   │   │   ├── Artwork.js
│   │   │   ├── Order.js
│   │   │   └── index.js        # Export tous les modèles
│   │   │
│   │   ├── views/              # V - Réponses JSON (templates email)
│   │   │   └── emails/         # Templates emails (EJS/Handlebars)
│   │   │
│   │   ├── controllers/        # C - Contrôleurs (logique métier)
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── artistController.js
│   │   │   ├── artworkController.js
│   │   │   ├── orderController.js
│   │   │   └── index.js
│   │   │
│   │   ├── routes/             # Définition des routes → controllers
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── artist.routes.js
│   │   │   ├── artwork.routes.js
│   │   │   ├── order.routes.js
│   │   │   └── index.js        # Router principal
│   │   │
│   │   ├── middlewares/        # Middlewares Express
│   │   │   ├── auth.js         # Vérification JWT
│   │   │   ├── validate.js     # Validation Joi/Zod
│   │   │   ├── upload.js       # Multer pour fichiers
│   │   │   ├── rateLimiter.js  # Rate limiting
│   │   │   └── errorHandler.js # Gestion erreurs globale
│   │   │
│   │   ├── utils/              # Helpers
│   │   │   ├── jwt.js          # Génération/vérification tokens
│   │   │   ├── hash.js         # Bcrypt helpers
│   │   │   ├── email.js        # Envoi emails
│   │   │   └── storage.js      # Upload S3/MinIO
│   │   │
│   │   └── app.js              # Point d'entrée Express
│   │
│   ├── tests/
│   │   ├── unit/               # Tests unitaires (controllers)
│   │   └── integration/        # Tests API (supertest)
│   │
│   ├── migrations/             # Migrations BDD
│   ├── seeders/                # Données de test
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
│
├── infrastructure/              # Configuration infra
│   ├── docker/
│   │   ├── docker-compose.yml
│   │   ├── docker-compose.prod.yml
│   │   └── nginx/
│   │       └── nginx.conf
│   ├── scripts/
│   │   ├── deploy.sh
│   │   ├── backup.sh
│   │   └── setup-vps.sh
│   └── docs/
│       └── deployment.md
│
└── .github/
    └── workflows/
        ├── ci.yml              # Tests automatiques
        └── cd.yml              # Déploiement production
```

### 2.4 Architecture MVC

Le backend suit le pattern **MVC (Model-View-Controller)** adapté pour une API REST :

```
┌─────────────────────────────────────────────────────────────────┐
│                        REQUÊTE HTTP                              │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ROUTES (routes/)                            │
│              Définit les endpoints et middlewares                │
│         Ex: router.post('/artworks', auth, artworkController.create)│
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   MIDDLEWARES (middlewares/)                     │
│           Auth, Validation, Rate Limiting, Upload                │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                  CONTROLLER (controllers/)                       │
│              Logique métier, orchestration                       │
│         • Reçoit req, res                                        │
│         • Appelle les Models                                     │
│         • Retourne la réponse JSON                               │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MODEL (models/)                              │
│              Accès BDD via Sequelize/Prisma                      │
│         • Définition du schéma                                   │
│         • Requêtes CRUD                                          │
│         • Validations données                                    │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      RÉPONSE JSON                                │
└─────────────────────────────────────────────────────────────────┘
```

**Rôle de chaque couche** :

| Couche | Responsabilité | Exemple |
|--------|----------------|---------|
| **Routes** | Mapping URL → Controller | `POST /api/v1/artworks` → `artworkController.create` |
| **Middlewares** | Traitements transverses | Auth JWT, validation body, upload fichiers |
| **Controllers** | Logique métier | Créer artwork, vérifier droits, appeler Model |
| **Models** | Accès données | `Artwork.create()`, `Artwork.findAll()` |
| **Views** | Templates (emails) | Email de confirmation commande |

**Exemple de flux** - Création d'un artwork :

```javascript
// routes/artwork.routes.js
router.post('/', 
  authMiddleware,           // 1. Vérifie JWT
  upload.single('image'),   // 2. Upload image
  validate(artworkSchema),  // 3. Valide les données
  artworkController.create  // 4. Appelle le controller
);

// controllers/artworkController.js
exports.create = async (req, res, next) => {
  try {
    const { title, description, price, categoryId } = req.body;
    const artistId = req.user.artistId;
    
    // Appel au Model
    const artwork = await Artwork.create({
      title, description, price, categoryId, artistId,
      imageUrl: req.file.location
    });
    
    res.status(201).json({ success: true, data: artwork });
  } catch (error) {
    next(error); // Passe au errorHandler
  }
};

// models/Artwork.js (Sequelize)
module.exports = (sequelize, DataTypes) => {
  const Artwork = sequelize.define('Artwork', {
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    // ...
  });
  
  Artwork.associate = (models) => {
    Artwork.belongsTo(models.Artist);
    Artwork.belongsTo(models.Category);
  };
  
  return Artwork;
};
```

### 2.5 API REST - Conventions

**Base URL** : `https://api.makeitart.io/v1`

**Format des réponses** :
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

**Format des erreurs** :
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [...]
  }
}
```

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

## 3. BASE DE DONNÉES

### 3.1 Choix du SGBD : PostgreSQL

**❌ Pourquoi PAS MongoDB ?**

| Critère | MongoDB | PostgreSQL |
|---------|---------|------------|
| Relations complexes | ❌ Difficile (embedded docs, références) | ✅ Natif (FK, JOINs) |
| Transactions ACID | ⚠️ Limité (multi-documents) | ✅ Complet |
| Requêtes complexes | ❌ Agrégations limitées | ✅ SQL puissant |
| Intégrité des données | ❌ Pas de schéma strict | ✅ Contraintes fortes |
| Scalabilité lecture | ✅ Bon | ✅ Bon avec réplication |
| Données relationnelles | ❌ Anti-pattern | ✅ Conçu pour |

**✅ Pourquoi PostgreSQL ?**

1. **Données fortement relationnelles** : Users ↔ Artworks ↔ Orders ↔ Collections
2. **Transactions financières** : ACID complet obligatoire pour les paiements
3. **Requêtes complexes** : Recherche multi-critères, statistiques, agrégations
4. **Intégrité référentielle** : Foreign keys, cascades, contraintes
5. **JSON natif** : JSONB pour les métadonnées flexibles
6. **Full-text search** : Recherche intégrée performante
7. **Extensions** : PostGIS (géolocalisation), pg_trgm (fuzzy search)
8. **Maturité** : 35+ ans, communauté massive, documentation excellente

### 3.2 Modélisation des Données (SQL)

```sql
-- =============================================
-- SCHÉMA BASE DE DONNÉES MAKE IT ART
-- PostgreSQL 16.x
-- =============================================

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- Recherche fuzzy

-- =============================================
-- TABLE: users
-- =============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),  -- NULL si OAuth only
    username VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'artist', 'admin')),
    
    -- OAuth
    oauth_provider VARCHAR(20),  -- 'google', 'github', NULL
    oauth_id VARCHAR(255),
    
    -- 2FA
    totp_secret VARCHAR(64),
    totp_enabled BOOLEAN DEFAULT FALSE,
    
    -- Métadonnées
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Contrainte OAuth unique
    UNIQUE(oauth_provider, oauth_id)
);

-- Index pour recherche
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);

-- =============================================
-- TABLE: artists (extension de users)
-- =============================================
CREATE TABLE artists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Profil artiste
    specialty VARCHAR(100),
    location VARCHAR(100),
    website_url TEXT,
    
    -- Réseaux sociaux (JSONB pour flexibilité)
    social_links JSONB DEFAULT '{}',
    -- Exemple: {"instagram": "url", "twitter": "url", "artstation": "url"}
    
    -- Statistiques (dénormalisées pour performance)
    total_artworks INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    total_revenue DECIMAL(12, 2) DEFAULT 0,
    followers_count INTEGER DEFAULT 0,
    
    -- Statut
    is_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_artists_user_id ON artists(user_id);
CREATE INDEX idx_artists_verified ON artists(is_verified);

-- =============================================
-- TABLE: categories
-- =============================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(10),  -- Emoji ou code icône
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);

-- =============================================
-- TABLE: artworks
-- =============================================
CREATE TABLE artworks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artist_id UUID NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    
    -- Informations principales
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(250) UNIQUE NOT NULL,
    description TEXT,
    
    -- Catégorisation
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    tags VARCHAR(50)[] DEFAULT '{}',
    
    -- Médias
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    preview_urls TEXT[] DEFAULT '{}',  -- Galerie d'images
    
    -- Prix et vente
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    currency VARCHAR(3) DEFAULT 'EUR',
    is_on_sale BOOLEAN DEFAULT TRUE,
    discount_percent INTEGER DEFAULT 0 CHECK (discount_percent >= 0 AND discount_percent <= 100),
    
    -- Métadonnées techniques
    file_format VARCHAR(20),  -- 'PNG', 'JPEG', 'SVG', 'PSD', etc.
    file_size_bytes BIGINT,
    dimensions JSONB,  -- {"width": 1920, "height": 1080, "dpi": 300}
    
    -- Statistiques
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    sales_count INTEGER DEFAULT 0,
    
    -- Statut
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherche et performance
CREATE INDEX idx_artworks_artist ON artworks(artist_id);
CREATE INDEX idx_artworks_category ON artworks(category_id);
CREATE INDEX idx_artworks_status ON artworks(status);
CREATE INDEX idx_artworks_price ON artworks(price);
CREATE INDEX idx_artworks_created ON artworks(created_at DESC);
CREATE INDEX idx_artworks_tags ON artworks USING GIN(tags);
CREATE INDEX idx_artworks_title_search ON artworks USING GIN(title gin_trgm_ops);

-- =============================================
-- TABLE: collections (groupes d'artworks)
-- =============================================
CREATE TABLE collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artist_id UUID NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL,
    description TEXT,
    cover_image_url TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(artist_id, slug)
);

CREATE INDEX idx_collections_artist ON collections(artist_id);

-- =============================================
-- TABLE: collection_artworks (relation N:N)
-- =============================================
CREATE TABLE collection_artworks (
    collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    PRIMARY KEY (collection_id, artwork_id)
);

-- =============================================
-- TABLE: favorites (utilisateurs)
-- =============================================
CREATE TABLE favorites (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    PRIMARY KEY (user_id, artwork_id)
);

CREATE INDEX idx_favorites_artwork ON favorites(artwork_id);

-- =============================================
-- TABLE: follows (artistes)
-- =============================================
CREATE TABLE follows (
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    artist_id UUID NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    PRIMARY KEY (follower_id, artist_id)
);

CREATE INDEX idx_follows_artist ON follows(artist_id);

-- =============================================
-- TABLE: orders
-- =============================================
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(20) UNIQUE NOT NULL,  -- MIA-2025-000001
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    
    -- Montants
    subtotal DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    tax_amount DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    
    -- Paiement
    payment_method VARCHAR(20),  -- 'stripe', 'paypal', 'crypto'
    payment_status VARCHAR(20) DEFAULT 'pending' 
        CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
    payment_intent_id VARCHAR(255),  -- ID Stripe/PayPal
    paid_at TIMESTAMP WITH TIME ZONE,
    
    -- Statut
    status VARCHAR(20) DEFAULT 'pending'
        CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'refunded')),
    
    -- Métadonnées
    ip_address INET,
    user_agent TEXT,
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- =============================================
-- TABLE: order_items
-- =============================================
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE RESTRICT,
    
    -- Snapshot au moment de l'achat
    artwork_title VARCHAR(200) NOT NULL,
    artwork_price DECIMAL(10, 2) NOT NULL,
    discount_percent INTEGER DEFAULT 0,
    final_price DECIMAL(10, 2) NOT NULL,
    
    -- Livraison numérique
    download_url TEXT,
    download_expires_at TIMESTAMP WITH TIME ZONE,
    download_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_artwork ON order_items(artwork_id);

-- =============================================
-- TABLE: reviews
-- =============================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(100),
    content TEXT,
    
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_visible BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, artwork_id)
);

CREATE INDEX idx_reviews_artwork ON reviews(artwork_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- =============================================
-- TABLE: refresh_tokens (pour JWT)
-- =============================================
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(64) UNIQUE NOT NULL,
    device_info JSONB,  -- {"browser": "Chrome", "os": "Windows", "ip": "..."}
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    revoked_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_expires ON refresh_tokens(expires_at);

-- =============================================
-- TABLE: audit_logs (traçabilité)
-- =============================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL,  -- 'LOGIN', 'PURCHASE', 'UPDATE_PROFILE', etc.
    entity_type VARCHAR(50),      -- 'user', 'artwork', 'order'
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- =============================================
-- TABLE: consent_records (RGPD)
-- =============================================
CREATE TABLE consent_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(64),  -- Pour utilisateurs non connectés
    
    consent_type VARCHAR(50) NOT NULL,  -- 'cookies_analytics', 'cookies_marketing', 'newsletter'
    is_granted BOOLEAN NOT NULL,
    ip_address INET,
    user_agent TEXT,
    
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    withdrawn_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_consent_user ON consent_records(user_id);
CREATE INDEX idx_consent_type ON consent_records(consent_type);

-- =============================================
-- FONCTIONS ET TRIGGERS
-- =============================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer le trigger aux tables concernées
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_artists_updated_at BEFORE UPDATE ON artists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_artworks_updated_at BEFORE UPDATE ON artworks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour mettre à jour les statistiques artiste
CREATE OR REPLACE FUNCTION update_artist_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE artists SET total_artworks = total_artworks + 1 WHERE id = NEW.artist_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE artists SET total_artworks = total_artworks - 1 WHERE id = OLD.artist_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_artist_artwork_count
    AFTER INSERT OR DELETE ON artworks
    FOR EACH ROW EXECUTE FUNCTION update_artist_stats();

-- Fonction pour générer un numéro de commande
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
DECLARE
    year_part VARCHAR(4);
    seq_num INTEGER;
BEGIN
    year_part := TO_CHAR(NOW(), 'YYYY');
    SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 9) AS INTEGER)), 0) + 1
    INTO seq_num
    FROM orders
    WHERE order_number LIKE 'MIA-' || year_part || '-%';
    
    NEW.order_number := 'MIA-' || year_part || '-' || LPAD(seq_num::TEXT, 6, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number BEFORE INSERT ON orders
    FOR EACH ROW EXECUTE FUNCTION generate_order_number();
```

### 3.3 Optimisation des Requêtes

**Index stratégiques** (déjà définis ci-dessus) :
- Index B-tree sur les clés étrangères et colonnes de filtrage
- Index GIN sur les tableaux (tags) et JSONB
- Index pg_trgm pour la recherche textuelle fuzzy

**Requêtes complexes types** :

```sql
-- Recherche artworks avec filtres multiples et pagination
SELECT 
    a.id, a.title, a.slug, a.price, a.image_url, a.likes_count,
    ar.user_id AS artist_user_id,
    u.display_name AS artist_name,
    u.avatar_url AS artist_avatar,
    c.name AS category_name
FROM artworks a
JOIN artists ar ON a.artist_id = ar.id
JOIN users u ON ar.user_id = u.id
LEFT JOIN categories c ON a.category_id = c.id
WHERE a.status = 'published'
    AND (a.category_id = $1 OR $1 IS NULL)
    AND (a.price BETWEEN $2 AND $3)
    AND (a.title ILIKE '%' || $4 || '%' OR $4 IS NULL)
    AND ($5::varchar[] IS NULL OR a.tags && $5)
ORDER BY 
    CASE WHEN $6 = 'latest' THEN a.created_at END DESC,
    CASE WHEN $6 = 'popular' THEN a.likes_count END DESC,
    CASE WHEN $6 = 'price_asc' THEN a.price END ASC,
    CASE WHEN $6 = 'price_desc' THEN a.price END DESC
LIMIT $7 OFFSET $8;

-- Dashboard artiste : statistiques agrégées
SELECT 
    ar.id,
    ar.total_artworks,
    ar.total_sales,
    ar.total_revenue,
    ar.followers_count,
    COUNT(DISTINCT o.id) FILTER (WHERE o.created_at > NOW() - INTERVAL '30 days') AS sales_last_30_days,
    SUM(oi.final_price) FILTER (WHERE o.created_at > NOW() - INTERVAL '30 days') AS revenue_last_30_days,
    AVG(r.rating) AS avg_rating
FROM artists ar
LEFT JOIN artworks a ON a.artist_id = ar.id
LEFT JOIN order_items oi ON oi.artwork_id = a.id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
LEFT JOIN reviews r ON r.artwork_id = a.id AND r.is_visible = TRUE
WHERE ar.user_id = $1
GROUP BY ar.id;
```

**Plan d'analyse** :
```sql
-- Toujours analyser les requêtes critiques
EXPLAIN ANALYZE <requête>;
```

### 3.4 Outils de Gestion

| Outil | Usage |
|-------|-------|
| **pgAdmin 4** | Interface web pour administration |
| **DBeaver** | Client SQL universel (alternative) |
| **Prisma Studio** | GUI si utilisation de Prisma ORM |

> **Note** : Si vous souhaitez une interface similaire à MongoDB Compass, utilisez **pgAdmin 4** ou **DBeaver** qui offrent des fonctionnalités équivalentes pour PostgreSQL.

---

## 4. AUTHENTIFICATION & SÉCURITÉ

### 4.1 Architecture d'Authentification

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUX D'AUTHENTIFICATION                       │
└─────────────────────────────────────────────────────────────────┘

[Email/Password]                    [OAuth2]
      │                                │
      ▼                                ▼
┌──────────────┐              ┌──────────────┐
│  Validation  │              │   Google /   │
│   + Hash     │              │   GitHub     │
└──────────────┘              └──────────────┘
      │                                │
      └────────────┬───────────────────┘
                   ▼
           ┌──────────────┐
           │   2FA TOTP   │
           │  (si activé) │
           └──────────────┘
                   │
                   ▼
           ┌──────────────┐
           │  JWT Access  │◄─── Expire : 15 min
           │    Token     │
           └──────────────┘
                   │
                   ▼
           ┌──────────────┐
           │ JWT Refresh  │◄─── Expire : 7 jours
           │    Token     │     Stocké en BDD (révocable)
           └──────────────┘
```

### 4.2 OAuth2 - Fournisseurs Tiers

**Fournisseurs supportés** :
- Google (obligatoire)
- GitHub (obligatoire)
- Apple (optionnel - recommandé pour mobile)

**Configuration OAuth2** :

```javascript
// config/oauth.js
module.exports = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/callback',
    scope: ['profile', 'email']
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/github/callback',
    scope: ['user:email']
  }
};
```

**Librairies** :
- `passport` + `passport-google-oauth20`
- `passport-github2`

### 4.3 2FA - TOTP (Time-based One-Time Password)

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
2. Si `totp_enabled = true` → retourner `requires_2fa: true`
3. L'utilisateur entre le code TOTP (ou backup code)
4. Validation → génération JWT

```javascript
// Validation TOTP
const { authenticator } = require('otplib');

const isValid = authenticator.check(userCode, user.totp_secret);
```

### 4.4 Sécurité des Tokens

**JWT Access Token** :
```javascript
// Payload
{
  sub: "user-uuid",
  email: "user@email.com",
  role: "artist",
  iat: 1703000000,
  exp: 1703000900  // +15 minutes
}

// Signature : RS256 (asymétrique) recommandé
```

**Refresh Token** :
- Stocké en base de données (table `refresh_tokens`)
- Hashé avec SHA-256 avant stockage
- Révocable individuellement
- Rotation à chaque utilisation

### 4.5 Sécurité Applicative

**Headers de sécurité** (via `helmet`) :
```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.makeitart.io"],
    }
  },
  hsts: { maxAge: 31536000, includeSubDomains: true }
}));
```

**Rate Limiting** :
```javascript
// express-rate-limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes par fenêtre
  message: { error: 'Too many requests' }
});

// Limites spécifiques
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5, // 5 tentatives de login
  skipSuccessfulRequests: true
});
```

**Validation des entrées** :
- Librairie : `joi` ou `zod`
- Sanitisation : `express-validator` + `sanitize-html`

**Protection CSRF** :
- `csurf` pour les formulaires
- SameSite cookies

---

## 5. ENVIRONNEMENTS

### 5.1 Environnement de Développement Local

**Prérequis** :
- Docker Desktop 24.x+
- Node.js 20 LTS
- Git
- VS Code (recommandé) avec extensions :
  - ESLint
  - Prettier
  - Docker
  - GitLens
  - Thunder Client (API testing)

**Configuration Docker Compose** :

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Base de données PostgreSQL
  postgres:
    image: postgres:16-alpine
    container_name: makeitart_postgres
    environment:
      POSTGRES_USER: makeitart_dev
      POSTGRES_PASSWORD: dev_password_123
      POSTGRES_DB: make_it_art_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/migrations/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U makeitart_dev"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Cache Redis
  redis:
    image: redis:7-alpine
    container_name: makeitart_redis
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  # Backend Express
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: makeitart_backend
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://makeitart_dev:dev_password_123@postgres:5432/make_it_art_dev
      REDIS_URL: redis://redis:6379
      JWT_SECRET: dev-jwt-secret-change-in-prod
      JWT_REFRESH_SECRET: dev-refresh-secret-change-in-prod
    ports:
      - "4000:4000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    command: npm run dev

  # Frontend Nuxt
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: makeitart_frontend
    environment:
      NUXT_PUBLIC_API_URL: http://localhost:4000/api/v1
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.nuxt
    command: npm run dev

  # Adminer (interface BDD légère)
  adminer:
    image: adminer:latest
    container_name: makeitart_adminer
    ports:
      - "8080:8080"
    depends_on:
      - postgres

volumes:
  postgres_data:
  redis_data:
```

**Scripts de démarrage** :

```bash
# Démarrer l'environnement complet
docker-compose up -d

# Voir les logs
docker-compose logs -f backend

# Reset la BDD
docker-compose down -v && docker-compose up -d

# Accéder au shell PostgreSQL
docker exec -it makeitart_postgres psql -U makeitart_dev -d make_it_art_dev
```

**Variables d'environnement (.env.development)** :

```env
# Backend
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://makeitart_dev:dev_password_123@localhost:5432/make_it_art_dev
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=dev-jwt-secret-32-chars-minimum!!
JWT_REFRESH_SECRET=dev-refresh-secret-32-chars-min!!
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Frontend URL (for OAuth callbacks)
FRONTEND_URL=http://localhost:3000

# File Storage (MinIO en local)
STORAGE_ENDPOINT=localhost
STORAGE_PORT=9000
STORAGE_ACCESS_KEY=minioadmin
STORAGE_SECRET_KEY=minioadmin
STORAGE_BUCKET=makeitart-artworks
```

### 5.2 Environnement de Production

**Voir section 6 pour les détails d'infrastructure.**

**Variables d'environnement (.env.production)** :

```env
# Backend
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://makeitart_prod:SECURE_PASSWORD@localhost:5432/make_it_art_prod
REDIS_URL=redis://:REDIS_PASSWORD@localhost:6379

# JWT (secrets générés avec: openssl rand -base64 64)
JWT_SECRET=<64-char-random-string>
JWT_REFRESH_SECRET=<64-char-random-string>
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# OAuth
GOOGLE_CLIENT_ID=prod-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=prod-google-client-secret
GITHUB_CLIENT_ID=prod-github-client-id
GITHUB_CLIENT_SECRET=prod-github-client-secret

# URLs
FRONTEND_URL=https://makeitart.io
API_URL=https://api.makeitart.io

# File Storage (S3)
STORAGE_PROVIDER=s3
STORAGE_REGION=eu-west-3
STORAGE_BUCKET=makeitart-artworks-prod
AWS_ACCESS_KEY_ID=<aws-access-key>
AWS_SECRET_ACCESS_KEY=<aws-secret-key>

# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Sentry (monitoring erreurs)
SENTRY_DSN=https://xxx@sentry.io/xxx
```

---

## 6. INFRASTRUCTURE & DÉPLOIEMENT

### 6.1 Choix du VPS

**Fournisseurs recommandés** :

| Fournisseur | Offre recommandée | Prix/mois | Avantages |
|-------------|-------------------|-----------|-----------|
| **Scaleway** | DEV1-M (3 vCPU, 4GB RAM, 40GB SSD) | ~12€ | Datacenter Paris, bonne doc |
| **OVH** | VPS Comfort (2 vCPU, 4GB RAM, 80GB SSD) | ~12€ | Français, support FR |
| **DigitalOcean** | Droplet 4GB (2 vCPU, 4GB RAM, 80GB SSD) | ~24$ | Excellent UX, communauté |
| **Hetzner** | CX21 (2 vCPU, 4GB RAM, 40GB SSD) | ~6€ | Très bon rapport qualité/prix |

**Recommandation** : **Scaleway DEV1-M** ou **Hetzner CX21** pour le rapport qualité/prix.

**Configuration minimale requise** :
- 2 vCPU
- 4 GB RAM
- 40 GB SSD
- OS : Ubuntu 22.04 LTS

### 6.2 Architecture Production

```
┌─────────────────────────────────────────────────────────────────┐
│                           VPS LINUX                              │
│                        (Ubuntu 22.04)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                       UFW Firewall                         │ │
│  │              Ports: 22(SSH), 80, 443 only                  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                               │                                  │
│  ┌────────────────────────────┴───────────────────────────────┐ │
│  │                    NGINX (Host)                            │ │
│  │              SSL via Let's Encrypt                         │ │
│  │         makeitart.io → :3000 (frontend)                    │ │
│  │     api.makeitart.io → :4000 (backend)                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                               │                                  │
│  ┌────────────────────────────┴───────────────────────────────┐ │
│  │                    DOCKER ENGINE                           │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │ │
│  │  │  Frontend   │  │   Backend   │  │    Redis    │        │ │
│  │  │   :3000     │  │   :4000     │  │   :6379     │        │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                 PostgreSQL (Host)                          │ │
│  │                     :5432                                  │ │
│  │              (non exposé externe)                          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Sécurisation du VPS

**Script d'initialisation** (`setup-vps.sh`) :

```bash
#!/bin/bash
# === SCRIPT DE SÉCURISATION VPS ===
# À exécuter en root sur un VPS Ubuntu 22.04 fraîchement installé

set -e

echo "=== 1. Mise à jour du système ==="
apt update && apt upgrade -y
apt install -y curl wget git htop ufw fail2ban unattended-upgrades

echo "=== 2. Création utilisateur deploy ==="
useradd -m -s /bin/bash deploy
usermod -aG sudo deploy
echo "deploy ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/deploy

echo "=== 3. Configuration SSH ==="
mkdir -p /home/deploy/.ssh
# Copiez votre clé publique ici
# echo "ssh-rsa AAAA..." >> /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys

# Sécurisation SSH
cat > /etc/ssh/sshd_config.d/hardening.conf << EOF
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
LoginGraceTime 20
AllowUsers deploy
Protocol 2
EOF

systemctl restart sshd

echo "=== 4. Configuration Firewall (UFW) ==="
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'
ufw --force enable

echo "=== 5. Configuration Fail2Ban ==="
cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
EOF

systemctl enable fail2ban
systemctl start fail2ban

echo "=== 6. Mises à jour automatiques ==="
cat > /etc/apt/apt.conf.d/20auto-upgrades << EOF
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
EOF

echo "=== 7. Installation Docker ==="
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker deploy
systemctl enable docker

# Docker Compose
apt install -y docker-compose-plugin

echo "=== 8. Installation PostgreSQL ==="
apt install -y postgresql postgresql-contrib
systemctl enable postgresql

# Configuration PostgreSQL
sudo -u postgres psql << EOF
CREATE USER makeitart_prod WITH PASSWORD 'CHANGE_THIS_SECURE_PASSWORD';
CREATE DATABASE make_it_art_prod OWNER makeitart_prod;
GRANT ALL PRIVILEGES ON DATABASE make_it_art_prod TO makeitart_prod;
EOF

# Limiter PostgreSQL à localhost uniquement
sed -i "s/#listen_addresses = 'localhost'/listen_addresses = 'localhost'/" /etc/postgresql/*/main/postgresql.conf

echo "=== 9. Installation Nginx ==="
apt install -y nginx certbot python3-certbot-nginx
systemctl enable nginx

echo "=== 10. Configuration Logrotate ==="
cat > /etc/logrotate.d/make-it-art << EOF
/var/log/make-it-art/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 deploy deploy
    sharedscripts
}
EOF

echo "=== SETUP TERMINÉ ==="
echo "IMPORTANT: "
echo "1. Ajoutez votre clé SSH publique dans /home/deploy/.ssh/authorized_keys"
echo "2. Changez le mot de passe PostgreSQL"
echo "3. Testez la connexion SSH avant de fermer cette session"
```

### 6.4 Configuration Nginx Production

```nginx
# /etc/nginx/sites-available/makeitart.io

# Redirect HTTP → HTTPS
server {
    listen 80;
    server_name makeitart.io www.makeitart.io api.makeitart.io;
    return 301 https://$host$request_uri;
}

# Frontend
server {
    listen 443 ssl http2;
    server_name makeitart.io www.makeitart.io;

    ssl_certificate /etc/letsencrypt/live/makeitart.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/makeitart.io/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        proxy_pass http://127.0.0.1:3000;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}

# API Backend
server {
    listen 443 ssl http2;
    server_name api.makeitart.io;

    ssl_certificate /etc/letsencrypt/live/makeitart.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/makeitart.io/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # CORS headers (ajuster selon besoins)
        add_header Access-Control-Allow-Origin "https://makeitart.io" always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Authorization, Content-Type" always;
        
        if ($request_method = 'OPTIONS') {
            return 204;
        }
    }

    # Upload limit
    client_max_body_size 50M;
}
```

---

## 7. CI/CD PIPELINE

### 7.1 Structure GitHub

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

### 7.2 Workflow CI (Tests)

```yaml
# .github/workflows/ci.yml
name: CI - Tests & Lint

on:
  push:
    branches: [develop, 'feature/**', 'fix/**']
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'

jobs:
  # ==========================================
  # BACKEND TESTS
  # ==========================================
  backend-tests:
    name: Backend Tests
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_password
          POSTGRES_DB: makeitart_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install dependencies
        working-directory: ./backend
        run: npm ci

      - name: Run ESLint
        working-directory: ./backend
        run: npm run lint

      - name: Run Migrations
        working-directory: ./backend
        env:
          DATABASE_URL: postgresql://test_user:test_password@localhost:5432/makeitart_test
        run: npm run db:migrate

      - name: Run Unit Tests
        working-directory: ./backend
        env:
          NODE_ENV: test
          DATABASE_URL: postgresql://test_user:test_password@localhost:5432/makeitart_test
          REDIS_URL: redis://localhost:6379
          JWT_SECRET: test-jwt-secret-for-ci-pipeline
          JWT_REFRESH_SECRET: test-refresh-secret-for-ci
        run: npm run test:unit -- --coverage

      - name: Run Integration Tests
        working-directory: ./backend
        env:
          NODE_ENV: test
          DATABASE_URL: postgresql://test_user:test_password@localhost:5432/makeitart_test
          REDIS_URL: redis://localhost:6379
          JWT_SECRET: test-jwt-secret-for-ci-pipeline
          JWT_REFRESH_SECRET: test-refresh-secret-for-ci
        run: npm run test:integration

      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          directory: ./backend/coverage
          flags: backend

  # ==========================================
  # FRONTEND TESTS
  # ==========================================
  frontend-tests:
    name: Frontend Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Run ESLint
        working-directory: ./frontend
        run: npm run lint

      - name: Run TypeScript Check
        working-directory: ./frontend
        run: npm run typecheck

      - name: Build (verify no build errors)
        working-directory: ./frontend
        run: npm run build

  # ==========================================
  # SECURITY AUDIT
  # ==========================================
  security-audit:
    name: Security Audit
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run npm audit (backend)
        working-directory: ./backend
        run: npm audit --audit-level=high

      - name: Run npm audit (frontend)
        working-directory: ./frontend
        run: npm audit --audit-level=high
```

### 7.3 Workflow CD (Déploiement)

```yaml
# .github/workflows/cd.yml
name: CD - Deploy to Production

on:
  push:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # ==========================================
  # BUILD & PUSH DOCKER IMAGES
  # ==========================================
  build:
    name: Build Docker Images
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Backend image
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/backend:latest
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/backend:${{ github.sha }}

      - name: Build and push Frontend image
        uses: docker/build-push-action@v5
        with:
          context: ./frontend
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/frontend:latest
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/frontend:${{ github.sha }}

  # ==========================================
  # DEPLOY TO VPS
  # ==========================================
  deploy:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: build
    environment: production

    steps:
      - name: Deploy to VPS via SSH
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /opt/make-it-art
            
            # Pull latest images
            docker pull ghcr.io/${{ github.repository }}/backend:latest
            docker pull ghcr.io/${{ github.repository }}/frontend:latest
            
            # Backup current state
            docker-compose -f docker-compose.prod.yml exec -T postgres pg_dump -U makeitart_prod make_it_art_prod > /backups/pre-deploy-$(date +%Y%m%d_%H%M%S).sql
            
            # Deploy with zero-downtime
            docker-compose -f docker-compose.prod.yml up -d --no-deps --build backend
            docker-compose -f docker-compose.prod.yml up -d --no-deps --build frontend
            
            # Run migrations
            docker-compose -f docker-compose.prod.yml exec -T backend npm run db:migrate
            
            # Cleanup old images
            docker image prune -af --filter "until=24h"
            
            # Health check
            sleep 10
            curl -f http://localhost:4000/api/v1/health || exit 1
            curl -f http://localhost:3000 || exit 1
            
            echo "✅ Deployment successful!"

      - name: Notify on success
        if: success()
        uses: slackapi/slack-github-action@v1.24.0
        with:
          payload: |
            {
              "text": "✅ Make It Art déployé en production!\nCommit: ${{ github.sha }}\nPar: ${{ github.actor }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}

      - name: Notify on failure
        if: failure()
        uses: slackapi/slack-github-action@v1.24.0
        with:
          payload: |
            {
              "text": "❌ Échec du déploiement Make It Art!\nCommit: ${{ github.sha }}\nVoir: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### 7.4 Secrets GitHub à configurer

| Secret | Description |
|--------|-------------|
| `VPS_HOST` | IP ou domaine du VPS |
| `VPS_USER` | Utilisateur SSH (deploy) |
| `VPS_SSH_KEY` | Clé privée SSH |
| `SLACK_WEBHOOK` | URL webhook Slack pour notifications |
| `CODECOV_TOKEN` | Token Codecov (optionnel) |

---

## 8. CONFORMITÉ RGPD

### 8.1 Pages Légales Obligatoires

| Page | URL | Contenu |
|------|-----|---------|
| Politique de confidentialité | `/privacy` | Collecte, traitement, droits |
| CGU | `/terms` | Conditions d'utilisation |
| Mentions légales | `/legal` | Éditeur, hébergeur |
| Politique cookies | `/cookies` | Types de cookies, gestion |

### 8.2 Données Collectées

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

### 8.3 Consentement Cookies

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

### 8.4 Droits des Utilisateurs

**Fonctionnalités à implémenter** :

| Droit | Implémentation |
|-------|----------------|
| **Accès** | Export des données (JSON/PDF) depuis le dashboard |
| **Rectification** | Édition du profil |
| **Suppression** | Bouton "Supprimer mon compte" avec confirmation |
| **Portabilité** | Export format standard (JSON) |
| **Opposition** | Désinscription newsletter, désactivation analytics |

**Délai de réponse** : 30 jours maximum

### 8.5 Template Page Politique de Confidentialité

```markdown
# Politique de Confidentialité

**Dernière mise à jour** : [DATE]

## 1. Qui sommes-nous ?

Make It Art est édité par [RAISON SOCIALE], [ADRESSE], [SIRET].

**Délégué à la protection des données (DPO)** : [EMAIL]

## 2. Données collectées

Nous collectons les données suivantes :
- Données de compte : email, nom d'utilisateur, mot de passe (hashé)
- Données de profil : avatar, biographie (optionnel)
- Données de transaction : historique d'achats, adresse de facturation
- Données techniques : adresse IP, logs de connexion, appareil utilisé

## 3. Finalités du traitement

| Finalité | Base légale |
|----------|-------------|
| Gestion de votre compte | Exécution du contrat |
| Traitement des commandes | Exécution du contrat |
| Service client | Intérêt légitime |
| Sécurité et prévention fraude | Intérêt légitime |
| Statistiques anonymisées | Intérêt légitime |
| Newsletter (si consentement) | Consentement |

## 4. Durée de conservation

- Données de compte : durée du compte + 3 ans après suppression
- Données de transaction : 10 ans (obligation légale)
- Logs de connexion : 12 mois
- Cookies analytics : 13 mois

## 5. Vos droits

Conformément au RGPD, vous disposez des droits suivants :
- **Droit d'accès** : obtenir une copie de vos données
- **Droit de rectification** : corriger vos données
- **Droit à l'effacement** : supprimer votre compte
- **Droit à la portabilité** : récupérer vos données
- **Droit d'opposition** : vous opposer à certains traitements

Pour exercer vos droits : [EMAIL DPO] ou via votre espace personnel.

## 6. Cookies

Voir notre [Politique Cookies](/cookies) pour plus de détails.

## 7. Transferts hors UE

Vos données sont hébergées en France/UE. En cas de transfert hors UE (ex: prestataires US), nous nous assurons de garanties appropriées (clauses contractuelles types).

## 8. Contact

Pour toute question : [EMAIL] ou par courrier à [ADRESSE].

Vous pouvez également adresser une réclamation à la CNIL : www.cnil.fr
```

---

## 9. ORGANISATION DE L'ÉQUIPE

### 9.1 Répartition des Rôles (4 développeurs)

| Rôle | Responsabilités | Compétences clés |
|------|-----------------|------------------|
| **Lead Dev / DevOps** | Architecture, infra, CI/CD, code review | Docker, Linux, PostgreSQL, sécurité |
| **Dev Backend Senior** | API Express, auth, BDD, performances | Node.js, SQL, OAuth, tests |
| **Dev Frontend Senior** | Nuxt.js, composants, Three.js, UX | Vue.js, TypeScript, WebGL |
| **Dev Fullstack** | Features transverses, intégration, tests | Node.js, Vue.js, Docker |

### 9.2 Workflow Git

```
                    main (production)
                      │
          ┌───────────┴───────────┐
          │                       │
       develop              hotfix/xxx
          │                       │
    ┌─────┴─────┐                 │
    │           │                 │
feature/xxx  fix/xxx              │
    │           │                 │
    └─────┬─────┘                 │
          │                       │
          ▼                       ▼
    Pull Request            Pull Request
      (review)                (review)
          │                       │
          ▼                       ▼
       develop ─────────────► main
```

**Conventions de commit** (Conventional Commits) :
```
feat: add user authentication with OAuth2
fix: resolve login redirect issue
docs: update API documentation
style: format code with prettier
refactor: simplify order processing logic
test: add unit tests for auth service
chore: update dependencies
```

### 9.3 Process de Développement

**Sprint** : 2 semaines

**Cérémonies** :
- **Daily standup** : 15 min, 9h30
- **Sprint planning** : 2h, lundi matin (semaine 1)
- **Sprint review** : 1h, vendredi après-midi (semaine 2)
- **Retrospective** : 30 min, après la review

**Definition of Done** :
- [ ] Code reviewé et approuvé par 1 dev minimum
- [ ] Tests unitaires écrits (couverture > 80%)
- [ ] Tests d'intégration si applicable
- [ ] Documentation mise à jour
- [ ] Pas d'erreurs ESLint
- [ ] Pas de vulnérabilités npm audit high/critical
- [ ] Fonctionnalité testée en environnement de dev

### 9.4 Outils Recommandés

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

## 10. LIVRABLES & PLANNING

### 10.1 Phases du Projet

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1 - FONDATIONS                         │
│                       (3-4 semaines)                            │
├─────────────────────────────────────────────────────────────────┤
│ • Setup infrastructure (Docker, CI/CD, VPS)                     │
│ • Base de données PostgreSQL + migrations                       │
│ • API Express.js : structure, auth basique                      │
│ • Connexion frontend ↔ backend                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 2 - AUTHENTIFICATION                   │
│                       (2-3 semaines)                            │
├─────────────────────────────────────────────────────────────────┤
│ • OAuth2 Google + GitHub                                        │
│ • JWT Access/Refresh tokens                                     │
│ • 2FA TOTP                                                      │
│ • Gestion des sessions                                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3 - CORE FEATURES                      │
│                       (4-5 semaines)                            │
├─────────────────────────────────────────────────────────────────┤
│ • CRUD Artworks + upload images                                 │
│ • Profils artistes                                              │
│ • Recherche et filtres                                          │
│ • Favoris et collections                                        │
│ • Dashboard utilisateur                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 4 - E-COMMERCE                         │
│                       (3-4 semaines)                            │
├─────────────────────────────────────────────────────────────────┤
│ • Panier                                                        │
│ • Checkout + intégration Stripe                                 │
│ • Historique commandes                                          │
│ • Téléchargement œuvres achetées                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 5 - FINALISATION                       │
│                       (2-3 semaines)                            │
├─────────────────────────────────────────────────────────────────┤
│ • Pages légales (RGPD, CGU)                                     │
│ • Bandeau cookies                                               │
│ • Tests de charge                                               │
│ • Audit sécurité                                                │
│ • Documentation finale                                          │
│ • Mise en production                                            │
└─────────────────────────────────────────────────────────────────┘
```

### 10.2 Livrables par Phase

**Phase 1 - Fondations** :
- [ ] Repository GitHub configuré (branches, protection)
- [ ] Docker Compose dev fonctionnel
- [ ] VPS provisionné et sécurisé
- [ ] CI/CD pipeline opérationnel
- [ ] BDD PostgreSQL avec schéma initial
- [ ] API Express : health check, structure de base
- [ ] Frontend connecté à l'API

**Phase 2 - Authentification** :
- [ ] Inscription/Connexion email + password
- [ ] OAuth2 Google fonctionnel
- [ ] OAuth2 GitHub fonctionnel
- [ ] 2FA TOTP avec QR code et backup codes
- [ ] Refresh token rotation
- [ ] Rate limiting sur les routes auth

**Phase 3 - Core Features** :
- [ ] CRUD complet artworks
- [ ] Upload images (S3/MinIO)
- [ ] Profil artiste complet
- [ ] Recherche full-text
- [ ] Filtres (catégorie, prix, tags)
- [ ] Système de favoris
- [ ] Collections personnelles

**Phase 4 - E-Commerce** :
- [ ] Ajout/suppression panier
- [ ] Page checkout
- [ ] Intégration Stripe
- [ ] Confirmation commande par email
- [ ] Page historique commandes
- [ ] Téléchargement sécurisé des fichiers

**Phase 5 - Finalisation** :
- [ ] Page Politique de confidentialité
- [ ] Page CGU
- [ ] Bandeau consentement cookies
- [ ] Export données utilisateur (RGPD)
- [ ] Suppression compte (RGPD)
- [ ] Tests de performance (>100 req/s)
- [ ] Audit sécurité (OWASP top 10)
- [ ] Documentation API (Swagger/OpenAPI)

---

## 11. ANNEXES

### 11.1 Checklist Sécurité (OWASP Top 10)

- [ ] **A01 - Broken Access Control** : Vérifier les autorisations à chaque endpoint
- [ ] **A02 - Cryptographic Failures** : HTTPS partout, mots de passe hashés (bcrypt)
- [ ] **A03 - Injection** : Requêtes paramétrées, validation inputs
- [ ] **A04 - Insecure Design** : Threat modeling, security by design
- [ ] **A05 - Security Misconfiguration** : Headers sécurité, pas de debug en prod
- [ ] **A06 - Vulnerable Components** : npm audit, dépendances à jour
- [ ] **A07 - Authentication Failures** : Rate limiting, MFA, session management
- [ ] **A08 - Integrity Failures** : Vérification des mises à jour, CI/CD sécurisé
- [ ] **A09 - Logging Failures** : Logs des événements sécurité, alerting
- [ ] **A10 - SSRF** : Validation des URLs externes

### 11.2 Checklist Performance

- [ ] Pagination sur toutes les listes
- [ ] Index BDD sur les colonnes filtrées/triées
- [ ] Cache Redis pour les données fréquentes
- [ ] Compression gzip/brotli (Nginx)
- [ ] Images optimisées (WebP, lazy loading)
- [ ] CDN pour les assets statiques (optionnel)
- [ ] Connection pooling PostgreSQL
- [ ] Queries analysées avec EXPLAIN ANALYZE

### 11.3 Endpoints API (aperçu)

```
# Authentication
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
POST   /api/v1/auth/google
POST   /api/v1/auth/github
POST   /api/v1/auth/2fa/setup
POST   /api/v1/auth/2fa/verify
POST   /api/v1/auth/2fa/disable

# Users
GET    /api/v1/users/me
PUT    /api/v1/users/me
DELETE /api/v1/users/me
GET    /api/v1/users/me/favorites
GET    /api/v1/users/me/orders
POST   /api/v1/users/me/export (RGPD)

# Artists
GET    /api/v1/artists
GET    /api/v1/artists/:id
POST   /api/v1/artists (become artist)
PUT    /api/v1/artists/:id
GET    /api/v1/artists/:id/artworks
POST   /api/v1/artists/:id/follow
DELETE /api/v1/artists/:id/follow

# Artworks
GET    /api/v1/artworks
GET    /api/v1/artworks/:id
POST   /api/v1/artworks
PUT    /api/v1/artworks/:id
DELETE /api/v1/artworks/:id
POST   /api/v1/artworks/:id/favorite
DELETE /api/v1/artworks/:id/favorite

# Categories
GET    /api/v1/categories

# Collections
GET    /api/v1/collections
POST   /api/v1/collections
PUT    /api/v1/collections/:id
DELETE /api/v1/collections/:id
POST   /api/v1/collections/:id/artworks
DELETE /api/v1/collections/:id/artworks/:artworkId

# Cart
GET    /api/v1/cart
POST   /api/v1/cart/items
DELETE /api/v1/cart/items/:id
DELETE /api/v1/cart (clear)

# Orders
POST   /api/v1/orders/checkout
GET    /api/v1/orders/:id
GET    /api/v1/orders/:id/download/:itemId

# Reviews
GET    /api/v1/artworks/:id/reviews
POST   /api/v1/artworks/:id/reviews
PUT    /api/v1/reviews/:id
DELETE /api/v1/reviews/:id

# Admin (protected)
GET    /api/v1/admin/users
GET    /api/v1/admin/orders
GET    /api/v1/admin/stats
```

### 11.4 Contacts & Ressources

**Documentation** :
- [Nuxt.js](https://nuxt.com/docs)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Passport.js](http://www.passportjs.org/)
- [Docker](https://docs.docker.com/)

**Support équipe** :
- Channel Discord : #make-it-art-dev
- Réunions : [LIEN CALENDRIER]
- Documentation interne : [LIEN NOTION]

---

## ✅ VALIDATION DU CAHIER DES CHARGES

| Stakeholder | Date | Signature |
|-------------|------|-----------|
| Lead Dev | | |
| Product Owner | | |
| Équipe Dev | | |

---

**Document rédigé le 18 Décembre 2025**  
**Version 1.0**


