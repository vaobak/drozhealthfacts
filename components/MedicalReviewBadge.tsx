import React from 'react';
import { ShieldCheck, Calendar } from 'lucide-react';

interface MedicalReviewBadgeProps {
  reviewedBy?: string;
  reviewDate?: string;
  lastUpdated?: string;
  variant?: 'full' | 'compact';
}

export const MedicalReviewBadge: React.FC<MedicalReviewBadgeProps> = ({
  reviewedBy = 'Dr. Oz Medical Team',
  reviewDate,
  lastUpdated,
  variant = 'full'
}) => {
  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full">
        <ShieldCheck size={16} className="text-green-600 dark:text-green-400" />
        <span className="text-xs font-medium text-green-700 dark:text-green-300">
          Medically Reviewed
        </span>
      </div>
    );
  }

  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
            <ShieldCheck size={20} className="text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-1">
            Medically Reviewed
          </h4>
          <p className="text-xs text-green-700 dark:text-green-300 mb-2">
            This article has been reviewed by {reviewedBy} to ensure accuracy and reliability.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-green-600 dark:text-green-400">
            {reviewDate && (
              <div className="flex items-center gap-1">
                <ShieldCheck size={12} />
                <span>Reviewed: {reviewDate}</span>
              </div>
            )}
            {lastUpdated && (
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>Updated: {lastUpdated}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
