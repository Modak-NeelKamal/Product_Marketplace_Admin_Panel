export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  type: 'buyer' | 'seller' | 'both';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  lastActive: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  sellerInfo?: {
    storeName: string;
    rating: number;
    totalSales: number;
    productCount: number;
    verificationStatus: 'verified' | 'pending' | 'rejected';
  };
}

// Demo users data
export const users: User[] = [
  {
    id: "u1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
    type: "seller",
    status: "active",
    joinDate: "2024-10-15T00:00:00Z",
    lastActive: "2025-02-18T14:30:00Z",
    address: {
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "USA"
    },
    sellerInfo: {
      storeName: "Smith's Home Goods",
      rating: 4.8,
      totalSales: 548,
      productCount: 26,
      verificationStatus: "verified"
    }
  },
  {
    id: "u2",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1 (555) 987-6543",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    type: "both",
    status: "active",
    joinDate: "2024-08-22T00:00:00Z",
    lastActive: "2025-02-17T09:45:00Z",
    address: {
      street: "456 Oak Ave",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "USA"
    },
    sellerInfo: {
      storeName: "Emma's Handcrafted",
      rating: 4.9,
      totalSales: 326,
      productCount: 18,
      verificationStatus: "verified"
    }
  },
  {
    id: "u3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100",
    type: "buyer",
    status: "active",
    joinDate: "2024-11-03T00:00:00Z",
    lastActive: "2025-02-16T16:20:00Z",
    address: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "USA"
    }
  },
  {
    id: "u4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 345-6789",
    avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100",
    type: "seller",
    status: "pending",
    joinDate: "2025-01-10T00:00:00Z",
    lastActive: "2025-02-15T11:10:00Z",
    address: {
      street: "101 Maple Dr",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "USA"
    },
    sellerInfo: {
      storeName: "Wilson Vintage Finds",
      rating: 0,
      totalSales: 0,
      productCount: 12,
      verificationStatus: "pending"
    }
  },
  {
    id: "u5",
    name: "David Rodriguez",
    email: "david.rodriguez@example.com",
    phone: "+1 (555) 456-7890",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
    type: "buyer",
    status: "suspended",
    joinDate: "2024-09-05T00:00:00Z",
    lastActive: "2025-01-20T08:30:00Z",
    address: {
      street: "222 Elm St",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "USA"
    }
  }
];

// Filter users by type
export const getUsersByType = (type?: 'buyer' | 'seller' | 'both') => {
  if (!type) return users;
  return users.filter(user => user.type === type);
};

// Get a single user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};