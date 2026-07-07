# 圖片製作總清單(給站長)

最後更新:2026-07-07

全站頁面的 `og:image`(社群分享縮圖)、favicon 圖示、manifest 圖示都已在 HTML 裡接好路徑。
**你只要把圖片產生後,依下表路徑放進資料夾;若是新增專屬圖,再把完成的 slug 告訴我,我會幫你切換 HTML。**

目前完成:

- 核心/預設分享圖: `images/og-default.png`、`images/og/home-og.png`、`images/og/articles-og.png`、`images/quizzes/cat-personality-og.png`、`images/quizzes/dog-personality-og.png`
- 貓咪結果頁分享圖 12 張: `images/results/<cat-slug>-og.png`,已接到各自結果頁的 `og:image` / Twitter image / JSON-LD image
- **iOS / Android icon 3 張**(2026-07-07 我直接用 favicon.svg 的向量路徑重繪產生,你不用再做):`images/icons/apple-touch-icon.png`、`images/icons/icon-192.png`、`images/icons/icon-512.png`

尚未完成:

- 狗狗結果頁分享圖 10 張: `images/results/<dog-slug>-og.png`
- 文章分享圖 6 張: `images/articles/<article-slug>/og.png`

- 全部用 **PNG**、**RGB**、去背或滿版皆可(社群縮圖建議滿版不要透明)。
- 分享圖統一 **1200 × 630**;主要文字/主體集中在中間,四周留 5% 安全邊,避免被裁切。
- 風格統一:暖色奶茶色系(底 `#F6EEE3`、奶茶 `#C9A87C`、蜜橘 `#E8A87C`、可可字 `#6B5138`),原創手繪插畫感、可愛但不幼稚。
- 產完 Tier 1 以後的專屬圖,**跟我說做了哪些 slug,我會把該頁的 `og:image` 從預設圖切換成專屬圖**(改一行,你不用動)。

---

## Tier 0 — 已全部完成 ✅

| 路徑 | 尺寸 | 用途 |
|---|---|---|
| `images/og-default.png` | 1200 × 630 | 全站預設分享縮圖 |
| `images/icons/apple-touch-icon.png` | 180 × 180 | iPhone 加到主畫面的圖示 |
| `images/icons/icon-192.png` | 192 × 192 | PWA / Android 圖示 |
| `images/icons/icon-512.png` | 512 × 512 | PWA / Android 大圖示 |

三個 icon 是我直接把 `favicon.svg` 的向量路徑(圓角背景+4 個橢圓耳朵+1 個貝茲曲線肉球)用 Pillow 依比例重繪成三種尺寸,像素比對過與原圖一致,不需要你另外生成。

---

## Tier 1 — 建議(2 張,兩個測驗最常被分享)

| 路徑 | 尺寸 | 主體 |
|---|---|---|
| `images/quizzes/cat-personality-og.png` | 1200 × 630 | 一群不同花色的貓,標題感(已完成) |
| `images/quizzes/dog-personality-og.png` | 1200 × 630 | 一群不同品種的狗,標題感(已完成) |

**提示詞(貓;狗版把「貓」換成「狗」、品種換成柴犬/哈士奇/黃金獵犬/柯基):**
```
暖色奶茶色系分享圖,橘貓、黑貓、三花貓、布偶貓、暹羅貓等多隻不同花色的貓咪
圍在一起,表情各有個性,米色柔和背景,中央留白放標題「你是哪種貓咪?」,
扁平原創插畫風,1200x630
```

---

## Tier 2 — 選配(結果頁專屬分享圖,共 22 張)

做了會讓「我是橘貓!」這種分享自帶對應角色圖,點閱率更高;沒做也會用預設圖,不影響上線。
路徑一律 `images/results/<slug>-og.png`,尺寸 1200 × 630。

