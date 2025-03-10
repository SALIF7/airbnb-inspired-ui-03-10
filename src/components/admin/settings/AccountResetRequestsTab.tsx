
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { AlertTriangle, Check, X, Lock, Key } from "lucide-react";

const AccountResetRequestsTab = () => {
  const { getAccountResetRequests, updateResetRequestStatus } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getAccountResetRequests) {
      const fetchRequests = () => {
        const resetRequests = getAccountResetRequests();
        setRequests(resetRequests);
        setLoading(false);
      };
      fetchRequests();
      
      // Configurer un rafraîchissement périodique
      const intervalId = setInterval(fetchRequests, 10000);
      return () => clearInterval(intervalId);
    }
  }, [getAccountResetRequests]);

  const handleApprove = (requestId: string, email: string, requestType: string) => {
    if (updateResetRequestStatus) {
      const unlockAccount = requestType === 'account_reset';
      const success = updateResetRequestStatus(requestId, 'approved', unlockAccount);
      
      if (success) {
        let successMessage = '';
        if (requestType === 'account_reset') {
          successMessage = `Compte de ${email} déverrouillé avec succès`;
        } else if (requestType === 'password_reset') {
          successMessage = `Demande de réinitialisation de mot de passe pour ${email} approuvée`;
        }
        toast.success(successMessage);
        
        // Mettre à jour la liste des demandes
        setRequests(prev => 
          prev.map(req => 
            req.id === requestId ? { ...req, status: 'approved' } : req
          )
        );
      } else {
        toast.error("Erreur lors du traitement de la demande");
      }
    }
  };

  const handleReject = (requestId: string, email: string) => {
    if (updateResetRequestStatus) {
      const success = updateResetRequestStatus(requestId, 'rejected', false);
      
      if (success) {
        toast.success(`Demande de ${email} rejetée`);
        
        // Mettre à jour la liste des demandes
        setRequests(prev => 
          prev.map(req => 
            req.id === requestId ? { ...req, status: 'rejected' } : req
          )
        );
      } else {
        toast.error("Erreur lors du rejet de la demande");
      }
    }
  };

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case 'account_reset':
        return <Lock className="h-4 w-4 text-orange-500" />;
      case 'password_reset':
        return <Key className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getRequestTypeName = (type: string) => {
    switch (type) {
      case 'account_reset':
        return "Déverrouillage de compte";
      case 'password_reset':
        return "Réinitialisation de mot de passe";
      default:
        return "Demande inconnue";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Demandes de réinitialisation de comptes</CardTitle>
        <CardDescription>
          Gérez les demandes des utilisateurs qui souhaitent déverrouiller leur compte ou réinitialiser leur mot de passe
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>Aucune demande de réinitialisation en attente</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getRequestTypeIcon(request.type)}
                        {getRequestTypeName(request.type)}
                      </div>
                    </TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDistanceToNow(new Date(request.timestamp), { addSuffix: true, locale: fr })}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {request.message}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          request.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : request.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }
                      >
                        {request.status === 'pending'
                          ? 'En attente'
                          : request.status === 'approved'
                          ? 'Approuvé'
                          : 'Rejeté'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {request.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleApprove(request.id, request.email, request.type)}
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only sm:not-sr-only sm:text-xs">Approuver</span>
                          </Button>
                          <Button
                            onClick={() => handleReject(request.id, request.email)}
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only sm:not-sr-only sm:text-xs">Rejeter</span>
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountResetRequestsTab;
