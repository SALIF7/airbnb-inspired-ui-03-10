
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Eye } from 'lucide-react';

interface MessagePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
  message: string;
  recipient: string;
}

export const MessagePreview: React.FC<MessagePreviewProps> = ({
  isOpen,
  onClose,
  onSend,
  message,
  recipient
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Prévisualisation du message
          </DialogTitle>
          <DialogDescription>
            Vérifiez votre message avant de l'envoyer à {recipient}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="Admin" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="font-medium">Administrateur</div>
          </div>
          
          <div className="bg-green-100 rounded-lg p-3 mt-2">
            <p className="whitespace-pre-wrap">{message}</p>
          </div>
        </div>
        
        <DialogFooter className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Modifier
          </Button>
          <Button onClick={onSend} className="ml-2">
            <Send className="h-4 w-4 mr-2" />
            Envoyer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
