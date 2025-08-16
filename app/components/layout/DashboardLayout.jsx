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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
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
        className="fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-white to-neutral-50 shadow-2xl border-r border-neutral-200/50 lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200/50">
            <Link href="/" className="flex items-center space-x-3 group">
              <img 
                src="/farmnetlogo.png" 
                alt="FarmNet Technologies" 
                className="h-10 w-auto shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl text-neutral-500 hover:bg-neutral-100 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-neutral-200/50">
            <Link href={`/dashboard/${userType}/profile`} className="group">
              <div className="flex items-center space-x-4 p-3 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100/50 group-hover:from-primary-100 group-hover:to-primary-200/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-semibold text-lg">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900 truncate group-hover:text-primary-700 transition-colors">
                    {user.name}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </Link>
            <div className="mt-3 flex items-center justify-between">
              <Badge
                variant={userType === 'farmer' ? 'success' : 'info'}
                size="sm"
                className="font-medium"
              >
                {userType === 'farmer' ? '🌾 Farmer' : '🏢 Buyer'}
              </Badge>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                Main Menu
              </h3>
            </div>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                    : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className={cn(
                  'w-5 h-5 transition-transform duration-200',
                  isActive(item.href) 
                    ? 'text-white' 
                    : 'text-neutral-500 group-hover:text-primary-600 group-hover:scale-110'
                )} />
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  {item.name}
                </span>
                {isActive(item.href) && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-6 border-t border-neutral-200/50">
            <Button
              variant="ghost"
              className="w-full justify-start text-neutral-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-xl py-3"
              onClick={() => {
                // Handle logout with confirmation
                if (confirm('Are you sure you want to logout?')) {
                  window.location.href = '/auth/login';
                }
              }}
            >
              <FiLogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-neutral-200/50 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-neutral-500 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
              >
                <FiMenu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-black font-display text-neutral-900">
                  {userType === 'farmer' ? 'Farmer Dashboard' : 'Buyer Dashboard'}
                </h1>
                <p className="text-sm text-neutral-500">
                  Welcome back! Here's what's happening with your account today.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                />
                <FiMenu className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              </div>
              
              {/* Notifications */}
              <button className="relative p-3 rounded-xl text-neutral-500 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 group">
                <FiBell className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              
              {/* Profile dropdown trigger */}
              <Link href={`/dashboard/${userType}/profile`} className="group">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center cursor-pointer shadow-lg group-hover:scale-105 transition-all duration-200">
                  <span className="text-white font-semibold text-sm">
                    {user.name.charAt(0)}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;