
// Types for message data
export type Message = {
  id: string;
  content: string;
  timestamp: Date;
  read: boolean;
  sender: "user" | "admin" | "system" | "other";
};

export type Conversation = {
  id: string;
  with: {
    id: string;
    name: string;
    email?: string; // Make email optional
    avatar?: string;
    role?: "user" | "host" | "admin";
  };
  messages: Message[];
  lastMessage: {
    content: string;
    timestamp: Date;
    read: boolean;
    sender: "user" | "admin" | "system" | "other";
  };
};

// Predefined users
export const ADMIN_USER = {
  id: 'admin',
  name: 'Administrateur',
  avatar: '/placeholder.svg',
  role: 'admin' as const,
};

export const WELCOME_BOT = {
  id: 'welcome-bot',
  name: 'SHALOM JOB CENTER',
  avatar: '/placeholder.svg',
  role: 'admin' as const,
};
