'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBell, 
  FiLock, 
  FiGlobe, 
  FiEye,
  FiShield,
  FiCreditCard,
  FiSmartphone,
  FiMail,
  FiToggleLeft,
  FiToggleRight,
  FiSave
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

export default function BuyerSettings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      orderUpdates: true,
      priceAlerts: true,
      supplierUpdates: true,
      marketingEmails: false,
      inventoryAlerts: true
    },
    privacy: {
      companyVisible: true,
      contactInfoVisible: true,
      purchaseDataVisible: false,
      analyticsSharing: true
    },
    security: {
      twoFactorAuth: true,
      loginAlerts: true,
      sessionTimeout: '60',
      apiAccess: false
    },
    preferences: {
      language: 'en',
      currency: 'NGN',
      timezone: 'Africa/Lagos',
      dateFormat: 'DD/MM/YYYY',
      theme: 'light',
      measurementUnit: 'metric'
    }
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleSetting = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const updateSetting = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-neutral-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

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
                Settings
              </h1>
              <p className="text-neutral-600">
                Manage your account preferences and business settings
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-4 md:mt-0">
              <FiSave className="w-4 h-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FiBell className="w-5 h-5 mr-2 text-blue-600" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">Email Notifications</h4>
                    <p className="text-sm text-neutral-600">Receive notifications via email</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.email}
                    onToggle={() => toggleSetting('notifications', 'email')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">Push Notifications</h4>
                    <p className="text-sm text-neutral-600">Receive browser push notifications</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.push}
                    onToggle={() => toggleSetting('notifications', 'push')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">SMS Notifications</h4>
                    <p className="text-sm text-neutral-600">Receive notifications via SMS</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.sms}
                    onToggle={() => toggleSetting('notifications', 'sms')}
                  />
                </div>

                <hr className="border-neutral-200" />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">Order Updates</h4>
                    <p className="text-sm text-neutral-600">Get notified about order status changes</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.orderUpdates}
                    onToggle={() => toggleSetting('notifications', 'orderUpdates')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">Price Alerts</h4>
                    <p className="text-sm text-neutral-600">Get notified about favorable price changes</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.priceAlerts}
                    onToggle={() => toggleSetting('notifications', 'priceAlerts')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">Supplier Updates</h4>
                    <p className="text-sm text-neutral-600">Receive updates from your suppliers</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.supplierUpdates}
                    onToggle={() => toggleSetting('notifications', 'supplierUpdates')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">Inventory Alerts</h4>
                    <p className="text-sm text-neutral-600">Get notified about low inventory levels</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.inventoryAlerts}
                    onToggle={() => toggleSetting('notifications', 'inventoryAlerts')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">Marketing Emails</h4>
                    <p className="text-sm text-neutral-600">Receive promotional offers and updates</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.marketingEmails}
                    onToggle={() => toggleSetting('notifications', 'marketingEmails')}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FiShield className="w-5 h-5 mr-2 text-blue-600" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-neutral-600">Add an extra layer of security</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {settings.security.twoFactorAuth && (
                      <Badge variant="success" size="sm">Enabled</Badge>
                    )}
                    <ToggleSwitch
                      enabled={settings.security.twoFactorAuth}
                      onToggle={() => toggleSetting('security', 'twoFactorAuth')}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">Login Alerts</h4>
                    <p className="text-sm text-neutral-600">Get notified of login attempts</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.security.loginAlerts}
                    onToggle={() => toggleSetting('security', 'loginAlerts')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">API Access</h4>
                    <p className="text-sm text-neutral-600">Enable API access for integrations</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.security.apiAccess}
                    onToggle={() => toggleSetting('security', 'apiAccess')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <select
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="240">4 hours</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Privacy */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FiEye className="w-5 h-5 mr-2 text-blue-600" />
                  Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">Company Visibility</h4>
                    <p className="text-sm text-neutral-600">Make your company visible to suppliers</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.privacy.companyVisible}
                    onToggle={() => toggleSetting('privacy', 'companyVisible')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">Contact Info Visibility</h4>
                    <p className="text-sm text-neutral-600">Allow suppliers to see your contact information</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.privacy.contactInfoVisible}
                    onToggle={() => toggleSetting('privacy', 'contactInfoVisible')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">Purchase Data Visibility</h4>
                    <p className="text-sm text-neutral-600">Share purchase data for market insights</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.privacy.purchaseDataVisible}
                    onToggle={() => toggleSetting('privacy', 'purchaseDataVisible')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-900">Analytics Sharing</h4>
                    <p className="text-sm text-neutral-600">Share usage data to improve services</p>
                  </div>
                  <ToggleSwitch
                    enabled={settings.privacy.analyticsSharing}
                    onToggle={() => toggleSetting('privacy', 'analyticsSharing')}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preferences */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FiGlobe className="w-5 h-5 mr-2 text-blue-600" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Language
                  </label>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => updateSetting('preferences', 'language', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="ha">Hausa</option>
                    <option value="yo">Yoruba</option>
                    <option value="ig">Igbo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={settings.preferences.currency}
                    onChange={(e) => updateSetting('preferences', 'currency', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="NGN">Nigerian Naira (₦)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Measurement Unit
                  </label>
                  <select
                    value={settings.preferences.measurementUnit}
                    onChange={(e) => updateSetting('preferences', 'measurementUnit', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="metric">Metric (kg, tonnes)</option>
                    <option value="imperial">Imperial (lbs, tons)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.preferences.timezone}
                    onChange={(e) => updateSetting('preferences', 'timezone', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Africa/Lagos">West Africa Time (WAT)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Date Format
                  </label>
                  <select
                    value={settings.preferences.dateFormat}
                    onChange={(e) => updateSetting('preferences', 'dateFormat', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Theme
                  </label>
                  <select
                    value={settings.preferences.theme}
                    onChange={(e) => updateSetting('preferences', 'theme', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Change Password */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FiLock className="w-5 h-5 mr-2 text-blue-600" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  type="password"
                  label="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
                <Input
                  type="password"
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <Input
                  type="password"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
              <div className="mt-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}