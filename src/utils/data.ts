
export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  discountPrice?: number;
  description: string;
  features: string[];
  images: string[];
  rating: number;
  stock: number;
  isNew?: boolean;
  isTrending?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
}

export const categories = [
  { id: 'necklaces', name: 'Necklaces' },
  { id: 'earrings', name: 'Earrings' },
  { id: 'bracelets', name: 'Bracelets' },
  { id: 'rings', name: 'Rings' },
  { id: 'anklets', name: 'Anklets' },
  { id: 'mangalsutras', name: 'Mangalsutras' },
  { id: 'nosepins', name: 'Nose Pins' }
];

export const jewelryProducts: Product[] = [
  {
    id: '1',
    name: 'Royal Rajasthani Kundan Necklace',
    category: 'necklaces',
    subcategory: 'kundan',
    price: 12999,
    description: 'This exquisite Kundan necklace is handcrafted using traditional Rajasthani techniques. The design features intricate gold work with embedded precious stones, perfect for weddings and special occasions.',
    features: ['Handcrafted', '22K gold plated', 'Semi-precious stones', 'Kundan work'],
    images: [
      'https://images.unsplash.com/photo-1611085583191-a3b181a88558',
      'https://images.unsplash.com/photo-1601821765780-754fa98637c1'
    ],
    rating: 4.8,
    stock: 15,
    isTrending: true
  },
  {
    id: '2',
    name: 'Classic Diamond Studs',
    category: 'earrings',
    subcategory: 'diamond',
    price: 8999,
    description: 'Timeless diamond stud earrings set in 18K white gold. These versatile earrings add elegance to any outfit, day or night.',
    features: ['18K white gold', 'VVS clarity diamonds', 'Secure screw backs'],
    images: [
      'https://images.unsplash.com/photo-1574105760595-99347b0999fc', 
      'https://images.unsplash.com/photo-1535556116002-6281ff3e9f36'
    ],
    rating: 4.9,
    stock: 25
  },
  {
    id: '3',
    name: 'Temple Gold Jhumkas',
    category: 'earrings',
    subcategory: 'jhumka',
    price: 6999,
    description: 'Traditional South Indian temple-style jhumkas with intricate craftsmanship. These statement earrings feature delicate temple motifs with hanging pearl accents.',
    features: ['Temple design', 'Gold plated', 'Pearl accents', 'Lightweight'],
    images: [
      'https://images.unsplash.com/photo-1588444650733-d2624a5214ea',
      'https://images.unsplash.com/photo-1575863438355-d74dd18fd3e4'
    ],
    rating: 4.7,
    stock: 18,
    isNew: true
  },
  {
    id: '4',
    name: 'Emerald Cut Diamond Ring',
    category: 'rings',
    subcategory: 'diamond',
    price: 15999,
    description: 'An elegant emerald-cut diamond ring set in platinum. The minimalist design places focus on the stunning center stone, creating a sophisticated and timeless piece.',
    features: ['Platinum band', 'Emerald cut diamond', 'Side accent stones', 'Custom sizing available'],
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f'
    ],
    rating: 4.9,
    stock: 10,
    isTrending: true
  },
  {
    id: '5',
    name: 'Ruby and Gold Bangles Set',
    category: 'bracelets',
    subcategory: 'bangles',
    price: 9999,
    description: 'A set of six intricately designed gold-plated bangles with ruby accents. Perfect for special occasions and traditional wear.',
    features: ['Set of 6', 'Gold-plated brass', 'Ruby accents', 'Adjustable size'],
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a',
      'https://images.unsplash.com/photo-1608050072262-7b26ba63fb46'
    ],
    rating: 4.6,
    stock: 20
  },
  {
    id: '6',
    name: 'Traditional Polki Choker',
    category: 'necklaces',
    subcategory: 'choker',
    price: 19999,
    description: 'A luxurious polki choker necklace featuring uncut diamonds set in 22K gold. This piece represents the finest of Indian craftsmanship, perfect for bridal wear.',
    features: ['22K gold', 'Uncut diamonds', 'Ruby and emerald accents', 'Adjustable chain'],
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e'
    ],
    rating: 4.9,
    stock: 5,
    isTrending: true
  },
  {
    id: '7',
    name: 'Pearl and Gold Mangalsutra',
    category: 'mangalsutras',
    subcategory: 'traditional',
    price: 7999,
    description: 'An elegant mangalsutra featuring freshwater pearls and a gold pendant. This modern take on the traditional symbol combines elegance with cultural significance.',
    features: ['Freshwater pearls', '18K gold pendant', 'Adjustable black cord', 'Lightweight design'],
    images: [
      'https://images.unsplash.com/photo-1611241893603-3c359704e0ee',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f'
    ],
    rating: 4.8,
    stock: 15,
    isNew: true
  },
  {
    id: '8',
    name: 'Silver Payal with Bells',
    category: 'anklets',
    subcategory: 'payal',
    price: 2999,
    description: 'Traditional silver anklets with tiny bells that create a pleasant tinkling sound with movement. Handcrafted with intricate designs.',
    features: ['Pure silver', 'Tiny bells', 'Adjustable size', 'Traditional motifs'],
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1',
      'https://images.unsplash.com/photo-1599643477414-63f6b5c0abcf'
    ],
    rating: 4.5,
    stock: 30
  }
];

export const featuredProducts = jewelryProducts.filter(p => p.isTrending);

export const newArrivals = jewelryProducts.filter(p => p.isNew);
