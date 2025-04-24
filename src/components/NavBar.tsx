
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Search,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavBarProps {
  cartItemsCount?: number;
}

const NavBar: React.FC<NavBarProps> = ({ cartItemsCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
  };

  return (
    <header 
      className={`fixed w-full z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl md:text-2xl font-serif font-bold text-deepPurple">
              Bharat<span className="text-gold">Jewel</span>
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link to="/" className="nav-link hover-gold">Home</Link>
            <Link to="/products" className="nav-link hover-gold">Collections</Link>
            <Link to="/products?category=necklaces" className="nav-link hover-gold">Necklaces</Link>
            <Link to="/products?category=earrings" className="nav-link hover-gold">Earrings</Link>
            <Link to="/products?category=rings" className="nav-link hover-gold">Rings</Link>
            <Link to="/order-tracking" className="nav-link hover-gold">Track Order</Link>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 rounded-full pr-8"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Search size={16} />
              </button>
            </form>
            
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart size={20} />
              </Button>
            </Link>
            
            <Link to="/account">
              <Button variant="ghost" size="icon">
                <User size={20} />
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="ghost" size="sm">
                <ShoppingBag size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white absolute left-0 right-0 top-full shadow-lg py-4 px-4 animated fade-in-down z-50">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full pr-8"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>
            
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="nav-link hover-gold py-2">Home</Link>
              <Link to="/products" className="nav-link hover-gold py-2">Collections</Link>
              <Link to="/products?category=necklaces" className="nav-link hover-gold py-2">Necklaces</Link>
              <Link to="/products?category=earrings" className="nav-link hover-gold py-2">Earrings</Link>
              <Link to="/products?category=rings" className="nav-link hover-gold py-2">Rings</Link>
              <Link to="/order-tracking" className="nav-link hover-gold py-2">Track Order</Link>
              <Link to="/account" className="nav-link hover-gold py-2">My Account</Link>
              <Link to="/wishlist" className="nav-link hover-gold py-2">Wishlist</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
