
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2, Eye, Paperclip, Smile, Mic } from 'lucide-react';
import { QuickResponses } from './QuickResponses';
import { MessagePreview } from './MessagePreview';
import { Conversation } from '@/components/messages/types';

interface AdminMessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  conversation: Conversation | null;
  isSending: boolean;
  quickResponses: string[];
  onQuickResponseSelect: (text: string) => void;
  onAddQuickResponse: (text: string) => void;
  onRemoveQuickResponse: (index: number) => void;
  isPreviewMode: boolean;
  previewMessage: () => void;
  sendFromPreview: () => void;
  cancelPreview: () => void;
}

const AdminMessageInput: React.FC<AdminMessageInputProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  conversation,
  isSending,
  quickResponses,
  onQuickResponseSelect,
  onAddQuickResponse,
  onRemoveQuickResponse,
  isPreviewMode,
  previewMessage,
  sendFromPreview,
  cancelPreview
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [selectionPosition, setSelectionPosition] = useState<number | null>(null);

  // Cette fonction gère l'envoi du message
  const sendMessage = () => {
    if (!newMessage.trim() || isSending) return;
    handleSendMessage();
  };

  // Effet pour maintenir le contenu et le curseur à la bonne position
  useEffect(() => {
    if (inputRef.current) {
      // S'assurer que le contenu reflète toujours newMessage
      if (inputRef.current.textContent !== newMessage) {
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        
        // Sauvegarder la position du curseur avant de modifier le contenu
        const previousPosition = range?.startOffset || 0;
        
        // Mettre à jour le contenu
        inputRef.current.textContent = newMessage;
        
        // Restaurer la position du curseur seulement si on vient de taper du texte
        if (selectionPosition !== null) {
          const newRange = document.createRange();
          newRange.setStart(inputRef.current.firstChild || inputRef.current, 
                           Math.min(selectionPosition, newMessage.length));
          newRange.collapse(true);
          
          selection?.removeAllRanges();
          selection?.addRange(newRange);
          
          // Réinitialiser pour éviter de repositionner lors d'autres rendus
          setSelectionPosition(null);
        }
      }
    }
  }, [newMessage, selectionPosition]);

  // Fonction pour gérer les changements de texte manuellement
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.textContent || '';
    
    // Enregistrer la position actuelle du curseur
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const position = selection.getRangeAt(0).startOffset;
      setSelectionPosition(position);
    }
    
    setNewMessage(text);
  };

  return (
    <>
      <div className="whatsapp-input-area">
        <QuickResponses
          responses={quickResponses}
          onSelectResponse={onQuickResponseSelect}
          onAddResponse={onAddQuickResponse}
          onRemoveResponse={onRemoveQuickResponse}
        />
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500 hover:bg-gray-200 rounded-full"
        >
          <Smile className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500 hover:bg-gray-200 rounded-full"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        
        <div 
          ref={inputRef}
          contentEditable 
          className="whatsapp-input" 
          dir="ltr" // Force left-to-right text direction
          onInput={handleInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (!isPreviewMode) {
                previewMessage();
              }
            }
          }}
          suppressContentEditableWarning={true}
        ></div>
        
        <Button
          variant="outline"
          onClick={previewMessage}
          disabled={isSending || !newMessage.trim()}
          className="rounded-full mr-1"
          size="icon"
        >
          <Eye className="h-4 w-4" />
        </Button>
        
        <Button 
          onClick={sendMessage} 
          disabled={isSending || !newMessage.trim()}
          className="whatsapp-send-button"
          size="icon"
        >
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            newMessage.trim() ? <Send className="h-5 w-5" /> : <Mic className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {/* Modal de prévisualisation du message */}
      <MessagePreview
        isOpen={isPreviewMode}
        onClose={cancelPreview}
        onSend={sendFromPreview}
        message={newMessage}
        recipient={conversation?.with.name || 'Utilisateur'}
      />
    </>
  );
};

export default AdminMessageInput;
