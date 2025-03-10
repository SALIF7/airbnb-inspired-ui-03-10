
const useLocalStorage = () => {
  const loadData = <T>(key: string, defaultData: T[]): T[] => {
    try {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        return JSON.parse(savedData);
      }
      // Save default data immediately to ensure it's available on refresh
      localStorage.setItem(key, JSON.stringify(defaultData));
      console.log(`Données par défaut enregistrées pour ${key}:`, defaultData);
      return defaultData;
    } catch (error) {
      console.error(`Erreur lors du chargement des données pour ${key}:`, error);
      return defaultData;
    }
  };

  const saveData = <T>(key: string, data: T[]): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      console.log(`Données sauvegardées pour ${key}:`, data);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la sauvegarde des données pour ${key}:`, error);
      return false;
    }
  };

  // New method to get a single item
  const getItem = <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Erreur lors de la récupération de ${key}:`, error);
      return defaultValue;
    }
  };

  // New method to set a single item
  const setItem = <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      console.log(`Item sauvegardé pour ${key}:`, value);
      return true;
    } catch (error) {
      console.error(`Erreur lors de l'enregistrement de ${key}:`, error);
      return false;
    }
  };

  // New method to remove an item
  const removeItem = (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      console.log(`Item supprimé: ${key}`);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de ${key}:`, error);
      return false;
    }
  };

  // New method to check if an item exists
  const hasItem = (key: string): boolean => {
    return localStorage.getItem(key) !== null;
  };

  // New method to get session storage
  const getSessionItem = <T>(key: string, defaultValue: T): T => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la session ${key}:`, error);
      return defaultValue;
    }
  };

  // New method to set session storage
  const setSessionItem = <T>(key: string, value: T): boolean => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      console.log(`Session item sauvegardé pour ${key}:`, value);
      return true;
    } catch (error) {
      console.error(`Erreur lors de l'enregistrement de la session ${key}:`, error);
      return false;
    }
  };

  return {
    loadData,
    saveData,
    getItem,
    setItem,
    removeItem,
    hasItem,
    getSessionItem,
    setSessionItem
  };
};

export default useLocalStorage;
