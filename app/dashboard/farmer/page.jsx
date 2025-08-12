'use client';
import { motion } from 'framer-motion';
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
  FiClock
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
  const stats = [
    {
      title: 'Total Earnings',
      value: formatCurrency(2450000),
      change: '+12.5%',
      changeType: 'positive',
      icon: FiDollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Active Products',
      value: '24',
      change: '+3',
      changeType: 'positive',
      icon: FiPackage,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Pending Orders',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: FiShoppingCart,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Savings Balance',
      value: formatCurrency(450000),
      change: '+8.2%',
      changeType: 'positive',
      icon: FiPieChart,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

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
    <DashboardLayout userType="farmer">
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="space-y-6"
      >
        {/* Welcome Section */}
        <motion.div variants={fadeInUp}>
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl text-white p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2">Welcome back, John! 🌾</h1>
            <p className="text-green-100">
              Here's what's happening on your farm today
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
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