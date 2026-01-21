# 🔧 TEXT-TO-SPEECH AUTO-CONTINUE FIX

**Date**: January 8, 2025  
**Issue**: TTS stops after 1 sentence, doesn't auto-continue  
**Status**: Fixed

---

## 🐛 PROBLEM IDENTIFIED

### **Root Cause:**

```typescript
utterance.onend = () => {
  // Auto-play next sentence
  if (index < sentences.length - 1 && isPlaying) {  // ❌ PROBLEM HERE
    setTimeout(() => {
      speakSentence(index + 1);
    }, 300);
  }
};
```

**Why it fails:**
- `isPlaying` is a **state variable** (useState)
- When `onend` callback executes, it captures the **old state value**
- By the time `onend` runs, `isPlaying` might already be `false`
- Condition `if (... && isPlaying)` fails
- Auto-continue doesn't happen

**This is a classic React closure problem!**

---

## ✅ SOLUTION

### **Use useRef for Reliable State Tracking**

**Added refs:**
```typescript
const isPlayingRef = useRef(false);
const shouldContinueRef = useRef(false);
```

**Why refs work:**
- ✅ Refs are **mutable** and always have current value
- ✅ No closure issues
- ✅ Callbacks always see latest value
- ✅ No re-renders when updated

---

## 🔧 IMPLEMENTATION

### **1. Initialize Refs**

```typescript
const [isPlaying, setIsPlaying] = useState(false);
const isPlayingRef = useRef(false);
const shouldContinueRef = useRef(false);
```

### **2. Update handlePlay**

```typescript
const handlePlay = () => {
  if (!isSupported || sentences.length === 0) return;

  const synth = window.speechSynthesis;

  if (isPaused) {
    synth.resume();
    setIsPaused(false);
    setIsPlaying(true);
    isPlayingRef.current = true;
    shouldContinueRef.current = true; // ✅ Enable auto-continue
  } else {
    console.log(`Starting from sentence ${currentSentenceIndex + 1}/${sentences.length}`);
    setIsPlaying(true);
    isPlayingRef.current = true;
    shouldContinueRef.current = true; // ✅ Enable auto-continue
    speakSentence(currentSentenceIndex);
  }
};
```

### **3. Update speakSentence**

```typescript
utterance.onstart = () => {
  isPlayingRef.current = true; // ✅ Update ref
  setIsPlaying(true);
  setIsPaused(false);
  setCurrentSentenceIndex(index);
  setProgress(Math.round((index / sentences.length) * 100));
  scrollToSentence(index);
};

utterance.onend = () => {
  console.log(`Finished sentence ${index + 1}/${sentences.length}`);
  
  // ✅ Check ref instead of state
  if (index < sentences.length - 1 && shouldContinueRef.current) {
    console.log('Auto-continuing to next sentence...');
    setTimeout(() => {
      speakSentence(index + 1);
    }, 300);
  } else {
    console.log('Finished reading or stopped');
    isPlayingRef.current = false;
    shouldContinueRef.current = false;
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(100);
    
    // Remove highlights
    document.querySelectorAll('.tts-highlight').forEach(el => {
      el.classList.remove('tts-highlight');
    });
  }
};
```

### **4. Update handlePause**

```typescript
const handlePause = () => {
  if (!isSupported) return;
  
  const synth = window.speechSynthesis;
  if (synth.speaking && !synth.paused) {
    synth.pause();
    setIsPaused(true);
    setIsPlaying(false);
    shouldContinueRef.current = false; // ✅ Disable auto-continue
  }
};
```

### **5. Update handleStop**

```typescript
const handleStop = () => {
  if (!isSupported) return;
  
  console.log('Stopping playback');
  const synth = window.speechSynthesis;
  synth.cancel();
  setIsPlaying(false);
  setIsPaused(false);
  setCurrentSentenceIndex(0);
  setProgress(0);
  utteranceRef.current = null;
  isPlayingRef.current = false;
  shouldContinueRef.current = false; // ✅ Disable auto-continue
  
  // Remove highlights
  document.querySelectorAll('.tts-highlight').forEach(el => {
    el.classList.remove('tts-highlight');
  });
};
```

### **6. Update Skip Functions**

```typescript
const handleSkipForward = () => {
  if (currentSentenceIndex < sentences.length - 1) {
    const nextIndex = currentSentenceIndex + 1;
    setCurrentSentenceIndex(nextIndex);
    if (isPlayingRef.current) { // ✅ Check ref
      speakSentence(nextIndex);
    }
  }
};

const handleSkipBackward = () => {
  if (currentSentenceIndex > 0) {
    const prevIndex = currentSentenceIndex - 1;
    setCurrentSentenceIndex(prevIndex);
    if (isPlayingRef.current) { // ✅ Check ref
      speakSentence(prevIndex);
    }
  }
};
```

---

## 📊 STATE MANAGEMENT

### **State Variables (useState):**
- `isPlaying` - For UI rendering
- `isPaused` - For UI rendering
- `currentSentenceIndex` - For UI rendering
- `progress` - For UI rendering

