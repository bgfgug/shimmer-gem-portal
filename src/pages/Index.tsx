
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/SkeletonLoader';
import { categories, featuredProducts, newArrivals } from '@/utils/data';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddToCart = (productId: string) => {
    setCartItems(prev => [...prev, productId]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar cartItemsCount={cartItems.length} />
      
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24">
        <div className="relative h-[80vh] bg-gradient-to-b from-deepPurple via-deepPurple to-black flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1601821765780-754fa98637c1"
              alt="Luxury Indian Jewelry"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          
          <div className="container mx-auto px-4 z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-6">
                Timeless Beauty, <br />
                <span className="text-gold">Indian Heritage</span>
              </h1>
              <p className="text-lg text-gray-200 mb-8 max-w-lg">
                Explore our exquisite collection of handcrafted jewelry that celebrates 
                India's rich artistic traditions and cultural heritage.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gold hover:bg-amber-600 text-black">
                  <Link to="/products">
                    Shop Collection
                    <ChevronRight size={20} className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  <Link to="/about">
                    Our Story
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-3">Explore Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our diverse collection of traditional and contemporary Indian jewelry 
              pieces crafted to perfection.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-lg h-48 md:h-64 bg-deepPurple"
              >
                <img
                  src={`https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?category=${category.id}`}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4">
                  <h3 className="text-lg md:text-xl text-white font-serif group-hover:text-gold transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif">Featured Products</h2>
            <Link to="/products" className="text-gold flex items-center hover:underline">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : (
              featuredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={() => handleAddToCart(product.id)}
                />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif">New Arrivals</h2>
            <Link to="/products?filter=new" className="text-gold flex items-center hover:underline">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : (
              newArrivals.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onAddToCart={() => handleAddToCart(product.id)}
                />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif mb-3">Customer Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear what our customers have to say about their BharatJewel experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                comment: "The craftsmanship is exceptional! I purchased a kundan necklace for my wedding and received countless compliments."
              },
              {
                name: "Aditya Patel",
                location: "Delhi",
                comment: "I bought a pair of diamond earrings for my wife's birthday. The quality is outstanding and the packaging was luxurious."
              },
              {
                name: "Meera Reddy",
                location: "Bangalore",
                comment: "BharatJewel offers truly authentic Indian designs. The temple jewelry I purchased is both traditional and contemporary."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-cream rounded-lg p-6 shadow-md">
                <div className="mb-4">
                  <div className="flex space-x-1">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-800 mb-4">"{testimonial.comment}"</p>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-deepPurple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-4">Join Our Community</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Subscribe to receive exclusive offers, early access to new collections, and jewelry care tips.
          </p>
          
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-md border-2 border-gold bg-transparent focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
            <Button className="bg-gold hover:bg-amber-600 text-black">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
