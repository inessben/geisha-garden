# Geisha Garden Project

## Frontend (Next.js, Three.js, Tailwind)
- **Vite** for fast development
- **Next.js** with TypeScript
- **Three.js** for 3D
- **Tailwind CSS** for styling

## Backend (NestJS, Express.js)
- **NestJS** for scalable backend
- **Express.js** for routing

## Installation du projet

## Installation de pnpm

```sh
npm install -g pnpm
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
```

## Clonez le repository 

installez les dépendances nécessaires :

```sh
git clone <repository-url>
cd geisha-garden
pnpm install
```

## Installation des dépendances

### Frontend
```sh
cd frontend
pnpm install
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```

### Backend
```sh
cd backend
pnpm install
pnpm install @nestjs/platform-express
cd ..
```

## Lancer le projet

### Démarrer le Frontend
```sh
cd frontend
pnpm dev
```

### Démarrer le Backend
```sh
cd backend
pnpm start:dev
```

## Contribution

1. Clone ton repo localement
2. Récupère tous les changement distants : `git checkout feature/newFeature` `git pul --all`
Crée une nouvelle branche : `git checkout -b feature/newFeature`
3. Fais tes modifications et commite : `git commit -m "Ajout d'une nouvelle fonctionnalité"`
4. Pousse ta branche : `git push -u origin feature/newFeature`
5. Merge vers 'develop' : `git checkout develop` `git merge feature/newFeature`
6. Créez une Pull Request via l'interface gitHub: 'base : develop' 'compare : feature/newFeature'

Merci pour votre contribution ! 🚀
