
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './providers/LanguageProvider';

// Custom CSS variables for the SHALOM theme updated to Airbnb colors
document.documentElement.style.setProperty('--sholom-primary', '#FF385C');
document.documentElement.style.setProperty('--sholom-primary-dark', '#D90B63');
document.documentElement.style.setProperty('--sholom-secondary', '#F7F7F7');
document.documentElement.style.setProperty('--sholom-accent', '#FF385C');
document.documentElement.style.setProperty('--sholom-dark', '#222222');
document.documentElement.style.setProperty('--sholom-light', '#FFFFFF');
document.documentElement.style.setProperty('--sholom-muted', '#717171');

// Créer un client pour React Query
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </QueryClientProvider>
);
