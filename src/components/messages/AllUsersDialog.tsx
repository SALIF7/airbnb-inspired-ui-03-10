
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, X, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
}

interface AllUsersDialogProps {
  onSelectUser: (user: User) => void;
}

export const AllUsersDialog: React.FC<AllUsersDialogProps> = ({ onSelectUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadUsers();
    }
  }, [isOpen]);

  const loadUsers = () => {
    setLoading(true);
    try {
      // Charger tous les utilisateurs depuis localStorage
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        setUsers(parsedUsers);
      } else {
        // Ajouter des utilisateurs de démo si aucun n'existe
        const demoUsers = [
          { id: 'admin', name: 'Administrateur', avatar: '/placeholder.svg', role: 'admin' },
          { id: 'user1', name: 'Jean Dupont', avatar: '/placeholder.svg', role: 'user' },
          { id: 'user2', name: 'Marie Martin', avatar: '/placeholder.svg', role: 'user' },
          { id: 'user3', name: 'Pierre Durand', avatar: '/placeholder.svg', role: 'user' },
          { id: 'host1', name: 'Sophie Leroy', avatar: '/placeholder.svg', role: 'host' }
        ];
        localStorage.setItem('users', JSON.stringify(demoUsers));
        setUsers(demoUsers);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
      toast.error("Impossible de charger la liste des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
    setIsOpen(false);
    toast.success(`Conversation avec ${user.name} ouverte`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span className="hidden md:inline">Nouvelle conversation</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tous les utilisateurs</DialogTitle>
        </DialogHeader>
        
        <div className="relative mb-2">
          <Input
            placeholder="Rechercher un utilisateur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p>Chargement des utilisateurs...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">Aucun utilisateur trouvé</p>
                </div>
              ) : (
                filteredUsers.map(user => (
                  <div
                    key={user.id}
                    className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => handleSelectUser(user)}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={user.avatar || '/placeholder.svg'} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{user.name}</p>
                      {user.email && (
                        <p className="text-sm text-gray-500">{user.email}</p>
                      )}
                    </div>
                    <Button size="sm" variant="ghost" className="ml-2">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
