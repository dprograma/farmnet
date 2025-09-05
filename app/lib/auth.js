import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const authenticateAdmin = async (email, password) => {
  try {
    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!admin) {
      throw new Error('Invalid credentials');
    }

    if (!admin.isActive) {
      throw new Error('Account is deactivated');
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    });

    // Generate JWT token
    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
      type: 'admin'
    });

    // Return admin data (exclude password)
    const { password: _, ...adminData } = admin;
    
    return {
      success: true,
      admin: adminData,
      token,
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const validateAdminToken = async (token) => {
  try {
    const payload = verifyToken(token);
    
    if (payload.type !== 'admin') {
      throw new Error('Invalid token type');
    }

    // Verify admin still exists and is active
    const admin = await prisma.admin.findUnique({
      where: { id: payload.id },
    });

    if (!admin || !admin.isActive) {
      throw new Error('Admin not found or inactive');
    }

    const { password: _, ...adminData } = admin;
    return { success: true, admin: adminData };

  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const requireAdmin = (handler) => {
  return async (req) => {
    try {
      const token = req.headers.get('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Authentication token required' 
        }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      const validation = await validateAdminToken(token);
      if (!validation.success) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: validation.error 
        }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      // Attach admin data to request
      req.admin = validation.admin;
      
      return handler(req);
    } catch (error) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Authentication error' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  };
};

// Middleware to check admin permissions
export const requireAdminRole = (requiredRoles = ['ADMIN', 'SUPER_ADMIN']) => {
  return (handler) => {
    return requireAdmin(async (req) => {
      const adminRole = req.admin.role;
      
      if (!requiredRoles.includes(adminRole)) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Insufficient permissions' 
        }), {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      
      return handler(req);
    });
  };
};