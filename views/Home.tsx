import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ARTICLES_DATA, TOPICS_DATA } from '../constants';
import { ArticleCard } from '../components/ArticleCard';
import { TopicIconCard } from '../components/TopicIconCard';
import { Button } from '../components/Button';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const featuredArticles = ARTICLES_DATA.slice(0, 3);
  const homeTopics = TOPICS_DATA;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center py-12 md:py-20">
            {/* Left Content */}
            <div className="md:w-1/2 z-10 md:pr-12 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Trusted Modern Health Facts <br />
                <span className="text-green-600 dark:text-green-400">For a Better Life</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
                Evidence based health information from Dr. Oz. Learn about nutrition, wellness, mental health, fitness and more to live a healthier life.
              </p>
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => navigate('/health-topics')}
              >
                Explore Health Topics
              </Button>
            </div>
            
            {/* Right Image */}
            <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
              {/* Decorative circle background */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
              
              {/* Doctor Image Placeholder */}
              <img 
                src="/droz.png" 
                alt="Doctor" 
                className="relative z-10 w-full max-w-sm rounded-xl shadow-2xl object-cover h-[500px]"
                style={{objectPosition: "top"}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Health Articles</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Explore information health & learn tips. Reliable, curated health introductions, wellness, mental health, fitness, bite menus for featuring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {featuredArticles.map(article => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                onClick={(slug) => navigate(`/${slug}`)} 
              />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" onClick={() => navigate('/health-topics')}>
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Health Topics Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">Health Topics Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {homeTopics.map(topic => (
              <TopicIconCard 
                key={topic.id} 
                topic={topic}
                onClick={(slug) => navigate(`/category/${slug}`)}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" onClick={() => navigate('/health-topics')}>
              View All Topics
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
