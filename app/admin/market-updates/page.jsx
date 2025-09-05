'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiCheck,
  FiX,
  FiEye,
  FiEdit3,
  FiTrash2,
  FiFilter,
  FiSearch,
  FiDownload,
  FiPlay,
  FiImage,
  FiVideo,
  FiClock,
  FiMapPin,
  FiUser,
  FiPhone,
  FiDollarSign,
  FiTrendingUp,
  FiAlertCircle
} from 'react-icons/fi';
// import Header from '../../components/layout/Header'; // Removed for admin page
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function AdminMarketUpdates() {
  const router = useRouter();
  const [updates, setUpdates] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedUpdates, setSelectedUpdates] = useState([]);
  const [selectedSubmissions, setSelectedSubmissions] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewingUpdate, setViewingUpdate] = useState(null);
  const [activeTab, setActiveTab] = useState('submissions'); // Start with submissions tab
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    submissions: 0
  });

  // Fetch real data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get auth token from localStorage
        const token = localStorage.getItem('admin_token');
        
        if (!token) {
          // Redirect to login if no token
          window.location.href = '/admin/login';
          return;
        }
        
        // First verify the token is valid
        const verifyResponse = await fetch('/api/auth/admin/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!verifyResponse.ok) {
          // Token expired or invalid, redirect to login
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_user');
          window.location.href = '/admin/login';
          return;
        }
        
        const response = await fetch('/api/admin/market-updates', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            // Token expired or invalid, redirect to login
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_user');
            window.location.href = '/admin/login';
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          setUpdates(result.data.updates || []);
          setSubmissions(result.data.submissions || []);
          setStats(result.stats);
        } else {
          toast.error(result.error || 'Failed to fetch data');
        }
        
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast.error('Failed to load admin data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredUpdates = updates.filter(update => {
    const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || update.status === filterStatus;
    const matchesType = filterType === 'all' || update.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSelectSubmission = (submissionId) => {
    setSelectedSubmissions(prev => 
      prev.includes(submissionId)
        ? prev.filter(id => id !== submissionId)
        : [...prev, submissionId]
    );
  };

  const handleSelectAllSubmissions = () => {
    if (selectedSubmissions.length === submissions.length) {
      setSelectedSubmissions([]);
    } else {
      setSelectedSubmissions(submissions.map(s => s.id));
    }
  };

  const handleSelectUpdate = (updateId) => {
    setSelectedUpdates(prev => 
      prev.includes(updateId)
        ? prev.filter(id => id !== updateId)
        : [...prev, updateId]
    );
  };

  const handleSelectAll = () => {
    if (activeTab === 'submissions') {
      handleSelectAllSubmissions();
    } else {
      if (selectedUpdates.length === filteredUpdates.length) {
        setSelectedUpdates([]);
      } else {
        setSelectedUpdates(filteredUpdates.map(u => u.id));
      }
    }
  };

  const handleApprove = async (updateIds) => {
    try {
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch('/api/admin/market-updates', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          updateIds,
          action: 'approve'
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success(result.message);
        // Refresh data
        window.location.reload();
      } else {
        toast.error(result.error || 'Failed to approve updates');
      }
    } catch (error) {
      console.error('Error approving updates:', error);
      toast.error('Failed to approve updates');
    }
  };

  const handleReject = async (updateIds, reason = '') => {
    try {
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch('/api/admin/market-updates', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          updateIds,
          action: 'reject',
          reason
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success(result.message);
        // Refresh data
        window.location.reload();
      } else {
        toast.error(result.error || 'Failed to reject updates');
      }
    } catch (error) {
      console.error('Error rejecting updates:', error);
      toast.error('Failed to reject updates');
    }
  };

  const handleApproveSubmissions = async (submissionIds) => {
    try {
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch('/api/admin/market-updates', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissionIds,
          action: 'approve'
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success(result.message);
        // Refresh data
        window.location.reload();
      } else {
        toast.error(result.error || 'Failed to approve submissions');
      }
    } catch (error) {
      console.error('Error approving submissions:', error);
      toast.error('Failed to approve submissions');
    }
  };

  const handleRejectSubmissions = async (submissionIds) => {
    try {
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch('/api/admin/market-updates', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissionIds,
          action: 'reject'
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success(result.message);
        // Refresh data
        window.location.reload();
      } else {
        toast.error(result.error || 'Failed to reject submissions');
      }
    } catch (error) {
      console.error('Error rejecting submissions:', error);
      toast.error('Failed to reject submissions');
    }
  };

  const handleDelete = async (updateIds) => {
    if (!confirm(`Are you sure you want to delete ${updateIds.length} update(s)? This action cannot be undone.`)) {
      return;
    }
    
    try {
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch('/api/admin/market-updates', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updateIds }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success(result.message);
        // Refresh data
        window.location.reload();
      } else {
        toast.error(result.error || 'Failed to delete updates');
      }
    } catch (error) {
      console.error('Error deleting updates:', error);
      toast.error('Failed to delete updates');
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      PENDING: { variant: 'warning', text: 'Pending' },
      APPROVED: { variant: 'success', text: 'Approved' },
      REJECTED: { variant: 'error', text: 'Rejected' }
    };
    
    const config = variants[status] || variants.PENDING;
    return (
      <Badge variant={config.variant} size="sm">
        {config.text}
      </Badge>
    );
  };

  const handleAdminLogout = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      
      if (token) {
        // Call logout API to clear server-side session
        await fetch('/api/auth/admin/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear local storage and redirect
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      toast.success('Logged out successfully');
      router.push('/admin/login');
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const tabsData = [
    {
      key: 'submissions',
      label: 'New Submissions',
      count: stats.submissions,
      icon: FiAlertCircle
    },
    {
      key: 'updates',
      label: 'Market Updates',
      count: stats.total,
      icon: FiTrendingUp
    }
  ];

  const currentData = activeTab === 'submissions' ? submissions : filteredUpdates;
  const selectedItems = activeTab === 'submissions' ? selectedSubmissions : selectedUpdates;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Admin Navigation */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="/farmnetlogo.png" 
                alt="FarmNet Technologies" 
                className="h-8 w-auto"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <Button size="sm" variant="outline">
                <FiDownload className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button size="sm" variant="outline" onClick={handleAdminLogout}>
                <FiUser className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Header */}
      <section className="bg-white border-b border-neutral-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-neutral-900">Market Updates Admin</h1>
            <p className="text-neutral-600 mt-2">Review and manage submitted market updates</p>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <motion.div {...fadeInUp} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500">Total Updates</p>
                  <p className="text-2xl font-bold text-neutral-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FiTrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>
            
            <motion.div {...fadeInUp} style={{ transitionDelay: '0.1s' }} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500">New Submissions</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.submissions}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <FiAlertCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </motion.div>
            
            <motion.div {...fadeInUp} style={{ transitionDelay: '0.2s' }} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <FiClock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </motion.div>
            
            <motion.div {...fadeInUp} style={{ transitionDelay: '0.3s' }} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500">Approved</p>
                  <p className="text-2xl font-bold text-success">{stats.approved}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FiCheck className="w-6 h-6 text-success" />
                </div>
              </div>
            </motion.div>
            
            <motion.div {...fadeInUp} style={{ transitionDelay: '0.4s' }} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500">Rejected</p>
                  <p className="text-2xl font-bold text-error">{stats.rejected}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <FiX className="w-6 h-6 text-error" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Tabs */}
                <div className="flex space-x-1 bg-neutral-100 p-1 rounded-lg">
                  {tabsData.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        activeTab === tab.key
                          ? 'bg-white text-primary-700 shadow-sm'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                      {tab.count > 0 && (
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          activeTab === tab.key ? 'bg-primary-100 text-primary-700' : 'bg-neutral-300 text-neutral-700'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Bulk Actions */}
                {activeTab === 'submissions' && selectedSubmissions.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-neutral-600">
                      {selectedSubmissions.length} selected
                    </span>
                    <Button size="sm" onClick={() => handleApproveSubmissions(selectedSubmissions)}>
                      <FiCheck className="w-4 h-4 mr-1" />
                      Approve & Publish
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleRejectSubmissions(selectedSubmissions)}>
                      <FiX className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
                
                {activeTab === 'updates' && selectedUpdates.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-neutral-600">
                      {selectedUpdates.length} selected
                    </span>
                    <Button size="sm" onClick={() => handleApprove(selectedUpdates)}>
                      <FiCheck className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleReject(selectedUpdates)}>
                      <FiX className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(selectedUpdates)}>
                      <FiTrash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Table */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="spinner mx-auto mb-4"></div>
                  <p className="text-neutral-600">Loading updates...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-50 border-b border-neutral-200">
                      <tr>
                        <th className="px-6 py-4 text-left">
                          <input
                            type="checkbox"
                            checked={
                              activeTab === 'submissions'
                                ? selectedSubmissions.length === submissions.length && submissions.length > 0
                                : selectedUpdates.length === filteredUpdates.length && filteredUpdates.length > 0
                            }
                            onChange={handleSelectAll}
                            className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                          />
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                          {activeTab === 'submissions' ? 'Submission' : 'Update'}
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Submitted By</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {activeTab === 'submissions' ? (
                        submissions.map((submission) => (
                          <tr key={submission.id} className="hover:bg-neutral-50">
                            <td className="px-6 py-4">
                              <input
                                type="checkbox"
                                checked={selectedSubmissions.includes(submission.id)}
                                onChange={() => handleSelectSubmission(submission.id)}
                                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                              />
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                {submission.mediaFiles && submission.mediaFiles.length > 0 && (
                                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-200 flex-shrink-0">
                                    <img 
                                      src={submission.mediaFiles[0]} 
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-neutral-900 truncate">
                                    {submission.commodity} - {submission.location}
                                  </p>
                                  <p className="text-sm text-neutral-500">
                                    {submission.description.length > 60 ? submission.description.substring(0, 60) + '...' : submission.description}
                                  </p>
                                  {submission.price && (
                                    <p className="text-sm text-primary-600">
                                      ₦{submission.price.toLocaleString()} {submission.unit}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                {submission.mediaFiles?.some(url => url.includes('/videos/')) ? (
                                  <FiVideo className="w-4 h-4 text-blue-500" />
                                ) : (
                                  <FiImage className="w-4 h-4 text-green-500" />
                                )}
                                <span className="text-sm text-neutral-600">
                                  {submission.mediaFiles?.some(url => url.includes('/videos/')) ? 'Video' : 'Text & Images'}
                                </span>
                              </div>
                            </td>
                            
                            <td className="px-6 py-4">
                              <Badge variant="warning" size="sm">
                                Pending Review
                              </Badge>
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="text-sm text-neutral-600">
                                <div className="flex items-center space-x-2">
                                  <FiUser className="w-4 h-4" />
                                  <span>{submission.submitterName}</span>
                                </div>
                                <div className="flex items-center space-x-2 mt-1 text-xs">
                                  <FiPhone className="w-3 h-3" />
                                  <span>{submission.submitterPhone}</span>
                                </div>
                              </div>
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="text-sm text-neutral-600">
                                {formatDateTime(submission.createdAt)}
                              </div>
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleApproveSubmissions([submission.id])}
                                  className="p-2 text-neutral-400 hover:text-success transition-colors"
                                  title="Approve & Publish"
                                >
                                  <FiCheck className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleRejectSubmissions([submission.id])}
                                  className="p-2 text-neutral-400 hover:text-error transition-colors"
                                  title="Reject"
                                >
                                  <FiX className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        filteredUpdates.map((update) => (
                          <tr key={update.id} className="hover:bg-neutral-50">
                            <td className="px-6 py-4">
                              <input
                                type="checkbox"
                                checked={selectedUpdates.includes(update.id)}
                                onChange={() => handleSelectUpdate(update.id)}
                                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                              />
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                {update.type === 'VIDEO' && update.videoThumbnail && (
                                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-200 flex-shrink-0">
                                    <img 
                                      src={update.videoThumbnail} 
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                {update.type === 'TEXT_WITH_IMAGES' && update.images?.[0] && (
                                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-200 flex-shrink-0">
                                    <img 
                                      src={update.images[0]} 
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-neutral-900 truncate">
                                    {update.title}
                                  </p>
                                  <p className="text-sm text-neutral-500">
                                    {update.commodity} • {update.location}
                                  </p>
                                  {update.price && (
                                    <p className="text-sm text-primary-600">
                                      ₦{update.price.toLocaleString()} {update.unit}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                {update.type === 'VIDEO' ? (
                                  <FiVideo className="w-4 h-4 text-blue-500" />
                                ) : (
                                  <FiImage className="w-4 h-4 text-green-500" />
                                )}
                                <span className="text-sm text-neutral-600">
                                  {update.type === 'VIDEO' ? 'Video' : 'Text & Images'}
                                </span>
                              </div>
                            </td>
                            
                            <td className="px-6 py-4">
                              {getStatusBadge(update.status)}
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="text-sm text-neutral-600">
                                <div className="flex items-center space-x-2">
                                  <FiUser className="w-4 h-4" />
                                  <span>{update.submittedBy}</span>
                                </div>
                                {update.submitterContact && (
                                  <div className="flex items-center space-x-2 mt-1 text-xs">
                                    <FiPhone className="w-3 h-3" />
                                    <span>{update.submitterContact}</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="text-sm text-neutral-600">
                                {formatDateTime(update.createdAt)}
                              </div>
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => setViewingUpdate(update)}
                                  className="p-2 text-neutral-400 hover:text-primary-600 transition-colors"
                                  title="View Details"
                                >
                                  <FiEye className="w-4 h-4" />
                                </button>
                                
                                {update.status === 'PENDING' && (
                                  <>
                                    <button
                                      onClick={() => handleApprove([update.id])}
                                      className="p-2 text-neutral-400 hover:text-success transition-colors"
                                      title="Approve"
                                    >
                                      <FiCheck className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleReject([update.id])}
                                      className="p-2 text-neutral-400 hover:text-error transition-colors"
                                      title="Reject"
                                    >
                                      <FiX className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                                
                                <button
                                  onClick={() => handleDelete([update.id])}
                                  className="p-2 text-neutral-400 hover:text-error transition-colors"
                                  title="Delete"
                                >
                                  <FiTrash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  
                  {currentData.length === 0 && !loading && (
                    <div className="text-center py-12">
                      <FiAlertCircle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-neutral-900 mb-2">
                        {activeTab === 'submissions' ? 'No submissions found' : 'No updates found'}
                      </h3>
                      <p className="text-neutral-600">
                        {activeTab === 'submissions' ? 'New submissions will appear here' : 'Try adjusting your search or filters'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
}