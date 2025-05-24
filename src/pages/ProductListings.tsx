import { useState } from 'react';
import { Search, Filter, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/products/ProductCard';
import { getProductsByStatus, Product } from '../data/products';

const ProductListings = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get products based on status filter
  const filteredProducts = statusFilter === 'all' 
    ? getProductsByStatus() 
    : getProductsByStatus(statusFilter);
    
  // Filter by search query
  const searchedProducts = searchQuery 
    ? filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.seller.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredProducts;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Product Listings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage and approve product listings from sellers
        </p>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="Search products, categories, or sellers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={statusFilter === 'all' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'pending' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('pending')}
            >
              <Clock className="h-4 w-4 mr-1" />
              Pending
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'approved' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('approved')}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Approved
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'rejected' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('rejected')}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Rejected
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mr-4">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Review</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {getProductsByStatus('pending').length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 mr-4">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {getProductsByStatus('approved').length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 mr-4">
              <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejected</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {getProductsByStatus('rejected').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Product grid */}
      {searchedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">No products found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setStatusFilter('all');
              setSearchQuery('');
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductListings;