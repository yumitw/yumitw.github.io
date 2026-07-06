# 文章內容需求

這份文件定義每一篇「貓咪 / 狗狗心理測驗文章」需要準備的完整內容。文章頁的目的不是單純放測驗連結,而是讓 Google 能索引到有價值的原創內容,也讓讀者在作答前後有東西可以讀。

## 檔案位置

每篇文章都放在:

```text
yumitw.github.io/articles/<article-slug>/index.html
```

例如:

```text
yumitw.github.io/articles/cat-personality-types-guide/index.html
```

圖片放在:

```text
yumitw.github.io/images/articles/<article-slug>/
```

例如:

```text
yumitw.github.io/images/articles/cat-personality-types-guide/og.png
yumitw.github.io/images/articles/cat-personality-types-guide/cover.png
```

## 每篇文章必備欄位

| 項目 | 說明 | 範例 |
|---|---|---|
| `slug` | 英文小寫、用連字號 | `cat-personality-types-guide` |
| HTML title | 30-55 字左右,包含主題與站名 | `12 種貓咪人格完整解析|毛毛心理測驗所` |
| meta description | 80-120 個中文字左右,說清楚文章價值 | `從橘貓、黑貓到緬因貓,整理 12 種貓咪人格的性格亮點、相處方式與測驗結果。` |
| canonical | 正式網址,上線前可先用 `DOMAIN_PLACEHOLDER` | `https://DOMAIN_PLACEHOLDER/articles/cat-personality-types-guide/` |
| og:title | 分享時顯示的標題 | `12 種貓咪人格完整解析` |
| og:description | 分享時顯示的摘要 | `看懂你的貓咪人格,也看懂朋友為什麼跟你不一樣。` |
| og:image | 分享圖路徑 | `https://DOMAIN_PLACEHOLDER/images/articles/cat-personality-types-guide/og.png` |
| H1 | 頁面主標題,不要和 title 差太多 | `12 種貓咪人格完整解析` |
| 前言 | 2-3 段,說明讀者為什麼要看 | 介紹文章用途與測驗關聯 |
| 內文段落 | 4-6 個小標,每段有具體內容 | 人格解析、相處方式、測驗設計 |
| 站內連結 | 至少 2 個 | 測驗頁、結果頁、相關文章 |
| CTA | 文章末尾引導作答或分享 | `看完之後,可以去測你是哪種貓咪。` |

## 建議文章長度

- 最低建議: 900 個中文字以上
- 較佳長度: 1200-1800 個中文字
- 避免: 只有測驗按鈕、只有圖片、只有很短的列表

AdSense 送審時,內容太薄容易被判定為內容價值不足。每篇文章都要有完整觀點,不要只是把測驗結果名稱換句話說。

## 文章結構建議

```text
H1: 文章主題

前言:
- 讀者會遇到的情境
- 這篇文章會解答什麼
- 和站上哪個測驗有關

H2: 主題一
H2: 主題二
H2: 主題三
H2: 主題四

延伸閱讀:
- 測驗頁
- 相關文章
- 相關結果頁

結尾 CTA:
- 去測驗
- 分享給朋友
```

## 站內連結規則

每篇文章至少放:

- 1 個測驗入口:
  - `/quizzes/cat-personality/`
  - `/quizzes/dog-personality/`
- 1 個相關文章或結果頁:
  - `/articles/how-quiz-scoring-works/`
  - `/results/orange-cat/`

等其他結果頁補齊後,可以多連到對應結果頁。

## 廣告位置原則

正式文章頁可以保留:

```html
<div class="ad-slot"><!-- 通過 AdSense 審查後,在此放置一個廣告單元 --></div>
```

建議位置:

- 第二段或第一個大段落之後
- 文章中段
- 延伸閱讀前

不要放:

- 按鈕正上方或正下方
- 答題頁 `play/`
- 載入畫面、錯誤畫面、只有互動沒有內容的畫面

## 每篇文章上線前檢查

- [ ] 文章放在 `articles/<slug>/index.html`
- [ ] title / description / canonical / og:url 都有
- [ ] 有 `og:image`,且圖片檔案存在
- [ ] 內文至少 900 個中文字
- [ ] 至少 2 個站內連結
- [ ] 有明確 CTA
- [ ] `articles/index.html` 已加入這篇
- [ ] `sitemap.xml` 已加入這篇
- [ ] 手機寬度檢查沒有文字重疊
- [ ] 圖片 alt 文案不是空的
