'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFacebook, 
  FiTwitter, 
  FiLinkedin, 
  FiInstagram,
  FiArrowRight
} from 'react-icons/fi';
import Button from '../ui/Button';

const Footer = () => {
  const quickLinks = [
    { name: 'For Farmers', href: '/farmers' },
    { name: 'For Buyers', href: '/buyers' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const services = [
    { name: 'Input Financing', href: '/services/financing' },
    { name: 'Market Access', href: '/services/marketplace' },
    { name: 'Storage Solutions', href: '/services/storage' },
    { name: 'Quality Control', href: '/services/quality' },
    { name: 'Data & Analytics', href: '/services/data' },
    { name: 'Insurance', href: '/services/insurance' }
  ];

  const legal = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Data Protection', href: '/data-protection' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: FiFacebook },
    { name: 'Twitter', href: '#', icon: FiTwitter },
    { name: 'LinkedIn', href: '#', icon: FiLinkedin },
    { name: 'Instagram', href: '#', icon: FiInstagram }
  ];

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl text-gray-400 font-display mb-4">
                Stay Connected with Farmnet
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                Get the latest updates on agricultural innovations, market insights, and platform features.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-neutral-800/50 backdrop-blur-sm border border-neutral-600 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                />
                <Button className="btn-primary sm:px-6">
                  Subscribe
                  <FiArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link href="/" className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">F</span>
                  </div>
                  <span className="text-2xl font-bold font-bold">
                    Farmnet
                  </span>
                </Link>
                
                <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-md">
                  An Agricultural FinTech company helping smallholder farmers break the debt cycle by providing access to inputs, markets, and financial services.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FiMapPin className="w-5 h-5 text-green-500" />
                    <span className="text-sm">
                      NO 8, Watchtower Road, Off Ifatedo Elemoro Street,<br />
                      Opposite Assembly Hall, Bogije Ibeju-Lekki, Lagos, Nigeria
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FiPhone className="w-5 h-5 text-green-500" />
                    <span className="text-sm">+234 (0) 123 456 7890</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FiMail className="w-5 h-5 text-green-500" />
                    <span className="text-sm">info@farmnet.ng</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Services */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="text-lg font-semibold mb-6">Our Services</h4>
                <ul className="space-y-3">
                  {services.map((service) => (
                    <li key={service.name}>
                      <Link
                        href={service.href}
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Legal */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4 className="text-lg font-semibold mb-6">Legal</h4>
                <ul className="space-y-3">
                  {legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              © {new Date().getFullYear()} Farmnet Technologies & Agro Services Limited. All rights reserved.
            </motion.p>
            
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;