// 🌐 Service API pour les appels HTTP de la marketplace Geisha Garden
// Centralise toutes les communications avec le backend

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ApiService {
  
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * 🔧 Méthode générique pour les requêtes HTTP
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur réseau');
      }

      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  /**
   * 🛍️ PRODUITS - Récupérer tous les produits avec filtres
   */
  async getProducts(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/products?${searchParams}`);
  }

  /**
   * 🔍 PRODUITS - Récupérer un produit par ID/slug
   */
  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  /**
   * ✨ PRODUITS - Récupérer les produits mis en avant
   */
  async getFeaturedProducts(limit = 8) {
    return this.request(`/products/featured?limit=${limit}`);
  }

  /**
   * 🔍 PRODUITS - Rechercher des produits
   */
  async searchProducts(query, limit = 10) {
    return this.request(`/products/search/${encodeURIComponent(query)}?limit=${limit}`);
  }

  /**
   * ➕ PRODUITS - Créer un nouveau produit
   */
  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  /**
   * ✏️ PRODUITS - Mettre à jour un produit
   */
  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  /**
   * 🗑️ PRODUITS - Supprimer un produit
   */
  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * 📦 PRODUITS - Mettre à jour le stock
   */
  async updateStock(id, quantity, operation = 'set') {
    return this.request(`/products/${id}/stock`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity, operation }),
    });
  }

  /**
   * 📊 PRODUITS - Statistiques vendeur
   */
  async getVendorStats(vendorId) {
    return this.request(`/products/vendor/${vendorId}/stats`);
  }

  /**
   * 📂 CATÉGORIES - Récupérer toutes les catégories
   */
  async getCategories() {
    return this.request('/categories');
  }

  /**
   * 📂 CATÉGORIES - Récupérer une catégorie
   */
  async getCategory(id) {
    return this.request(`/categories/${id}`);
  }

  /**
   * 🛒 PANIER - Récupérer le panier
   */
  async getCart() {
    return this.request('/cart');
  }

  /**
   * ➕ PANIER - Ajouter un produit au panier
   */
  async addToCart(productId, quantity = 1) {
    return this.request('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  /**
   * ✏️ PANIER - Mettre à jour la quantité
   */
  async updateCartItem(productId, quantity) {
    return this.request('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  /**
   * 🗑️ PANIER - Supprimer un produit du panier
   */
  async removeFromCart(productId) {
    return this.request('/cart/remove', {
      method: 'DELETE',
      body: JSON.stringify({ productId }),
    });
  }

  /**
   * 🧹 PANIER - Vider le panier
   */
  async clearCart() {
    return this.request('/cart/clear', {
      method: 'DELETE',
    });
  }

  /**
   * 📋 COMMANDES - Récupérer les commandes de l'utilisateur
   */
  async getOrders() {
    return this.request('/orders');
  }

  /**
   * 🔍 COMMANDES - Récupérer une commande
   */
  async getOrder(id) {
    return this.request(`/orders/${id}`);
  }

  /**
   * ✅ COMMANDES - Créer une commande
   */
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  /**
   * 👤 UTILISATEURS - Authentification
   */
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  /**
   * 📝 UTILISATEURS - Inscription
   */
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  /**
   * 🚪 UTILISATEURS - Déconnexion
   */
  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  /**
   * 👤 UTILISATEURS - Profil utilisateur
   */
  async getProfile() {
    return this.request('/users/profile');
  }

  /**
   * ✏️ UTILISATEURS - Mettre à jour le profil
   */
  async updateProfile(userData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  /**
   * 🔑 UTILISATEURS - Changer le mot de passe
   */
  async changePassword(currentPassword, newPassword) {
    return this.request('/users/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  /**
   * 📊 DASHBOARD - Statistiques générales
   */
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  /**
   * 🔍 SANTÉ - Vérifier l'état de l'API
   */
  async healthCheck() {
    return this.request('/health');
  }
}

// Instance singleton
const apiService = new ApiService();

export default apiService;
