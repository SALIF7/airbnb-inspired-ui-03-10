
import { useState, useEffect } from 'react';
import { Conversation } from '@/components/messages/types';
import { 
  loadAdminConversations, 
  getUnreadCount, 
  getTotalUnreadCount 
} from '@/utils/adminMessageUtils';
import { useAdminConversationActions } from './useAdminConversationActions';

export const useAdminMessages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');
  
  // Charger les conversations depuis le localStorage
  useEffect(() => {
    const loadAndRefreshConversations = () => {
      const allUserConversations = loadAdminConversations();
      setConversations(allUserConversations);
      
      if (allUserConversations.length > 0 && !selectedConversation) {
        setSelectedConversation(allUserConversations[0]);
      } else if (selectedConversation) {
        // Si une conversation est déjà sélectionnée, mettre à jour ses données
        const updatedSelectedConv = allUserConversations.find(
          conv => conv.id === selectedConversation.id
        );
        if (updatedSelectedConv) {
          setSelectedConversation(updatedSelectedConv);
        }
      }
    };
    
    // Charger les conversations au démarrage
    loadAndRefreshConversations();
    
    // Configurer un intervalle pour vérifier périodiquement les nouveaux messages
    const interval = setInterval(() => {
      loadAndRefreshConversations();
    }, 10000); // Vérifier toutes les 10 secondes
    
    return () => clearInterval(interval);
  }, [selectedConversation]);

  const { 
    handleSendMessage, 
    handleSelectConversation,
    sendingMessage 
  } = useAdminConversationActions(
    conversations,
    setConversations,
    selectedConversation,
    setSelectedConversation,
    newMessage,
    setNewMessage
  );

  // Compter le total des messages non lus
  const totalUnreadCount = getTotalUnreadCount(conversations);

  return {
    conversations,
    selectedConversation,
    newMessage,
    searchQuery,
    filter,
    totalUnreadCount,
    sendingMessage,
    setNewMessage,
    setSearchQuery,
    setFilter,
    handleSendMessage,
    handleSelectConversation,
    getUnreadCount
  };
};
