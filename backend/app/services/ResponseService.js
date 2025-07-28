// 📡 Service de standardisation des réponses API pour la marketplace Geisha Garden
// Centralise la création des réponses HTTP avec un format uniforme

class ResponseService {
  
  /**
   * 🟢 Réponse de succès standard
   */
  static success(res, data = null, message = 'Succès', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * 🟢 Réponse de création réussie
   */
  static created(res, data = null, message = 'Ressource créée avec succès') {
    return this.success(res, data, message, 201);
  }

  /**
   * 🔴 Réponse d'erreur générique
   */
  static error(res, message = 'Une erreur est survenue', error = null, statusCode = 500) {
    console.error('API Error:', error);
    
    return res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error?.message : undefined,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * 🟡 Erreur de validation (400)
   */
  static validationError(res, error) {
    const errors = {};
    
    if (error.errors) {
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * 🟡 Erreur de requête malformée (400)
   */
  static badRequest(res, message = 'Requête malformée') {
    return res.status(400).json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * 🔒 Erreur d'authentification (401)
   */
  static unauthorized(res, message = 'Non autorisé') {
    return res.status(401).json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * 🚫 Erreur d'autorisation (403)
   */
  static forbidden(res, message = 'Accès interdit') {
    return res.status(403).json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * 🔍 Ressource non trouvée (404)
   */
  static notFound(res, message = 'Ressource non trouvée') {
    return res.status(404).json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * ⚡ Conflit de ressource (409)
   */
  static conflict(res, message = 'Conflit de ressource') {
    return res.status(409).json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * 📊 Réponse avec pagination
   */
  static paginated(res, data, pagination, message = 'Données récupérées avec succès') {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination: {
        current: pagination.current,
        total: pagination.total,
        count: pagination.count,
        totalRecords: pagination.totalRecords,
        hasNext: pagination.current < pagination.total,
        hasPrev: pagination.current > 1
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * 📈 Réponse avec métadonnées
   */
  static withMeta(res, data, meta = {}, message = 'Succès') {
    return res.status(200).json({
      success: true,
      message,
      data,
      meta,
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = ResponseService;
