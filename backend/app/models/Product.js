// 🛍️ Modèle Mongoose pour les produits de la marketplace Geisha Garden
// Gère la structure et validation des données produits en base de données

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du produit est requis'],
    trim: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [200, 'Le nom ne peut pas dépasser 200 caractères']
  },
  
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true,
    minlength: [10, 'La description doit contenir au moins 10 caractères'],
    maxlength: [2000, 'La description ne peut pas dépasser 2000 caractères']
  },
  
  price: {
    type: Number,
    required: [true, 'Le prix est requis'],
    min: [0.01, 'Le prix doit être supérieur à 0'],
    max: [999999.99, 'Le prix ne peut pas dépasser 999 999,99€']
  },
  
  // URLs des images du produit
  images: [{
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: 'URL d\'image invalide'
    }
  }],
  
  // Référence à la catégorie
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'La catégorie est requise']
  },
  
  // Référence au vendeur
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Le vendeur est requis']
  },
  
  stock: {
    type: Number,
    required: [true, 'Le stock est requis'],
    min: [0, 'Le stock ne peut pas être négatif'],
    default: 0
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // Tags pour la recherche et filtrage
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Spécifications techniques (flexible)
  specifications: {
    type: Map,
    of: String,
    default: new Map()
  },
  
  // Statistiques du produit
  stats: {
    views: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0 }
  },
  
  // SEO
  seo: {
    metaTitle: { type: String, maxlength: 60 },
    metaDescription: { type: String, maxlength: 160 },
    slug: { 
      type: String, 
      unique: true,
      lowercase: true,
      trim: true
    }
  }
  
}, {
  timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  toJSON: { 
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// Index pour optimiser les recherches
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ categoryId: 1, isActive: 1 });
productSchema.index({ vendorId: 1, isActive: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isFeatured: 1, isActive: 1 });
productSchema.index({ 'stats.rating': -1 });
productSchema.index({ createdAt: -1 });

// Middleware pour générer le slug automatiquement
productSchema.pre('save', function(next) {
  if (this.isModified('name') || this.isNew) {
    this.seo.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
    
    // Ajouter l'ID pour garantir l'unicité
    if (this._id) {
      this.seo.slug += '-' + this._id.toString().slice(-6);
    }
  }
  next();
});

// Méthode pour vérifier si le produit est en stock
productSchema.methods.isInStock = function(quantity = 1) {
  return this.stock >= quantity && this.isActive;
};

// Méthode pour décrémenter le stock
productSchema.methods.decrementStock = function(quantity) {
  if (this.stock >= quantity) {
    this.stock -= quantity;
    this.stats.sales += quantity;
    return this.save();
  } else {
    throw new Error('Stock insuffisant');
  }
};

// Méthode pour incrémenter les vues
productSchema.methods.incrementViews = function() {
  this.stats.views += 1;
  return this.save();
};

// Méthode statique pour rechercher des produits
productSchema.statics.search = function(query, options = {}) {
  const {
    page = 1,
    limit = 12,
    sortBy = 'createdAt',
    sortOrder = -1,
    categoryId,
    minPrice,
    maxPrice,
    inStock = true
  } = options;
  
  const filters = { isActive: true };
  
  if (query) {
    filters.$text = { $search: query };
  }
  
  if (categoryId) {
    filters.categoryId = categoryId;
  }
  
  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.$gte = minPrice;
    if (maxPrice) filters.price.$lte = maxPrice;
  }
  
  if (inStock) {
    filters.stock = { $gt: 0 };
  }
  
  const skip = (page - 1) * limit;
  
  return this.find(filters)
    .populate('categoryId', 'name slug')
    .populate('vendorId', 'name')
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
};

// Méthode statique pour les produits mis en avant
productSchema.statics.getFeatured = function(limit = 8) {
  return this.find({ 
    isFeatured: true, 
    isActive: true, 
    stock: { $gt: 0 } 
  })
  .populate('categoryId', 'name slug')
  .populate('vendorId', 'name')
  .sort({ 'stats.rating': -1, createdAt: -1 })
  .limit(limit);
};

module.exports = mongoose.model('Product', productSchema);
