
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ProductDetailSkeleton } from '@/components/SkeletonLoader';
import { Product, jewelryProducts } from '@/utils/data';
import { formatCurrency } from '@/utils/helpers';
import { Minus, Plus, ShoppingCart, Heart, Share2, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [cartItems, setCartItems] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    const timer = setTimeout(() => {
      const foundProduct = jewelryProducts.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images[0]);
      }
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      // In a real app, you would update the cart in context/state management
      const newCartItems = [...cartItems];
      for (let i = 0; i < quantity; i++) {
        newCartItems.push(product.id);
      }
      setCartItems(newCartItems);
      
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} added to your cart`,
      });
    }
  };
  
  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (product && newQuantity >= 1 && newQuantity <= (product.stock || 10)) {
      setQuantity(newQuantity);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 pt-20">
          <ProductDetailSkeleton />
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 pt-20">
          <div className="container mx-auto py-16 px-4 text-center">
            <h1 className="text-2xl font-serif mb-4">Product Not Found</h1>
            <p className="mb-6 text-gray-600">
              Sorry, the product you are looking for could not be found.
            </p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
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
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to="/products" className="hover:text-gold transition-colors">Products</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link 
              to={`/products?category=${product.category}`} 
              className="hover:text-gold transition-colors capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-gray-800 truncate">{product.name}</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img 
                  src={selectedImage} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`aspect-square rounded-md overflow-hidden cursor-pointer ${
                      selectedImage === image ? 'ring-2 ring-gold' : ''
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2">
              <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">{product.rating} Rating</span>
              </div>
              
              <div className="mb-6">
                <div className="text-2xl font-semibold">
                  {formatCurrency(product.discountPrice || product.price)}
                </div>
                {product.discountPrice && (
                  <div className="flex items-center mt-1">
                    <span className="text-gray-500 line-through mr-2">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-sm bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                      Save {formatCurrency(product.price - product.discountPrice)}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="prose prose-sm max-w-none mb-6">
                <p>{product.description}</p>
              </div>
              
              {/* Features */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Features:</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              {/* Stock Status */}
              <div className="mb-6">
                <div className={`inline-flex items-center ${
                  product.stock > 5 
                    ? 'text-green-600'
                    : product.stock > 0
                      ? 'text-amber-600'
                      : 'text-red-600'
                }`}>
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    product.stock > 5 
                      ? 'bg-green-600'
                      : product.stock > 0
                        ? 'bg-amber-600'
                        : 'bg-red-600'
                  }`}></span>
                  {product.stock > 5 
                    ? 'In Stock'
                    : product.stock > 0
                      ? `Only ${product.stock} left`
                      : 'Out of Stock'
                  }
                </div>
              </div>
              
              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 border border-gray-300 rounded-l-md"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="px-4 py-1 border-t border-b border-gray-300 min-w-[3rem] text-center">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-2 border border-gray-300 rounded-r-md"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-gold hover:bg-amber-600 text-black"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </Button>
                
                <Button variant="outline" className="flex-1">
                  <Heart size={18} className="mr-2" />
                  Wishlist
                </Button>
                
                <Button variant="outline" size="icon">
                  <Share2 size={18} />
                </Button>
              </div>
              
              {/* Shipping Info */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Shipping & Returns</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Free shipping on orders above ₹5,000</li>
                  <li>5-7 business days for delivery</li>
                  <li>30-day returns policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
