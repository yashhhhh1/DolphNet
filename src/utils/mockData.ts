export type Role = 'seller' | 'logistics' | 'delivery' | 'business' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  isActive?: boolean;
  lastLogin?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  brand: string;
  size: string[];
  color: string[];
  rating: number;
  createdAt: string;
  sellerId: string;
  unitsSold?: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  products: { productId: string; quantity: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

export interface Shipment {
  id: string;
  destination: string;
  driver: string;
  status: 'pending' | 'in_transit' | 'delivered';
  departureDate: string;
  estimatedArrival: string;
  vehicle: string;
  items: number;
}

export interface Delivery {
  id: string;
  customer: string;
  address: string;
  timeSlot: string;
  items: number;
  phone: string;
  status: 'pending' | 'delivered' | 'failed';
}

export interface SystemLog {
  id: string;
  type: 'user' | 'system' | 'security' | 'order';
  action: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Seller',
    email: 'john@dolphnet.com',
    role: 'seller',
    avatar: 'https://ui-avatars.com/api/?name=John+Seller&background=0D8ABC&color=fff',
    isActive: true,
    lastLogin: '2023-04-12 09:45 AM'
  },
  {
    id: '2',
    name: 'Lisa Logistics',
    email: 'lisa@dolphnet.com',
    role: 'logistics',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Logistics&background=0D8ABC&color=fff',
    isActive: true,
    lastLogin: '2023-04-13 11:20 AM'
  },
  {
    id: '3',
    name: 'Dave Delivery',
    email: 'dave@dolphnet.com',
    role: 'delivery',
    avatar: 'https://ui-avatars.com/api/?name=Dave+Delivery&background=0D8ABC&color=fff',
    isActive: true,
    lastLogin: '2023-04-13 08:30 AM'
  },
  {
    id: '4',
    name: 'Barbara Business',
    email: 'barbara@dolphnet.com',
    role: 'business',
    avatar: 'https://ui-avatars.com/api/?name=Barbara+Business&background=0D8ABC&color=fff',
    isActive: true,
    lastLogin: '2023-04-12 03:15 PM'
  },
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@dolphnet.com',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
    isActive: true,
    lastLogin: '2023-04-13 10:05 AM'
  },
];

// Mock Shoe Products
export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Wave Runner Athletic Shoe',
    category: 'Running',
    price: 129.99,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    description: 'Lightweight running shoes with wave technology for enhanced stability and comfort.',
    brand: 'WaveTech',
    size: ['7', '8', '9', '10', '11', '12'],
    color: ['Blue', 'Black', 'Red'],
    rating: 4.7,
    createdAt: '2023-12-01',
    sellerId: '1',
    unitsSold: 120
  },
  {
    id: 'p2',
    name: 'Aqua Comfort Casual Sneakers',
    category: 'Casual',
    price: 89.99,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
    description: 'Stylish sneakers with water-resistant coating and memory foam insoles.',
    brand: 'AquaStep',
    size: ['6', '7', '8', '9', '10'],
    color: ['White', 'Gray', 'Navy'],
    rating: 4.3,
    createdAt: '2023-11-15',
    sellerId: '1'
  },
  {
    id: 'p3',
    name: 'Pro Tide Basketball Shoes',
    category: 'Basketball',
    price: 159.99,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3',
    description: 'High-performance basketball shoes with extra ankle support and cushioned landing.',
    brand: 'TideMax',
    size: ['8', '9', '10', '11', '12', '13'],
    color: ['Black/Red', 'White/Blue', 'Gray/Orange'],
    rating: 4.9,
    createdAt: '2024-01-05',
    sellerId: '1'
  },
  {
    id: 'p4',
    name: 'Dolphin Flex Hiking Boots',
    category: 'Hiking',
    price: 149.99,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0',
    description: 'Waterproof hiking boots with superior grip and ankle protection.',
    brand: 'TrekPath',
    size: ['7', '8', '9', '10', '11', '12'],
    color: ['Brown', 'Green', 'Black'],
    rating: 4.8,
    createdAt: '2023-10-20',
    sellerId: '1'
  },
  {
    id: 'p5',
    name: 'Net Flow Slip-ons',
    category: 'Casual',
    price: 69.99,
    stock: 34,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
    description: 'Breathable slip-on shoes perfect for everyday comfort.',
    brand: 'FlowStep',
    size: ['6', '7', '8', '9', '10', '11'],
    color: ['White', 'Black', 'Gray', 'Blue'],
    rating: 4.5,
    createdAt: '2023-11-28',
    sellerId: '1'
  },
  {
    id: 'p6',
    name: 'Ocean Depth Training Shoes',
    category: 'Training',
    price: 119.99,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
    description: 'Cross-training shoes with stability control and impact absorption.',
    brand: 'DeepBlue',
    size: ['7', '8', '9', '10', '11'],
    color: ['Blue/Black', 'Gray/Lime', 'Black/Red'],
    rating: 4.6,
    createdAt: '2023-12-15',
    sellerId: '1'
  },
  {
    id: 'p7',
    name: 'Tech Mesh Walking Shoes',
    category: 'Walking',
    price: 79.99,
    stock: 41,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
    description: 'Lightweight walking shoes with breathable mesh upper and cushioned soles.',
    brand: 'MeshTech',
    size: ['7', '8', '9', '10', '11', '12'],
    color: ['Gray', 'Black', 'Blue', 'Red'],
    rating: 4.2,
    createdAt: '2024-02-01',
    sellerId: '1'
  },
  {
    id: 'p8',
    name: 'Aqua Formal Leather Oxfords',
    category: 'Formal',
    price: 139.99,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1613987876445-18a6d069d78d',
    description: 'Premium leather oxford shoes with water-resistant treatment and comfort insoles.',
    brand: 'AquaFormal',
    size: ['8', '9', '10', '11', '12'],
    color: ['Black', 'Brown', 'Tan'],
    rating: 4.7,
    createdAt: '2023-09-10',
    sellerId: '1'
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'O1001',
    customerId: 'c1',
    customerName: 'Emma Wilson',
    products: [{ productId: 'p1', quantity: 1 }],
    total: 129.99,
    status: 'delivered',
    date: '2024-03-15'
  },
  {
    id: 'O1002',
    customerId: 'c2',
    customerName: 'Michael Brown',
    products: [{ productId: 'p3', quantity: 1 }, { productId: 'p5', quantity: 2 }],
    total: 299.97,
    status: 'shipped',
    date: '2024-03-24'
  },
  {
    id: 'O1003',
    customerId: 'c3',
    customerName: 'Sophia Garcia',
    products: [{ productId: 'p2', quantity: 1 }],
    total: 89.99,
    status: 'processing',
    date: '2024-04-02'
  },
  {
    id: 'O1004',
    customerId: 'c4',
    customerName: 'James Martinez',
    products: [{ productId: 'p4', quantity: 1 }, { productId: 'p7', quantity: 1 }],
    total: 229.98,
    status: 'pending',
    date: '2024-04-10'
  },
  {
    id: 'O1005',
    customerId: 'c5',
    customerName: 'Olivia Johnson',
    products: [{ productId: 'p6', quantity: 2 }],
    total: 239.98,
    status: 'processing',
    date: '2024-04-08'
  }
];

