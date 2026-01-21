import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToSectionProps {
  title: string;
  description?: string;
  steps: HowToStep[];
  totalTime?: string; // e.g., "PT30M" (30 minutes in ISO 8601 format)
  estimatedCost?: {
    currency: string;
    value: string;
  };
}

export const HowToSection: React.FC<HowToSectionProps> = ({
  title,
  description,
  steps,
  totalTime,
  estimatedCost
}) => {
  // Generate HowTo Schema for SEO
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description || title,
    ...(totalTime && { "totalTime": totalTime }),
    ...(estimatedCost && {
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": estimatedCost.currency,
        "value": estimatedCost.value
      }
    }),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image }),
      ...(step.url && { "url": step.url })
    }))
  };

  return (
    <div className="my-12">
      {/* HowTo Schema for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </script>

      <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-teal-200 dark:border-teal-800">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h2>
        
        {description && (
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {description}
          </p>
        )}

        {/* Time and Cost Info */}
        {(totalTime || estimatedCost) && (
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            {totalTime && (
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">⏱️ Time:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatDuration(totalTime)}
                </span>
              </div>
            )}
            {estimatedCost && (
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">💰 Cost:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {estimatedCost.currency} {estimatedCost.value}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                {/* Step Number */}
                <div className="flex-shrink-0 w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    {step.name}
                    <CheckCircle2 size={20} className="text-teal-600 dark:text-teal-400" />
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {step.text}
                  </p>
                  
                  {/* Step Image (if provided) */}
                  {step.image && (
                    <div className="mt-4 rounded-lg overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.name}
                        loading="lazy"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Completion Message */}
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-green-800 dark:text-green-200 font-medium text-center">
            ✅ Follow these steps for best results!
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Format ISO 8601 duration to human-readable format
 * @param duration - ISO 8601 duration (e.g., "PT30M", "PT1H30M")
 * @returns Human-readable duration
 */
const formatDuration = (duration: string): string => {
  const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!matches) return duration;

  const [, hours, minutes, seconds] = matches;
  const parts = [];

  if (hours) parts.push(`${hours} hour${hours !== '1' ? 's' : ''}`);
  if (minutes) parts.push(`${minutes} min${minutes !== '1' ? 's' : ''}`);
  if (seconds) parts.push(`${seconds} sec${seconds !== '1' ? 's' : ''}`);

  return parts.join(' ') || duration;
};
