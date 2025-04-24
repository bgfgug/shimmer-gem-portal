
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/utils/helpers';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sales Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <TrendingUp size={16} className="text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,45,230</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium inline-flex items-center">
                +18% <ArrowUpRight size={14} />
              </span>
              {" "}from last month
            </p>
            <Progress value={78} className="h-1 mt-3" />
          </CardContent>
        </Card>
        
        {/* Orders Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Orders
            </CardTitle>
            <ShoppingCart size={16} className="text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">168</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium inline-flex items-center">
                +12% <ArrowUpRight size={14} />
              </span>
              {" "}from last month
            </p>
            <Progress value={65} className="h-1 mt-3" />
          </CardContent>
        </Card>
        
        {/* Products Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Products
            </CardTitle>
            <Package size={16} className="text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-500 font-medium inline-flex items-center">
                -2% <ArrowDownRight size={14} />
              </span>
              {" "}from last month
            </p>
            <Progress value={45} className="h-1 mt-3" />
          </CardContent>
        </Card>
        
        {/* Customers Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Customers
            </CardTitle>
            <Users size={16} className="text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">325</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium inline-flex items-center">
                +5% <ArrowUpRight size={14} />
              </span>
              {" "}from last month
            </p>
            <Progress value={62} className="h-1 mt-3" />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'ORD4912', customer: 'Aryan Patel', status: 'delivered', amount: 15999 },
                    { id: 'ORD4911', customer: 'Priya Sharma', status: 'processing', amount: 7999 },
                    { id: 'ORD4910', customer: 'Vikram Singh', status: 'shipped', amount: 12999 },
                    { id: 'ORD4909', customer: 'Ananya Desai', status: 'pending', amount: 9999 },
                    { id: 'ORD4908', customer: 'Rajat Verma', status: 'delivered', amount: 19999 },
                  ].map((order, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'processing' ? 'bg-amber-100 text-amber-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {formatCurrency(order.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Best Selling Products */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Best Selling Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Stock</th>
                    <th className="text-right py-3 px-4">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Royal Rajasthani Kundan Necklace', category: 'Necklaces', stock: 15, sales: 28 },
                    { name: 'Temple Gold Jhumkas', category: 'Earrings', stock: 18, sales: 24 },
                    { name: 'Traditional Polki Choker', category: 'Necklaces', stock: 5, sales: 22 },
                    { name: 'Emerald Cut Diamond Ring', category: 'Rings', stock: 10, sales: 19 },
                    { name: 'Classic Diamond Studs', category: 'Earrings', stock: 25, sales: 16 },
                  ].map((product, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          product.stock > 10 ? 'bg-green-100 text-green-800' : 
                          product.stock > 5 ? 'bg-amber-100 text-amber-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock} left
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {product.sales} units
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
