import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { ARTICLES_DATA, CATEGORIES } from '../constants';
import { Article } from '../types';
import { ArticleCard } from '../components/ArticleCard';

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || 'all';
  
  const [results, setResults] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (query) {
      const filtered = ARTICLES_DATA.filter(article => {
        const matchesQuery = 
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          article.content?.toLowerCase().includes(query.toLowerCase()) ||
          article.category.toLowerCase().includes(query.toLowerCase()) ||
          article.metaKeywords?.toLowerCase().includes(query.toLowerCase());
        
        const matchesCategory = selectedCategory === 'all' || article.categorySlug === selectedCategory;
        
        return matchesQuery && matchesCategory;
      });
      
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, selectedCategory]);

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setSearchParams({ q: query, category: categorySlug });
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchParams({ q: query, category: 'all' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Search className="text-teal-600 dark:text-teal-400" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Search Results
            </h1>
          </div>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                Found <span className="font-bold text-teal-600 dark:text-teal-400">{results.length}</span> results for 
                <span className="font-semibold text-gray-900 dark:text-white"> "{query}"</span>
              </p>
              {selectedCategory !== 'all' && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Filtered by: <span className="font-medium">{CATEGORIES.find(c => c.slug === selectedCategory)?.name}</span>
                </p>
              )}
            </div>
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Filter size={20} />
                  Filter by Category
                </h2>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-teal-600 text-white font-medium'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>All Categories</span>
                    <span className="text-sm">
                      {ARTICLES_DATA.filter(a => 
                        a.title.toLowerCase().includes(query.toLowerCase()) ||
                        a.excerpt.toLowerCase().includes(query.toLowerCase())
                      ).length}
                    </span>
                  </div>
                </button>
                
                {CATEGORIES.map((category) => {
                  const count = ARTICLES_DATA.filter(a => 
                    a.categorySlug === category.slug &&
                    (a.title.toLowerCase().includes(query.toLowerCase()) ||
                     a.excerpt.toLowerCase().includes(query.toLowerCase()))
                  ).length;
                  
                  return (
                    <button
                      key={category.slug}
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-teal-600 text-white font-medium'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-sm">{count}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Close button for mobile */}
              <button
                onClick={() => setShowFilters(false)}
                className="md:hidden w-full mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <X size={16} />
                Close Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            {results.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {results.map((article) => (
                  <ArticleCard 
                    key={article.slug} 
                    article={article}
                    onClick={(slug) => window.location.href = `/${slug}`}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We couldn't find any articles matching "{query}"
                  {selectedCategory !== 'all' && ` in ${CATEGORIES.find(c => c.slug === selectedCategory)?.name}`}
                </p>
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Try:</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• Using different keywords</li>
                    <li>• Checking your spelling</li>
                    <li>• Using more general terms</li>
                    {selectedCategory !== 'all' && (
                      <li>
                        • <button onClick={clearFilters} className="text-teal-600 dark:text-teal-400 hover:underline">
                          Removing category filter
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
                <Link
                  to="/articles"
                  className="inline-block mt-6 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Browse All Articles
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
