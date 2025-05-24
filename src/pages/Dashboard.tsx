import { Users, ShoppingBag, DollarSign, Inbox } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import SalesChart from '../components/dashboard/SalesChart';
import RecentActivity from '../components/dashboard/RecentActivity';

// Mock data for recent activity
const recentActivities = [
  {
    id: '1',
    user: {
      name: 'John Smith',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    action: 'approved a new product listing',
    target: 'Modern Coffee Table',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    user: {
      name: 'Emma Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    action: 'processed a refund for',
    target: 'Ergonomic Office Chair',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    user: {
      name: 'Michael Davis',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    action: 'added a new seller account for',
    target: 'Vintage Collectibles Shop',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    action: 'rejected a product listing',
    target: 'Counterfeit Smartphone',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Overview of your marketplace performance
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value="4,289" 
          change={{ value: 12, isPositive: true }}
          icon={Users}
        />
        <StatCard 
          title="Products Listed" 
          value="12,456" 
          change={{ value: 8, isPositive: true }}
          icon={ShoppingBag}
        />
        <StatCard 
          title="Pending Approvals" 
          value="36" 
          change={{ value: 5, isPositive: false }}
          icon={Inbox}
        />
        <StatCard 
          title="Total Revenue" 
          value="$342,891" 
          change={{ value: 18, isPositive: true }}
          icon={DollarSign}
        />
      </div>
      
      {/* Charts and activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <RecentActivity activities={recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;