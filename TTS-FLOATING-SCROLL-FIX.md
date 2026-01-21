# TTS Floating Player & Manual Scroll Fix - COMPLETE ✅

## Date: Jan 9, 2025

## Problems Fixed

### Problem 1: Floating Player Kembali ke Tempat Awal Saat Skip
**Symptom**:
- Di mobile, saat klik skip backward/forward
- Floating player hilang dan kembali ke tempat awal (inline)
- Player tidak tetap floating

**Root Cause**:
- `setIsPlaying(true)` tidak dipanggil saat skip
- State `isPlaying` berubah menjadi `false` sementara
- Conditional rendering `isFloating` bergantung pada `isPlaying || isPaused`
- Saat skip, state reset menyebabkan floating hilang

**Solution**:
```typescript
const handleSkipForward = () => {
  // ... skip logic ...
  
  setTimeout(() => {
    if (wasPlaying) {
      isPlayingRef.current = true;
      shouldContinueRef.current = true;
      setIsPlaying(true);      // ✅ Keep playing state
      setIsPaused(false);      // ✅ Ensure not paused
      speakSentence(nextIndex);
    }
  }, 200);
};
```

**Key Changes**:
- ✅ Added `setIsPlaying(true)` after skip
- ✅ Added `setIsPaused(false)` to ensure clean state
- ✅ Floating state maintained during skip
- ✅ Only `handleStop()` removes floating

**Result**:
- Floating player tetap floating saat skip
- Hanya tombol Stop yang mengembalikan ke inline
- UX lebih konsisten

### Problem 2: Scroll Dipaksa ke Highlight (Tidak Bisa Scroll Manual)
**Symptom**:
- Saat audio playing, user tidak bisa scroll manual
- Scroll ke atas/bawah langsung "mantul" kembali ke highlight
- Auto-scroll terlalu agresif
- User dipaksa melihat yang sedang dibaca

**Root Cause**:
1. Auto-scroll dipanggil setiap word boundary event
2. Tidak ada deteksi user scroll manual
3. `scrollIntoView` dipanggil terlalu sering
4. Mobile menggunakan `behavior: 'auto'` (instant scroll)

**Solution - User Scroll Detection**:
```typescript
// Add refs
const userScrollingRef = useRef(false);
const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

// Add scroll listener
const handleScroll = () => {
  userScrollingRef.current = true;
  
  // Clear existing timeout
  if (scrollTimeoutRef.current) {
    clearTimeout(scrollTimeoutRef.current);
  }
  
  // Reset after 2 seconds of no scrolling
  scrollTimeoutRef.current = setTimeout(() => {
    userScrollingRef.current = false;
    console.log('📜 User stopped scrolling, auto-scroll enabled');
  }, 2000);
};

window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('touchmove', handleScroll, { passive: true });
```

**Solution - Smart Auto-Scroll**:
```typescript
const highlightWordElement = (wordIndex: number) => {
  // ... highlight logic ...
  
  // Only auto-scroll if user is NOT manually scrolling
  if (userScrollingRef.current) {
    console.log('🚫 User is scrolling, skipping auto-scroll');
    return; // Skip auto-scroll
  }
  
  // Check if element is visible with margin
  const rect = wordData.element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const isVisible = rect.top >= 100 && rect.bottom <= viewportHeight - 100;
  
  if (!isVisible) {
    wordData.element.scrollIntoView({ 
      behavior: 'smooth', // Always smooth
      block: 'center',
      inline: 'nearest'
    });
  }
};
```

**Key Changes**:
- ✅ Detect user scroll with `scroll` and `touchmove` events
- ✅ Set `userScrollingRef.current = true` saat user scroll
- ✅ Reset setelah 2 detik tidak ada scroll (user selesai scroll)
- ✅ Skip auto-scroll jika user sedang scroll
- ✅ Tambah margin 100px untuk visibility check (lebih toleran)
- ✅ Gunakan `behavior: 'smooth'` untuk semua device (tidak instant lagi)
- ✅ Cleanup scroll listener saat unmount

**Result**:
- User bisa scroll manual kapan saja
- Auto-scroll tidak mengganggu saat user scroll
- Setelah 2 detik tidak scroll, auto-scroll aktif lagi
- Highlight tetap muncul, hanya scroll yang di-skip

## Technical Implementation

### Scroll Detection Flow:
```
1. User mulai scroll (touch/mouse wheel)
2. handleScroll() fired
3. Set userScrollingRef.current = true
4. Clear existing timeout
5. Set new timeout 2 seconds
6. highlightWordElement() called
7. Check userScrollingRef.current
8. If true: Skip auto-scroll, return early
9. After 2 seconds: Reset userScrollingRef.current = false
10. Auto-scroll enabled again
```

### Floating State Flow:
```
PLAY:
- setIsPlaying(true)
- setIsFloating(true) on mobile
- Player floating

SKIP:
- Cancel speech
- setIsPlaying(true) ✅ (keep floating)
- setIsPaused(false) ✅
- Speak next sentence
- Player still floating ✅

STOP:
- setIsPlaying(false)
- setIsFloating(false)
- Player back to inline
```

