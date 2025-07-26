import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '@/store/languageSlice';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' }
];

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.currentLanguage);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (languageCode) => {
    dispatch(setLanguage(languageCode));
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg",
          "bg-white dark:bg-discord-surface",
          "border border-gray-200 dark:border-discord-tertiary",
          "hover:bg-gray-50 dark:hover:bg-discord-secondary",
          "transition-all duration-200",
          "text-gray-700 dark:text-gray-300",
          "hover:scale-105"
        )}
        aria-label="Select language"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">
          {currentLang.code.toUpperCase()}
        </span>
        <ApperIcon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="transition-transform duration-200"
        />
      </button>

      {isOpen && (
        <div className={cn(
          "absolute right-0 top-full mt-2 w-48",
          "bg-white dark:bg-discord-surface",
          "border border-gray-200 dark:border-discord-tertiary",
          "rounded-lg shadow-discord dark:shadow-discord-lg",
          "z-50 animate-fade-in"
        )}>
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3",
                  "hover:bg-gray-50 dark:hover:bg-discord-tertiary",
                  "transition-all duration-200",
                  "text-left text-sm",
                  currentLanguage === language.code
                    ? "bg-discord-blurple/10 text-discord-blurple dark:text-discord-blurple"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
                {currentLanguage === language.code && (
                  <ApperIcon 
                    name="Check" 
                    size={16} 
                    className="ml-auto text-discord-blurple"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;