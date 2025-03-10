
import React from 'react';

const EmptyConversation: React.FC = () => {
  return (
    <div className="col-span-2 flex items-center justify-center h-full">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Aucune conversation sélectionnée</h3>
        <p className="text-gray-500">
          Sélectionnez une conversation pour afficher les messages.
        </p>
      </div>
    </div>
  );
};

export default EmptyConversation;
