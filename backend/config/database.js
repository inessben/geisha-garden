const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/geisha_garden', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connectée: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('🔌 MongoDB déconnectée');
  } catch (error) {
    console.error('❌ Erreur de déconnexion MongoDB:', error.message);
  }
};

module.exports = {
  connectDB,
  disconnectDB,
  connection: mongoose.connection
};
