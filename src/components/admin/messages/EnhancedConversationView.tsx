
import React from 'react';
import { Conversation } from '@/components/messages/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import AdminMessageInput from './AdminMessageInput';
import { ArrowLeft, Phone, Video, Check, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EnhancedConversationViewProps {
  conversation: Conversation | null;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  isSending: boolean;
  isOnline: boolean;
  quickResponses: string[];
  onQuickResponseSelect: (text: string) => void;
  onAddQuickResponse: (text: string) => void;
  onRemoveQuickResponse: (index: number) => void;
  isPreviewMode: boolean;
  previewMessage: () => void;
  sendFromPreview: () => void;
  cancelPreview: () => void;
}

export const EnhancedConversationView: React.FC<EnhancedConversationViewProps> = ({
  conversation,
  newMessage,
  setNewMessage,
  handleSendMessage,
  isSending,
  isOnline,
  quickResponses,
  onQuickResponseSelect,
  onAddQuickResponse,
  onRemoveQuickResponse,
  isPreviewMode,
  previewMessage,
  sendFromPreview,
  cancelPreview
}) => {
  // Handler pour le bouton retour sur mobile
  const handleBackClick = () => {
    const conversationList = document.querySelector('.grid-cols-1.md\\:grid-cols-3 > div:first-child');
    const conversationView = document.querySelector('.grid-cols-1.md\\:grid-cols-3 > div:last-child');
    
    if (conversationList && conversationView && window.innerWidth < 768) {
      conversationList.classList.remove('hidden');
      conversationView.classList.add('hidden');
    }
  };

  if (!conversation) {
    return (
      <div className="col-span-2 flex flex-col h-full justify-center items-center border rounded-r-lg bg-gray-50">
        <div className="text-center p-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Sélectionnez une conversation</h3>
          <p className="text-gray-500">
            Choisissez une conversation dans la liste pour commencer à échanger des messages.
          </p>
        </div>
      </div>
    );
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  const renderMessageStatus = (message: any) => {
    if (message.sender !== 'admin') return null;
    
    if (message.read) {
      return (
        <span className="whatsapp-tick whatsapp-read-tick">
          <Check className="h-3 w-3 inline" />
          <Check className="h-3 w-3 inline -ml-1" />
        </span>
      );
    } else {
      return (
        <span className="whatsapp-tick whatsapp-single-tick">
          <Check className="h-3 w-3 inline" />
        </span>
      );
    }
  };

  return (
    <div className="col-span-2 flex flex-col h-full whatsapp-container">
      <div className="whatsapp-header">
        <div className="flex items-center flex-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2 text-white md:hidden whatsapp-back-button touch-manipulation" 
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="relative">
            <Avatar className="whatsapp-user-avatar">
              <AvatarImage src={conversation.with.avatar} />
              <AvatarFallback>
                {conversation.with.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {isOnline && <div className="whatsapp-online-indicator"></div>}
            {!isOnline && <div className="whatsapp-offline-indicator"></div>}
          </div>
          
          <div className="whatsapp-user-info">
            <h3 className="font-semibold text-white truncate">{conversation.with.name}</h3>
            <div className="flex items-center gap-2">
              <div className="text-xs text-white/80">
                {isOnline ? 'En ligne' : 'Hors ligne'}
              </div>
              {conversation.with.role && (
                <Badge variant="outline" className="text-xs bg-emerald-700 text-white border-emerald-600">
                  {conversation.with.role === 'admin' ? 'Administrateur' : conversation.with.role}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-white touch-manipulation">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white touch-manipulation">
            <Phone className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="whatsapp-message-area">
        <div className="space-y-1 px-4">
          {conversation.messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender !== 'admin' && (
                <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                  <AvatarImage src={conversation.with.avatar} />
                  <AvatarFallback>
                    {conversation.with.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div 
                className={`whatsapp-message max-w-[75%] sm:max-w-[70%] ${
                  message.sender === 'admin' 
                    ? 'whatsapp-user-message' 
                    : 'whatsapp-other-message'
                }`}
              >
                {message.sender === 'admin' && <div className="whatsapp-tail-out"></div>}
                {message.sender !== 'admin' && <div className="whatsapp-tail-in"></div>}
                
                {message.content.startsWith('image-message:') ? (
                  <div className="message-image-container">
                    <img 
                      src={message.content.replace('image-message:', '').trim()} 
                      alt="Message Image" 
                      className="message-image rounded-md max-w-full" 
                    />
                    <Image className="image-icon absolute bottom-2 right-2 text-white h-4 w-4" />
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                )}
                
                <div className="whatsapp-message-time">
                  {formatTime(new Date(message.timestamp))}
                  {renderMessageStatus(message)}
                  {!message.read && message.sender !== 'admin' && (
                    <span className="ml-1 font-medium text-gray-600">• Non lu</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <AdminMessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        conversation={conversation}
        isSending={isSending}
        quickResponses={quickResponses}
        onQuickResponseSelect={onQuickResponseSelect}
        onAddQuickResponse={onAddQuickResponse}
        onRemoveQuickResponse={onRemoveQuickResponse}
        isPreviewMode={isPreviewMode}
        previewMessage={previewMessage}
        sendFromPreview={sendFromPreview}
        cancelPreview={cancelPreview}
      />
    </div>
  );
};
