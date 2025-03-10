
import { useState, useEffect } from 'react';
import { Conversation } from '@/components/messages/types';

export const useConversationManager = (
  conversations: Conversation[],
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>,
  selectedConversation: Conversation | null,
  setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation | null>>
) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<Record<string, boolean>>({});

  // Périodiquement mettre à jour l'état en ligne des utilisateurs
  useEffect(() => {
    // Fonction pour mettre à jour l'état en ligne avec un peu d'aléatoire
    const updateOnlineStatus = () => {
      const newStatus: Record<string, boolean> = {};
      conversations.forEach(conv => {
        // Garder certains utilisateurs en ligne, en mettre d'autres hors ligne
        // avec une probabilité de 20% de changement
        if (onlineUsers[conv.with.id] !== undefined) {
          newStatus[conv.with.id] = Math.random() > 0.2 
            ? onlineUsers[conv.with.id] 
            : !onlineUsers[conv.with.id];
        } else {
          newStatus[conv.with.id] = Math.random() > 0.5;
        }
      });
      setOnlineUsers(newStatus);
    };

    // Initialiser l'état en ligne
    if (Object.keys(onlineUsers).length === 0 && conversations.length > 0) {
      const initialStatus: Record<string, boolean> = {};
      conversations.forEach(conv => {
        initialStatus[conv.with.id] = Math.random() > 0.5;
      });
      setOnlineUsers(initialStatus);
    }

    // Mettre à jour périodiquement
    const interval = setInterval(updateOnlineStatus, 30000); // Toutes les 30 secondes
    
    return () => clearInterval(interval);
  }, [conversations, onlineUsers]);

  // Gérer la sélection d'une conversation
  const handleSelectConversation = (conversation: Conversation) => {
    // Si la conversation est déjà sélectionnée, ne rien faire
    if (selectedConversation && selectedConversation.id === conversation.id) {
      return;
    }

    // Marquer tous les messages de cette conversation comme lus
    const updatedConversation = {
      ...conversation,
      messages: conversation.messages.map(message => ({
        ...message,
        read: true,
      })),
      lastMessage: {
        ...conversation.lastMessage,
        read: true,
      }
    };

    // Mettre à jour la liste des conversations
    const updatedConversations = conversations.map(conv => 
      conv.id === conversation.id ? updatedConversation : conv
    );

    setConversations(updatedConversations);
    setSelectedConversation(updatedConversation);
  };

  // Obtenir le nombre de messages non lus dans une conversation
  const getUnreadCount = (conversation: Conversation): number => {
    return conversation.messages.filter(message => !message.read && message.sender !== 'user').length;
  };

  // Vérifier si un utilisateur est en ligne
  const isUserOnline = (userId: string): boolean => {
    return onlineUsers[userId] || false;
  };

  return {
    searchQuery,
    setSearchQuery,
    handleSelectConversation,
    getUnreadCount,
    onlineUsers,
    isUserOnline
  };
};