// Sales Data for Chart
export const mockSalesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

export const mockCategorySales = [
  { name: 'Running', value: 35 },
  { name: 'Casual', value: 30 },
  { name: 'Basketball', value: 15 },
  { name: 'Hiking', value: 10 },
  { name: 'Formal', value: 10 },
];

// Stats for dashboard
export const mockStats = {
  totalProducts: 8,
  activeListings: 8,
  pendingOrders: 2,
  revenueThisMonth: 1089.90
};

// Mock data for Logistics Dashboard
export const mockShipments: Shipment[] = [
  {
    id: 'S1001',
    destination: 'New York, NY',
    driver: 'Michael Johnson',
    status: 'in_transit',
    departureDate: '2023-04-12',
    estimatedArrival: '2023-04-14',
    vehicle: 'Van-XL-102',
    items: 24
  },
  {
    id: 'S1002',
    destination: 'Boston, MA',
    driver: 'Sarah Williams',
    status: 'pending',
    departureDate: '2023-04-14',
    estimatedArrival: '2023-04-16',
    vehicle: 'Truck-L-205',
    items: 36
  },
  {
    id: 'S1003',
    destination: 'Chicago, IL',
    driver: 'Robert Davis',
    status: 'delivered',
    departureDate: '2023-04-10',
    estimatedArrival: '2023-04-13',
    vehicle: 'Van-M-087',
    items: 18
  },
  {
    id: 'S1004',
    destination: 'Los Angeles, CA',
    driver: 'Emily Thompson',
    status: 'pending',
    departureDate: '2023-04-15',
    estimatedArrival: '2023-04-20',
    vehicle: 'Truck-XL-314',
    items: 52
  },
  {
    id: 'S1005',
    destination: 'Miami, FL',
    driver: 'Daniel Martinez',
    status: 'in_transit',
    departureDate: '2023-04-11',
    estimatedArrival: '2023-04-15',
    vehicle: 'Van-L-159',
    items: 31
  }
];

// Mock data for Delivery Partner Dashboard
export const mockDeliveries: Delivery[] = [
  {
    id: 'D1001',
    customer: 'Jane Cooper',
    address: '123 Main St, Apt 4B, New York, NY',
    timeSlot: '10:00 AM - 12:00 PM',
    items: 2,
    phone: '(555) 123-4567',
    status: 'pending'
  },
  {
    id: 'D1002',
    customer: 'Cody Fisher',
    address: '456 Elm Ave, Boston, MA',
    timeSlot: '1:00 PM - 3:00 PM',
    items: 1,
    phone: '(555) 987-6543',
    status: 'pending'
  },
  {
    id: 'D1003',
    customer: 'Esther Howard',
    address: '789 Oak Rd, Chicago, IL',
    timeSlot: '3:00 PM - 5:00 PM',
    items: 3,
    phone: '(555) 456-7890',
    status: 'delivered'
  },
  {
    id: 'D1004',
    customer: 'Cameron Williamson',
    address: '321 Pine St, Miami, FL',
    timeSlot: '9:00 AM - 11:00 AM',
    items: 2,
    phone: '(555) 234-5678',
    status: 'failed'
  },
  {
    id: 'D1005',
    customer: 'Brooklyn Simmons',
    address: '654 Cedar Ln, Seattle, WA',
    timeSlot: '4:00 PM - 6:00 PM',
    items: 4,
    phone: '(555) 876-5432',
    status: 'pending'
  }
];

