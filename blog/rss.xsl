<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  
  <xsl:template match="/">
    <html lang="pl">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title><xsl:value-of select="rss/channel/title"/> - RSS Feed</title>
        <style>
          :root {
            /* Apple-inspired Color System */
            --color-bg-primary: #000000;
            --color-bg-secondary: #111111;
            --color-bg-tertiary: #1C1C1E;
            --color-text-primary: #FFFFFF;
            --color-text-secondary: #A1A1A1;
            --color-text-tertiary: #6B7280;
            --color-accent-blue: #007AFF;
            --color-accent-purple: #5856D6;
            --color-success: #30D158;
            
            /* Spacing System */
            --space-xs: 8px;
            --space-sm: 16px;
            --space-md: 24px;
            --space-lg: 32px;
            --space-xl: 48px;
            --space-2xl: 64px;
            
            /* Typography */
            --font-size-body: 1.125rem;
            --font-size-h2: 2.5rem;
            --font-size-h3: 1.5rem;
            
            /* Radius */
            --radius-sm: 8px;
            --radius-md: 12px;
            --radius-lg: 16px;
            --radius-xl: 24px;
            --radius-full: 50px;
            
            /* Shadows */
            --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
            --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.3);
            --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.4);
            
            /* Transitions */
            --transition-fast: 0.2s ease;
            --transition-base: 0.3s ease;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif;
            line-height: 1.6;
            color: var(--color-text-primary);
            background: var(--color-bg-primary);
            margin: 0;
            padding: var(--space-md);
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
          }
          
          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 30%, rgba(0, 122, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(88, 86, 214, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 60% 20%, rgba(0, 212, 255, 0.05) 0%, transparent 50%);
            z-index: -1;
            pointer-events: none;
          }
          .container {
            max-width: 900px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: var(--radius-xl);
            padding: var(--space-2xl);
            box-shadow: var(--shadow-lg);
            position: relative;
          }
          
          .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple));
            border-radius: var(--radius-xl) var(--radius-xl) 0 0;
          }
          h1 {
            font-size: clamp(2rem, 5vw, var(--font-size-h2));
            font-weight: 700;
            color: var(--color-text-primary);
            margin-bottom: var(--space-xl);
            text-align: center;
            background: linear-gradient(135deg, var(--color-accent-blue) 0%, var(--color-accent-purple) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .rss-info {
            background: var(--color-bg-secondary);
            padding: var(--space-xl);
            border-radius: var(--radius-lg);
            margin-bottom: var(--space-xl);
            border: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
          }
          
          .rss-info::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-purple));
            border-radius: var(--radius-sm);
          }
          .rss-description {
            font-size: 1.1em;
            color: var(--color-text-secondary);
            margin-bottom: var(--space-md);
            line-height: 1.6;
          }
          
          .rss-meta {
            font-size: 0.9em;
            color: var(--color-text-tertiary);
          }
          
          .rss-meta strong {
            color: var(--color-text-primary);
            font-weight: 600;
          }
          .subscribe-box {
            background: linear-gradient(135deg, var(--color-accent-blue) 0%, var(--color-accent-purple) 100%);
            color: white;
            padding: var(--space-xl);
            border-radius: var(--radius-lg);
            margin-bottom: var(--space-xl);
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: var(--shadow-md);
          }
          
          .subscribe-box h3 {
            margin-top: 0;
            color: white;
            font-size: var(--font-size-h3);
            font-weight: 600;
          }
          .rss-url {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: var(--space-md);
            border-radius: var(--radius-md);
            font-family: 'SF Mono', Monaco, Consolas, monospace;
            word-break: break-all;
            margin: var(--space-md) 0;
            border: 1px solid rgba(255, 255, 255, 0.3);
            font-size: 0.9em;
          }
          
          .copy-btn {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: var(--space-sm) var(--space-lg);
            border-radius: var(--radius-full);
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: var(--transition-base);
            display: inline-flex;
            align-items: center;
            gap: var(--space-xs);
          }
          
          .copy-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: var(--shadow-sm);
          }
          .post {
            background: var(--color-bg-secondary);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: var(--radius-lg);
            padding: var(--space-xl);
            margin-bottom: var(--space-lg);
            transition: var(--transition-base);
            position: relative;
          }
          
          .post:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
            border-color: rgba(255, 255, 255, 0.2);
          }
          
          .post:last-child {
            margin-bottom: 0;
          }
          .post-title {
            color: var(--color-text-primary);
            margin-bottom: var(--space-sm);
            font-size: 1.25em;
            font-weight: 600;
            line-height: 1.4;
          }
          
          .post-title a {
            text-decoration: none;
            color: inherit;
            transition: var(--transition-fast);
          }
          
          .post-title a:hover {
            color: var(--color-accent-blue);
          }
          .post-meta {
            font-size: 0.9em;
            color: var(--color-text-tertiary);
            margin-bottom: var(--space-md);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            flex-wrap: wrap;
          }
          
          .post-category {
            display: inline-block;
            background: linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-purple));
            color: white;
            padding: 4px 12px;
            border-radius: var(--radius-full);
            font-size: 0.8em;
            font-weight: 500;
          }
          .post-description {
            color: var(--color-text-secondary);
            line-height: 1.6;
          }
          
          .back-link {
            display: inline-flex;
            align-items: center;
            gap: var(--space-xs);
            background: linear-gradient(135deg, var(--color-accent-blue) 0%, var(--color-accent-purple) 100%);
            color: white;
            padding: var(--space-md) var(--space-xl);
            text-decoration: none;
            border-radius: var(--radius-full);
            margin-top: var(--space-xl);
            font-weight: 600;
            transition: var(--transition-base);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: var(--shadow-sm);
          }
          
          .back-link:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
          }
          
          .icon {
            font-size: 1.2em;
          }
          
          h2 {
            color: var(--color-text-primary);
            font-size: var(--font-size-h3);
            font-weight: 600;
            margin: var(--space-xl) 0 var(--space-lg);
          }
          
          /* Responsive Design */
          @media (max-width: 768px) {
            body {
              padding: var(--space-sm);
            }
            
            .container {
              padding: var(--space-lg);
            }
            
            h1 {
              font-size: clamp(1.5rem, 5vw, 2rem);
            }
            
            .rss-info,
            .subscribe-box {
              padding: var(--space-lg);
            }
            
            .post {
              padding: var(--space-lg);
            }
            
            .post-meta {
              flex-direction: column;
              align-items: flex-start;
              gap: var(--space-xs);
            }
            
            .rss-url {
              font-size: 0.8em;
              padding: var(--space-sm);
            }
            
            .copy-btn {
              width: 100%;
              justify-content: center;
            }
          }
          
          @media (max-width: 480px) {
            h1 {
              font-size: 1.5rem;
            }
            
            .container {
              margin: var(--space-xs);
              padding: var(--space-md);
            }
            
            .subscribe-box {
              padding: var(--space-md);
            }
            
            .post {
              padding: var(--space-md);
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <h1>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style="display: inline-block; margin-right: 12px; vertical-align: middle;">
              <path d="M4 11a9 9 0 0 1 9 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4 4a16 16 0 0 1 16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="5" cy="19" r="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <xsl:value-of select="rss/channel/title"/>
          </h1>
          
          <!-- RSS Info -->
          <div class="rss-info">
            <div class="rss-description">
              <xsl:value-of select="rss/channel/description"/>
            </div>
            <div class="rss-meta">
              <strong>Język:</strong> <xsl:value-of select="rss/channel/language"/> |
              <strong>Ostatnia aktualizacja:</strong> <xsl:value-of select="rss/channel/lastBuildDate"/> |
              <strong>Liczba wpisów:</strong> <xsl:value-of select="count(rss/channel/item)"/>
            </div>
          </div>
          
          <!-- Subscribe Box -->
          <div class="subscribe-box">
            <h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="display: inline-block; margin-right: 8px; vertical-align: middle;">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="2" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Subskrybuj RSS Feed
            </h3>
            <p>Skopiuj poniższy URL do swojego czytnika RSS (Feedly, Inoreader, Apple News, itp.):</p>
            <div class="rss-url" id="rssUrl">https://victorymind.ai/blog/rss.xml</div>
            <button class="copy-btn" onclick="copyRSSUrl()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2"/>
              </svg>
              Skopiuj URL
            </button>
          </div>
          
          <!-- Posts -->
          <h2>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="display: inline-block; margin-right: 8px; vertical-align: middle;">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" fill="none"/>
              <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" fill="none"/>
              <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2"/>
              <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2"/>
              <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2"/>
            </svg>
            Najnowsze wpisy
          </h2>
          <xsl:for-each select="rss/channel/item">
            <div class="post">
              <h3 class="post-title">
                <a href="{link}" target="_blank">
                  <xsl:value-of select="title"/>
                </a>
              </h3>
              
              <div class="post-meta">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="display: inline-block; margin-right: 4px;">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                </svg>
                <xsl:value-of select="pubDate"/>
                <xsl:if test="category">
                  <xsl:for-each select="category">
                    <span class="post-category">
                      <xsl:value-of select="."/>
                    </span>
                  </xsl:for-each>
                </xsl:if>
              </div>
              
              <div class="post-description">
                <xsl:value-of select="description" disable-output-escaping="yes"/>
              </div>
            </div>
          </xsl:for-each>
          
          <!-- Back Link -->
          <a href="https://victorymind.ai/" class="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5" stroke="currentColor" stroke-width="2"/>
              <path d="M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2"/>
            </svg>
            Powrót do VictoryMind.ai
          </a>
        </div>
        
        <script>
          function copyRSSUrl() {
            const rssUrl = document.getElementById('rssUrl').textContent;
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
              // Modern Clipboard API
              navigator.clipboard.writeText(rssUrl).then(function() {
                showCopySuccess();
              }).catch(function() {
                fallbackCopy(rssUrl);
              });
            } else {
              // Fallback for older browsers
              fallbackCopy(rssUrl);
            }
          }
          
          function fallbackCopy(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
              document.execCommand('copy');
              showCopySuccess();
            } catch (err) {
              console.error('Błąd kopiowania:', err);
            }
            
            document.body.removeChild(textArea);
          }
          
          function showCopySuccess() {
            const btn = document.querySelector('.copy-btn');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Skopiowano!
            `;
            
            btn.style.background = 'rgba(48, 209, 88, 0.2)';
            btn.style.color = '#30D158';
            
            setTimeout(() => {
              btn.innerHTML = originalHTML;
              btn.style.background = '';
              btn.style.color = '';
            }, 2000);
          }
          
          // Add smooth scroll behavior
          document.addEventListener('DOMContentLoaded', function() {
            // Add fade-in animation for posts
            const posts = document.querySelectorAll('.post');
            posts.forEach((post, index) => {
              post.style.opacity = '0';
              post.style.transform = 'translateY(20px)';
              post.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              
              setTimeout(() => {
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
              }, index * 100);
            });
          });
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
