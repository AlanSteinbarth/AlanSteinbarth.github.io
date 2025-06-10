# Instrukcja: Dodawanie nowego wpisu na blogu VictoryMind.ai

Aby dodać nowy wpis na blogu i zapewnić, że pojawi się on poprawnie na stronie głównej bloga (`blog/index.html`) oraz w kanale RSS (`blog/rss.xml`), postępuj zgodnie z poniższymi krokami:

---

## 1. Skopiuj szablon wpisu

W katalogu `blog/` znajduje się plik `post-template.html` lub `szablon-wpisu.html`. Skopiuj ten plik i nadaj mu nazwę zgodną ze schematem:

```
2025-MM-tytul-twojego-wpisu.html
```
Przykład:
```
2025-07-jak-wdrozyc-ai-w-firmie.html
```

---

## 2. Uzupełnij treść wpisu

- Uzupełnij **tytuł** (`<title>...</title>`) oraz **meta description** (`<meta name="description" ...>`).
- Dodaj datę publikacji w formacie ISO w sekcji `<script type="application/ld+json">` jako `"datePublished"`.
- Wstaw treść artykułu w odpowiednie miejsce w pliku.
- Zadbaj o spójne formatowanie (nagłówki, akapity, listy, pogrubienia) – używaj wyłącznie znaczników HTML, nie Markdown.

---

## 3. Dodaj wpis do listy na stronie głównej bloga

Otwórz plik `blog/index.html` i znajdź sekcję:

```
<div class="blog-grid-all">
    ...
</div>
```

Skopiuj jedną z istniejących kart wpisu (fragment `<article class="blog-card fade-in">...</article>`) i wklej ją w odpowiednie miejsce (najlepiej na górze, jeśli to najnowszy wpis).

Uzupełnij:
- **Kategoria** (np. "Biznes AI", "Edukacja AI", "Kariera" itp.)
- **Data** (zgodna z datą publikacji wpisu)
- **Tytuł** i link (`<a href="2025-MM-tytul-twojego-wpisu.html">Tytuł wpisu</a>`)
- **Krótki opis** (z meta description lub własny skrót)

Przykład:
```
<article class="blog-card fade-in">
    <div class="blog-card-content">
        <div class="blog-meta">
            <span class="blog-category">Biznes AI</span>
            <time class="blog-date" datetime="2025-07-01">1 lipca 2025</time>
        </div>
        <h3 class="blog-title">
            <a href="2025-07-jak-wdrozyc-ai-w-firmie.html">Jak wdrożyć AI w firmie?</a>
        </h3>
        <p class="blog-excerpt">
            Praktyczny przewodnik krok po kroku jak wdrożyć sztuczną inteligencję w małej i średniej firmie.
        </p>
        <a href="2025-07-jak-wdrozyc-ai-w-firmie.html" class="blog-read-more">
            Czytaj więcej <span>→</span>
        </a>
    </div>
</article>
```

---

## 4. Zapisz pliki i przetestuj

- Zapisz zmiany w obu plikach.
- Odśwież stronę bloga, aby upewnić się, że nowy wpis pojawia się poprawnie.

---

## 5. Dodaj wpis do RSS

Aby wpis pojawił się w kanale RSS (`blog/rss.xml`):

1. Otwórz plik `blog/rss.xml`.
2. Skopiuj i wklej jeden z istniejących bloków `<item>...</item>` w odpowiednie miejsce (na górze, jeśli to najnowszy wpis).
3. Uzupełnij:
   - `<title>` – tytuł wpisu
   - `<link>` – pełny URL do wpisu (np. `https://victorymind.ai/blog/2025-07-jak-wdrozyc-ai-w-firmie.html`)
   - `<guid>` – identyczny jak link
   - `<pubDate>` – data publikacji w formacie RFC 2822 (np. `Tue, 01 Jul 2025 10:00:00 +0200`)
   - `<description>` – krótki opis (może być taki jak meta description)
   - `<author>` – imię i nazwisko autora

Przykład:
```
<item>
  <title>Jak wdrożyć AI w firmie?</title>
  <link>https://victorymind.ai/blog/2025-07-jak-wdrozyc-ai-w-firmie.html</link>
  <guid>https://victorymind.ai/blog/2025-07-jak-wdrozyc-ai-w-firmie.html</guid>
  <pubDate>Tue, 01 Jul 2025 10:00:00 +0200</pubDate>
  <description>Praktyczny przewodnik krok po kroku jak wdrożyć sztuczną inteligencję w małej i średniej firmie.</description>
  <author>Alan Steinbarth</author>
</item>
```

**Zasady RSS:**
- Najnowsze wpisy wstawiaj na górze listy `<item>`.
- Nie usuwaj istniejących wpisów, jeśli nie chcesz ich ukryć.
- Zadbaj o poprawny format daty i unikalność linków.
- Po każdej edycji sprawdź, czy plik `rss.xml` jest poprawny (możesz użyć walidatora RSS online).
- Jeśli chcesz, aby RSS był stylizowany w przeglądarce, upewnij się, że w pliku `rss.xml` na początku znajduje się linia:
  ```xml
  <?xml-stylesheet type="text/xsl" href="rss.xsl"?>
  ```
  oraz plik `rss.xsl` jest dostępny w katalogu `blog/`.
- Jeśli RSS nie wyświetla się stylizowany (biała strona), sprawdź czy serwer zwraca poprawny Content-Type dla pliku XSL (`text/xsl`).
- RSS zawsze będzie działał w czytnikach, nawet bez stylizacji XSL.

---

**Wskazówki:**
- Nie usuwaj ani nie zmieniaj istniejących wpisów w sekcji `<div class="blog-grid-all">`, jeśli nie chcesz ich ukryć.
- Zachowaj spójność formatowania i kolejności (najnowsze wpisy na górze).
- Jeśli wpis ma być wyróżniony, zaktualizuj sekcję z klasą `blog-card--featured`.
- W razie wątpliwości zajrzyj do istniejących wpisów lub skontaktuj się z administratorem strony.
