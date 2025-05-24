import { useState } from 'react';
import { Search, Filter, CreditCard, CheckCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { getTransactionsByStatus, Transaction } from '../data/transactions';
import { formatDate } from '../utils/dates';

const Transactions = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'refunded' | 'disputed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get transactions based on status filter
  const filteredTransactions = statusFilter === 'all' 
    ? getTransactionsByStatus() 
    : getTransactionsByStatus(statusFilter);
    
  // Filter by search query
  const searchedTransactions = searchQuery 
    ? filteredTransactions.filter(transaction => 
        transaction.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredTransactions;
  
  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'refunded':
        return 'secondary';
      case 'disputed':
        return 'danger';
      default:
        return 'default';
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Transactions</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Monitor and manage all marketplace transactions
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
            placeholder="Search by product, seller, buyer, or order number..."
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
              variant={statusFilter === 'completed' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('completed')}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Completed
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'pending' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('pending')}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Pending
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'disputed' ? 'primary' : 'outline'}
              onClick={() => setStatusFilter('disputed')}
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              Disputed
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-4">
              <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Value</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${getTransactionsByStatus().reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
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
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {getTransactionsByStatus('completed').length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mr-4">
              <RefreshCw className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {getTransactionsByStatus('pending').length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 mr-4">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Disputed</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {getTransactionsByStatus('disputed').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Transactions table */}
      {searchedTransactions.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Order
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Buyer / Seller
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {searchedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            className="h-10 w-10 rounded object-cover" 
                            src={transaction.product.image} 
                            alt={transaction.product.name} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {transaction.product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <span className="font-medium">Buyer:</span> {transaction.buyer.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Seller:</span> {transaction.seller.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(transaction.status)} className="capitalize">
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(new Date(transaction.date))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        size="sm" 
                        variant="outline"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">No transactions found matching your criteria.</p>
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

export default Transactions;