
import { useState, useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { StatusMessage } from '../types';
import { useToast } from '@/hooks/use-toast';

export const useStatusManagement = () => {
  const { toast } = useToast();
  const { loadData, saveData } = useLocalStorage();
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  // Load status messages on component mount
  useEffect(() => {
    try {
      const rawData = loadData<any>('admin-status-messages', []);
      let processedMessages: StatusMessage[] = [];
      
      if (Array.isArray(rawData)) {
        // Check if it's already a flat array of StatusMessage objects
        if (rawData.length === 0 || (rawData.length > 0 && typeof rawData[0] === 'object' && rawData[0] !== null && 'id' in rawData[0])) {
          processedMessages = rawData as StatusMessage[];
        } 
        // Check if it's a nested array and flatten it
        else if (rawData.length > 0 && Array.isArray(rawData[0])) {
          const flattened = (rawData as any[]).flat();
          if (flattened.length > 0 && typeof flattened[0] === 'object' && flattened[0] !== null && 'id' in flattened[0]) {
            processedMessages = flattened as StatusMessage[];
          }
        }
      }
      
      setStatusMessages(processedMessages);
      
      // If we fixed the data format, save it back properly
      if (processedMessages.length > 0 && JSON.stringify(rawData) !== JSON.stringify(processedMessages)) {
        saveData('admin-status-messages', processedMessages);
      }
    } catch (error) {
      console.error('Error loading status messages:', error);
      setStatusMessages([]);
    }
  }, [loadData, saveData]);

  // Save status messages when they change
  useEffect(() => {
    if (statusMessages.length > 0) {
      saveData('admin-status-messages', statusMessages);
    }
  }, [statusMessages, saveData]);

  const handlePublish = (newStatusData: Omit<StatusMessage, 'id' | 'createdAt' | 'active'>) => {
    if (!newStatusData.text.trim()) {
      toast({
        title: "Texte requis",
        description: "Veuillez saisir un texte pour le statut",
        variant: "destructive"
      });
      return;
    }

    const newStatus: StatusMessage = {
      id: Date.now().toString(),
      text: newStatusData.text.trim(),
      imageUrl: newStatusData.imageUrl,
      createdAt: new Date().toISOString(),
      active: true,
      type: newStatusData.type,
      backgroundColor: newStatusData.backgroundColor,
      textColor: newStatusData.textColor
    };

    setStatusMessages([newStatus, ...statusMessages]);
    
    toast({
      title: "Statut publié",
      description: "Votre statut a été publié avec succès"
    });
  };

  const toggleStatusActive = (id: string) => {
    setStatusMessages(
      statusMessages.map(status => 
        status.id === id ? { ...status, active: !status.active } : status
      )
    );
    
    toast({
      title: "Statut mis à jour",
      description: "Le statut a été mis à jour avec succès"
    });
  };

  const deleteStatus = (id: string) => {
    setStatusMessages(statusMessages.filter(status => status.id !== id));
    
    toast({
      title: "Statut supprimé",
      description: "Le statut a été supprimé avec succès"
    });
  };

  return {
    statusMessages,
    handlePublish,
    toggleStatusActive,
    deleteStatus
  };
};
