
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { format } from "date-fns";
import { AlertCircle, CheckCircle, Clock, Eye, Unlock, XCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type RequestStatus = 'pending' | 'approved' | 'rejected';

interface AccountResetRequest {
  id: string;
  email: string;
  message: string;
  timestamp: string;
  type: string;
  status: RequestStatus;
  resolvedAt?: string;
  resolvedBy?: string;
}

export const AccountResetRequestsTab = () => {
  const { user, checkAccountLocked, unlockUserAccount } = useAuth();
  const [requests, setRequests] = useState<AccountResetRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<AccountResetRequest | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    try {
      const storedRequests = JSON.parse(localStorage.getItem('admin_contact_requests') || '[]');
      setRequests(storedRequests);
    } catch (error) {
      console.error("Erreur lors du chargement des demandes:", error);
      setRequests([]);
    }
  };

  const updateRequest = (id: string, updates: Partial<AccountResetRequest>) => {
    const updatedRequests = requests.map(req => 
      req.id === id 
        ? { ...req, ...updates, resolvedAt: new Date().toISOString(), resolvedBy: user?.email } 
        : req
    );
    
    localStorage.setItem('admin_contact_requests', JSON.stringify(updatedRequests));
    setRequests(updatedRequests);
    
    // Log the action
    const securityLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
    securityLogs.push({
      type: 'account_reset_' + updates.status,
      adminEmail: user?.email,
      targetEmail: requests.find(r => r.id === id)?.email,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('security_logs', JSON.stringify(securityLogs));
  };

  const handleApprove = (id: string, email: string) => {
    // Check if account is locked
    const { locked } = checkAccountLocked(email);
    
    if (locked) {
      // Unlock the account
      const success = unlockUserAccount(email);
      
      if (success) {
        updateRequest(id, { status: 'approved' });
        toast.success(`Le compte ${email} a été déverrouillé avec succès`);
      } else {
        toast.error(`Échec du déverrouillage du compte ${email}`);
      }
    } else {
      // Account is not locked, just mark as approved
      updateRequest(id, { status: 'approved' });
      toast.success(`La demande pour ${email} a été approuvée`);
    }
  };

  const handleReject = (id: string) => {
    updateRequest(id, { status: 'rejected' });
    toast.info("La demande a été rejetée");
  };

  const viewRequest = (request: AccountResetRequest) => {
    setSelectedRequest(request);
    setViewDialogOpen(true);
  };

  const filteredRequests = requests.filter(req => req.status === activeTab);

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="w-3 h-3 mr-1" /> En attente</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" /> Approuvée</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" /> Rejetée</Badge>;
      default:
        return <Badge variant="outline"><AlertCircle className="w-3 h-3 mr-1" /> Inconnu</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Demandes de réinitialisation de compte</CardTitle>
        <CardDescription>
          Gérez les demandes des utilisateurs pour déverrouiller leurs comptes après trop de tentatives échouées.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="approved">Approuvées</TabsTrigger>
            <TabsTrigger value="rejected">Rejetées</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            {filteredRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-gray-50">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-gray-100 rounded-full">
                  {activeTab === 'pending' ? <Clock className="w-6 h-6 text-gray-500" /> : 
                   activeTab === 'approved' ? <CheckCircle className="w-6 h-6 text-gray-500" /> : 
                   <XCircle className="w-6 h-6 text-gray-500" />}
                </div>
                <h3 className="mb-1 text-lg font-medium">Aucune demande</h3>
                <p className="text-sm text-gray-500">
                  {activeTab === 'pending' 
                    ? "Il n'y a actuellement aucune demande de réinitialisation en attente."
                    : activeTab === 'approved' 
                    ? "Aucune demande n'a encore été approuvée."
                    : "Aucune demande n'a encore été rejetée."}
                </p>
              </div>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{format(new Date(request.timestamp), 'dd/MM/yyyy HH:mm')}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost"
                              size="icon"
                              onClick={() => viewRequest(request)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            
                            {request.status === 'pending' && (
                              <>
                                <Button 
                                  variant="ghost"
                                  size="icon"
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                  onClick={() => handleApprove(request.id, request.email)}
                                >
                                  <Unlock className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleReject(request.id)}
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* View Request Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Détails de la demande</DialogTitle>
              <DialogDescription>
                Demande de {selectedRequest?.email}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Statut</h4>
                <div>{selectedRequest && getStatusBadge(selectedRequest.status)}</div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Date de la demande</h4>
                <p className="text-sm">
                  {selectedRequest ? format(new Date(selectedRequest.timestamp), 'dd/MM/yyyy HH:mm') : ''}
                </p>
              </div>
              
              {selectedRequest?.resolvedAt && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Traitée le</h4>
                  <p className="text-sm">
                    {format(new Date(selectedRequest.resolvedAt), 'dd/MM/yyyy HH:mm')} 
                    {selectedRequest.resolvedBy ? ` par ${selectedRequest.resolvedBy}` : ''}
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Message</h4>
                <div className="p-3 bg-gray-50 rounded-md text-sm">
                  {selectedRequest?.message}
                </div>
              </div>
              
              {selectedRequest?.status === 'pending' && (
                <div className="flex space-x-2 pt-2">
                  <Button 
                    className="flex-1"
                    variant="outline"
                    onClick={() => handleReject(selectedRequest.id)}
                  >
                    Rejeter
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => handleApprove(selectedRequest.id, selectedRequest.email)}
                  >
                    Approuver et déverrouiller
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
