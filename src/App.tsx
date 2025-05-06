
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import LogisticsDashboard from "./pages/LogisticsDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Modified to use a function declaration rather than an arrow function with implicit return
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Wrap TooltipProvider correctly */}
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/logistics-dashboard" element={<LogisticsDashboard />} />
            <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
            <Route path="/business-dashboard" element={<BusinessDashboard />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
