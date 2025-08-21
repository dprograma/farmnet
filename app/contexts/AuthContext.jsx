'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from session storage on mount
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = sessionStorage.getItem('farmnet_user');
        const storedToken = sessionStorage.getItem('farmnet_token');
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        toast.error('Session expired. Please log in again.');
        // Clear corrupted data
        sessionStorage.removeItem('farmnet_user');
        sessionStorage.removeItem('farmnet_token');
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Mock login function - In real app, this would make API call
  const login = async (email, password, userType) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on user type
      let userData;
      
      if (userType === 'farmer') {
        userData = {
          id: 'farmer_001',
          email: email,
          userType: 'farmer',
          name: email === 'john@farmer.com' ? 'John Farmer' : 'Demo Farmer',
          firstName: email === 'john@farmer.com' ? 'John' : 'Demo',
          lastName: email === 'john@farmer.com' ? 'Farmer' : 'Farmer',
          phone: '+234 (0) 123 456 7890',
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
          avatar: null
        };
      } else {
        userData = {
          id: 'buyer_001',
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
          avatar: null
        };
      }

      // Generate mock token
      const token = `farmnet_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Store in session storage
      sessionStorage.setItem('farmnet_user', JSON.stringify(userData));
      sessionStorage.setItem('farmnet_token', token);
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      
      toast.success(`Welcome back, ${userData.name}! 🎉`);
      return { success: true, user: userData, token };
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object based on registration data
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
        avatar: null
      };

      // Generate mock token
      const token = `farmnet_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Store in session storage
      sessionStorage.setItem('farmnet_user', JSON.stringify(newUser));
      sessionStorage.setItem('farmnet_token', token);
      
      // Update state
      setUser(newUser);
      setIsAuthenticated(true);
      
      toast.success(`Welcome to Farmnet, ${newUser.name}! 🎉`);
      return { success: true, user: newUser, token };
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...updates };
      
      // Store in session storage
      sessionStorage.setItem('farmnet_user', JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
      
      toast.success('Profile updated successfully! ✅');
      return { success: true, user: updatedUser };
      
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Profile update failed. Please try again.');
      return { success: false, error: 'Profile update failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear session storage
    sessionStorage.removeItem('farmnet_user');
    sessionStorage.removeItem('farmnet_token');
    
    // Clear state
    setUser(null);
    setIsAuthenticated(false);
    
    toast.info('You have been logged out successfully. See you soon! 👋');
    
    // Redirect to login after a short delay
    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 1500);
  };

  // Get user by ID (for future API integration)
  const getUserById = async (userId) => {
    try {
      // This would be an API call in a real app
      const token = sessionStorage.getItem('farmnet_token');
      if (!token) {
        throw new Error('No authentication token');
      }
      
      // Mock API response
      return { success: true, user };
    } catch (error) {
      console.error('Get user error:', error);
      toast.error('Failed to fetch user data');
      return { success: false, error: 'Failed to fetch user data' };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    getUserById
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}