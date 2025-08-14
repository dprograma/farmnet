'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiShoppingCart, 
  FiCalendar, 
  FiMapPin, 
  FiClock,
  FiCheck,
  FiTruck,
  FiDollarSign,
  FiUser,
  FiPackage,
  FiRepeat,
  FiDownload,
  FiEye,
  FiPhone,
  FiMessageSquare
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const PlaceOrdersPage = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const quickOrderCategories = [
    { id: 'vegetables', name: 'Vegetables', icon: '🥬', count: 450 },
    { id: 'fruits', name: 'Fruits', icon: '🍎', count: 320 },
    { id: 'grains', name: 'Grains', icon: '🌾', count: 180 },
    { id: 'legumes', name: 'Legumes', icon: '🫘', count: 220 },
    { id: 'herbs', name: 'Herbs', icon: '🌿', count: 150 },
    { id: 'dairy', name: 'Dairy', icon: '🥛', count: 90 }
  ];

  const recentOrders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      farmer: 'Jane Wanjiku',
      farmerImage: '/api/placeholder/40/40',
      location: 'Kiambu County',
      items: [
        { name: 'Fresh Tomatoes', quantity: '50 kg', price: 'KSh 4,000' },
        { name: 'Bell Peppers', quantity: '20 kg', price: 'KSh 2,400' }
      ],
      total: 'KSh 6,400',
      status: 'delivered',
      deliveryDate: '2024-01-16',
      rating: 5
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-14',
      farmer: 'Peter Mutua',
      farmerImage: '/api/placeholder/40/40',
      location: 'Machakos County',
      items: [
        { name: 'Red Kidney Beans', quantity: '100 kg', price: 'KSh 12,000' }
      ],
      total: 'KSh 12,000',
      status: 'in-transit',
      estimatedDelivery: '2024-01-17'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-13',
      farmer: 'Mary Akinyi',
      farmerImage: '/api/placeholder/40/40',
      location: 'Murang\'a County',
      items: [
        { name: 'Hass Avocados', quantity: '200 pieces', price: 'KSh 3,000' },
        { name: 'French Beans', quantity: '30 kg', price: 'KSh 5,400' }
      ],
      total: 'KSh 8,400',
      status: 'processing'
    }
  ];

  const bulkOrderTemplates = [
    {
      id: 1,
      name: 'Restaurant Weekly Supply',
      description: 'Mixed vegetables and herbs for restaurant operations',
      items: [
        'Tomatoes - 100 kg',
        'Onions - 50 kg',
        'Coriander - 20 bunches',
        'Bell Peppers - 30 kg'
      ],
      estimatedCost: 'KSh 15,000 - 18,000',
      frequency: 'Weekly',
      suppliers: 8
    },
    {
      id: 2,
      name: 'Hotel Fresh Produce',
      description: 'Premium fruits and vegetables for hotel kitchens',
      items: [
        'Mixed Salad Greens - 20 kg',
        'Fresh Fruits - 50 kg',
        'Root Vegetables - 40 kg',
        'Herbs & Spices - 15 bunches'
      ],
      estimatedCost: 'KSh 12,000 - 15,000',
      frequency: 'Bi-weekly',
      suppliers: 12
    },
    {
      id: 3,
      name: 'Supermarket Bulk Order',
      description: 'Large quantities for retail distribution',
      items: [
        'Assorted Vegetables - 500 kg',
        'Seasonal Fruits - 300 kg',
        'Grain Products - 200 kg'
      ],
      estimatedCost: 'KSh 45,000 - 55,000',
      frequency: 'Monthly',
      suppliers: 25
    }
  ];

  const orderProcess = [
    {
      step: 1,
      title: 'Browse & Select',
      description: 'Choose from thousands of products or use quick order templates',
      icon: FiShoppingCart
    },
    {
      step: 2,
      title: 'Review Order',
      description: 'Confirm quantities, delivery details, and payment method',
      icon: FiCheck
    },
    {
      step: 3,
      title: 'Farmer Confirmation',
      description: 'Farmers confirm availability and delivery timeline',
      icon: FiUser
    },
    {
      step: 4,
      title: 'Track Delivery',
      description: 'Monitor your order status from harvest to delivery',
      icon: FiTruck
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return FiCheck;
      case 'in-transit':
        return FiTruck;
      case 'processing':
        return FiClock;
      default:
        return FiPackage;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Place Orders Easily
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-purple-100 max-w-3xl mx-auto mb-8"
            >
              Streamline your procurement process with our smart ordering system. From single items to bulk orders.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" variant="secondary">
                Start New Order
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
                View My Orders
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
              {[
                { id: 'browse', name: 'Browse Products', icon: FiShoppingCart },
                { id: 'bulk', name: 'Bulk Orders', icon: FiPackage },
                { id: 'recent', name: 'Recent Orders', icon: FiClock },
                { id: 'templates', name: 'Quick Templates', icon: FiRepeat }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-600 shadow-md'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content based on active tab */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Browse Products Tab */}
        {activeTab === 'browse' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quick Order by Category
              </h2>
              <p className="text-gray-600">
                Select a category to browse available products
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {quickOrderCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <div className="text-center">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {category.count} products available
                      </p>
                      <Button className="w-full">
                        Browse {category.name}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                How Ordering Works
              </h3>
              
              <div className="grid md:grid-cols-4 gap-8">
                {orderProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center relative"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    {index < orderProcess.length - 1 && (
                      <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-gray-200">
                        <div className="h-full bg-purple-600 w-0"></div>
                      </div>
                    )}
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Step {step.step}: {step.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bulk Orders Tab */}
        {activeTab === 'bulk' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Bulk Order Solutions
              </h2>
              <p className="text-gray-600">
                Perfect for restaurants, hotels, and retailers
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bulkOrderTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {template.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium text-gray-900">Includes:</h4>
                      {template.items.map((item, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Estimated Cost</span>
                        <span className="font-medium text-green-600">{template.estimatedCost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Frequency</span>
                        <span className="font-medium">{template.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Available Suppliers</span>
                        <span className="font-medium">{template.suppliers} farmers</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        Use Template
                      </Button>
                      <Button size="sm" variant="outline">
                        Customize
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-purple-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need a Custom Bulk Order?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our procurement specialists can help you create custom bulk orders based on your specific requirements and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  Request Custom Quote
                </Button>
                <Button size="lg" variant="outline">
                  Speak to Specialist
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Orders Tab */}
        {activeTab === 'recent' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Your Recent Orders
              </h2>
              <div className="flex space-x-4">
                <Button variant="outline">
                  <FiDownload className="w-4 h-4 mr-2" />
                  Export Orders
                </Button>
                <Button>
                  <FiShoppingCart className="w-4 h-4 mr-2" />
                  New Order
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              {recentOrders.map((order, index) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={order.farmerImage}
                            alt={order.farmer}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              Order #{order.id}
                            </h3>
                            <p className="text-gray-600">
                              From {order.farmer} • {order.location}
                            </p>
                            <p className="text-sm text-gray-500">
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            <StatusIcon className="w-4 h-4 inline mr-1" />
                            {order.status === 'in-transit' ? 'In Transit' : 
                             order.status === 'delivered' ? 'Delivered' : 'Processing'}
                          </span>
                          <p className="text-lg font-bold text-gray-900 mt-2">
                            {order.total}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Items Ordered:</h4>
                        <div className="space-y-1">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">
                                {item.name} - {item.quantity}
                              </span>
                              <span className="font-medium">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {order.status === 'delivered' && order.deliveryDate && (
                        <div className="flex items-center text-sm text-green-600 mb-4">
                          <FiCheck className="w-4 h-4 mr-2" />
                          <span>Delivered on {new Date(order.deliveryDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      {order.status === 'in-transit' && order.estimatedDelivery && (
                        <div className="flex items-center text-sm text-blue-600 mb-4">
                          <FiTruck className="w-4 h-4 mr-2" />
                          <span>Expected delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <div className="flex space-x-4">
                          <Button size="sm" variant="outline">
                            <FiEye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <FiRepeat className="w-4 h-4 mr-2" />
                            Reorder
                          </Button>
                          <Button size="sm" variant="outline">
                            <FiPhone className="w-4 h-4 mr-2" />
                            Contact Farmer
                          </Button>
                        </div>
                        
                        {order.status === 'delivered' && !order.rating && (
                          <Button size="sm">
                            Rate Order
                          </Button>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline">
                Load More Orders
              </Button>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quick Order Templates
              </h2>
              <p className="text-gray-600">
                Save time with pre-configured order templates for common business needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Popular Templates
                </h3>
                <div className="space-y-4">
                  {bulkOrderTemplates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {template.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {template.description}
                            </p>
                            <p className="text-sm text-green-600 font-medium mt-2">
                              {template.estimatedCost}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Preview
                            </Button>
                            <Button size="sm">
                              Use Template
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Create Custom Template
                </h3>
                <Card className="p-6">
                  <p className="text-gray-600 mb-6">
                    Create your own order template to streamline recurring purchases and save time on future orders.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                      <span>Save frequently ordered items</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                      <span>Set automatic reorder schedules</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                      <span>Customize quantities and preferences</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                      <span>Share templates with team members</span>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    Create New Template
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Streamline Your Ordering?
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that have simplified their procurement process with our smart ordering platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Start Your First Order
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlaceOrdersPage;