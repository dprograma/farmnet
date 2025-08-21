'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  FiShoppingCart,
  FiTrendingUp,
  FiUsers,
  FiPackage,
  FiDollarSign,
  FiTruck,
  FiStar,
  FiArrowUp,
  FiArrowDown,
  FiSearch,
  FiFilter,
  FiEye,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiBarChart
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

export default function BuyerDashboard() {
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
      title: 'Total Purchases',
      value: formatCurrency(userStats.totalPurchases),
      change: '+18.2%',
      changeType: 'positive',
      icon: FiShoppingCart,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Active Orders',
      value: userStats.activeOrders.toString(),
      change: '+5',
      changeType: 'positive',
      icon: FiPackage,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Suppliers',
      value: userStats.totalSuppliers.toString(),
      change: '+12',
      changeType: 'positive',
      icon: FiUsers,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Cost Savings',
      value: formatCurrency(userStats.costSavings),
      change: '+22.5%',
      changeType: 'positive',
      icon: FiTrendingUp,
      color: 'bg-orange-100 text-orange-600'
    }
  ] : [];

  const recentOrders = [
    {
      id: 'FN202401001',
      farmer: 'Green Valley Farm',
      product: 'Premium Rice',
      quantity: '10 tons',
      amount: formatCurrency(1500000),
      status: 'in_transit',
      date: '2024-01-15',
      delivery: '2024-01-18'
    },
    {
      id: 'FN202401002',
      farmer: 'Sunrise Organic',
      product: 'Fresh Tomatoes',
      quantity: '5 tons',
      amount: formatCurrency(800000),
      status: 'delivered',
      date: '2024-01-14',
      delivery: '2024-01-16'
    },
    {
      id: 'FN202401003',
      farmer: 'Golden Harvest',
      product: 'Sweet Corn',
      quantity: '8 tons',
      amount: formatCurrency(1200000),
      status: 'processing',
      date: '2024-01-12',
      delivery: '2024-01-20'
    }
  ];

  const topProducts = [
    {
      name: 'Premium Rice',
      farmer: 'Green Valley Farm',
      price: formatCurrency(150000),
      unit: 'per ton',
      rating: 4.8,
      availability: 'In Stock',
      location: 'Kebbi State'
    },
    {
      name: 'Organic Tomatoes',
      farmer: 'Sunrise Organic',
      price: formatCurrency(160000),
      unit: 'per ton',
      rating: 4.9,
      availability: 'Limited',
      location: 'Kaduna State'
    },
    {
      name: 'Sweet Corn',
      farmer: 'Golden Harvest',
      price: formatCurrency(120000),
      unit: 'per ton',
      rating: 4.7,
      availability: 'In Stock',
      location: 'Niger State'
    }
  ];

  const marketTrends = [
    {
      product: 'Rice',
      currentPrice: formatCurrency(150000),
      change: '+2.5%',
      changeType: 'positive',
      trend: 'up'
    },
    {
      product: 'Tomatoes',
      currentPrice: formatCurrency(160000),
      change: '-1.2%',
      changeType: 'negative',
      trend: 'down'
    },
    {
      product: 'Corn',
      currentPrice: formatCurrency(120000),
      change: '+0.8%',
      changeType: 'positive',
      trend: 'up'
    },
    {
      product: 'Cassava',
      currentPrice: formatCurrency(80000),
      change: '+3.2%',
      changeType: 'positive',
      trend: 'up'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'warning';
      case 'in_transit':
        return 'info';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'In Stock':
        return 'success';
      case 'Limited':
        return 'warning';
      case 'Out of Stock':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <DashboardLayout userType="buyer" user={user}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="space-y-6"
      >
        {/* Welcome Section */}
        <motion.div variants={fadeInUp}>
          <div className="bg-blue-50 border border-blue-200 rounded-xl text-blue-800 p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}! 🏢</h1>
            <p className="text-blue-700">
              Discover quality produce from verified farmers across Nigeria
            </p>
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
              <CardTitle>Marketplace</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search for products, farmers, or locations..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <FiFilter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button>
                  <FiSearch className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{product.name}</h4>
                      <Badge variant={getAvailabilityColor(product.availability)} size="sm">
                        {product.availability}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{product.farmer}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FiMapPin className="w-4 h-4 mr-1" />
                      {product.location}
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-lg font-bold text-gray-900">{product.price}</span>
                        <span className="text-sm text-gray-500"> {product.unit}</span>
                      </div>
                      <div className="flex items-center">
                        <FiStar className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                            {order.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {order.farmer} • {order.quantity}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <FiClock className="w-3 h-3 mr-1" />
                          Delivery: {order.delivery}
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

          {/* Market Trends */}
          <motion.div variants={fadeInUp}>
            <Card className="h-fit">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Market Trends</CardTitle>
                <Button variant="outline" size="sm">
                  <FiBarChart className="w-4 h-4 mr-2" />
                  Full Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketTrends.map((trend, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FiBarChart className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {trend.product}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Current Price
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {trend.currentPrice}
                        </p>
                        <div className={`flex items-center text-sm font-medium ${
                          trend.changeType === 'positive' ? 'text-success' : 'text-error'
                        }`}>
                          {trend.changeType === 'positive' ? (
                            <FiArrowUp className="w-3 h-3 mr-1" />
                          ) : (
                            <FiArrowDown className="w-3 h-3 mr-1" />
                          )}
                          {trend.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Supply Chain Overview */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Supply Chain Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiUsers className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Farmers</h4>
                  <p className="text-2xl font-bold text-blue-600 mb-1">156</p>
                  <p className="text-sm text-gray-500">Active suppliers</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiPackage className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Products</h4>
                  <p className="text-2xl font-bold text-green-600 mb-1">2,340</p>
                  <p className="text-sm text-gray-500">Available items</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiTruck className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">In Transit</h4>
                  <p className="text-2xl font-bold text-orange-600 mb-1">42</p>
                  <p className="text-sm text-gray-500">Active shipments</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiMapPin className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Locations</h4>
                  <p className="text-2xl font-bold text-purple-600 mb-1">23</p>
                  <p className="text-sm text-gray-500">States covered</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}