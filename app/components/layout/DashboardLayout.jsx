'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiUser,
  FiShoppingCart,
  FiDollarSign,
  FiTruck,
  FiPieChart,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiGrid,
  FiTrendingUp,
  FiPackage,
  FiUsers
} from 'react-icons/fi';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { cn } from '../../lib/utils';

const DashboardLayout = ({ children, userType = 'farmer' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const farmerNavigation = [
    { name: 'Dashboard', href: '/dashboard/farmer', icon: FiHome },
    { name: 'My Profile', href: '/dashboard/farmer/profile', icon: FiUser },
    { name: 'My Products', href: '/dashboard/farmer/products', icon: FiPackage },
    { name: 'Orders', href: '/dashboard/farmer/orders', icon: FiShoppingCart },
    { name: 'Loans & Financing', href: '/dashboard/farmer/loans', icon: FiDollarSign },
    { name: 'Savings Account', href: '/dashboard/farmer/savings', icon: FiPieChart },
    { name: 'Logistics', href: '/dashboard/farmer/logistics', icon: FiTruck },
    { name: 'Settings', href: '/dashboard/farmer/settings', icon: FiSettings }
  ];

  const buyerNavigation = [
    { name: 'Dashboard', href: '/dashboard/buyer', icon: FiHome },
    { name: 'Company Profile', href: '/dashboard/buyer/profile', icon: FiUser },
    { name: 'Marketplace', href: '/dashboard/buyer/marketplace', icon: FiGrid },
    { name: 'My Orders', href: '/dashboard/buyer/orders', icon: FiShoppingCart },
    { name: 'Suppliers', href: '/dashboard/buyer/suppliers', icon: FiUsers },
    { name: 'Analytics', href: '/dashboard/buyer/analytics', icon: FiTrendingUp },
    { name: 'Logistics', href: '/dashboard/buyer/logistics', icon: FiTruck },
    { name: 'Settings', href: '/dashboard/buyer/settings', icon: FiSettings }
  ];

  const navigation = userType === 'farmer' ? farmerNavigation : buyerNavigation;

  const isActive = (href) => pathname === href;

  const user = {
    name: userType === 'farmer' ? 'John Farmer' : 'ABC Company',
    email: userType === 'farmer' ? 'john@farmer.com' : 'contact@abccompany.com',
    avatar: null
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : '-100%'
        }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold font-bold text-green-600">
                Farmnet
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-lg text-gray-500 hover:bg-gray-100"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <Badge
              variant={userType === 'farmer' ? 'success' : 'info'}
              size="sm"
              className="mt-3"
            >
              {userType === 'farmer' ? 'Farmer' : 'Buyer'}
            </Badge>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-600'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700"
              onClick={() => {
                // Handle logout
                window.location.href = '/auth/login';
              }}
            >
              <FiLogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <FiMenu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {userType === 'farmer' ? 'Farmer Dashboard' : 'Buyer Dashboard'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100">
                <FiBell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <Link href={`/dashboard/${userType}/profile`}>
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center cursor-pointer">
                  <span className="text-white font-medium text-sm">
                    {user.name.charAt(0)}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;