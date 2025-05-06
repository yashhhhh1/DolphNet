
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, BarChart, Truck, Package } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-wave bg-cover">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 rounded-full dolphnet-gradient flex items-center justify-center overflow-hidden">
            {/* <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-white"
              // xmlns="http://www.w3.org/2000/svg"
              src=""
            >
              <path
                fill="currentColor"
                d="M8,2C6.34,2 5,3.34 5,5V22H7V13H17V22H19V5C19,3.34 17.66,2 16,2H8M16,7H8V5H16V7Z"
              />
            </svg> */}
            <img src="./LOGO.png" alt="" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-white">
            DOLPHNET
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link to="/login">
            <Button className="text-black bg-white">Register</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-white">
            Unified E-commerce Business Platform
          </h1>
          <p className="text-xl text-white dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            DOLPHNET simplifies e-commerce operations with specialized dashboards for every role in your business. Streamline your workflow today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/login">
              <Button size="lg" className=" bg-white text-black">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-dolphin-100 dark:bg-ocean-900 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-dolphin-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Seller Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Manage products, track sales, and monitor inventory all in one place.
              </p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-dolphin-100 dark:bg-ocean-900 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-dolphin-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Logistics Partner</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimize routes, manage vehicles, and track shipments efficiently.
              </p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-dolphin-100 dark:bg-ocean-900 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-dolphin-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Delivery Partner</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Update delivery status, manage daily schedule, and submit feedback.
              </p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-dolphin-100 dark:bg-ocean-900 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-dolphin-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Business Owner</h3>
              <p className="text-gray-600 dark:text-gray-300">
                View performance analytics, get insights, and make data-driven decisions.
              </p>
            </div>
          </div>
        </div>
      </main>

      <div className="wave-divider">
        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#33c3f0"
            fillOpacity="0.2"
            d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,181.3C672,203,768,213,864,213.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <footer className="bg-dolphin-500 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 DOLPHNET. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
