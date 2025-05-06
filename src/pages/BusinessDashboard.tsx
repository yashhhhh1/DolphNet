
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import { SalesChart, CategoryChart } from "@/components/Dashboard/Chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  DollarSign, 
  TrendingUp,
  BarChart3,
  ShoppingCart
} from "lucide-react";
import { 
  mockSalesData, 
  mockCategorySales, 
  mockBusinessStats, 
  mockTopProducts 
} from "@/utils/mockData";

const BusinessDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = sessionStorage.getItem('currentUser');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    navigate('/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="business" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onLogout={handleLogout} />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Business Overview</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}. Here's your business performance at a glance.
            </p>
          </div>
          
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-dolphin-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${mockBusinessStats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-green-600">
                    +{mockBusinessStats.revenueIncrease}% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-dolphin-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${mockBusinessStats.averageOrderValue}</div>
                  <p className="text-xs text-green-600">
                    +{mockBusinessStats.aovIncrease}% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-dolphin-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockBusinessStats.conversionRate}%</div>
                  <p className="text-xs text-green-600">
                    +{mockBusinessStats.conversionIncrease}% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <BarChart3 className="h-4 w-4 text-dolphin-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockBusinessStats.totalOrders}</div>
                  <p className="text-xs text-green-600">
                    +{mockBusinessStats.ordersIncrease}% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SalesChart data={mockSalesData} />
              <CategoryChart categoryData={mockCategorySales} />
            </div>
            
            {/* Top Products Table */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Top Performing Products</h2>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 dark:bg-navy-900">
                      <TableHead className="w-[100px]">Image</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Units Sold</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTopProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="py-2">
                          <div className="h-12 w-12 rounded-md bg-slate-100 overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{product.unitsSold}</TableCell>
                        <TableCell className="text-right">${(product.price * product.unitsSold).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            {/* AI Insights */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>AI-Powered Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="bg-blue-50 p-3 rounded-md text-blue-800">
                    <p className="font-medium">Stock Optimization</p>
                    <p className="text-sm mt-1">
                      Consider reducing inventory for "Tech Mesh Walking Shoes" as they're showing 15% lower sales than last month.
                    </p>
                  </li>
                  <li className="bg-green-50 p-3 rounded-md text-green-800">
                    <p className="font-medium">Growth Opportunity</p>
                    <p className="text-sm mt-1">
                      The "Running" category is trending up 23% this month. Consider increasing marketing spend for these products.
                    </p>
                  </li>
                  <li className="bg-amber-50 p-3 rounded-md text-amber-800">
                    <p className="font-medium">Price Optimization</p>
                    <p className="text-sm mt-1">
                      Your "Aqua Formal Leather Oxfords" are priced 12% higher than market average. Consider a price adjustment to increase sales volume.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
