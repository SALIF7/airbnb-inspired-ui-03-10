
import React from 'react';
import { Button } from '@/components/ui/button';
import { Send, Mic } from 'lucide-react';

interface SendButtonProps {
  hasContent: boolean;
  isSending: boolean;
  onClick: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ hasContent, isSending, onClick }) => {
  return (
    <Button 
      onClick={onClick}
      disabled={isSending}
      className="whatsapp-send-button touch-manipulation"
      size="icon"
    >
      {hasContent ? <Send className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
    </Button>
  );
};

export default SendButton;
