
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/shared/BackButton";

const ListingNotFound = () => (
  <div className="text-center py-16">
    <BackButton />
    <h2 className="text-2xl font-bold text-gray-900">
      Logement non trouvé
    </h2>
    <p className="mt-2 text-gray-600">
      Le logement que vous recherchez n'existe pas ou a été supprimé.
    </p>
    <Link to="/">
      <Button className="mt-6">Retour à l'accueil</Button>
    </Link>
  </div>
);

export default ListingNotFound;
