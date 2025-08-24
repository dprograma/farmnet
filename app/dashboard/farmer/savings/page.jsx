'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiPieChart, 
  FiPlus, 
  FiArrowUpRight,
  FiArrowDownLeft,
  FiEye,
  FiDownload,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiDollarSign,
  FiTarget,
  FiClock,
  FiGift,
  FiPercent,
  FiBarChart,
  FiInfo
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

export default function FarmerSavings() {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showSavingsGoalModal, setShowSavingsGoalModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [savingsGoal, setSavingsGoal] = useState({
    title: '',
    targetAmount: '',
    targetDate: '',
    monthlyContribution: ''
  });

  // Mock data - In real app, this would come from API
  const [accountData, setAccountData] = useState({
    balance: 450000,
    interestRate: 8.5,
    monthlyInterest: 3187,
    totalInterestEarned: 38250,
    accountOpenDate: '2023-03-15',
    lastTransactionDate: '2024-01-18'
  });

  const [savingsGoals] = useState([
    {
      id: 'goal-1',
      title: 'New Tractor Purchase',
      targetAmount: 2500000,
      currentAmount: 450000,
      targetDate: '2024-12-31',
      monthlyContribution: 150000,
      progress: 18,
      status: 'active'
    },
    {
      id: 'goal-2',
      title: 'Farm Expansion',
      targetAmount: 5000000,
      currentAmount: 750000,
      targetDate: '2025-06-30',
      monthlyContribution: 200000,
      progress: 15,
      status: 'active'
    },
    {
      id: 'goal-3',
      title: 'Emergency Fund',
      targetAmount: 1000000,
      currentAmount: 1000000,
      targetDate: '2024-01-01',
      monthlyContribution: 0,
      progress: 100,
      status: 'completed'
    }
  ]);

  const [transactions] = useState([
    {
      id: 'txn-001',
      type: 'deposit',
      amount: 50000,
      date: '2024-01-18T10:30:00Z',
      description: 'Monthly savings deposit',
      balance: 450000
    },
    {
      id: 'txn-002',
      type: 'interest',
      amount: 3187,
      date: '2024-01-15T00:00:00Z',
      description: 'Monthly interest earned',
      balance: 400000
    },
    {
      id: 'txn-003',
      type: 'deposit',
      amount: 75000,
      date: '2024-01-10T14:20:00Z',
      description: 'Harvest income deposit',
      balance: 396813
    },
    {
      id: 'txn-004',
      type: 'withdraw',
      amount: 25000,
      date: '2024-01-05T09:15:00Z',
      description: 'Equipment maintenance',
      balance: 321813
    },
    {
      id: 'txn-005',
      type: 'deposit',
      amount: 100000,
      date: '2023-12-28T16:45:00Z',
      description: 'Year-end bonus deposit',
      balance: 346813
    }
  ]);

  const [savingsPlans] = useState([
    {
      id: 'plan-1',
      name: 'Basic Savings',
      interestRate: 6.0,
      minDeposit: 10000,
      features: ['No monthly fees', 'Mobile banking', 'ATM access'],
      description: 'Perfect for daily savings with easy access to funds'
    },
    {
      id: 'plan-2',
      name: 'Premium Savings',
      interestRate: 8.5,
      minDeposit: 100000,
      features: ['Higher interest rate', 'Priority support', 'Investment advice', 'Quarterly bonuses'],
      description: 'Higher returns for larger deposits with premium benefits',
      current: true
    },
    {
      id: 'plan-3',
      name: 'Fixed Deposit',
      interestRate: 12.0,
      minDeposit: 500000,
      features: ['Highest interest rate', 'Fixed term (6-24 months)', 'Guaranteed returns', 'Certificate provided'],
      description: 'Lock in your funds for guaranteed higher returns'
    }
  ]);

  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = parseInt(depositAmount);
    if (amount > 0) {
      setAccountData(prev => ({
        ...prev,
        balance: prev.balance + amount
      }));
      toast.success(`₦${amount.toLocaleString()} deposited successfully!`);
      setDepositAmount('');
      setShowDepositModal(false);
    }
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = parseInt(withdrawAmount);
    if (amount > 0 && amount <= accountData.balance) {
      setAccountData(prev => ({
        ...prev,
        balance: prev.balance - amount
      }));
      toast.success(`₦${amount.toLocaleString()} withdrawn successfully!`);
      setWithdrawAmount('');
      setShowWithdrawModal(false);
    } else {
      toast.error('Invalid withdrawal amount');
    }
  };

  const handleCreateSavingsGoal = (e) => {
    e.preventDefault();
    toast.success('Savings goal created successfully!');
    setSavingsGoal({
      title: '',
      targetAmount: '',
      targetDate: '',
      monthlyContribution: ''
    });
    setShowSavingsGoalModal(false);
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return FiArrowDownLeft;
      case 'withdraw':
        return FiArrowUpRight;
      case 'interest':
        return FiGift;
      default:
        return FiDollarSign;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600';
      case 'withdraw':
        return 'text-red-600';
      case 'interest':
        return 'text-blue-600';
      default:
        return 'text-neutral-600';
    }
  };

  const stats = [
    { 
      label: 'Current Balance', 
      value: `₦${accountData.balance.toLocaleString()}`, 
      icon: FiPieChart, 
      color: 'text-blue-600',
      change: 'Available for withdrawal'
    },
    { 
      label: 'Monthly Interest', 
      value: `₦${accountData.monthlyInterest.toLocaleString()}`, 
      icon: FiPercent, 
      color: 'text-green-600',
      change: `${accountData.interestRate}% APR`
    },
    { 
      label: 'Total Interest Earned', 
      value: `₦${accountData.totalInterestEarned.toLocaleString()}`, 
      icon: FiTrendingUp, 
      color: 'text-purple-600',
      change: 'All time earnings'
    },
    { 
      label: 'Active Goals', 
      value: savingsGoals.filter(g => g.status === 'active').length, 
      icon: FiTarget, 
      color: 'text-orange-600',
      change: 'In progress'
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
                Savings Account
              </h1>
              <p className="text-neutral-600">
                Manage your savings and achieve your financial goals
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button 
                variant="outline"
                onClick={() => setShowWithdrawModal(true)}
              >
                <FiArrowUpRight className="w-4 h-4 mr-2" />
                Withdraw
              </Button>
              <Button 
                className="btn-primary"
                onClick={() => setShowDepositModal(true)}
              >
                <FiArrowDownLeft className="w-4 h-4 mr-2" />
                Deposit
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

        {/* Account Overview */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <FiPieChart className="w-5 h-5 mr-2 text-blue-600" />
                  Account Overview
                </span>
                <Badge variant="success">Premium Savings</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiDollarSign className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 mb-2">
                    ₦{accountData.balance.toLocaleString()}
                  </h3>
                  <p className="text-neutral-600">Current Balance</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiPercent className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 mb-2">
                    {accountData.interestRate}%
                  </h3>
                  <p className="text-neutral-600">Annual Interest Rate</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCalendar className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {new Date(accountData.accountOpenDate).toLocaleDateString()}
                  </h3>
                  <p className="text-neutral-600">Account Since</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Savings Goals */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <FiTarget className="w-5 h-5 mr-2 text-orange-600" />
                    Savings Goals
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowSavingsGoalModal(true)}
                  >
                    <FiPlus className="w-4 h-4 mr-1" />
                    New Goal
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savingsGoals.map((goal) => (
                    <div key={goal.id} className="p-4 bg-neutral-50 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-neutral-900">{goal.title}</h4>
                          <p className="text-sm text-neutral-600">
                            Target: ₦{goal.targetAmount.toLocaleString()} by {new Date(goal.targetDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={goal.status === 'completed' ? 'success' : 'primary'} size="sm">
                          {goal.status === 'completed' ? 'Completed' : 'Active'}
                        </Badge>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Saved: ₦{goal.currentAmount.toLocaleString()}</span>
                        {goal.monthlyContribution > 0 && (
                          <span className="text-neutral-600">Monthly: ₦{goal.monthlyContribution.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <FiBarChart className="w-5 h-5 mr-2 text-blue-600" />
                    Recent Transactions
                  </span>
                  <Button size="sm" variant="outline">
                    <FiEye className="w-4 h-4 mr-1" />
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((transaction) => {
                    const TransactionIcon = getTransactionIcon(transaction.type);
                    return (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${getTransactionColor(transaction.type)}`}>
                            <TransactionIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900 capitalize">{transaction.type}</p>
                            <p className="text-sm text-neutral-600">{transaction.description}</p>
                            <p className="text-xs text-neutral-500">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                            {transaction.type === 'withdraw' ? '-' : '+'}₦{transaction.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-neutral-500">
                            Balance: ₦{transaction.balance.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Savings Plans */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FiGift className="w-5 h-5 mr-2 text-purple-600" />
                Available Savings Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {savingsPlans.map((plan) => (
                  <div key={plan.id} className={`p-4 rounded-lg border-2 ${plan.current ? 'border-blue-500 bg-blue-50' : 'border-neutral-200 bg-white'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-neutral-900">{plan.name}</h3>
                      {plan.current && <Badge variant="primary" size="sm">Current</Badge>}
                    </div>
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {plan.interestRate}% APR
                      </div>
                      <div className="text-sm text-neutral-600">
                        Min. Deposit: ₦{plan.minDeposit.toLocaleString()}
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 mb-4">{plan.description}</p>
                    <ul className="space-y-1 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm text-neutral-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {!plan.current && (
                      <Button variant="outline" size="sm" className="w-full">
                        Switch to This Plan
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Deposit Modal */}
        {showDepositModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowDepositModal(false)}
          >
            <div 
              className="bg-white rounded-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-xl font-bold text-neutral-900">Make Deposit</h2>
              </div>
              
              <form onSubmit={handleDeposit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Amount to Deposit *
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <FiInfo className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">Deposit Information:</p>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Minimum deposit: ₦10,000</li>
                        <li>• Interest earned monthly</li>
                        <li>• No deposit fees</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowDepositModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 btn-primary">
                    Deposit
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowWithdrawModal(false)}
          >
            <div 
              className="bg-white rounded-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-xl font-bold text-neutral-900">Make Withdrawal</h2>
              </div>
              
              <form onSubmit={handleWithdraw} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Amount to Withdraw *
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    max={accountData.balance}
                    required
                  />
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <FiInfo className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-900 mb-1">Available Balance:</p>
                      <p className="text-green-700 text-lg font-semibold">₦{accountData.balance.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowWithdrawModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 btn-primary">
                    Withdraw
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Savings Goal Modal */}
        {showSavingsGoalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowSavingsGoalModal(false)}
          >
            <div 
              className="bg-white rounded-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-xl font-bold text-neutral-900">Create Savings Goal</h2>
              </div>
              
              <form onSubmit={handleCreateSavingsGoal} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Goal Title *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., New Equipment"
                    value={savingsGoal.title}
                    onChange={(e) => setSavingsGoal({...savingsGoal, title: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Target Amount *
                  </label>
                  <Input
                    type="number"
                    placeholder="₦1,000,000"
                    value={savingsGoal.targetAmount}
                    onChange={(e) => setSavingsGoal({...savingsGoal, targetAmount: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Target Date *
                  </label>
                  <Input
                    type="date"
                    value={savingsGoal.targetDate}
                    onChange={(e) => setSavingsGoal({...savingsGoal, targetDate: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Monthly Contribution *
                  </label>
                  <Input
                    type="number"
                    placeholder="₦50,000"
                    value={savingsGoal.monthlyContribution}
                    onChange={(e) => setSavingsGoal({...savingsGoal, monthlyContribution: e.target.value})}
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowSavingsGoalModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 btn-primary">
                    Create Goal
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