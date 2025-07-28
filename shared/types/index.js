// 📝 Types partagés entre frontend et backend pour la marketplace Geisha Garden
// Ce fichier contient toutes les interfaces et types utilisés côté client et serveur

/**
 * @typedef {Object} User
 * @property {string} id - Identifiant unique de l'utilisateur
 * @property {string} name - Nom complet de l'utilisateur
 * @property {string} email - Email de l'utilisateur
 * @property {string} [avatar] - URL de l'avatar
 * @property {'customer'|'vendor'|'admin'} role - Rôle de l'utilisateur
 * @property {boolean} isActive - Statut actif/inactif
 * @property {Date} createdAt - Date de création
 * @property {Date} updatedAt - Date de mise à jour
 */

/**
 * @typedef {Object} Product
 * @property {string} id - Identifiant unique du produit
 * @property {string} name - Nom du produit
 * @property {string} description - Description détaillée
 * @property {number} price - Prix en euros
 * @property {string[]} images - URLs des images du produit
 * @property {string} categoryId - ID de la catégorie
 * @property {string} vendorId - ID du vendeur
 * @property {number} stock - Quantité en stock
 * @property {boolean} isActive - Produit actif/inactif
 * @property {boolean} isFeatured - Produit mis en avant
 * @property {string[]} tags - Tags pour la recherche
 * @property {Object} specifications - Spécifications techniques
 * @property {Date} createdAt - Date de création
 * @property {Date} updatedAt - Date de mise à jour
 */

/**
 * @typedef {Object} Category
 * @property {string} id - Identifiant unique de la catégorie
 * @property {string} name - Nom de la catégorie
 * @property {string} slug - Slug URL-friendly
 * @property {string} [description] - Description de la catégorie
 * @property {string} [image] - Image de la catégorie
 * @property {string} [parentId] - ID de la catégorie parente
 * @property {boolean} isActive - Catégorie active/inactive
 * @property {number} sortOrder - Ordre d'affichage
 */

/**
 * @typedef {Object} CartItem
 * @property {string} productId - ID du produit
 * @property {Product} product - Données du produit
 * @property {number} quantity - Quantité commandée
 * @property {number} unitPrice - Prix unitaire au moment de l'ajout
 * @property {number} totalPrice - Prix total (quantity * unitPrice)
 */

/**
 * @typedef {Object} Order
 * @property {string} id - Identifiant unique de la commande
 * @property {string} userId - ID de l'utilisateur
 * @property {CartItem[]} items - Articles commandés
 * @property {number} subtotal - Sous-total HT
 * @property {number} shippingCost - Coût de livraison
 * @property {number} tax - Montant des taxes
 * @property {number} total - Total TTC
 * @property {'pending'|'confirmed'|'processing'|'shipped'|'delivered'|'cancelled'} status - Statut de la commande
 * @property {Address} shippingAddress - Adresse de livraison
 * @property {Address} billingAddress - Adresse de facturation
 * @property {string} paymentMethod - Méthode de paiement
 * @property {string} [trackingNumber] - Numéro de suivi
 * @property {Date} createdAt - Date de création
 * @property {Date} updatedAt - Date de mise à jour
 */

/**
 * @typedef {Object} Address
 * @property {string} firstName - Prénom
 * @property {string} lastName - Nom de famille
 * @property {string} street - Rue et numéro
 * @property {string} city - Ville
 * @property {string} zipCode - Code postal
 * @property {string} country - Pays
 * @property {string} [phone] - Numéro de téléphone
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Succès de l'opération
 * @property {string} message - Message de retour
 * @property {*} [data] - Données retournées
 * @property {Object} [pagination] - Informations de pagination
 * @property {string} timestamp - Timestamp de la réponse
 */

// Constantes partagées
const USER_ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  ADMIN: 'admin'
};

const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

const PAYMENT_METHODS = {
  CARD: 'card',
  PAYPAL: 'paypal',
  BANK_TRANSFER: 'bank_transfer'
};

module.exports = {
  USER_ROLES,
  ORDER_STATUSES,
  PAYMENT_METHODS
};
