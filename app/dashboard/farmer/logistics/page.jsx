'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiTruck, 
  FiPlus, 
  FiSearch, 
  FiFilter,
  FiEye,
  FiMapPin,
  FiClock,
  FiCheck,
  FiX,
  FiPackage,
  FiNavigation,
  FiPhone,
  FiUser,
  FiCalendar,
  FiDollarSign,
  FiAlertCircle
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

export default function FarmerLogistics() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Mock data - In real app, this would come from API
  const [deliveries, setDeliveries] = useState([
    {
      id: 'DEL-001',
      orderId: 'ORD-001',
      customer: {
        name: 'ABC Agro Limited',
        contact: '+234 123 456 7890',
        address: 'Plot 42, Industrial Estate, Victoria Island, Lagos'
      },
      products: [
        { name: 'Premium Rice', quantity: '100 kg' },
        { name: 'Fresh Cassava', quantity: '50 kg' }
      ],
      status: 'in_transit',
      driver: {
        name: 'James Okafor',
        phone: '+234 987 654 3210',
        vehicle: 'Toyota Hiace - ABC 123 XY',
        rating: 4.8
      },
      pickupDate: '2024-01-20T08:00:00Z',
      estimatedDelivery: '2024-01-20T16:00:00Z',
      actualDelivery: null,
      route: 'Ibeju-Lekki → Victoria Island',
      distance: '45 km',
      cost: 15000,
      trackingCode: 'TRK001234',
      currentLocation: 'Lekki Toll Gate'
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-002',
      customer: {
        name: 'Fresh Foods Ltd',
        contact: '+234 987 654 3210',
        address: 'No. 15 Garki District, Abuja'
      },
      products: [
        { name: 'Organic Tomatoes', quantity: '200 kg' }
      ],
      status: 'delivered',
      driver: {
        name: 'Ibrahim Hassan',
        phone: '+234 555 123 4567',
        vehicle: 'Mitsubishi Canter - FRN 456 AB',
        rating: 4.9
      },
      pickupDate: '2024-01-18T07:00:00Z',
      estimatedDelivery: '2024-01-19T12:00:00Z',
      actualDelivery: '2024-01-19T11:30:00Z',
      route: 'Ibeju-Lekki → Abuja',
      distance: '780 km',
      cost: 85000,
      trackingCode: 'TRK001235',
      currentLocation: 'Delivered'
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-003',
      customer: {
        name: 'Green Market Co.',
        contact: '+234 555 123 4567',
        address: 'Mile 3 Market, Port Harcourt'
      },
      products: [
        { name: 'Sweet Corn', quantity: '75 kg' }
      ],
      status: 'pending',
      driver: null,
      pickupDate: '2024-01-22T06:00:00Z',
      estimatedDelivery: '2024-01-22T14:00:00Z',
      actualDelivery: null,
      route: 'Ibeju-Lekki → Port Harcourt',
      distance: '520 km',
      cost: 45000,
      trackingCode: 'TRK001236',
      currentLocation: 'Awaiting pickup'
    },
    {
      id: 'DEL-004',
      orderId: 'ORD-004',
      customer: {
        name: 'Quality Foods Inc',
        contact: '+234 444 987 6543',
        address: 'Sabon Gari Market, Kano'
      },
      products: [
        { name: 'Premium Rice', quantity: '150 kg' }
      ],
      status: 'cancelled',
      driver: {
        name: 'Musa Abdullahi',
        phone: '+234 777 888 9999',
        vehicle: 'Isuzu NPR - KAN 789 CD',
        rating: 4.7
      },
      pickupDate: '2024-01-15T05:00:00Z',
      estimatedDelivery: '2024-01-16T18:00:00Z',
      actualDelivery: null,
      route: 'Ibeju-Lekki → Kano',
      distance: '950 km',
      cost: 95000,
      trackingCode: 'TRK001237',
      currentLocation: 'Cancelled',
      cancellationReason: 'Customer cancelled order'
    }
  ]);

  const [logisticsProviders] = useState([
    {
      id: 'provider-1',
      name: 'FarmNet Express',
      rating: 4.8,
      vehicles: 25,
      coverage: 'All 36 states',
      specialization: 'Agricultural products',
      pricing: 'From ₦200/km',
      features: ['Cold storage', 'GPS tracking', 'Insurance covered', '24/7 support'],
      preferred: true
    },
    {
      id: 'provider-2',
      name: 'Green Logistics',
      rating: 4.6,
      vehicles: 15,
      coverage: 'Lagos, Ogun, Abuja',
      specialization: 'Fresh produce',
      pricing: 'From ₦250/km',
      features: ['Temperature controlled', 'Same day delivery', 'Packaging service']
    },
    {
      id: 'provider-3',
      name: 'Swift Cargo',
      rating: 4.4,
      vehicles: 40,
      coverage: 'Nigeria wide',
      specialization: 'General cargo',
      pricing: 'From ₦180/km',
      features: ['Bulk transport', 'Warehousing', 'Door-to-door delivery']
    }
  ]);

  const [deliveryRequest, setDeliveryRequest] = useState({
    orderId: '',
    pickupAddress: '',
    deliveryAddress: '',
    pickupDate: '',
    products: '',
    specialInstructions: '',
    providerId: ''
  });

  const statuses = [
    { value: 'all', label: 'All Deliveries' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in_transit':
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
      case 'in_transit':
        return 'In Transit';
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
      case 'in_transit':
        return FiTruck;
      case 'delivered':
        return FiCheck;
      case 'cancelled':
        return FiX;
      default:
        return FiPackage;
    }
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = 
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.trackingCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || delivery.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleDeliveryRequest = (e) => {
    e.preventDefault();
    toast.success('Delivery request submitted successfully! We will assign a driver shortly.');
    setDeliveryRequest({
      orderId: '',
      pickupAddress: '',
      deliveryAddress: '',
      pickupDate: '',
      products: '',
      specialInstructions: '',
      providerId: ''
    });
    setShowRequestModal(false);
  };

  const handleTrackDelivery = (trackingCode) => {
    toast.info(`Tracking delivery: ${trackingCode}. Real-time tracking will be implemented soon.`);
  };

  // Calculate stats
  const totalDeliveries = deliveries.length;
  const inTransitDeliveries = deliveries.filter(d => d.status === 'in_transit').length;
  const completedDeliveries = deliveries.filter(d => d.status === 'delivered').length;
  const totalDistance = deliveries.reduce((sum, delivery) => {
    const distance = parseInt(delivery.distance.replace(/[km,]/g, ''));
    return sum + distance;
  }, 0);

  const stats = [
    { 
      label: 'Total Deliveries', 
      value: totalDeliveries, 
      icon: FiTruck, 
      color: 'text-blue-600',
      change: `${completedDeliveries} completed`
    },
    { 
      label: 'In Transit', 
      value: inTransitDeliveries, 
      icon: FiNavigation, 
      color: 'text-orange-600',
      change: 'Active shipments'
    },
    { 
      label: 'Total Distance', 
      value: `${(totalDistance / 1000).toFixed(1)}K km`, 
      icon: FiMapPin, 
      color: 'text-green-600',
      change: 'All time'
    },
    { 
      label: 'On-Time Rate', 
      value: '95%', 
      icon: FiClock, 
      color: 'text-purple-600',
      change: 'Excellent service'
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
                Logistics & Delivery
              </h1>
              <p className="text-neutral-600">
                Track shipments and manage your delivery logistics
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                className="btn-primary"
                onClick={() => setShowRequestModal(true)}
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Request Delivery
              </Button>
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

        {/* Logistics Providers */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FiTruck className="w-5 h-5 mr-2 text-blue-600" />
                Logistics Partners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {logisticsProviders.map((provider) => (
                  <div key={provider.id} className={`p-4 rounded-lg border-2 ${provider.preferred ? 'border-blue-500 bg-blue-50' : 'border-neutral-200 bg-white'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-neutral-900">{provider.name}</h3>
                      {provider.preferred && <Badge variant="primary" size="sm">Preferred</Badge>}
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Rating:</span>
                        <span className="font-medium">⭐ {provider.rating}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Vehicles:</span>
                        <span className="font-medium">{provider.vehicles}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Coverage:</span>
                        <span className="font-medium text-xs">{provider.coverage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Pricing:</span>
                        <span className="font-medium text-green-600">{provider.pricing}</span>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 mb-3">{provider.specialization}</p>
                    <ul className="space-y-1">
                      {provider.features.map((feature, index) => (
                        <li key={index} className="text-xs text-neutral-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    icon={FiSearch}
                    placeholder="Search by delivery ID, order ID, customer, or tracking code..."
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
                        Delivery Status
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

        {/* Deliveries List */}
        <motion.div variants={fadeInUp}>
          <div className="space-y-4">
            {filteredDeliveries.map((delivery) => {
              const StatusIcon = getStatusIcon(delivery.status);
              return (
                <Card key={delivery.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Delivery Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-neutral-900">{delivery.id}</h3>
                              <Badge variant={getStatusColor(delivery.status)} className="flex items-center">
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {getStatusText(delivery.status)}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-neutral-600 space-x-4 mb-2">
                              <span className="flex items-center">
                                <FiPackage className="w-4 h-4 mr-1" />
                                Order {delivery.orderId}
                              </span>
                              <span className="flex items-center">
                                <FiMapPin className="w-4 h-4 mr-1" />
                                {delivery.distance}
                              </span>
                              <span className="flex items-center">
                                <FiDollarSign className="w-4 h-4 mr-1" />
                                ₦{delivery.cost.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-600">{delivery.route}</p>
                          </div>
                        </div>

                        {/* Customer & Products */}
                        <div className="bg-neutral-50 rounded-lg p-3 mb-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-medium text-neutral-500 mb-1">CUSTOMER</p>
                              <p className="font-medium text-neutral-900">{delivery.customer.name}</p>
                              <p className="text-sm text-neutral-600">{delivery.customer.contact}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-neutral-500 mb-1">PRODUCTS</p>
                              {delivery.products.map((product, index) => (
                                <p key={index} className="text-sm text-neutral-600">
                                  {product.name} ({product.quantity})
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Driver & Timeline */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            {delivery.driver ? (
                              <>
                                <p className="text-neutral-500 mb-1">Driver: <span className="font-medium text-neutral-900">{delivery.driver.name}</span></p>
                                <p className="text-neutral-500">{delivery.driver.vehicle} • ⭐ {delivery.driver.rating}</p>
                              </>
                            ) : (
                              <p className="text-neutral-500">Driver: <span className="text-orange-600">Not assigned</span></p>
                            )}
                          </div>
                          <div>
                            <p className="text-neutral-500 mb-1">
                              Pickup: {new Date(delivery.pickupDate).toLocaleDateString()} {new Date(delivery.pickupDate).toLocaleTimeString()}
                            </p>
                            <p className="text-neutral-500">
                              {delivery.actualDelivery ? 
                                `Delivered: ${new Date(delivery.actualDelivery).toLocaleDateString()} ${new Date(delivery.actualDelivery).toLocaleTimeString()}` :
                                `ETA: ${new Date(delivery.estimatedDelivery).toLocaleDateString()} ${new Date(delivery.estimatedDelivery).toLocaleTimeString()}`
                              }
                            </p>
                          </div>
                        </div>

                        {/* Current Status */}
                        <div className="mt-3 flex items-center text-sm">
                          <FiMapPin className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="text-neutral-600">Current location: </span>
                          <span className="font-medium text-blue-600 ml-1">{delivery.currentLocation}</span>
                        </div>

                        {delivery.status === 'cancelled' && delivery.cancellationReason && (
                          <div className="mt-2 flex items-center text-sm">
                            <FiAlertCircle className="w-4 h-4 mr-2 text-red-500" />
                            <span className="text-red-600">{delivery.cancellationReason}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2 min-w-0 lg:min-w-[200px]">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => setSelectedDelivery(delivery)}
                        >
                          <FiEye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        
                        {delivery.status === 'in_transit' && (
                          <Button
                            size="sm"
                            className="w-full btn-primary"
                            onClick={() => handleTrackDelivery(delivery.trackingCode)}
                          >
                            <FiNavigation className="w-4 h-4 mr-2" />
                            Track Live
                          </Button>
                        )}

                        {delivery.driver && (
                          <Button size="sm" variant="outline" className="w-full">
                            <FiPhone className="w-4 h-4 mr-2" />
                            Call Driver
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredDeliveries.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <FiTruck className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No deliveries found</h3>
                <p className="text-neutral-600 mb-4">
                  {searchTerm || selectedStatus !== 'all'
                    ? "Try adjusting your search or filters"
                    : "Request your first delivery to start managing your logistics"}
                </p>
                <Button 
                  className="btn-primary"
                  onClick={() => setShowRequestModal(true)}
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Request Your First Delivery
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Delivery Request Modal */}
        {showRequestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowRequestModal(false)}
          >
            <div 
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-neutral-900">Request Delivery</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRequestModal(false)}
                  >
                    <FiX className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <form onSubmit={handleDeliveryRequest} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Order ID *
                    </label>
                    <Input
                      type="text"
                      placeholder="ORD-001"
                      value={deliveryRequest.orderId}
                      onChange={(e) => setDeliveryRequest({...deliveryRequest, orderId: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Pickup Date & Time *
                    </label>
                    <Input
                      type="datetime-local"
                      value={deliveryRequest.pickupDate}
                      onChange={(e) => setDeliveryRequest({...deliveryRequest, pickupDate: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Pickup Address *
                  </label>
                  <Input
                    type="text"
                    placeholder="Your farm address"
                    value={deliveryRequest.pickupAddress}
                    onChange={(e) => setDeliveryRequest({...deliveryRequest, pickupAddress: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Delivery Address *
                  </label>
                  <Input
                    type="text"
                    placeholder="Customer delivery address"
                    value={deliveryRequest.deliveryAddress}
                    onChange={(e) => setDeliveryRequest({...deliveryRequest, deliveryAddress: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Products to be Delivered *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Rice 100kg, Tomatoes 50kg"
                    value={deliveryRequest.products}
                    onChange={(e) => setDeliveryRequest({...deliveryRequest, products: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Preferred Logistics Provider
                  </label>
                  <select
                    value={deliveryRequest.providerId}
                    onChange={(e) => setDeliveryRequest({...deliveryRequest, providerId: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Any available provider</option>
                    {logisticsProviders.map(provider => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name} - {provider.pricing}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    placeholder="Any special handling requirements, delivery instructions, etc."
                    value={deliveryRequest.specialInstructions}
                    onChange={(e) => setDeliveryRequest({...deliveryRequest, specialInstructions: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    rows={3}
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <FiAlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">Delivery Information:</p>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Our partners provide GPS tracking for all shipments</li>
                        <li>• All deliveries are insured for peace of mind</li>
                        <li>• You'll receive updates via SMS and email</li>
                        <li>• Payment is processed after successful delivery</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowRequestModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 btn-primary">
                    Request Delivery
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}