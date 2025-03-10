
import { Conversation, Message } from '@/components/messages/types';

/**
 * Loads admin conversations from localStorage
 */
export const loadAdminConversations = (): Conversation[] => {
  try {
    return JSON.parse(localStorage.getItem('admin_conversations') || '[]', (k, v) => {
      if (k === 'timestamp' && typeof v === 'string') {
        return new Date(v);
      }
      return v;
    });
  } catch (error) {
    console.error("Erreur lors du chargement des conversations admin:", error);
    return [];
  }
};

/**
 * Updates the admin side of a conversation when a user sends a message
 */
export const updateAdminConversation = (
  userId: string, 
  userMessage: Message,
  adminResponse: Message | null, // Now accepts null for no auto-response
  userData: any
): void => {
  // Charger toutes les conversations admin
  const adminConversations = loadAdminConversations();
  
  // Rechercher la conversation avec cet utilisateur
  const adminConvIndex = adminConversations.findIndex(conv => 
    conv.with.id === userId
  );
  
  // Prepare messages to add (always include user message, conditionally add admin response)
  const messagesToAdd: Message[] = [
    {
      ...userMessage,
      read: false,  // Non lu par l'admin
      sender: "user" as const,
    }
  ];
  
  // Only add admin response if it exists
  if (adminResponse) {
    messagesToAdd.push({
      ...adminResponse,
      read: true,   // Lu par l'admin qui l'a envoyé
      sender: "admin" as const,
    });
  }
  
  // Determine the last message (either admin response or user message)
  const lastMessageContent = adminResponse ? {
    content: adminResponse.content,
    timestamp: adminResponse.timestamp,
    read: true,
    sender: "admin" as const,
  } : {
    content: userMessage.content,
    timestamp: userMessage.timestamp,
    read: false,
    sender: "user" as const,
  };
  
  if (adminConvIndex >= 0) {
    // Mettre à jour la conversation existante
    const updatedAdminConv: Conversation = {
      ...adminConversations[adminConvIndex],
      messages: [
        ...adminConversations[adminConvIndex].messages,
        ...messagesToAdd
      ],
      lastMessage: lastMessageContent,
    };
    
    adminConversations[adminConvIndex] = updatedAdminConv;
  } else {
    // Créer une nouvelle conversation admin si elle n'existe pas encore
    adminConversations.push({
      id: `admin-${userId}`,
      with: {
        id: userId,
        name: userData.name || 'Utilisateur inconnu',
        email: userData.email || '',
        avatar: userData.avatar || '/placeholder.svg',
        role: userData.role || 'user',
      },
      messages: messagesToAdd,
      lastMessage: lastMessageContent,
    });
  }
  
  // Sauvegarder les conversations admin mises à jour dans localStorage
  localStorage.setItem('admin_conversations', JSON.stringify(adminConversations));
};
