'use client';
import { motion } from 'framer-motion';
import {  
  FiTarget,
  FiTrendingUp, 
  FiTruck, 
  FiShield, 
  FiPieChart, 
  FiDollarSign,
  FiUsers,
  FiArrowRight,
  FiCheck,
  FiPlay
} from 'react-icons/fi';
import Button from './components/ui/Button';
import { Card, CardContent } from './components/ui/Card';
import Badge from './components/ui/Badge';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const services = [
    {
      icon: FiTarget,
      title: 'Access to Inputs',
      description: 'Get quality seeds, fertilizers, and farming equipment with flexible financing options. Pay back after harvest with our subsidized rates.',
      features: ['Quality inputs guaranteed', 'Flexible payment terms', 'NGO partnerships available']
    },
    {
      icon: FiTrendingUp,
      title: 'Market Access',
      description: 'Connect directly with verified buyers including FMCGs, exporters, and processors. Get the best prices for your produce.',
      features: ['Direct buyer connections', 'Competitive pricing', 'Quality verification']
    },
    {
      icon: FiTruck,
      title: 'Logistics & Storage',
      description: 'Professional logistics services and temporary storage solutions to prevent post-harvest losses and panic sales.',
      features: ['Cold storage facilities', 'Reliable transportation', 'Reduced post-harvest losses']
    },
    {
      icon: FiShield,
      title: 'Quality Control',
      description: 'Comprehensive quality assurance services to ensure your produce meets buyer requirements and market standards.',
      features: ['Quality certification', 'Market standards compliance', 'Buyer satisfaction guaranteed']
    },
    {
      icon: FiDollarSign,
      title: 'Savings & Wealth',
      description: 'Automated savings scheme that helps you build wealth and access financial services for education and healthcare.',
      features: ['Automated savings', 'Wealth building', 'Financial services access']
    },
    {
      icon: FiPieChart,
      title: 'Data & Insurance',
      description: 'Access market data, weather information, and insurance services to make informed decisions and mitigate risks.',
      features: ['Real-time market data', 'Weather forecasts', 'Risk mitigation']
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Farmers Connected' },
    { number: '500+', label: 'Verified Buyers' },
    { number: '₦2.5B+', label: 'Transactions Processed' },
    { number: '85%', label: 'Income Increase' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-10" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge variant="primary" size="lg" className="mb-6">
                🌾 Agricultural FinTech Platform
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-bold text-gray-900 leading-tight mb-8"
            >
              Connecting Farmers to{' '}
              <span className="text-green-600">Markets</span>,{' '}
              <span className="text-green-600">Finance</span>, and{' '}
              <span className="text-green-600">Prosperity</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              We are an Agricultural FinTech company helping smallholder farmers break the debt cycle through access to inputs, markets, and innovative financial services.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button size="xl" className="group">
                Get Started Today
                <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <button className="flex items-center space-x-3 text-gray-700 hover:text-green-600 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center group-hover:shadow-2xl transition-shadow">
                  <FiPlay className="w-5 h-5 ml-0.5" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </button>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-green-100 rounded-full opacity-60"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-32 right-16 w-16 h-16 bg-orange-100 rounded-full opacity-60"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-4">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-bold text-gray-900 mb-6">
              Comprehensive Agricultural Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From input financing to market access, we provide end-to-end solutions that transform agricultural value chains.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card hover className="h-full group">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                      <service.icon className="w-7 h-7 text-green-600" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <FiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-bold text-gray-900 mb-6">
              Simple Steps to Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process makes it easy for farmers and buyers to connect, transact, and grow together.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
            {[
              {
                step: '01',
                title: 'Sign Up & Verify',
                description: 'Create your account and complete our simple verification process to access our platform.'
              },
              {
                step: '02',
                title: 'Access Services',
                description: 'Browse and access inputs, financing, storage, or marketplace services based on your needs.'
              },
              {
                step: '03',
                title: 'Grow & Prosper',
                description: 'Leverage our ecosystem to increase yields, reduce costs, and build sustainable wealth.'
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-10" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-bold text-white mb-6">
              Ready to Transform Your Agricultural Business?
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
              Join thousands of farmers and buyers who are already benefiting from our comprehensive agricultural ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="xl"
                className="bg-white text-green-600 hover:bg-green-50"
              >
                <FiUsers className="mr-2 w-5 h-5" />
                Join as Farmer
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                <FiTrendingUp className="mr-2 w-5 h-5" />
                Join as Buyer
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
