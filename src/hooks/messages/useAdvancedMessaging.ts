import { useState } from 'react';
import { Conversation } from '@/components/messages/types';

export const useAdvancedMessaging = (
  conversations: Conversation[],
  selectedConversation: Conversation | null,
  handleSendMessage: () => void,
  newMessage: string,
  setNewMessage: (message: string) => void
) => {
  // État pour l'état en ligne des utilisateurs
  const [onlineUsers, setOnlineUsers] = useState<Record<string, boolean>>(() => {
    const online: Record<string, boolean> = {};
    // Initialisation aléatoire pour la démo
    conversations.forEach(conv => {
      online[conv.with.id] = Math.random() > 0.5;
    });
    return online;
  });
  
  // Recherche avancée
  const [advancedSearchQuery, setAdvancedSearchQuery] = useState('');
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  
  // Réponses rapides pour l'administrateur
  const [quickResponses, setQuickResponses] = useState<string[]>([
    "Bonjour, comment puis-je vous aider ?",
    "Merci pour votre message, je vais m'en occuper.",
    "Je vous recontacte dès que possible."
  ]);
  
  // Conversations importantes - change from string[] to Record<string, boolean>
  const [markedImportant, setMarkedImportant] = useState<Record<string, boolean>>({});
  
  // Mode de prévisualisation avant envoi
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // Ajouter une réponse rapide
  const addQuickResponse = (text: string) => {
    if (text && !quickResponses.includes(text)) {
      setQuickResponses([...quickResponses, text]);
    }
  };
  
  // Supprimer une réponse rapide
  const removeQuickResponse = (index: number) => {
    const updated = [...quickResponses];
    updated.splice(index, 1);
    setQuickResponses(updated);
  };
  
  // Appliquer une réponse rapide
  const applyQuickResponse = (text: string) => {
    setNewMessage(text);
  };
  
  // Marquer une conversation comme importante - updated to use Record<string, boolean>
  const toggleImportant = (conversationId: string) => {
    setMarkedImportant(prev => {
      const updated = { ...prev };
      updated[conversationId] = !updated[conversationId];
      
      // Remove the key if it's false to keep the object clean
      if (!updated[conversationId]) {
        delete updated[conversationId];
      }
      
      return updated;
    });
  };
  
  // Fonction de recherche avancée
  const performAdvancedSearch = (query: string) => {
    if (!query.trim()) return [];
    
    const searchTerms = query.toLowerCase().split(' ');
    
    return conversations.filter(conv => {
      // Recherche dans les messages
      const hasMatchingMessages = conv.messages.some(msg => 
        searchTerms.some(term => msg.content.toLowerCase().includes(term))
      );
      
      // Recherche dans les infos de l'utilisateur
      const userInfoMatches = 
        searchTerms.some(term => conv.with.name.toLowerCase().includes(term)) ||
        (conv.with.email && searchTerms.some(term => conv.with.email?.toLowerCase().includes(term)));
      
      return hasMatchingMessages || userInfoMatches;
    });
  };
  
  // Prévisualiser le message avant envoi
  const previewMessage = () => {
    if (!newMessage.trim()) return;
    setIsPreviewMode(true);
  };
  
  // Envoyer depuis la prévisualisation
  const sendFromPreview = () => {
    setIsPreviewMode(false);
    handleSendMessage();
  };
  
  // Annuler la prévisualisation
  const cancelPreview = () => {
    setIsPreviewMode(false);
  };
  
  return {
    onlineUsers,
    advancedSearchQuery,
    setAdvancedSearchQuery,
    isAdvancedSearchOpen,
    setIsAdvancedSearchOpen,
    performAdvancedSearch,
    quickResponses,
    applyQuickResponse,
    addQuickResponse,
    removeQuickResponse,
    markedImportant,
    toggleImportant,
    isPreviewMode,
    previewMessage,
    sendFromPreview,
    cancelPreview
  };
};
