
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useLocalStorage from "./useLocalStorage";
import useAuth from "./useAuth";

export interface SocialInteraction {
  id: string;
  type: 'job' | 'listing';
  itemId: string;
  likes: string[]; // array of user IDs
  comments: Comment[];
  shares: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: string;
}

const INITIAL_INTERACTIONS: SocialInteraction[] = [];

export const useSocialInteractions = () => {
  const { loadData, saveData } = useLocalStorage();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Charger toutes les interactions sociales
  const { data: interactions = [], isLoading } = useQuery({
    queryKey: ['social-interactions'],
    queryFn: async (): Promise<SocialInteraction[]> => {
      return loadData('social-interactions', INITIAL_INTERACTIONS);
    },
    staleTime: 0,
    gcTime: 0,
  });

  // Fonction helper pour trouver ou créer une interaction
  const findOrCreateInteraction = (type: 'job' | 'listing', itemId: string): SocialInteraction => {
    const currentInteractions = loadData('social-interactions', INITIAL_INTERACTIONS);
    let interaction = currentInteractions.find(i => i.type === type && i.itemId === itemId);
    
    if (!interaction) {
      interaction = {
        id: Math.random().toString(36).substring(7),
        type,
        itemId,
        likes: [],
        comments: [],
        shares: 0
      };
      currentInteractions.push(interaction);
      saveData('social-interactions', currentInteractions);
    }
    
    return interaction;
  };

  // Mutation pour liker/unliker un item
  const toggleLike = useMutation({
    mutationFn: async ({ type, itemId }: { type: 'job' | 'listing'; itemId: string }) => {
      if (!user) {
        throw new Error("Vous devez être connecté pour aimer un élément");
      }
      
      const currentInteractions = loadData('social-interactions', INITIAL_INTERACTIONS);
      let interactionIndex = currentInteractions.findIndex(i => i.type === type && i.itemId === itemId);
      
      if (interactionIndex === -1) {
        // Créer une nouvelle interaction si elle n'existe pas
        const newInteraction: SocialInteraction = {
          id: Math.random().toString(36).substring(7),
          type,
          itemId,
          likes: [user.id],
          comments: [],
          shares: 0
        };
        currentInteractions.push(newInteraction);
      } else {
        // Mettre à jour les likes
        const interaction = currentInteractions[interactionIndex];
        const hasLiked = interaction.likes.includes(user.id);
        
        if (hasLiked) {
          interaction.likes = interaction.likes.filter(id => id !== user.id);
        } else {
          interaction.likes.push(user.id);
        }
      }
      
      saveData('social-interactions', currentInteractions);
      
      return { type, itemId };
    },
    onSuccess: ({ type, itemId }) => {
      queryClient.invalidateQueries({ queryKey: ['social-interactions'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Mutation pour ajouter un commentaire
  const addComment = useMutation({
    mutationFn: async ({ 
      type, 
      itemId, 
      text 
    }: { 
      type: 'job' | 'listing'; 
      itemId: string; 
      text: string;
    }) => {
      if (!user) {
        throw new Error("Vous devez être connecté pour commenter");
      }
      
      if (!text.trim()) {
        throw new Error("Le commentaire ne peut pas être vide");
      }
      
      const currentInteractions = loadData('social-interactions', INITIAL_INTERACTIONS);
      let interaction = currentInteractions.find(i => i.type === type && i.itemId === itemId);
      
      const newComment: Comment = {
        id: Math.random().toString(36).substring(7),
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        text: text.trim(),
        createdAt: new Date().toISOString()
      };
      
      if (!interaction) {
        // Créer une nouvelle interaction si elle n'existe pas
        interaction = {
          id: Math.random().toString(36).substring(7),
          type,
          itemId,
          likes: [],
          comments: [newComment],
          shares: 0
        };
        currentInteractions.push(interaction);
      } else {
        // Ajouter le commentaire
        interaction.comments.push(newComment);
      }
      
      saveData('social-interactions', currentInteractions);
      
      return newComment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-interactions'] });
      toast.success("Commentaire ajouté avec succès");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Mutation pour supprimer un commentaire
  const deleteComment = useMutation({
    mutationFn: async ({ 
      type, 
      itemId, 
      commentId 
    }: { 
      type: 'job' | 'listing'; 
      itemId: string; 
      commentId: string;
    }) => {
      if (!user) {
        throw new Error("Vous devez être connecté pour supprimer un commentaire");
      }
      
      const currentInteractions = loadData('social-interactions', INITIAL_INTERACTIONS);
      const interactionIndex = currentInteractions.findIndex(i => i.type === type && i.itemId === itemId);
      
      if (interactionIndex === -1) {
        throw new Error("Commentaire introuvable");
      }
      
      const interaction = currentInteractions[interactionIndex];
      const commentIndex = interaction.comments.findIndex(c => c.id === commentId);
      
      if (commentIndex === -1) {
        throw new Error("Commentaire introuvable");
      }
      
      const comment = interaction.comments[commentIndex];
      
      // Vérifier que l'utilisateur est l'auteur du commentaire
      if (comment.userId !== user.id) {
        throw new Error("Vous ne pouvez pas supprimer le commentaire d'un autre utilisateur");
      }
      
      interaction.comments.splice(commentIndex, 1);
      saveData('social-interactions', currentInteractions);
      
      return { type, itemId, commentId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-interactions'] });
      toast.success("Commentaire supprimé avec succès");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Mutation pour incrémenter le compteur de partages
  const incrementShares = useMutation({
    mutationFn: async ({ type, itemId }: { type: 'job' | 'listing'; itemId: string }) => {
      const currentInteractions = loadData('social-interactions', INITIAL_INTERACTIONS);
      let interaction = currentInteractions.find(i => i.type === type && i.itemId === itemId);
      
      if (!interaction) {
        interaction = {
          id: Math.random().toString(36).substring(7),
          type,
          itemId,
          likes: [],
          comments: [],
          shares: 1
        };
        currentInteractions.push(interaction);
      } else {
        interaction.shares += 1;
      }
      
      saveData('social-interactions', currentInteractions);
      
      return { type, itemId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-interactions'] });
    },
  });

  // Fonction helper pour obtenir l'interaction d'un élément spécifique
  const getInteraction = (type: 'job' | 'listing', itemId: string): SocialInteraction | undefined => {
    return interactions.find(i => i.type === type && i.itemId === itemId);
  };

  // Fonction helper pour vérifier si l'utilisateur actuel a liké
  const hasUserLiked = (type: 'job' | 'listing', itemId: string): boolean => {
    if (!user) return false;
    const interaction = getInteraction(type, itemId);
    return interaction ? interaction.likes.includes(user.id) : false;
  };

  return {
    interactions,
    isLoading,
    toggleLike,
    addComment,
    deleteComment,
    incrementShares,
    getInteraction,
    hasUserLiked
  };
};
