import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  ShieldAlert,
  Database,
  ActivitySquare,
} from "lucide-react";
import { mockUsers, mockSystemLogs, SystemLog } from "@/utils/mockData";

const AdminPanel = () => {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState(mockUsers);
  const [logs, setLogs] = useState(mockSystemLogs);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = sessionStorage.getItem('currentUser');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Redirect if not admin
      if (parsedUser.role !== 'admin') {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin panel",
          variant: "destructive"
        });
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate, toast]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    navigate('/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
  };
  
  const handleToggleUserStatus = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(u => 
        u.id === userId 
          ? { ...u, isActive: !u.isActive } 
          : u
      )
    );
    
    const targetUser = users.find(u => u.id === userId);
    const newStatus = targetUser?.isActive ? 'deactivated' : 'activated';
    
    toast({
      title: `User ${newStatus}`,
      description: `User ${targetUser?.name} has been ${newStatus}.`
    });
    
    // Add a new system log
    const newLog: SystemLog = {
      id: `log-${Date.now()}`,
      type: "user",
      action: `User ${targetUser?.name} ${newStatus}`,
      timestamp: new Date().toISOString(),
      level: "info"
    };
    
    setLogs([newLog, ...logs]);
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="admin" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onLogout={handleLogout} />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}. Manage system users and monitor platform health.
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-dolphin-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Across all roles
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
                  <ShieldAlert className="h-4 w-4 text-dolphin-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{logs.filter(log => log.level === "error").length}</div>
                  <p className="text-xs text-muted-foreground">
                    Require attention
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Database Status</CardTitle>
                  <Database className="h-4 w-4 text-dolphin-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Healthy</div>
                  <p className="text-xs text-muted-foreground">
                    Last checked: 2 mins ago
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">API Uptime</CardTitle>
                  <ActivitySquare className="h-4 w-4 text-dolphin-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.9%</div>
                  <p className="text-xs text-muted-foreground">
                    Last 30 days
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* User Management */}
            <div>
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 dark:bg-navy-900">
                      <TableHead className="w-[40px]">Avatar</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell className="py-2">
                          <div className="h-8 w-8 rounded-full bg-slate-100 overflow-hidden">
                            <img
                              src={u.avatar || `https://ui-avatars.com/api/?name=${u.name}&background=0D8ABC&color=fff`}
                              alt={u.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={u.role === 'admin' ? 'border-red-200 text-red-800 bg-red-50' : ''}
                          >
                            {u.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className={`mr-2 h-2 w-2 rounded-full ${u.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <span>{u.isActive ? 'Active' : 'Inactive'}</span>
                          </div>
                        </TableCell>
                        <TableCell>{u.lastLogin || 'Never'}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center">
                            <Switch
                              id={`user-active-${u.id}`}
                              checked={u.isActive !== false}
                              onCheckedChange={() => handleToggleUserStatus(u.id)}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-2"
                              onClick={() => console.log("View details for", u.id)}
                            >
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            {/* System Logs */}
            <div>
              <h2 className="text-xl font-semibold mb-4">System Logs</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="max-h-80 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead className="text-right">Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {logs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell>{log.type}</TableCell>
                            <TableCell className="font-medium">{log.action}</TableCell>
                            <TableCell>
                              {new Date(log.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  log.level === "error" ? "destructive" : 
                                  log.level === "warning" ? "outline" : 
                                  "default"
                                }
                              >
                                {log.level}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
