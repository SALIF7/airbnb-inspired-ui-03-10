
import { Conversation, Message } from '@/components/messages/types';

/**
 * Transforms a user conversation for admin view
 */
export const transformToAdminConversation = (
  userId: string,
  userData: any,
  adminConv: any
): Conversation => {
  return {
    id: `admin-${userId}`,
    with: {
      id: userId,
      name: userData.name || 'Unknown User',
      email: userData.email || '',
      avatar: userData.avatar || '/placeholder.svg',
      role: userData.role || 'user',
    },
    lastMessage: {
      ...adminConv.lastMessage,
      sender: adminConv.lastMessage.sender === 'user' ? 'user' : 'admin',
    },
    messages: adminConv.messages.map((msg: any) => ({
      ...msg,
      sender: msg.sender === 'user' ? 'user' : 'admin',
    })),
  };
};

/**
 * Load all user conversations from localStorage
 */
export const loadAdminConversations = (): Conversation[] => {
  const allUserConversations: Conversation[] = [];
  
  // Parcourir le localStorage pour trouver toutes les conversations des utilisateurs
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('conversations_')) {
      try {
        const userId = key.replace('conversations_', '');
        const userConversations = JSON.parse(localStorage.getItem(key) || '[]', (k, v) => {
          if (k === 'timestamp' && typeof v === 'string') {
            return new Date(v);
          }
          return v;
        });
        
        // Filtrer pour trouver les conversations avec l'admin
        const adminConvs = userConversations.filter((conv: any) => 
          conv.with && conv.with.id === 'admin'
        );
        
        if (adminConvs.length > 0) {
          // Trouver les informations de l'utilisateur
          const usersData = JSON.parse(localStorage.getItem('users') || '[]');
          const userData = usersData.find((u: any) => u.id === userId);
          
          if (userData) {
            // Transformer la conversation pour le point de vue de l'admin
            const transformedConv = transformToAdminConversation(userId, userData, adminConvs[0]);
            allUserConversations.push(transformedConv);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la lecture des conversations:", error);
      }
    }
  }
  
  // Trier par date du dernier message (le plus récent en premier)
  allUserConversations.sort((a, b) => 
    b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime()
  );
  
  return allUserConversations;
};

/**
 * Update a user's conversation in localStorage
 */
export const updateUserConversation = (userId: string, updatedConversation: Conversation) => {
  try {
    const key = `conversations_${userId}`;
    let userConversations = [];
    
    try {
      const storedConversations = localStorage.getItem(key);
      if (storedConversations) {
        userConversations = JSON.parse(storedConversations, (k, v) => {
          if (k === 'timestamp' && typeof v === 'string') {
            return new Date(v);
          }
          return v;
        });
      }
    } catch (error) {
      console.error("Erreur lors de la lecture des conversations de l'utilisateur:", error);
      userConversations = [];
    }
    
    // Check if the admin conversation exists
    const adminConvIndex = userConversations.findIndex((conv: any) => 
      conv.with && conv.with.id === 'admin'
    );
    
    if (adminConvIndex >= 0) {
      // Update existing admin conversation
      userConversations[adminConvIndex] = {
        ...userConversations[adminConvIndex],
        lastMessage: {
          content: updatedConversation.lastMessage.content,
          timestamp: updatedConversation.lastMessage.timestamp,
          read: false, // Mark as unread for the user
          sender: updatedConversation.lastMessage.sender === 'admin' ? 'admin' : 'user',
        },
        messages: updatedConversation.messages.map(msg => ({
          ...msg,
          sender: msg.sender === 'admin' ? 'admin' : 'user',
          read: msg.sender === 'user', // User messages are read, admin messages are unread
        })),
      };
    } else {
      // Create new admin conversation for the user
      userConversations.push({
        id: `admin-${Date.now()}`,
        with: {
          id: 'admin',
          name: 'Administrateur',
          avatar: '/placeholder.svg',
          role: 'admin',
        },
        lastMessage: {
          content: updatedConversation.lastMessage.content,
          timestamp: updatedConversation.lastMessage.timestamp,
          read: false,
          sender: updatedConversation.lastMessage.sender === 'admin' ? 'admin' : 'user',
        },
        messages: updatedConversation.messages.map(msg => ({
          ...msg,
          sender: msg.sender === 'admin' ? 'admin' : 'user',
          read: msg.sender === 'user',
        })),
      });
    }
    
    localStorage.setItem(key, JSON.stringify(userConversations));
    console.log(`Conversation mise à jour pour l'utilisateur ${userId}`);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des conversations:", error);
  }
};

/**
 * Get unread message count for a conversation
 */
export const getUnreadCount = (conversation: Conversation): number => {
  return conversation.messages.filter(msg => !msg.read && msg.sender === 'user').length;
};

/**
 * Get total unread message count across all conversations
 */
export const getTotalUnreadCount = (conversations: Conversation[]): number => {
  return conversations.reduce((count, conv) => {
    return count + getUnreadCount(conv);
  }, 0);
};

/**
 * Mark all messages in a conversation as read
 */
export const markConversationAsRead = (conversation: Conversation): Conversation => {
  if (!conversation) return conversation;
  
  return {
    ...conversation,
    messages: conversation.messages.map(msg => ({
      ...msg,
      read: true
    })),
    lastMessage: {
      ...conversation.lastMessage,
      read: true
    }
  };
};
