
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, AlertCircle, Filter, FileSearch } from 'lucide-react';
import { Conversation, Message } from '@/components/messages/types';
import { ConversationListItem } from './ConversationListItem';
import { AdvancedSearch } from './AdvancedSearch';

interface EnhancedConversationListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: 'all' | 'unread' | 'important';
  setFilter: (filter: 'all' | 'unread' | 'important') => void;
  handleSelectConversation: (conversation: Conversation) => void;
  getUnreadCount: (conversation: Conversation) => number;
  onlineUsers: Record<string, boolean>;
  markedImportant: Record<string, boolean>;
  toggleImportant: (conversationId: string) => void;
  isAdvancedSearchOpen: boolean;
  setIsAdvancedSearchOpen: (isOpen: boolean) => void;
  advancedSearchQuery: string;
  setAdvancedSearchQuery: (query: string) => void;
  searchResults: Array<{conversation: Conversation, message: Message}>;
  performAdvancedSearch: (query: string) => Array<{conversation: Conversation, message: Message}>;
}

export const EnhancedConversationList: React.FC<EnhancedConversationListProps> = ({
  conversations,
  selectedConversation,
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  handleSelectConversation,
  getUnreadCount,
  onlineUsers,
  markedImportant,
  toggleImportant,
  isAdvancedSearchOpen,
  setIsAdvancedSearchOpen,
  advancedSearchQuery,
  setAdvancedSearchQuery,
  searchResults,
  performAdvancedSearch
}) => {
  // Filtrer les conversations
  const filteredConversations = conversations.filter(conv => {
    // Filtrer par recherche
    const matchesSearch = 
      conv.with.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtrer par onglet
    if (filter === 'unread') {
      return matchesSearch && getUnreadCount(conv) > 0;
    }
    
    if (filter === 'important') {
      return matchesSearch && markedImportant[conv.id];
    }
    
    return matchesSearch;
  });

  // Calculer le total des messages non lus
  const totalUnread = conversations.reduce((total, conv) => total + getUnreadCount(conv), 0);
  
  // Calculer le total des conversations importantes
  const totalImportant = Object.keys(markedImportant).length;
  
  // Ouvrir la recherche avancée
  const openAdvancedSearch = () => {
    setIsAdvancedSearchOpen(true);
  };
  
  // Gérer la recherche avancée
  const handleAdvancedSearch = (query: string) => {
    setAdvancedSearchQuery(query);
    const results = performAdvancedSearch(query);
    return results;
  };

  return (
    <div className="border-r rounded-l-lg">
      <div className="p-4 border-b">
        <div className="flex gap-2 mb-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              className="pl-9" 
              placeholder="Rechercher..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={openAdvancedSearch}
            className="h-10 w-10"
          >
            <FileSearch className="h-4 w-4" />
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as any)}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              Tous
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs sm:text-sm">
              Non lus ({totalUnread})
            </TabsTrigger>
            <TabsTrigger value="important" className="text-xs sm:text-sm">
              Importants ({totalImportant})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <ScrollArea className="h-[calc(100vh-380px)]">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <ConversationListItem
              key={conversation.id}
              conversation={conversation}
              isSelected={selectedConversation?.id === conversation.id}
              unreadCount={getUnreadCount(conversation)}
              onSelect={() => handleSelectConversation(conversation)}
              isOnline={onlineUsers[conversation.with.id] || false}
              isImportant={!!markedImportant[conversation.id]}
              onToggleImportant={() => toggleImportant(conversation.id)}
            />
          ))
        ) : (
          <div className="p-8 text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-gray-400 mb-2" />
            <p className="text-gray-500">
              {filter === 'unread' 
                ? 'Aucun message non lu' 
                : filter === 'important'
                  ? 'Aucune conversation importante'
                  : 'Aucune conversation trouvée'}
            </p>
          </div>
        )}
      </ScrollArea>
      
      <AdvancedSearch
        isOpen={isAdvancedSearchOpen}
        setIsOpen={setIsAdvancedSearchOpen}
        onSearch={handleAdvancedSearch}
        searchResults={searchResults}
        onSelectResult={(conversationId) => {
          const conversation = conversations.find(c => c.id === conversationId);
          if (conversation) {
            handleSelectConversation(conversation);
          }
        }}
      />
    </div>
  );
};
