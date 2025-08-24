'use client';
import { useState, useRef } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';
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
  FiCalendar
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

export default function FarmerProfile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(user || {
    firstName: 'John',
    lastName: 'Farmer',
    email: 'john@farmer.com',
    phone: '+234 (0) 123 456 7890',
    address: 'Plot 15, Agricultural Zone, Ibeju-Lekki, Lagos',
    farmSize: '5.2 hectares',
    primaryCrops: 'Rice, Cassava, Tomatoes',
    yearsOfExperience: '8 years',
    bankAccount: '**** **** **** 1234',
    bvn: '**** **** 56',
    avatar: null
  });

  const [formData, setFormData] = useState(profileData);
  const [profileImage, setProfileImage] = useState(profileData.avatar);
  const [imagePreview, setImagePreview] = useState(profileData.avatar);
  const fileInputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(profileData);
  };

  const handleSave = async () => {
    try {
      const updatedData = { ...formData };
      if (profileImage !== profileData.avatar) {
        updatedData.avatar = profileImage;
      }
      
      const result = await updateProfile(updatedData);
      if (result.success) {
        setProfileData(result.user);
        setProfileImage(result.user.avatar);
        setImagePreview(result.user.avatar);
        setIsEditing(false);
      }
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData(profileData);
    setProfileImage(profileData.avatar);
    setImagePreview(profileData.avatar);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        setImagePreview(imageDataUrl);
        setProfileImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const stats = [
    { label: 'Active Products', value: '24', icon: FiBarChart, color: 'text-blue-600' },
    { label: 'Total Earnings', value: '₦2.4M', icon: FiCreditCard, color: 'text-green-600' },
    { label: 'Orders Completed', value: '156', icon: FiShield, color: 'text-purple-600' },
    { label: 'Member Since', value: '2022', icon: FiCalendar, color: 'text-orange-600' }
  ];

  return (
    <DashboardLayout userType="farmer">
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
                My Profile
              </h1>
              <p className="text-neutral-600">
                Manage your account information and preferences
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
            <div className="bg-primary-50 border-b border-primary-200 px-6 py-8">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Profile" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-primary-600">
                        {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={handleImageClick}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
                    title="Change profile picture"
                  >
                    <FiCamera className="w-4 h-4 text-primary-600" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-2xl font-bold text-primary-800 mb-2">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-primary-600 mb-3">{profileData.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge variant="secondary" className="bg-white text-primary-700 border-primary-300">
                      🌾 Verified Farmer
                    </Badge>
                    <Badge variant="secondary" className="bg-white text-primary-700 border-primary-300">
                      ⭐ Premium Member
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Image Upload Preview (when editing) */}
        {isEditing && imagePreview && (
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <FiCamera className="w-5 h-5 mr-2 text-primary-600" />
                    Profile Picture Preview
                  </span>
                  <Button 
                    onClick={removeImage}
                    variant="outline" 
                    size="sm"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <FiX className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
                    <img 
                      src={imagePreview} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-center text-sm text-neutral-600 mt-3">
                  This will be your new profile picture
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

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
          {/* Personal Information */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FiUser className="w-5 h-5 mr-2 text-primary-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="First Name"
                      />
                    ) : (
                      <p className="text-neutral-900 font-medium">{profileData.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Last Name"
                      />
                    ) : (
                      <p className="text-neutral-900 font-medium">{profileData.lastName}</p>
                    )}
                  </div>
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
              </CardContent>
            </Card>
          </motion.div>

          {/* Farm Information */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-primary-600 mr-2">🌾</span>
                  Farm Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Farm Size
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.farmSize}
                      onChange={(e) => handleInputChange('farmSize', e.target.value)}
                      placeholder="Farm Size"
                    />
                  ) : (
                    <p className="text-neutral-900 font-medium">{profileData.farmSize}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Primary Crops
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.primaryCrops}
                      onChange={(e) => handleInputChange('primaryCrops', e.target.value)}
                      placeholder="Primary Crops"
                    />
                  ) : (
                    <p className="text-neutral-900 font-medium">{profileData.primaryCrops}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Years of Experience
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.yearsOfExperience}
                      onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                      placeholder="Years of Experience"
                    />
                  ) : (
                    <p className="text-neutral-900 font-medium">{profileData.yearsOfExperience}</p>
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
                    BVN
                  </label>
                  <div className="flex items-center space-x-2">
                    <FiShield className="w-4 h-4 text-neutral-500" />
                    <p className="text-neutral-900 font-medium">{profileData.bvn}</p>
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
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-3 md:mt-0 border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={() => {
                    toast.error(
                      <div>
                        <p className="font-medium mb-2">⚠️ Delete Account</p>
                        <p className="text-sm mb-3">This action cannot be undone. All your data will be permanently deleted.</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              toast.dismiss();
                              toast.success('Account deletion feature will be implemented soon.');
                            }}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                          >
                            Confirm Delete
                          </button>
                          <button
                            onClick={() => toast.dismiss()}
                            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>,
                      {
                        autoClose: false,
                        closeOnClick: false,
                        draggable: false,
                        closeButton: false
                      }
                    );
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