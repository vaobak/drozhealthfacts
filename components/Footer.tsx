import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Instagram, Copyright } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Medical Disclaimer */}
        <div className="text-center mb-8">
             <p className="text-xs text-gray-400 dark:text-gray-500 max-w-4xl mx-auto leading-relaxed mb-4">
                Medical Disclaimer: The information on this site is not intended or implied to be a substitute for professional medical advice, diagnosis or treatment. All content, including text, graphics, images and information, contained on or available through this web site is for general information purposes only.
             </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-300 dark:border-gray-600 pt-8">
            <div className="flex items-center space-x-2 text-sm text-brand-blue dark:text-blue-400 mb-4 md:mb-0 font-semibold">
                <Copyright size={16} />
                <span>Dr. Oz Health Facts - 
                  <Link to="/about" className="hover:text-brand-green mx-1">Privacy Policy</Link> - 
                  <Link to="/about" className="hover:text-brand-green mx-1">Terms of Service</Link> - 2025
                </span>
            </div>

            <div className="flex space-x-6">
                <a href="#" className="text-brand-blue dark:text-blue-400 hover:text-brand-green dark:hover:text-brand-green transition-colors" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-brand-blue dark:text-blue-400 hover:text-brand-green dark:hover:text-brand-green transition-colors" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-brand-blue dark:text-blue-400 hover:text-brand-green dark:hover:text-brand-green transition-colors" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
                <a href="#" className="text-brand-blue dark:text-blue-400 hover:text-brand-green dark:hover:text-brand-green transition-colors" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
};
