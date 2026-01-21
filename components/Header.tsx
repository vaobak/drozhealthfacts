import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Button } from './Button';
import { DarkModeToggle } from './DarkModeToggle';
import { SearchModal } from './SearchModal';
import { Menu, X, Search } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <header className="bg-brand-blue text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center cursor-pointer gap-3">
            <img 
              src="/favicon.svg" 
              alt="Dr. Oz Health Facts Logo" 
              className="w-10 h-10 md:w-12 md:h-12"
              style={{
                filter: 'drop-shadow(0 0 1px white) drop-shadow(0 0 1px white)'
              }}
            />
            {/* Text for SEO & Accessibility - DR Oz hidden visually but kept for screen readers */}
            <div className="font-bold text-2xl tracking-tight flex items-baseline gap-1">
              <span className="sr-only">DR Oz</span>
              <span className="text-white font-bold text-base md:text-2xl uppercase tracking-widest">Health Facts</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm font-medium hover:text-brand-green transition-colors ${
                  isActive(link.path) ? 'text-brand-green' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-1 ml-2">
              <DarkModeToggle />
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-lg hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link to="/contact" className="ml-2">
                <Button variant="primary" size="sm">
                  Contact
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button, Search & Dark Mode Toggle */}
          <div className="md:hidden flex items-center gap-1">
            <DarkModeToggle />
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-md text-gray-200 hover:text-white focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-md text-gray-200 hover:text-white focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        </div>

        {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-darkBlue pb-4 px-4">
          <nav className="flex flex-col space-y-2 pt-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-left font-medium py-3 px-4 rounded-lg hover:bg-brand-blue/20 transition-colors min-h-[48px] ${
                  isActive(link.path) ? 'text-brand-green' : 'text-white hover:text-brand-green'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full mt-2">
                Contact
              </Button>
            </Link>
          </nav>
        </div>
      )}
      </header>
    </>
  );
};
