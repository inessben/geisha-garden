// 🎮 Contrôleur pour la gestion des produits de la marketplace Geisha Garden
// Gère toutes les opérations CRUD et logique métier des produits

const Product = require('../models/Product');
const ResponseService = require('../services/ResponseService');

class ProductController {
  
  /**
   * 📋 Récupérer tous les produits avec filtres et pagination
   * GET /api/products
   */
  async index(req, res) {
    try {
      const {
        page = 1,
        limit = 12,
        search,
        categoryId,
        minPrice,
        maxPrice,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        inStock = 'true'
      } = req.query;

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sortBy,
        sortOrder: sortOrder === 'desc' ? -1 : 1,
        categoryId,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        inStock: inStock === 'true'
      };

      const products = await Product.search(search, options);
      const total = await Product.countDocuments({
        isActive: true,
        ...(categoryId && { categoryId }),
        ...(options.minPrice && { price: { $gte: options.minPrice } }),
        ...(options.maxPrice && { price: { $lte: options.maxPrice } }),
        ...(options.inStock && { stock: { $gt: 0 } })
      });

      return ResponseService.success(res, {
        products,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          count: products.length,
          totalRecords: total
        }
      }, 'Produits récupérés avec succès');

    } catch (error) {
      return ResponseService.error(res, 'Erreur lors de la récupération des produits', error);
    }
  }

  /**
   * 🔍 Récupérer un produit par ID ou slug
   * GET /api/products/:id
   */
  async show(req, res) {
    try {
      const { id } = req.params;
      let product;

      // Recherche par ID MongoDB ou par slug
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findById(id)
          .populate('categoryId', 'name slug')
          .populate('vendorId', 'name avatar');
      } else {
        product = await Product.findOne({ 'seo.slug': id })
          .populate('categoryId', 'name slug')
          .populate('vendorId', 'name avatar');
      }

      if (!product || !product.isActive) {
        return ResponseService.notFound(res, 'Produit non trouvé');
      }

      // Incrémenter le compteur de vues
      await product.incrementViews();

      return ResponseService.success(res, { product }, 'Produit trouvé');

    } catch (error) {
      return ResponseService.error(res, 'Erreur lors de la récupération du produit', error);
    }
  }

  /**
   * ✨ Récupérer les produits mis en avant
   * GET /api/products/featured
   */
  async featured(req, res) {
    try {
      const { limit = 8 } = req.query;
      const products = await Product.getFeatured(parseInt(limit));

      return ResponseService.success(res, { products }, 'Produits mis en avant récupérés');

    } catch (error) {
      return ResponseService.error(res, 'Erreur lors de la récupération des produits mis en avant', error);
    }
  }

  /**
   * 🔍 Recherche de produits avec autocomplétion
   * GET /api/products/search/:query
   */
  async search(req, res) {
    try {
      const { query } = req.params;
      const { limit = 10 } = req.query;

      if (!query || query.length < 2) {
        return ResponseService.badRequest(res, 'La recherche doit contenir au moins 2 caractères');
      }

      const products = await Product.find({
        $text: { $search: query },
        isActive: true,
        stock: { $gt: 0 }
      })
      .select('name price images seo.slug')
      .limit(parseInt(limit))
      .sort({ score: { $meta: 'textScore' } });

      return ResponseService.success(res, { products }, `${products.length} résultat(s) trouvé(s)`);

    } catch (error) {
      return ResponseService.error(res, 'Erreur lors de la recherche', error);
    }
  }

  /**
   * ➕ Créer un nouveau produit
   * POST /api/products
   */
  async store(req, res) {
    try {
      const {
        name,
        description,
        price,
        images,
        categoryId,
        vendorId,
        stock,
        tags,
        specifications,
        isFeatured = false
      } = req.body;

      // Validation basique
      if (!name || !description || !price || !images || !categoryId || !vendorId) {
        return ResponseService.badRequest(res, 'Tous les champs obligatoires doivent être renseignés');
      }

      if (!Array.isArray(images) || images.length === 0) {
        return ResponseService.badRequest(res, 'Au moins une image est requise');
      }

      const product = new Product({
        name,
        description,
        price: parseFloat(price),
        images,
        categoryId,
        vendorId,
        stock: parseInt(stock) || 0,
        tags: Array.isArray(tags) ? tags : [],
        specifications: specifications || {},
        isFeatured
      });

      await product.save();

      // Peupler les références pour la réponse
      await product.populate('categoryId', 'name slug');
      await product.populate('vendorId', 'name');

      return ResponseService.created(res, { product }, 'Produit créé avec succès');

    } catch (error) {
      if (error.name === 'ValidationError') {
        return ResponseService.validationError(res, error);
      }
      return ResponseService.error(res, 'Erreur lors de la création du produit', error);
    }
  }

  /**
   * ✏️ Mettre à jour un produit
   * PUT /api/products/:id
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Supprimer les champs non modifiables
      delete updateData._id;
      delete updateData.createdAt;
      delete updateData.updatedAt;
      delete updateData.stats;

      const product = await Product.findByIdAndUpdate(
        id,
        updateData,
        { 
          new: true, 
          runValidators: true 
        }
      )
      .populate('categoryId', 'name slug')
      .populate('vendorId', 'name');

      if (!product) {
        return ResponseService.notFound(res, 'Produit non trouvé');
      }

      return ResponseService.success(res, { product }, 'Produit mis à jour avec succès');

    } catch (error) {
      if (error.name === 'ValidationError') {
        return ResponseService.validationError(res, error);
      }
      return ResponseService.error(res, 'Erreur lors de la mise à jour du produit', error);
    }
  }

  /**
   * 🗑️ Supprimer un produit (soft delete)
   * DELETE /api/products/:id
   */
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findById(id);
      if (!product) {
        return ResponseService.notFound(res, 'Produit non trouvé');
      }

      // Soft delete : marquer comme inactif
      product.isActive = false;
      await product.save();

      return ResponseService.success(res, null, 'Produit supprimé avec succès');

    } catch (error) {
      return ResponseService.error(res, 'Erreur lors de la suppression du produit', error);
    }
  }

  /**
   * 📊 Statistiques des produits d'un vendeur
   * GET /api/products/vendor/:vendorId/stats
   */
  async vendorStats(req, res) {
    try {
      const { vendorId } = req.params;

      const stats = await Product.aggregate([
        { $match: { vendorId: mongoose.Types.ObjectId(vendorId), isActive: true } },
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            totalViews: { $sum: '$stats.views' },
            totalSales: { $sum: '$stats.sales' },
            averageRating: { $avg: '$stats.rating' },
            totalStock: { $sum: '$stock' }
          }
        }
      ]);

      const result = stats[0] || {
        totalProducts: 0,
        totalViews: 0,
        totalSales: 0,
        averageRating: 0,
        totalStock: 0
      };

      return ResponseService.success(res, { stats: result }, 'Statistiques récupérées');

    } catch (error) {
      return ResponseService.error(res, 'Erreur lors de la récupération des statistiques', error);
    }
  }

  /**
   * 📦 Mettre à jour le stock d'un produit
   * PATCH /api/products/:id/stock
   */
  async updateStock(req, res) {
    try {
      const { id } = req.params;
      const { quantity, operation = 'set' } = req.body; // 'set', 'add', 'subtract'

      if (typeof quantity !== 'number' || quantity < 0) {
        return ResponseService.badRequest(res, 'Quantité invalide');
      }

      const product = await Product.findById(id);
      if (!product) {
        return ResponseService.notFound(res, 'Produit non trouvé');
      }

      switch (operation) {
        case 'add':
          product.stock += quantity;
          break;
        case 'subtract':
          if (product.stock < quantity) {
            return ResponseService.badRequest(res, 'Stock insuffisant');
          }
          product.stock -= quantity;
          break;
        case 'set':
        default:
          product.stock = quantity;
          break;
      }

      await product.save();

      return ResponseService.success(res, { 
        stock: product.stock 
      }, `Stock mis à jour: ${product.stock} unité(s)`);

    } catch (error) {
      return ResponseService.error(res, 'Erreur lors de la mise à jour du stock', error);
    }
  }
}

module.exports = new ProductController();
