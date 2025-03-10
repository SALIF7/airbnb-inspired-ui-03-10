import React, { useState, useEffect } from 'react';
import { Bell, Menu, Search, Settings, User, X } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { SidebarTrigger } from '@/components/ui/sidebar';
import useAuth from '@/hooks/useAuth';
import { useReservations } from '@/hooks/reservations';

export const AdminTopbar = () => {
  const { user, logout } = useAuth();
  const { reservations } = useReservations();
  const [showSearch, setShowSearch] = useState(false);
  const [notifications, setNotifications] = useState<{id: string, title: string, message: string}[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const pendingReservations = reservations.filter(r => r.status === 'pending');
    const newNotifications = pendingReservations.map(r => ({
      id: r.id,
      title: 'Nouvelle réservation',
      message: `${r.guestName} a réservé "${r.listingTitle}" du ${new Date(r.checkIn).toLocaleDateString('fr-FR')} au ${new Date(r.checkOut).toLocaleDateString('fr-FR')}`
    }));
    setNotifications(newNotifications);
  }, [reservations]);

  const handleLogout = async () => {
    try {
      await logout.mutate();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="h-16 flex items-center border-b bg-white px-2 sm:px-4 sticky top-0 z-30">
      <div className="flex items-center w-full">
        <div className="flex items-center md:hidden">
          <SidebarTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2 touch-optimized">
              <Menu className="h-5 w-5" />
            </Button>
          </SidebarTrigger>
        </div>
        
        <div className="flex-1 flex items-center justify-between gap-2">
          {showSearch ? (
            <div className="relative w-full flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 input-responsive"
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowSearch(false)}
                className="ml-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900">Tableau de bord</h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="sm:hidden touch-optimized"
                  onClick={() => setShowSearch(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
                
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="touch-optimized"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border">
                      <div className="py-2 px-3 bg-gray-50 border-b">
                        <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <Link 
                              to="/admin/reservations" 
                              key={notification.id}
                              className="block px-4 py-3 hover:bg-gray-50 border-b last:border-0"
                              onClick={() => setShowNotifications(false)}
                            >
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                            </Link>
                          ))
                        ) : (
                          <div className="px-4 py-6 text-center text-sm text-gray-500">
                            Aucune notification
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-10 w-10 rounded-full touch-optimized">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Mon profil</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="touch-optimized">
                      <Link to="/admin/settings" className="w-full flex items-center h-10">
                        <Settings className="mr-2 h-4 w-4" />
                        Paramètres
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer touch-optimized h-10">
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
