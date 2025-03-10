
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useSocialInteractions } from '@/hooks/useSocialInteractions';
import useAuth from '@/hooks/useAuth';
import { CommentsSection } from './CommentsSection';
import { ShareDialog } from './ShareDialog';

interface SocialBarProps {
  type: 'job' | 'listing';
  itemId: string;
  title: string;
  url: string;
}

export const SocialBar = ({ type, itemId, title, url }: SocialBarProps) => {
  const { user } = useAuth();
  const { 
    getInteraction, 
    hasUserLiked, 
    toggleLike, 
    incrementShares 
  } = useSocialInteractions();
  
  const [showComments, setShowComments] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  
  const interaction = getInteraction(type, itemId);
  const likeCount = interaction?.likes.length || 0;
  const commentCount = interaction?.comments.length || 0;
  const shareCount = interaction?.shares || 0;
  const userHasLiked = hasUserLiked(type, itemId);
  
  const handleLikeClick = () => {
    if (!user) {
      toast.error("Vous devez être connecté pour aimer cette publication");
      return;
    }
    
    toggleLike.mutate({ type, itemId });
  };
  
  const handleCommentClick = () => {
    if (!user) {
      toast.error("Vous devez être connecté pour commenter");
      return;
    }
    
    setShowComments(!showComments);
  };
  
  const handleShareClick = () => {
    setShowShareDialog(true);
  };
  
  const handleShare = (platform: string) => {
    incrementShares.mutate({ type, itemId });
    toast.success(`Partagé sur ${platform}`);
    setShowShareDialog(false);
  };
  
  return (
    <div className="space-y-4">
      <Card className="bg-gray-50 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center space-x-1 ${userHasLiked ? 'text-red-500' : ''}`}
              onClick={handleLikeClick}
            >
              <Heart className={`h-5 w-5 ${userHasLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{likeCount > 0 ? likeCount : ''}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-1"
              onClick={handleCommentClick}
            >
              <MessageCircle className="h-5 w-5" />
              <span>{commentCount > 0 ? commentCount : ''}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-1"
              onClick={handleShareClick}
            >
              <Share2 className="h-5 w-5" />
              <span>{shareCount > 0 ? shareCount : ''}</span>
            </Button>
          </div>
          
          {(likeCount > 0 || commentCount > 0 || shareCount > 0) && (
            <div className="flex items-center space-x-2">
              {likeCount > 0 && <Badge variant="secondary">{likeCount} J'aime</Badge>}
              {commentCount > 0 && <Badge variant="secondary">{commentCount} Commentaires</Badge>}
              {shareCount > 0 && <Badge variant="secondary">{shareCount} Partages</Badge>}
            </div>
          )}
        </div>
      </Card>
      
      {showComments && <CommentsSection type={type} itemId={itemId} />}
      
      <ShareDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        title={title}
        url={url}
        onShare={handleShare}
      />
    </div>
  );
};
