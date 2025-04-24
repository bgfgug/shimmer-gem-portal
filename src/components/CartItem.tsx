
import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/utils/data';
import { formatCurrency } from '@/utils/helpers';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}) => {
  const handleIncrement = () => {
    if (item.quantity < item.stock) {
      onUpdateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const itemPrice = item.discountPrice || item.price;
  const itemTotal = itemPrice * item.quantity;

  return (
    <div className="flex py-6 border-b border-gray-200 last:border-0">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={item.images[0]} 
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{item.name}</h3>
          <p className="ml-4">{formatCurrency(itemTotal)}</p>
        </div>
        
        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center border border-gray-300 rounded-md">
            <Button 
              onClick={handleDecrement} 
              variant="ghost" 
              size="sm"
              disabled={item.quantity <= 1}
              className="px-2 h-8"
            >
              <Minus size={16} />
            </Button>
            
            <span className="px-4 py-1">{item.quantity}</span>
            
            <Button 
              onClick={handleIncrement} 
              variant="ghost" 
              size="sm"
              disabled={item.quantity >= item.stock}
              className="px-2 h-8"
            >
              <Plus size={16} />
            </Button>
          </div>
          
          <Button 
            onClick={() => onRemove(item.id)} 
            variant="ghost" 
            size="sm"
            className="text-gray-500 hover:text-red-500"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
