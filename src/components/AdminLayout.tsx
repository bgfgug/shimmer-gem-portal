
import React from 'react';
import AdminSidebar from './AdminSidebar';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-6">
            <h1 className="text-xl font-medium">{title}</h1>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-64 pr-8"
                />
                <Search 
                  size={18} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  3
                </span>
              </Button>
              
              <div className="flex items-center">
                <div className="rounded-full bg-gray-200 p-1">
                  <User size={20} />
                </div>
                <span className="ml-2 hidden md:inline-block">Admin</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
