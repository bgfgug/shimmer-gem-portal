
import React from 'react';
import { Check, Clock, TruckIcon, PackageCheck, X } from 'lucide-react';
import { Order } from '@/utils/data';
import { formatCurrency } from '@/utils/helpers';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface OrderTrackerProps {
  order?: Order | null;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ order }) => {
  if (!order) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No order information available.</p>
      </div>
    );
  }
  
  const getStatusStep = () => {
    switch(order.status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      case 'cancelled': return -1;
      default: return 0;
    }
  };
  
  const currentStep = getStatusStep();
  const progressPercentage = 
    currentStep === -1 ? 0 : (currentStep / 3) * 100;
  
  const isCancelled = order.status === 'cancelled';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium mb-1">Order #{order.id}</h3>
            <p className="text-gray-500 text-sm">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN')}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
              isCancelled ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
            )}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </div>
          </div>
        </div>
        
        {isCancelled ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <X className="h-5 w-5 text-red-500 mr-2" />
              <div>
                <h4 className="font-medium text-red-800">Order Cancelled</h4>
                <p className="text-sm text-red-600">
                  This order has been cancelled. If you have any questions, please contact customer support.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <Progress value={progressPercentage} className="h-2 mb-6" />
            
            <div className="grid grid-cols-4 gap-2">
              <div className={`flex flex-col items-center ${currentStep >= 0 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 0 ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Clock size={16} />
                </div>
                <span className="text-xs text-center">Ordered</span>
              </div>
              
              <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 1 ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <PackageCheck size={16} />
                </div>
                <span className="text-xs text-center">Processing</span>
              </div>
              
              <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 2 ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <TruckIcon size={16} />
                </div>
                <span className="text-xs text-center">Shipped</span>
              </div>
              
              <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 3 ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Check size={16} />
                </div>
                <span className="text-xs text-center">Delivered</span>
              </div>
            </div>
          </div>
        )}
        
        {order.trackingNumber && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-medium mb-1">Tracking Information</h4>
            <p className="text-sm mb-1">Tracking Number: <span className="font-medium">{order.trackingNumber}</span></p>
            {order.estimatedDelivery && (
              <p className="text-sm">
                Estimated Delivery: <span className="font-medium">{order.estimatedDelivery}</span>
              </p>
            )}
          </div>
        )}
        
        <h4 className="font-medium mb-4">Order Summary</h4>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-start">
              <img 
                src={item.images[0]} 
                alt={item.name} 
                className="h-16 w-16 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <h5 className="font-medium">{item.name}</h5>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t mt-6 pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>{formatCurrency(order.totalAmount * 0.82)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>GST (18%)</span>
            <span>{formatCurrency(order.totalAmount * 0.18)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Shipping</span>
            <span>{formatCurrency(0)}</span>
          </div>
          <div className="flex justify-between font-medium text-base mt-2 pt-2 border-t">
            <span>Total</span>
            <span>{formatCurrency(order.totalAmount)}</span>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <h4 className="font-medium mb-2">Shipping Address</h4>
          <address className="not-italic text-sm text-gray-600">
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
          </address>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4">
        <p className="text-sm text-gray-500">
          Need help with this order?{" "}
          <a href="/contact" className="text-gold hover:text-amber-600">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default OrderTracker;
