
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useAuth from '@/hooks/useAuth';
import { ProfileSidebar } from '@/components/user/ProfileSidebar';
import { PersonalInfoTab } from '@/components/user/PersonalInfoTab';
import { SecurityTab } from '@/components/user/SecurityTab';
import { PreferencesTab } from '@/components/user/PreferencesTab';

const Profile = () => {
  const { user, updateUserAvatar } = useAuth();
  const [userAvatar, setUserAvatar] = useState<string | undefined>(user?.avatar);
  
  // Charger l'avatar depuis le localStorage au chargement initial du composant seulement
  useEffect(() => {
    const storedAvatar = localStorage.getItem('userAvatar');
    if (storedAvatar) {
      setUserAvatar(storedAvatar);
      // Mettre à jour l'avatar dans useAuth seulement au chargement initial
      if (updateUserAvatar && user && user.avatar !== storedAvatar) {
        updateUserAvatar(storedAvatar);
      }
    }
  }, []);  // Dépendances vides pour s'exécuter une seule fois
  
  const handleAvatarChange = (avatarUrl: string) => {
    setUserAvatar(avatarUrl);
    if (updateUserAvatar) {
      updateUserAvatar(avatarUrl);
    }
  };
  
  // Création d'un objet utilisateur mis à jour pour les composants enfants
  const updatedUser = user ? { ...user, avatar: userAvatar || user.avatar } : null;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8 mt-8">Mon profil</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProfileSidebar 
              user={updatedUser}
              onAvatarChange={handleAvatarChange}
            />
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="infos">
              <TabsList className="mb-6">
                <TabsTrigger value="infos">Informations personnelles</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
                <TabsTrigger value="preferences">Préférences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="infos">
                <PersonalInfoTab user={updatedUser} />
              </TabsContent>
              
              <TabsContent value="security">
                <SecurityTab />
              </TabsContent>
              
              <TabsContent value="preferences">
                <PreferencesTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
