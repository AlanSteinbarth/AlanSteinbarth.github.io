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
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          }
          h1 {
            color: #2c3e50;
            border-bottom: 3px solid #6366f1;
            padding-bottom: 10px;
            margin-bottom: 30px;
          }
          .rss-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 4px solid #6366f1;
          }
          .rss-description {
            font-size: 1.1em;
            color: #555;
            margin-bottom: 15px;
          }
          .rss-meta {
            font-size: 0.9em;
            color: #666;
          }
          .rss-meta strong {
            color: #2c3e50;
          }
          .subscribe-box {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            text-align: center;
          }
          .subscribe-box h3 {
            margin-top: 0;
            color: white;
          }
          .rss-url {
            background: rgba(255,255,255,0.2);
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            word-break: break-all;
            margin: 10px 0;
          }
          .copy-btn {
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
          }
          .copy-btn:hover {
            background: rgba(255,255,255,0.3);
          }
          .post {
            border-bottom: 1px solid #eee;
            padding: 25px 0;
            margin-bottom: 25px;
          }
          .post:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          .post-title {
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 1.3em;
          }
          .post-title a {
            text-decoration: none;
            color: inherit;
            transition: color 0.3s;
          }
          .post-title a:hover {
            color: #6366f1;
          }
          .post-meta {
            font-size: 0.9em;
            color: #666;
            margin-bottom: 15px;
          }
          .post-category {
            display: inline-block;
            background: #6366f1;
            color: white;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 0.8em;
            margin-right: 5px;
          }
          .post-description {
            color: #555;
            line-height: 1.6;
          }
          .back-link {
            display: inline-block;
            background: #6366f1;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 30px;
            font-weight: 600;
            transition: background 0.3s;
          }
          .back-link:hover {
            background: #5855eb;
          }
          .icon {
            font-size: 1.2em;
            margin-right: 8px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <h1>
            <span class="icon">📡</span>
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
            <h3>🔔 Subskrybuj RSS Feed</h3>
            <p>Skopiuj poniższy URL do swojego czytnika RSS (Feedly, Inoreader, Apple News, itp.):</p>
            <div class="rss-url" id="rssUrl">https://victorymind.ai/blog/rss.xml</div>
            <button class="copy-btn" onclick="copyRSSUrl()">📋 Skopiuj URL</button>
          </div>
          
          <!-- Posts -->
          <h2>📝 Najnowsze wpisy</h2>
          <xsl:for-each select="rss/channel/item">
            <div class="post">
              <h3 class="post-title">
                <a href="{link}" target="_blank">
                  <xsl:value-of select="title"/>
                </a>
              </h3>
              
              <div class="post-meta">
                <span class="icon">📅</span>
                <xsl:value-of select="pubDate"/>
                <xsl:if test="category">
                  | 
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
            ← Powrót do VictoryMind.ai
          </a>
        </div>
        
        <script>
          function copyRSSUrl() {
            const rssUrl = document.getElementById('rssUrl').textContent;
            navigator.clipboard.writeText(rssUrl).then(function() {
              const btn = document.querySelector('.copy-btn');
              const originalText = btn.textContent;
              btn.textContent = '✅ Skopiowano!';
              setTimeout(() => {
                btn.textContent = originalText;
              }, 2000);
            }).catch(function() {
              // Fallback dla starszych przeglądarek
              const textArea = document.createElement('textarea');
              textArea.value = rssUrl;
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand('copy');
              document.body.removeChild(textArea);
              
              const btn = document.querySelector('.copy-btn');
              const originalText = btn.textContent;
              btn.textContent = '✅ Skopiowano!';
              setTimeout(() => {
                btn.textContent = originalText;
              }, 2000);
            });
          }
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
