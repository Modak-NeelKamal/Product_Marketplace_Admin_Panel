import { useState } from 'react';
import { Search, Filter, User, Users, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Link } from 'react-router-dom';
import { getUsersByType, User as UserType } from '../data/users';
import { formatDate } from '../utils/dates';

const UsersList = () => {
  const [typeFilter, setTypeFilter] = useState<'all' | 'buyer' | 'seller' | 'both'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get users based on type filter
  const filteredUsers = typeFilter === 'all' 
    ? getUsersByType() 
    : getUsersByType(typeFilter);
    
  // Filter by search query
  const searchedUsers = searchQuery 
    ? filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredUsers;
  
  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'suspended':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Users</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          View and manage buyers and sellers on your marketplace
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
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={typeFilter === 'all' ? 'primary' : 'outline'}
              onClick={() => setTypeFilter('all')}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={typeFilter === 'buyer' ? 'primary' : 'outline'}
              onClick={() => setTypeFilter('buyer')}
            >
              <User className="h-4 w-4 mr-1" />
              Buyers
            </Button>
            <Button
              size="sm"
              variant={typeFilter === 'seller' ? 'primary' : 'outline'}
              onClick={() => setTypeFilter('seller')}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              Sellers
            </Button>
            <Button
              size="sm"
              variant={typeFilter === 'both' ? 'primary' : 'outline'}
              onClick={() => setTypeFilter('both')}
            >
              <Users className="h-4 w-4 mr-1" />
              Both
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-4">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {getUsersByType().length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-4">
              <User className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Buyers</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {getUsersByType().filter(u => u.type === 'buyer' || u.type === 'both').length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900/30 mr-4">
              <ShoppingBag className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sellers</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {getUsersByType().filter(u => u.type === 'seller' || u.type === 'both').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Users list */}
      {searchedUsers.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Joined
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {searchedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            className="h-10 w-10 rounded-full object-cover" 
                            src={user.avatar} 
                            alt={user.name} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          {user.type === 'seller' && user.sellerInfo && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.sellerInfo.storeName}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{user.email}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={
                        user.type === 'buyer' ? 'primary' : 
                        user.type === 'seller' ? 'secondary' : 'default'
                      } className="capitalize">
                        {user.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(user.status)} className="capitalize">
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(new Date(user.joinDate))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/users/${user.id}`}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">No users found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setTypeFilter('all');
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

export default UsersList;