### **Refs (useRef):**
- `isPlayingRef` - For callback logic
- `shouldContinueRef` - For auto-continue control
- `utteranceRef` - For speech synthesis object

### **Why Both?**

| Type | Purpose | Updates | Re-renders |
|------|---------|---------|------------|
| **State** | UI display | Triggers re-render | Yes |
| **Ref** | Callback logic | No re-render | No |

**Best Practice:**
- Use **state** for UI that needs to update
- Use **ref** for values needed in callbacks

---

## 🔍 DEBUGGING

### **Added Console Logs:**

```typescript
// In handlePlay
console.log(`Starting from sentence ${currentSentenceIndex + 1}/${sentences.length}`);

// In utterance.onend
console.log(`Finished sentence ${index + 1}/${sentences.length}`);
console.log('Auto-continuing to next sentence...');
console.log('Finished reading or stopped');

// In handleStop
console.log('Stopping playback');

// In utterance.onerror
console.log('Error occurred, trying next sentence...');
```

**How to debug:**
1. Open browser console (F12)
2. Click "Listen to Article"
3. Watch console logs
4. Should see: "Starting from sentence 1/X"
5. Then: "Finished sentence 1/X"
6. Then: "Auto-continuing to next sentence..."
7. Repeat for each sentence

---

## ✅ TESTING

### **Test Cases:**

1. **Basic Playback**
   - ✅ Click Listen → Reads sentence 1
   - ✅ Auto-continues to sentence 2
   - ✅ Auto-continues to sentence 3
   - ✅ Continues until end

2. **Pause/Resume**
   - ✅ Click Pause → Stops at current sentence
   - ✅ Click Resume → Continues from same sentence
   - ✅ Auto-continues after resume

3. **Stop**
   - ✅ Click Stop → Stops immediately
   - ✅ Resets to sentence 1
   - ✅ Progress resets to 0%

4. **Skip Forward**
   - ✅ Click Skip Forward → Jumps to next sentence
   - ✅ Continues playing if was playing
   - ✅ Auto-continues after skip

5. **Skip Backward**
   - ✅ Click Skip Backward → Jumps to previous sentence
   - ✅ Continues playing if was playing
   - ✅ Auto-continues after skip

6. **Edge Cases**
   - ✅ Last sentence → Stops automatically
   - ✅ First sentence → Skip backward disabled
   - ✅ Navigate away → Cleanup works
   - ✅ Long articles → No issues

---

## 🎯 BEHAVIOR

### **Auto-Continue Flow:**

```
User clicks "Listen"
  ↓
shouldContinueRef.current = true
  ↓
speakSentence(0) starts
  ↓
Sentence 0 finishes (onend)
  ↓
Check: shouldContinueRef.current === true? ✅
  ↓
Wait 300ms
  ↓
speakSentence(1) starts
  ↓
Sentence 1 finishes (onend)
  ↓
Check: shouldContinueRef.current === true? ✅
  ↓
Wait 300ms
  ↓
speakSentence(2) starts
  ↓
... continues until end or stopped
```

### **Stop Flow:**

```
User clicks "Stop"
  ↓
shouldContinueRef.current = false
  ↓
synth.cancel() stops current speech
  ↓
onend callback runs
  ↓
Check: shouldContinueRef.current === true? ❌
  ↓
Stops (doesn't continue)
```

---

## 📝 KEY LEARNINGS

### **React Closure Problem:**

```typescript
// ❌ BAD: State in callback
utterance.onend = () => {
  if (isPlaying) { // Captures old value!
    // Won't work reliably
  }
};

// ✅ GOOD: Ref in callback
utterance.onend = () => {
  if (shouldContinueRef.current) { // Always current value!
    // Works reliably
  }
};
```

### **When to Use Refs:**

Use `useRef` when:
- ✅ Value needed in callbacks
- ✅ Value changes but shouldn't trigger re-render
- ✅ Need mutable value across renders
- ✅ Avoiding closure issues

Use `useState` when:
- ✅ Value affects UI
- ✅ Need re-render on change
- ✅ Simple state management

---

## 🎉 RESULT

**Before Fix:**
- ❌ Stops after 1 sentence
- ❌ No auto-continue
- ❌ User must click for each sentence

**After Fix:**
- ✅ Auto-continues through all sentences
- ✅ Smooth transitions (300ms pause)
- ✅ Reliable playback
- ✅ Works with any article length
- ✅ Proper cleanup

---

## ✅ CONCLUSION

**Status**: ✅ **FIXED & TESTED**

Auto-continue sekarang bekerja dengan sempurna:
- ✅ Membaca semua kalimat secara otomatis
- ✅ Pause 300ms antar kalimat
- ✅ Bisa di-pause/resume
- ✅ Bisa di-skip forward/backward
- ✅ Bisa di-stop kapan saja
- ✅ Cleanup proper saat unmount

**Ready for production!** 🚀

---

**Fixed**: January 8, 2025  
**Component**: `components/TextToSpeech.tsx`  
**Issue**: Closure problem with state in callbacks  
**Solution**: Use useRef for callback logic  
**Status**: ✅ Production-ready
