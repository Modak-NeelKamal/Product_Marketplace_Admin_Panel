export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  specifications: {
    [key: string]: string;
  };
}

// Demo products data
export const products: Product[] = [
  {
    id: "p1",
    name: "Modern Minimalist Desk",
    description: "A sleek and modern minimalist desk perfect for home offices. Made from sustainable materials with a smooth finish.",
    price: 249.99,
    images: [
      "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/6444367/pexels-photo-6444367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "Furniture",
    seller: {
      id: "s1",
      name: "Home Designs Co.",
      avatar: "https://images.pexels.com/photos/5083216/pexels-photo-5083216.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.8
    },
    status: "approved",
    createdAt: "2025-02-15T08:00:00Z",
    specifications: {
      "Material": "Oak Wood and Steel",
      "Dimensions": "120cm x 60cm x 75cm",
      "Weight": "35kg",
      "Color": "Natural Wood with Black Accents"
    }
  },
  {
    id: "p2",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium wireless headphones with active noise cancellation and 30 hours of battery life.",
    price: 199.95,
    images: [
      "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "Electronics",
    seller: {
      id: "s2",
      name: "AudioTech Plus",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.6
    },
    status: "pending",
    createdAt: "2025-02-18T14:30:00Z",
    specifications: {
      "Driver": "40mm Dynamic",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.2, 3.5mm wired"
    }
  },
  {
    id: "p3",
    name: "Organic Cotton T-shirt",
    description: "Eco-friendly t-shirt made from 100% organic cotton. Comfortable fit and available in multiple colors.",
    price: 29.99,
    images: [
      "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "Clothing",
    seller: {
      id: "s3",
      name: "EcoThreads",
      avatar: "https://images.pexels.com/photos/5081971/pexels-photo-5081971.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.9
    },
    status: "approved",
    createdAt: "2025-02-12T10:15:00Z",
    specifications: {
      "Material": "100% Organic Cotton",
      "Sizes": "S, M, L, XL, XXL",
      "Care": "Machine wash cold, tumble dry low",
      "Origin": "Ethically made in Portugal"
    }
  },
  {
    id: "p4",
    name: "Smart Home Security Camera",
    description: "HD security camera with motion detection, night vision, and smartphone alerts.",
    price: 89.99,
    images: [
      "https://images.pexels.com/photos/207587/pexels-photo-207587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7591061/pexels-photo-7591061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "Smart Home",
    seller: {
      id: "s4",
      name: "SafeTech Security",
      avatar: "https://images.pexels.com/photos/840916/pexels-photo-840916.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.3
    },
    status: "rejected",
    createdAt: "2025-02-10T16:45:00Z",
    specifications: {
      "Resolution": "1080p HD",
      "Field of View": "130°",
      "Connectivity": "Wi-Fi",
      "Storage": "Cloud and local SD card (up to 128GB)"
    }
  },
  {
    id: "p5",
    name: "Leather Weekender Bag",
    description: "Handcrafted leather travel bag perfect for weekend getaways. Includes multiple compartments and adjustable strap.",
    price: 179.50,
    images: [
      "https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1124464/pexels-photo-1124464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "Accessories",
    seller: {
      id: "s5",
      name: "Heritage Leather Goods",
      avatar: "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.7
    },
    status: "pending",
    createdAt: "2025-02-16T09:20:00Z",
    specifications: {
      "Material": "Full-grain leather",
      "Dimensions": "55cm x 25cm x 30cm",
      "Interior": "Cotton lining with multiple pockets",
      "Hardware": "Brass zippers and buckles"
    }
  },
  {
    id: "p6",
    name: "Professional Chef's Knife",
    description: "High-carbon stainless steel chef's knife with ergonomic handle and precision cutting edge.",
    price: 119.99,
    images: [
      "https://images.pexels.com/photos/4226806/pexels-photo-4226806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "Kitchen",
    seller: {
      id: "s6",
      name: "Culinary Edge",
      avatar: "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.9
    },
    status: "approved",
    createdAt: "2025-02-14T13:10:00Z",
    specifications: {
      "Blade": "8-inch high-carbon stainless steel",
      "Handle": "Pakkawood composite",
      "Edge": "15° double-beveled edge",
      "Maintenance": "Hand wash and regular honing recommended"
    }
  },
];

// Filter products by status
export const getProductsByStatus = (status?: 'pending' | 'approved' | 'rejected') => {
  if (!status) return products;
  return products.filter(product => product.status === status);
};

// Get a single product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};