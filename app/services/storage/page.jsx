'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiThermometer, 
  FiShield, 
  FiTruck,
  FiMapPin,
  FiClock,
  FiBarChart,
  FiCheck,
  FiStar,
  FiEye,
  FiCalendar,
  FiUser,
  FiPackage,
  FiWifi,
  FiTrendingUp,
  FiDollarSign
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const StoragePage = () => {
  const [selectedLocation, setSelectedLocation] = useState('nairobi');

  const storageLocations = [
    {
      id: 'nairobi',
      name: 'Nairobi Central',
      address: 'Industrial Area, Nairobi',
      coordinates: { lat: -1.3186, lng: 36.8719 },
      capacity: '5,000 MT',
      types: ['Cold Storage', 'Dry Storage', 'Controlled Atmosphere'],
      services: ['Sorting', 'Packaging', 'Quality Testing'],
      rates: {
        cold: 'KSh 8/kg/month',
        dry: 'KSh 3/kg/month',
        ca: 'KSh 12/kg/month'
      },
      occupancy: 85,
      image: '/api/placeholder/400/250'
    },
    {
      id: 'mombasa',
      name: 'Mombasa Port',
      address: 'Port Reitz, Mombasa',
      coordinates: { lat: -4.0661, lng: 39.6730 },
      capacity: '3,500 MT',
      types: ['Cold Storage', 'Export Warehouse'],
      services: ['Export Documentation', 'Container Loading', 'Fumigation'],
      rates: {
        cold: 'KSh 10/kg/month',
        export: 'KSh 15/kg/month'
      },
      occupancy: 72,
      image: '/api/placeholder/400/250'
    },
    {
      id: 'nakuru',
      name: 'Nakuru Hub',
      address: 'Nakuru Agricultural Zone',
      coordinates: { lat: -0.3031, lng: 36.0800 },
      capacity: '2,800 MT',
      types: ['Dry Storage', 'Grain Silos'],
      services: ['Drying', 'Cleaning', 'Bagging'],
      rates: {
        dry: 'KSh 2.5/kg/month',
        silo: 'KSh 4/kg/month'
      },
      occupancy: 91,
      image: '/api/placeholder/400/250'
    }
  ];

  const storageTypes = [
    {
      type: 'Cold Storage',
      temperature: '0°C to 4°C',
      humidity: '85-95% RH',
      description: 'Perfect for fruits, vegetables, and other perishables',
      icon: FiThermometer,
      products: ['Fruits', 'Vegetables', 'Flowers', 'Dairy Products'],
      features: [
        'Temperature monitoring',
        'Humidity control',
        'Ethylene gas control',
        'Ripening chambers'
      ],
      pricing: 'KSh 8-15/kg/month'
    },
    {
      type: 'Controlled Atmosphere',
      temperature: '0°C to 4°C',
      humidity: '85-95% RH',
      description: 'Extended storage for premium products',
      icon: FiShield,
      products: ['Apples', 'Avocados', 'Cut Flowers'],
      features: [
        'Oxygen control',
        'CO2 regulation',
        'Extended shelf life',
        'Premium quality maintenance'
      ],
      pricing: 'KSh 12-20/kg/month'
    },
    {
      type: 'Dry Storage',
      temperature: 'Ambient',
      humidity: '60-65% RH',
      description: 'Ideal for grains, legumes, and processed foods',
      icon: FiHome,
      products: ['Maize', 'Beans', 'Rice', 'Processed Foods'],
      features: [
        'Pest control',
        'Moisture control',
        'Fumigation services',
        'Quality preservation'
      ],
      pricing: 'KSh 2-5/kg/month'
    },
    {
      type: 'Grain Silos',
      temperature: 'Ambient',
      humidity: 'Controlled',
      description: 'Specialized storage for bulk grains',
      icon: FiPackage,
      products: ['Wheat', 'Maize', 'Barley', 'Sorghum'],
      features: [
        'Automated handling',
        'Aeration systems',
        'Quality monitoring',
        'Bulk loading/unloading'
      ],
      pricing: 'KSh 3-6/kg/month'
    }
  ];

  const storageServices = [
    {
      service: 'Quality Testing',
      description: 'Comprehensive quality assessment and certification',
      icon: FiCheck,
      includes: [
        'Moisture content analysis',
        'Pest and disease inspection',
        'Nutritional analysis',
        'Contamination testing'
      ]
    },
    {
      service: 'Sorting & Grading',
      description: 'Professional sorting and grading services',
      icon: FiStar,
      includes: [
        'Size and color grading',
        'Quality classification',
        'Defect removal',
        'Standard compliance'
      ]
    },
    {
      service: 'Packaging & Labeling',
      description: 'Custom packaging solutions for your products',
      icon: FiPackage,
      includes: [
        'Custom packaging design',
        'Branding and labeling',
        'Export packaging',
        'Traceability codes'
      ]
    },
    {
      service: 'Inventory Management',
      description: 'Real-time inventory tracking and management',
      icon: FiBarChart,
      includes: [
        'Digital inventory system',
        'Real-time stock updates',
        'Automated alerts',
        'Detailed reporting'
      ]
    }
  ];

  const benefits = [
    {
      icon: FiShield,
      title: 'Reduce Post-Harvest Losses',
      description: 'Minimize losses with proper storage conditions',
      stat: 'Up to 90% loss reduction'
    },
    {
      icon: FiTrendingUp,
      title: 'Extended Shelf Life',
      description: 'Keep products fresh for longer periods',
      stat: '3-10x longer storage'
    },
    {
      icon: FiDollarSign,
      title: 'Better Prices',
      description: 'Time your sales for optimal market prices',
      stat: '20-40% price premium'
    },
    {
      icon: FiWifi,
      title: 'Smart Monitoring',
      description: 'IoT-enabled monitoring and alerts',
      stat: '24/7 monitoring'
    }
  ];

  const clientTestimonials = [
    {
      name: 'Margaret Wanjiku',
      company: 'Kiambu Fresh Produce',
      image: '/api/placeholder/64/64',
      product: 'French Beans',
      storage: 'Cold Storage',
      testimonial: 'The cold storage facility helped us maintain quality and extend our selling window. We now supply directly to European markets.',
      duration: '6 months',
      lossReduction: '85%'
    },
    {
      name: 'Samuel Kirui',
      company: 'Rift Valley Grains',
      image: '/api/placeholder/64/64',
      product: 'Maize',
      storage: 'Grain Silos',
      testimonial: 'The automated silo system keeps our grain in perfect condition. We can now time our sales for the best prices.',
      duration: '12 months',
      lossReduction: '95%'
    },
    {
      name: 'Rose Akinyi',
      company: 'Lake Region Exports',
      image: '/api/placeholder/64/64',
      product: 'Fish',
      storage: 'Cold Storage',
      testimonial: 'Temperature-controlled storage ensures our fish meets international standards. Export documentation support is excellent.',
      duration: '3 months',
      lossReduction: '90%'
    }
  ];

  const selectedLocationData = storageLocations.find(loc => loc.id === selectedLocation);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Smart Storage Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-cyan-100 max-w-3xl mx-auto mb-8"
            >
              Preserve your produce quality, reduce post-harvest losses, and maximize profits with our state-of-the-art storage facilities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" variant="secondary">
                Reserve Storage Space
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-cyan-600">
                Tour Our Facilities
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Use Professional Storage?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional storage solutions that protect your investment and maximize returns
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
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-2">
                  {benefit.description}
                </p>
                <p className="text-sm font-medium text-cyan-600">
                  {benefit.stat}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Storage Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Storage Solutions Available
            </h2>
            <p className="text-gray-600">
              Different storage types for different agricultural products
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {storageTypes.map((storage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <storage.icon className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {storage.type}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {storage.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-500">Temperature:</span>
                          <p className="font-medium">{storage.temperature}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Humidity:</span>
                          <p className="font-medium">{storage.humidity}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Suitable Products:</h4>
                        <div className="flex flex-wrap gap-2">
                          {storage.products.map((product, i) => (
                            <span key={i} className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-full">
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                        <div className="space-y-1">
                          {storage.features.map((feature, i) => (
                            <div key={i} className="flex items-center text-sm text-gray-600">
                              <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-500">Pricing:</span>
                          <p className="font-semibold text-cyan-600">{storage.pricing}</p>
                        </div>
                        <Button size="sm">
                          Reserve Space
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Storage Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Storage Locations
            </h2>
            <p className="text-gray-600">
              Strategically located facilities across Kenya
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
              {storageLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedLocation === location.id
                      ? 'bg-white text-cyan-600 shadow-md'
                      : 'text-gray-600 hover:text-cyan-600'
                  }`}
                >
                  {location.name}
                </button>
              ))}
            </div>
          </div>
          
          {selectedLocationData && (
            <motion.div
              key={selectedLocationData.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedLocationData.name}
                    </h3>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <FiMapPin className="w-4 h-4 mr-2" />
                      {selectedLocationData.address}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Capacity</h4>
                        <p className="text-cyan-600 font-bold text-xl">{selectedLocationData.capacity}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Occupancy</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-cyan-600 h-2 rounded-full" 
                              style={{ width: `${selectedLocationData.occupancy}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{selectedLocationData.occupancy}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Storage Types Available</h4>
                      <div className="space-y-2">
                        {selectedLocationData.types.map((type, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                            <span>{type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Additional Services</h4>
                      <div className="space-y-2">
                        {selectedLocationData.services.map((service, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button>
                        Reserve Space
                      </Button>
                      <Button variant="outline">
                        <FiEye className="w-4 h-4 mr-2" />
                        Virtual Tour
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <img
                      src={selectedLocationData.image}
                      alt={selectedLocationData.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                        <h5 className="font-semibold text-gray-900 mb-2">Current Rates</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(selectedLocationData.rates).map(([type, rate]) => (
                            <div key={type} className="flex justify-between">
                              <span className="capitalize">{type}:</span>
                              <span className="font-medium text-cyan-600">{rate}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-cyan-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Value-Added Services
            </h2>
            <p className="text-gray-600">
              Comprehensive support services to maximize your product value
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {storageServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.service}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.includes.map((include, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <FiCheck className="w-3 h-3 text-green-500 mr-2" />
                        <span>{include}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Client Success Stories
            </h2>
            <p className="text-gray-600">
              See how our storage solutions have helped businesses grow
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {clientTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                      <p className="text-sm text-cyan-600">{testimonial.product}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Storage Type</span>
                      <p className="font-medium">{testimonial.storage}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Duration</span>
                      <p className="font-medium">{testimonial.duration}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">"{testimonial.testimonial}"</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{testimonial.lossReduction}</div>
                      <div className="text-xs text-gray-500">Loss Reduction</div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cyan-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Protect Your Harvest Investment
            </h2>
            <p className="text-cyan-100 mb-8 max-w-2xl mx-auto">
              Don't let post-harvest losses affect your profits. Reserve storage space today and ensure your products maintain quality and value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Reserve Storage Space
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-cyan-600">
                Schedule Facility Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StoragePage;