import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

/**
 * Generate a JWT token with payload
 * @param {Object} payload - Data to encode in token
 * @param {string} expiresIn - Expiry time (e.g., '7d', '1h', '30m')
 * @returns {string} JWT token
 */
export const generateToken = (payload, expiresIn = '7d') => {
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn,
    issuer: 'farmnet-app',
    audience: 'farmnet-users'
  });
};

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded payload or throws error
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'farmnet-app',
      audience: 'farmnet-users'
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else if (error.name === 'NotBeforeError') {
      throw new Error('Token not active yet');
    } else {
      throw new Error('Token verification failed');
    }
  }
};

/**
 * Generate admin token with specific payload
 * @param {Object} admin - Admin user object
 * @returns {string} JWT token
 */
export const generateAdminToken = (admin) => {
  const payload = {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    type: 'admin',
    iat: Math.floor(Date.now() / 1000), // Issued at
    permissions: getAdminPermissions(admin.role)
  };
  
  return generateToken(payload, '7d');
};

/**
 * Generate user token for farmers/buyers
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
export const generateUserToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.firstName + ' ' + user.lastName,
    userType: user.userType,
    type: 'user',
    iat: Math.floor(Date.now() / 1000),
    verified: user.isVerified
  };
  
  return generateToken(payload, '30d');
};

/**
 * Generate refresh token (longer expiry)
 * @param {string} userId - User ID
 * @param {string} tokenType - 'admin' or 'user'
 * @returns {string} Refresh token
 */
export const generateRefreshToken = (userId, tokenType) => {
  const payload = {
    userId,
    type: 'refresh',
    tokenType,
    iat: Math.floor(Date.now() / 1000)
  };
  
  return generateToken(payload, '30d');
};

/**
 * Generate temporary token for password reset, email verification, etc.
 * @param {string} userId - User ID
 * @param {string} purpose - Token purpose ('reset', 'verify', etc.)
 * @returns {string} Temporary token
 */
export const generateTempToken = (userId, purpose) => {
  const payload = {
    userId,
    purpose,
    type: 'temporary',
    iat: Math.floor(Date.now() / 1000)
  };
  
  return generateToken(payload, '1h'); // Short expiry for security
};

/**
 * Decode token without verification (useful for expired tokens)
 * @param {string} token - JWT token
 * @returns {Object} Decoded payload
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if expired
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

/**
 * Get token expiry date
 * @param {string} token - JWT token
 * @returns {Date|null} Expiry date or null
 */
export const getTokenExpiry = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) return null;
    
    return new Date(decoded.exp * 1000);
  } catch (error) {
    return null;
  }
};

/**
 * Refresh an access token using refresh token
 * @param {string} refreshToken - Refresh token
 * @returns {Object} New tokens or error
 */
export const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = verifyToken(refreshToken);
    
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid refresh token');
    }
    
    // Get user/admin from database based on tokenType
    // This is a simplified example - you'd fetch from your database
    const newPayload = {
      id: decoded.userId,
      type: decoded.tokenType,
      iat: Math.floor(Date.now() / 1000)
    };
    
    const newAccessToken = generateToken(newPayload, '1h');
    const newRefreshToken = generateRefreshToken(decoded.userId, decoded.tokenType);
    
    return {
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get admin permissions based on role
 * @param {string} role - Admin role
 * @returns {Array} Array of permissions
 */
const getAdminPermissions = (role) => {
  const permissions = {
    'SUPER_ADMIN': [
      'manage_users',
      'manage_admins', 
      'manage_market_updates',
      'manage_orders',
      'manage_finances',
      'system_settings',
      'view_analytics'
    ],
    'ADMIN': [
      'manage_market_updates',
      'manage_orders',
      'view_analytics',
      'manage_users'
    ],
    'MODERATOR': [
      'manage_market_updates',
      'view_analytics'
    ]
  };
  
  return permissions[role] || [];
};

// Export all functions
export default {
  generateToken,
  verifyToken,
  generateAdminToken,
  generateUserToken,
  generateRefreshToken,
  generateTempToken,
  decodeToken,
  isTokenExpired,
  getTokenExpiry,
  refreshAccessToken
};