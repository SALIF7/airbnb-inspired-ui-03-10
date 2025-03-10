
import React, { useState } from 'react';
import { Conversation } from './types';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import WhatsAppHeader from './WhatsAppHeader';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageUploader } from '@/components/shared/ImageUploader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ConversationViewProps {
  conversation: Conversation;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  isOnline?: boolean;
  onBack?: () => void;
}

const ConversationView: React.FC<ConversationViewProps> = ({
  conversation,
  newMessage,
  setNewMessage,
  handleSendMessage,
  isOnline = Math.random() > 0.5, // Simulation aléatoire de l'état en ligne
  onBack
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');

  const handleViewProfile = () => {
    setShowProfile(true);
  };

  const handleProfileImageUpload = (file: File) => {
    setIsUploading(true);
    
    // This would normally upload the image to a server
    setTimeout(() => {
      toast.success("Photo de profil mise à jour");
      setIsUploading(false);
    }, 1500);
  };

  const handleStatus = () => {
    toast.success("Fonctionnalité de statut à venir");
  };

  const handleCall = () => {
    toast.success("Fonctionnalité d'appel à venir");
  };

  const handleVideoCall = () => {
    toast.success("Fonctionnalité d'appel vidéo à venir");
  };

  // Mock shared media
  const sharedMedia = [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ];

  return (
    <div className="col-span-2 flex flex-col h-full whatsapp-container md:rounded-r-lg">
      <WhatsAppHeader 
        conversation={conversation} 
        isOnline={isOnline} 
        onBack={onBack}
        onViewProfile={handleViewProfile}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="whatsapp-tabs">
          <TabsTrigger 
            value="messages" 
            className={`whatsapp-tab ${activeTab === 'messages' ? 'active' : ''}`}
          >
            MESSAGES
          </TabsTrigger>
          <TabsTrigger 
            value="status" 
            className={`whatsapp-tab ${activeTab === 'status' ? 'active' : ''}`}
            onClick={handleStatus}
          >
            STATUT
          </TabsTrigger>
          <TabsTrigger 
            value="calls" 
            className={`whatsapp-tab ${activeTab === 'calls' ? 'active' : ''}`}
            onClick={handleCall}
          >
            APPELS
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="flex-1 flex flex-col">
          <MessageList conversation={conversation} />
          
          <MessageInput 
            newMessage={newMessage} 
            setNewMessage={setNewMessage} 
            handleSendMessage={handleSendMessage} 
          />
        </TabsContent>
        
        <TabsContent value="status" className="flex-1 p-4">
          <div className="text-center p-8">
            <h3 className="text-lg font-medium">Statut</h3>
            <p className="text-gray-500 mt-2">Partagez des mises à jour qui disparaissent après 24 heures.</p>
            <button className="mt-4 bg-gray-200 p-2 rounded-full">
              Ajouter un statut
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="calls" className="flex-1 p-4">
          <div className="text-center p-8">
            <h3 className="text-lg font-medium">Appels</h3>
            <p className="text-gray-500 mt-2">Effectuez des appels audio et vidéo.</p>
            <div className="flex justify-center gap-4 mt-4">
              <button className="bg-green-500 text-white p-3 rounded-full" onClick={handleCall}>
                Audio
              </button>
              <button className="bg-blue-500 text-white p-3 rounded-full" onClick={handleVideoCall}>
                Vidéo
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4 py-2 pb-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <ImageUploader
                  variant="avatar"
                  currentImage={conversation.with.avatar || '/placeholder.svg'}
                  onImageUpload={handleProfileImageUpload}
                  isUploading={isUploading}
                  previewClassName="h-28 w-28"
                />
              </div>
              
              <h2 className="text-xl font-bold">{conversation.with.name}</h2>
              
              {conversation.with.email && (
                <p className="text-sm text-gray-500">{conversation.with.email}</p>
              )}
              
              <div className="text-sm text-gray-500">
                {isOnline ? 'En ligne' : 'Hors ligne'}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">À propos</h3>
              <p className="text-gray-600">Disponible</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Médias, liens et docs</h3>
              <div className="grid grid-cols-3 gap-2">
                {sharedMedia.length > 0 ? (
                  sharedMedia.map((media, index) => (
                    <div key={index} className="h-20 bg-gray-100 rounded overflow-hidden">
                      <img src={media} alt="Media" className="h-full w-full object-cover" />
                    </div>
                  ))
                ) : (
                  <div className="h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    Aucun média
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConversationView;
