# 毛毛心理測驗所內容製作包

最後更新: 2026-07-06

這個資料夾是給站長之後自行新增「貓咪 / 狗狗心理測驗文章」時使用的備忘包。目標是讓文章、圖片、SEO、sitemap、站內連結都放在固定位置,避免下次忘記應該補哪些內容。

## 目前狀態

- 正式站台資料夾: `yumitw.github.io/`
- 文章放置路徑: `yumitw.github.io/articles/<article-slug>/index.html`
- 文章圖片建議路徑: `yumitw.github.io/images/articles/<article-slug>/`
- 現有文章: `articles/how-quiz-scoring-works/index.html`
- 送 AdSense 前建議文章量: 至少 6 篇原創文章
- 目前圖片狀態: `images/` 內尚未放正式文章圖或 OG 分享圖

## 已建立文章

目前已有 6 篇文章:

1. `articles/how-quiz-scoring-works/index.html`
2. `articles/cat-personality-types-guide/index.html`
3. `articles/dog-personality-types-guide/index.html`
4. `articles/cat-dog-personality-difference/index.html`
5. `articles/cat-quiz-friend-pairing/index.html`
6. `articles/dog-social-style-guide/index.html`

圖片目前先建立製作備忘,正式圖檔尚未產生。圖片備忘放在:

```text
images/articles/<article-slug>/README.md
```

## 每新增一篇文章要改哪些地方

1. 建立文章頁:
   - `articles/<article-slug>/index.html`
2. 放文章圖片:
   - `images/articles/<article-slug>/og.png`
   - `images/articles/<article-slug>/cover.png`
   - `images/articles/<article-slug>/inline-01.png` 可選
3. 更新文章列表:
   - `articles/index.html`
4. 視需要更新首頁最新文章:
   - `index.html`
5. 更新 sitemap:
   - `sitemap.xml`
6. 檢查站內連結:
   - 文章內至少連到一個測驗頁,例如 `/quizzes/cat-personality/` 或 `/quizzes/dog-personality/`

## 不要放文章內容的地方

- 不要放在 `quizzes/*/play/`
- 不要放在 `js/`
- 不要只寫進 JSON 資料檔
- 不要把正式文章只放在 `docs/`,因為 `docs/` 是工作文件,不是公開網站內容

## 這個資料夾裡的文件

- `article-requirements.md`: 每篇文章必備欄位、內容長度、SEO、內部連結與送審檢查
- `image-requirements.md`: 文章圖、OG 圖、檔名、尺寸、alt 文案與圖片提示詞
- `article-roadmap.md`: 建議先做的貓咪 / 狗狗文章清單,含標題、路徑、章節和圖片提示
- `templates/article-page.html`: 可複製成正式文章頁的 HTML 範本
- `templates/article-brief.md`: 寫作前可填的文章企劃表

## 建議工作順序

1. 先從 `article-roadmap.md` 選 5 篇補齊到至少 6 篇文章。
2. 每篇先填 `templates/article-brief.md`,確認標題、slug、段落和圖片需求。
3. 複製 `templates/article-page.html` 到 `articles/<slug>/index.html`。
4. 把文章圖片放進 `images/articles/<slug>/`。
5. 更新 `articles/index.html` 和 `sitemap.xml`。
6. 最後再做一次手機瀏覽與站內連結檢查。
