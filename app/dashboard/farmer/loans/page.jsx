'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiDollarSign, 
  FiPlus, 
  FiSearch, 
  FiFilter,
  FiEye,
  FiDownload,
  FiClock,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiFileText,
  FiPercent,
  FiCreditCard
} from 'react-icons/fi';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Badge from '../../../components/ui/Badge';
import { toast } from 'react-toastify';

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

export default function FarmerLoans() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showLoanApplication, setShowLoanApplication] = useState(false);

  // Mock data - In real app, this would come from API
  const [loans, setLoans] = useState([
    {
      id: 'LN-001',
      amount: '₦500,000',
      purpose: 'Equipment Purchase',
      status: 'active',
      applicationDate: '2024-01-15T10:30:00Z',
      approvalDate: '2024-01-18T14:20:00Z',
      disbursementDate: '2024-01-20T09:15:00Z',
      dueDate: '2025-01-20',
      interestRate: 12,
      tenure: '12 months',
      monthlyPayment: '₦44,489',
      amountPaid: '₦133,467',
      remainingBalance: '₦366,533',
      nextPaymentDate: '2024-02-20',
      loanType: 'Equipment Loan',
      collateral: 'Farm Equipment',
      guarantor: 'John Smith - Farmer',
      paymentHistory: [
        { date: '2024-01-20', amount: '₦44,489', status: 'paid' },
        { date: '2023-12-20', amount: '₦44,489', status: 'paid' },
        { date: '2023-11-20', amount: '₦44,489', status: 'paid' }
      ]
    },
    {
      id: 'LN-002',
      amount: '₦300,000',
      purpose: 'Seed and Fertilizer',
      status: 'pending',
      applicationDate: '2024-01-22T11:45:00Z',
      approvalDate: null,
      disbursementDate: null,
      dueDate: null,
      interestRate: 10,
      tenure: '6 months',
      monthlyPayment: '₦51,613',
      amountPaid: '₦0',
      remainingBalance: '₦0',
      nextPaymentDate: null,
      loanType: 'Agricultural Input Loan',
      collateral: 'Crop Insurance',
      guarantor: 'Mary Johnson - Cooperative Member',
      paymentHistory: []
    },
    {
      id: 'LN-003',
      amount: '₦750,000',
      purpose: 'Land Expansion',
      status: 'completed',
      applicationDate: '2023-06-10T08:30:00Z',
      approvalDate: '2023-06-15T16:20:00Z',
      disbursementDate: '2023-06-18T10:00:00Z',
      dueDate: '2024-06-18',
      interestRate: 15,
      tenure: '12 months',
      monthlyPayment: '₦68,232',
      amountPaid: '₦818,784',
      remainingBalance: '₦0',
      nextPaymentDate: null,
      loanType: 'Land Acquisition Loan',
      collateral: 'Land Title',
      guarantor: 'Peter Williams - Businessman',
      paymentHistory: [
        { date: '2024-06-15', amount: '₦68,232', status: 'paid' },
        { date: '2024-05-15', amount: '₦68,232', status: 'paid' },
        { date: '2024-04-15', amount: '₦68,232', status: 'paid' }
      ]
    },
    {
      id: 'LN-004',
      amount: '₦200,000',
      purpose: 'Irrigation System',
      status: 'rejected',
      applicationDate: '2024-01-10T14:15:00Z',
      approvalDate: null,
      disbursementDate: null,
      dueDate: null,
      interestRate: 11,
      tenure: '8 months',
      monthlyPayment: '₦26,134',
      amountPaid: '₦0',
      remainingBalance: '₦0',
      nextPaymentDate: null,
      loanType: 'Infrastructure Loan',
      collateral: 'Farm Equipment',
      guarantor: 'David Brown - Engineer',
      rejectionReason: 'Insufficient collateral value',
      paymentHistory: []
    }
  ]);

  const [loanApplicationData, setLoanApplicationData] = useState({
    amount: '',
    purpose: '',
    tenure: '',
    collateral: '',
    guarantor: '',
    monthlyIncome: '',
    cropType: '',
    farmSize: ''
  });

  const statuses = [
    { value: 'all', label: 'All Loans' },
    { value: 'pending', label: 'Pending' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const loanTypes = [
    'Equipment Loan',
    'Agricultural Input Loan',
    'Land Acquisition Loan',
    'Infrastructure Loan',
    'Working Capital Loan',
    'Emergency Loan'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'active':
        return 'primary';
      case 'completed':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending Approval';
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return FiClock;
      case 'active':
        return FiTrendingUp;
      case 'completed':
        return FiCheck;
      case 'rejected':
        return FiX;
      default:
        return FiDollarSign;
    }
  };

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = 
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.loanType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || loan.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleLoanApplication = (e) => {
    e.preventDefault();
    // In real app, this would submit to API
    toast.success('Loan application submitted successfully! You will receive a response within 48 hours.');
    setShowLoanApplication(false);
    setLoanApplicationData({
      amount: '',
      purpose: '',
      tenure: '',
      collateral: '',
      guarantor: '',
      monthlyIncome: '',
      cropType: '',
      farmSize: ''
    });
  };

  // Calculate stats
  const totalLoans = loans.length;
  const activeLoans = loans.filter(l => l.status === 'active').length;
  const totalBorrowed = loans
    .filter(l => l.status === 'active' || l.status === 'completed')
    .reduce((sum, loan) => {
      const amount = parseInt(loan.amount.replace(/[₦,]/g, ''));
      return sum + amount;
    }, 0);
  const totalOwed = loans
    .filter(l => l.status === 'active')
    .reduce((sum, loan) => {
      const amount = parseInt(loan.remainingBalance.replace(/[₦,]/g, ''));
      return sum + amount;
    }, 0);

  const stats = [
    { 
      label: 'Total Loans', 
      value: totalLoans, 
      icon: FiFileText, 
      color: 'text-blue-600',
      change: `${activeLoans} active`
    },
    { 
      label: 'Total Borrowed', 
      value: `₦${(totalBorrowed / 1000000).toFixed(1)}M`, 
      icon: FiTrendingUp, 
      color: 'text-green-600',
      change: 'All time'
    },
    { 
      label: 'Outstanding Balance', 
      value: `₦${(totalOwed / 1000).toFixed(0)}K`, 
      icon: FiDollarSign, 
      color: 'text-orange-600',
      change: 'Current debt'
    },
    { 
      label: 'Credit Score', 
      value: '750', 
      icon: FiTrendingUp, 
      color: 'text-purple-600',
      change: 'Excellent rating'
    }
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
                Loans & Financing
              </h1>
              <p className="text-neutral-600">
                Manage your loans and apply for new financing
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                className="btn-primary"
                onClick={() => setShowLoanApplication(true)}
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Apply for Loan
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                    <p className="text-xs text-neutral-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Credit Health */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FiTrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Credit Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiCheck className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Payment History</h3>
                  <p className="text-sm text-green-600">100% On-time</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiPercent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Credit Utilization</h3>
                  <p className="text-sm text-blue-600">35% of limit</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiTrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Credit Score</h3>
                  <p className="text-sm text-purple-600">750 - Excellent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    icon={FiSearch}
                    placeholder="Search loans by ID, purpose, or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  variant={showFilters ? "primary" : "outline"}
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:w-auto"
                >
                  <FiFilter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-neutral-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Loan Status
                      </label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        {statuses.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Loans List */}
        <motion.div variants={fadeInUp}>
          <div className="space-y-4">
            {filteredLoans.map((loan) => {
              const StatusIcon = getStatusIcon(loan.status);
              return (
                <Card key={loan.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Loan Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-neutral-900">{loan.id}</h3>
                              <Badge variant={getStatusColor(loan.status)} className="flex items-center">
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {getStatusText(loan.status)}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-neutral-600 space-x-4 mb-2">
                              <span className="flex items-center">
                                <FiDollarSign className="w-4 h-4 mr-1" />
                                {loan.amount}
                              </span>
                              <span>{loan.loanType}</span>
                              {loan.interestRate && (
                                <span className="flex items-center">
                                  <FiPercent className="w-4 h-4 mr-1" />
                                  {loan.interestRate}% APR
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-neutral-600">{loan.purpose}</p>
                          </div>
                        </div>

                        {/* Loan Details */}
                        <div className="bg-neutral-50 rounded-lg p-3">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <p className="text-neutral-500">Applied</p>
                              <p className="font-medium">{new Date(loan.applicationDate).toLocaleDateString()}</p>
                            </div>
                            {loan.tenure && (
                              <div>
                                <p className="text-neutral-500">Tenure</p>
                                <p className="font-medium">{loan.tenure}</p>
                              </div>
                            )}
                            {loan.status === 'active' && (
                              <>
                                <div>
                                  <p className="text-neutral-500">Monthly Payment</p>
                                  <p className="font-medium text-orange-600">{loan.monthlyPayment}</p>
                                </div>
                                <div>
                                  <p className="text-neutral-500">Balance</p>
                                  <p className="font-medium text-red-600">{loan.remainingBalance}</p>
                                </div>
                              </>
                            )}
                            {loan.status === 'rejected' && loan.rejectionReason && (
                              <div className="col-span-2">
                                <p className="text-neutral-500">Reason</p>
                                <p className="font-medium text-red-600">{loan.rejectionReason}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Next Payment */}
                        {loan.status === 'active' && loan.nextPaymentDate && (
                          <div className="mt-3 flex items-center text-sm">
                            <FiCalendar className="w-4 h-4 mr-2 text-orange-500" />
                            <span className="text-neutral-600">Next payment due: </span>
                            <span className="font-medium text-orange-600 ml-1">
                              {new Date(loan.nextPaymentDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2 min-w-0 lg:min-w-[200px]">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => setSelectedLoan(loan)}
                        >
                          <FiEye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        
                        {loan.status === 'active' && (
                          <Button
                            size="sm"
                            className="w-full btn-primary"
                            onClick={() => toast.success('Payment feature will be implemented soon')}
                          >
                            <FiCreditCard className="w-4 h-4 mr-2" />
                            Make Payment
                          </Button>
                        )}

                        <Button size="sm" variant="outline" className="w-full">
                          <FiDownload className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredLoans.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <FiDollarSign className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No loans found</h3>
                <p className="text-neutral-600 mb-4">
                  {searchTerm || selectedStatus !== 'all'
                    ? "Try adjusting your search or filters"
                    : "Apply for your first loan to get started with financing your farming operations"}
                </p>
                <Button 
                  className="btn-primary"
                  onClick={() => setShowLoanApplication(true)}
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Apply for Your First Loan
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Loan Application Modal */}
        {showLoanApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowLoanApplication(false)}
          >
            <div 
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-neutral-900">Apply for Loan</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowLoanApplication(false)}
                  >
                    <FiX className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <form onSubmit={handleLoanApplication} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Loan Amount *
                    </label>
                    <Input
                      type="text"
                      placeholder="₦500,000"
                      value={loanApplicationData.amount}
                      onChange={(e) => setLoanApplicationData({...loanApplicationData, amount: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Tenure *
                    </label>
                    <select
                      value={loanApplicationData.tenure}
                      onChange={(e) => setLoanApplicationData({...loanApplicationData, tenure: e.target.value})}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    >
                      <option value="">Select tenure</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                      <option value="18">18 months</option>
                      <option value="24">24 months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Purpose of Loan *
                  </label>
                  <Input
                    type="text"
                    placeholder="Equipment purchase, seeds and fertilizer, etc."
                    value={loanApplicationData.purpose}
                    onChange={(e) => setLoanApplicationData({...loanApplicationData, purpose: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Monthly Income *
                    </label>
                    <Input
                      type="text"
                      placeholder="₦150,000"
                      value={loanApplicationData.monthlyIncome}
                      onChange={(e) => setLoanApplicationData({...loanApplicationData, monthlyIncome: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Farm Size *
                    </label>
                    <Input
                      type="text"
                      placeholder="5.2 hectares"
                      value={loanApplicationData.farmSize}
                      onChange={(e) => setLoanApplicationData({...loanApplicationData, farmSize: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Primary Crops *
                  </label>
                  <Input
                    type="text"
                    placeholder="Rice, Cassava, Tomatoes"
                    value={loanApplicationData.cropType}
                    onChange={(e) => setLoanApplicationData({...loanApplicationData, cropType: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Collateral *
                  </label>
                  <Input
                    type="text"
                    placeholder="Farm equipment, land title, etc."
                    value={loanApplicationData.collateral}
                    onChange={(e) => setLoanApplicationData({...loanApplicationData, collateral: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Guarantor Information *
                  </label>
                  <Input
                    type="text"
                    placeholder="Name, relationship, and contact details"
                    value={loanApplicationData.guarantor}
                    onChange={(e) => setLoanApplicationData({...loanApplicationData, guarantor: e.target.value})}
                    required
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <FiAlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">Application Requirements:</p>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Valid BVN and government ID</li>
                        <li>• Bank statements for last 6 months</li>
                        <li>• Proof of farm ownership or lease agreement</li>
                        <li>• Guarantor identification documents</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowLoanApplication(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 btn-primary">
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}