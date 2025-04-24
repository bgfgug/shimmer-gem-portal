
import { Product, CartItem } from "./data";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const calculateDiscount = (original: number, discounted: number | undefined): string => {
  if (!discounted) return "0%";
  
  const discount = ((original - discounted) / original) * 100;
  return `${Math.round(discount)}%`;
};

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const itemPrice = item.discountPrice || item.price;
    return total + (itemPrice * item.quantity);
  }, 0);
};

export const calculateTax = (subtotal: number): number => {
  return subtotal * 0.18; // 18% GST
};

export const calculateTotal = (subtotal: number, shipping: number = 0): number => {
  const tax = calculateTax(subtotal);
  return subtotal + tax + shipping;
};

export const getOrderStatusStep = (status: string): number => {
  switch(status) {
    case 'pending': return 0;
    case 'processing': return 1;
    case 'shipped': return 2;
    case 'delivered': return 3;
    case 'cancelled': return -1;
    default: return 0;
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export function getRandomDeliveryDate(): string {
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + Math.floor(Math.random() * 10) + 3);
  
  return deliveryDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function generateRandomOrderId(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function filterProducts(products: Product[], filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  searchQuery?: string;
}): Product[] {
  return products.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // Price range filter
    if (filters.minPrice && (product.discountPrice || product.price) < filters.minPrice) {
      return false;
    }
    
    if (filters.maxPrice && (product.discountPrice || product.price) > filters.maxPrice) {
      return false;
    }
    
    // In stock filter
    if (filters.inStock && product.stock <= 0) {
      return false;
    }
    
    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return product.name.toLowerCase().includes(query) || 
             product.description.toLowerCase().includes(query) ||
             product.category.toLowerCase().includes(query);
    }
    
    return true;
  });
}
