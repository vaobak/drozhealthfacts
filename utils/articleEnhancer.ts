// Article content enhancer for SEO
// Adds internal links and external citations automatically

export interface InternalLink {
  keyword: string;
  url: string;
  title: string;
}

export interface ExternalCitation {
  keyword: string;
  url: string;
  source: string;
}

// Internal links to actual articles on your website - VERIFIED SLUGS ONLY
export const INTERNAL_LINKS: InternalLink[] = [
  // Nutrition & Diet Articles (8 articles)
  { keyword: 'intermittent fasting', url: '/intermittent-fasting-guide', title: 'Intermittent Fasting: Complete Beginner\'s Guide' },
  { keyword: 'keto diet', url: '/keto-diet-complete-guide', title: 'Keto Diet for Beginners: Complete Guide' },
  { keyword: 'Mediterranean diet', url: '/how-to-start-mediterranean-diet-complete-guide', title: 'How to Start a Mediterranean Diet' },
  { keyword: 'weight loss foods', url: '/best-foods-weight-loss', title: '25 Best Foods for Weight Loss' },
  { keyword: 'anti-inflammatory foods', url: '/top-10-anti-inflammatory-foods-diet', title: 'Top 10 Anti-Inflammatory Foods' },
  { keyword: 'superfoods', url: '/12-superfoods-daily-diet', title: '12 Superfoods You Should Eat Every Day' },
  { keyword: 'healthy smoothies', url: '/healthy-smoothie-recipes', title: '15 Healthy Smoothie Recipes' },
  { keyword: 'lose belly fat', url: '/lose-belly-fat-fast', title: 'How to Lose Belly Fat Fast: 15 Science-Backed Methods' },
  
  // Health Conditions & Prevention (10 articles)
  { keyword: 'type 2 diabetes', url: '/type-2-diabetes-prevention-management', title: 'Type 2 Diabetes: Complete Guide to Prevention & Management' },
  { keyword: 'hypertension', url: '/hypertension-high-blood-pressure-guide', title: 'Hypertension: Complete Guide to High Blood Pressure' },
  { keyword: 'lower blood pressure', url: '/lower-blood-pressure-naturally', title: 'How to Lower Blood Pressure Naturally' },
  { keyword: 'cholesterol', url: '/understanding-cholesterol-good-vs-bad', title: 'Understanding Cholesterol: Good vs Bad' },
  { keyword: 'anxiety disorders', url: '/understanding-anxiety-disorders', title: 'Understanding Anxiety Disorders' },
  { keyword: 'arthritis', url: '/understanding-arthritis', title: 'Understanding Arthritis: Types & Treatment' },
  { keyword: 'asthma', url: '/understanding-asthma', title: 'Understanding Asthma: Symptoms & Management' },
  { keyword: 'GERD', url: '/understanding-gerd', title: 'Understanding GERD: Symptoms & Treatment' },
  { keyword: 'insomnia', url: '/understanding-insomnia', title: 'Understanding Insomnia: Causes & Treatment' },
  { keyword: 'migraines', url: '/understanding-migraines', title: 'Understanding Migraines: Symptoms & Relief' },
  
  // Fitness & Exercise (2 articles)
  { keyword: 'heart exercises', url: '/7-best-exercises-heart-health-cardiovascular-fitness', title: '7 Best Exercises for Heart Health' },
  { keyword: 'yoga for beginners', url: '/yoga-for-beginners', title: 'Yoga for Beginners: Complete Guide' },
  
  // Mental Health & Wellness (2 articles)
  { keyword: 'reduce stress', url: '/5-ways-reduce-stress-naturally-without-medication', title: '5 Proven Ways to Reduce Stress Naturally' },
  { keyword: 'mental wellness', url: '/mental-wellness-daily-habits-better-health', title: 'Mental Wellness: Daily Habits for Better Mental Health' },
  
  // Sleep & Energy (2 articles)
  { keyword: 'sleep hygiene', url: '/10-sleep-hygiene-tips-better-rest-recovery', title: '10 Sleep Hygiene Tips for Better Rest' },
  { keyword: 'boost energy', url: '/10-ways-boost-energy-naturally', title: '10 Natural Ways to Boost Energy Without Caffeine' },
  
  // General Health (5 articles)
  { keyword: 'boost immune system', url: '/boost-immune-system-naturally', title: 'How to Boost Your Immune System Naturally' },
  { keyword: 'healthy aging', url: '/healthy-aging-after-40', title: 'Complete Guide to Healthy Aging After 40' },
  { keyword: 'morning routine', url: '/healthy-morning-routine', title: 'The Ultimate Healthy Morning Routine' },
  { keyword: 'dehydration', url: '/8-signs-dehydration', title: '8 Warning Signs of Dehydration' },
  { keyword: 'health questions', url: '/common-health-questions-answered', title: '50 Common Health Questions Answered' },
];

