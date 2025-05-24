export interface Transaction {
  id: string;
  product: {
    id: string;
    name: string;
    image: string;
  };
  seller: {
    id: string;
    name: string;
  };
  buyer: {
    id: string;
    name: string;
  };
  amount: number;
  status: 'completed' | 'pending' | 'refunded' | 'disputed';
  paymentMethod: string;
  date: string;
  orderNumber: string;
}

// Demo transactions data
export const transactions: Transaction[] = [
  {
    id: "t1",
    product: {
      id: "p1",
      name: "Modern Minimalist Desk",
      image: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    seller: {
      id: "s1",
      name: "Home Designs Co."
    },
    buyer: {
      id: "u3",
      name: "Michael Chen"
    },
    amount: 249.99,
    status: "completed",
    paymentMethod: "Credit Card",
    date: "2025-02-17T14:30:00Z",
    orderNumber: "ORD-2025-0217-1001"
  },
  {
    id: "t2",
    product: {
      id: "p3",
      name: "Organic Cotton T-shirt",
      image: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    seller: {
      id: "s3",
      name: "EcoThreads"
    },
    buyer: {
      id: "u5",
      name: "David Rodriguez"
    },
    amount: 29.99,
    status: "completed",
    paymentMethod: "PayPal",
    date: "2025-02-16T09:45:00Z",
    orderNumber: "ORD-2025-0216-1002"
  },
  {
    id: "t3",
    product: {
      id: "p6",
      name: "Professional Chef's Knife",
      image: "https://images.pexels.com/photos/4226806/pexels-photo-4226806.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    seller: {
      id: "s6",
      name: "Culinary Edge"
    },
    buyer: {
      id: "u2",
      name: "Emma Johnson"
    },
    amount: 119.99,
    status: "pending",
    paymentMethod: "Credit Card",
    date: "2025-02-18T11:20:00Z",
    orderNumber: "ORD-2025-0218-1003"
  },
  {
    id: "t4",
    product: {
      id: "p2",
      name: "Wireless Noise-Cancelling Headphones",
      image: "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    seller: {
      id: "s2",
      name: "AudioTech Plus"
    },
    buyer: {
      id: "u3",
      name: "Michael Chen"
    },
    amount: 199.95,
    status: "disputed",
    paymentMethod: "Credit Card",
    date: "2025-02-15T16:10:00Z",
    orderNumber: "ORD-2025-0215-1004"
  },
  {
    id: "t5",
    product: {
      id: "p1",
      name: "Modern Minimalist Desk",
      image: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    seller: {
      id: "s1",
      name: "Home Designs Co."
    },
    buyer: {
      id: "u2",
      name: "Emma Johnson"
    },
    amount: 249.99,
    status: "refunded",
    paymentMethod: "PayPal",
    date: "2025-02-14T13:40:00Z",
    orderNumber: "ORD-2025-0214-1005"
  }
];

// Filter transactions by status
export const getTransactionsByStatus = (status?: 'completed' | 'pending' | 'refunded' | 'disputed') => {
  if (!status) return transactions;
  return transactions.filter(transaction => transaction.status === status);
};

// Get a single transaction by ID
export const getTransactionById = (id: string): Transaction | undefined => {
  return transactions.find(transaction => transaction.id === id);
};