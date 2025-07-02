import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  availableLanguages: { code: Language; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get saved language from localStorage
    const savedLanguage = localStorage.getItem('projectflow-language');
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      return savedLanguage as Language;
    }
    
    // Try to detect browser language
    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith('fr')) {
      return 'fr';
    }
    
    // Default to English
    return 'en';
  });

  const availableLanguages = [
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  ];

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('projectflow-language', lang);
    
    // Update document language attribute
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    // Set initial document language
    document.documentElement.lang = language;
  }, [language]);

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;