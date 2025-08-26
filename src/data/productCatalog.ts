import { Product } from '../types';

export const PRODUCT_CATALOG: Product[] = [
  {
    id: '1',
    name: 'MacBook Air M3',
    category: 'Laptops',
    description: 'Ultra-lightweight laptop with Apple M3 chip, perfect for travel and everyday tasks.',
    features: [
      'Apple M3 chip with 8-core CPU',
      '13.6-inch Liquid Retina display',
      'Up to 18 hours battery life',
      'Fanless design for silent operation',
      'Lightweight at 2.7 pounds',
      'MagSafe 3 charging',
      'Two Thunderbolt ports'
    ],
    specifications: {
      'Weight': '2.7 lbs',
      'Screen Size': '13.6 inches',
      'Processor': 'Apple M3',
      'RAM': '8GB',
      'Storage': '256GB SSD',
      'Battery Life': '18 hours',
      'Operating System': 'macOS'
    },
    price: 1099,
    brand: 'Apple',
    rating: 4.7,
    reviews: 2847,
    tags: ['lightweight', 'travel', 'long battery', 'premium', 'silent', 'portable', 'mac']
  },
  {
    id: '2',
    name: 'Dell XPS 13 Plus',
    category: 'Laptops',
    description: 'Premium Windows ultrabook with stunning design and powerful performance.',
    features: [
      '12th Gen Intel Core processors',
      '13.4-inch InfinityEdge display',
      'Zero-lattice keyboard',
      'Haptic feedback touchpad',
      'Premium aluminum construction',
      'Thunderbolt 4 ports',
      'Windows 11 Pro'
    ],
    specifications: {
      'Weight': '2.73 lbs',
      'Screen Size': '13.4 inches',
      'Processor': 'Intel Core i7-1280P',
      'RAM': '16GB',
      'Storage': '512GB SSD',
      'Battery Life': '12 hours',
      'Operating System': 'Windows 11'
    },
    price: 1299,
    brand: 'Dell',
    rating: 4.5,
    reviews: 1524,
    tags: ['premium', 'windows', 'business', 'lightweight', 'performance', 'professional']
  },
  {
    id: '3',
    name: 'ASUS ROG Zephyrus G14',
    category: 'Laptops',
    description: 'Powerful gaming laptop with excellent portability and battery life.',
    features: [
      'AMD Ryzen 9 processor',
      'NVIDIA RTX 4060 graphics',
      '14-inch QHD display',
      'AniMe Matrix LED display',
      'All-day battery life',
      'Compact gaming design',
      'ROG Keystone II'
    ],
    specifications: {
      'Weight': '3.64 lbs',
      'Screen Size': '14 inches',
      'Processor': 'AMD Ryzen 9 7940HS',
      'RAM': '16GB',
      'Storage': '1TB SSD',
      'Graphics': 'NVIDIA RTX 4060',
      'Battery Life': '10 hours'
    },
    price: 1599,
    brand: 'ASUS',
    rating: 4.6,
    reviews: 892,
    tags: ['gaming', 'powerful', 'portable', 'amd', 'nvidia', 'performance', 'rgb']
  },
  {
    id: '4',
    name: 'ThinkPad X1 Carbon Gen 11',
    category: 'Laptops',
    description: 'Business-class laptop with exceptional durability and security features.',
    features: [
      '13th Gen Intel Core processors',
      '14-inch WUXGA display',
      'Carbon fiber construction',
      'MIL-STD-810H tested',
      'Fingerprint reader',
      'IR camera with Windows Hello',
      'Rapid Charge technology'
    ],
    specifications: {
      'Weight': '2.48 lbs',
      'Screen Size': '14 inches',
      'Processor': 'Intel Core i7-1365U',
      'RAM': '16GB',
      'Storage': '512GB SSD',
      'Battery Life': '15 hours',
      'Operating System': 'Windows 11 Pro'
    },
    price: 1849,
    brand: 'Lenovo',
    rating: 4.8,
    reviews: 1156,
    tags: ['business', 'durable', 'security', 'lightweight', 'professional', 'carbon fiber']
  },
  {
    id: '5',
    name: 'iPhone 15 Pro Max',
    category: 'Smartphones',
    description: 'Top-tier smartphone with advanced camera system and titanium design.',
    features: [
      'A17 Pro chip with 6-core GPU',
      'Pro camera system with 5x zoom',
      'Titanium design',
      'Action Button',
      'USB-C connector',
      'Always-On display',
      'Face ID'
    ],
    specifications: {
      'Screen Size': '6.7 inches',
      'Processor': 'A17 Pro',
      'RAM': '8GB',
      'Storage': '256GB',
      'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      'Battery Life': '29 hours video',
      'Operating System': 'iOS 17'
    },
    price: 1199,
    brand: 'Apple',
    rating: 4.8,
    reviews: 5634,
    tags: ['premium', 'camera', 'titanium', 'flagship', 'photography', 'video', 'ios']
  },
  {
    id: '6',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Smartphones',
    description: 'Android flagship with S Pen and exceptional camera capabilities.',
    features: [
      'Snapdragon 8 Gen 3 processor',
      '200MP camera with AI features',
      'Built-in S Pen',
      '6.8-inch Dynamic AMOLED display',
      'Titanium frame',
      'Galaxy AI features',
      '5000mAh battery'
    ],
    specifications: {
      'Screen Size': '6.8 inches',
      'Processor': 'Snapdragon 8 Gen 3',
      'RAM': '12GB',
      'Storage': '256GB',
      'Camera': '200MP Main + 50MP Periscope + 10MP Telephoto + 12MP Ultra Wide',
      'Battery': '5000mAh',
      'Operating System': 'Android 14'
    },
    price: 1299,
    brand: 'Samsung',
    rating: 4.7,
    reviews: 3421,
    tags: ['android', 's-pen', 'camera', 'productivity', 'flagship', 'ai', 'stylus']
  },
  {
    id: '7',
    name: 'Sony WH-1000XM5',
    category: 'Headphones',
    description: 'Industry-leading noise canceling wireless headphones.',
    features: [
      'Industry-leading noise cancellation',
      '30-hour battery life',
      'Multipoint Bluetooth connection',
      'Speak-to-chat technology',
      'Touch sensor controls',
      'Quick Charge (3 min = 3 hours)',
      'LDAC audio codec support'
    ],
    specifications: {
      'Weight': '8.8 oz',
      'Battery Life': '30 hours',
      'Charging': 'USB-C',
      'Connectivity': 'Bluetooth 5.2',
      'Driver Size': '30mm',
      'Frequency Response': '4Hz-40kHz'
    },
    price: 399,
    brand: 'Sony',
    rating: 4.6,
    reviews: 7823,
    tags: ['noise cancelling', 'wireless', 'travel', 'premium', 'long battery', 'comfort']
  },
  {
    id: '8',
    name: 'AirPods Pro (2nd generation)',
    category: 'Headphones',
    description: 'Premium true wireless earbuds with adaptive transparency.',
    features: [
      'Active Noise Cancellation',
      'Adaptive Transparency',
      'Personalized Spatial Audio',
      'MagSafe Charging Case',
      'Touch control',
      'Sweat and water resistant',
      'Find My support'
    ],
    specifications: {
      'Weight': '0.19 oz each',
      'Battery Life': '6 hours + 24 hours with case',
      'Charging': 'Lightning/MagSafe/Wireless',
      'Connectivity': 'Bluetooth 5.3',
      'Water Resistance': 'IPX4'
    },
    price: 249,
    brand: 'Apple',
    rating: 4.7,
    reviews: 12847,
    tags: ['true wireless', 'noise cancelling', 'apple', 'compact', 'sport', 'wireless charging']
  },
  {
    id: '9',
    name: 'LG C3 OLED 55"',
    category: 'TVs',
    description: '4K OLED TV with perfect blacks and vibrant colors for entertainment.',
    features: [
      '4K OLED display',
      'Perfect black levels',
      'Dolby Vision IQ',
      'webOS smart platform',
      'HDMI 2.1 with VRR',
      'Game Optimizer',
      'Magic Remote'
    ],
    specifications: {
      'Screen Size': '55 inches',
      'Resolution': '4K (3840x2160)',
      'Panel Type': 'OLED',
      'Refresh Rate': '120Hz',
      'HDR': 'Dolby Vision, HDR10, HLG',
      'Smart Platform': 'webOS 23'
    },
    price: 1499,
    brand: 'LG',
    rating: 4.8,
    reviews: 2156,
    tags: ['oled', '4k', 'gaming', 'smart tv', 'hdr', 'entertainment', 'cinema']
  },
  {
    id: '10',
    name: 'iPad Pro 12.9" M2',
    category: 'Tablets',
    description: 'Professional tablet with M2 chip for creative and productive work.',
    features: [
      'Apple M2 chip',
      '12.9-inch Liquid Retina XDR display',
      'Apple Pencil (2nd gen) support',
      'Magic Keyboard support',
      'Thunderbolt/USB 4 support',
      'Face ID',
      'All-day battery life'
    ],
    specifications: {
      'Screen Size': '12.9 inches',
      'Processor': 'Apple M2',
      'RAM': '8GB',
      'Storage': '128GB',
      'Battery Life': '10 hours',
      'Operating System': 'iPadOS 17'
    },
    price: 1099,
    brand: 'Apple',
    rating: 4.6,
    reviews: 1876,
    tags: ['tablet', 'creative', 'productivity', 'apple pencil', 'professional', 'portable']
  },
  {
    id: '11',
    name: 'Microsoft Surface Pro 9',
    category: 'Tablets',
    description: '2-in-1 laptop tablet with versatile design for work and creativity.',
    features: [
      '12th Gen Intel Core processors',
      '13-inch PixelSense touchscreen',
      'Surface Pen support',
      'Type Cover compatibility',
      'Thunderbolt 4 ports',
      'Windows 11',
      'All-day battery'
    ],
    specifications: {
      'Screen Size': '13 inches',
      'Processor': 'Intel Core i7-1255U',
      'RAM': '16GB',
      'Storage': '256GB SSD',
      'Battery Life': '15.5 hours',
      'Operating System': 'Windows 11'
    },
    price: 1299,
    brand: 'Microsoft',
    rating: 4.4,
    reviews: 1432,
    tags: ['2-in-1', 'windows', 'productivity', 'stylus', 'professional', 'versatile']
  },
  {
    id: '12',
    name: 'Canon EOS R5',
    category: 'Cameras',
    description: 'Professional mirrorless camera with 8K video and advanced autofocus.',
    features: [
      '45MP full-frame CMOS sensor',
      '8K video recording',
      'Dual Pixel CMOS AF II',
      'In-body image stabilization',
      'Weather sealing',
      'Dual memory card slots',
      'Vari-angle touchscreen'
    ],
    specifications: {
      'Sensor': '45MP Full Frame',
      'Video': '8K/30p, 4K/120p',
      'ISO Range': '100-51200',
      'Autofocus Points': '1053',
      'Battery Life': '490 shots',
      'Weight': '1.62 lbs'
    },
    price: 3899,
    brand: 'Canon',
    rating: 4.8,
    reviews: 634,
    tags: ['professional', 'mirrorless', '8k video', 'photography', 'stabilization', 'weather sealed']
  },
  {
    id: '13',
    name: 'Apple Watch Series 9',
    category: 'Smartwatches',
    description: 'Advanced smartwatch with health monitoring and fitness tracking.',
    features: [
      'S9 SiP chip',
      'Double Tap gesture',
      'Blood oxygen monitoring',
      'ECG capability',
      'Always-On Retina display',
      'Water resistant to 50 meters',
      'Crash Detection'
    ],
    specifications: {
      'Display Size': '45mm',
      'Processor': 'S9 SiP',
      'Storage': '64GB',
      'Battery Life': '18 hours',
      'Water Resistance': '50 meters',
      'Operating System': 'watchOS 10'
    },
    price: 429,
    brand: 'Apple',
    rating: 4.7,
    reviews: 3241,
    tags: ['smartwatch', 'health', 'fitness', 'apple', 'waterproof', 'monitoring']
  },
  {
    id: '14',
    name: 'Samsung Galaxy Watch6 Classic',
    category: 'Smartwatches',
    description: 'Premium Android smartwatch with rotating bezel and health features.',
    features: [
      'Rotating bezel navigation',
      'Body composition analysis',
      'Sleep tracking',
      'GPS with turn-by-turn directions',
      'Water resistant',
      'Wear OS by Google',
      'Samsung Health integration'
    ],
    specifications: {
      'Display Size': '47mm',
      'Processor': 'Exynos W930',
      'RAM': '2GB',
      'Storage': '16GB',
      'Battery Life': '40 hours',
      'Water Resistance': '5ATM + IP68'
    },
    price: 429,
    brand: 'Samsung',
    rating: 4.5,
    reviews: 1876,
    tags: ['android', 'rotating bezel', 'health', 'fitness', 'wear os', 'premium']
  },
  {
    id: '15',
    name: 'Nintendo Switch OLED',
    category: 'Gaming',
    description: 'Hybrid gaming console with vibrant OLED display for portable and docked play.',
    features: [
      '7-inch OLED screen',
      'Enhanced audio',
      'Wide adjustable stand',
      'Dock with wired LAN port',
      '64GB internal storage',
      'Portable and docked modes',
      'Joy-Con controllers'
    ],
    specifications: {
      'Screen Size': '7 inches OLED',
      'Storage': '64GB',
      'Battery Life': '4.5-9 hours',
      'Resolution': '1280x720 (handheld), 1920x1080 (docked)',
      'Connectivity': 'Wi-Fi, Bluetooth'
    },
    price: 349,
    brand: 'Nintendo',
    rating: 4.8,
    reviews: 4523,
    tags: ['gaming', 'portable', 'oled', 'nintendo', 'hybrid', 'family', 'entertainment']
  }
];

// Helper function to search products
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return PRODUCT_CATALOG.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.features.some(feature => feature.toLowerCase().includes(lowercaseQuery)) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return PRODUCT_CATALOG.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return PRODUCT_CATALOG.find(product => product.id === id);
};
