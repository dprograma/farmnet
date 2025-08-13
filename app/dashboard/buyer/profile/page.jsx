'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiEdit3, 
  FiSave,
  FiX,
  FiCamera,
  FiShield,
  FiCreditCard,
  FiBarChart,
  FiCalendar,
  FiGlobe
} from 'react-icons/fi';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Badge from '../../../components/ui/Badge';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function BuyerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    companyName: 'ABC Agro Limited',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@abcagro.com',
    phone: '+234 (0) 123 456 7890',
    address: 'Plot 42, Industrial Estate, Victoria Island, Lagos',
    website: 'www.abcagro.com',
    businessType: 'Food Processing',
    yearEstablished: '2018',
    employeeCount: '50-100',
    annualVolume: '5,000 tons',
    bankAccount: '**** **** **** 5678',
    taxId: 'TIN123456789'
  });

  const [formData, setFormData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(profileData);
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const stats = [
    { label: 'Total Orders', value: '342', icon: FiBarChart, color: 'text-blue-600' },
    { label: 'Total Spent', value: '₦15.6M', icon: FiCreditCard, color: 'text-green-600' },
    { label: 'Active Suppliers', value: '28', icon: FiUser, color: 'text-purple-600' },
    { label: 'Member Since', value: '2022', icon: FiCalendar, color: 'text-orange-600' }
  ];

  return (
    <DashboardLayout userType="buyer">
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-black font-display text-neutral-900 mb-2">
                Company Profile
              </h1>
              <p className="text-neutral-600">
                Manage your company information and business details
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              {!isEditing ? (
                <Button onClick={handleEdit} className="btn-primary">
                  <FiEdit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-3">
                  <Button onClick={handleSave} className="btn-primary">
                    <FiSave className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    <FiX className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Profile Overview */}
        <motion.div variants={fadeInUp}>
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-blue-600">
                      {profileData.companyName.charAt(0)}
                    </span>
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200">
                    <FiCamera className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {profileData.companyName}
                  </h2>
                  <p className="text-blue-100 mb-1">Contact: {profileData.contactPerson}</p>
                  <p className="text-blue-100 mb-3">{profileData.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      🏢 Verified Buyer
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      ⭐ Premium Partner
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeInUp}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-4">
                <div className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </Card>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Information */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FiUser className="w-5 h-5 mr-2 text-primary-600" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Company Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Company Name"
                    />
                  ) : (
                    <p className="text-neutral-900 font-medium">{profileData.companyName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Contact Person
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      placeholder="Contact Person"
                      icon={FiUser}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <FiUser className="w-4 h-4 text-neutral-500" />
                      <p className="text-neutral-900 font-medium">{profileData.contactPerson}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Email"
                      icon={FiMail}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <FiMail className="w-4 h-4 text-neutral-500" />
                      <p className="text-neutral-900 font-medium">{profileData.email}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Phone"
                      icon={FiPhone}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <FiPhone className="w-4 h-4 text-neutral-500" />
                      <p className="text-neutral-900 font-medium">{profileData.phone}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Address
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Address"
                      icon={FiMapPin}
                    />
                  ) : (
                    <div className="flex items-start space-x-2">
                      <FiMapPin className="w-4 h-4 text-neutral-500 mt-1" />
                      <p className="text-neutral-900 font-medium">{profileData.address}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Website
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="Website"
                      icon={FiGlobe}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <FiGlobe className="w-4 h-4 text-neutral-500" />
                      <p className="text-neutral-900 font-medium">{profileData.website}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Business Information */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-primary-600 mr-2">📊</span>
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Business Type
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Retail">Retail</option>
                      <option value="Wholesale">Wholesale</option>
                      <option value="Export">Export</option>
                      <option value="Manufacturing">Manufacturing</option>
                    </select>
                  ) : (
                    <p className="text-neutral-900 font-medium">{profileData.businessType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Year Established
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.yearEstablished}
                      onChange={(e) => handleInputChange('yearEstablished', e.target.value)}
                      placeholder="Year Established"
                    />
                  ) : (
                    <p className="text-neutral-900 font-medium">{profileData.yearEstablished}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Employee Count
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.employeeCount}
                      onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="50-100">50-100</option>
                      <option value="100-500">100-500</option>
                      <option value="500+">500+</option>
                    </select>
                  ) : (
                    <p className="text-neutral-900 font-medium">{profileData.employeeCount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Annual Purchase Volume
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.annualVolume}
                      onChange={(e) => handleInputChange('annualVolume', e.target.value)}
                      placeholder="Annual Volume"
                    />
                  ) : (
                    <p className="text-neutral-900 font-medium">{profileData.annualVolume}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Bank Account
                  </label>
                  <div className="flex items-center space-x-2">
                    <FiCreditCard className="w-4 h-4 text-neutral-500" />
                    <p className="text-neutral-900 font-medium">{profileData.bankAccount}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Tax ID (TIN)
                  </label>
                  <div className="flex items-center space-x-2">
                    <FiShield className="w-4 h-4 text-neutral-500" />
                    <p className="text-neutral-900 font-medium">{profileData.taxId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Account Actions */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Delete Account</h3>
                  <p className="text-sm text-red-700">
                    Permanently delete your company account and all associated data. This action cannot be undone.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-3 md:mt-0 border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      alert('Account deletion functionality would be implemented here.');
                    }
                  }}
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}