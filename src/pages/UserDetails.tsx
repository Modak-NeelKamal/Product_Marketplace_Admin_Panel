import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, Phone, MapPin, ShoppingBag, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { getUserById } from '../data/users';
import { formatDate } from '../utils/dates';

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const user = id ? getUserById(id) : undefined;
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User not found</h2>
        <Button onClick={() => navigate('/users')} className="mt-4">
          Back to Users
        </Button>
      </div>
    );
  }
  
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
      {/* Back button */}
      <button
        onClick={() => navigate('/users')}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back to Users
      </button>
      
      {/* User header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-24 w-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-sm"
            />
          </div>
          
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                <div className="flex items-center mt-1">
                  <Badge variant={
                    user.type === 'buyer' ? 'primary' : 
                    user.type === 'seller' ? 'secondary' : 'default'
                  } className="capitalize mr-2">
                    {user.type}
                  </Badge>
                  <Badge variant={getStatusVariant(user.status)} className="capitalize">
                    {user.status}
                  </Badge>
                </div>
                
                {user.type === 'seller' && user.sellerInfo && (
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {user.sellerInfo.storeName}
                  </p>
                )}
              </div>
              
              <div className="mt-4 md:mt-0 space-x-3">
                {user.status === 'active' ? (
                  <Button variant="danger">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Suspend User
                  </Button>
                ) : user.status === 'suspended' ? (
                  <Button variant="success">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Reactivate User
                  </Button>
                ) : (
                  <Button variant="success">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve User
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-gray-900 dark:text-white">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                <p className="text-gray-900 dark:text-white">{user.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</p>
                <p className="text-gray-900 dark:text-white">
                  {user.address.street}<br />
                  {user.address.city}, {user.address.state} {user.address.zip}<br />
                  {user.address.country}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Activity</p>
                <p className="text-gray-900 dark:text-white">
                  Joined: {formatDate(new Date(user.joinDate))}<br />
                  Last active: {formatDate(new Date(user.lastActive))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Seller information (if applicable) */}
        {(user.type === 'seller' || user.type === 'both') && user.sellerInfo && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Store Rating</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center mt-1">
                      {user.sellerInfo.rating.toFixed(1)}
                      <span className="text-yellow-500 ml-1">★</span>
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sales</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{user.sellerInfo.totalSales}</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Products</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{user.sellerInfo.productCount}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-medium text-gray-900 dark:text-white">Verification Status</p>
                    <Badge variant={
                      user.sellerInfo.verificationStatus === 'verified' ? 'success' :
                      user.sellerInfo.verificationStatus === 'rejected' ? 'danger' : 'warning'
                    } className="capitalize">
                      {user.sellerInfo.verificationStatus}
                    </Badge>
                  </div>
                  
                  {user.sellerInfo.verificationStatus === 'pending' && (
                    <div className="flex space-x-3 mt-3">
                      <Button variant="success" size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Verify Seller
                      </Button>
                      <Button variant="danger" size="sm">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Reject Verification
                      </Button>
                    </div>
                  )}
                </div>
                
                <div>
                  <Button variant="outline" className="w-full">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    View Seller's Products
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Recent activity */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Mock activity data */}
                  {[
                    { date: '2025-02-18T08:30:00Z', activity: 'Login', details: 'From IP 192.168.1.1' },
                    { date: '2025-02-17T15:45:00Z', activity: user.type === 'seller' ? 'Product Listed' : 'Purchase', details: user.type === 'seller' ? 'Modern Coffee Table ($199.99)' : 'Wireless Headphones ($89.99)' },
                    { date: '2025-02-16T11:20:00Z', activity: 'Profile Updated', details: 'Changed phone number' },
                    { date: '2025-02-15T09:10:00Z', activity: 'Login', details: 'From IP 192.168.1.1' },
                  ].map((activity, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(new Date(activity.date))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {activity.activity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {activity.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetails;