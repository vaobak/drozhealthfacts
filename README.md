# Dr. Oz Health Facts - Health & Wellness Website

A modern, SEO-optimized health and wellness website featuring articles, health topics, and expert advice.

## 🌟 Features

### ✅ Completed Features

1. **Articles Page** - Browse all health articles with search functionality
2. **About Us Page** - Learn about our mission and values
3. **Contact Page** - Get in touch with contact form and information
4. **Health Topics** - Explore 6 main health categories with beautiful card layouts
5. **Article System** - Individual markdown files per article with proper slugs
6. **Category Pages** - Filter articles by health topic/category
7. **Breadcrumb Navigation** - Easy navigation (Home > Articles > Category > Article)
8. **Related Articles** - Clickable related articles in sidebar
9. **Responsive Design** - Mobile-first, fully responsive layout
10. **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, Sitemap, Robots.txt

### 📱 Pages

- **Home** - Hero section, featured articles, health topics
- **Topics** - All health categories with images
- **Articles** - All articles with search
- **Article Detail** - Full article with related articles
- **Category** - Articles filtered by category
- **About** - About the website and team
- **Contact** - Contact form and information

### 🎨 Design Features

- Modern, clean UI with Tailwind CSS
- Smooth animations and transitions
- Card-based layouts with hover effects
- Gradient backgrounds
- Professional color scheme (Blue, Teal, Green)
- Responsive images from Picsum

### 🔍 SEO Features

- Dynamic meta tags per page
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs
- Structured Data (JSON-LD)
- XML Sitemap
- Robots.txt
- Semantic HTML
- Optimized for Google indexing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd dr-oz-health-facts
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables (optional)
```bash
cp .env.local.example .env.local
# Edit .env.local with your API keys if needed
```

4. Run development server
```bash
npm run dev
```

5. Open browser at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
dr-oz-health-facts/
├── articles/              # Markdown article files
│   ├── nutrition-superfoods.md
│   ├── mental-health-stress-management.md
│   └── ...
├── components/            # React components
│   ├── ArticleCard.tsx
│   ├── TopicCard.tsx
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── SEO.tsx
├── views/                 # Page components
│   ├── Home.tsx
│   ├── Topics.tsx
│   ├── Articles.tsx
│   ├── ArticleDetail.tsx
│   ├── Category.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── utils/                 # Utility functions
│   └── articleLoader.ts
├── public/                # Static files
│   ├── robots.txt
│   └── sitemap.xml
├── App.tsx               # Main app component
├── constants.ts          # Data constants
├── types.ts              # TypeScript types
└── index.html            # HTML entry point
```

## 📝 Adding New Articles

1. Create a new markdown file in `articles/` folder:

```markdown
---
id: unique-id
title: Your Article Title
slug: your-article-slug
excerpt: Brief description
imageUrl: https://picsum.photos/id/XXX/600/400
category: Category Name
categorySlug: category-slug
author: Dr. Oz Health Team
date: Jan 16, 2025
metaTitle: SEO Title
metaDescription: SEO Description
metaKeywords: keyword1, keyword2, keyword3
---

# Your Article Title

## Introduction

Your content here...

## Section 1

More content...
```

2. Add the file path to `utils/articleLoader.ts`:

```typescript
export const ARTICLE_FILES = [
  'articles/your-new-article.md',
  // ... other articles
];
```

3. Add article metadata to `constants.ts`:

```typescript
export const ARTICLES_DATA: Article[] = [
  {
    id: 'unique-id',
    title: 'Your Article Title',
    slug: 'your-article-slug',
    // ... other fields
  },
  // ... other articles
];
```

## 🎯 Health Topics Categories

1. Nutrition & Diet
2. Fitness & Exercise
3. Mental Health
4. Heart Health
5. Sleep & Recovery
6. Disease Prevention

## 🔧 Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Markdown** - Article content

## 📊 SEO Checklist

- ✅ Meta descriptions on all pages
- ✅ Title tags optimized
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Structured Data (JSON-LD)
- ✅ XML Sitemap
- ✅ Robots.txt
- ✅ Semantic HTML
- ✅ Alt tags on images
- ✅ Fast loading times
- ✅ Mobile responsive
- ✅ Clean URL structure

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify

1. Push code to GitHub
2. Connect repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting
```

## 📈 Performance Optimization

- Lazy loading images
- Code splitting
- Minified CSS/JS
- Optimized images
- CDN for static assets
- Caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Created by Dr. Oz Health Team

## 📞 Support

For support, email info@healthhub.com or visit our Contact page.

---

**Note**: This is a demo/educational project. Always consult with healthcare professionals for medical advice.
