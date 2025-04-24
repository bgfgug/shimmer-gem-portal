
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  to, 
  icon, 
  label, 
  isActive,
  isCollapsed 
}) => (
  <Link to={to}>
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start mb-1",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      {icon}
      {!isCollapsed && <span className="ml-2">{label}</span>}
    </Button>
  </Link>
);

const AdminSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div 
      className={cn(
        "h-screen bg-sidebar transition-all duration-300 flex flex-col border-r border-sidebar-border",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <h1 className="text-xl font-serif font-bold text-gold">
            BharatJewel
          </h1>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-2">
          <SidebarLink 
            to="/admin" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            isActive={isActive('/admin')}
            isCollapsed={isCollapsed}
          />
          <SidebarLink 
            to="/admin/products" 
            icon={<Package size={20} />} 
            label="Products" 
            isActive={isActive('/admin/products')}
            isCollapsed={isCollapsed}
          />
          <SidebarLink 
            to="/admin/orders" 
            icon={<ShoppingCart size={20} />} 
            label="Orders" 
            isActive={isActive('/admin/orders')}
            isCollapsed={isCollapsed}
          />
          <SidebarLink 
            to="/admin/customers" 
            icon={<Users size={20} />} 
            label="Customers" 
            isActive={isActive('/admin/customers')}
            isCollapsed={isCollapsed}
          />
          <SidebarLink 
            to="/admin/settings" 
            icon={<Settings size={20} />} 
            label="Settings" 
            isActive={isActive('/admin/settings')}
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>
      
      <div className="p-3 border-t border-sidebar-border">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          )}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
