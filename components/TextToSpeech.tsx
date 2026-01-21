import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play, SkipForward, SkipBack } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
}

export const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [sentences, setSentences] = useState<string[]>([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [isFloating, setIsFloating] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isPlayingRef = useRef(false);
  const shouldContinueRef = useRef(false);
  const currentWordIndexRef = useRef(0);
  const allWordsRef = useRef<Array<{ word: string; element: Element | null }>>([]);
  const boundaryEventCountRef = useRef(0);
  const fallbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobileRef = useRef(false);
  const userScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const highlightEnabledRef = useRef(true); // Add ref for immediate access

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    // Detect mobile device
    isMobileRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log(`📱 Device type: ${isMobileRef.current ? 'Mobile' : 'Desktop'}`);

    // Add scroll listener to detect user scrolling
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

    // Clean and split text into sentences
    const cleaned = text
      // Remove Windows line breaks
      .replace(/\r\n/g, '\n')
      // Remove markdown headers
      .replace(/#{1,6}\s+/g, '')
      // Remove bold/italic
      .replace(/\*\*\*/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/___/g, '')
      .replace(/__/g, '')
      .replace(/_/g, '')
      // Remove links but keep text
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      // Remove HTML tags
      .replace(/<[^>]+>/g, '')
      // Remove bullet points and list markers
      .replace(/^[\s]*[-*+]\s+/gm, '')
      .replace(/^\d+\.\s+/gm, '')
      // Remove extra whitespace
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]+/g, ' ')
      .trim();

    // Split into sentences (improved regex)
    const sentenceArray = cleaned
      .split(/(?<=[.!?])\s+(?=[A-Z])/)
      .map(s => s.trim())
      .filter(s => s.length > 10); // Filter out very short sentences

    setSentences(sentenceArray);
    setCurrentSentenceIndex(0);
    setProgress(0);

    // Build word-to-element mapping
    setTimeout(() => {
      console.log('🔧 Building word mapping...');
      buildWordMapping();
      
      // Test highlight after building
      setTimeout(() => {
        if (allWordsRef.current.length > 0) {
          console.log('🧪 Testing highlight on first element...');
          const testElement = allWordsRef.current[0].element;
          if (testElement) {
            testElement.classList.add('tts-highlight');
            setTimeout(() => {
              testElement.classList.remove('tts-highlight');
              console.log('✅ Highlight test complete');
            }, 2000);
          }
        }
      }, 500);
    }, 1000); // Increased delay to ensure DOM is ready

    return () => {
      // Cleanup on unmount
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      isPlayingRef.current = false;
      shouldContinueRef.current = false;
    };
  }, [text]);

  // Build mapping of words to their DOM elements
  const buildWordMapping = () => {
    const articleContent = document.querySelector('.article-content');
    if (!articleContent) {
      console.error('❌ Article content not found!');
      return;
    }

    const allElements = articleContent.querySelectorAll('p, h2, h3, li, blockquote');
    console.log(`📄 Found ${allElements.length} content elements`);
    
    const wordMapping: Array<{ word: string; element: Element | null }> = [];

    allElements.forEach((el, idx) => {
      // Skip TOC elements
      if (el.closest('.table-of-contents') || 
          el.closest('[class*="toc"]') ||
          el.closest('.toc-')) {
        console.log(`⏭️ Skipping TOC element ${idx}`);
        return;
      }

      const text = el.textContent || '';
      const words = text
        .split(/\s+/)
        .filter(w => w.trim().length > 0);

      words.forEach(word => {
        wordMapping.push({
          word: word.toLowerCase().replace(/[^\w]/g, ''),
          element: el
        });
      });
    });

    allWordsRef.current = wordMapping;
    console.log(`✅ Built word mapping: ${wordMapping.length} words from ${allElements.length} elements`);
    
    // Log first few words for debugging
    if (wordMapping.length > 0) {
      console.log('First 10 words:', wordMapping.slice(0, 10).map(w => w.word));
    }
  };

  // Highlight word element
  const highlightWordElement = (wordIndex: number) => {
    // Skip if highlight is disabled (use ref for immediate access)
    if (!highlightEnabledRef.current) {
      console.log('⏭️ Highlight disabled, skipping');
      return;
    }
    
    // Remove previous highlights
    document.querySelectorAll('.tts-highlight').forEach(el => {
      el.classList.remove('tts-highlight');
    });

    const wordData = allWordsRef.current[wordIndex];
    if (!wordData || !wordData.element) {
      console.warn(`⚠️ No word data at index ${wordIndex}`);
      return;
    }

    // Add highlight to element
    wordData.element.classList.add('tts-highlight');
    console.log(`✨ Highlighted element with word "${wordData.word}" (${wordIndex + 1}/${allWordsRef.current.length})`);
    
    // Only auto-scroll if user is NOT manually scrolling
    if (userScrollingRef.current) {
      console.log('🚫 User is scrolling, skipping auto-scroll');
      return;
    }
    
    // Scroll to element - only if not visible
    const rect = wordData.element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const isVisible = rect.top >= 100 && rect.bottom <= viewportHeight - 100; // Add margin
    
    if (!isVisible) {
      wordData.element.scrollIntoView({ 
        behavior: 'smooth', // Always smooth for better UX
        block: 'center',
        inline: 'nearest'
      });
      console.log('📜 Auto-scrolled to element');
    }
  };

  // Fallback highlighting for mobile (time-based estimation)
  const startFallbackHighlighting = (sentence: string, duration: number) => {
    console.log('🔄 Starting fallback highlighting for mobile');
    
    // Clear any existing interval
    if (fallbackIntervalRef.current) {
      clearInterval(fallbackIntervalRef.current);
    }

    // Split sentence into words
    const words = sentence.split(/\s+/).filter(w => w.trim().length > 0);
    const wordsPerSecond = 2.5; // Average speaking rate
    const msPerWord = 1000 / wordsPerSecond;
    
    let wordIndex = 0;
    
    fallbackIntervalRef.current = setInterval(() => {
      if (wordIndex < words.length && isPlayingRef.current) {
        const word = words[wordIndex].toLowerCase().replace(/[^\w]/g, '');
        
        // Find word in mapping
        const startIndex = currentWordIndexRef.current;
        let foundIndex = -1;

        for (let i = startIndex; i < allWordsRef.current.length; i++) {
          if (allWordsRef.current[i].word === word) {
            foundIndex = i;
            break;
          }
        }

        if (foundIndex !== -1) {
          currentWordIndexRef.current = foundIndex + 1;
          highlightWordElement(foundIndex);
        }
        
        wordIndex++;
      } else {
        if (fallbackIntervalRef.current) {
          clearInterval(fallbackIntervalRef.current);
          fallbackIntervalRef.current = null;
        }
      }
    }, msPerWord);
  };

  // Speak a specific sentence
  const speakSentence = (index: number) => {
    if (index < 0 || index >= sentences.length || !isSupported) {
      handleStop();
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel(); // Cancel any ongoing speech

    const sentence = sentences[index];
    const utterance = new SpeechSynthesisUtterance(sentence);
    
    // Configure voice settings
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';
    
    // Event handlers
    utterance.onstart = () => {
      isPlayingRef.current = true;
      setIsPlaying(true);
      setIsPaused(false);
      setCurrentSentenceIndex(index);
      setProgress(Math.round((index / sentences.length) * 100));
      boundaryEventCountRef.current = 0; // Reset counter
      
      console.log(`Started sentence ${index + 1}/${sentences.length}`);
      
      // Start fallback highlighting for mobile after 500ms if no boundary events
      if (isMobileRef.current) {
        setTimeout(() => {
          if (boundaryEventCountRef.current === 0 && isPlayingRef.current) {
            console.log('⚠️ No boundary events detected on mobile, using fallback');
            startFallbackHighlighting(sentence, sentence.length / 2.5); // Estimate duration
          }
        }, 500);
      }
    };

    // Word boundary event - fires for each word spoken
    utterance.onboundary = (event) => {
      boundaryEventCountRef.current++; // Count boundary events
      console.log(`🔊 Boundary event:`, event.name, event);
      
      if (event.name === 'word') {
        // Stop fallback if boundary events are working
        if (fallbackIntervalRef.current) {
          clearInterval(fallbackIntervalRef.current);
          fallbackIntervalRef.current = null;
          console.log('✅ Boundary events working, stopped fallback');
        }
        
        // Get the word being spoken
        const spokenText = sentence.substring(event.charIndex, event.charIndex + event.charLength);
        const cleanWord = spokenText.toLowerCase().replace(/[^\w]/g, '');
        
        console.log(`🗣️ Speaking word: "${spokenText}" (cleaned: "${cleanWord}")`);

        // Check if word mapping exists
        if (allWordsRef.current.length === 0) {
          console.error('❌ Word mapping is empty! Rebuilding...');
          buildWordMapping();
          return;
        }

        // Find matching word in our mapping starting from current position
        const startIndex = currentWordIndexRef.current;
        let foundIndex = -1;

        // Search forward from current position
        for (let i = startIndex; i < allWordsRef.current.length; i++) {
          if (allWordsRef.current[i].word === cleanWord) {
            foundIndex = i;
            console.log(`✅ Found word at index ${i} (forward search)`);
            break;
          }
        }

        // If not found forward, search from beginning (wrap around)
        if (foundIndex === -1) {
          for (let i = 0; i < startIndex; i++) {
            if (allWordsRef.current[i].word === cleanWord) {
              foundIndex = i;
              console.log(`✅ Found word at index ${i} (backward search)`);
              break;
            }
          }
        }

        if (foundIndex !== -1) {
          currentWordIndexRef.current = foundIndex + 1; // Move to next word
          highlightWordElement(foundIndex);
        } else {
          console.warn(`⚠️ Word "${cleanWord}" not found in mapping (searched ${allWordsRef.current.length} words)`);
        }
      }
    };

    utterance.onend = () => {
      console.log(`Finished sentence ${index + 1}/${sentences.length}`);
      
      // Clear fallback interval
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
        fallbackIntervalRef.current = null;
      }
      
      // Check if should continue to next sentence
      if (index < sentences.length - 1 && shouldContinueRef.current) {
        console.log('Auto-continuing to next sentence...');
        setTimeout(() => {
          speakSentence(index + 1);
        }, 300); // Small pause between sentences
      } else {
        // Finished all sentences or stopped
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

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      
      // Try next sentence on error
      if (index < sentences.length - 1 && shouldContinueRef.current) {
        console.log('Error occurred, trying next sentence...');
        setTimeout(() => {
          speakSentence(index + 1);
        }, 500);
      } else {
        handleStop();
      }
    };

    utteranceRef.current = utterance;
    synth.speak(utterance);
  };



  const handlePlay = () => {
    if (!isSupported || sentences.length === 0) return;

    const synth = window.speechSynthesis;

    if (isPaused) {
      // Resume: Re-speak current sentence instead of using synth.resume()
      // This is more reliable, especially on mobile
      console.log(`Resuming from sentence ${currentSentenceIndex + 1}/${sentences.length}`);
      
      // IMPORTANT: Stop auto-continue temporarily (like skip)
      shouldContinueRef.current = false;
      isPlayingRef.current = false;
      
      setIsPaused(false);
      setIsPlaying(true);
      
      // Set floating on mobile when playing
      if (isMobileRef.current) {
        setIsFloating(true);
      }
      
      // Clear fallback interval
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
        fallbackIntervalRef.current = null;
      }
      
      // Cancel and re-speak current sentence
      synth.cancel();
      setTimeout(() => {
        // Re-enable auto-continue AFTER cancel completes
        isPlayingRef.current = true;
        shouldContinueRef.current = true;
        speakSentence(currentSentenceIndex);
      }, 200); // Same delay as skip
    } else {
      // Start from current sentence
      console.log(`Starting from sentence ${currentSentenceIndex + 1}/${sentences.length}`);
      setIsPlaying(true);
      isPlayingRef.current = true;
      shouldContinueRef.current = true; // Enable auto-continue
      
      // Set floating on mobile when playing
      if (isMobileRef.current) {
        setIsFloating(true);
      }
      
      speakSentence(currentSentenceIndex);
    }
  };

  const handlePause = () => {
    if (!isSupported) return;
    
    const synth = window.speechSynthesis;
    if (synth.speaking && !synth.paused) {
      synth.pause();
      
      // Clear fallback interval when paused
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
        fallbackIntervalRef.current = null;
      }
      
      setIsPaused(true);
      setIsPlaying(false);
      shouldContinueRef.current = false; // Disable auto-continue when paused
      
      // Keep floating on mobile when paused
      if (isMobileRef.current) {
        setIsFloating(true);
      }
    }
  };

  const handleStop = () => {
    if (!isSupported) return;
    
    console.log('Stopping playback');
    const synth = window.speechSynthesis;
    synth.cancel();
    
    // Clear fallback interval
    if (fallbackIntervalRef.current) {
      clearInterval(fallbackIntervalRef.current);
      fallbackIntervalRef.current = null;
    }
    
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentSentenceIndex(0);
    setProgress(0);
    setIsFloating(false); // Remove floating when stopped
    utteranceRef.current = null;
    isPlayingRef.current = false;
    shouldContinueRef.current = false; // Disable auto-continue
    currentWordIndexRef.current = 0; // Reset word position
    boundaryEventCountRef.current = 0; // Reset counter
    
    // Remove highlights
    document.querySelectorAll('.tts-highlight').forEach(el => {
      el.classList.remove('tts-highlight');
    });
  };

  const handleSkipForward = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      const nextIndex = currentSentenceIndex + 1;
      setCurrentSentenceIndex(nextIndex);
      
      // Stop auto-continue temporarily
      const wasPlaying = isPlayingRef.current;
      const wasPaused = isPaused;
      shouldContinueRef.current = false;
      isPlayingRef.current = false;
      
      // Clear fallback interval before speaking new sentence
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
        fallbackIntervalRef.current = null;
      }
      
      // Cancel current speech
      window.speechSynthesis.cancel();
      
      // Wait for cancel to complete, then speak next sentence
      setTimeout(() => {
        if (wasPlaying || wasPaused) {
          isPlayingRef.current = true;
          shouldContinueRef.current = true; // Re-enable auto-continue
          setIsPlaying(true); // Keep playing state
          setIsPaused(false); // Ensure not paused
          
          // Maintain floating on mobile
          if (isMobileRef.current) {
            setIsFloating(true);
          }
          
          speakSentence(nextIndex);
        }
      }, 200);
    }
  };

  const handleSkipBackward = () => {
    if (currentSentenceIndex > 0) {
      const prevIndex = currentSentenceIndex - 1;
      setCurrentSentenceIndex(prevIndex);
      
      // Stop auto-continue temporarily
      const wasPlaying = isPlayingRef.current;
      const wasPaused = isPaused;
      shouldContinueRef.current = false;
      isPlayingRef.current = false;
      
      // Clear fallback interval before speaking new sentence
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
        fallbackIntervalRef.current = null;
      }
      
      // Cancel current speech
      window.speechSynthesis.cancel();
      
      // Wait for cancel to complete, then speak previous sentence
      setTimeout(() => {
        if (wasPlaying || wasPaused) {
          isPlayingRef.current = true;
          shouldContinueRef.current = true; // Re-enable auto-continue
          setIsPlaying(true); // Keep playing state
          setIsPaused(false); // Ensure not paused
          
          // Maintain floating on mobile
          if (isMobileRef.current) {
            setIsFloating(true);
          }
          
          speakSentence(prevIndex);
        }
      }, 200);
    }
  };

  const toggleHighlight = () => {
    const newState = !highlightEnabled;
    setHighlightEnabled(newState);
    highlightEnabledRef.current = newState; // Sync ref immediately
    
    console.log(`🖍️ Highlight ${newState ? 'enabled' : 'disabled'}`);
    
    // Remove all highlights if disabling
    if (!newState) {
      document.querySelectorAll('.tts-highlight').forEach(el => {
        el.classList.remove('tts-highlight');
      });
      console.log('🧹 Cleared all highlights');
    } else {
      console.log('✨ Highlight will resume on next word');
    }
  };

  if (!isSupported) {
    return null;
  }

  if (sentences.length === 0) {
    return null;
  }

  return (
    <div className={`
      ${isFloating ? 'fixed bottom-4 left-4 z-50 max-w-[90vw] sm:max-w-md' : 'space-y-3'}
      ${isFloating ? 'bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700' : ''}
    `}>
      {/* Progress Bar */}
      {(isPlaying || isPaused || progress > 0) && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden mb-3">
          <div 
            className="bg-teal-600 dark:bg-teal-500 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Play/Pause Button */}
        {!isPlaying && !isPaused && (
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white rounded-lg transition-colors font-medium min-h-[44px] shadow-sm"
            title="Listen to article"
            aria-label="Listen to article"
          >
            <Volume2 size={20} />
            <span className="hidden sm:inline">Listen to Article</span>
            <span className="sm:hidden">Listen</span>
          </button>
        )}

        {isPlaying && (
          <button
            onClick={handlePause}
            className="flex items-center gap-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white rounded-lg transition-colors font-medium min-h-[44px] shadow-sm"
            title="Pause"
            aria-label="Pause audio"
          >
            <Pause size={20} />
            {!isFloating && <span className="hidden sm:inline">Pause</span>}
          </button>
        )}

        {isPaused && (
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg transition-colors font-medium min-h-[44px] shadow-sm"
            title="Resume"
            aria-label="Resume audio"
          >
            <Play size={20} />
            {!isFloating && <span className="hidden sm:inline">Resume</span>}
          </button>
        )}

        {/* Skip Backward */}
        {(isPlaying || isPaused) && currentSentenceIndex > 0 && (
          <button
            onClick={handleSkipBackward}
            className="flex items-center justify-center w-11 h-11 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white rounded-lg transition-colors min-w-[44px] min-h-[44px] shadow-sm"
            title="Previous sentence"
            aria-label="Previous sentence"
          >
            <SkipBack size={20} />
          </button>
        )}

        {/* Skip Forward */}
        {(isPlaying || isPaused) && currentSentenceIndex < sentences.length - 1 && (
          <button
            onClick={handleSkipForward}
            className="flex items-center justify-center w-11 h-11 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white rounded-lg transition-colors min-w-[44px] min-h-[44px] shadow-sm"
            title="Next sentence"
            aria-label="Next sentence"
          >
            <SkipForward size={20} />
          </button>
        )}

        {/* Stop Button */}
        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            className="flex items-center justify-center w-11 h-11 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg transition-colors min-w-[44px] min-h-[44px] shadow-sm"
            title="Stop"
            aria-label="Stop audio"
          >
            <VolumeX size={20} />
          </button>
        )}

        {/* Highlight Toggle Button */}
        {(isPlaying || isPaused) && (
          <button
            onClick={toggleHighlight}
            className={`flex items-center justify-center w-11 h-11 ${
              highlightEnabled 
                ? 'bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600' 
                : 'bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700'
            } text-white rounded-lg transition-colors min-w-[44px] min-h-[44px] shadow-sm`}
            title={highlightEnabled ? "Disable highlight" : "Enable highlight"}
            aria-label={highlightEnabled ? "Disable highlight" : "Enable highlight"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m9 11-6 6v3h9l3-3"/>
              <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>
            </svg>
          </button>
        )}

        {/* Progress Text */}
        {(isPlaying || isPaused || progress > 0) && (
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-auto">
            {currentSentenceIndex + 1} / {sentences.length}
          </span>
        )}
      </div>
    </div>
  );
};