**共用提示詞範本**(把 `{中文名}`、`{特徵}`、`{個性}` 換掉):
```
一隻{中文名}的可愛特寫插畫,{特徵},神情表現出「{個性}」的感覺,
暖色奶茶色系背景 (#F6EEE3),扁平原創插畫風,中央留白可放一句標題,1200x630
```

貓(12):

狀態:2026-07-07 已完成 12 張,並已接進各自結果頁。

| slug | 中文名 | 個性(tagline) | 特徵提示 |
|---|---|---|---|
| orange-cat | 橘貓 | 慵懶樂天派 | 橘色虎斑、瞇眼放鬆、旁邊一碗食物 |
| black-cat | 黑貓 | 高冷神祕系 | 深灰黑毛、金黃眼睛、眼神銳利 |
| calico-cat | 三花貓 | 古靈精怪型 | 白底橘黑三花、表情調皮 |
| ragdoll-cat | 布偶貓 | 溫柔黏人款 | 奶白長毛、藍眼、溫柔依偎 |
| siamese-cat | 暹羅貓 | 話癆社交王 | 米白重點色、藍眼、張嘴像在講話 |
| american-shorthair | 美國短毛貓 | 穩重可靠掛 | 灰藍虎斑、端正坐姿 |
| persian-cat | 波斯貓 | 優雅貴族範 | 白色蓬鬆長毛、優雅 |
| scottish-fold | 折耳貓 | 軟萌討拍系 | 折耳、圓臉、無辜大眼撒嬌 |
| sphynx-cat | 無毛貓 | 特立獨行怪 | 無毛粉膚、大耳、酷酷表情 |
| maine-coon | 緬因貓 | 大隻溫柔漢 | 大體型棕虎斑、溫和 |
| russian-blue | 俄羅斯藍貓 | 安靜觀察家 | 藍灰短毛、綠眼、安靜觀察 |
| tuxedo-cat | 賓士貓 | 街頭生存高手 | 黑白賓士配色、機靈 |

狗(10):

狀態:尚未完成;下一批可從狗狗結果頁開始。

| slug | 中文名 | 個性(tagline) | 特徵提示 |
|---|---|---|---|
| shiba-inu | 柴犬 | 傲嬌固執派 | 橘棕柴犬、瞇瞇笑臉、傲嬌 |
| husky | 哈士奇 | 暴衝行動派 | 灰白哈士奇、藍眼、活力衝動 |
| golden-retriever | 黃金獵犬 | 陽光暖心系 | 金毛、吐舌微笑、陽光 |
| corgi | 柯基 | 歡樂氣氛組 | 橘白柯基、短腿、開心 |
| poodle | 貴賓 | 機靈時髦精 | 奶油色捲毛、時髦 |
| french-bulldog | 法鬥 | 省電慢活家 | 灰法鬥、大蝙蝠耳、慵懶 |
| border-collie | 邊境牧羊犬 | 全能計畫控 | 黑白邊牧、專注認真 |
| chihuahua | 吉娃娃 | 小辣椒戰士 | 米色吉娃娃、大眼、氣勢十足 |
| dachshund | 臘腸 | 好奇挖掘機 | 棕色長身臘腸、好奇 |
| mix-breed | 米克斯 | 野生生活家 | 米克斯混色、自在隨性 |

狀態:2026-07-07 已完成 10 張,並已接進各自結果頁與 sitemap.xml。**Tier 2 全部完成(22/22)**。

---

## Tier 3 — 選配(文章圖,6 篇)

每篇路徑 `images/articles/<slug>/og.png`(1200 × 630);想放文章首圖可另存 `cover.png`(1200 × 675)。
各篇的提示詞與 alt 已寫在 `images/articles/<slug>/README.md`。清單:

- `how-quiz-scoring-works`(此篇尚無 README,提示詞:一張像在拆解計分表的可愛示意圖,貓咪與分數,奶茶色系)
- `cat-personality-types-guide`
- `dog-personality-types-guide`
- `cat-dog-personality-difference`
- `cat-quiz-friend-pairing`
- `dog-social-style-guide`

