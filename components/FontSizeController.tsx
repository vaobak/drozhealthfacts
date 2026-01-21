import React, { useState, useEffect } from 'react';
import { Type } from 'lucide-react';

type FontSize = 'small' | 'medium' | 'large';

export const FontSizeController: React.FC = () => {
  const [fontSize, setFontSize] = useState<FontSize>('medium');

  useEffect(() => {
    // Load saved preference
    const savedSize = localStorage.getItem('fontSize') as FontSize;
    if (savedSize) {
      setFontSize(savedSize);
      applyFontSize(savedSize);
    }
  }, []);

  const applyFontSize = (size: FontSize) => {
    const root = document.documentElement;
    
    // Remove all font size classes
    root.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    
    // Add selected font size class
    root.classList.add(`font-size-${size}`);
  };

  const handleFontSizeChange = (size: FontSize) => {
    setFontSize(size);
    applyFontSize(size);
    localStorage.setItem('fontSize', size);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
      <button
        onClick={() => handleFontSizeChange('small')}
        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
          fontSize === 'small'
            ? 'bg-white dark:bg-gray-600 text-brand-blue dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
        aria-label="Small font size"
        title="Small"
      >
        A-
      </button>
      <button
        onClick={() => handleFontSizeChange('medium')}
        className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
          fontSize === 'medium'
            ? 'bg-white dark:bg-gray-600 text-brand-blue dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
        aria-label="Medium font size"
        title="Medium"
      >
        A
      </button>
      <button
        onClick={() => handleFontSizeChange('large')}
        className={`px-2 py-1 rounded text-base font-medium transition-colors ${
          fontSize === 'large'
            ? 'bg-white dark:bg-gray-600 text-brand-blue dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
        aria-label="Large font size"
        title="Large"
      >
        A+
      </button>
    </div>
  );
};
