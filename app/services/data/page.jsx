'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBarChart, 
  FiTrendingUp, 
  FiDatabase, 
  FiCloud,
  FiPieChart,
  FiActivity,
  FiMap,
  FiCalendar,
  FiUsers,
  FiDollarSign,
  FiSun,
  FiDroplets,
  FiThermometer,
  FiPackage
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const DataAnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('market');

  const analyticsServices = [
    {
      id: 'market',
      name: 'Market Intelligence',
      description: 'Real-time market data and price analytics',
      icon: FiTrendingUp,
      features: [
        'Real-time price tracking',
        'Market demand forecasting',
        'Competitor analysis',
        'Seasonal trend analysis'
      ],
      pricing: '₦5,000/month'
    },
    {
      id: 'farm',
      name: 'Farm Performance',
      description: 'Comprehensive farm productivity analytics',
      icon: FiActivity,
      features: [
        'Yield prediction models',
        'Input optimization',
        'Cost analysis',
        'ROI tracking'
      ],
      pricing: '₦8,000/month'
    },
    {
      id: 'weather',
      name: 'Weather Analytics',
      description: 'Advanced weather data and climate insights',
      icon: FiSun,
      features: [
        'Hyperlocal weather data',
        'Climate risk assessment',
        'Planting recommendations',
        'Irrigation scheduling'
      ],
      pricing: '₦3,000/month'
    },
    {
      id: 'supply',
      name: 'Supply Chain Analytics',
      description: 'End-to-end supply chain optimization',
      icon: FiMap,
      features: [
        'Logistics optimization',
        'Inventory management',
        'Demand planning',
        'Loss reduction analysis'
      ],
      pricing: '₦10,000/month'
    }
  ];

  const dashboardMetrics = [
    {
      title: 'Market Prices',
      value: '₦85/kg',
      change: '+12.5%',
      trend: 'up',
      icon: FiDollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Yield Prediction',
      value: '2.8 tons/acre',
      change: '+8.3%',
      trend: 'up',
      icon: FiTrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'Weather Risk',
      value: 'Low',
      change: 'Favorable',
      trend: 'neutral',
      icon: FiSun,
      color: 'text-yellow-600'
    },
    {
      title: 'ROI Forecast',
      value: '145%',
      change: '+15%',
      trend: 'up',
      icon: FiBarChart,
      color: 'text-purple-600'
    }
  ];

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
              Data & Analytics Platform
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-purple-100 max-w-3xl mx-auto mb-8"
            >
              Make data-driven decisions with our comprehensive analytics platform. Get insights on markets, weather, farm performance, and more.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" variant="secondary">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
                View Demo Dashboard
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {dashboardMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className={`w-8 h-8 ${metric.color}`} />
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {metric.value}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {metric.title}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real-Time Farm Intelligence
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Monitor key metrics and get actionable insights to optimize your farming operations
            </p>
          </div>
        </div>
      </section>

      {/* Analytics Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Analytics Services
            </h2>
            <p className="text-gray-600">
              Comprehensive data analytics tailored for agriculture
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm">
              {analyticsServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === service.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <service.icon className="w-4 h-4" />
                  <span>{service.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {analyticsServices.map((service) => (
            activeTab === service.id && (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
              >
                <Card className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {service.name}
                          </h3>
                          <p className="text-gray-600">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                        <div className="space-y-2">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center">
                              <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                              <span className="text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500">Starting from:</span>
                          <p className="text-2xl font-bold text-purple-600">{service.pricing}</p>
                        </div>
                        <Button>
                          Subscribe Now
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Sample Dashboard</h4>
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Current Performance</span>
                            <span className="text-green-600 font-medium">+15.2%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-gray-900">2.8K</div>
                            <div className="text-xs text-gray-500">Data Points</div>
                          </div>
                          <div className="bg-white rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-gray-900">98.5%</div>
                            <div className="text-xs text-gray-500">Accuracy</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Making Data-Driven Decisions
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers using our analytics platform to optimize their operations and increase profitability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DataAnalyticsPage;