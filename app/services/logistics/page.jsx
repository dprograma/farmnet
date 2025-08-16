'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiTruck, 
  FiMapPin, 
  FiClock, 
  FiThermometer,
  FiPackage,
  FiNavigation,
  FiShield,
  FiCheck,
  FiBarChart,
  FiUser,
  FiWifi,
  FiCalendar
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const LogisticsServicePage = () => {
  const [selectedService, setSelectedService] = useState('last-mile');

  const logisticsServices = [
    {
      id: 'last-mile',
      name: 'Last-Mile Delivery',
      description: 'Direct delivery to end customers and businesses',
      icon: FiPackage,
      coverage: 'Urban & Rural Areas',
      timeframe: '4-24 hours',
      pricing: '₦200-800',
      features: [
        'Door-to-door delivery',
        'Real-time tracking',
        'Temperature control options',
        'Proof of delivery'
      ]
    },
    {
      id: 'cold-chain',
      name: 'Cold Chain Logistics',
      description: 'Temperature-controlled transportation for perishables',
      icon: FiThermometer,
      coverage: 'Nationwide',
      timeframe: '2-48 hours',
      pricing: '₦500-2000',
      features: [
        'Temperature monitoring',
        'Refrigerated vehicles',
        'Quality preservation',
        'Export standards compliance'
      ]
    },
    {
      id: 'bulk',
      name: 'Bulk Transportation',
      description: 'Large-scale transportation for wholesale quantities',
      icon: FiTruck,
      coverage: 'East Africa Region',
      timeframe: '1-7 days',
      pricing: '₦10-50/kg',
      features: [
        'High capacity trucks',
        'Bulk loading equipment',
        'Cross-border logistics',
        'Documentation support'
      ]
    },
    {
      id: 'warehousing',
      name: 'Warehousing & Distribution',
      description: 'Storage and distribution hub services',
      icon: FiMapPin,
      coverage: 'Major Cities',
      timeframe: 'Flexible',
      pricing: '₦5-20/kg/month',
      features: [
        'Strategic locations',
        'Inventory management',
        'Pick and pack services',
        'Distribution planning'
      ]
    }
  ];

  const serviceMetrics = [
    {
      metric: 'On-Time Delivery',
      value: '98.5%',
      description: 'Deliveries completed on schedule',
      icon: FiClock,
      color: 'text-green-600'
    },
    {
      metric: 'Coverage Areas',
      value: '47',
      description: 'Counties covered nationwide',
      icon: FiMapPin,
      color: 'text-blue-600'
    },
    {
      metric: 'Active Fleet',
      value: '200+',
      description: 'Vehicles in operation',
      icon: FiTruck,
      color: 'text-purple-600'
    },
    {
      metric: 'Customer Satisfaction',
      value: '4.8/5',
      description: 'Average customer rating',
      icon: FiCheck,
      color: 'text-orange-600'
    }
  ];

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
              Logistics Service Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-orange-100 max-w-3xl mx-auto mb-8"
            >
              Comprehensive logistics solutions for your agricultural products. From farm to market with reliability and care.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" variant="secondary">
                Schedule Pickup
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-orange-600">
                Track Shipment
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Metrics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center">
                  <metric.icon className={`w-8 h-8 ${metric.color} mx-auto mb-3`} />
                  <h3 className={`text-3xl font-bold ${metric.color} mb-2`}>
                    {metric.value}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {metric.metric}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {metric.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Logistics Services
            </h2>
            <p className="text-gray-600">
              End-to-end logistics solutions for all your transportation needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {logisticsServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedService === service.id ? 'transform scale-105' : ''
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <Card className={`p-6 h-full border-2 ${
                  selectedService === service.id 
                    ? 'border-orange-500 shadow-lg' 
                    : 'border-gray-200 hover:border-orange-200'
                }`}>
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
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-500">Coverage:</span>
                          <p className="font-medium">{service.coverage}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Timeframe:</span>
                          <p className="font-medium">{service.timeframe}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-gray-500 text-sm">Pricing:</span>
                        <p className="font-semibold text-orange-600 text-lg">{service.pricing}</p>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <h4 className="font-medium text-gray-900">Key Features:</h4>
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-sm text-gray-600">
                            <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full" 
                        variant={selectedService === service.id ? 'primary' : 'outline'}
                      >
                        {selectedService === service.id ? 'Selected' : 'Book Service'}
                      </Button>
                    </div>
                  </div>
                </Card>
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
              Get your agricultural products delivered safely and efficiently with our professional logistics services.
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

export default LogisticsServicePage;