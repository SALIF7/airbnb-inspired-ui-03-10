
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const NotAuthenticated: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <Card className="max-w-md mx-auto mt-12">
        <CardContent className="p-6 text-center">
          <Info className="w-12 h-12 mx-auto text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Connectez-vous pour accéder à la messagerie</h2>
          <p className="text-gray-600 mb-4">
            Pour envoyer et recevoir des messages, vous devez vous connecter à votre compte.
          </p>
          <Button asChild className="mt-4 w-full">
            <a href="/login">Se connecter</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotAuthenticated;
