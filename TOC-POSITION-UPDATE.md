# TOC Position Update - Before First H2 ✅

## Change Request
Move Table of Contents to appear right before the first H2 heading in the article content, instead of after the featured image.

## Previous Position
```
[Featured Image]
[TOC] ← Old position
[Article Content]
```

## New Position
```
[Featured Image]
[Intro Paragraph(s)] ← Content before first H2
[TOC] ← New position (right before first H2)
[H2 Section 1]
[H2 Section 2]
...
```

## Implementation

### 1. Split Content Logic
Added new `useMemo` hook to split article content into two parts:

```typescript
const { introContent, mainContent } = React.useMemo(() => {
  if (!articleContent) return { introContent: '', mainContent: '' };
  
  const normalizedContent = articleContent.replace(/\r\n/g, '\n');
  const firstH2Index = normalizedContent.search(/^##\s+/m);
  
  if (firstH2Index === -1) {
    // No H2 found, all content is intro
    return { introContent: articleContent, mainContent: '' };
  }
  
  return {
    introContent: articleContent.substring(0, firstH2Index).trim(),
    mainContent: articleContent.substring(firstH2Index).trim()
  };
}, [articleContent]);
```

**What it does:**
- Finds the first H2 heading (`## Heading`) in the content
- Splits content at that position
- `introContent`: Everything before first H2 (intro paragraphs)
- `mainContent`: Everything from first H2 onwards (all sections)

### 2. Render Order
Changed the Article Body section to render in this order:

```tsx
<div className="article-content">
  {/* 1. Intro Content (before first H2) */}
  {introContent && (
    <ReactMarkdown>{introContent}</ReactMarkdown>
  )}

  {/* 2. Table of Contents */}
  {articleContent && mainContent && (
    <div className="my-10">
      <TableOfContents content={articleContent} />
    </div>
  )}

  {/* 3. Main Content (from first H2 onwards) */}
  {mainContent && (
    <ReactMarkdown>{mainContent}</ReactMarkdown>
  )}
</div>
```

### 3. React Hooks Order Fix
**Critical**: Moved the new `useMemo` hook BEFORE conditional returns to comply with React Hooks rules.

**Before (Broken):**
```typescript
const headingIdMap = React.useMemo(...);

if (isLoading) return <Loading />;  // ← Conditional return
if (!article) return <NotFound />;  // ← Conditional return

const { introContent, mainContent } = React.useMemo(...);  // ❌ After conditional returns
```

**After (Fixed):**
```typescript
const headingIdMap = React.useMemo(...);
const { introContent, mainContent } = React.useMemo(...);  // ✅ Before conditional returns

if (isLoading) return <Loading />;
if (!article) return <NotFound />;
```

## Benefits

### ✅ Better User Experience
- Users read the intro first to understand the topic
- TOC appears naturally after context is established
- Clearer content flow

### ✅ SEO Friendly
- Intro text appears higher in HTML (better for crawlers)
- TOC doesn't push important content down
- Natural reading progression

### ✅ Accessibility
- Screen readers encounter intro before TOC
- Logical content hierarchy
- Better navigation structure

## Example Article Flow

### Understanding Cholesterol Article:

1. **Title (H1)**: "Understanding Cholesterol: Good vs Bad"
2. **Meta Info**: Author, date, reading time
3. **Featured Image**: Cholesterol illustration
4. **Intro Paragraph**: "Cholesterol often gets a bad reputation, but the truth is more nuanced..."
5. **TOC**: Shows 8-15 main sections (H2 only)
6. **H2 Section 1**: "What is Cholesterol?"
7. **H2 Section 2**: "LDL Cholesterol: The Bad Cholesterol"
8. ... and so on

## Files Modified
- `views/ArticleDetail.tsx`
  - Added `introContent` and `mainContent` split logic
  - Moved TOC rendering between intro and main content
  - Fixed React Hooks order (moved useMemo before conditional returns)

## Testing Checklist
- ✅ TOC appears after intro paragraph(s)
- ✅ TOC appears before first H2 heading
- ✅ Clicking TOC items scrolls to correct heading
- ✅ Highlight effect works on target heading
- ✅ No React Hooks errors
- ✅ No blank white screen
- ✅ Dark mode works correctly
- ✅ Mobile responsive layout

## Date
January 8, 2025
