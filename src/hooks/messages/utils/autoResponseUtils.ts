
import { Conversation, Message } from '@/components/messages/types';
import { toast } from 'sonner';
import { updateAdminConversation } from './adminConversationUtils';

/**
 * Checks if this is the first message from user to admin
 */
const isFirstMessageToAdmin = (conversation: Conversation): boolean => {
  // Filter messages to only those sent by the user
  const userMessages = conversation.messages.filter(msg => msg.sender === 'user');
  // If there's only one user message, it's the first message
  return userMessages.length === 1;
};

/**
 * Generates and handles automatic responses for system or admin conversations
 * with a realistic delay, but only for first-time messages to admin
 */
export const handleAutoResponse = (
  userId: string,
  selectedConversation: Conversation,
  updatedConversation: Conversation,
  updatedConversations: Conversation[],
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>,
  setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation | null>>
): void => {
  // Only auto-respond for welcome-bot OR for first message to admin
  const shouldAutoRespond = 
    selectedConversation.with.id === 'welcome-bot' || 
    (selectedConversation.with.id === 'admin' && isFirstMessageToAdmin(updatedConversation));
  
  if (!shouldAutoRespond) {
    // For non-first messages to admin, just store in admin's notifications
    if (selectedConversation.with.id === 'admin') {
      try {
        // Get user data
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const currentUser = users.find((u: any) => u.id === userId);
        
        if (currentUser) {
          // Get the last user message to notify admin
          const userMessage = updatedConversation.messages[updatedConversation.messages.length - 1];
          
          // Update admin conversation in admin storage WITHOUT an auto-response
          updateAdminConversation(
            userId, 
            userMessage, 
            null, // No auto-response
            currentUser
          );
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la conversation admin:", error);
      }
    }
    return;
  }
  
  // Add a realistic typing delay between 3-7 seconds
  const typingDelay = Math.random() * 4000 + 3000;
  
  // Show a "typing" indicator or notification
  const typingNotification = toast.loading(
    selectedConversation.with.id === 'admin' 
      ? "L'administrateur est en train d'écrire..."
      : "Le système prépare une réponse...",
    { duration: typingDelay }
  );
  
  setTimeout(() => {
    // Dismiss the typing notification
    toast.dismiss(typingNotification);
    
    const autoResponseSender = selectedConversation.with.id === 'admin' ? 'admin' : 'system';
    const autoResponse: Message = {
      id: `auto-${Date.now()}`,
      content: selectedConversation.with.id === 'admin' 
        ? "Merci pour votre message. Je reviendrai vers vous dès que possible."
        : "Merci de votre intérêt pour nos services. Notre équipe est là pour vous aider !",
      timestamp: new Date(),
      read: false,
      sender: autoResponseSender as "admin" | "system",
    };
    
    // Add the automatic response to the local conversation
    const convWithResponse = {
      ...updatedConversation,
      messages: [...updatedConversation.messages, autoResponse],
      lastMessage: {
        content: autoResponse.content,
        timestamp: autoResponse.timestamp,
        read: false,
        sender: autoResponseSender as "admin" | "system",
      },
    };
    
    // Update local state
    const finalConversations = updatedConversations.map(conv => 
      conv.id === selectedConversation.id ? convWithResponse : conv
    );
    
    setConversations(finalConversations);
    setSelectedConversation(convWithResponse);
    
    // Update localStorage
    localStorage.setItem(`conversations_${userId}`, JSON.stringify(finalConversations));
    
    // If admin, also update admin-side localStorage
    if (selectedConversation.with.id === 'admin') {
      try {
        // Get user data
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const currentUser = users.find((u: any) => u.id === userId);
        
        if (currentUser) {
          // Get the last user message to use with the auto-response
          const userMessage = updatedConversation.messages[updatedConversation.messages.length - 1];
          
          // Update admin conversation in admin storage
          updateAdminConversation(userId, userMessage, autoResponse, currentUser);
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la conversation admin:", error);
      }
    }
    
    toast.success("Nouveau message reçu");
  }, typingDelay); // Use the typing delay
};