// Mock data for Business Dashboard
export const mockBusinessStats = {
  totalRevenue: 45280.90,
  revenueIncrease: 12.5,
  averageOrderValue: 120.75,
  aovIncrease: 3.2,
  conversionRate: 4.8,
  conversionIncrease: 0.5,
  totalOrders: 375,
  ordersIncrease: 8.3
};

export const mockTopProducts: Product[] = [
  {
    id: 'p1',
    name: 'Wave Runner Athletic Shoe',
    category: 'Running',
    price: 129.99,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    description: 'Lightweight running shoes with wave technology.',
    brand: 'WaveTech',
    size: ['7', '8', '9', '10', '11', '12'],
    color: ['Blue', 'Black', 'Red'],
    rating: 4.7,
    createdAt: '2023-12-01',
    sellerId: '1',
    unitsSold: 120
  },
  {
    id: 'p3',
    name: 'Pro Tide Basketball Shoes',
    category: 'Basketball',
    price: 159.99,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3',
    description: 'High-performance basketball shoes.',
    brand: 'TideMax',
    size: ['8', '9', '10', '11', '12', '13'],
    color: ['Black/Red', 'White/Blue', 'Gray/Orange'],
    rating: 4.9,
    createdAt: '2024-01-05',
    sellerId: '1',
    unitsSold: 87
  },
  {
    id: 'p2',
    name: 'Aqua Comfort Casual Sneakers',
    category: 'Casual',
    price: 89.99,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
    description: 'Stylish sneakers with water-resistant coating.',
    brand: 'AquaStep',
    size: ['6', '7', '8', '9', '10'],
    color: ['White', 'Gray', 'Navy'],
    rating: 4.3,
    createdAt: '2023-11-15',
    sellerId: '1',
    unitsSold: 65
  },
  {
    id: 'p4',
    name: 'Dolphin Flex Hiking Boots',
    category: 'Hiking',
    price: 149.99,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0',
    description: 'Waterproof hiking boots with superior grip.',
    brand: 'TrekPath',
    size: ['7', '8', '9', '10', '11', '12'],
    color: ['Brown', 'Green', 'Black'],
    rating: 4.8,
    createdAt: '2023-10-20',
    sellerId: '1',
    unitsSold: 52
  },
  {
    id: 'p8',
    name: 'Aqua Formal Leather Oxfords',
    category: 'Formal',
    price: 139.99,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1613987876445-18a6d069d78d',
    description: 'Premium leather oxford shoes.',
    brand: 'AquaFormal',
    size: ['8', '9', '10', '11', '12'],
    color: ['Black', 'Brown', 'Tan'],
    rating: 4.7,
    createdAt: '2023-09-10',
    sellerId: '1',
    unitsSold: 43
  }
];

// Mock data for Admin Panel
export const mockSystemLogs: SystemLog[] = [
  {
    id: 'log-001',
    type: 'security',
    action: 'Unauthorized login attempt',
    timestamp: '2023-04-13T08:12:30Z',
    level: 'warning'
  },
  {
    id: 'log-002',
    type: 'system',
    action: 'Database backup completed',
    timestamp: '2023-04-13T07:00:00Z',
    level: 'info'
  },
  {
    id: 'log-003',
    type: 'user',
    action: 'User Barbara Business updated profile',
    timestamp: '2023-04-12T14:25:10Z',
    level: 'info'
  },
  {
    id: 'log-004',
    type: 'order',
    action: 'Order O1003 payment failed',
    timestamp: '2023-04-12T11:32:45Z',
    level: 'error'
  },
  {
    id: 'log-005',
    type: 'system',
    action: 'API rate limit exceeded',
    timestamp: '2023-04-12T10:18:22Z',
    level: 'warning'
  },
  {
    id: 'log-006',
    type: 'security',
    action: 'Admin user logged in',
    timestamp: '2023-04-13T10:05:00Z',
    level: 'info'
  },
  {
    id: 'log-007',
    type: 'system',
    action: 'Server CPU usage exceeded 90%',
    timestamp: '2023-04-11T15:45:12Z',
    level: 'error'
  },
  {
    id: 'log-008',
    type: 'user',
    action: 'New user John Seller registered',
    timestamp: '2023-04-10T09:20:30Z',
    level: 'info'
  }
];
