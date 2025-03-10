import { User } from './types';
import CryptoJS from 'crypto-js';

// Simulation de stockage local des utilisateurs avec mot de passe plus sécurisé
export const MOCK_USERS = [
  {
    id: "1",
    email: "user@example.com",
    name: "Utilisateur Standard",
    password: "User@2025!",
    role: "user" as const,
  },
  {
    id: "admin",
    email: "admin@admin.com",
    name: "Administrateur",
    password: "Admin@2025!",
    role: "admin" as const,
  },
];

export const WELCOME_BOT = {
  id: 'welcome-bot',
  name: 'SHALOM JOB CENTER',
  avatar: '/placeholder.svg',
  role: 'admin' as const,
};

export const ADMIN_USER = {
  id: 'admin',
  name: 'Administrateur',
  avatar: '/placeholder.svg',
  role: 'admin' as const,
};

export const createWelcomeMessages = (user: User) => {
  // Message de bienvenue du bot
  const welcomeMessage = {
    id: `welcome-${Date.now()}`,
    content: `Bienvenue ${user.name} sur SHALOM JOB CENTER ! Nous sommes ravis de vous accueillir. N'hésitez pas à parcourir les offres d'emploi et les logements disponibles. Si vous avez des questions, contactez notre équipe d'assistance.`,
    sender: 'system',
    timestamp: new Date(),
    read: false,
  };

  // Message de bienvenue de l'administrateur
  const adminWelcomeMessage = {
    id: `admin-welcome-${Date.now()}`,
    content: `Bonjour ${user.name}, je suis l'administrateur de la plateforme. N'hésitez pas à me contacter si vous avez des questions.`,
    sender: 'admin',
    timestamp: new Date(),
    read: false,
  };

  const initialConversations = [
    {
      id: `welcome-${Date.now()}`,
      with: WELCOME_BOT,
      lastMessage: {
        content: welcomeMessage.content,
        timestamp: welcomeMessage.timestamp,
        read: welcomeMessage.read,
        sender: 'system',
      },
      messages: [welcomeMessage],
    },
    {
      id: `admin-${Date.now()}`,
      with: ADMIN_USER,
      lastMessage: {
        content: adminWelcomeMessage.content,
        timestamp: adminWelcomeMessage.timestamp,
        read: adminWelcomeMessage.read,
        sender: 'admin',
      },
      messages: [adminWelcomeMessage],
    }
  ];

  localStorage.setItem(`conversations_${user.id}`, JSON.stringify(initialConversations));
};

// Fonction pour vérifier si un compte admin existe déjà avec sécurité renforcée
export const ensureAdminAccount = () => {
  const storedUsers = localStorage.getItem("users");
  let users = [];
  
  // Vérifier l'intégrité des données stockées
  try {
    users = storedUsers ? JSON.parse(storedUsers) : [];
    if (!Array.isArray(users)) {
      console.error("Format de données utilisateurs invalide, réinitialisation");
      users = [];
    }
  } catch (error) {
    console.error("Erreur lors de la lecture des données utilisateurs:", error);
    users = [];
  }
  
  // Si aucun utilisateur ou données corrompues, initialiser avec les utilisateurs par défaut
  if (users.length === 0) {
    localStorage.setItem("users", JSON.stringify(MOCK_USERS));
    console.log("Base d'utilisateurs réinitialisée avec les valeurs par défaut");
    
    // Initialiser le journal d'accès administrateur
    localStorage.setItem("admin_access_logs", JSON.stringify([]));
    return;
  }
  
  // Vérifier si un admin valide existe
  const adminExists = users.some((user: any) => 
    user.role === "admin" && 
    user.email && 
    user.password && 
    user.id
  );
  
  if (!adminExists) {
    // Si aucun administrateur valide n'existe, ajouter l'administrateur par défaut
    const defaultAdmin = MOCK_USERS.find(user => user.role === "admin");
    
    if (defaultAdmin) {
      users.push(defaultAdmin);
      localStorage.setItem("users", JSON.stringify(users));
      console.log("Compte administrateur par défaut ajouté");
    }
  }
  
  // Mise en place du journal des accès administrateur s'il n'existe pas
  if (!localStorage.getItem("admin_access_logs")) {
    localStorage.setItem("admin_access_logs", JSON.stringify([]));
  }
  
  // Mise en place du journal des activités suspectes s'il n'existe pas
  if (!localStorage.getItem("suspicious_activities")) {
    localStorage.setItem("suspicious_activities", JSON.stringify([]));
  }
};

// Nouvelle fonction pour hacher les mots de passe - pour la future mise à niveau
export const hashPassword = (password: string): string => {
  const salt = CryptoJS.lib.WordArray.random(16).toString();
  const hash = CryptoJS.PBKDF2(password, salt, { 
    keySize: 512/32, 
    iterations: 1000 
  }).toString();
  
  return `${salt}:${hash}`;
};

// Fonction pour vérifier un mot de passe haché - pour la future mise à niveau
export const verifyPassword = (password: string, hashedPassword: string): boolean => {
  const [salt, storedHash] = hashedPassword.split(':');
  const hash = CryptoJS.PBKDF2(password, salt, { 
    keySize: 512/32, 
    iterations: 1000 
  }).toString();
  
  return storedHash === hash;
};

// Fonction pour détecter les activités suspectes
export const detectSuspiciousActivity = (userId: string, activity: string, details: any = {}) => {
  const suspiciousActivities = JSON.parse(localStorage.getItem('suspicious_activities') || '[]');
  
  suspiciousActivities.push({
    userId,
    activity,
    details,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  });
  
  localStorage.setItem('suspicious_activities', JSON.stringify(suspiciousActivities));
};
