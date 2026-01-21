import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

interface ReviewSectionProps {
  articleTitle: string;
  articleUrl: string;
  reviews?: Review[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  enableFeedback?: boolean;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  articleTitle,
  articleUrl,
  reviews = [],
  aggregateRating,
  enableFeedback = true
}) => {
  const [userFeedback, setUserFeedback] = useState<'helpful' | 'not-helpful' | null>(null);
  const [feedbackCount, setFeedbackCount] = useState({ helpful: 0, notHelpful: 0 });

  // Generate Review Schema for SEO
  const reviewSchema = aggregateRating ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "name": articleTitle,
    "url": articleUrl,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue,
      "reviewCount": aggregateRating.reviewCount,
      "bestRating": aggregateRating.bestRating || 5,
      "worstRating": aggregateRating.worstRating || 1
    },
    ...(reviews.length > 0 && {
      "review": reviews.map(review => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "datePublished": review.datePublished,
        "reviewBody": review.reviewBody,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating,
          "bestRating": 5,
          "worstRating": 1
        }
      }))
    })
  } : null;

  const handleFeedback = (type: 'helpful' | 'not-helpful') => {
    if (userFeedback === type) {
      // Remove feedback
      setUserFeedback(null);
      setFeedbackCount(prev => ({
        ...prev,
        [type === 'helpful' ? 'helpful' : 'notHelpful']: Math.max(0, prev[type === 'helpful' ? 'helpful' : 'notHelpful'] - 1)
      }));
    } else {
      // Add new feedback
      if (userFeedback) {
        // Remove old feedback
        setFeedbackCount(prev => ({
          ...prev,
          [userFeedback === 'helpful' ? 'helpful' : 'notHelpful']: Math.max(0, prev[userFeedback === 'helpful' ? 'helpful' : 'notHelpful'] - 1)
        }));
      }
      setUserFeedback(type);
      setFeedbackCount(prev => ({
        ...prev,
        [type === 'helpful' ? 'helpful' : 'notHelpful']: prev[type === 'helpful' ? 'helpful' : 'notHelpful'] + 1
      }));
    }
  };

  return (
    <div className="my-12">
      {/* Review Schema for SEO */}
      {reviewSchema && (
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
      )}

      {/* Aggregate Rating Display */}
      {aggregateRating && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Reader Ratings
          </h3>
          
          <div className="flex items-center gap-6 flex-wrap">
            {/* Rating Score */}
            <div className="flex items-center gap-3">
              <div className="text-5xl font-bold text-teal-600 dark:text-teal-400">
                {aggregateRating.ratingValue.toFixed(1)}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.round(aggregateRating.ratingValue) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300 dark:text-gray-600'
                      }
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Based on {aggregateRating.reviewCount} review{aggregateRating.reviewCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-1 min-w-[200px]">
              {[5, 4, 3, 2, 1].map(star => {
                const percentage = Math.random() * 100; // In real app, calculate from actual reviews
                return (
                  <div key={star} className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                      {star} ★
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-500 w-12 text-right">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* User Feedback */}
      {enableFeedback && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Was this article helpful?
          </h3>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleFeedback('helpful')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all min-h-[48px] ${
                userFeedback === 'helpful'
                  ? 'bg-green-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 border border-gray-300 dark:border-gray-600'
              }`}
            >
              <ThumbsUp size={20} />
              <span>Yes, helpful</span>
              {feedbackCount.helpful > 0 && (
                <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-sm">
                  {feedbackCount.helpful}
                </span>
              )}
            </button>

            <button
              onClick={() => handleFeedback('not-helpful')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all min-h-[48px] ${
                userFeedback === 'not-helpful'
                  ? 'bg-red-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 border border-gray-300 dark:border-gray-600'
              }`}
            >
              <ThumbsDown size={20} />
              <span>Not helpful</span>
              {feedbackCount.notHelpful > 0 && (
                <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-sm">
                  {feedbackCount.notHelpful}
                </span>
              )}
            </button>
          </div>

          {userFeedback && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg animate-fade-in">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {userFeedback === 'helpful' 
                  ? '✅ Thank you for your feedback! We\'re glad this article was helpful.'
                  : '📝 Thank you for your feedback. We\'ll work on improving this content.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Individual Reviews (if provided) */}
      {reviews.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Reader Reviews
          </h3>
          
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {review.author}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.datePublished).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300 dark:text-gray-600'
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {review.reviewBody}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
