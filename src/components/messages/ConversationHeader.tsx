
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Video, MoreVertical } from 'lucide-react';
import { Conversation } from './types';

interface ConversationHeaderProps {
  conversation: Conversation;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({ conversation }) => {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={conversation.with.avatar} />
          <AvatarFallback className={
            conversation.with.role === 'admin' ? 'bg-blue-500 text-white' : ''
          }>
            {conversation.with.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center">
            <h2 className="font-medium">{conversation.with.name}</h2>
            {conversation.with.role === 'admin' && (
              <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">Admin</Badge>
            )}
          </div>
          <p className="text-xs text-gray-500">
            {conversation.with.id === 'admin' 
              ? 'Administrateur de la plateforme' 
              : 'En ligne il y a 2h'}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ConversationHeader;
