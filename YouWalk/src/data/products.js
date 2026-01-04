// Product Data
export const products = [
  {
    id: 1,
    name: 'Classic Leather Sneakers',
    category: 'Sneakers',
    price: 129,
    originalPrice: 159,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    description: 'Premium leather sneakers with modern design and exceptional comfort. Features cushioned insole and durable rubber outsole.',
    isNew: false,
    isSale: true,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Black', 'White', 'Brown'],
    inStock: true,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: 'Elegant High Heels',
    category: 'Heels',
    price: 89,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=800&fit=crop',
    description: 'Sophisticated high heels perfect for formal occasions. Crafted with premium materials for lasting comfort.',
    isNew: true,
    isSale: false,
    sizes: ['6', '7', '8', '9'],
    colors: ['Black', 'Nude', 'Red'],
    inStock: true,
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    name: 'Performance Running Shoes',
    category: 'Athletic',
    price: 99,
    originalPrice: 129,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop',
    description: 'Lightweight running shoes with advanced cushioning technology for maximum performance.',
    isNew: false,
    isSale: true,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Blue', 'Black', 'White'],
    inStock: true,
    rating: 4.7,
    reviews: 256,
  },
  {
    id: 4,
    name: 'Canvas Slip-On Loafers',
    category: 'Casual',
    price: 49,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop',
    description: 'Easy-going slip-on shoes for everyday comfort. Perfect for casual outings.',
    isNew: true,
    isSale: false,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Navy', 'Gray', 'Beige'],
    inStock: true,
    rating: 4.3,
    reviews: 67,
  },
  {
    id: 5,
    name: 'Premium Ankle Boots',
    category: 'Boots',
    price: 149,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800&h=800&fit=crop',
    description: 'Stylish ankle boots crafted from premium leather. Perfect for any season.',
    isNew: false,
    isSale: true,
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['Black', 'Brown', 'Tan'],
    inStock: true,
    rating: 4.6,
    reviews: 142,
  },
  {
    id: 6,
    name: 'Sport Sandals',
    category: 'Sandals',
    price: 39,
    image: 'https://images.unsplash.com/photo-1575540325855-4b5d285a3845?w=800&h=800&fit=crop',
    description: 'Comfortable sport sandals perfect for outdoor adventures.',
    isNew: true,
    isSale: false,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Black', 'Blue', 'Gray'],
    inStock: true,
    rating: 4.2,
    reviews: 45,
  },
  {
    id: 7,
    name: 'Designer Penny Loafers',
    category: 'Loafers',
    price: 119,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop',
    description: 'Classic penny loafers with contemporary design elements.',
    isNew: false,
    isSale: false,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Brown', 'Black', 'Burgundy'],
    inStock: true,
    rating: 4.4,
    reviews: 98,
  },
  {
    id: 8,
    name: 'Platform Sneakers',
    category: 'Sneakers',
    price: 109,
    originalPrice: 139,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
    description: 'Trendy platform sneakers with bold design and all-day comfort.',
    isNew: true,
    isSale: true,
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['White', 'Pink', 'Black'],
    inStock: true,
    rating: 4.5,
    reviews: 176,
  },
]

export const categories = [
  { id: 'all', name: 'All', count: products.length },
  { id: 'sneakers', name: 'Sneakers', count: products.filter(p => p.category === 'Sneakers').length },
  { id: 'heels', name: 'Heels', count: products.filter(p => p.category === 'Heels').length },
  { id: 'athletic', name: 'Athletic', count: products.filter(p => p.category === 'Athletic').length },
  { id: 'casual', name: 'Casual', count: products.filter(p => p.category === 'Casual').length },
  { id: 'boots', name: 'Boots', count: products.filter(p => p.category === 'Boots').length },
  { id: 'sandals', name: 'Sandals', count: products.filter(p => p.category === 'Sandals').length },
  { id: 'loafers', name: 'Loafers', count: products.filter(p => p.category === 'Loafers').length },
]

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id))
}

export const getProductsByCategory = (category) => {
  if (category === 'all' || !category) return products
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  )
}

// Dashboard mock data
export const dashboardStats = {
  totalRevenue: 124500,
  totalOrders: 856,
  totalCustomers: 2340,
  conversionRate: 3.2,
  revenueGrowth: 12.5,
  ordersGrowth: 8.3,
  customersGrowth: 15.2,
  conversionGrowth: 0.8,
}

export const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', email: 'john@example.com', amount: 129, status: 'completed', date: '2024-01-15' },
  { id: '#ORD-002', customer: 'Jane Smith', email: 'jane@example.com', amount: 89, status: 'processing', date: '2024-01-15' },
  { id: '#ORD-003', customer: 'Mike Johnson', email: 'mike@example.com', amount: 199, status: 'pending', date: '2024-01-14' },
  { id: '#ORD-004', customer: 'Sarah Williams', email: 'sarah@example.com', amount: 149, status: 'completed', date: '2024-01-14' },
  { id: '#ORD-005', customer: 'Chris Brown', email: 'chris@example.com', amount: 79, status: 'shipped', date: '2024-01-13' },
]

export const salesData = [
  { month: 'Jan', sales: 12400 },
  { month: 'Feb', sales: 15200 },
  { month: 'Mar', sales: 18600 },
  { month: 'Apr', sales: 17200 },
  { month: 'May', sales: 21400 },
  { month: 'Jun', sales: 24800 },
  { month: 'Jul', sales: 22100 },
  { month: 'Aug', sales: 26500 },
  { month: 'Sep', sales: 28900 },
  { month: 'Oct', sales: 31200 },
  { month: 'Nov', sales: 35600 },
  { month: 'Dec', sales: 42000 },
]

export const topProducts = [
  { name: 'Classic Leather Sneakers', sales: 234, revenue: 30186 },
  { name: 'Performance Running Shoes', sales: 189, revenue: 18711 },
  { name: 'Premium Ankle Boots', sales: 156, revenue: 23244 },
  { name: 'Platform Sneakers', sales: 142, revenue: 15478 },
  { name: 'Elegant High Heels', sales: 128, revenue: 11392 },
]
