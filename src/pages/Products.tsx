
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import JewelryFilter from '@/components/JewelryFilter';
import { ProductCardSkeleton } from '@/components/SkeletonLoader';
import { Product, jewelryProducts } from '@/utils/data';
import { filterProducts } from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

const Products: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    category: categoryParam || undefined,
    minPrice: 0,
    maxPrice: 20000,
    inStock: false,
    searchQuery: ''
  });
  
  useEffect(() => {
    // Update category from URL parameters
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [categoryParam]);
  
  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    const timer = setTimeout(() => {
      const filteredProducts = filterProducts(jewelryProducts, filters);
      setProducts(filteredProducts);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [filters]);
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  const handleAddToCart = (productId: string) => {
    setCartItems(prev => [...prev, productId]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar cartItemsCount={cartItems.length} />
      
      <main className="flex-1 pt-20">
        {/* Page Header */}
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-serif">
              {filters.category ? 
                `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}` : 
                'All Jewelry'}
            </h1>
            <p className="text-gray-600">
              {loading ? 'Loading products...' : `Showing ${products.length} products`}
            </p>
          </div>
        </div>
        
        {/* Mobile Filter Toggle */}
        <div className="container mx-auto px-4 py-4 md:hidden">
          <Button 
            variant="outline" 
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="w-full justify-between"
          >
            <span className="flex items-center">
              <Filter size={16} className="mr-2" />
              Filters
            </span>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
              {Object.values(filters).filter(v => v !== undefined && v !== '' && v !== false).length}
            </span>
          </Button>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filter */}
            <div className={`md:w-64 flex-shrink-0 ${mobileFilterOpen ? 'block fixed inset-0 z-50 bg-white p-4 overflow-auto' : 'hidden md:block'}`}>
              {mobileFilterOpen && (
                <div className="flex justify-between items-center mb-4 md:hidden">
                  <h3 className="font-medium text-lg">Filters</h3>
                  <Button 
                    variant="ghost" 
                    onClick={() => setMobileFilterOpen(false)}
                    size="icon"
                  >
                    <X size={18} />
                  </Button>
                </div>
              )}
              
              <JewelryFilter 
                onFilterChange={handleFilterChange}
                initialValues={filters}
              />
            </div>
            
            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      onAddToCart={() => handleAddToCart(product.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilters({
                      category: undefined,
                      minPrice: 0,
                      maxPrice: 20000,
                      inStock: false,
                      searchQuery: ''
                    })}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
