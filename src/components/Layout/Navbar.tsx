
import React from "react";
import { Bell, ChevronDown, MessageSquare, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface NavbarProps {
  user?: {
    name: string;
    avatar?: string;
    role: string;
  };
  onLogout?: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
  return (
    <nav className="border-b border-border bg-white dark:bg-navy-900 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full dolphnet-gradient flex items-center justify-center overflow-hidden">
              <img src="./LOGO.png" alt="" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-dolphin-500 to-ocean-400">
              DOLPHNET
            </span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-1.5 rounded-md bg-slate-50 dark:bg-navy-800 focus:outline-none focus:ring-1 focus:ring-dolphin-300 w-64"
                />
                <Search className="absolute left-2.5 w-4 h-4 text-gray-400" />
              </div>

              {/* Notification Bell */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* Messages */}
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>

              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-dolphin-400 text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </p>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
