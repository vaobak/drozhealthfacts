export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  categorySlug: string;
  author?: string;
  date?: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  schemaType?: 'general' | 'listicle' | 'howto' | 'medical-condition' | 'recipe' | 'itemlist' | 'faqpage' | 'article';
  reviewRating?: number;
  reviewCount?: number;
  contentPath?: string; // Path to markdown file for dynamic loading
  jsonPath?: string; // Path to JSON file for dynamic loading
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  iconName: string; // Mapping to Lucide icon name
  imageUrl: string;
  slug: string;
}

export type ViewState = 'HOME' | 'TOPICS' | 'ARTICLES' | 'ARTICLE_DETAIL' | 'CATEGORY' | 'ABOUT' | 'CONTACT' | 'HEALTH_TOOLS';
