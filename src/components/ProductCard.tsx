
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/utils/data';
import { formatCurrency } from '@/utils/helpers';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product,
  onAddToCart,
  onAddToWishlist
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover group">
      <div className="relative h-64 overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        
        {/* Quick action buttons */}
        <div className="absolute right-2 top-2 space-y-2">
          <Button 
            size="icon" 
            variant="outline" 
            className="bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onAddToWishlist}
          >
            <Heart size={16} className="text-gray-600" />
          </Button>
        </div>
        
        {product.isNew && (
          <Badge className="absolute top-2 left-2 bg-jewel-emerald text-white">
            New
          </Badge>
        )}
        
        {product.isTrending && (
          <Badge className="absolute top-2 left-2 bg-jewel-ruby text-white">
            Trending
          </Badge>
        )}
        
        {product.stock <= 5 && product.stock > 0 && (
          <Badge className="absolute bottom-2 left-2 bg-amber-600 text-white">
            Only {product.stock} left
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-serif font-medium text-lg mb-1 hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex justify-between items-center mt-2">
          <div>
            <div className="font-semibold text-gray-900">
              {formatCurrency(product.discountPrice || product.price)}
            </div>
            
            {product.discountPrice && (
              <div className="text-sm text-gray-500 line-through">
                {formatCurrency(product.price)}
              </div>
            )}
          </div>
          
          <Button 
            size="sm" 
            onClick={onAddToCart}
            variant="outline"
            className="bg-white hover:bg-gold hover:text-white transition-colors"
          >
            <ShoppingCart size={16} className="mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
