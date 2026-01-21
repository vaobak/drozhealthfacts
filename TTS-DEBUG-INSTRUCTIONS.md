# TTS Word-Level Highlighting - Debug Instructions

## Masalah
Highlight per kata tidak muncul di artikel, hanya suara saja yang berfungsi.

## Perubahan yang Dibuat

### 1. Enhanced Logging
Menambahkan console log yang lebih detail untuk debugging:
- 🔧 Building word mapping
- 📄 Found X content elements
- ✅ Built word mapping: X words
- 🔊 Boundary event (setiap event dari Web Speech API)
- 🗣️ Speaking word (setiap kata yang diucapkan)
- ✅ Found word at index (ketika kata ditemukan)
- ✨ Highlighted element (ketika highlight diterapkan)
- ⚠️ Warning messages (jika ada masalah)

### 2. Test Highlight on Load
Menambahkan test otomatis yang akan:
- Highlight elemen pertama selama 2 detik setelah page load
- Memverifikasi bahwa CSS highlight bekerja
- Menghapus highlight setelah 2 detik

### 3. Increased Delay
Meningkatkan delay untuk build word mapping dari 500ms ke 1000ms untuk memastikan DOM sudah siap.

## Cara Testing

### Step 1: Buka Browser Console
1. Buka artikel di browser
2. **Desktop**: Tekan F12 atau klik kanan → Inspect
3. **Mobile**: 
   - Chrome Android: chrome://inspect → Enable USB debugging
   - Safari iOS: Settings → Safari → Advanced → Web Inspector
   - Atau gunakan Remote Debugging dari desktop
4. Buka tab "Console"

### Step 2: Tunggu Page Load
Setelah page load, Anda harus melihat di console:
```
📱 Device type: Mobile (atau Desktop)
🔧 Building word mapping...
📄 Found X content elements
✅ Built word mapping: X words from Y elements
First 10 words: [...]
🧪 Testing highlight on first element...
✅ Highlight test complete
```

**PENTING**: Perhatikan apakah elemen pertama di artikel ter-highlight (background kuning/teal) selama 2 detik. Jika YA, berarti CSS highlight bekerja.

### Step 3: Klik "Listen to Article"
Setelah klik tombol, Anda harus melihat di console:
```
Starting from sentence 1/X
Started sentence 1/X
```

### Step 4: Perhatikan Console Saat Audio Berjalan

**DESKTOP - Jika boundary events bekerja**:
```
🔊 Boundary event: word [object]
🗣️ Speaking word: "Intermittent" (cleaned: "intermittent")
✅ Found word at index 5 (forward search)
✨ Highlighted element with word "intermittent" (6/2847)
```

**MOBILE - Jika boundary events bekerja**:
```
🔊 Boundary event: word [object]
✅ Boundary events working, stopped fallback
🗣️ Speaking word: "Intermittent"
✨ Highlighted element
```

**MOBILE - Jika menggunakan fallback**:
```
⚠️ No boundary events detected on mobile, using fallback
🔄 Starting fallback highlighting for mobile
✨ Highlighted element with word "..." (from fallback)
```

## Diagnosis Masalah

### Skenario 1: Tidak Ada Log "🔊 Boundary event"
**Masalah**: Browser tidak mendukung `onboundary` event atau event tidak fire
**Solusi**: Perlu fallback ke sentence-level highlighting

**Browser yang mendukung onboundary**:
- Chrome/Edge: ✅ (biasanya bekerja)
- Firefox: ❌ (tidak mendukung)
- Safari: ⚠️ (partial support)

### Skenario 2: Ada Log "🔊 Boundary event" tapi Tidak Ada Highlight
**Masalah**: Word tidak ditemukan di mapping atau CSS tidak diterapkan
**Cek**:
- Apakah ada log "⚠️ Word not found in mapping"?
- Apakah ada log "✨ Highlighted element"?
- Inspect element yang seharusnya ter-highlight, apakah ada class `tts-highlight`?

### Skenario 3: Test Highlight Tidak Muncul Saat Page Load
**Masalah**: CSS highlight tidak bekerja atau DOM tidak siap
**Cek**:
- Apakah file `index.css` ter-load dengan benar?
- Inspect elemen pertama artikel, apakah class `tts-highlight` ditambahkan?
- Cek di DevTools → Elements → Computed → cari background color

### Skenario 4: Word Mapping Empty (0 words)
**Masalah**: Selector `.article-content` tidak ditemukan atau tidak ada elemen
**Cek**:
- Apakah ada log "❌ Article content not found!"?
- Inspect HTML, apakah ada element dengan class `article-content`?
- Cek di ArticleDetail component apakah class name benar

## Next Steps Berdasarkan Hasil

### Jika onboundary TIDAK fire (Skenario 1)
Kita perlu implement fallback ke sentence-level highlighting yang lebih baik.

### Jika onboundary fire tapi highlight tidak muncul (Skenario 2)
Kita perlu debug word matching atau CSS application.

### Jika test highlight tidak muncul (Skenario 3)
Kita perlu fix CSS atau DOM selector.

### Jika word mapping empty (Skenario 4)
Kita perlu fix selector untuk article content.

## Informasi yang Dibutuhkan

Setelah testing, berikan informasi berikut:
1. **Browser yang digunakan**: Chrome/Firefox/Safari/Edge?
2. **Console logs**: Copy semua log yang muncul
3. **Test highlight**: Apakah elemen pertama ter-highlight saat page load?
4. **Boundary events**: Apakah ada log "🔊 Boundary event" saat audio berjalan?
5. **Screenshot**: Jika memungkinkan, screenshot console dan artikel

Dengan informasi ini, saya bisa diagnose masalah dengan tepat dan memberikan solusi yang sesuai.