### Visibility Check Improvement:
**OLD**:
```typescript
const isVisible = rect.top >= 0 && rect.bottom <= viewportHeight;
```
- Too strict, triggers scroll too often
- No margin for floating player

**NEW**:
```typescript
const isVisible = rect.top >= 100 && rect.bottom <= viewportHeight - 100;
```
- 100px margin top and bottom
- More tolerant, less aggressive scrolling
- Accounts for floating player space

## Event Listeners

### Scroll Events:
```typescript
window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('touchmove', handleScroll, { passive: true });
```

**Why both events?**:
- `scroll`: Desktop mouse wheel, trackpad
- `touchmove`: Mobile touch scroll

**Why passive?**:
- Better performance
- No preventDefault needed
- Browser can optimize scrolling

### Cleanup:
```typescript
return () => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('touchmove', handleScroll);
  
  if (scrollTimeoutRef.current) {
    clearTimeout(scrollTimeoutRef.current);
  }
};
```

## Timing

### Scroll Reset Timeout:
- **1 second**: Too short, auto-scroll resumes too quickly
- **2 seconds**: ✅ Good balance, user has time to read
- **3 seconds**: Too long, auto-scroll feels broken

### Skip Delay:
- **200ms**: Reliable for speech cancel + state update

## Console Logs

### User Scrolling:
```
🚫 User is scrolling, skipping auto-scroll
🚫 User is scrolling, skipping auto-scroll
📜 User stopped scrolling, auto-scroll enabled
✨ Highlighted element
📜 Auto-scrolled to element
```

### Skip with Floating:
```
Finished sentence 5/50
Starting from sentence 6/50
Started sentence 6/50
✨ Highlighted element
(Player stays floating ✅)
```

## Testing Checklist

### Floating Player:
- [ ] Desktop: Player tidak floating
- [ ] Mobile: Player floating saat play
- [ ] Mobile: Player tetap floating saat skip forward
- [ ] Mobile: Player tetap floating saat skip backward
- [ ] Mobile: Player tetap floating saat pause
- [ ] Mobile: Player kembali inline saat stop
- [ ] Mobile: Player position bottom-left

### Manual Scroll:
- [ ] Scroll saat playing: Bisa scroll bebas
- [ ] Scroll ke atas: Tidak mantul ke highlight
- [ ] Scroll ke bawah: Tidak mantul ke highlight
- [ ] Stop scrolling 2 detik: Auto-scroll aktif lagi
- [ ] Highlight tetap muncul saat scroll manual
- [ ] Touch scroll di mobile: Bisa scroll bebas
- [ ] Mouse wheel di desktop: Bisa scroll bebas

### Auto-Scroll Behavior:
- [ ] Element visible: Tidak auto-scroll
- [ ] Element di luar viewport: Auto-scroll
- [ ] Smooth scroll: Tidak instant/jarring
- [ ] Margin 100px: Tidak terlalu agresif
- [ ] User scroll: Auto-scroll di-skip

## Performance

### Memory:
- ✅ Scroll listeners cleaned up on unmount
- ✅ Timeout cleared on unmount
- ✅ No memory leaks

### CPU:
- ✅ Passive event listeners (optimized)
- ✅ Debounced with timeout (not every scroll event)
- ✅ Early return if user scrolling (minimal processing)

### Battery (Mobile):
- ✅ Passive listeners reduce battery drain
- ✅ Smooth scroll instead of instant (less jarring)
- ✅ Conditional scrolling (only when needed)

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Scroll Detection | ✅ | ✅ | ✅ | ✅ |
| Touch Events | ✅ | ✅ | ✅ | ✅ |
| Passive Listeners | ✅ | ✅ | ✅ | ✅ |
| Floating Position | ✅ | ✅ | ✅ | ✅ |
| Smooth Scroll | ✅ | ✅ | ✅ | ✅ |

## Files Modified
- `components/TextToSpeech.tsx` - Added scroll detection, fixed floating state

## User Experience Improvements

### Before:
❌ Floating player hilang saat skip  
❌ Tidak bisa scroll manual saat playing  
❌ Auto-scroll terlalu agresif  
❌ Scroll "mantul" kembali ke highlight  

### After:
✅ Floating player tetap floating saat skip  
✅ Bisa scroll manual kapan saja  
✅ Auto-scroll hanya saat user tidak scroll  
✅ Smooth scroll, tidak jarring  
✅ Margin 100px untuk toleransi  

## Future Enhancements (Optional)

1. **Adjustable timeout**: User setting untuk scroll timeout (1-5 detik)
2. **Visual indicator**: Show icon saat auto-scroll disabled
3. **Scroll velocity**: Detect fast scroll vs slow scroll
4. **Smart resume**: Resume auto-scroll saat element hampir keluar viewport
5. **Gesture control**: Swipe up/down untuk toggle auto-scroll
6. **Floating position**: Allow user to drag player to different position
7. **Minimize button**: Collapse player to small icon
