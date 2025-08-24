'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiShoppingCart, 
  FiSearch, 
  FiFilter,
  FiEye,
  FiDownload,
  FiMessageCircle,
  FiClock,
  FiCheck,
  FiX,
  FiTruck,
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiPackage
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

export default function FarmerOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock data - In real app, this would come from API
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: {
        name: 'ABC Agro Limited',
        email: 'procurement@abcagro.com',
        phone: '+234 123 456 7890',
        location: 'Lagos, Nigeria'
      },
      products: [
        { name: 'Premium Rice', quantity: '100 kg', price: '₦800/kg', total: '₦80,000' },
        { name: 'Fresh Cassava', quantity: '50 kg', price: '₦300/kg', total: '₦15,000' }
      ],
      totalAmount: '₦95,000',
      status: 'pending',
      orderDate: '2024-01-20T10:30:00Z',
      deliveryDate: '2024-01-25',
      deliveryAddress: 'Plot 42, Industrial Estate, Victoria Island, Lagos',
      paymentMethod: 'Bank Transfer',
      notes: 'Please ensure fresh produce. Delivery time: 9AM-5PM'
    },
    {
      id: 'ORD-002',
      customer: {
        name: 'Fresh Foods Ltd',
        email: 'orders@freshfoods.ng',
        phone: '+234 987 654 3210',
        location: 'Abuja, Nigeria'
      },
      products: [
        { name: 'Organic Tomatoes', quantity: '200 kg', price: '₦1,200/kg', total: '₦240,000' }
      ],
      totalAmount: '₦240,000',
      status: 'confirmed',
      orderDate: '2024-01-18T14:15:00Z',
      deliveryDate: '2024-01-23',
      deliveryAddress: 'No. 15 Garki District, Abuja',
      paymentMethod: 'Online Payment',
      notes: 'Urgent delivery required'
    },
    {
      id: 'ORD-003',
      customer: {
        name: 'Green Market Co.',
        email: 'purchasing@greenmarket.com',
        phone: '+234 555 123 4567',
        location: 'Port Harcourt, Nigeria'
      },
      products: [
        { name: 'Sweet Corn', quantity: '75 kg', price: '₦600/kg', total: '₦45,000' }
      ],
      totalAmount: '₦45,000',
      status: 'shipped',
      orderDate: '2024-01-15T09:00:00Z',
      deliveryDate: '2024-01-20',
      deliveryAddress: 'Mile 3 Market, Port Harcourt',
      paymentMethod: 'Cash on Delivery',
      notes: 'Call customer before delivery'
    },
    {
      id: 'ORD-004',
      customer: {
        name: 'Quality Foods Inc',
        email: 'orders@qualityfoods.ng',
        phone: '+234 444 987 6543',
        location: 'Kano, Nigeria'
      },
      products: [
        { name: 'Premium Rice', quantity: '150 kg', price: '₦800/kg', total: '₦120,000' }
      ],
      totalAmount: '₦120,000',
      status: 'delivered',
      orderDate: '2024-01-12T16:45:00Z',
      deliveryDate: '2024-01-17',
      deliveryAddress: 'Sabon Gari Market, Kano',
      paymentMethod: 'Bank Transfer',
      notes: 'Delivered successfully'
    },
    {
      id: 'ORD-005',
      customer: {
        name: 'Urban Farms Ltd',
        email: 'procurement@urbanfarms.ng',
        phone: '+234 333 555 7777',
        location: 'Ibadan, Nigeria'
      },
      products: [
        { name: 'Fresh Cassava', quantity: '80 kg', price: '₦300/kg', total: '₦24,000' }
      ],
      totalAmount: '₦24,000',
      status: 'cancelled',
      orderDate: '2024-01-10T11:20:00Z',
      deliveryDate: '2024-01-15',
      deliveryAddress: 'Bodija Market, Ibadan',
      paymentMethod: 'Online Payment',
      notes: 'Customer cancelled due to quality concerns'
    }
  ]);

  const statuses = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return FiClock;
      case 'confirmed':
        return FiCheck;
      case 'shipped':
        return FiTruck;
      case 'delivered':
        return FiCheck;
      case 'cancelled':
        return FiX;
      default:
        return FiShoppingCart;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} status updated to ${getStatusText(newStatus)}`);
  };

  // Calculate stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'delivered').length;
  const totalRevenue = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, order) => {
      const amount = parseInt(order.totalAmount.replace(/[₦,]/g, ''));
      return sum + amount;
    }, 0);

  const stats = [
    { 
      label: 'Total Orders', 
      value: totalOrders, 
      icon: FiShoppingCart, 
      color: 'text-blue-600',
      change: '+5 this week'
    },
    { 
      label: 'Pending Orders', 
      value: pendingOrders, 
      icon: FiClock, 
      color: 'text-orange-600',
      change: 'Need attention'
    },
    { 
      label: 'Completed Orders', 
      value: completedOrders, 
      icon: FiCheck, 
      color: 'text-green-600',
      change: `${Math.round((completedOrders/totalOrders)*100)}% success rate`
    },
    { 
      label: 'Total Revenue', 
      value: `₦${(totalRevenue / 1000000).toFixed(1)}M`, 
      icon: FiDollarSign, 
      color: 'text-purple-600',
      change: '+12% this month'
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
                Orders
              </h1>
              <p className="text-neutral-600">
                Track and manage your product orders
              </p>
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
                    placeholder="Search orders, customers, or products..."
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
                        Order Status
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

        {/* Orders List */}
        <motion.div variants={fadeInUp}>
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <Card key={order.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Order Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-neutral-900">{order.id}</h3>
                              <Badge variant={getStatusColor(order.status)} className="flex items-center">
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {getStatusText(order.status)}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-neutral-600 space-x-4">
                              <span className="flex items-center">
                                <FiUser className="w-4 h-4 mr-1" />
                                {order.customer.name}
                              </span>
                              <span className="flex items-center">
                                <FiCalendar className="w-4 h-4 mr-1" />
                                {new Date(order.orderDate).toLocaleDateString()}
                              </span>
                              <span className="flex items-center">
                                <FiDollarSign className="w-4 h-4 mr-1" />
                                {order.totalAmount}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Products Summary */}
                        <div className="bg-neutral-50 rounded-lg p-3 mb-3">
                          <p className="text-sm font-medium text-neutral-700 mb-2">Products:</p>
                          <div className="space-y-1">
                            {order.products.map((product, index) => (
                              <div key={index} className="flex justify-between items-center text-sm">
                                <span className="text-neutral-600">
                                  {product.name} ({product.quantity})
                                </span>
                                <span className="font-medium text-neutral-900">{product.total}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="text-sm text-neutral-600">
                          <p className="flex items-center mb-1">
                            <FiTruck className="w-4 h-4 mr-2" />
                            Delivery: {order.deliveryDate}
                          </p>
                          <p className="flex items-start">
                            <FiPackage className="w-4 h-4 mr-2 mt-0.5" />
                            {order.deliveryAddress}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2 min-w-0 lg:min-w-[200px]">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <FiEye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        
                        {order.status === 'pending' && (
                          <Button
                            size="sm"
                            className="w-full btn-primary"
                            onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                          >
                            <FiCheck className="w-4 h-4 mr-2" />
                            Confirm Order
                          </Button>
                        )}
                        
                        {order.status === 'confirmed' && (
                          <Button
                            size="sm"
                            className="w-full btn-primary"
                            onClick={() => handleStatusUpdate(order.id, 'shipped')}
                          >
                            <FiTruck className="w-4 h-4 mr-2" />
                            Mark as Shipped
                          </Button>
                        )}

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <FiMessageCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <FiDownload className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredOrders.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <FiShoppingCart className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No orders found</h3>
                <p className="text-neutral-600">
                  {searchTerm || selectedStatus !== 'all'
                    ? "Try adjusting your search or filters"
                    : "Orders will appear here once customers start purchasing your products"}
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedOrder(null)}
          >
            <div 
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-neutral-900">Order Details</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(null)}
                  >
                    <FiX className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">Customer Information</h3>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="font-medium">{selectedOrder.customer.name}</p>
                    <p className="text-sm text-neutral-600">{selectedOrder.customer.email}</p>
                    <p className="text-sm text-neutral-600">{selectedOrder.customer.phone}</p>
                    <p className="text-sm text-neutral-600">{selectedOrder.customer.location}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.products.map((product, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-neutral-600">{product.quantity} @ {product.price}</p>
                        </div>
                        <p className="font-semibold">{product.total}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 p-3 bg-primary-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="text-xl font-bold text-primary-600">{selectedOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-3">Delivery Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Delivery Date:</span> {selectedOrder.deliveryDate}</p>
                      <p><span className="font-medium">Address:</span> {selectedOrder.deliveryAddress}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-3">Payment</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Method:</span> {selectedOrder.paymentMethod}</p>
                      <p><span className="font-medium">Amount:</span> {selectedOrder.totalAmount}</p>
                    </div>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-3">Notes</h3>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <p className="text-sm text-neutral-600">{selectedOrder.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}