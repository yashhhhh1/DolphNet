
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Home,
  LayoutGrid,
  ListFilter,
  MessageSquare,
  Package,
  ShoppingBag,
  LineChart,
  Settings,
  Truck,
  Users,
} from "lucide-react";

interface SidebarProps {
  role?: "seller" | "logistics" | "delivery" | "business" | "admin";
}

const Sidebar = ({ role = "seller" }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Role-based menu items
  const getMenuItems = () => {
    switch (role) {
      case "seller":
        return [
          {
            label: "Dashboard",
            icon: <Home className="h-5 w-5" />,
            href: "/seller-dashboard",
          },
          {
            label: "Products",
            icon: <Package className="h-5 w-5" />,
            href: "/seller-products",
          },
          {
            label: "Orders",
            icon: <ShoppingBag className="h-5 w-5" />,
            href: "/seller-orders",
          },
          {
            label: "Inventory",
            icon: <ListFilter className="h-5 w-5" />,
            href: "/seller-inventory",
          },
          {
            label: "Analytics",
            icon: <BarChart3 className="h-5 w-5" />,
            href: "/seller-analytics",
          },
          {
            label: "Support",
            icon: <MessageSquare className="h-5 w-5" />,
            href: "/seller-support",
          },
        ];
      case "logistics":
        return [
          {
            label: "Routes",
            icon: <LayoutGrid className="h-5 w-5" />,
            href: "/logistics-routes",
          },
          {
            label: "Shipments",
            icon: <Package className="h-5 w-5" />,
            href: "/logistics-shipments",
          },
          {
            label: "Vehicles",
            icon: <Truck className="h-5 w-5" />,
            href: "/logistics-vehicles",
          },
          {
            label: "Reports",
            icon: <LineChart className="h-5 w-5" />,
            href: "/logistics-reports",
          },
        ];
      case "business":
        return [
          {
            label: "Overview",
            icon: <Home className="h-5 w-5" />,
            href: "/business-overview",
          },
          {
            label: "Analytics",
            icon: <BarChart3 className="h-5 w-5" />,
            href: "/business-analytics",
          },
          {
            label: "Sellers",
            icon: <Users className="h-5 w-5" />,
            href: "/business-sellers",
          },
          {
            label: "Products",
            icon: <Package className="h-5 w-5" />,
            href: "/business-products",
          },
          {
            label: "Reports",
            icon: <LineChart className="h-5 w-5" />,
            href: "/business-reports",
          },
        ];
      case "admin":
        return [
          {
            label: "Dashboard",
            icon: <Home className="h-5 w-5" />,
            href: "/admin-dashboard",
          },
          {
            label: "Users",
            icon: <Users className="h-5 w-5" />,
            href: "/admin-users",
          },
          {
            label: "Settings",
            icon: <Settings className="h-5 w-5" />,
            href: "/admin-settings",
          },
          {
            label: "Logs",
            icon: <ListFilter className="h-5 w-5" />,
            href: "/admin-logs",
          },
        ];
      default:
        return [
          {
            label: "Dashboard",
            icon: <Home className="h-5 w-5" />,
            href: "/seller-dashboard",
          },
        ];
    }
  };

  return (
    <aside
      className={cn(
        "h-screen flex flex-col bg-sidebar dark:bg-navy-900 border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Toggle Button */}
      <div className="p-4 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col space-y-1 p-3 flex-1">
        {getMenuItems().map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all",
              isActive(item.href)
                ? "bg-dolphin-100 text-dolphin-700 dark:bg-navy-800 dark:text-dolphin-300"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-navy-800"
            )}
          >
            <div className={cn("flex items-center", collapsed && "w-full justify-center")}>
              <span className={cn("mr-3", collapsed && "mr-0")}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </div>
          </Link>
        ))}
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Link
          to="/help"
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-navy-800",
            collapsed && "justify-center"
          )}
        >
          <CircleHelp className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Help & Support</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