---

## Tier 4 — 選配(第 3 個測驗「你適合學什麼?」,8 張,2026-07-07 新增)

目前這 8 頁(測驗介紹頁 + 7 個領域結果頁)都用預設圖 `images/og-default.png`,結果頁上的視覺是純 emoji(🤖💻🧭📣🎨🎬⚙️)不是插畫,風格跟貓狗測驗不同,暫緩製作專屬圖,優先順序低於**提供課程連結**這件事。若之後想做,路徑一律 `images/results/career-<slug>-og.png`,主題建議走「職場/學習情境插畫」而非可愛動物插畫,slug 對照 Tier 2 表格上方的 7 大領域。

---

## 做完後要告訴我的事

1. Tier 0 放好 → 全站分享縮圖與圖示就完整了(這是送 AdSense 前最該先做的)。
2. 若做了 Tier 1/2/3 的專屬圖 → **把完成的 slug 列給我**,我會把那些頁的 `og:image` 從預設圖切成專屬圖(順便補 `alt`)。
3. 圖片放好後我會再跑一次連結/圖片檢查,確認沒有 404。

---

## Tier 5 — 選配(career-path 測驗 7 隻動物角色插畫,2026-07-07 新增)

站長已提供完整產圖 prompt(見 `E:\心理測驗製作\files\動物產圖prompt.md`)與升級規格(`career-path-升級規格.md`)。頁面已改用 `<img>` + `onerror` fallback 到 emoji 圓框(跟財富引擎測驗同一套 fallback 邏輯),**圖片沒放也不會破版**,不影響上線。

路徑統一 `images/career/<檔名>`,尺寸 16:9,風格延續貓貓狗狗的精緻厚塗半寫實動漫風、米色療癒場景、暖金光。

| 檔名 | 領域 slug | 動物 | 狀態 |
|---|---|---|---|
| `career_ai-data_raccoon.png` | ai-data | 🦝 浣熊 | ✅ 已上線 |
| `career_web-dev_dino.png` | web-dev | 🦕 小恐龍 | ✅ 已上線 |
| `career_product-design_dolphin.png` | product-design | 🐬 海豚 | ✅ 已上線 |
| `career_digital-marketing_fox.png` | digital-marketing | 🦊 狐狸 | ✅ 已上線 |
| `career_commercial-design_chameleon.png` | commercial-design | 🦎 變色龍 | ✅ 已上線 |
| `career_multimedia_otter.png` | multimedia | 🦦 水獺 | ✅ 已上線 |
| `career_automation_octopus.png` | automation | 🐙 章魚 | ✅ 已上線 |

**Tier 5 全部完成(7/7)。** 2026-07-07 站長把圖放進 `images/drafts/2026-07-07/career-path/` 讓我審核挑選(共 10 張:8 張正確版 + 2 張「wrong-animals」草稿),我從中取正確的 7 隻動物 + 1 張總覽圖,搬到正式路徑,onerror fallback 自動偵測到就切換顯示,沒有動任何程式碼。

**總覽圖**(`career-path-overview-draft-01.png`,7 隻動物聚在一起)已裁成 1200×630 存為 `images/quizzes/career-path-og.png`,接上測驗介紹頁 og:image/twitter:image,以及首頁/測驗總覽的 `.quiz-card-banner`(原本是 🧭 emoji 漸層底,現在跟貓狗測驗一樣用真實插畫橫幅)。

**7 個結果頁 og:image 也已切換**:用同一套 Pillow 置中裁切邏輯,從 7 張動物插畫產生 `images/results/career-<slug>-og.png`,取代原本的預設圖;sitemap.xml 已補上對應 `image:image`(測驗介紹頁 + 7 個結果頁共 8 處)。

