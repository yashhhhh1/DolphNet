
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface SalesChartProps {
  data?: Array<{
    name: string;
    sales: number;
  }>;
  categoryData?: Array<{
    name: string;
    value: number;
  }>;
}

export const SalesChart = ({ data }: SalesChartProps) => {
  if (!data) return null;
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Weekly Sales Trends</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#33c3f0" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#33c3f0" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  borderColor: '#33c3f0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#33c3f0"
                fill="url(#colorSales)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export const CategoryChart = ({ categoryData }: SalesChartProps) => {
  if (!categoryData) return null;
  
  const COLORS = ['#33c3f0', '#0fa0ce', '#1eaedb', '#6bcae8', '#a1dff0'];
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Category-wise Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  borderColor: '#33c3f0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
