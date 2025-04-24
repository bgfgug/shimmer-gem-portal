
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { categories } from '@/utils/data';

interface FilterValues {
  category?: string;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
  searchQuery: string;
}

interface JewelryFilterProps {
  onFilterChange: (filters: FilterValues) => void;
  initialValues?: FilterValues;
}

const JewelryFilter: React.FC<JewelryFilterProps> = ({ 
  onFilterChange,
  initialValues = {
    minPrice: 0,
    maxPrice: 20000,
    inStock: false,
    searchQuery: ''
  }
}) => {
  const [filters, setFilters] = useState<FilterValues>(initialValues);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  const handleCategoryClick = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === categoryId ? undefined : categoryId
    }));
  };

  const handlePriceChange = (values: number[]) => {
    setFilters(prev => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1]
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: e.target.value
    }));
  };

  const handleInStockChange = (checked: boolean | string) => {
    setFilters(prev => ({
      ...prev,
      inStock: checked as boolean
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
    if (window.innerWidth < 768) {
      setIsFilterVisible(false);
    }
  };

  const resetFilters = () => {
    const resetValues = {
      category: undefined,
      minPrice: 0,
      maxPrice: 20000,
      inStock: false,
      searchQuery: ''
    };
    setFilters(resetValues);
    onFilterChange(resetValues);
  };

  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-serif">Filters</h3>
        
        {/* Mobile toggle */}
        <div className="flex md:hidden">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            {isFilterVisible ? <X size={18} /> : <Filter size={18} />}
          </Button>
        </div>
      </div>
      
      <div className={`${isFilterVisible || window.innerWidth >= 768 ? 'block' : 'hidden'} md:block`}>
        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search jewelry..."
              value={filters.searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>
        
        {/* Categories */}
        <div className="p-4 border-b">
          <h4 className="font-medium mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={filters.category === category.id ? "default" : "outline"}
                size="sm"
                className={`mr-2 mb-2 ${
                  filters.category === category.id ? 'bg-gold text-white' : ''
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Price Range */}
        <div className="p-4 border-b">
          <h4 className="font-medium mb-3">Price Range</h4>
          <Slider 
            defaultValue={[filters.minPrice, filters.maxPrice]} 
            min={0} 
            max={20000} 
            step={500} 
            onValueChange={handlePriceChange}
            className="my-6"
          />
          <div className="flex justify-between items-center">
            <span>₹{filters.minPrice.toLocaleString()}</span>
            <span>₹{filters.maxPrice.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Availability */}
        <div className="p-4 border-b">
          <h4 className="font-medium mb-3">Availability</h4>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="inStock" 
              checked={filters.inStock}
              onCheckedChange={handleInStockChange}
            />
            <label 
              htmlFor="inStock" 
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              In Stock Only
            </label>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="p-4 flex space-x-2">
          <Button onClick={applyFilters} className="flex-1 bg-gold hover:bg-amber-600 text-white">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={resetFilters} className="flex-1">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JewelryFilter;
