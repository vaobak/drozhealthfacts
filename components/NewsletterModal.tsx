import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ 
  isOpen, 
  onClose, 
  email 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Successfully Subscribed!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Thank you for subscribing to our newsletter.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            We've sent a confirmation email to:
          </p>
          <p className="text-brand-blue dark:text-brand-green font-semibold mb-6 break-all">
            {email}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
            You'll receive our latest health tips and articles directly to your inbox.
          </p>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-brand-green text-white rounded-lg font-medium hover:bg-brand-greenHover transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};
