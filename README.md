# 🌸 Geisha Garden

> **Marketplace d'art digital immersive dans un univers cyberpunk futuriste 3D**

Bienvenue sur **Geisha Garden** ! Une plateforme innovante permettant aux artistes émergents de présenter et vendre leurs créations dans une galerie virtuelle 3D interactive.

---

## 📋 Table des matières

- [À propos](#-à-propos)
- [Démarrage rapide](#-démarrage-rapide)
- [Stack technique](#️-stack-technique)
- [Installation détaillée](#-installation-détaillée)
- [Structure du projet](#-structure-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Configuration OAuth2 & 2FA](#-configuration-oauth2--2fa)
- [Contribution](#-contribution)
- [Déploiement](#-déploiement)

---

## 🎯 À propos

**Geisha Garden** transforme l'expérience d'achat d'art digital en proposant :

- 🎨 **Galerie 3D immersive** - Explorez les œuvres dans un univers cyberpunk interactif
- 🌐 **Technologie WebGL/Three.js** - Rendu 3D fluide directement dans le navigateur
- 💎 **Support aux artistes émergents** - Vendez vos créations sans intermédiaire
- 🔐 **Sécurité renforcée** - Authentification OAuth2 (Google/GitHub) + 2FA obligatoire
- 💳 **Paiements intégrés** - Transactions sécurisées via Stripe

---

## ⚡ Démarrage rapide

### Prérequis

- **Node.js** v18+ ([Télécharger](https://nodejs.org/))
- **MongoDB** v7+ ([Télécharger](https://www.mongodb.com/try/download/community))
- **Git** ([Télécharger](https://git-scm.com/))

### Installation en 4 étapes

```bash
# 1. Cloner le projet
git clone https://github.com/inessben/geisha-garden.git
cd geisha-garden

# 2. Installer les dépendances backend
cd backend
npm install

# 3. Installer les dépendances frontend
cd ../frontend
npm install

# 4. Configurer les variables d'environnement
cd ..
cp .env.example .env
# Éditez le fichier .env avec vos credentials
```

### Lancer le projet

```bash
# Terminal 1 - Backend API (port 4000)
cd backend
npm run dev

# Terminal 2 - Frontend Nuxt (port 3000)
cd frontend
npm run dev
```

🎉 **Voilà !** Ouvrez [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Stack technique

### Frontend

| Technologie | Version | Description |
|------------|---------|-------------|
| **Nuxt.js** | v4+ | Framework Vue.js avec SSR |
| **TailwindCSS** | v3+ | Framework CSS utility-first |
| **Three.js** | Latest | Moteur 3D WebGL |
| **TypeScript** | v5+ | JavaScript typé |
| **Pinia** | v2+ | Gestion d'état Vue.js |

### Backend

| Technologie | Version | Description |
|------------|---------|-------------|
| **Node.js** | v18+ | Runtime JavaScript |
| **Express.js** | v4+ | Framework serveur Node.js |
| **MongoDB** | v7+ | Base de données NoSQL |
| **Mongoose** | v8+ | ODM pour MongoDB |
| **Passport.js** | v0.7+ | Authentification OAuth2 |
| **Speakeasy** | v2+ | Génération codes 2FA TOTP |
| **QRCode** | v1.5+ | Génération QR codes |

### Blockchain & Web3

| Technologie | Version | Description |
|------------|---------|-------------|
| **Solana Web3.js** | Latest | Interaction blockchain Solana |
| **Anchor Framework** | Latest | Framework smart contracts Solana |
| **Ethers.js** | v6+ | Bibliothèque Ethereum |
| **Hardhat** | Latest | Environnement développement Ethereum |
| **Phantom Wallet** | - | Wallet Solana |
| **MetaMask** | - | Wallet Ethereum |

### Services externes

- **AWS S3** - Stockage d'images haute résolution
- **Stripe** - Traitement des paiements fiat
- **Google OAuth2** - Connexion via compte Google
- **GitHub OAuth2** - Connexion via compte GitHub
- **Solana Devnet/Mainnet** - Réseau blockchain Solana
- **Ethereum Testnet/Mainnet** - Réseau blockchain Ethereum

---

## 📚 Installation détaillée

### Variables d'environnement

```env
# Base
NODE_ENV=development
PORT=4000

# Database
MONGO_URI=mongodb://localhost:27017/geisha

# JWT
JWT_SECRET=votre_secret_jwt_min_32_chars
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# OAuth2 - Google (OBLIGATOIRE)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback

# OAuth2 - GitHub (OBLIGATOIRE)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:4000/auth/github/callback

# 2FA TOTP (OBLIGATOIRE)
TOTP_ISSUER=Geisha Garden
TOTP_WINDOW=1
TOTP_STEP=30

# Storage
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=eu-west-3
S3_BUCKET=geisha-artworks

# Payment
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_public

# Blockchain - Solana
SOLANA_NETWORK=devnet  # devnet | mainnet-beta
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_PROGRAM_ID=your_program_id
SOLANA_WALLET_SECRET=your_wallet_secret_key

# Blockchain - Ethereum
ETHEREUM_NETWORK=sepolia  # sepolia | mainnet
ETHEREUM_RPC_URL=https://sepolia.infura.io/v3/your_infura_key
ETHEREUM_CONTRACT_ADDRESS=your_contract_address
ETHEREUM_PRIVATE_KEY=your_private_key

# Frontend
NUXT_PUBLIC_API_URL=http://localhost:4000/api
NUXT_PUBLIC_SOLANA_NETWORK=devnet
NUXT_PUBLIC_ETHEREUM_NETWORK=sepolia
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Lancer le projet

```bash
npm run dev
```

### 5. Accéder à l'application

- **Frontend (Nuxt SSR)** : http://localhost:3000
- **Backend API** : http://localhost:4000
- **MongoDB** : mongodb://localhost:27017

---

## 📁 Structure du projet

```
geisha-garden/
├── backend/                    # API Node.js/Express
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js         # MongoDB
│   │   │   ├── passport.js         # OAuth2
│   │   │   ├── solana.js           # Solana Web3
│   │   │   ├── ethereum.js         # Ethers.js
│   │   │   └── s3.js               # AWS S3
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── artworkController.js
│   │   │   ├── blockchainController.js  # Solana + Ethereum
│   │   │   └── nftController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Artwork.js
│   │   │   ├── NFT.js              # NFT metadata
│   │   │   └── Transaction.js
│   │   └── routes/
│   │       ├── auth.js
│   │       ├── artworks.js
│   │       ├── blockchain.js
│   │       └── nft.js
│   ├── package.json
│   └── server.js
│
├── frontend/                   # Nuxt.js v4 SSR
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── OAuth2Buttons.vue
│   │   │   └── TotpSetup.vue
│   │   ├── Wallet/
│   │   │   ├── ConnectWallet.vue    # Phantom + MetaMask
│   │   │   ├── SolanaWallet.vue
│   │   │   └── EthereumWallet.vue
│   │   ├── NFT/
│   │   │   ├── MintNFT.vue
│   │   │   └── NFTCard.vue
│   │   ├── ThreeScene.vue
│   │   └── ArtworkCard.vue
│   ├── composables/
│   │   ├── useAuth.ts
│   │   ├── useWallet.ts            # Multi-chain wallet
│   │   ├── useSolana.ts
│   │   ├── useEthereum.ts
│   │   └── useThree.ts
│   ├── stores/
│   │   ├── auth.ts
│   │   └── wallet.ts
│   ├── nuxt.config.ts
│   └── package.json
│
├── contracts/                  # Smart Contracts
│   ├── solana/                 # Solana Programs (Rust)
│   │   ├── programs/
│   │   │   └── geisha-nft/
│   │   │       ├── src/
│   │   │       │   └── lib.rs      # NFT minting logic
│   │   │       └── Cargo.toml
│   │   ├── Anchor.toml
│   │   └── package.json
│   │
│   └── ethereum/               # Ethereum Contracts (Solidity)
│       ├── contracts/
│       │   ├── GeishaNFT.sol       # ERC-721 NFT
│       │   └── Marketplace.sol     # NFT marketplace
│       ├── scripts/
│       │   └── deploy.js
│       ├── test/
│       ├── hardhat.config.js
│       └── package.json
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🎨 Fonctionnalités

### 🔐 Authentification

- **OAuth2** - Connexion via Google ou GitHub
- **2FA TOTP** - Authentification à deux facteurs obligatoire
- **QR Code** - Configuration facile avec app authenticator
- **Backup codes** - Codes de secours en cas de perte
- **JWT** - Gestion sécurisée des sessions

### 🏛️ Marketplace

- **Galerie 3D immersive** - Navigation cyberpunk interactive
- **Upload d'œuvres** - Stockage AWS S3 haute qualité
- **Recherche avancée** - Filtres artiste, prix, tags, blockchain
- **Favoris & likes** - Système social intégré
- **Paiements multi-supports** - Stripe (fiat) + Crypto (SOL/ETH)
- **Historique transactions** - Suivi complet on-chain et off-chain

### 🌐 Expérience 3D (Three.js)

- **Rendu temps réel** - WebGL haute performance
- **Navigation fluide** - Orbit controls intuitifs
- **Effets visuels** - Particules et lighting néon cyberpunk
- **Responsive** - Optimisé mobile et desktop
- **60 FPS** - Performance garantie

### 🔗 Blockchain & NFT

#### Solana
- **Mint NFT** - Création NFT on-chain via smart contract
- **Wallet Phantom** - Connexion wallet Solana native
- **Transactions rapides** - Faibles frais (<$0.01)
- **Metaplex** - Standard NFT Solana

#### Ethereum
- **ERC-721** - Standard NFT Ethereum
- **Wallet MetaMask** - Connexion wallet Ethereum
- **Smart contracts** - Marketplace & royalties automatiques
- **Multi-chain** - Support testnets et mainnets

#### Fonctionnalités Web3
- **Connexion multi-wallet** - Phantom (SOL) + MetaMask (ETH)
- **Mint œuvres en NFT** - Transformation artwork → NFT
- **Achat crypto** - Paiement en SOL ou ETH
- **Royalties on-chain** - % automatique aux artistes
- **Historique blockchain** - Traçabilité complète

---

## 🔐 Configuration OAuth2 & 2FA

### Google OAuth2

1. Créer un projet sur [Google Cloud Console](https://console.cloud.google.com)
2. Activer l'API "Google+ API" ou "People API"
3. Créer des identifiants OAuth 2.0 :
   - **Origines autorisées** : `http://localhost:3000`
   - **URI de redirection** : `http://localhost:4000/auth/google/callback`
4. Copier `CLIENT_ID` et `CLIENT_SECRET` dans `.env`

### GitHub OAuth2

1. Aller sur [GitHub Developer Settings](https://github.com/settings/developers)
2. Créer une "New OAuth App"
3. Configurer :
   - **Homepage URL** : `http://localhost:3000`
   - **Callback URL** : `http://localhost:4000/auth/github/callback`
4. Copier `CLIENT_ID` et `CLIENT_SECRET` dans `.env`

### 2FA (TOTP)

- Compatible avec : **Google Authenticator**, **Authy**, **Microsoft Authenticator**
- Scan du QR code automatique lors de la première connexion
- 10 codes de secours générés (à sauvegarder !)

---

## 🔗 Smart Contracts

### Solana (Rust + Anchor)

#### Installation

```bash
# Installer Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Installer Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Installer Anchor
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked

# Vérifier les installations
solana --version
anchor --version
```

#### Déploiement Solana

```bash
cd contracts/solana

# Build le programme
anchor build

# Déployer sur devnet
solana config set --url devnet
anchor deploy

# Tester le programme
anchor test
```

#### Features Smart Contract Solana

- **Mint NFT** - Création NFT avec metadata (titre, artiste, image URI)
- **Transfer** - Transfert de propriété NFT
- **Royalties** - Pourcentage automatique aux créateurs (2-10%)
- **Burn** - Destruction de NFT

### Ethereum (Solidity + Hardhat)

#### Installation

```bash
cd contracts/ethereum

# Installer les dépendances
npm install

# Compiler les contrats
npx hardhat compile
```

#### Déploiement Ethereum

```bash
# Déployer sur Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia

# Tester les contrats
npx hardhat test

# Vérifier sur Etherscan
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

#### Features Smart Contracts Ethereum

**GeishaNFT.sol (ERC-721)**
- Standard ERC-721 (NFT unique)
- Metadata on-chain (nom, description, image)
- Royalties EIP-2981
- Enumerable (liste tous les NFTs)

**Marketplace.sol**
- Listing NFT à vendre
- Achat direct (ETH)
- Système d'offres (bidding)
- Royalties automatiques aux artistes
- Frais plateforme configurables (2-5%)

### Connexion Wallets

#### Phantom (Solana)

```bash
# Dans le frontend
cd frontend
npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-phantom
```

#### MetaMask (Ethereum)

```bash
# Dans le frontend
npm install ethers
```

---

## 🤝 Contribution


Les contributions sont les bienvenues ! Voici comment participer :

### Pour les nouveaux contributeurs

1. **Fork** le repository
2. **Clone** votre fork localement
3. **Créer une branche** pour votre feature
   ```bash
   git checkout -b feature/ma-nouvelle-feature
   ```
4. **Commit** vos changements
   ```bash
   git commit -m "feat: ajout de ma nouvelle feature"
   ```
5. **Push** vers votre fork
   ```bash
   git push origin feature/ma-nouvelle-feature
   ```
6. **Ouvrir une Pull Request** sur le repository principal

### Conventions de commit

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatting, lint
- `refactor:` Refactoring de code
- `test:` Ajout de tests
- `chore:` Maintenance

### Zones de contribution

- 🎨 **Frontend** - Amélioration UI/UX, effets 3D
- ⚡ **Backend** - API, authentification, blockchain
- 🔗 **Smart Contracts** - Solana/Ethereum contracts
- 📝 **Documentation** - README, guides, tutorials
- 🐛 **Tests** - Unit tests, integration tests

---

## 🚀 Déploiement

### Frontend (Nuxt SSR)

**Vercel** (recommandé)
```bash
npm i -g vercel
cd frontend
vercel --prod
```

**Netlify**
```bash
cd frontend
npm run build
# Déployer le dossier .output/public
```

### Backend (Node.js/Express)

**Railway** (recommandé)
1. Créer compte sur [Railway.app](https://railway.app)
2. Connecter GitHub repository
3. Configurer variables `.env` en production
4. Déploiement automatique à chaque push

**Render**
1. Créer Web Service sur [Render.com](https://render.com)
2. Lier le repo GitHub
3. Build Command: `cd backend && npm install`
4. Start Command: `cd backend && npm start`

### Base de données

**MongoDB Atlas**
1. Créer cluster sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist IP : `0.0.0.0/0` (ou IPs spécifiques)
3. Copier connection string vers `.env` : `MONGO_URI`

### Blockchain (Production)

**Solana Mainnet**
```bash
solana config set --url mainnet-beta
anchor deploy --provider.cluster mainnet
```

**Ethereum Mainnet**
```bash
npx hardhat run scripts/deploy.js --network mainnet
```

⚠️ **Important** : Utilisez les testnets (Solana Devnet / Ethereum Sepolia) pour le développement !

---

## 📝 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 💬 Support & Contact

- 🐛 **Issues** : [GitHub Issues](https://github.com/inessben/geisha-garden/issues)
- 💬 **Discussions** : [GitHub Discussions](https://github.com/inessben/geisha-garden/discussions)
- 📧 **Email** : votre-email@example.com

---

<div align="center">

**🌸 Geisha Garden - Where art meets cyberpunk 💜**

*Créez, mintez, vendez vos œuvres d'art digital en NFT*

**Fait avec ❤️ par la communauté**

</div>
