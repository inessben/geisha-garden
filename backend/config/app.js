require('dotenv').config();

module.exports = {
  // Configuration de l'application
  app: {
    name: process.env.APP_NAME || 'Geisha Garden',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000,
    url: process.env.APP_URL || 'http://localhost:4000',
    timezone: process.env.TIMEZONE || 'Europe/Paris'
  },

  // Configuration de la base de données
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/geisha_garden',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },

  // Configuration CORS
  cors: {
    origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://localhost:4000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  },

  // Configuration JWT (si besoin)
  jwt: {
    secret: process.env.JWT_SECRET || 'geisha-garden-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },

  // Configuration des uploads
  uploads: {
    maxSize: process.env.UPLOAD_MAX_SIZE || '10mb',
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    path: process.env.UPLOAD_PATH || './storage/uploads'
  },

  // Configuration email (si besoin)
  mail: {
    driver: process.env.MAIL_DRIVER || 'smtp',
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT || 587,
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    encryption: process.env.MAIL_ENCRYPTION || 'tls',
    from: {
      address: process.env.MAIL_FROM_ADDRESS || 'noreply@geisha-garden.com',
      name: process.env.MAIL_FROM_NAME || 'Geisha Garden'
    }
  }
};
