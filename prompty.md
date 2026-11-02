# Prompty AI do strony VictoryMind.ai

**Wspólne wytyczne dla wszystkich assetów:**
- Zawsze używaj białego lub przezroczystego tła, jeśli nie podano inaczej.
- Unikaj tekstu, znaków wodnych i logotypów.
- Styl: nowoczesny, minimalistyczny, inspirowany MacBook Pro/Apple.
- Eksportuj w kilku rozdzielczościach: 1× (standard), 2× (Retina), 3× (4K), oraz wersja mobilna (np. 1280×720 px dla ilustracji/wideo).
- Dla grafik: PNG (optymalizowany, PNG-8 jeśli możliwe), SVG (dla ikon), PSD/XCF (dla warstw), fallback GIF/APNG.
- Dla wideo: MP4 (H.264, bez przezroczystości), WebM (VP9 z alfa, dla przezroczystych teł), MOV (ProRes 4444, jeśli możliwe), enable two-pass encoding.
- Nazewnictwo plików: [nazwa-assetu]-[wariant]-[@2x|@3x|mobile].[format] (np. hero-loop-01@2x.webm).
- Dla SVG: dodaj descriptive <title> i metadane, eksportuj także jako React TSX jeśli możliwe.
- Dla każdego assetu podaj przykładowy alt text (np. “AI coloring-book cover: minimalistyczny MacBook z czarno-białą ilustracją”).
- Podaj seed values w metadanych pliku dla powtarzalności wariantów.

---

## 1. Tło wideo do sekcji Hero
**Do czego:** Zastąpienie obecnego tła wideo w sekcji Hero (`assets/videos/brain-ai-loop-1080p.mp4`)
**Gdzie wkleić prompt:** Pika Labs lub RunwayML
**Prompt do AI:**
"For a modern website hero section, generate a seamless loop animation of a futuristic neural network with glowing data streams and an abstract AI brain, in the style of a MacBook Pro commercial. Clean white and blue palette, soft gradients, subtle reflections on a MacBook Pro surface. No text, no logos. 16:9 aspect ratio, 1920×1080 px, 30 fps, 8 seconds, average bitrate ~5 Mbps. Export as MP4 (H.264, no alpha), WebM (VP9 with alpha), and MOV (ProRes 4444 with alpha). Enable two-pass encoding. Provide at least 3 variations (different seed values, include seeds in metadata). Export also 2× (3840×2160 px), 3× (5760×3240 px), and mobile (1280×720 px) versions. File naming: hero-loop-01@2x.webm etc. Example alt text: 'Looped animation of a neural network and AI brain in Apple style.' Specify the target folder: assets/videos/."

---



---


---

## 4. Ikona usługi – AI Development
**Do czego:** Ikona do karty usługi AI Development (`assets/images/icon-ai-development.png` lub SVG)
**Gdzie wkleić prompt:** SVG Repo AI lub Microsoft Designer (Bing Image Creator)
**Prompt do AI:**
"Generate a 512×512 px SVG (72 DPI) minimalist vector icon for AI Development in Apple system style. Use a logic block layout and a microchip motif, consistent stroke width (2 pt), no fills heavier than 30% opacity. Export also as optimized PNG-8, fallback GIF, and React TSX component. Provide 2-3 variations (include seed values). File naming: icon-ai-development-v2.svg. Example alt text: 'Apple-style icon: microchip and logic blocks.' Specify the target folder: assets/images/."

---

## 5. Ikona usługi – Machine Learning
**Do czego:** Ikona do karty usługi Machine Learning (`assets/images/icon-machine-learning.png` lub SVG)
**Gdzie wkleić prompt:** SVG Repo AI lub Microsoft Designer (Bing Image Creator)
**Prompt do AI:**
"Generate a 512×512 px SVG (72 DPI) minimalist vector icon for Machine Learning in Apple system style. Use a neural network diagram and a chart symbol, consistent stroke width (2 pt), no fills heavier than 30% opacity. Export also as optimized PNG-8, fallback GIF, and React TSX component. Provide 2-3 variations (include seed values). File naming: icon-machine-learning-v2.svg. Example alt text: 'Apple-style icon: neural network and chart.' Specify the target folder: assets/images/."

---

## 6. Ikona usługi – Automation
**Do czego:** Ikona do karty usługi Automation (`assets/images/icon-automation.png` lub SVG)
**Gdzie wkleić prompt:** SVG Repo AI lub Microsoft Designer (Bing Image Creator)
**Prompt do AI:**
"Generate a 512×512 px SVG (72 DPI) minimalist vector icon for Automation in Apple system style. Use a gear and a data flow path motif, consistent stroke width (2 pt), no fills heavier than 30% opacity. Export also as optimized PNG-8, fallback GIF, and React TSX component. Provide 2-3 variations (include seed values). File naming: icon-automation-v2.svg. Example alt text: 'Apple-style icon: gear and data flow.' Specify the target folder: assets/images/."

---

## 7. Portret AI do sekcji O mnie
**Do czego:** Zdjęcie profilowe do sekcji O mnie (`assets/images/profile-ai.png`)
**Gdzie wkleić prompt:** Leonardo.Ai lub Microsoft Designer (Bing Image Creator)
**Prompt do AI:**
"Generate a 1:1 portrait of a 30-year-old male data scientist of European descent, business-casual, neutral expression, soft lighting with slight bokeh, white background. Apple keynote style, 1024×1024 px, transparent PNG, high-poly detail. Export also 2×, 3×, and mobile versions. Provide 2-3 variations (include seed values). File naming: profile-ai-01@2x.png. Example alt text: 'AI-generated portrait: young male data scientist, Apple keynote style.' Specify the target folder: assets/images/."

---

## 8. Ilustracja do bloga/sekcji AI w biznesie
**Do czego:** Ilustracja do wpisu blogowego lub sekcji o AI w biznesie (`assets/images/`)
**Gdzie wkleić prompt:** Microsoft Designer (Bing Image Creator) lub Leonardo.Ai
**Prompt do AI:**
"For a business blog header, create a flat illustration: side-view futuristic office with 2 employees interacting with hologram charts and digital dashboards. Glowing data streams, minimal Apple style. White background, 16:9, 1920×1080 px. Export as SVG (with descriptive <title>), PNG (optimized), and fallback GIF. Provide 2-3 variations (include seed values). Export also 2×, 3×, and mobile versions. File naming: blog-ai-business-01@2x.svg. Example alt text: 'Futuristic office illustration: employees with hologram charts.' Specify the target folder: assets/images/."

---

## 9. Animacja – przepływ danych
**Do czego:** Animacja do sekcji interaktywnej/feature (`assets/videos/`)
**Gdzie wkleić prompt:** Pika Labs lub RunwayML
**Prompt do AI:**
"Generate a 6-second seamless loop of data flowing through a neural-net graph: nodes pulsing sequentially, connections lighting up in waves. White background, 16:9, 1920×1080 px, 30 fps, smooth 1.5 s pulse cycle. Export as MP4 (H.264, no alpha), WebM (VP9 with alpha), and MOV (ProRes 4444 with alpha). Enable two-pass encoding. Provide 3 variants (different seeds, include seeds in metadata). Export also 2×, 3×, and mobile versions. File naming: dataflow-loop-01@2x.webm. Example alt text: 'Looped animation: data flowing through neural network graph.' Specify the target folder: assets/videos/."

---

**Wygenerowane pliki wklej do odpowiednich folderów i zaktualizuj HTML strony.**
