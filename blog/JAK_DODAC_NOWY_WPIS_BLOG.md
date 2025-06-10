# Instrukcja: Dodawanie nowego wpisu na blogu VictoryMind.ai

Aby dodać nowy wpis na blogu i zapewnić, że pojawi się on poprawnie na stronie głównej bloga (`blog/index.html`), postępuj zgodnie z poniższymi krokami:

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

## 5. (Opcjonalnie) Dodaj wpis do RSS

Jeśli chcesz, aby wpis pojawił się w RSS, dodaj odpowiedni wpis do pliku `blog/rss.xml`.

---

**Wskazówki:**
- Nie usuwaj ani nie zmieniaj istniejących wpisów w sekcji `<div class="blog-grid-all">`, jeśli nie chcesz ich ukryć.
- Zachowaj spójność formatowania i kolejności (najnowsze wpisy na górze).
- Jeśli wpis ma być wyróżniony, zaktualizuj sekcję z klasą `blog-card--featured`.

---

W razie wątpliwości zajrzyj do istniejących wpisów lub skontaktuj się z administratorem strony.
