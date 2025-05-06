
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import StatsCards from "@/components/Dashboard/StatsCards";
import { SalesChart, CategoryChart } from "@/components/Dashboard/Chart";
import ProductTable from "@/components/Dashboard/ProductTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddProductForm from "@/components/Dashboard/AddProductForm";
import { Plus } from "lucide-react";
import { mockCategorySales, mockProducts, mockSalesData, mockStats } from "@/utils/mockData";
import { Product } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";

const SellerDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Get user from sessionStorage
    const storedUser = sessionStorage.getItem('currentUser');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user is found
      navigate('/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    navigate('/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };
  
  const handleAddProduct = (newProduct: any) => {
    const productWithId = {
      ...newProduct,
      id: `p${products.length + 1}`,
      rating: 0,
      createdAt: new Date().toISOString().split('T')[0],
      sellerId: user?.id || '1',
    };
    
    setProducts((prev) => [...prev, productWithId]);
    setIsAddProductOpen(false);
  };
  
  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    toast({
      title: "Product Deleted",
      description: "The product has been successfully deleted.",
    });
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="seller" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onLogout={handleLogout} />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Seller Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}. Here's what's happening with your products today.
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Stats Cards */}
            <StatsCards stats={mockStats} />
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SalesChart data={mockSalesData} />
              <CategoryChart categoryData={mockCategorySales} />
            </div>
            
            {/* Products Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Products</h2>
                <Button onClick={() => setIsAddProductOpen(true)} className="dolphnet-gradient">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </div>
              
              <ProductTable 
                products={products} 
                onDelete={handleDeleteProduct}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <AddProductForm 
            onSubmit={handleAddProduct}
            onCancel={() => setIsAddProductOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerDashboard;
