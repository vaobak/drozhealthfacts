# 🔧 TEXT-TO-SPEECH TOC EXCLUSION FIX

**Date**: January 8, 2025  
**Issue**: Highlight jumps to TOC instead of actual content  
**Status**: Fixed by excluding TOC from search

---

## 🐛 PROBLEM IDENTIFIED

### **Scenario:**

```
Article Structure:
├── Intro paragraph
├── Table of Contents (TOC)
│   ├── "What is Intermittent Fasting?"
│   ├── "Benefits of Intermittent Fasting"
│   └── "How to Start"
├── Content
│   ├── H2: What is Intermittent Fasting?
│   ├── Paragraph about fasting...
│   ├── H2: Benefits of Intermittent Fasting
│   └── Paragraph about benefits...
```

### **Bug Behavior:**

1. TTS reads intro paragraph ✅
2. TTS reaches last sentence before TOC ✅
3. Next sentence: "What is Intermittent Fasting?"
4. Text matching finds: **TOC link** ❌ (wrong!)
5. Should find: **H2 header in content** ✅ (correct!)

### **Root Cause:**

```typescript
// ❌ PROBLEM: Searches ALL elements including TOC
const allElements = articleContent.querySelectorAll('p, h2, h3, li, blockquote');

allElements.forEach(el => {
  if (elementText.includes(searchText)) {
    bestMatch = el; // Might match TOC first!
  }
});
```

**Why TOC matches first:**
- TOC appears before actual content in DOM
- TOC contains same text as headers
- Text matching finds TOC link before actual header
- Result: Highlights and scrolls to TOC instead of content

---

## ✅ SOLUTION: EXCLUDE TOC

### **Implementation:**

```typescript
const scrollToSentence = (index: number) => {
  // Remove previous highlights
  document.querySelectorAll('.tts-highlight').forEach(el => {
    el.classList.remove('tts-highlight');
  });

  const articleContent = document.querySelector('.article-content');
  if (!articleContent) return;

  const currentSentence = sentences[index];
  if (!currentSentence) return;

  // Get first 50 characters of sentence for matching
  const searchText = currentSentence.substring(0, 50).trim().toLowerCase();
  
  // Find all trackable elements (EXCLUDE TOC)
  const allElements = articleContent.querySelectorAll('p, h2, h3, li, blockquote');
  
  let bestMatch: Element | null = null;
  let bestMatchScore = 0;

  allElements.forEach(el => {
    // ✅ Skip if element is inside TOC
    if (el.closest('.table-of-contents') || el.closest('[class*="toc"]')) {
      return; // Skip TOC elements
    }

    const elementText = el.textContent?.toLowerCase() || '';
    
    // Check if element contains the sentence
    if (elementText.includes(searchText)) {
      // Calculate match score (longer match = better)
      const matchLength = searchText.length;
      if (matchLength > bestMatchScore) {
        bestMatchScore = matchLength;
        bestMatch = el;
      }
    }
  });

  if (bestMatch) {
    bestMatch.classList.add('tts-highlight');
    bestMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    // ✅ Fallback: also exclude TOC
    const nonTocElements = Array.from(allElements).filter(el => 
      !el.closest('.table-of-contents') && !el.closest('[class*="toc"]')
    );
    
    const targetIndex = Math.floor((index / sentences.length) * nonTocElements.length);
    const targetElement = nonTocElements[targetIndex];
    
    if (targetElement) {
      targetElement.classList.add('tts-highlight');
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
};
```

---

## 🔍 HOW IT WORKS

### **1. Check if Element is Inside TOC**

```typescript
if (el.closest('.table-of-contents') || el.closest('[class*="toc"]')) {
  return; // Skip this element
}
```

**`closest()` method:**
- Traverses up the DOM tree
- Checks if element or any ancestor matches selector
- Returns first matching ancestor or null

**Selectors used:**
- `.table-of-contents` - Exact class match
- `[class*="toc"]` - Any class containing "toc"

**Examples matched:**
- `<div class="table-of-contents">`
- `<div class="toc-container">`
- `<nav class="article-toc">`
- `<ul class="toc-list">`

### **2. Filter TOC Elements**

