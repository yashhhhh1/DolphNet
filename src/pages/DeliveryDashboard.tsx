
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  Clock, 
  Package, 
  CalendarClock,
  XCircle
} from "lucide-react";
import { mockDeliveries } from "@/utils/mockData";

const DeliveryDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [deliveries, setDeliveries] = useState(mockDeliveries || []);
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
  
  const handleDeliveryComplete = (deliveryId: string) => {
    setDeliveries(prevDeliveries => 
      prevDeliveries.map(delivery => 
        delivery.id === deliveryId 
          ? { ...delivery, status: "delivered" } 
          : delivery
      )
    );
    
    toast({
      title: "Delivery Completed",
      description: `Delivery #${deliveryId} has been marked as completed!`
    });
  };
  
  const handleDeliveryFailed = (deliveryId: string) => {
    setDeliveries(prevDeliveries => 
      prevDeliveries.map(delivery => 
        delivery.id === deliveryId 
          ? { ...delivery, status: "failed" } 
          : delivery
      )
    );
    
    toast({
      title: "Delivery Failed",
      description: `Delivery #${deliveryId} has been marked as failed.`
    });
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  const pendingDeliveries = deliveries.filter(d => d.status === "pending");
  const completedDeliveries = deliveries.filter(d => d.status === "delivered");
  const failedDeliveries = deliveries.filter(d => d.status === "failed");
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="delivery" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onLogout={handleLogout} />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Delivery Partner Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}. Manage your daily deliveries here.
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
                  <Clock className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingDeliveries.length}</div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedDeliveries.length}</div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Failed Attempts</CardTitle>
                  <XCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{failedDeliveries.length}</div>
                </CardContent>
              </Card>
            </div>
            
            {/* Today's Schedule */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Today's Deliveries</h2>
                <Button variant="outline" className="flex items-center gap-1">
                  <CalendarClock className="h-4 w-4 mr-1" /> View Schedule
                </Button>
              </div>
              
              {pendingDeliveries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingDeliveries.map((delivery) => (
                    <Card key={delivery.id} className="overflow-hidden">
                      <CardHeader className="bg-slate-50 dark:bg-navy-900 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Order #{delivery.id}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Customer:</span>
                            <span className="text-sm">{delivery.customer}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Address:</span>
                            <span className="text-sm text-right">{delivery.address}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Time Slot:</span>
                            <span className="text-sm">{delivery.timeSlot}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Items:</span>
                            <span className="text-sm">{delivery.items} items</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Contact:</span>
                            <span className="text-sm">{delivery.phone}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2 justify-end border-t pt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeliveryFailed(delivery.id)}
                        >
                          Failed
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => handleDeliveryComplete(delivery.id)}
                        >
                          Delivered
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground/60" />
                  <h3 className="text-lg font-medium mb-1">No pending deliveries</h3>
                  <p className="text-muted-foreground">
                    You have completed all your assigned deliveries for today!
                  </p>
                </Card>
              )}
            </div>
            
            {/* QR Scanner Placeholder */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>QR Code Scanner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center mb-4">
                  <p className="text-muted-foreground">Camera access would appear here</p>
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Scan the QR code on the package to quickly mark deliveries as complete
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Enable Camera
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
