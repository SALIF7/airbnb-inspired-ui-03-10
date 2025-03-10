
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useSocialInteractions } from '@/hooks/useSocialInteractions';
import useAuth from '@/hooks/useAuth';

interface CommentsSectionProps {
  type: 'job' | 'listing';
  itemId: string;
}

export const CommentsSection = ({ type, itemId }: CommentsSectionProps) => {
  const { user } = useAuth();
  const { 
    getInteraction, 
    addComment, 
    deleteComment 
  } = useSocialInteractions();
  
  const [commentText, setCommentText] = useState('');
  
  const interaction = getInteraction(type, itemId);
  const comments = interaction?.comments || [];
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;
    
    addComment.mutate({
      type,
      itemId,
      text: commentText
    }, {
      onSuccess: () => {
        setCommentText('');
      }
    });
  };
  
  const handleDeleteComment = (commentId: string) => {
    deleteComment.mutate({
      type,
      itemId,
      commentId
    });
  };
  
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: fr
      });
    } catch (error) {
      return "récemment";
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Commentaires</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            Soyez le premier à commenter
          </p>
        ) : (
          <div className="space-y-4 max-h-[300px] overflow-auto">
            {comments.map(comment => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.userAvatar || "/placeholder.svg"} alt={comment.userName} />
                  <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 bg-gray-50 p-3 rounded-lg relative">
                  <div className="flex justify-between mb-1">
                    <p className="font-medium text-sm">{comment.userName}</p>
                    <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                  </div>
                  
                  <p className="text-sm">{comment.text}</p>
                  
                  {user && user.id === comment.userId && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 absolute top-2 right-2 opacity-50 hover:opacity-100"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <form onSubmit={handleSubmitComment} className="w-full flex space-x-2">
          <Input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="flex-1"
            disabled={!user}
          />
          <Button 
            type="submit" 
            disabled={!commentText.trim() || !user}
          >
            Envoyer
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
