
import React, { useState, useRef, useEffect } from 'react';
import { useRecording } from './input/hooks/useRecording';
import { useMediaHandling } from './input/hooks/useMediaHandling';
import EmojiPicker from './input/EmojiPicker';
import StickerPicker from './input/StickerPicker';
import MediaAttachmentButtons from './input/MediaAttachmentButtons';
import MediaPreview from './input/MediaPreview';
import VoiceRecorder from './input/VoiceRecorder';
import SendButton from './input/SendButton';
import { toast } from 'sonner';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  newMessage, 
  setNewMessage, 
  handleSendMessage 
}) => {
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const [selectionPosition, setSelectionPosition] = useState<number | null>(null);

  // Use custom hooks for recording and media handling
  const {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
    formatRecordingTime
  } = useRecording();

  const {
    mediaPreview,
    mediaType,
    fileInputRef,
    handleFileSelect,
    handleFileChange,
    handleAudioPreview,
    cancelMediaPreview
  } = useMediaHandling();

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
          try {
            const newRange = document.createRange();
            newRange.setStart(inputRef.current.firstChild || inputRef.current, 
                             Math.min(selectionPosition, newMessage.length));
            newRange.collapse(true);
            
            selection?.removeAllRanges();
            selection?.addRange(newRange);
          } catch (e) {
            console.log("Erreur de positionnement du curseur:", e);
          }
          
          // Réinitialiser pour éviter de repositionner lors d'autres rendus
          setSelectionPosition(null);
        }
      }
    }
  }, [newMessage, selectionPosition]);

  const sendMessage = () => {
    if ((!newMessage.trim() && !mediaPreview) || isSending) return;
    
    setIsSending(true);
    
    let messageContent = newMessage.trim();
    
    // Add a prefix for image or audio messages to identify them later
    if (mediaPreview && mediaType === 'image') {
      messageContent = `image-message: ${mediaPreview}`;
    } else if (mediaPreview && mediaType === 'audio') {
      messageContent = `audio-message: Audio recording (${recordingTime}s)`;
    }
    
    // Set the message content
    setNewMessage(messageContent);
    
    // Add a small delay to ensure the message content is set
    setTimeout(() => {
      try {
        handleSendMessage();
        // Clear media preview after sending
        if (mediaPreview) {
          console.log("Message with media sent:", messageContent.substring(0, 50) + "...");
        }
        cancelMediaPreview();
        setNewMessage('');
      } finally {
        setIsSending(false);
      }
    }, 300); // Slightly longer delay to ensure content is processed
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setNewMessage(newMessage + emoji);
    setShowEmojiPicker(false);
  };

  const handleStickerClick = (stickerUrl: string) => {
    // This would normally send a sticker message
    toast.success("Fonctionnalité d'envoi de stickers à venir");
    setShowStickerPicker(false);
  };

  const handleSendButtonClick = () => {
    if (newMessage.trim() || mediaPreview) {
      sendMessage();
    } else {
      startRecording();
    }
  };

  const handleStopRecording = () => {
    const duration = stopRecording();
    const isValidRecording = handleAudioPreview(duration);
    
    if (isValidRecording) {
      // Focus the input field for adding a caption
      inputRef.current?.focus();
    }
  };

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
    <div className="whatsapp-input-area">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
      />
      
      {mediaPreview ? (
        <MediaPreview 
          mediaPreview={mediaPreview}
          mediaType={mediaType}
          cancelMediaPreview={cancelMediaPreview}
        />
      ) : (
        <>
          <EmojiPicker 
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            onEmojiClick={handleEmojiClick}
          />
          
          <StickerPicker 
            showStickerPicker={showStickerPicker}
            setShowStickerPicker={setShowStickerPicker}
            onStickerClick={handleStickerClick}
          />
          
          <MediaAttachmentButtons handleFileSelect={handleFileSelect} />
        </>
      )}
      
      <div 
        ref={inputRef}
        contentEditable 
        className="whatsapp-input" 
        dir="ltr" // Force left-to-right text direction
        data-placeholder="Saisissez votre message..."
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning={true}
      ></div>
      
      <VoiceRecorder 
        isRecording={isRecording}
        recordingTime={recordingTime}
        stopRecording={handleStopRecording}
        formatRecordingTime={formatRecordingTime}
      />
      
      {!isRecording && (
        <SendButton 
          hasContent={Boolean(newMessage.trim() || mediaPreview)}
          isSending={isSending}
          onClick={handleSendButtonClick}
        />
      )}
    </div>
  );
};

export default MessageInput;
