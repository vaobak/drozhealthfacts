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

      {/* Popular Health Tools - Internal Links for SEO */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Popular Health Calculators</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Use our evidence-based health calculators to track your wellness journey and make informed health decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Top Health Tools with Internal Links */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">BMI Calculator</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Calculate your Body Mass Index and understand your weight status for better health.</p>
              <button 
                onClick={() => navigate('/bmi-calculator')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Calculate BMI →
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Ovulation Calculator</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Track your fertile window and ovulation cycle for family planning.</p>
              <button 
                onClick={() => navigate('/ovulation-calculator')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Track Ovulation →
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Calorie Calculator</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Determine your daily caloric needs for weight management and fitness goals.</p>
              <button 
                onClick={() => navigate('/calorie-calculator')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Calculate Calories →
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Body Fat Calculator</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Measure your body fat percentage using proven scientific methods.</p>
              <button 
                onClick={() => navigate('/body-fat-calculator')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Calculate Body Fat →
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Ideal Weight Calculator</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Find your ideal weight range based on height, age, and body frame.</p>
              <button 
                onClick={() => navigate('/ideal-weight-calculator')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Find Ideal Weight →
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Protein Calculator</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Calculate your daily protein requirements for optimal health and fitness.</p>
              <button 
                onClick={() => navigate('/protein-intake-calculator')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Calculate Protein →
              </button>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button variant="primary" onClick={() => navigate('/health-tools')}>
              View All Health Tools
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Links for SEO */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Categories</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/category/nutrition-diet')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Nutrition & Diet</button></li>
                <li><button onClick={() => navigate('/category/fitness')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Fitness & Exercise</button></li>
                <li><button onClick={() => navigate('/category/mental-health')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Mental Health</button></li>
                <li><button onClick={() => navigate('/category/heart-health')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Heart Health</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Articles</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/keto-diet-complete-guide')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Keto Diet Guide</button></li>
                <li><button onClick={() => navigate('/boost-immune-system-naturally')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Boost Immune System</button></li>
                <li><button onClick={() => navigate('/lose-belly-fat-fast')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Lose Belly Fat</button></li>
                <li><button onClick={() => navigate('/best-foods-weight-loss')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Weight Loss Foods</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Tools</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/symptom-checker')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Symptom Checker</button></li>
                <li><button onClick={() => navigate('/drug-interaction-checker')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Drug Interactions</button></li>
                <li><button onClick={() => navigate('/health-risk-assessment')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Health Risk Assessment</button></li>
                <li><button onClick={() => navigate('/lab-results-interpreter')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Lab Results</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/articles')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">All Articles</button></li>
                <li><button onClick={() => navigate('/health-topics')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Health Topics</button></li>
                <li><button onClick={() => navigate('/about')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About Us</button></li>
                <li><button onClick={() => navigate('/contact')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</button></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