// External authoritative sources for citations - More specific and relevant
export const EXTERNAL_CITATIONS: ExternalCitation[] = [
  { 
    keyword: 'American Heart Association', 
    url: 'https://www.heart.org/en/health-topics', 
    source: 'American Heart Association Guidelines' 
  },
  { 
    keyword: 'Mayo Clinic', 
    url: 'https://www.mayoclinic.org/diseases-conditions', 
    source: 'Mayo Clinic Medical Information' 
  },
  { 
    keyword: 'CDC recommends', 
    url: 'https://www.cdc.gov/healthyliving', 
    source: 'Centers for Disease Control and Prevention' 
  },
  { 
    keyword: 'Harvard Health', 
    url: 'https://www.health.harvard.edu/topics', 
    source: 'Harvard Health Publishing' 
  },
  { 
    keyword: 'American Diabetes Association', 
    url: 'https://www.diabetes.org/diabetes', 
    source: 'American Diabetes Association' 
  },
  { 
    keyword: 'National Institutes of Health', 
    url: 'https://www.nih.gov/health-information', 
    source: 'National Institutes of Health' 
  },
  { 
    keyword: 'World Health Organization', 
    url: 'https://www.who.int/health-topics', 
    source: 'World Health Organization' 
  },
  { 
    keyword: 'research shows', 
    url: 'https://pubmed.ncbi.nlm.nih.gov', 
    source: 'PubMed Research Database' 
  },
  { 
    keyword: 'clinical studies', 
    url: 'https://www.ncbi.nlm.nih.gov/pmc', 
    source: 'National Center for Biotechnology Information' 
  },
  { 
    keyword: 'medical research', 
    url: 'https://www.nejm.org', 
    source: 'New England Journal of Medicine' 
  },
];

/**
 * Add internal links to article content
 * Adds links to first occurrence of keywords only
 */
export function addInternalLinks(content: string, currentSlug: string): string {
  let enhancedContent = content;
  const addedLinks = new Set<string>();

  INTERNAL_LINKS.forEach(link => {
    // Skip if linking to current article
    if (link.url.includes(currentSlug)) return;
    
    // Skip if already added this link
    if (addedLinks.has(link.keyword)) return;

    // Create regex to find keyword (case insensitive, whole word)
    const regex = new RegExp(`\\b(${link.keyword})\\b`, 'i');
    const match = enhancedContent.match(regex);

    if (match) {
      // Replace first occurrence only
      const replacement = `[${match[1]}](${link.url} "${link.title}")`;
      enhancedContent = enhancedContent.replace(regex, replacement);
      addedLinks.add(link.keyword);
    }
  });

  return enhancedContent;
}

/**
 * Add external citations to article content
 * Adds authoritative source links
 */
export function addExternalCitations(content: string): string {
  let enhancedContent = content;
  const addedCitations = new Set<string>();

  EXTERNAL_CITATIONS.forEach(citation => {
    // Skip if already added this citation
    if (addedCitations.has(citation.keyword)) return;

    // Create regex to find keyword (case insensitive)
    const regex = new RegExp(`(${citation.keyword})`, 'i');
    const match = enhancedContent.match(regex);

    if (match) {
      // Replace first occurrence with link
      const replacement = `[${match[1]}](${citation.url} "${citation.source}")`;
      enhancedContent = enhancedContent.replace(regex, replacement);
      addedCitations.add(citation.keyword);
    }
  });

  return enhancedContent;
}

/**
 * Enhance article with both internal links and external citations
 */
export function enhanceArticleContent(content: string, currentSlug: string): string {
  let enhanced = content;
  
  // Add internal links first
  enhanced = addInternalLinks(enhanced, currentSlug);
  
  // Then add external citations
  enhanced = addExternalCitations(enhanced);
  
  return enhanced;
}

/**
 * Get suggested internal links for an article based on content
 */
export function getSuggestedInternalLinks(content: string, currentSlug: string): InternalLink[] {
  const suggestions: InternalLink[] = [];
  
  INTERNAL_LINKS.forEach(link => {
    if (link.url.includes(currentSlug)) return; // Skip current article
    
    const regex = new RegExp(`\\b${link.keyword}\\b`, 'i');
    if (regex.test(content)) {
      suggestions.push(link);
    }
  });
  
  return suggestions;
}

/**
 * Get suggested external citations for an article
 */
export function getSuggestedExternalCitations(content: string): ExternalCitation[] {
  const suggestions: ExternalCitation[] = [];
  
  EXTERNAL_CITATIONS.forEach(citation => {
    const regex = new RegExp(citation.keyword, 'i');
    if (regex.test(content)) {
      suggestions.push(citation);
    }
  });
  
  return suggestions;
}
