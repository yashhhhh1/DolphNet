
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mockUsers } from "@/utils/mockData";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("seller");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Get matching user from mockUsers if available, otherwise create a mock user
      const user = mockUsers.find(u => u.email === email && u.role === role) || {
        id: "temp-user-id",
        name: email.split('@')[0] || "User",
        email: email,
        role: role,
      };
      
      // Always show success message
      toast({
        title: "Login successful!",
        description: `Welcome, ${user.name}!`,
      });
      
      // Store user in sessionStorage
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      
      // Redirect based on role
      switch(role) {
        case 'seller':
          navigate('/seller-dashboard');
          break;
        case 'logistics':
          navigate('/logistics-dashboard');
          break;
        case 'delivery':
          navigate('/delivery-dashboard');
          break;
        case 'business':
          navigate('/business-dashboard');
          break;
        case 'admin':
          navigate('/admin-panel');
          break;
        default:
          navigate('/seller-dashboard');
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Login as</Label>
        <Select 
          value={role} 
          onValueChange={setRole}
        >
          <SelectTrigger id="role" className="w-full">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seller">Seller</SelectItem>
            <SelectItem value="logistics">Logistics Partner</SelectItem>
            <SelectItem value="delivery">Delivery Partner</SelectItem>
            <SelectItem value="business">Business Owner</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center">
        <Button type="button" variant="link" className="px-0 text-sm text-dolphin-500">
          Forgot password?
        </Button>
        <Button type="button" variant="link" className="px-0 text-sm text-dolphin-500">
          Register
        </Button>
      </div>

      <Button type="submit" className="w-full dolphnet-gradient" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="text-xs text-gray-500 text-center mt-4">
        <p>Enter any email and password to login</p>
        <p>You will be redirected based on the selected role</p>
        <div className="text-left mt-2 border rounded-md p-2">
          <ul className="space-y-1">
            {mockUsers.map((user) => (
              <li key={user.id}>
                {user.email} ({user.role})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
