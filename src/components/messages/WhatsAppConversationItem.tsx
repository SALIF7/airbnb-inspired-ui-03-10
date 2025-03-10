
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation } from './types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface WhatsAppConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  unreadCount: number;
  onClick: () => void;
  isOnline?: boolean;
}

const WhatsAppConversationItem: React.FC<WhatsAppConversationItemProps> = ({
  conversation,
  isSelected,
  unreadCount,
  onClick,
  isOnline = false
}) => {
  const formatTime = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
    }
  };

  const renderLastMessageStatus = () => {
    if (conversation.lastMessage.sender !== 'user') return null;
    
    if (conversation.lastMessage.read) {
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
    <div 
      className={cn(
        "whatsapp-conversation-item", 
        isSelected && "active"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={conversation.with.avatar || '/placeholder.svg'} />
          <AvatarFallback>
            {conversation.with.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {isOnline && <div className="whatsapp-online-indicator"></div>}
        {!isOnline && <div className="whatsapp-offline-indicator"></div>}
      </div>
      
      <div className="whatsapp-conversation-content">
        <div className="flex justify-between">
          <h3 className="whatsapp-conversation-name">{conversation.with.name}</h3>
        </div>
        <div className="whatsapp-conversation-preview">
          {conversation.lastMessage.sender === 'user' && 'Vous: '}
          {conversation.lastMessage.content.substring(0, 40)}
          {conversation.lastMessage.content.length > 40 ? '...' : ''}
          {renderLastMessageStatus()}
        </div>
      </div>
      
      <div className="whatsapp-conversation-meta">
        <span className="whatsapp-conversation-time">
          {formatTime(conversation.lastMessage.timestamp)}
        </span>
        
        {unreadCount > 0 && (
          <div className="whatsapp-conversation-badge">
            {unreadCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppConversationItem;
