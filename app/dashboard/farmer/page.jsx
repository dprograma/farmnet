'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  FiDollarSign,
  FiTrendingUp,
  FiPackage,
  FiShoppingCart,
  FiTarget,
  FiTruck,
  FiPieChart,
  FiArrowUp,
  FiArrowDown,
  FiPlus,
  FiEye,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiUser
} from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { formatCurrency } from '../../lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function FarmerDashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const [userStats, setUserStats] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }
  }, [loading, isAuthenticated]);

  // Load user statistics
  useEffect(() => {
    const loadStats = async () => {
      if (user) {
        try {
          // Import API function dynamically to avoid SSR issues
          const { getUserStats } = await import('../../lib/api');
          const result = await getUserStats();
          if (result.success) {
            setUserStats(result.data);
          }
        } catch (error) {
          console.error('Error loading stats:', error);
        }
      }
    };

    loadStats();
  }, [user]);

  // Show loading while authenticating
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to continue</h1>
          <a href="/auth/login" className="text-primary-600 hover:text-primary-700">
            Go to Login
          </a>
        </div>
      </div>
    );
  }
  const stats = userStats ? [
    {
      title: 'Total Earnings',
      value: formatCurrency(userStats.totalEarnings),
      change: '+12.5%',
      changeType: 'positive',
      icon: FiDollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Active Products',
      value: userStats.activeProducts.toString(),
      change: '+3',
      changeType: 'positive',
      icon: FiPackage,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Pending Orders',
      value: userStats.pendingOrders.toString(),
      change: '+2',
      changeType: 'positive',
      icon: FiShoppingCart,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Savings Balance',
      value: formatCurrency(userStats.savingsBalance),
      change: '+8.2%',
      changeType: 'positive',
      icon: FiPieChart,
      color: 'bg-purple-100 text-purple-600'
    }
  ] : [];

  const recentOrders = [
    {
      id: 'FN202401001',
      buyer: 'ABC Agro Ltd',
      product: 'Premium Rice',
      quantity: '5 tons',
      amount: formatCurrency(750000),
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 'FN202401002',
      buyer: 'Fresh Foods Inc',
      product: 'Organic Tomatoes',
      quantity: '2 tons',
      amount: formatCurrency(320000),
      status: 'approved',
      date: '2024-01-14'
    },
    {
      id: 'FN202401003',
      buyer: 'Green Valley Co',
      product: 'Sweet Corn',
      quantity: '3 tons',
      amount: formatCurrency(480000),
      status: 'delivered',
      date: '2024-01-12'
    }
  ];

  const upcomingTasks = [
    {
      title: 'Harvest Sweet Corn',
      description: 'Field A - Section 2',
      date: '2024-01-20',
      priority: 'high',
      icon: FiTarget
    },
    {
      title: 'Apply Fertilizer',
      description: 'Rice paddy - North field',
      date: '2024-01-22',
      priority: 'medium',
      icon: FiTruck
    },
    {
      title: 'Loan Payment Due',
      description: 'Input financing - Q1',
      date: '2024-01-25',
      priority: 'high',
      icon: FiDollarSign
    }
  ];

  const quickActions = [
    {
      title: 'List New Product',
      description: 'Add produce to marketplace',
      icon: FiPlus,
      href: '/dashboard/farmer/products/new',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Apply for Loan',
      description: 'Get financing for inputs',
      icon: FiDollarSign,
      href: '/dashboard/farmer/loans/apply',
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      title: 'View Analytics',
      description: 'Check performance metrics',
      icon: FiTrendingUp,
      href: '/dashboard/farmer/analytics',
      color: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'info';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <DashboardLayout userType="farmer" user={user}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="space-y-6"
      >
        {/* Welcome Section */}
        <motion.div variants={fadeInUp}>
          <div className="bg-green-50 border border-green-200 rounded-xl text-green-800 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl lg:text-2xl font-bold mb-2">Welcome back, {user.name}! 🌾</h1>
                <p className="text-green-700 mb-3">
                  Here's what's happening on your farm today
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-green-600">
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Farm: {user.farmSize}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Location: {user.farmLocation}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Member since: {user.memberSince}</span>
                  </div>
                </div>
              </div>
              <div className="text-left lg:text-right text-green-700 flex-shrink-0">
                <div className="text-sm mb-1">Last login</div>
                <div className="text-lg font-medium">Today, 9:23 AM</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className={`flex items-center text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-success' : 'text-error'
                    }`}>
                      {stat.changeType === 'positive' ? (
                        <FiArrowUp className="w-4 h-4 mr-1" />
                      ) : (
                        <FiArrowDown className="w-4 h-4 mr-1" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={fadeInUp}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    className={`${action.color} text-white h-auto p-4 flex flex-col items-center space-y-2`}
                    onClick={() => window.location.href = action.href}
                  >
                    <action.icon className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs opacity-90">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* User Profile Summary */}
          <motion.div variants={fadeInUp}>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Farm Size</span>
                      <span className="text-sm font-medium">{user.farmSize}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Primary Crops</span>
                      <span className="text-sm font-medium">{user.primaryCrops}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Experience</span>
                      <span className="text-sm font-medium">{user.yearsOfExperience}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Verification</span>
                      <Badge variant={user.verified ? "success" : "warning"} size="sm">
                        {user.verified ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Membership</span>
                      <Badge variant={user.premium ? "info" : "default"} size="sm">
                        {user.premium ? "Premium" : "Basic"}
                      </Badge>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    <FiUser className="w-4 h-4 mr-2" />
                    View Full Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Orders */}
          <motion.div variants={fadeInUp}>
            <Card className="h-fit">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm">
                  <FiEye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">
                            {order.product}
                          </h4>
                          <Badge variant={getStatusColor(order.status)} size="sm">
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {order.buyer} • {order.quantity}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <FiCalendar className="w-3 h-3 mr-1" />
                          {order.date}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-semibold text-gray-900">
                          {order.amount}
                        </p>
                        <p className="text-xs text-gray-500">
                          #{order.id}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div variants={fadeInUp}>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <task.icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">
                            {task.title}
                          </h4>
                          <Badge variant={getPriorityColor(task.priority)} size="sm">
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {task.description}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <FiClock className="w-3 h-3 mr-1" />
                          {task.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Weather Widget */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Weather Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Today', 'Tomorrow', 'Tuesday', 'Wednesday'].map((day, index) => (
                  <div key={day} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900 mb-2">{day}</p>
                    <div className="text-2xl mb-2">☀️</div>
                    <p className="text-sm text-gray-600">28°C / 22°C</p>
                    <p className="text-xs text-gray-500">Sunny</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center text-blue-800">
                  <FiMapPin className="w-4 h-4 mr-2" />
                  <span className="font-medium">Ibeju-Lekki, Lagos</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  Perfect weather for harvest activities this week!
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}