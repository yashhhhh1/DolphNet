
import React from "react";
import { BadgeDollarSign, Package, ShoppingCart, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  stats: {
    totalProducts: number;
    activeListings: number;
    pendingOrders: number;
    revenueThisMonth: number;
  };
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-dolphin-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProducts}</div>
          <p className="text-xs text-muted-foreground">
            +2 from last week
          </p>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
          <Tag className="h-4 w-4 text-dolphin-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeListings}</div>
          <p className="text-xs text-muted-foreground">
            All products currently active
          </p>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-dolphin-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingOrders}</div>
          <p className="text-xs text-muted-foreground">
            2 awaiting shipment
          </p>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Revenue This Month</CardTitle>
          <BadgeDollarSign className="h-4 w-4 text-dolphin-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.revenueThisMonth.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            +12.4% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
