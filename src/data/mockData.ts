
import { Job } from "@/types/job";
import { Listing } from "@/types/listing";

// Données partagées pour les emplois
export const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Agent de sécurité résidentiel",
    domain: "residential_security",
    description: "Surveillance de propriétés privées et contrôle d'accès",
    requirements: "- Carte professionnelle obligatoire\n- Expérience minimum de 2 ans",
    contract: "full_time",
    location: "Paris",
    salary: {
      amount: 2000,
      currency: "EUR"
    },
    positions: 2,
    publishDate: "2024-02-10",
    deadline: "2024-03-10",
    status: "active"
  },
  {
    id: "2",
    title: "Agent de sécurité événementiel",
    domain: "event_security",
    description: "Sécurisation d'événements culturels et sportifs",
    requirements: "- Carte professionnelle obligatoire\n- Expérience en gestion de foule",
    contract: "part_time",
    location: "Lyon",
    salary: {
      amount: 1800,
      currency: "EUR"
    },
    positions: 5,
    publishDate: "2024-02-12",
    deadline: "2024-03-15",
    status: "active"
  }
];

// Données partagées pour les logements
export const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Superbe villa avec vue 90",
    location: "Sant Miquel de Balansat, Espagne",
    price: 67,
    rating: 5.0,
    image: "/lovable-uploads/00196f15-e8ff-48fb-bf68-e133fa5e4064.png",
    dates: "15-20 févr.",
    description: "Une magnifique villa avec vue sur la mer...",
    images: ["/lovable-uploads/00196f15-e8ff-48fb-bf68-e133fa5e4064.png"],
    host: {
      name: "Bas",
      image: "/placeholder.svg",
    },
  }
];
