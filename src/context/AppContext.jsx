import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const STORAGE_KEY = 'petbeacon_data';

const defaultData = {
  registeredPets: [],
  registrationInProgress: null,
};

export function AppProvider({ children }) {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultData;
  });

  // Persist to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Registration flow state
  const [registrationStep, setRegistrationStep] = useState(1);
  const [registrationData, setRegistrationData] = useState({
    petName: '',
    petType: '',
    breed: '',
    photoBase64: null,
    microchipNumber: '',
    rescueCentre: null,
  });

  const updateRegistrationData = (updates) => {
    setRegistrationData(prev => ({ ...prev, ...updates }));
  };

  const completeRegistration = () => {
    const newPet = {
      ...registrationData,
      id: Date.now(),
      registeredAt: new Date().toISOString(),
    };

    setData(prev => ({
      ...prev,
      registeredPets: [...prev.registeredPets, newPet],
    }));

    // Reset registration state
    setRegistrationStep(1);
    setRegistrationData({
      petName: '',
      petType: '',
      breed: '',
      photoBase64: null,
      microchipNumber: '',
      rescueCentre: null,
    });

    return newPet;
  };

  const resetRegistration = () => {
    setRegistrationStep(1);
    setRegistrationData({
      petName: '',
      petType: '',
      breed: '',
      photoBase64: null,
      microchipNumber: '',
      rescueCentre: null,
    });
  };

  const value = {
    data,
    setData,
    registrationStep,
    setRegistrationStep,
    registrationData,
    updateRegistrationData,
    completeRegistration,
    resetRegistration,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
