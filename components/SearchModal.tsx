import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { ARTICLES_DATA, CATEGORIES } from '../constants';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Article[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = ARTICLES_DATA.filter(article => {
        const matchesQuery = 
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = selectedCategory === 'all' || article.categorySlug === selectedCategory;
        
        return matchesQuery && matchesCategory;
      }).slice(0, 5);
      
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, selectedCategory]);

  const saveRecentSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const updated = [trimmedQuery, ...recentSearches.filter(s => s !== trimmedQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
      onClose();
      setSearchQuery('');
    }
  };

  const handleSuggestionClick = (article: Article) => {
    saveRecentSearch(article.title);
    navigate(`/${article.slug}`);
    onClose();
    setSearchQuery('');
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    saveRecentSearch(query);
    navigate(`/search?q=${encodeURIComponent(query)}&category=${selectedCategory}`);
    onClose();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div className="min-h-screen flex items-start justify-center p-4 pt-20">
        <div 
          className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <form onSubmit={handleSearch} className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Search className="text-gray-400" size={24} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search articles, topics, health tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 text-lg outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.slug
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </form>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto">
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <TrendingUp size={16} />
                  <span className="font-medium">Suggestions</span>
                </div>
                <div className="space-y-2">
                  {suggestions.map((article) => (
                    <button
                      key={article.slug}
                      onClick={() => handleSuggestionClick(article)}
                      className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 line-clamp-1">
                            {article.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                            {article.excerpt}
                          </p>
                          <span className="text-xs text-teal-600 dark:text-teal-400 mt-1 inline-block">
                            {article.category}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {searchQuery.length === 0 && recentSearches.length > 0 && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={16} />
                    <span className="font-medium">Recent Searches</span>
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(query)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300 text-sm"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchQuery.length > 0 && suggestions.length === 0 && (
              <div className="p-8 text-center">
                <Search size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">
                  No results found for "<span className="font-medium">{searchQuery}</span>"
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Try different keywords or browse our categories
                </p>
              </div>
            )}

            {/* Empty State */}
            {searchQuery.length === 0 && recentSearches.length === 0 && (
              <div className="p-8 text-center">
                <Search size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">
                  Start typing to search articles
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Search by title, topic, or health condition
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
