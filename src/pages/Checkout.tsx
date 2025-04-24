
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/CheckoutForm';
import { CheckoutSkeleton } from '@/components/SkeletonLoader';
import { CartItem as CartItemType, jewelryProducts } from '@/utils/data';
import { calculateSubtotal, calculateTotal, formatCurrency, generateRandomOrderId } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingOrder, setProcessingOrder] = useState(false);
  
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
  
  const subtotal = calculateSubtotal(cartItems);
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 5000 ? 0 : 250;
  const total = calculateTotal(subtotal, shipping);
  
  const handleFormSubmit = (values: any) => {
    setProcessingOrder(true);
    
    // Simulate API call
    setTimeout(() => {
      setProcessingOrder(false);
      
      const orderId = generateRandomOrderId();
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${orderId} has been placed.`,
      });
      
      // Redirect to order confirmation page
      navigate(`/order-tracking?id=${orderId}`);
    }, 2000);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 pt-20">
          <CheckoutSkeleton />
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
          <h1 className="text-3xl font-serif mb-8">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="lg:w-2/3">
              <CheckoutForm 
                onSubmit={handleFormSubmit} 
              />
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                {/* Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-start">
                      <img 
                        src={item.images[0]} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-sm">
                        {formatCurrency((item.discountPrice || item.price) * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Cost breakdown */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GST (18%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
