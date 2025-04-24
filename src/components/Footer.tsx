
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer: React.FC = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="bg-deepPurple text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-gold">BharatJewel</h3>
            <p className="mb-4 text-gray-300">
              Exquisite Indian jewelry crafted with tradition and passion. From timeless classics to contemporary designs, our pieces celebrate the rich heritage of Indian craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-serif mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-gold transition-colors">Collections</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/order-tracking" className="text-gray-300 hover:text-gold transition-colors">Track Order</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-gold transition-colors">Blog</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-lg font-serif mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-gold transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-gold transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/warranty" className="text-gray-300 hover:text-gold transition-colors">Warranty & Repairs</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-gold transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-gold transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-serif mb-4">Newsletter</h3>
            <p className="mb-4 text-gray-300">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-deepPurple border-gray-600 text-white placeholder:text-gray-400"
                required
              />
              <Button type="submit" className="w-full bg-gold hover:bg-amber-600 text-black">
                Subscribe
              </Button>
            </form>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} />
                <span>contact@bharatjewel.com</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Jewelry Lane, Mumbai, Maharashtra 400001, India</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© 2025 BharatJewel. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <img src="https://dummyimage.com/240x30/ccc/666&text=Payment+Methods" alt="Payment Methods" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
