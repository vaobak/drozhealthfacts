import React from 'react';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  variant?: 'icon' | 'button';
  size?: 'sm' | 'md' | 'lg';
}

export const PrintButton: React.FC<PrintButtonProps> = ({ 
  variant = 'button',
  size = 'md' 
}) => {
  const handlePrint = () => {
    window.print();
  };

  if (variant === 'icon') {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12'
    };

    const iconSizes = {
      sm: 16,
      md: 20,
      lg: 24
    };

    return (
      <button
        onClick={handlePrint}
        className={`${sizeClasses[size]} flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors`}
        aria-label="Print article"
        title="Print this article"
      >
        <Printer size={iconSizes[size]} />
      </button>
    );
  }

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
    >
      <Printer size={18} />
      <span>Print Article</span>
    </button>
  );
};
