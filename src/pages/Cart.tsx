
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType, jewelryProducts } from '@/utils/data';
import { calculateSubtotal, calculateTotal, formatCurrency } from '@/utils/helpers';
import { ArrowRight, ShoppingCart } from 'lucide-react';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading cart data
    setLoading(true);
    
    const timer = setTimeout(() => {
      // In a real app, this would come from context/API
      const mockCartItems: CartItemType[] = [
        { ...jewelryProducts[0], quantity: 1 },
        { ...jewelryProducts[2], quantity: 2 }
      ];
      
      setCartItems(mockCartItems);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const subtotal = calculateSubtotal(cartItems);
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 5000 ? 0 : 250;
  const total = calculateTotal(subtotal, shipping);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 pt-20">
          <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-serif mb-8">Your Cart</h1>
            <div className="animate-pulse">
              <div className="h-24 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-24 bg-gray-200 rounded-md mb-4"></div>
              <div className="w-1/3 h-8 bg-gray-200 rounded-md mt-8"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar cartItemsCount={cartItems.length} />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-serif mb-8">Your Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  {cartItems.map(item => (
                    <CartItem 
                      key={item.id} 
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (18%)</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                    </div>
                    
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                      {subtotal < 5000 && (
                        <p className="text-xs text-gray-500 mt-1">
                          Add {formatCurrency(5000 - subtotal)} more to get free shipping
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Button asChild className="w-full bg-gold hover:bg-amber-600 text-black">
                    <Link to="/checkout">
                      Proceed to Checkout
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <Link 
                      to="/products" 
                      className="text-sm text-gold hover:underline"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart size={24} className="text-gray-400" />
              </div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added any jewelry to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products">
                  Start Shopping
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
