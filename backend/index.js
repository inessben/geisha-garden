const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Routes API
app.get('/api', (req, res) => {
  res.json({ message: 'API Geisha Garden - Backend ready!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Route catch-all pour servir le frontend React (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
});