**2026-07-07 修正:結果頁插畫不要裁圓**——站長回報結果頁圖片被裁成圓形頭像、測驗介紹頁沒有封面圖。原因:`.career-portrait` CSS 是 200×200 圓形裁切,跟貓狗結果頁後來改用的 `.result-hero`(滿版橫幅、不裁切)不一致;測驗介紹頁的 `start-art` 那時還是 7 個 emoji 排列,沒有接上總覽圖。修正:
- `.career-portrait` 改成跟 `.result-hero` 同款的滿版橫幅(蓋掉卡片左右邊距、只圓上緣、`height:auto` 顯示完整圖片不裁切),只改 CSS,7 個結果頁的 HTML 完全不用動
- 測驗介紹頁新增 `.career-hero` class,把 emoji 排列換成 `images/career/career-path-overview.png`(總覽圖的完整未裁切版,跟裁成 1200×630 給 og:image 用的版本是分開兩份檔案)

---

## Tier 6 — 財富引擎測驗插畫(首頁 hero + 8 人格,2026-07-07 開始上線)

站長在 `E:\心理測驗製作\Passive income\public\images\` 準備圖,規格見同資料夾的 `ART_DIRECTION.md`。已比照 career-path 的 `<img>` + `onerror` fallback 邏輯接上:圖片路徑統一 `images/wealth/<檔名>`,結果頁用 `.wealth-portrait`(16:9 橫幅,fallback 大 emoji)、測驗介紹頁用 `.wealth-hero`。**放好圖片後不用告訴我路徑,fallback 機制會自動偵測**,跟 Tier 5 邏輯一致。

| 檔名 | 用途 / 人格 | 動物 | 狀態 |
|---|---|---|---|
| `hero.png` | 測驗介紹頁主視覺 | — | ✅ 已上線(2026-07-07 站長更新過一次新版) |
| `p1_squirrel.png` | 穩健資產家 | 🐿️ 松鼠 | ✅ 已上線 |
| `p2_beaver.png` | 數位工匠 | 🦫 河狸 | ✅ 已上線 |
| `p3_owl.png` | 知識出版家 | 🦉 貓頭鷹 | ✅ 已上線 |
| `p4_peacock.png` | 流量放大器 | 🦚 孔雀 | ✅ 已上線 |
| `p5_bee.png` | 社群主理人 | 🐝 蜜蜂 | ✅ 已上線 |
| `p6_ant.png` | 系統建築師 | 🐜 螞蟻 | ✅ 已上線 |
| `p7_flamingo.png` | 版權收藏家 | 🦩 火烈鳥 | ✅ 已上線 |
| `p8_turtle.png` | 實體經營家 | 🐢 烏龜 | ✅ 已上線 |

**Tier 6 全部完成(8/8 人格 + hero)。**

**og:image 已切換(2026-07-07)**:8 個結果頁 + 測驗介紹頁的 og:image / twitter:image / JSON-LD image 都已從預設圖換成專屬圖。原插畫是 16:9(約 1725×910,比例 ≈1.90),跟建議的 1200×630(比例 ≈1.905)幾乎一致,所以用 Pillow 從中心點裁切+等比縮放產生乾淨的 1200×630 版本,存在 `images/results/wealth-<slug>-og.png` 與 `images/quizzes/wealth-engine-og.png`(跟站內其他測驗的 og 圖路徑慣例一致),已補進 sitemap.xml 的 `image:image`。

**2026-07-07 已接上**:`avatar_p1~p8.png`(1254×1254 方形頭像)用在結果頁新增的 `.share-card` 可截圖分享卡片;`analyzing.png` 用在答完測驗後的過場「分析中」畫面(`#screen-analyzing`)。都放在 `images/wealth/`,用同一套 `<img>` + `onerror` fallback 邏輯。`_contact_sheet.png` 是產圖時的預覽總覽圖,沒有對應頁面用途,留在 `Passive income/public/images/` 不動。
