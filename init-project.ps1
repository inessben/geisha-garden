# Script d'initialisation du projet Geisha Garden
# Ce script contient toutes les commandes utilisées pour initialiser le projet

Write-Host "=== Initialisation du projet Geisha Garden ===" -ForegroundColor Green

# Vérification de Node.js
Write-Host "Vérification de Node.js..." -ForegroundColor Yellow
node --version
npm --version

# 1. Initialisation du projet principal
Write-Host "Initialisation du package.json principal..." -ForegroundColor Yellow
npm init -y

# 2. Installation de concurrently pour gérer les processus multiples
Write-Host "Installation de concurrently..." -ForegroundColor Yellow
npm install --save-dev concurrently

# 3. Création de la structure des dossiers
Write-Host "Création de la structure des dossiers..." -ForegroundColor Yellow
if (-not (Test-Path "backend")) { New-Item -ItemType Directory -Name "backend" }
if (-not (Test-Path "frontend")) { New-Item -ItemType Directory -Name "frontend" }
if (-not (Test-Path "shared")) { New-Item -ItemType Directory -Name "shared" }

# 4. Initialisation du backend Express
Write-Host "Initialisation du backend Express..." -ForegroundColor Yellow
Set-Location backend
npm init -y
npm install express cors helmet compression morgan
npm install --save-dev nodemon @types/node
Set-Location ..

# 5. Initialisation du frontend React avec Vite
Write-Host "Initialisation du frontend React..." -ForegroundColor Yellow
npm create vite@latest frontend -- --template react-ts
Set-Location frontend
npm install
Set-Location ..

# 6. Configuration du shared folder
Write-Host "Configuration du dossier shared..." -ForegroundColor Yellow
Set-Location shared
npm init -y
Set-Location ..

# 7. Création du .gitignore
Write-Host "Création du .gitignore..." -ForegroundColor Yellow
@"
# Dependencies
node_modules/
*/node_modules/

# Build outputs
dist/
build/
*.tsbuildinfo

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Docker
.dockerignore
docker-compose.override.yml
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8

# 8. Configuration du Docker Compose
Write-Host "Création du docker-compose.yml..." -ForegroundColor Yellow
@"
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run dev

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    environment:
      - NODE_ENV=development
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm run dev
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend
      - backend
"@ | Out-File -FilePath "docker-compose.yml" -Encoding UTF8

# 9. Création du fichier server.js pour le backend
Write-Host "Création du serveur Express..." -ForegroundColor Yellow
@"
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de sécurité et performance
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

// Configuration CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com' 
    : 'http://localhost:5173',
  credentials: true
}));

// Middleware pour parser JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes de base
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/geishas', (req, res) => {
  res.json({
    message: 'Liste des geishas',
    data: [
      { id: 1, name: 'Sakura', speciality: 'Danse traditionnelle' },
      { id: 2, name: 'Yuki', speciality: 'Musique shamisen' },
      { id: 3, name: 'Hana', speciality: 'Cérémonie du thé' }
    ]
  });
});

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🌸 Geisha Garden Backend running on port `${`PORT`});
  console.log(`🌸 Environment: `${`process.env.NODE_ENV || 'development'`);
  console.log(`🌸 Health check: http://localhost:`${`PORT`}/api/health`);
});
"@ | Out-File -FilePath "backend/server.js" -Encoding UTF8

