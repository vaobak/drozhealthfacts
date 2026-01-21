import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TOPICS_DATA, ARTICLES_DATA } from '../constants';
import { TopicCard } from '../components/TopicCard';
import { ArticleCard } from '../components/ArticleCard';
import { Button } from '../components/Button';

export const Topics: React.FC = () => {
  const navigate = useNavigate();
  const latestArticles = ARTICLES_DATA.slice(2, 5);

  return (
    <div className="animate-fade-in pb-16 bg-white dark:bg-gray-900">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Explore Health Topics</h1>
          <p className="text-xl text-gray-100">
            Discover expert health tips and advice across various wellness categories.
          </p>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOPICS_DATA.map(topic => (
            <TopicCard 
              key={topic.id} 
              topic={topic}
              onClick={(slug) => navigate(`/category/${slug}`)}
            />
          ))}
        </div>
      </div>

      {/* Latest Articles Section in Topics View */}
      <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 dark:border-gray-700 pt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {latestArticles.map(article => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                onClick={(slug) => navigate(`/${slug}`)} 
              />
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" onClick={() => navigate('/articles')}>
              View All Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
