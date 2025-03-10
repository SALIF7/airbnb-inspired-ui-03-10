
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, MessageSquare, Home, CreditCard, Calendar, User, CheckCircle,
  AlertTriangle, Clock, Star, Info, ShieldAlert
} from 'lucide-react';

// Types pour simuler les données
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'message' | 'reservation' | 'payment' | 'system' | 'alert';
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
  actionLabel?: string;
}

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'reservation':
        return <Calendar className="h-5 w-5 text-green-500" />;
      case 'payment':
        return <CreditCard className="h-5 w-5 text-purple-500" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'system':
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className={`p-4 border-b transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}>
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className={`font-medium ${!notification.read ? 'text-black' : 'text-gray-700'}`}>
              {notification.title}
            </h3>
            <span className="text-xs text-gray-500">
              {notification.timestamp.toLocaleDateString()}
            </span>
          </div>
          <p className={`text-sm mt-1 ${!notification.read ? 'text-gray-800' : 'text-gray-500'}`}>
            {notification.message}
          </p>
          {notification.actionUrl && notification.actionLabel && (
            <div className="mt-2">
              <Button size="sm" variant="outline" asChild>
                <a href={notification.actionUrl}>{notification.actionLabel}</a>
              </Button>
            </div>
          )}
        </div>
        {!notification.read && (
          <div className="h-2 w-2 bg-primary rounded-full"></div>
        )}
      </div>
    </div>
  );
};

const Notifications = () => {
  // Notifications simulées
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Nouveau message',
      message: 'Sophie Martin vous a envoyé un message concernant votre réservation.',
      type: 'message',
      read: false,
      timestamp: new Date(Date.now() - 3600000), // 1 heure
      actionUrl: '/messages',
      actionLabel: 'Voir le message',
    },
    {
      id: '2',
      title: 'Réservation confirmée',
      message: 'Votre réservation pour "Appartement spacieux au cœur de Lomé" a été confirmée.',
      type: 'reservation',
      read: false,
      timestamp: new Date(Date.now() - 86400000), // 1 jour
      actionUrl: '/reservations',
      actionLabel: 'Voir ma réservation',
    },
    {
      id: '3',
      title: 'Paiement reçu',
      message: 'Le paiement de 650€ pour votre séjour a été effectué avec succès.',
      type: 'payment',
      read: true,
      timestamp: new Date(Date.now() - 172800000), // 2 jours
    },
    {
      id: '4',
      title: 'Rappel',
      message: 'Votre séjour à "Villa avec piscine à Kégué" commence dans 3 jours.',
      type: 'system',
      read: true,
      timestamp: new Date(Date.now() - 259200000), // 3 jours
    },
    {
      id: '5',
      title: 'Alerte de sécurité',
      message: 'Une connexion inhabituelle a été détectée sur votre compte. Vérifiez vos paramètres de sécurité.',
      type: 'alert',
      read: true,
      timestamp: new Date(Date.now() - 604800000), // 7 jours
      actionUrl: '/profile?tab=security',
      actionLabel: 'Vérifier maintenant',
    },
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8 mt-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Badge className="bg-primary h-6">
                {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <Button variant="outline" size="sm">Tout marquer comme lu</Button>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Centre de notifications</CardTitle>
            <CardDescription>Restez informé de toutes vos activités récentes</CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="all">
            <div className="px-6">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">Toutes</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Non lues ({unreadCount})</TabsTrigger>
                <TabsTrigger value="messages" className="flex-1">Messages</TabsTrigger>
                <TabsTrigger value="reservations" className="flex-1">Réservations</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              <div className="max-h-[600px] overflow-auto">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Pas de notifications</h3>
                    <p className="text-gray-500">
                      Vous n'avez aucune notification pour le moment.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="unread">
              <div className="max-h-[600px] overflow-auto">
                {notifications.filter(n => !n.read).length > 0 ? (
                  notifications.filter(n => !n.read).map(notification => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Tout est à jour</h3>
                    <p className="text-gray-500">
                      Vous avez lu toutes vos notifications.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="messages">
              <div className="max-h-[600px] overflow-auto">
                {notifications.filter(n => n.type === 'message').length > 0 ? (
                  notifications.filter(n => n.type === 'message').map(notification => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Pas de messages</h3>
                    <p className="text-gray-500">
                      Vous n'avez aucune notification de message.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="reservations">
              <div className="max-h-[600px] overflow-auto">
                {notifications.filter(n => n.type === 'reservation').length > 0 ? (
                  notifications.filter(n => n.type === 'reservation').map(notification => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Pas de réservations</h3>
                    <p className="text-gray-500">
                      Vous n'avez aucune notification de réservation.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="border-t flex justify-between pt-6">
            <Button variant="outline" asChild>
              <a href="/profile">
                <User className="mr-2 h-4 w-4" />
                Gérer mes préférences de notification
              </a>
            </Button>
            <Button variant="ghost" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Historique complet
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;
