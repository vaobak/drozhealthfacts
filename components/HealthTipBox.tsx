import React from 'react';
import { Lightbulb, AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface HealthTipBoxProps {
  type?: 'tip' | 'warning' | 'success' | 'info';
  title?: string;
  content: string;
  icon?: boolean;
}

export const HealthTipBox: React.FC<HealthTipBoxProps> = ({
  type = 'tip',
  title,
  content,
  icon = true
}) => {
  const styles = {
    tip: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: <Lightbulb className="text-blue-600 dark:text-blue-400" size={24} />,
      titleColor: 'text-blue-900 dark:text-blue-100',
      textColor: 'text-blue-800 dark:text-blue-200'
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: <AlertCircle className="text-yellow-600 dark:text-yellow-400" size={24} />,
      titleColor: 'text-yellow-900 dark:text-yellow-100',
      textColor: 'text-yellow-800 dark:text-yellow-200'
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      icon: <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />,
      titleColor: 'text-green-900 dark:text-green-100',
      textColor: 'text-green-800 dark:text-green-200'
    },
    info: {
      bg: 'bg-teal-50 dark:bg-teal-900/20',
      border: 'border-teal-200 dark:border-teal-800',
      icon: <Info className="text-teal-600 dark:text-teal-400" size={24} />,
      titleColor: 'text-teal-900 dark:text-teal-100',
      textColor: 'text-teal-800 dark:text-teal-200'
    }
  };

  const currentStyle = styles[type];

  return (
    <div className={`${currentStyle.bg} ${currentStyle.border} border-l-4 rounded-lg p-6 my-6`}>
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 mt-1">
            {currentStyle.icon}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold text-lg mb-2 ${currentStyle.titleColor}`}>
              {title}
            </h4>
          )}
          <p className={`leading-relaxed ${currentStyle.textColor}`}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};
