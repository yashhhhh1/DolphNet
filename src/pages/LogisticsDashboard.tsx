
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import StatsCards from "@/components/Dashboard/StatsCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Package, Truck, AlertCircle } from "lucide-react";
import { mockShipments, Shipment } from "@/utils/mockData";

const LogisticsDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [shipments, setShipments] = useState(mockShipments || []);
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
  
  const handleUpdateStatus = (id: string, newStatus: "pending" | "in_transit" | "delivered") => {
    setShipments(prev => 
      prev.map(shipment => 
        shipment.id === id 
          ? { ...shipment, status: newStatus } 
          : shipment
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Shipment #${id} status changed to ${newStatus}`
    });
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  const logisticsStats = {
    totalShipments: shipments.length,
    inTransit: shipments.filter(s => s.status === "in_transit").length,
    delivered: shipments.filter(s => s.status === "delivered").length,
    pending: shipments.filter(s => s.status === "pending").length
  };
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="logistics" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onLogout={handleLogout} />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Logistics Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}. Manage your shipments and routes here.
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
                  <Package className="h-4 w-4 text-dolphin-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{logisticsStats.totalShipments}</div>
                  <p className="text-xs text-muted-foreground">
                    All assigned shipments
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">In Transit</CardTitle>
                  <Truck className="h-4 w-4 text-dolphin-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{logisticsStats.inTransit}</div>
                  <p className="text-xs text-muted-foreground">
                    Currently being delivered
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Delivered</CardTitle>
                  <MapPin className="h-4 w-4 text-dolphin-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{logisticsStats.delivered}</div>
                  <p className="text-xs text-muted-foreground">
                    Successfully completed
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <AlertCircle className="h-4 w-4 text-dolphin-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{logisticsStats.pending}</div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting processing
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Map Placeholder */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Route Planning Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive map would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Shipments Table */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Active Shipments</h2>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 dark:bg-navy-900">
                      <TableHead>Shipment ID</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Departure</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shipments.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell className="font-medium">{shipment.id}</TableCell>
                        <TableCell>{shipment.destination}</TableCell>
                        <TableCell>{shipment.driver}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            shipment.status === "delivered" ? "bg-green-100 text-green-800" :
                            shipment.status === "in_transit" ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {shipment.status.replace('_', ' ')}
                          </span>
                        </TableCell>
                        <TableCell>{shipment.departureDate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {shipment.status === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateStatus(shipment.id, "in_transit")}
                              >
                                Start Transit
                              </Button>
                            )}
                            {shipment.status === "in_transit" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateStatus(shipment.id, "delivered")}
                              >
                                Mark Delivered
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => console.log("View details for", shipment.id)}
                            >
                              View Details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;
