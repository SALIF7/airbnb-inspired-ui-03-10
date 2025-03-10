
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Job } from '@/types/job';
import { 
  MoreHorizontal, Check, X, FileEdit, Trash, Eye, 
  CalendarCheck, MapPin, CheckCircle, BriefcaseBusiness
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface JobsTableProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (jobId: string) => void;
}

export const JobsTable: React.FC<JobsTableProps> = ({ jobs, onEdit, onDelete }) => {
  const [sortBy, setSortBy] = useState<keyof Job>('publishDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Fonction pour déterminer si une offre est expirée
  const isExpired = (job: Job) => {
    if (job.status === 'closed') return true;
    const deadlineDate = new Date(job.deadline);
    const today = new Date();
    return today > deadlineDate;
  };

  // Fonction pour obtenir le style du badge de statut
  const getStatusBadgeStyle = (job: Job) => {
    if (job.status === 'closed') {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    
    return isExpired(job)
      ? 'bg-amber-100 text-amber-800 border-amber-200'
      : 'bg-green-100 text-green-800 border-green-200';
  };

  // Fonction pour obtenir le texte du statut
  const getStatusText = (job: Job) => {
    if (job.status === 'closed') return 'Clôturée';
    return isExpired(job) ? 'Expirée' : 'Active';
  };

  // Tri des offres
  const sortedJobs = [...jobs].sort((a, b) => {
    // Gestion du tri selon différents types de champs
    if (sortBy === 'salary') {
      return sortDirection === 'asc'
        ? a.salary.amount - b.salary.amount
        : b.salary.amount - a.salary.amount;
    } else if (sortBy === 'publishDate' || sortBy === 'deadline') {
      const dateA = new Date(a[sortBy]).getTime();
      const dateB = new Date(b[sortBy]).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      // Pour les champs de type string
      const valA = String(a[sortBy] || '').toLowerCase();
      const valB = String(b[sortBy] || '').toLowerCase();
      return sortDirection === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
  });

  // Fonction pour changer le tri
  const handleSort = (column: keyof Job) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  // Fonction pour obtenir le nom du domaine d'emploi
  const getDomainName = (domain: string) => {
    const domains: Record<string, string> = {
      'residential_security': 'Sécurité résidentielle',
      'bodyguard': 'Garde du corps',
      'private_property': 'Propriétés privées',
      'industrial_security': 'Sécurité industrielle',
      'event_security': 'Sécurité événementielle',
      'k9_security': 'Maître-chien',
      'security_trainer': 'Formateur sécurité',
      'housing_offer': 'Offre de logement'
    };
    
    return domains[domain] || domain;
  };

  // Fonction pour obtenir le nom du type de contrat
  const getContractName = (contract: string) => {
    const contracts: Record<string, string> = {
      'full_time': 'CDI',
      'part_time': 'Temps partiel',
      'contract': 'CDD'
    };
    
    return contracts[contract] || contract;
  };

  // Ajouter les comptes de candidatures
  const getApplicationsCount = (job: Job) => {
    return job.applications?.length || 0;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3" style={{ width: '40%' }}>
              <button 
                onClick={() => handleSort('title')} 
                className="flex items-center font-medium"
              >
                Titre 
                {sortBy === 'title' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            </th>
            <th className="px-6 py-3">
              <button 
                onClick={() => handleSort('location')} 
                className="flex items-center font-medium"
              >
                Localisation
                {sortBy === 'location' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            </th>
            <th className="px-6 py-3 whitespace-nowrap">
              <button 
                onClick={() => handleSort('salary')} 
                className="flex items-center font-medium"
              >
                Salaire (€)
                {sortBy === 'salary' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            </th>
            <th className="px-6 py-3 whitespace-nowrap">
              <button 
                onClick={() => handleSort('deadline')} 
                className="flex items-center font-medium"
              >
                Date limite
                {sortBy === 'deadline' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            </th>
            <th className="px-6 py-3">Statut</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedJobs.map((job) => (
            <tr 
              key={job.id} 
              className={`border-b hover:bg-gray-50 ${
                job.status === 'closed' || isExpired(job) ? 'bg-gray-50' : ''
              }`}
            >
              <td className="px-6 py-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      job.isHousingOffer ? 'bg-purple-100' : 'bg-blue-100'
                    }`}>
                      {job.isHousingOffer ? (
                        <CalendarCheck className={`h-5 w-5 ${job.isHousingOffer ? 'text-purple-700' : 'text-blue-700'}`} />
                      ) : (
                        <BriefcaseBusiness className={`h-5 w-5 ${job.isHousingOffer ? 'text-purple-700' : 'text-blue-700'}`} />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      {job.isHousingOffer ? (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          Logement
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {getDomainName(job.domain)}
                        </Badge>
                      )}
                      <Badge variant="outline" className="ml-2 bg-gray-50 text-gray-700 border-gray-200">
                        {getContractName(job.contract)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                  <span>{job.location}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                {job.isHousingOffer ? (
                  <span>{job.price?.toLocaleString('fr-FR')} €</span>
                ) : (
                  <span>{job.salary.amount.toLocaleString('fr-FR')} €</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={`${isExpired(job) && job.status !== 'closed' ? 'text-amber-700' : ''}`}>
                        {formatDate(job.deadline)}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Publiée le {formatDate(job.publishDate)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-1">
                  <Badge variant="outline" className={getStatusBadgeStyle(job)}>
                    {getStatusText(job)}
                  </Badge>
                  
                  {job.applications && job.applications.length > 0 && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {job.applications.length} candidat{job.applications.length > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link to={`/emploi/${job.id}`} target="_blank">
                          <Button size="icon" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Voir l'offre</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onEdit(job)}>
                        <FileEdit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      {job.status === 'active' ? (
                        <DropdownMenuItem onClick={() => {
                          const updatedJob: Job = { ...job, status: 'closed' };
                          onEdit(updatedJob);
                        }}>
                          <X className="mr-2 h-4 w-4" />
                          Clôturer
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => {
                          const updatedJob: Job = { ...job, status: 'active' };
                          onEdit(updatedJob);
                        }}>
                          <Check className="mr-2 h-4 w-4" />
                          Activer
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onDelete(job.id)}
                        className="text-red-600"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
