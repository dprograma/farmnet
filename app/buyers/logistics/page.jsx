'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiTruck, 
  FiMapPin, 
  FiClock, 
  FiShield,
  FiThermometer,
  FiPackage,
  FiNavigation,
  FiCheck,
  FiAlertCircle,
  FiPhone,
  FiMessageSquare,
  FiCalendar,
  FiBarChart,
  FiUser
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const LogisticsPage = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [trackingNumber, setTrackingNumber] = useState('');

  const logisticsServices = [
    {
      id: 'same-day',
      name: 'Same-Day Delivery',
      description: 'Ultra-fast delivery for fresh produce within Nairobi and major cities',
      icon: FiClock,
      features: [
        'Delivery within 4-6 hours',
        'Temperature-controlled vehicles',
        'Real-time tracking',
        'Premium handling'
      ],
      coverage: 'Nairobi, Mombasa, Kisumu',
      pricing: 'From KSh 300',
      availability: 'Mon-Sat, 6AM-8PM'
    },
    {
      id: 'cold-chain',
      name: 'Cold Chain Logistics',
      description: 'Temperature-controlled transportation for perishable products',
      icon: FiThermometer,
      features: [
        'Temperature monitoring',
        'Refrigerated vehicles',
        'Quality preservation',
        'Export standards'
      ],
      coverage: 'Nationwide + Ports',
      pricing: 'From KSh 500',
      availability: '24/7 availability'
    },
    {
      id: 'bulk',
      name: 'Bulk Transportation',
      description: 'Large-scale transportation for wholesale and export orders',
      icon: FiTruck,
      features: [
        'Large capacity trucks',
        'Competitive bulk rates',
        'Flexible scheduling',
        'Loading/unloading support'
      ],
      coverage: 'East Africa Region',
      pricing: 'From KSh 15/kg',
      availability: 'Scheduled routes'
    },
    {
      id: 'last-mile',
      name: 'Last-Mile Delivery',
      description: 'Final delivery to restaurants, hotels, and retail outlets',
      icon: FiPackage,
      features: [
        'Direct to business',
        'Flexible time slots',
        'Professional handling',
        'Receipt confirmation'
      ],
      coverage: 'Urban & Peri-urban',
      pricing: 'From KSh 200',
      availability: 'Mon-Sun, 6AM-10PM'
    }
  ];

  const activeShipments = [
    {
      id: 'FN-2024-0145',
      pickup: 'Kiambu County',
      delivery: 'Nairobi CBD',
      farmer: 'Jane Wanjiku',
      buyer: 'Fresh Foods Ltd',
      items: 'Tomatoes (50kg), Bell Peppers (20kg)',
      status: 'in-transit',
      estimatedDelivery: '2024-01-15 14:30',
      driver: {
        name: 'John Mwangi',
        phone: '+254 712 345 678',
        vehicle: 'KCA 456B'
      },
      temperature: '4°C',
      location: 'Thika Road'
    },
    {
      id: 'FN-2024-0146',
      pickup: 'Machakos County',
      delivery: 'Mombasa Port',
      farmer: 'Peter Mutua',
      buyer: 'Export Partners',
      items: 'French Beans (200kg)',
      status: 'loaded',
      estimatedDelivery: '2024-01-16 10:00',
      driver: {
        name: 'Mary Akinyi',
        phone: '+254 723 456 789',
        vehicle: 'KBX 789C'
      },
      temperature: '2°C',
      location: 'Machakos Depot'
    },
    {
      id: 'FN-2024-0147',
      pickup: 'Nakuru County',
      delivery: 'Kisumu City',
      farmer: 'Samuel Kiprop',
      buyer: 'Hotel Chain Ltd',
      items: 'Mixed Vegetables (100kg)',
      status: 'delivered',
      deliveredAt: '2024-01-14 16:45',
      driver: {
        name: 'Grace Wambui',
        phone: '+254 734 567 890',
        vehicle: 'KCX 123D'
      },
      rating: 5
    }
  ];

  const logisticsStats = [
    {
      label: 'On-Time Delivery',
      value: '98.5%',
      icon: FiClock,
      trend: '+2.1%',
      color: 'text-green-600'
    },
    {
      label: 'Active Vehicles',
      value: '150',
      icon: FiTruck,
      trend: '+15',
      color: 'text-blue-600'
    },
    {
      label: 'Daily Deliveries',
      value: '450',
      icon: FiPackage,
      trend: '+8.5%',
      color: 'text-purple-600'
    },
    {
      label: 'Coverage Areas',
      value: '47',
      icon: FiMapPin,
      trend: '+3 counties',
      color: 'text-orange-600'
    }
  ];

  const benefits = [
    {
      icon: FiNavigation,
      title: 'Real-Time Tracking',
      description: 'Track your shipments in real-time with GPS monitoring and live updates'
    },
    {
      icon: FiShield,
      title: 'Cargo Insurance',
      description: 'All shipments are insured against damage, loss, and delays'
    },
    {
      icon: FiThermometer,
      title: 'Temperature Control',
      description: 'Maintain product quality with our cold chain logistics network'
    },
    {
      icon: FiUser,
      title: 'Professional Drivers',
      description: 'Trained and certified drivers experienced in agricultural logistics'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'loaded':
        return 'bg-yellow-100 text-yellow-800';
      case 'pickup':
        return 'bg-orange-100 text-orange-800';
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
      case 'loaded':
        return FiPackage;
      case 'pickup':
        return FiMapPin;
      default:
        return FiAlertCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Smart Logistics Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-orange-100 max-w-3xl mx-auto mb-8"
            >
              Reliable, efficient, and temperature-controlled transportation for your agricultural products across Kenya and beyond.
            </motion.p>
            
            {/* Quick Track */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-md mx-auto mb-8"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter tracking number..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 rounded-xl border-0 shadow-lg text-gray-900 focus:ring-4 focus:ring-orange-300 focus:outline-none"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                  <FiNavigation className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" variant="secondary">
                Schedule Pickup
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-orange-600">
                Get Shipping Quote
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {logisticsStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center">
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <h3 className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </h3>
                  <p className="text-gray-900 font-medium mb-1">
                    {stat.label}
                  </p>
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-green-600 font-medium">
                      {stat.trend}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm">
              {[
                { id: 'services', name: 'Our Services', icon: FiTruck },
                { id: 'tracking', name: 'Live Tracking', icon: FiNavigation },
                { id: 'fleet', name: 'Fleet Management', icon: FiPackage }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
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

      {/* Tab Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comprehensive Logistics Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From same-day delivery to cold chain logistics, we have the right solution for your transportation needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {logisticsServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {service.description}
                        </p>
                        
                        <div className="space-y-2 mb-4">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center text-sm text-gray-600">
                              <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-2 mb-6 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Coverage</span>
                            <span className="font-medium">{service.coverage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Starting Price</span>
                            <span className="font-medium text-orange-600">{service.pricing}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Availability</span>
                            <span className="font-medium">{service.availability}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">
                            Book Service
                          </Button>
                          <Button size="sm" variant="outline">
                            Get Quote
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tracking Tab */}
        {activeTab === 'tracking' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Live Shipment Tracking
              </h2>
              <p className="text-gray-600">
                Monitor your shipments in real-time with detailed tracking information
              </p>
            </div>
            
            <div className="space-y-6">
              {activeShipments.map((shipment, index) => {
                const StatusIcon = getStatusIcon(shipment.status);
                return (
                  <motion.div
                    key={shipment.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Shipment #{shipment.id}
                          </h3>
                          <p className="text-gray-600">
                            From {shipment.farmer} to {shipment.buyer}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
                          <StatusIcon className="w-4 h-4 inline mr-1" />
                          {shipment.status === 'in-transit' ? 'In Transit' : 
                           shipment.status === 'loaded' ? 'Loaded' : 
                           shipment.status === 'delivered' ? 'Delivered' : 'Pending'}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Pickup Location</p>
                          <p className="font-medium">{shipment.pickup}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Delivery Location</p>
                          <p className="font-medium">{shipment.delivery}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Items</p>
                          <p className="font-medium">{shipment.items}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            {shipment.status === 'delivered' ? 'Delivered At' : 'Est. Delivery'}
                          </p>
                          <p className="font-medium">
                            {shipment.status === 'delivered' 
                              ? new Date(shipment.deliveredAt).toLocaleString()
                              : new Date(shipment.estimatedDelivery).toLocaleString()
                            }
                          </p>
                        </div>
                      </div>
                      
                      {shipment.status !== 'delivered' && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <FiUser className="w-5 h-5 text-orange-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{shipment.driver.name}</p>
                                <p className="text-sm text-gray-600">{shipment.driver.vehicle}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              {shipment.temperature && (
                                <div className="flex items-center">
                                  <FiThermometer className="w-4 h-4 text-blue-600 mr-1" />
                                  <span className="text-sm font-medium">{shipment.temperature}</span>
                                </div>
                              )}
                              <div className="flex items-center">
                                <FiMapPin className="w-4 h-4 text-green-600 mr-1" />
                                <span className="text-sm font-medium">{shipment.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                          <Button size="sm" variant="outline">
                            <FiNavigation className="w-4 h-4 mr-2" />
                            Track Live
                          </Button>
                          <Button size="sm" variant="outline">
                            <FiPhone className="w-4 h-4 mr-2" />
                            Call Driver
                          </Button>
                          <Button size="sm" variant="outline">
                            <FiMessageSquare className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                        </div>
                        
                        {shipment.status === 'delivered' && shipment.rating && (
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600 mr-2">Rating:</span>
                            <div className="flex">
                              {[...Array(shipment.rating)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  <FiCheck className="w-4 h-4 text-yellow-400 fill-current" />
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Fleet Management Tab */}
        {activeTab === 'fleet' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Fleet & Infrastructure
              </h2>
              <p className="text-gray-600">
                Modern, well-maintained vehicles and logistics infrastructure
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Advanced Fleet Management
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <FiTruck className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Modern Vehicle Fleet</h4>
                      <p className="text-gray-600">150+ vehicles including refrigerated trucks, vans, and motorbikes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FiNavigation className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">GPS Tracking</h4>
                      <p className="text-gray-600">Real-time tracking and route optimization for all vehicles</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FiThermometer className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Temperature Control</h4>
                      <p className="text-gray-600">Cold chain logistics with temperature monitoring</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FiShield className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Safety Standards</h4>
                      <p className="text-gray-600">Regular vehicle maintenance and safety inspections</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 text-center">
                  <FiTruck className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="text-xl font-bold text-gray-900">150+</h4>
                  <p className="text-gray-600">Active Vehicles</p>
                </Card>
                <Card className="p-6 text-center">
                  <FiMapPin className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="text-xl font-bold text-gray-900">47</h4>
                  <p className="text-gray-600">Counties Covered</p>
                </Card>
                <Card className="p-6 text-center">
                  <FiThermometer className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="text-xl font-bold text-gray-900">85%</h4>
                  <p className="text-gray-600">Cold Chain Fleet</p>
                </Card>
                <Card className="p-6 text-center">
                  <FiUser className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="text-xl font-bold text-gray-900">200+</h4>
                  <p className="text-gray-600">Trained Drivers</p>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Logistics?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Reliable, efficient, and technology-driven logistics solutions for your business
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Ship Your Products?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Get your agricultural products delivered safely and on time with our comprehensive logistics solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Schedule Pickup Now
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-orange-600">
                Get Shipping Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LogisticsPage;