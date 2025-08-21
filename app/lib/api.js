// API utility functions for user management
// In a real app, these would make actual HTTP requests to your backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = sessionStorage.getItem('farmnet_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Mock API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userApi = {
  // Login user
  async login(credentials) {
    await delay(1000); // Simulate network delay
    
    const { email, password, userType } = credentials;
    
    // Mock authentication logic
    if (password === 'password123' || password === 'demo') {
      // Mock user data based on email and userType
      let userData;
      
      if (userType === 'farmer') {
        userData = {
          id: email === 'john@farmer.com' ? 'farmer_001' : 'farmer_demo',
          email: email,
          userType: 'farmer',
          name: email === 'john@farmer.com' ? 'John Farmer' : 'Demo Farmer',
          firstName: email === 'john@farmer.com' ? 'John' : 'Demo',
          lastName: email === 'john@farmer.com' ? 'Farmer' : 'Farmer',
          phone: '+234 (0) 123 456 7890',
          address: 'Plot 15, Agricultural Zone, Ibeju-Lekki, Lagos',
          farmName: 'Green Valley Farm',
          farmSize: '5.2 hectares',
          farmLocation: 'Ibeju-Lekki, Lagos',
          primaryCrops: 'Rice, Cassava, Tomatoes',
          yearsOfExperience: '8 years',
          memberSince: '2022',
          verified: true,
          premium: true,
          bankAccount: '**** **** **** 1234',
          bvn: '**** **** 56',
          avatar: null,
          lastLogin: new Date().toISOString()
        };
      } else {
        userData = {
          id: email === 'buyer@demo.com' ? 'buyer_001' : 'buyer_demo',
          email: email,
          userType: 'buyer',
          name: email === 'buyer@demo.com' ? 'ABC Company Ltd' : 'Demo Company',
          companyName: email === 'buyer@demo.com' ? 'ABC Company Ltd' : 'Demo Company',
          companyType: 'FMCG Company',
          businessAddress: 'Plot 15, Victoria Island, Lagos',
          contactPerson: 'Jane Smith',
          phone: '+234 (0) 123 456 7891',
          memberSince: '2022',
          verified: true,
          premium: true,
          avatar: null,
          lastLogin: new Date().toISOString()
        };
      }

      const token = `farmnet_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        success: true,
        data: {
          user: userData,
          token: token
        }
      };
    } else {
      return {
        success: false,
        error: 'Invalid credentials'
      };
    }
  },

  // Register new user
  async register(userData) {
    await delay(1000); // Simulate network delay
    
    try {
      // Create user object
      const newUser = {
        id: `${userData.userType}_${Date.now()}`,
        email: userData.email,
        userType: userData.userType,
        name: userData.userType === 'farmer' 
          ? `${userData.firstName} ${userData.lastName}`
          : userData.companyName,
        ...userData,
        memberSince: new Date().getFullYear().toString(),
        verified: false,
        premium: false,
        avatar: null,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      const token = `farmnet_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        success: true,
        data: {
          user: newUser,
          token: token
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Registration failed'
      };
    }
  },

  // Get current user profile
  async getProfile() {
    await delay(300); // Simulate network delay
    
    try {
      const storedUser = sessionStorage.getItem('farmnet_user');
      if (!storedUser) {
        throw new Error('No user data found');
      }
      
      const userData = JSON.parse(storedUser);
      
      return {
        success: true,
        data: userData
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch profile'
      };
    }
  },

  // Update user profile
  async updateProfile(updates) {
    await delay(500); // Simulate network delay
    
    try {
      const storedUser = sessionStorage.getItem('farmnet_user');
      if (!storedUser) {
        throw new Error('No user data found');
      }
      
      const currentUser = JSON.parse(storedUser);
      const updatedUser = { 
        ...currentUser, 
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      // Update name if firstName or lastName changed (for farmers)
      if (updatedUser.userType === 'farmer' && (updates.firstName || updates.lastName)) {
        updatedUser.name = `${updatedUser.firstName} ${updatedUser.lastName}`;
      }
      
      return {
        success: true,
        data: updatedUser
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update profile'
      };
    }
  },

  // Get user statistics (for dashboard)
  async getUserStats() {
    await delay(300); // Simulate network delay
    
    try {
      const storedUser = sessionStorage.getItem('farmnet_user');
      if (!storedUser) {
        throw new Error('No user data found');
      }
      
      const userData = JSON.parse(storedUser);
      
      // Mock statistics based on user type
      if (userData.userType === 'farmer') {
        return {
          success: true,
          data: {
            totalEarnings: 2450000,
            activeProducts: 24,
            pendingOrders: 8,
            savingsBalance: 450000,
            completedOrders: 156,
            totalProducts: 89
          }
        };
      } else {
        return {
          success: true,
          data: {
            totalPurchases: 15600000,
            activeOrders: 32,
            totalSuppliers: 156,
            costSavings: 2400000,
            completedOrders: 245,
            averageRating: 4.8
          }
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch statistics'
      };
    }
  },

  // Logout user
  async logout() {
    await delay(200); // Simulate network delay
    
    try {
      // In a real app, you might want to invalidate the token on the server
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Logout failed'
      };
    }
  }
};

// Export individual functions for convenience
export const { login, register, getProfile, updateProfile, getUserStats, logout } = userApi;