
import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, User, MessageSquare } from 'lucide-react';
import SystemMessagesTab from '@/components/admin/messages/SystemMessagesTab';
import ContactSubmissionsTab from '@/components/admin/messages/contact/ContactSubmissionsTab';
import { useAdminMessages } from '@/hooks/useAdminMessages';
import { EnhancedConversationList } from '@/components/admin/messages/EnhancedConversationList';
import { EnhancedConversationView } from '@/components/admin/messages/EnhancedConversationView';
import { useAdvancedMessaging } from '@/hooks/messages/useAdvancedMessaging';
import { Conversation, Message } from '@/components/messages/types';

const AdminMessages: React.FC = () => {
  const {
    conversations,
    selectedConversation,
    newMessage,
    searchQuery,
    filter,
    totalUnreadCount,
    setNewMessage,
    setSearchQuery,
    setFilter,
    handleSendMessage,
    handleSelectConversation,
    getUnreadCount,
    sendingMessage
  } = useAdminMessages();
  
  // Utiliser les fonctionnalités avancées de messagerie
  const {
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
  } = useAdvancedMessaging(
    conversations,
    selectedConversation,
    handleSendMessage,
    newMessage,
    setNewMessage
  );
  
  // Ensure onlineUsers is correctly typed as a Record<string, boolean>
  const typedOnlineUsers: Record<string, boolean> = onlineUsers as Record<string, boolean>;
  
  // Type for search results
  type SearchResult = { conversation: Conversation; message: Message };
  
  // Recherche avancée - résultats
  const searchResults: SearchResult[] = advancedSearchQuery 
    ? (performAdvancedSearch(advancedSearchQuery) as unknown as SearchResult[])
    : [];

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      
      <div className="flex flex-col">
        <AdminTopbar />
        
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Messages</h1>
            <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800">
              {totalUnreadCount} non lus
            </Badge>
          </div>
          
          <Tabs defaultValue="messages" className="w-full">
            <TabsList>
              <TabsTrigger value="messages" className="flex gap-2">
                <Users className="h-4 w-4" />
                Messages des utilisateurs
              </TabsTrigger>
              <TabsTrigger value="system" className="flex gap-2">
                <User className="h-4 w-4" />
                Messages système
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex gap-2">
                <MessageSquare className="h-4 w-4" />
                Formulaires de contact
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="messages" className="space-y-4">
              <Card>
                <CardContent className="p-6 h-[calc(100vh-280px)]">
                  <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-4">
                    {/* Liste des conversations améliorée */}
                    <EnhancedConversationList
                      conversations={conversations}
                      selectedConversation={selectedConversation}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      filter={filter as 'all' | 'unread' | 'important'}
                      setFilter={(value) => setFilter(value as any)}
                      handleSelectConversation={handleSelectConversation}
                      getUnreadCount={getUnreadCount}
                      onlineUsers={typedOnlineUsers}
                      markedImportant={markedImportant}
                      toggleImportant={toggleImportant}
                      isAdvancedSearchOpen={isAdvancedSearchOpen}
                      setIsAdvancedSearchOpen={setIsAdvancedSearchOpen}
                      advancedSearchQuery={advancedSearchQuery}
                      setAdvancedSearchQuery={setAdvancedSearchQuery}
                      searchResults={searchResults}
                      performAdvancedSearch={performAdvancedSearch as any}
                    />
                    
                    {/* Vue de conversation améliorée */}
                    <EnhancedConversationView
                      conversation={selectedConversation}
                      newMessage={newMessage}
                      setNewMessage={setNewMessage}
                      handleSendMessage={handleSendMessage}
                      isSending={sendingMessage}
                      isOnline={selectedConversation ? typedOnlineUsers[selectedConversation.with.id] || false : false}
                      quickResponses={quickResponses}
                      onQuickResponseSelect={applyQuickResponse}
                      onAddQuickResponse={addQuickResponse}
                      onRemoveQuickResponse={removeQuickResponse}
                      isPreviewMode={isPreviewMode}
                      previewMessage={previewMessage}
                      sendFromPreview={sendFromPreview}
                      cancelPreview={cancelPreview}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="system" className="space-y-4">
              <SystemMessagesTab />
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <ContactSubmissionsTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminMessages;