# 10. Mise à jour du package.json du backend
Write-Host "Configuration des scripts backend..." -ForegroundColor Yellow
$backendPackageJson = @{
  name = "geisha-garden-backend"
  version = "1.0.0"
  description = "Backend API for Geisha Garden application"
  main = "server.js"
  scripts = @{
    start = "node server.js"
    dev = "nodemon server.js"
    test = "echo `"Error: no test specified`" && exit 1"
  }
  keywords = @("geisha", "garden", "api", "express")
  author = ""
  license = "ISC"
  dependencies = @{
    express = "^4.18.2"
    cors = "^2.8.5"
    helmet = "^7.1.0"
    compression = "^1.7.4"
    morgan = "^1.10.0"
  }
  devDependencies = @{
    nodemon = "^3.0.2"
    "@types/node" = "^20.10.4"
  }
}
$backendPackageJson | ConvertTo-Json -Depth 10 | Out-File -FilePath "backend/package.json" -Encoding UTF8

# 11. Mise à jour du package.json principal
Write-Host "Configuration des scripts principaux..." -ForegroundColor Yellow
$mainPackageJson = @{
  name = "geisha-garden"
  version = "1.0.0"
  description = "Application web Geisha Garden - Frontend React + Backend Express"
  main = "index.js"
  scripts = @{
    dev = "concurrently `"npm run dev:backend`" `"npm run dev:frontend`""
    "dev:backend" = "cd backend && npm run dev"
    "dev:frontend" = "cd frontend && npm run dev"
    "build" = "npm run build:frontend && npm run build:backend"
    "build:frontend" = "cd frontend && npm run build"
    "build:backend" = "cd backend && npm install --production"
    "start" = "concurrently `"npm run start:backend`" `"npm run start:frontend`""
    "start:backend" = "cd backend && npm start"
    "start:frontend" = "cd frontend && npm run preview"
    "install:all" = "npm install && cd backend && npm install && cd ../frontend && npm install && cd ../shared && npm install"
    test = "echo `"Error: no test specified`" && exit 1"
  }
  keywords = @("geisha", "garden", "react", "express", "fullstack")
  author = ""
  license = "ISC"
  devDependencies = @{
    concurrently = "^8.2.2"
  }
}
$mainPackageJson | ConvertTo-Json -Depth 10 | Out-File -FilePath "package.json" -Encoding UTF8

# 12. Installation de toutes les dépendances
Write-Host "Installation de toutes les dépendances..." -ForegroundColor Yellow
npm run install:all

# 13. Configuration Git (si pas déjà fait)
Write-Host "Configuration Git..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    git init
    git add .
    git commit -m "Initial commit: Geisha Garden project setup"
}

# 14. Création du README
Write-Host "Création du README..." -ForegroundColor Yellow
@"
# 🌸 Geisha Garden

Application web fullstack avec React (frontend) et Express.js (backend).

## Structure du projet

```
geisha-garden/
├── backend/          # API Express.js
├── frontend/         # Application React avec Vite
├── shared/           # Code partagé
├── docker-compose.yml
└── package.json      # Scripts de gestion du projet
```

## Installation

1. Cloner le repository
2. Exécuter le script d'initialisation:
   ```powershell
   .\init-project.ps1
   ```

Ou manuellement:
```bash
npm run install:all
```

## Développement

Démarrer les deux serveurs en parallèle:
```bash
npm run dev
```

Ou séparément:
- Backend: `npm run dev:backend` (port 3001)
- Frontend: `npm run dev:frontend` (port 5173)

## Production

1. Build:
   ```bash
   npm run build
   ```

2. Démarrer:
   ```bash
   npm run start
   ```

## Docker

```bash
docker-compose up -d
```

## Endpoints API

- `GET /api/health` - Health check
- `GET /api/geishas` - Liste des geishas

## Technologies

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Express.js, Node.js
- **Dev Tools**: Concurrently, Nodemon
- **Containerisation**: Docker
"@ | Out-File -FilePath "README.md" -Encoding UTF8

Write-Host "=== Initialisation terminée avec succès! ===" -ForegroundColor Green
Write-Host "Pour démarrer le projet:" -ForegroundColor Cyan
Write-Host "npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "URLs:" -ForegroundColor Cyan
Write-Host "- Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "- Backend: http://localhost:3001" -ForegroundColor White
Write-Host "- API Health: http://localhost:3001/api/health" -ForegroundColor White
