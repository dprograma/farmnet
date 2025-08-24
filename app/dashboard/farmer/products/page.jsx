'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiPackage, 
  FiPlus, 
  FiSearch, 
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiTrendingUp,
  FiTrendingDown,
  FiBarChart,
  FiCalendar
} from 'react-icons/fi';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Badge from '../../../components/ui/Badge';
import { toast } from 'react-toastify';

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

export default function FarmerProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - In real app, this would come from API
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Rice',
      category: 'Grains',
      status: 'active',
      quantity: '500 kg',
      price: '₦800/kg',
      totalValue: '₦400,000',
      image: '/api/placeholder/300/200',
      description: 'High quality premium rice, perfect for export',
      dateCreated: '2024-01-15',
      views: 45,
      orders: 12
    },
    {
      id: 2,
      name: 'Fresh Cassava',
      category: 'Tubers',
      status: 'active',
      quantity: '1,200 kg',
      price: '₦300/kg',
      totalValue: '₦360,000',
      image: '/api/placeholder/300/200',
      description: 'Fresh cassava tubers, harvested yesterday',
      dateCreated: '2024-01-10',
      views: 32,
      orders: 8
    },
    {
      id: 3,
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      status: 'low_stock',
      quantity: '50 kg',
      price: '₦1,200/kg',
      totalValue: '₦60,000',
      image: '/api/placeholder/300/200',
      description: 'Organic tomatoes grown without pesticides',
      dateCreated: '2024-01-08',
      views: 28,
      orders: 5
    },
    {
      id: 4,
      name: 'Sweet Corn',
      category: 'Grains',
      status: 'out_of_stock',
      quantity: '0 kg',
      price: '₦600/kg',
      totalValue: '₦0',
      image: '/api/placeholder/300/200',
      description: 'Sweet yellow corn, great for processing',
      dateCreated: '2024-01-05',
      views: 15,
      orders: 0
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Grains', label: 'Grains' },
    { value: 'Vegetables', label: 'Vegetables' },
    { value: 'Tubers', label: 'Tubers' },
    { value: 'Fruits', label: 'Fruits' }
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'low_stock', label: 'Low Stock' },
    { value: 'out_of_stock', label: 'Out of Stock' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'low_stock':
        return 'warning';
      case 'out_of_stock':
        return 'error';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'low_stock':
        return 'Low Stock';
      case 'out_of_stock':
        return 'Out of Stock';
      default:
        return 'Unknown';
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDeleteProduct = (productId) => {
    toast.error(
      <div>
        <p className="font-medium mb-2">⚠️ Delete Product</p>
        <p className="text-sm mb-3">Are you sure you want to delete this product? This action cannot be undone.</p>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setProducts(products.filter(p => p.id !== productId));
              toast.dismiss();
              toast.success('Product deleted successfully');
            }}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
          >
            Confirm Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false
      }
    );
  };

  const totalValue = products.reduce((sum, product) => {
    const value = parseInt(product.totalValue.replace(/[₦,]/g, ''));
    return sum + value;
  }, 0);

  const activeProducts = products.filter(p => p.status === 'active').length;
  const lowStockProducts = products.filter(p => p.status === 'low_stock').length;
  const outOfStockProducts = products.filter(p => p.status === 'out_of_stock').length;

  const stats = [
    { 
      label: 'Total Products', 
      value: products.length, 
      icon: FiPackage, 
      color: 'text-blue-600',
      change: '+2 this week'
    },
    { 
      label: 'Active Products', 
      value: activeProducts, 
      icon: FiTrendingUp, 
      color: 'text-green-600',
      change: `${activeProducts} active`
    },
    { 
      label: 'Total Value', 
      value: `₦${(totalValue / 1000000).toFixed(1)}M`, 
      icon: FiBarChart, 
      color: 'text-purple-600',
      change: '+15% this month'
    },
    { 
      label: 'Low Stock', 
      value: lowStockProducts, 
      icon: FiTrendingDown, 
      color: 'text-orange-600',
      change: 'Need attention'
    }
  ];

  return (
    <DashboardLayout userType="farmer">
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-black font-display text-neutral-900 mb-2">
                My Products
              </h1>
              <p className="text-neutral-600">
                Manage your product listings and inventory
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/dashboard/farmer/products/new">
                <Button className="btn-primary">
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add New Product
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                    <p className="text-xs text-neutral-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    icon={FiSearch}
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  variant={showFilters ? "primary" : "outline"}
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:w-auto"
                >
                  <FiFilter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-neutral-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Status
                      </label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        {statuses.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Products Grid */}
        <motion.div variants={fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                  <FiPackage className="w-12 h-12 text-neutral-400" />
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-neutral-900 text-lg">{product.name}</h3>
                    <Badge variant={getStatusColor(product.status)} size="sm">
                      {getStatusText(product.status)}
                    </Badge>
                  </div>
                  
                  <p className="text-neutral-600 text-sm mb-3">{product.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Category:</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Quantity:</span>
                      <span className="font-medium">{product.quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Price:</span>
                      <span className="font-medium">{product.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Total Value:</span>
                      <span className="font-medium text-green-600">{product.totalValue}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <FiEye className="w-3 h-3 mr-1" />
                        {product.views} views
                      </span>
                      <span className="flex items-center">
                        <FiBarChart className="w-3 h-3 mr-1" />
                        {product.orders} orders
                      </span>
                    </div>
                    <span className="flex items-center">
                      <FiCalendar className="w-3 h-3 mr-1" />
                      {new Date(product.dateCreated).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <FiEye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <FiEdit2 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 border-red-300 hover:bg-red-50"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <FiPackage className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No products found</h3>
                <p className="text-neutral-600 mb-4">
                  {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                    ? "Try adjusting your search or filters"
                    : "Start by adding your first product"}
                </p>
                <Link href="/dashboard/farmer/products/new">
                  <Button className="btn-primary">
                    <FiPlus className="w-4 h-4 mr-2" />
                    Add Your First Product
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}