```typescript
const nonTocElements = Array.from(allElements).filter(el => 
  !el.closest('.table-of-contents') && !el.closest('[class*="toc"]')
);
```

**Why filter?**
- Fallback mechanism also needs to exclude TOC
- Ensures accurate position calculation
- Prevents jumping to TOC on approximation

---

## 📊 BEFORE vs AFTER

### **Before Fix:**

```
Sentence: "What is Intermittent Fasting?"

Search finds:
1. TOC link: "What is Intermittent Fasting?" ❌ (matched first!)
2. H2 header: "What is Intermittent Fasting?" (not reached)

Result: Highlights TOC, scrolls to top ❌
```

### **After Fix:**

```
Sentence: "What is Intermittent Fasting?"

Search finds:
1. TOC link: "What is Intermittent Fasting?" (skipped! ✅)
2. H2 header: "What is Intermittent Fasting?" (matched! ✅)

Result: Highlights H2 header, scrolls to content ✅
```

---

## 🎯 EDGE CASES HANDLED

### **1. TOC at Top**

```html
<div class="article-content">
  <p>Introduction...</p>
  
  <div class="table-of-contents">
    <h2>Table of Contents</h2>
    <ul>
      <li><a href="#section1">Section 1</a></li>
      <li><a href="#section2">Section 2</a></li>
    </ul>
  </div>
  
  <h2 id="section1">Section 1</h2>
  <p>Content...</p>
</div>
```

**Behavior:**
- ✅ Skips TOC links
- ✅ Highlights actual H2 headers
- ✅ Scrolls to content sections

### **2. TOC in Sidebar**

```html
<div class="article-layout">
  <aside class="toc-sidebar">
    <nav class="table-of-contents">
      <!-- TOC links -->
    </nav>
  </aside>
  
  <main class="article-content">
    <!-- Actual content -->
  </main>
</div>
```

**Behavior:**
- ✅ Skips sidebar TOC
- ✅ Only searches main content
- ✅ Accurate highlighting

### **3. Inline TOC**

```html
<div class="article-content">
  <p>Introduction...</p>
  
  <div class="toc-inline">
    <p>Jump to: <a href="#section1">Section 1</a></p>
  </div>
  
  <h2 id="section1">Section 1</h2>
</div>
```

**Behavior:**
- ✅ Skips inline TOC
- ✅ Highlights actual header
- ✅ Correct scroll position

### **4. Multiple TOCs**

```html
<div class="article-content">
  <div class="toc-top"><!-- TOC 1 --></div>
  <p>Content...</p>
  <div class="toc-bottom"><!-- TOC 2 --></div>
</div>
```

**Behavior:**
- ✅ Skips all TOCs
- ✅ Only highlights content
- ✅ Works with multiple TOCs

---

## 🔧 TECHNICAL DETAILS

### **CSS Selectors:**

| Selector | Matches | Example |
|----------|---------|---------|
| `.table-of-contents` | Exact class | `<div class="table-of-contents">` |
| `[class*="toc"]` | Contains "toc" | `<div class="toc-container">` |
| Combined with `\|\|` | Either match | Both selectors |

### **Performance:**

```typescript
// Check if element is in TOC
if (el.closest('.table-of-contents') || el.closest('[class*="toc"]')) {
  return; // O(1) - early exit
}
```

**Complexity:**
- `closest()`: O(depth) - traverses up DOM tree
- Early exit: Skips text comparison (saves time)
- Overall: Minimal performance impact

### **Fallback Filtering:**

```typescript
const nonTocElements = Array.from(allElements).filter(el => 
  !el.closest('.table-of-contents') && !el.closest('[class*="toc"]')
);
```

**Why Array.from()?**
- `querySelectorAll` returns NodeList
- NodeList doesn't have `filter()` method
- Convert to Array first
- Then use `filter()`

---

## 🎨 VISUAL BEHAVIOR

### **Correct Flow:**

```
1. Read intro paragraph
   ↓ Highlight: Intro <p>
   
2. Read sentence before TOC
   ↓ Highlight: Last intro <p>
   
3. Read first header text
   ↓ Skip: TOC link ❌
   ↓ Find: Actual H2 ✅
   ↓ Highlight: Content H2
   ↓ Scroll: To content section
   
4. Read content paragraph
   ↓ Highlight: Content <p>
   
5. Continue through article...
```

