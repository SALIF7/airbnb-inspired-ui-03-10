
import React from 'react';
import { FileText } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow text-center">
      <div className="mb-4 text-gray-400">
        <FileText className="h-12 w-12 mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune candidature trouvée</h3>
      <p className="text-gray-500">Il n'y a pas de candidatures correspondant à vos critères.</p>
    </div>
  );
};

export default EmptyState;
