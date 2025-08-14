'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiCheck, 
  FiStar, 
  FiEye,
  FiClipboard,
  FiTrendingUp,
  FiAward,
  FiUsers,
  FiBarChart,
  FiCamera,
  FiFileText,
  FiMapPin,
  FiClock
} from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const QualityAssurancePage = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const qualityStandards = [
    {
      title: 'Global GAP Certification',
      description: 'Good Agricultural Practices ensuring food safety and sustainability',
      icon: FiAward,
      coverage: '85% of farmers',
      benefits: ['Traceability', 'Food safety', 'Environmental protection', 'Worker welfare']
    },
    {
      title: 'Organic Certification',
      description: 'Certified organic products free from synthetic pesticides and fertilizers',
      icon: FiShield,
      coverage: '45% of products',
      benefits: ['No synthetic chemicals', 'Soil health', 'Biodiversity', 'Premium pricing']
    },
    {
      title: 'Export Grade Standards',
      description: 'International quality standards for export-ready produce',
      icon: FiTrendingUp,
      coverage: '60% of products',
      benefits: ['International markets', 'Premium quality', 'Strict grading', 'Cold chain']
    },
    {
      title: 'Farmnet Quality Seal',
      description: 'Our own quality assurance program with regular inspections',
      icon: FiCheck,
      coverage: '100% of farmers',
      benefits: ['Regular inspections', 'Quality scoring', 'Continuous improvement', 'Buyer confidence']
    }
  ];

  const qualityProcess = [
    {
      step: 1,
      title: 'Farm Registration',
      description: 'Farmers register and undergo initial quality assessment',
      icon: FiClipboard,
      details: [
        'Farm inspection and documentation',
        'Soil and water quality testing',
        'Farmer training and certification',
        'Quality standards agreement'
      ]
    },
    {
      step: 2,
      title: 'Regular Monitoring',
      description: 'Ongoing monitoring and quality checks throughout growing season',
      icon: FiEye,
      details: [
        'Monthly farm visits',
        'Crop health assessments',
        'Compliance monitoring',
        'Advisory support'
      ]
    },
    {
      step: 3,
      title: 'Harvest Inspection',
      description: 'Pre-harvest and post-harvest quality verification',
      icon: FiCamera,
      details: [
        'Pre-harvest quality assessment',
        'Proper harvesting practices',
        'Post-harvest handling',
        'Quality grading and sorting'
      ]
    },
    {
      step: 4,
      title: 'Buyer Guarantee',
      description: 'Quality guarantee and satisfaction assurance for buyers',
      icon: FiShield,
      details: [
        'Quality certificates provided',
        'Money-back guarantee',
        '24/7 quality support',
        'Dispute resolution'
      ]
    }
  ];

  const qualityMetrics = [
    {
      metric: 'Quality Score',
      value: '4.8/5.0',
      description: 'Average quality rating across all products',
      trend: '+0.2 this month',
      color: 'text-green-600'
    },
    {
      metric: 'Rejection Rate',
      value: '2.3%',
      description: 'Percentage of orders rejected due to quality issues',
      trend: '-0.5% this month',
      color: 'text-green-600'
    },
    {
      metric: 'Certified Farmers',
      value: '1,250',
      description: 'Number of quality-certified farmers on platform',
      trend: '+85 this month',
      color: 'text-blue-600'
    },
    {
      metric: 'Inspections',
      value: '450',
      description: 'Quality inspections conducted this month',
      trend: '+12% vs last month',
      color: 'text-purple-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mutiso',
      company: 'Fresh Foods Ltd',
      role: 'Procurement Manager',
      image: '/api/placeholder/64/64',
      testimonial: 'The quality assurance program gives us complete confidence in our purchases. We\'ve reduced quality issues by 90% since partnering with Farmnet.',
      rating: 5
    },
    {
      name: 'James Kiprotich',
      company: 'Export Partners Kenya',
      role: 'Quality Director',
      image: '/api/placeholder/64/64',
      testimonial: 'Farmnet\'s quality standards match international requirements. We can confidently export their certified produce to European markets.',
      rating: 5
    },
    {
      name: 'Mary Wanjiku',
      company: 'Hotel Chain Kenya',
      role: 'Executive Chef',
      image: '/api/placeholder/64/64',
      testimonial: 'Consistent quality and freshness. Our guests notice the difference in taste and presentation. The quality guarantee is invaluable.',
      rating: 5
    }
  ];

  const qualityReports = [
    {
      id: 1,
      title: 'Monthly Quality Report - January 2024',
      date: '2024-01-31',
      type: 'Monthly Report',
      highlights: [
        'Average quality score: 4.8/5',
        '2,150 quality inspections completed',
        '98.5% buyer satisfaction rate',
        '15 new certifications awarded'
      ],
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Organic Certification Audit Report',
      date: '2024-01-15',
      type: 'Audit Report',
      highlights: [
        '145 organic farms audited',
        '92% compliance rate achieved',
        '12 new organic certifications',
        '8 farmers upgraded to premium status'
      ],
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Quality Improvement Initiative Results',
      date: '2024-01-10',
      type: 'Initiative Report',
      highlights: [
        '35% reduction in quality complaints',
        '50 farmers completed advanced training',
        'New quality scoring system implemented',
        'Improved traceability system deployed'
      ],
      downloadUrl: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Quality Assurance Program
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-green-100 max-w-3xl mx-auto mb-8"
            >
              Ensuring the highest quality standards from farm to table with comprehensive quality assurance and certification programs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" variant="secondary">
                View Quality Standards
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                Download Reports
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Metrics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quality Performance Metrics
            </h2>
            <p className="text-gray-600">
              Real-time quality metrics across our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center">
                  <h3 className={`text-3xl font-bold ${metric.color} mb-2`}>
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

      {/* Tab Navigation */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm">
              {[
                { id: 'overview', name: 'Overview', icon: FiEye },
                { id: 'standards', name: 'Quality Standards', icon: FiShield },
                { id: 'process', name: 'Our Process', icon: FiClipboard },
                { id: 'reports', name: 'Quality Reports', icon: FiFileText }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedTab === tab.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
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
        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Comprehensive Quality Assurance
                </h2>
                <p className="text-gray-600 mb-6">
                  Our quality assurance program ensures that every product on our platform meets the highest standards of quality, safety, and sustainability. We work closely with farmers to implement best practices and provide continuous monitoring and support.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <FiCheck className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Farm-to-Table Traceability</h3>
                      <p className="text-gray-600">Complete traceability from farm origin to final delivery</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FiCheck className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Regular Quality Inspections</h3>
                      <p className="text-gray-600">Monthly farm visits and product quality assessments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FiCheck className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Certified Quality Experts</h3>
                      <p className="text-gray-600">Trained agricultural specialists conducting all inspections</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Quality Dashboard</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Overall Quality Score</span>
                      <span className="text-2xl font-bold">4.8/5</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-xl font-bold">98.5%</div>
                        <div className="text-sm text-green-100">Satisfaction Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">1,250</div>
                        <div className="text-sm text-green-100">Certified Farms</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold">450</div>
                        <div className="text-sm text-green-100">Monthly Inspections</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">2.3%</div>
                        <div className="text-sm text-green-100">Rejection Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quality Standards Tab */}
        {selectedTab === 'standards' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Quality Standards
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We maintain the highest quality standards through various certification programs and quality assurance initiatives
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {qualityStandards.map((standard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <standard.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {standard.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {standard.description}
                        </p>
                        <div className="mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {standard.coverage}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Key Benefits:</h4>
                          <ul className="space-y-1">
                            {standard.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-center text-sm text-gray-600">
                                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Process Tab */}
        {selectedTab === 'process' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Quality Assurance Process
              </h2>
              <p className="text-gray-600">
                A comprehensive 4-step process ensuring quality from farm to delivery
              </p>
            </div>
            
            <div className="space-y-12">
              {qualityProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
                >
                  <div className="w-1/2 pr-8">
                    <Card className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <step.icon className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-green-600 mb-1">
                            Step {step.step}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {step.description}
                          </p>
                          <ul className="space-y-2">
                            {step.details.map((detail, i) => (
                              <li key={i} className="flex items-start text-sm text-gray-600">
                                <FiCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="w-1/2 flex justify-center">
                    <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {step.step}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {selectedTab === 'reports' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quality Reports & Documentation
              </h2>
              <p className="text-gray-600">
                Transparent reporting on our quality assurance activities and outcomes
              </p>
            </div>
            
            <div className="space-y-6">
              {qualityReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <FiFileText className="w-5 h-5 text-green-600" />
                          <h3 className="text-lg font-semibold text-gray-900">
                            {report.title}
                          </h3>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            {report.type}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <FiClock className="w-4 h-4 mr-1" />
                          <span>{new Date(report.date).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          {report.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-start text-sm text-gray-600">
                              <FiCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="ml-6">
                        <Button size="sm" variant="outline">
                          <FiFileText className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Testimonials Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Buyers Say
            </h2>
            <p className="text-gray-600">
              Hear from businesses that trust our quality assurance program
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
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
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-green-600">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600">"{testimonial.testimonial}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Experience Quality You Can Trust
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of buyers who rely on our comprehensive quality assurance program for their agricultural procurement needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Browse Quality Products
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                Learn More About Quality
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QualityAssurancePage;