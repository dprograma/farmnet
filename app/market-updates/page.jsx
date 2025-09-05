'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FiPlay,
  FiClock,
  FiMapPin,
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
  FiFilter,
  FiSearch,
  FiCalendar,
  FiImage,
  FiVideo,
  FiEye,
  FiShare2,
  FiArrowRight
} from 'react-icons/fi';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function MarketUpdates() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('all');
  const [marketUpdates, setMarketUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });
  const [availableCommodities, setAvailableCommodities] = useState([]);
  const [error, setError] = useState(null);

  // Fetch market updates from API
  const fetchMarketUpdates = async (page = 1, resetData = true) => {
    try {
      if (resetData) {
        setLoading(true);
      } else {
        // Show loading for load more without hiding existing content
        setLoading(false);
      }
      setError(null);
      
      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });
      
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCommodity !== 'all') params.append('commodity', selectedCommodity);
      if (activeTab !== 'all') {
        params.append('type', activeTab === 'videos' ? 'VIDEO' : 'TEXT_WITH_IMAGES');
      }
      
      const response = await fetch(`/api/market-updates/public?${params}`);
      const result = await response.json();
      
      if (result.success) {
        if (resetData || page === 1) {
          setMarketUpdates(result.data.updates);
        } else {
          setMarketUpdates(prev => [...prev, ...result.data.updates]);
        }
        setPagination(result.data.pagination);
        setAvailableCommodities(result.data.filters.commodities);
      } else {
        setError(result.error || 'Failed to fetch market updates');
        console.error('API error:', result.error);
      }
    } catch (error) {
      console.error('Error fetching market updates:', error);
      setError('Failed to load market updates. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Initial load
  useEffect(() => {
    fetchMarketUpdates(1, true);
  }, []);
  
  // Refetch when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchMarketUpdates(1, true);
    }, 300); // Debounce search
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCommodity, activeTab]);

  // Handle view count increment
  const handleViewIncrement = async (updateId) => {
    try {
      await fetch('/api/market-updates/public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updateId })
      });
      
      // Update local state to reflect the incremented view count
      setMarketUpdates(prev => prev.map(update => 
        update.id === updateId 
          ? { ...update, viewCount: update.viewCount + 1 }
          : update
      ));
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };
  
  // Load more updates (pagination)
  const loadMoreUpdates = () => {
    if (pagination.hasNextPage && !loading) {
      fetchMarketUpdates(pagination.currentPage + 1, false);
    }
  };
  
  // All filtering is now handled by the API, so we use marketUpdates directly
  const filteredUpdates = marketUpdates;

  const getPriceIcon = (price) => {
    // Mock price trend - in real app, compare with historical data
    const trend = Math.random();
    if (trend > 0.6) return <FiTrendingUp className="w-4 h-4 text-green-500" />;
    if (trend < 0.4) return <FiTrendingDown className="w-4 h-4 text-red-500" />;
    return <FiMinus className="w-4 h-4 text-neutral-500" />;
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-emerald-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge variant="primary" size="lg" className="shadow-lg">
                🌾 Real-Time Market Updates
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 leading-tight mb-6 font-display"
            >
              Live Market{' '}
              <span className="text-gradient">Updates</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-neutral-600 mb-8 leading-relaxed"
            >
              Get real-time commodity prices and market insights from eyewitnesses across Nigeria. 
              Stay informed with video reports and detailed price updates.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                size="xl" 
                className="btn-primary"
                onClick={() => window.location.href = '/market-updates/submit'}
              >
                Submit Market Update
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="xl" 
                className="btn-outline text-gray-200"
                onClick={() => document.getElementById('updates-section').scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Updates
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search commodities, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
            
            {/* Tabs */}
            <div className="flex bg-neutral-100 rounded-xl p-1">
              {[
                { key: 'all', label: 'All Updates', icon: FiFilter },
                { key: 'videos', label: 'Videos', icon: FiVideo },
                { key: 'texts', label: 'Text & Images', icon: FiImage }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-white text-primary-600 shadow-md'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            
            {/* Commodity Filter */}
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="input min-w-[180px]"
              disabled={loading}
            >
              <option value="all">All Commodities</option>
              {availableCommodities.map(commodity => (
                <option key={commodity} value={commodity}>{commodity}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Updates Section */}
      <section id="updates-section" className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-center">
              <div className="text-red-600 font-medium mb-2">⚠️ Error Loading Updates</div>
              <p className="text-red-500 text-sm mb-4">{error}</p>
              <Button 
                size="sm" 
                onClick={() => fetchMarketUpdates(1, true)}
                className="btn-primary"
              >
                Try Again
              </Button>
            </div>
          )}
          
          {loading && marketUpdates.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-0">
                    <div className="w-full h-48 bg-neutral-200 rounded-t-xl"></div>
                    <div className="p-6">
                      <div className="h-4 bg-neutral-200 rounded mb-4"></div>
                      <div className="h-3 bg-neutral-200 rounded mb-2"></div>
                      <div className="h-3 bg-neutral-200 rounded mb-4 w-3/4"></div>
                      <div className="flex justify-between">
                        <div className="h-3 bg-neutral-200 rounded w-1/3"></div>
                        <div className="h-3 bg-neutral-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              animate="animate"
              variants={staggerChildren}
            >
              {filteredUpdates.map((update) => (
                <motion.div key={update.id} variants={fadeInUp}>
                  <Card className="group overflow-hidden card-hover interactive-glow">
                    <CardContent className="p-0">
                      {/* Media Section */}
                      <div className="relative cursor-pointer" onClick={() => router.push(`/market-updates/${update.id}`)}>
                        {update.type === 'VIDEO' ? (
                          <div className="relative w-full h-48 bg-neutral-900 rounded-t-xl overflow-hidden">
                            <img
                              src={update.videoThumbnail || '/api/placeholder/400/225'}
                              alt={update.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Prevent infinite error loops
                                if (!e.target.src.includes('/api/placeholder/')) {
                                  e.target.src = '/api/placeholder/400/225';
                                }
                              }}
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FiPlay className="w-6 h-6 text-primary-600 ml-1" />
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                              <FiClock className="w-3 h-3 inline mr-1" />
                              {Math.floor(update.videoDuration / 60)}:{(update.videoDuration % 60).toString().padStart(2, '0')}
                            </div>
                          </div>
                        ) : (
                          <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
                            <img
                              src={update.images?.[0] || '/api/placeholder/400/225'}
                              alt={update.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                // Prevent infinite error loops
                                if (!e.target.src.includes('/api/placeholder/')) {
                                  e.target.src = '/api/placeholder/400/225';
                                }
                              }}
                            />
                            {update.images && update.images.length > 1 && (
                              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                                +{update.images.length - 1} more
                              </div>
                            )}
                          </div>
                        )}
                        
                        <Badge 
                          variant="primary" 
                          className="absolute top-4 left-4 bg-white/90 text-primary-700"
                        >
                          {update.commodity}
                        </Badge>
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
                          {update.title}
                        </h3>
                        
                        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                          {update.description}
                        </p>
                        
                        {/* Price Info */}
                        <div className="flex items-center justify-between mb-4 p-3 bg-neutral-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            {getPriceIcon(update.price)}
                            <span className="font-bold text-lg text-neutral-900">
                              ₦{update.price?.toLocaleString()}
                            </span>
                            <span className="text-sm text-neutral-500">
                              {update.unit}
                            </span>
                          </div>
                        </div>
                        
                        {/* Meta Info */}
                        <div className="space-y-2 text-sm text-neutral-500">
                          <div className="flex items-center space-x-2">
                            <FiMapPin className="w-4 h-4" />
                            <span>{update.location}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <FiEye className="w-4 h-4" />
                                <span>{update.viewCount}</span>
                              </div>
                              <span>By {update.submittedBy}</span>
                            </div>
                            <span>{formatTimeAgo(update.createdAt)}</span>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 mr-2"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent parent click event
                              handleViewIncrement(update.id);
                              router.push(`/market-updates/${update.id}`);
                            }}
                          >
                            View Details
                          </Button>
                          <button 
                            className="p-2 text-neutral-400 hover:text-primary-600 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent parent click event
                              // Share functionality could be added here
                            }}
                          >
                            <FiShare2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {/* Load More Button */}
          {!loading && pagination.hasNextPage && filteredUpdates.length > 0 && (
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="btn-outline"
                onClick={loadMoreUpdates}
                disabled={loading}
              >
                {loading ? 'Loading...' : `Load More Updates (${pagination.totalCount - filteredUpdates.length} remaining)`}
              </Button>
            </div>
          )}
          
          {!loading && filteredUpdates.length === 0 && !error && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiSearch className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                {searchTerm || selectedCommodity !== 'all' || activeTab !== 'all' 
                  ? 'No updates found' 
                  : 'No market updates available'
                }
              </h3>
              <p className="text-neutral-600 mb-6">
                {searchTerm || selectedCommodity !== 'all' || activeTab !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Be the first to share market information with the community'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {(searchTerm || selectedCommodity !== 'all' || activeTab !== 'all') && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCommodity('all');
                      setActiveTab('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
                <Button onClick={() => window.location.href = '/market-updates/submit'}>
                  Submit Market Update
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}