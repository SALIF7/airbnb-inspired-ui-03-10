
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { User as UserType } from '@/hooks/useAuth';
import { ImageUploader } from '@/components/shared/ImageUploader';
import { toast } from 'sonner';

interface ProfileSidebarProps {
  user: UserType | null;
  onAvatarChange?: (avatarUrl: string) => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ user, onAvatarChange }) => {
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar || "/placeholder.svg");
  const [isUploading, setIsUploading] = useState(false);
  const [avatarKey, setAvatarKey] = useState(Date.now()); // Clé unique pour forcer le rechargement de l'image

  // Mise à jour de l'avatar local lorsque user?.avatar change
  useEffect(() => {
    if (user?.avatar && user.avatar !== avatar) {
      setAvatar(user.avatar);
    }
  }, [user?.avatar]);

  const handleImageUpload = (file: File) => {
    setIsUploading(true);
    
    // Créer un URL pour la prévisualisation
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        // Stocker temporairement l'URL de prévisualisation
        const previewUrl = event.target.result as string;
        
        // Simuler le délai de téléchargement
        setTimeout(() => {
          setAvatar(previewUrl);
          setIsUploading(false);
          setAvatarKey(Date.now()); // Générer une nouvelle clé pour forcer le rechargement
          
          // Notifier le composant parent du changement d'avatar
          if (onAvatarChange) {
            onAvatarChange(previewUrl);
          }
          
          toast.success("Photo de profil mise à jour avec succès");
        }, 1500);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto relative mb-4 group">
          <Avatar className="h-24 w-24 mx-auto border-4 border-white shadow-md">
            <AvatarImage 
              key={avatarKey} // Forcer le rechargement de l'image
              src={avatar} 
              alt={user?.name || "Utilisateur"}
              onError={(e) => {
                // Si l'image échoue à charger, utiliser AvatarFallback
                e.currentTarget.style.display = 'none';
              }}
            />
            <AvatarFallback className="bg-sholom-primary/10 text-sholom-primary text-xl">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 right-1/3 bg-white rounded-full p-1 shadow-sm">
            <ImageUploader
              currentImage={avatar}
              onImageUpload={handleImageUpload}
              isUploading={isUploading}
              variant="avatar"
              label="Photo de profil"
              maxSizeMB={5}
            />
          </div>
        </div>
        <CardTitle>{user?.name || "Utilisateur"}</CardTitle>
        <CardDescription>Membre depuis {new Date().toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3 text-sm text-gray-500">
          <User className="h-4 w-4" />
          <span>{user?.name || "Non spécifié"}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-500">
          <Mail className="h-4 w-4" />
          <span>{user?.email || "email@exemple.com"}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-500">
          <Phone className="h-4 w-4" />
          <span>+228 XX XX XX XX</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          <span>Lomé, Togo</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Inscrit le {new Date().toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Modifier mon profil</Button>
      </CardFooter>
    </Card>
  );
};
