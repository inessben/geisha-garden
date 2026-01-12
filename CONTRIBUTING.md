# 🤝 Guide de Contribution - Make It Art

Merci de votre intérêt pour contribuer à **Make It Art** ! Ce guide vous aidera à configurer votre environnement de développement.

---

## 📋 Table des matières

- [Prérequis](#-prérequis)
- [Installation complète](#-installation-complète)
- [Configuration](#-configuration)
- [Développement](#-développement)
- [Tests](#-tests)
- [Conventions](#-conventions)
- [Workflow Git](#-workflow-git)

---

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir installé :

### Outils de base
- **Node.js** >= 18.0.0 ([Télécharger](https://nodejs.org/))
- **npm** >= 9.0.0 (inclus avec Node.js)
- **Git** ([Télécharger](https://git-scm.com/))
- **MongoDB** >= 7.0 ([Télécharger](https://www.mongodb.com/try/download/community))

### Pour le développement blockchain

#### Solana
- **Rust** ([Installation](https://www.rust-lang.org/tools/install))
- **Solana CLI** ([Installation](https://docs.solana.com/cli/install-solana-cli-tools))
- **Anchor** ([Installation](https://www.anchor-lang.com/docs/installation))

#### Ethereum
- Aucune installation supplémentaire (Hardhat sera installé via npm)

### Vérifier les installations

```bash
node --version
npm --version
git --version
mongod --version

# Pour Solana
rustc --version
solana --version
anchor --version
```

---

## 🚀 Installation complète

### 1. Cloner le repository

```bash
# Fork le projet sur GitHub puis clone ton fork
git clone https://github.com/VOTRE-USERNAME/make-it-art.git
cd make-it-art

# Ajouter le repository original comme remote
git remote add upstream https://github.com/inessben/make-it-art.git
```

### 2. Installer les dépendances Backend

```bash
npm install
```

**Dépendances installées :**
- `express` - Framework serveur
- `mongoose` - ODM MongoDB
- `passport` - OAuth2 (Google, GitHub)
- `speakeasy` - 2FA TOTP
- `@solana/web3.js` - Solana SDK
- `ethers` - Ethereum SDK
- `stripe` - Paiements
- `aws-sdk` - Stockage S3

### 3. Installer les dépendances Frontend

```bash
npm install
```

**Dépendances installées :**
- `nuxt` - Framework Vue.js SSR
- `@nuxtjs/tailwindcss` - CSS utility-first
- `three` - Moteur 3D WebGL
- `@solana/wallet-adapter-vue` - Wallet Solana
- `ethers` - Wallet Ethereum
- `pinia` - State management

### 4. Installer les dépendances Smart Contracts

#### Solana (Anchor)

```bash
cd ../contracts/solana

# Initialiser un projet Anchor
anchor init makeitart-nft

cd makeitart-nft
anchor build
```

#### Ethereum (Hardhat)

```bash
cd ../../ethereum

# Initialiser un projet Hardhat
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Créer un projet Hardhat
npx hardhat init
# Choisir : "Create a TypeScript project"

# Installer OpenZeppelin (standards NFT)
npm install @openzeppelin/contracts
```

---

## ⚙️ Configuration

### 1. Variables d'environnement

```bash
# À la racine du projet
cp .env.example .env
```

Éditez le fichier `.env` et remplissez les variables :

#### Base & Database
```env
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017/makeitart
```

#### JWT
```env
JWT_SECRET=votre_secret_jwt_minimum_32_caracteres_aleatoires
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
```

#### OAuth2 - Google
1. Aller sur [Google Cloud Console](https://console.cloud.google.com)
2. Créer un projet
3. Activer "Google+ API"
4. Créer des credentials OAuth 2.0
5. Configurer :
   - **Origines autorisées** : `http://localhost:3000`
   - **URI de redirection** : `http://localhost:4000/auth/google/callback`

```env
GOOGLE_CLIENT_ID=votre_client_id
GOOGLE_CLIENT_SECRET=votre_client_secret
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
```

#### OAuth2 - GitHub
1. Aller sur [GitHub Developer Settings](https://github.com/settings/developers)
2. Créer "New OAuth App"
3. Configurer :
   - **Homepage URL** : `http://localhost:3000`
   - **Callback URL** : `http://localhost:4000/auth/github/callback`

```env
GITHUB_CLIENT_ID=votre_client_id
GITHUB_CLIENT_SECRET=votre_client_secret
GITHUB_CALLBACK_URL=http://localhost:4000/auth/github/callback
```

#### 2FA TOTP
```env
TOTP_ISSUER=Make It Art
TOTP_WINDOW=1
TOTP_STEP=30
```

#### AWS S3 (Optionnel pour dev)
```env
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=eu-west-3
S3_BUCKET=makeitart-artworks
```

#### Stripe (Optionnel pour dev)
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

#### Blockchain - Solana
```env
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_PROGRAM_ID=votre_program_id_apres_deploy
SOLANA_WALLET_SECRET=votre_wallet_secret
```

#### Blockchain - Ethereum
```env
ETHEREUM_NETWORK=sepolia
ETHEREUM_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
ETHEREUM_CONTRACT_ADDRESS=votre_contract_address_apres_deploy
ETHEREUM_PRIVATE_KEY=votre_private_key
```

#### Frontend
```env
NUXT_PUBLIC_API_URL=http://localhost:4000/api
NUXT_PUBLIC_SOLANA_NETWORK=devnet
NUXT_PUBLIC_ETHEREUM_NETWORK=sepolia
```

### 2. Créer les wallets blockchain

#### Solana
```bash
# Créer un wallet Solana
solana-keygen new --outfile ~/.config/solana/id.json

# Voir l'adresse publique
solana address

# Obtenir des SOL de test (devnet)
solana airdrop 2

# Vérifier le solde
solana balance
```

#### Ethereum
```bash
# Utiliser MetaMask ou créer un wallet via Hardhat
cd contracts/ethereum
npx hardhat node
# Copier une des clés privées affichées
```

### 3. Démarrer MongoDB

```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
```

---

## 💻 Développement

### Lancer le projet en mode développement

Ouvrez **3 terminaux** :

#### Terminal 1 - Backend API (port 4000)
```bash
cd backend
npm run dev
```

Le serveur démarre sur `http://localhost:4000`

#### Terminal 2 - Frontend Nuxt (port 3000)
```bash
cd frontend
npm run dev
```

Le site est accessible sur `http://localhost:3000`

#### Terminal 3 - MongoDB
```bash
mongod
```

### Développement des Smart Contracts

#### Solana
```bash
cd contracts/solana/makeitart-nft

# Compiler
anchor build

# Tester
anchor test

# Déployer sur devnet
solana config set --url devnet
anchor deploy

# Voir les logs du programme
solana logs
```

#### Ethereum
```bash
cd contracts/ethereum

# Compiler
npx hardhat compile

# Tester
npx hardhat test

# Déployer sur testnet local
npx hardhat node  # Terminal 1
npx hardhat run scripts/deploy.js --network localhost  # Terminal 2

# Déployer sur Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia
```

---

## 🧪 Tests

### Backend
```bash
cd backend
npm test
npm run test:coverage
```

### Frontend
```bash
cd frontend
npm run test
```

### Smart Contracts

#### Solana
```bash
cd contracts/solana/makeitart-nft
anchor test
```

#### Ethereum
```bash
cd contracts/ethereum
npx hardhat test
npx hardhat coverage
```

---

## 📝 Conventions

### Commits (Conventional Commits)

```bash
# Format
<type>(<scope>): <description>

# Types
feat:       Nouvelle fonctionnalité
fix:        Correction de bug
docs:       Documentation
style:      Formatage (pas de changement de code)
refactor:   Refactoring
test:       Ajout/modification de tests
chore:      Maintenance (build, dépendances)
perf:       Amélioration de performance
```

**Exemples :**
```bash
git commit -m "feat(auth): ajout OAuth2 Google"
git commit -m "fix(nft): correction mint Solana"
git commit -m "docs(readme): mise à jour installation"
git commit -m "style(frontend): format Tailwind"
git commit -m "refactor(api): simplification routes"
git commit -m "test(auth): ajout tests 2FA"
git commit -m "chore(deps): mise à jour dependencies"
```

### Code Style

#### Backend (JavaScript/Node.js)
- Utiliser `const` et `let` (pas `var`)
- Points-virgules obligatoires
- 2 espaces d'indentation
- Nommer les fonctions en camelCase

#### Frontend (Vue/TypeScript)
- Composition API (pas Options API)
- TypeScript pour les types
- Composants en PascalCase
- Props typées

#### Smart Contracts
- **Solana (Rust)** : Conventions Rust standard
- **Ethereum (Solidity)** : Conventions OpenZeppelin

---

## 🔄 Workflow Git

### 1. Synchroniser avec le repo principal

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Créer une branche pour votre feature

```bash
git checkout -b feature/nom-de-la-feature
# ou
git checkout -b fix/nom-du-bug
```

### 3. Faire vos modifications

```bash
# Ajouter les fichiers modifiés
git add .

# Commit avec message conventionnel
git commit -m "feat(scope): description"
```

### 4. Pousser vers votre fork

```bash
git push origin feature/nom-de-la-feature
```

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

```bash
# Faire les modifications demandées
git add .
git commit -m "fix: corrections après review"
git push origin feature/nom-de-la-feature
```

---

## 🎯 Checklist avant PR

- [ ] Le code compile sans erreurs
- [ ] Les tests passent (`npm test`)
- [ ] Le code est formaté correctement
- [ ] Les commits suivent les conventions
- [ ] La documentation est à jour (si nécessaire)
- [ ] Les variables sensibles ne sont pas commitées
- [ ] Le `.env.example` est à jour (si nouvelles variables)

---

## 📚 Ressources

### Documentation officielle
- [Node.js](https://nodejs.org/docs)
- [Express](https://expressjs.com/)
- [Nuxt.js](https://nuxt.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/)
- [Solana](https://docs.solana.com/)
- [Anchor](https://www.anchor-lang.com/)
- [Ethereum](https://ethereum.org/developers)
- [Hardhat](https://hardhat.org/)

### Tutoriels
- [Solana Cookbook](https://solanacookbook.com/)
- [Ethereum by Example](https://solidity-by-example.org/)
- [Web3.js Guide](https://docs.web3js.org/)

---

## 💬 Support

- 🐛 **Issues** : [GitHub Issues](https://github.com/inessben/make-it-art/issues)
- 💬 **Discussions** : [GitHub Discussions](https://github.com/inessben/make-it-art/discussions)
- 📧 **Email** : votre-email@example.com

---

## 🙏 Merci !

Merci de contribuer à **Make It Art** ! Chaque contribution compte, qu'elle soit petite ou grande.

**🌸 Happy Coding! 💜**
