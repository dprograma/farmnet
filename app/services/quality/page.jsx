'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiCheck, 
  FiAward, 
  FiEye,
  FiClipboard,
  FiTrendingUp,
  FiUsers,
  FiStar,
  FiFileText,
  FiClock,
  FiMapPin,
  FiCamera,
  FiBarChart
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const QualityControlPage = () => {
  const [selectedService, setSelectedService] = useState('inspection');

  const qualityServices = [
    {
      id: 'inspection',
      name: 'Farm Inspection & Audit',
      description: 'Comprehensive farm assessment and compliance verification',
      icon: FiEye,
      process: [
        'Site assessment and documentation',
        'Compliance verification',
        'Gap analysis and recommendations',
        'Certification report'
      ],
      duration: '1-2 days',
      pricing: '₦15,000 - 25,000',
      benefits: [
        'Identify improvement areas',
        'Ensure compliance',
        'Quality certification',
        'Market access'
      ]
    },
    {
      id: 'testing',
      name: 'Product Quality Testing',
      description: 'Laboratory testing and quality analysis',
      icon: FiClipboard,
      process: [
        'Sample collection',
        'Laboratory analysis',
        'Quality report generation',
        'Certification issuance'
      ],
      duration: '3-5 days',
      pricing: '₦2,000 - 8,000',
      benefits: [
        'Verify product quality',
        'Meet export standards',
        'Consumer safety',
        'Premium pricing'
      ]
    },
    {
      id: 'certification',
      name: 'Quality Certification',
      description: 'Official quality certifications and standards compliance',
      icon: FiAward,
      process: [
        'Application submission',
        'Documentation review',
        'On-site verification',
        'Certificate issuance'
      ],
      duration: '2-4 weeks',
      pricing: '₦25,000 - 75,000',
      benefits: [
        'Market credibility',
        'Premium pricing',
        'Export eligibility',
        'Brand recognition'
      ]
    },
    {
      id: 'monitoring',
      name: 'Continuous Monitoring',
      description: 'Ongoing quality monitoring and support',
      icon: FiBarChart,
      process: [
        'Monthly inspections',
        'Quality tracking',
        'Performance reports',
        'Improvement support'
      ],
      duration: 'Ongoing',
      pricing: '₦5,000/month',
      benefits: [
        'Consistent quality',
        'Early issue detection',
        'Continuous improvement',
        'Reduced risks'
      ]
    }
  ];

  const certificationTypes = [
    {
      name: 'Global GAP',
      description: 'Good Agricultural Practices certification for food safety',
      icon: FiShield,
      requirements: [
        'Documented procedures',
        'Worker safety measures',
        'Environmental protection',
        'Traceability systems'
      ],
      validity: '3 years',
      markets: 'Europe, USA, Asia',
      cost: '₦50,000 - 75,000'
    },
    {
      name: 'Organic Certification',
      description: 'Certified organic production standards',
      icon: FiCheck,
      requirements: [
        'No synthetic chemicals',
        'Soil health management',
        'Biodiversity conservation',
        'Record keeping'
      ],
      validity: '1 year',
      markets: 'Premium markets worldwide',
      cost: '₦30,000 - 50,000'
    },
    {
      name: 'Fair Trade',
      description: 'Ethical trading and fair prices certification',
      icon: FiUsers,
      requirements: [
        'Fair labor practices',
        'Community development',
        'Environmental standards',
        'Democratic organization'
      ],
      validity: '3 years',
      markets: 'Fair trade markets',
      cost: '₦40,000 - 60,000'
    },
    {
      name: 'HACCP',
      description: 'Hazard Analysis Critical Control Points',
      icon: FiFileText,
      requirements: [
        'Hazard analysis',
        'Critical control points',
        'Monitoring procedures',
        'Corrective actions'
      ],
      validity: '3 years',
      markets: 'Food processing industry',
      cost: '₦35,000 - 55,000'
    }
  ];

  const qualityMetrics = [
    {
      metric: 'Certified Farms',
      value: '1,250+',
      description: 'Farms with quality certifications',
      trend: '+150 this year',
      icon: FiAward
    },
    {
      metric: 'Pass Rate',
      value: '94%',
      description: 'First-time certification success',
      trend: '+5% improvement',
      icon: FiTrendingUp
    },
    {
      metric: 'Quality Score',
      value: '4.8/5',
      description: 'Average quality rating',
      trend: '+0.3 this year',
      icon: FiStar
    },
    {
      metric: 'Response Time',
      value: '24hrs',
      description: 'Average inspection scheduling',
      trend: '50% faster',
      icon: FiClock
    }
  ];

  const qualityExperts = [
    {
      name: 'Dr. Sarah Kamau',
      title: 'Chief Quality Officer',
      specialization: 'Food Safety & HACCP',
      experience: '15 years',
      certifications: ['HACCP Lead Auditor', 'Food Safety Specialist'],
      image: '/api/placeholder/80/80'
    },
    {
      name: 'John Mwangi',
      title: 'Senior Inspector',
      specialization: 'Organic & GAP Certification',
      experience: '12 years',
      certifications: ['GlobalGAP Inspector', 'Organic Auditor'],
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Mary Achieng',
      title: 'Laboratory Manager',
      specialization: 'Product Testing & Analysis',
      experience: '10 years',
      certifications: ['ISO 17025 Assessor', 'Lab Quality Manager'],
      image: '/api/placeholder/80/80'
    }
  ];

  const successStories = [
    {
      name: 'Green Valley Farms',
      location: 'Nakuru County',
      product: 'French Beans',
      certification: 'GlobalGAP',
      image: '/api/placeholder/64/64',
      before: 'Local market only',
      after: 'Exporting to 5 countries',
      improvement: '300% revenue increase',
      testimonial: 'GlobalGAP certification opened international markets for us. The quality control team guided us through every step.'
    },
    {
      name: 'Organic Fresh Ltd',
      location: 'Kiambu County',
      product: 'Organic Vegetables',
      certification: 'Organic + Fair Trade',
      image: '/api/placeholder/64/64',
      before: 'Standard pricing',
      after: 'Premium market access',
      improvement: '150% price premium',
      testimonial: 'Dual certification gave us access to premium organic and fair trade markets. Worth every investment.'
    },
    {
      name: 'Highland Coffee Co.',
      location: 'Meru County',
      product: 'Coffee',
      certification: 'Organic + Fair Trade',
      image: '/api/placeholder/64/64',
      before: 'Commodity pricing',
      after: 'Direct trade contracts',
      improvement: '200% farmer income',
      testimonial: 'Quality certification helped us build direct relationships with international buyers.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Quality Control & Certification
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8"
            >
              Ensure your products meet international quality standards with our comprehensive quality control and certification services.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" variant="secondary">
                Book Quality Inspection
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-emerald-600">
                View Certifications
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Metrics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center">
                  <metric.icon className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                  <h3 className="text-3xl font-bold text-emerald-600 mb-2">
                    {metric.value}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {metric.metric}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    {metric.description}
                  </p>
                  <div className="flex items-center justify-center">
                    <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 font-medium">
                      {metric.trend}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Quality Control Services
            </h2>
            <p className="text-gray-600">
              Comprehensive quality services to meet your certification needs
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm">
              {qualityServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedService === service.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <service.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{service.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {qualityServices.map((service) => (
            selectedService === service.id && (
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
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-emerald-600" />
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
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Duration</h4>
                          <p className="text-emerald-600 font-medium">{service.duration}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Pricing</h4>
                          <p className="text-emerald-600 font-medium">{service.pricing}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <Button>
                          Book Service
                        </Button>
                        <Button variant="outline">
                          Get Quote
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Process Steps</h4>
                        <div className="space-y-3">
                          {service.process.map((step, i) => (
                            <div key={i} className="flex items-start">
                              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-xs font-bold text-emerald-600">{i + 1}</span>
                              </div>
                              <span className="text-gray-600">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Benefits</h4>
                        <div className="space-y-2">
                          {service.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center">
                              <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                              <span className="text-gray-600">{benefit}</span>
                            </div>
                          ))}
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

      {/* Certification Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Available Certifications
            </h2>
            <p className="text-gray-600">
              International certifications to access global markets
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {certificationTypes.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <cert.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {cert.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-500">Validity:</span>
                          <p className="font-medium">{cert.validity}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Cost:</span>
                          <p className="font-medium text-emerald-600">{cert.cost}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                        <div className="space-y-1">
                          {cert.requirements.map((req, i) => (
                            <div key={i} className="flex items-center text-sm text-gray-600">
                              <FiCheck className="w-3 h-3 text-green-500 mr-2" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Target Markets:</span>
                        <p className="font-medium">{cert.markets}</p>
                      </div>
                      
                      <Button size="sm" className="w-full">
                        Apply for {cert.name}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Experts */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Quality Experts
            </h2>
            <p className="text-gray-600">
              Certified professionals with extensive experience in quality control
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {qualityExperts.map((expert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {expert.name}
                  </h3>
                  <p className="text-emerald-600 font-medium mb-2">
                    {expert.title}
                  </p>
                  <p className="text-gray-600 mb-3">
                    {expert.specialization}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {expert.experience} experience
                  </p>
                  <div className="space-y-1">
                    {expert.certifications.map((cert, i) => (
                      <span key={i} className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full mr-1 mb-1">
                        {cert}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Certification Success Stories
            </h2>
            <p className="text-gray-600">
              See how quality certification has transformed businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.location}</p>
                      <p className="text-sm text-emerald-600">{story.product}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                      {story.certification}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Before:</span>
                      <span className="font-medium">{story.before}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">After:</span>
                      <span className="font-medium">{story.after}</span>
                    </div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-lg font-bold text-emerald-600">{story.improvement}</div>
                  </div>
                  
                  <p className="text-gray-600 text-sm">"{story.testimonial}"</p>
                  
                  <div className="flex items-center justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Certify Your Quality?
            </h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
              Start your quality certification journey today and unlock access to premium markets worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Book Quality Assessment
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-emerald-600">
                Speak to Quality Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QualityControlPage;