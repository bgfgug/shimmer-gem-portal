
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import OrderTracker from '@/components/OrderTracker';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Order, CartItem as CartItemType, jewelryProducts } from '@/utils/data';
import { getRandomDeliveryDate } from '@/utils/helpers';

const OrderTracking: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('id');
  
  const [orderIdInput, setOrderIdInput] = useState(orderId || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const searchOrder = (id: string) => {
    if (!id.trim()) {
      setError('Please enter an order ID');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call
      if (id === orderId || Math.random() > 0.3) { // 70% success rate for demo
        const mockItems: CartItemType[] = [
          { ...jewelryProducts[0], quantity: 1 },
          { ...jewelryProducts[2], quantity: 2 }
        ];
        
        const statuses = ['pending', 'processing', 'shipped', 'delivered'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        const mockOrder: Order = {
          id: id || 'ORD123456',
          customerId: 'CUST123',
          items: mockItems,
          status: randomStatus as any,
          shippingAddress: {
            fullName: 'Aryan Sharma',
            addressLine1: '123 Main Street',
            addressLine2: 'Apartment 4B',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400001',
            country: 'India',
            phone: '+91 9876543210'
          },
          paymentMethod: 'card',
          paymentStatus: 'completed',
          totalAmount: mockItems.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0) * 1.18,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          trackingNumber: randomStatus !== 'pending' ? 'TRK' + Math.floor(Math.random() * 1000000) : undefined,
          estimatedDelivery: randomStatus !== 'pending' ? getRandomDeliveryDate() : undefined
        };
        
        setOrder(mockOrder);
        setError('');
      } else {
        setOrder(null);
        setError('Order not found. Please check the order ID and try again.');
      }
      
      setLoading(false);
    }, 1500);
  };
  
  useEffect(() => {
    if (orderId) {
      searchOrder(orderId);
    }
  }, [orderId]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchOrder(orderIdInput);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-serif mb-4">Track Your Order</h1>
          <p className="text-gray-600 mb-8">
            Enter your order ID to check the current status and estimated delivery date.
          </p>
          
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
              <Input
                type="text"
                placeholder="Enter Order ID (e.g., ORD123456)"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={loading} className="bg-gold hover:bg-amber-600 text-black">
                {loading ? 'Searching...' : 'Track'}
                {!loading && <Search size={16} className="ml-2" />}
              </Button>
            </form>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            
            {loading ? (
              <div className="animate-pulse bg-gray-100 rounded-lg h-64"></div>
            ) : order ? (
              <OrderTracker order={order} />
            ) : !error && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">Enter Your Order ID</h3>
                <p className="text-gray-500">
                  Enter the order ID from your confirmation email to track your package.
                </p>
              </div>
            )}
            
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Where can I find my Order ID?</h4>
                  <p className="text-gray-600 text-sm">
                    Your Order ID can be found in the order confirmation email sent to you after placing an order.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">How long does shipping take?</h4>
                  <p className="text-gray-600 text-sm">
                    Domestic orders typically take 5-7 business days. International orders may take 10-14 business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">What if I have issues with my order?</h4>
                  <p className="text-gray-600 text-sm">
                    Please <a href="/contact" className="text-gold hover:underline">contact our customer support</a>  
                    team with your Order ID ready, and we'll be happy to assist.
                  </p>
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

export default OrderTracking;
