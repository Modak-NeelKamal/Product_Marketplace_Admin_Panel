import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, BarChart3, Settings, LogOut } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const Sidebar = ({ isOpen, onClose, user }: SidebarProps) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Transactions', path: '/transactions', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];
  
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center">
            <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-white">MarketAdmin</span>
          </Link>
        </div>
        
        {/* User info */}
        {user && (
          <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800 dark:text-white">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
            </div>
          </div>
        )}
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path));
                
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors group",
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 mr-3 transition-colors",
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300"
                    )} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Logout button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 w-full"
            onClick={onClose}
          >
            <LogOut className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;