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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-emerald-50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100/30 to-emerald-100/30" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left side - Text content */}
            <motion.div 
              className="text-center lg:text-left"
              initial="initial"
              animate="animate"
              variants={staggerChildren}
            >
            <motion.div variants={fadeInUp} className="mb-8">
              <Badge variant="primary" size="lg" className="mb-6 shadow-lg">
                🌾 Agricultural FinTech Platform
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 leading-tight mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Connecting Farmers to{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Markets</span>,{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Finance</span>, and{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Prosperity</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl lg:max-w-none leading-relaxed"
            >
              We are an Agricultural FinTech company helping smallholder farmers break the debt cycle through access to inputs, markets, and innovative financial services.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center items-center"
            >
              <Button size="xl" className="btn-primary" onClick={() => {
                window.location.href = '/auth/register';
              }}>
                Get Started Today
                <FiArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <button className="flex items-center space-x-3 text-neutral-700 hover:text-primary-600 transition-all duration-300 group">
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-primary-500/25 transform hover:scale-110 transition-all duration-300">
                  <FiPlay className="w-5 h-5 ml-1 text-primary-600" />
                </div>
                <span className="font-semibold">Watch Demo</span>
              </button>
            </motion.div>
            
            </motion.div>
            
            {/* Right side - Hero Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div 
                  className="w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl relative"
                  style={{
                    backgroundImage: "url('/right-side-background.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Semi-transparent overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-primary-800/30 to-emerald-900/40"></div>
                  {/* Hero illustration placeholder */}
                  <div className="w-full h-full flex items-center justify-center relative z-10">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <span className="text-4xl text-white">🌱</span>
                      </div>
                      <h3 className="text-2xl font-bold text-primary-800 mb-2 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">Growing Together</h3>
                      <p className="text-primary-600 text-shadow-lg">Empowering Agricultural Success</p>
                    </div>
                    
                    {/* Floating elements */}
                    <motion.div 
                      className="absolute top-8 right-8 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center z-20"
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <span className="text-2xl">📊</span>
                    </motion.div>
                    
                    <motion.div 
                      className="absolute bottom-8 left-8 w-12 h-12 bg-secondary-500/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center z-20"
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <span className="text-xl">🚚</span>
                    </motion.div>
                  </div>
                </div>
                
                {/* Background decorations */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary-500 rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-500 rounded-full opacity-40"></div>
              </div>
            </motion.div>
          </div>
          
          {/* Stats moved below hero */}
          <motion.div 
            variants={fadeInUp}
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-20 animate-float"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-full opacity-30 animate-float"
          animate={{ y: [15, -15, 15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-32 right-16 w-28 h-28 bg-gradient-to-br from-green-100 to-green-200 rounded-full opacity-25 animate-float"
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-6 animate-bounce-subtle">Our Services</Badge>
            <h2 className="heading-section mb-6">
              Comprehensive Agricultural Solutions
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
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
                <Card className="h-full group card-hover interactive-glow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mb-6 group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300 animate-bounce-subtle">
                      <service.icon className="w-8 h-8 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-primary-700 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-3 text-sm text-neutral-600">
                          <div className="w-5 h-5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <FiCheck className="w-3 h-3 text-white" />
                          </div>
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
            <h2 className="heading-section mb-6">
              Simple Steps to Success
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
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
                <div className="w-16 h-16 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-2xl font-display font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-hero-pattern opacity-5" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <Badge variant="primary" className="mb-6 bg-primary-500/20 text-primary-300 border border-primary-500/30">
                🚀 Join the Revolution
              </Badge>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Ready to <span className="text-gradient bg-gradient-to-r from-primary-400 to-emerald-400 bg-clip-text text-transparent">Transform</span> Your
              <br />Agricultural Business?
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of farmers and buyers who are already benefiting from our comprehensive agricultural ecosystem and innovative solutions.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              size="xl"
              className="group bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white border-0 shadow-xl hover:shadow-2xl hover:shadow-primary-500/25 transform hover:scale-105 transition-all duration-300 py-4 px-8"
            >
              <FiUsers className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-left">
                <div className="font-bold text-lg" onClick={() => {window.location.href = '/auth/register';}}>Join as Farmer</div>
                <div className="text-sm opacity-90">Access markets & financing</div>
              </div>
            </Button>
            
            <Button 
              size="xl"
              className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white hover:text-neutral-900 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 py-4 px-8"
            >
              <FiTrendingUp className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-left">
                <div className="font-bold text-lg" onClick={() => {window.location.href = '/auth/register';}}>Join as Buyer</div>
                <div className="text-sm opacity-90 group-hover:opacity-70">Source quality produce</div>
              </div>
            </Button>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div 
            className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10,000+</div>
              <div className="text-sm text-neutral-400">Active Users</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">₦2.5B+</div>
              <div className="text-sm text-neutral-400">Processed</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">85%</div>
              <div className="text-sm text-neutral-400">Income Increase</div>
            </div>
          </motion.div>
        </div>
        
        {/* Subtle floating elements */}
        <motion.div 
          className="absolute top-20 left-20 w-20 h-20 bg-primary-500/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </section>

      <Footer />
    </div>
  );
}
