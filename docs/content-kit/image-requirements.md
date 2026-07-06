# 圖片需求與路徑

這份文件定義文章圖片、分享圖和檔案命名方式。所有圖片都要放在 `yumitw.github.io/images/` 底下,不要放在文章資料夾裡。

## 文章圖片路徑

每篇文章建立一個同名資料夾:

```text
yumitw.github.io/images/articles/<article-slug>/
```

範例:

```text
yumitw.github.io/images/articles/cat-personality-types-guide/
```

## 每篇文章建議圖片

| 檔名 | 尺寸 | 用途 | 是否必備 |
|---|---:|---|---|
| `og.png` | 1200 x 630 | LINE / Facebook / 社群分享圖 | 必備 |
| `cover.png` | 1200 x 675 或 1600 x 900 | 文章首圖 | 建議 |
| `inline-01.png` | 1200 x 800 | 文章中段插圖 | 可選 |
| `thumb.png` | 600 x 315 | 未來文章列表縮圖 | 可選 |

目前網站還沒有在每頁加入 `og:image`;新增文章時建議同步補上:

```html
<meta property="og:image" content="https://DOMAIN_PLACEHOLDER/images/articles/<article-slug>/og.png">
```

如果文章頁有首圖,建議放在 H1 或前言後:

```html
<figure class="article-figure">
  <img src="/images/articles/<article-slug>/cover.png" alt="描述這張圖的實際內容">
  <figcaption>一句短短的圖片說明。</figcaption>
</figure>
```

如果 CSS 還沒有 `article-figure`,可以先不放 `<figure>`;等版面要加圖片時再補樣式。

## 圖片風格

建議維持:

- 溫暖、明亮、台灣日常感
- 可愛但不要幼稚
- 插圖或原創生成圖優先
- 不使用版權不明的網路圖片
- 不使用知名角色、品牌 logo、藝人照片
- 不要讓圖片上塞太多文字,避免手機分享時看不清楚

## alt 文案規則

alt 要描述圖片本身,不是塞關鍵字。

好:

```html
alt="橘貓、黑貓和布偶貓坐在桌邊,像在討論不同人格類型"
```

不好:

```html
alt="貓咪心理測驗 貓咪人格 貓咪測驗 免費心理測驗"
```

## 圖片提示詞範本

### 貓咪文章 OG 圖

```text
暖色系原創插圖,12 種不同性格的貓咪圍在一張桌邊,有橘貓、黑貓、三花貓、布偶貓和暹羅貓,畫面像台灣生活風格的心理測驗網站分享圖,乾淨背景,明亮柔和,可愛但不幼稚,留出上方空間放標題,1200x630
```

### 狗狗文章 OG 圖

```text
明亮溫暖的原創插圖,10 種狗狗人格站在公園入口,有柴犬、哈士奇、黃金獵犬、柯基、貴賓犬和法鬥,每隻狗表情和姿態都不同,像心理測驗結果分享圖,台灣日常感,乾淨構圖,留出標題空間,1200x630
```

### 貓狗比較文章 OG 圖

```text
原創插圖,一邊是悠閒坐著的貓咪群,另一邊是準備出門的狗狗群,中間有心理測驗風格的小問號和選項卡片,溫暖明亮,乾淨背景,適合網站文章分享圖,1200x630
```

## 圖片壓縮建議

- `og.png`: 盡量控制在 500 KB 以內
- `cover.png`: 盡量控制在 700 KB 以內
- 大量插圖可改用 `.jpg` 或 `.webp`,但目前範本先用 `.png` 方便管理
- 檔名全部用小寫英文與連字號,不要用空格或中文檔名

## 結果頁分享圖路徑

貓咪 / 狗狗結果頁的 OG 圖不要放在文章資料夾,建議放:

```text
yumitw.github.io/images/results/<result-slug>-og.png
```

範例:

```text
yumitw.github.io/images/results/orange-cat-og.png
yumitw.github.io/images/results/shiba-inu-og.png
```
