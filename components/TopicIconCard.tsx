import React from 'react';
import { Topic } from '../types';
import * as Icons from 'lucide-react';

interface TopicIconCardProps {
  topic: Topic;
  onClick?: (slug: string) => void;
}

export const TopicIconCard: React.FC<TopicIconCardProps> = ({ topic, onClick }) => {
  const IconComponent = (Icons as any)[topic.iconName] || Icons.Activity;

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center justify-center hover:shadow-md transition-all duration-300 cursor-pointer group min-h-[180px]"
      onClick={() => onClick && onClick(topic.slug)}
    >
      {/* Icon with background */}
      <div className="w-20 h-20 mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
        <IconComponent size={40} className="text-brand-blue dark:text-blue-400" strokeWidth={1.5} />
      </div>
      
      {/* Title */}
      <h3 className="text-center font-bold text-gray-900 dark:text-white text-base group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors">
        {topic.title}
      </h3>
    </div>
  );
};