### **Scroll Behavior:**

```
Before Fix:
Intro → TOC (jumps up) → Content (jumps down) → Confusing! ❌

After Fix:
Intro → Content → Content → Content → Smooth! ✅
```

---

## ✅ TESTING

### **Test Cases:**

1. **Article with TOC at Top**
   - ✅ Skips TOC
   - ✅ Highlights content
   - ✅ Smooth scroll progression

2. **Article with TOC in Sidebar**
   - ✅ Ignores sidebar
   - ✅ Only highlights main content
   - ✅ Correct scroll position

3. **Article with Inline TOC**
   - ✅ Skips inline links
   - ✅ Highlights actual headers
   - ✅ Natural flow

4. **Article without TOC**
   - ✅ Works normally
   - ✅ No performance impact
   - ✅ Backward compatible

5. **Article with Multiple TOCs**
   - ✅ Skips all TOCs
   - ✅ Only content highlighted
   - ✅ Accurate matching

### **Manual Testing:**

1. Open article with TOC
2. Click "Listen to Article"
3. Watch highlight progression
4. Verify:
   - ✅ Never highlights TOC
   - ✅ Always highlights content
   - ✅ Smooth scroll (no jumps)
   - ✅ Correct order (top to bottom)

---

## 📝 ALTERNATIVE APPROACHES CONSIDERED

### **1. Add data-tts-ignore Attribute**

```html
<div class="table-of-contents" data-tts-ignore="true">
  <!-- TOC content -->
</div>
```

**Pros:**
- Explicit control
- Clear intent

**Cons:**
- Requires HTML changes
- Not backward compatible
- More maintenance

**Decision:** ❌ Not chosen (too invasive)

### **2. Use :not() Selector**

```typescript
const allElements = articleContent.querySelectorAll(
  'p:not(.table-of-contents *), h2:not(.table-of-contents *)'
);
```

**Pros:**
- Single query
- No filtering needed

**Cons:**
- Complex selector
- Hard to read
- Doesn't work with `[class*="toc"]`

**Decision:** ❌ Not chosen (too complex)

### **3. Check Element Position**

```typescript
if (el.getBoundingClientRect().top < tocBottom) {
  return; // Skip if above TOC
}
```

**Pros:**
- Position-based
- Works with any TOC

**Cons:**
- Requires layout calculation
- Performance impact
- Breaks with dynamic content

**Decision:** ❌ Not chosen (unreliable)

### **4. Use closest() with Multiple Selectors** ✅

```typescript
if (el.closest('.table-of-contents') || el.closest('[class*="toc"]')) {
  return;
}
```

**Pros:**
- ✅ Simple and clear
- ✅ Fast performance
- ✅ Flexible (matches multiple patterns)
- ✅ No HTML changes needed
- ✅ Backward compatible

**Decision:** ✅ **CHOSEN** (best balance)

---

## 🎉 RESULT

**Before Fix:**
- ❌ Highlights TOC links
- ❌ Jumps to TOC
- ❌ Confusing scroll behavior
- ❌ Breaks reading flow

**After Fix:**
- ✅ Skips all TOC elements
- ✅ Only highlights content
- ✅ Smooth scroll progression
- ✅ Natural reading flow
- ✅ Works with any TOC structure

---

## ✅ CONCLUSION

**Status**: ✅ **FIXED & TESTED**

TOC exclusion sekarang bekerja dengan sempurna:
- ✅ Detects TOC by class name
- ✅ Skips TOC in search
- ✅ Skips TOC in fallback
- ✅ Works with multiple TOC patterns
- ✅ No performance impact
- ✅ Backward compatible
- ✅ Smooth reading experience

**Ready for production!** 🚀

---

**Fixed**: January 8, 2025  
**Component**: `components/TextToSpeech.tsx`  
**Method**: `closest()` with TOC selectors  
**Patterns**: `.table-of-contents`, `[class*="toc"]`  
**Status**: ✅ Production-ready
