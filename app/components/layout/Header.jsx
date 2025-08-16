'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiX, 
  FiUser, 
  FiShoppingCart, 
  FiTrendingUp,
  FiPhone,
  FiChevronDown 
} from 'react-icons/fi';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    {
      name: 'For Farmers',
      href: '/farmers',
      icon: FiUser,
      dropdown: [
        { name: 'Access Inputs', href: '/farmers/inputs' },
        { name: 'Sell Produce', href: '/farmers/marketplace' },
        { name: 'Get Financing', href: '/farmers/loans' },
        { name: 'Savings Account', href: '/farmers/savings' }
      ]
    },
    {
      name: 'For Buyers',
      href: '/buyers',
      icon: FiShoppingCart,
      dropdown: [
        { name: 'Browse Products', href: '/buyers/marketplace' },
        { name: 'Place Orders', href: '/buyers/orders' },
        { name: 'Quality Assurance', href: '/buyers/quality' },
        { name: 'Logistics', href: '/buyers/logistics' }
      ]
    },
    {
      name: 'Services',
      href: '/services',
      icon: FiTrendingUp,
      dropdown: [
        { name: 'Input Financing', href: '/services/financing' },
        { name: 'Storage Solutions', href: '/services/storage' },
        { name: 'Quality Control', href: '/services/quality' },
        { name: 'Data & Analytics', href: '/services/data' },
        { name: 'Insurance', href: '/services/insurance' },
        { name: 'Logistics service', href: '/services/logistics' },
        { name: 'Savings Scheme', href: '/services/savings' }
      ]
    },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact', icon: FiPhone }
  ];

  const isActive = (href) => pathname === href;

  const handleDropdown = (name) => {
    setDropdownOpen(dropdownOpen === name ? '' : name);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src="/farmnetlogo.png" 
                  alt="FarmNet Technologies" 
                  className="h-8 w-auto"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdown(item.name)}
                        className={cn(
                          'flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                          isActive(item.href)
                            ? 'text-green-600 bg-green-50'
                            : scrolled
                            ? 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                            : 'text-gray-800 hover:text-green-600 hover:bg-white/10'
                        )}
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span>{item.name}</span>
                        <FiChevronDown
                          className={cn(
                            'w-4 h-4 transition-transform duration-200',
                            dropdownOpen === item.name && 'rotate-180'
                          )}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {dropdownOpen === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2"
                          >
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                                onClick={() => setDropdownOpen('')}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                        isActive(item.href)
                          ? 'text-green-600 bg-green-50'
                          : scrolled
                          ? 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                          : 'text-gray-800 hover:text-green-600 hover:bg-white/10'
                      )}
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
              >
                Login
              </Link>
              <Button
                size="sm"
                onClick={() => {
                  window.location.href = '/auth/register';
                }}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 z-50 w-80 h-full bg-white shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center space-x-3">
                    <img 
                      src="/farmnetlogo.png" 
                      alt="FarmNet Technologies" 
                      className="h-8 w-auto"
                    />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <nav className="p-6 space-y-6">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => handleDropdown(item.name)}
                          className="flex items-center justify-between w-full text-left text-base font-medium text-gray-800 hover:text-green-600 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            {item.icon && <item.icon className="w-5 h-5" />}
                            <span>{item.name}</span>
                          </div>
                          <FiChevronDown
                            className={cn(
                              'w-4 h-4 transition-transform duration-200',
                              dropdownOpen === item.name && 'rotate-180'
                            )}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {dropdownOpen === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-3 pl-8 space-y-2 overflow-hidden"
                            >
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block text-sm text-gray-600 hover:text-green-600 transition-colors duration-200"
                                  onClick={() => {
                                    setIsOpen(false);
                                    setDropdownOpen('');
                                  }}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center space-x-3 text-base font-medium transition-colors duration-200',
                          isActive(item.href)
                            ? 'text-green-600'
                            : 'text-gray-800 hover:text-green-600'
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon && <item.icon className="w-5 h-5" />}
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="pt-6 border-t border-gray-200 space-y-4">
                  <Link
                    href="/auth/login"
                    className="block w-full text-center py-2 text-base font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Button 
                    className="w-full justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;