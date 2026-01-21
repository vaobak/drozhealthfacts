import React, { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false); // Changed to false (collapsed by default)

  useEffect(() => {
    if (!content) {
      return;
    }

    // Normalize line breaks (handle both \r\n and \n)
    const normalizedContent = content.replace(/\r\n/g, '\n');
    const lines = normalizedContent.split('\n');
    const tocItems: TOCItem[] = [];
    
    lines.forEach((line) => {
      // Only match H2 headings (## Heading) - skip H3 for cleaner TOC
      const h2Match = line.match(/^##\s+(.+)$/);
      
      if (h2Match) {
        const text = h2Match[1].trim();
        // Create ID from text (same as ArticleDetail does)
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        tocItems.push({ id, text, level: 2 });
      }
    });

    setHeadings(tocItems);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      // Observe headings for active state
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-100px 0px -80% 0px',
        }
      );

      // Observe all heading elements
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });

      return () => {
        observer.disconnect();
      };
    }, 1000);

    return () => clearTimeout(timer);
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Add highlight effect
      element.classList.add('toc-highlight');
      
      // Remove highlight after 2 seconds
      setTimeout(() => {
        element.classList.remove('toc-highlight');
      }, 2000);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="print-hide">
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-sm border border-teal-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-5 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 dark:bg-teal-500 rounded-lg flex items-center justify-center">
              <List size={20} className="text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">Table of Contents</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Jump to any section ({headings.length} sections)</p>
            </div>
          </div>
          <ChevronRight
            size={24}
            className={`text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          />
        </button>

        {/* TOC Items */}
        {isOpen && (
          <div className="px-5 pb-5">
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {headings.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => scrollToHeading(heading.id)}
                  className={`text-left px-4 py-3 rounded-lg text-sm transition-all ${
                    activeId === heading.id
                      ? 'bg-teal-600 text-white font-semibold shadow-md transform scale-105'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-600 hover:text-teal-700 dark:hover:text-teal-400 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className={`text-xs mt-1 ${activeId === heading.id ? 'text-white' : 'text-teal-600 dark:text-teal-400'}`}>
                      •
                    </span>
                    <span className="flex-1 line-clamp-2">{heading.text}</span>
                  </div>
                </button>
              ))}
            </nav>

            {/* Progress Indicator */}
            <div className="mt-4 bg-white dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Reading Progress</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">
                  {Math.max(1, headings.findIndex((h) => h.id === activeId) + 1)} / {headings.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-teal-600 to-teal-500 h-3 rounded-full transition-all duration-300 shadow-sm"
                  style={{
                    width: `${Math.max(5, ((headings.findIndex((h) => h.id === activeId) + 1) / headings.length) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
