# 毛毛心理測驗所 — 改版規格書(AdSense 二次送審)

最後更新:2026-07-07

## 背景

2026-07 以 `yumitw.github.io` 申請 Google AdSense 未通過。診斷結論:

1. **內容價值不足**:全站實際只有 2 頁;主要內容(題目、12 種結果)藏在 JS 互動後面,爬蟲無法收錄。
2. **政策風險**:AdSense 程式碼掛在純互動的答題畫面(「無發布商內容的畫面放送廣告」風險)。
3. **缺必備頁面**:無隱私權政策(AdSense 明文要求)、關於、聯絡、免責聲明。
4. **結構問題**:12 種結果共用一個 URL,無法個別收錄/分享;無導覽、sitemap、robots.txt、ads.txt。

## 已拍板的決策

| 決策 | 結論 |
|---|---|
| 架構 | cat-quiz 併入 yumitw.github.io 單一 repo;舊 `/cat-quiz/` 留轉址頁 |
| 網域 | **2026-07-07 變更**:先用既有 `yumitw.github.io`(免費、免等 DNS 生效)上線讓真人試用,不等買新網域。全站 `DOMAIN_PLACEHOLDER` 已替換為 `https://yumitw.github.io`,**未**產生 CNAME 檔(user-site repo 用預設網域不需要)。之後若買了自訂網域,再跑 `tools/set-domain.ps1 -Domain "新網域"` 覆蓋一次即可,那時才需要 CNAME。 |
| 內容產出 | 先做範本(1 結果頁 + 1 文章)給站長審,風格確認後再產其餘 11 結果頁與文章 |
| 新測驗 | 這一輪加 1 個:「你是哪種狗狗?」(草案待審) |

## 網站架構

```
/
├── index.html                     首頁(內容入口:測驗卡、人格圖鑑、文章、網站說明)
├── quizzes/
│   ├── index.html                 測驗總覽
│   └── cat-personality/
│       ├── index.html             測驗介紹頁(靜態內容,可放廣告)
│       ├── data.json              題目與結果資料
│       └── play/index.html        純答題頁(noindex、無任何廣告碼)
├── results/<slug>/index.html      12 個靜態人格結果頁(可索引、可分享、可放廣告)
├── articles/
│   ├── index.html                 文章列表
│   └── <slug>/index.html          文章頁
├── about/ contact/ privacy/ disclaimer/
├── 404.html
├── robots.txt                     擋 play/,指向 sitemap
├── sitemap.xml                    手動維護,新頁面記得加
├── ads.txt                        google.com, pub-9451009899963713, DIRECT, f08c47fec0942fa0
├── js/cat-art.js                  SVG 貓咪產生器
├── js/play.js                     答題引擎(完成後導向 /results/<slug>/?from=quiz)
└── tools/set-domain.ps1           網域一次替換 + 產 CNAME
```

### 結果頁 slug 對照

orange→orange-cat, black→black-cat, calico→calico-cat, ragdoll→ragdoll-cat,
siamese→siamese-cat, shorthair→american-shorthair, persian→persian-cat,
fold→scottish-fold, sphynx→sphynx-cat, maine→maine-coon,
russian→russian-blue, tuxedo→tuxedo-cat

結果頁每上線一頁,就把 slug 加進 `quizzes/cat-personality/play/index.html` 的
`QUIZ_CONFIG.readySlugs`;不在清單內的類型暫時顯示頁內備用結果畫面。

## 廣告版位原則(通過審查後)

- **絕不放**:答題頁(play/)、載入/錯誤畫面、任何按鈕附近。
- **可放**:首頁(介紹區之後)、測驗介紹頁(說明段之後)、結果頁(摘要後/段落間/延伸閱讀前)、文章頁(第二段後/中後段)。
- 版位先以 `<div class="ad-slot">` 佔位,核准後再放 `<ins>` 單元;自動廣告若開啟,要在 AdSense 後台把 play/ 排除。

## 網域切換流程(買好網域後)

1. `powershell -ExecutionPolicy Bypass -File tools\set-domain.ps1 -Domain "你的網域"`
2. 到網域商 DNS 設定:
   - apex(裸網域)A 記錄 → 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153
   - `www` CNAME → `yumitw.github.io`
3. commit + push;GitHub repo → Settings → Pages → Custom domain 填網域、勾 Enforce HTTPS。
4. 舊 cat-quiz repo:index.html / quiz.html 換成 meta-refresh 轉址頁(指向新站),保住已分享到 LINE 的舊連結。

## 送審前檢查清單

- [x] 12 個貓結果頁 + 10 個狗結果頁全數上線,兩份 `readySlugs` 皆同步
- [x] 文章 6 篇(各自主題,不模板換詞)
- [x] 狗狗測驗上線(介紹頁 + play + 10 結果頁)
- [x] 每頁獨立 title / description / canonical / og:url(稽核零缺漏)
- [x] 全站 og:image / Twitter card / JSON-LD / favicon / manifest(meta-kit 注入,65 塊結構化資料通過解析)
- [x] sitemap.xml 收錄所有正式頁面(不含 play/、404),與實體檔一致,已補 `lastmod` 與有專屬圖頁面的 `image:image`
- [x] 站內連結稽核:零壞連結
- [x] 狗結果頁文案補深至貓頁水準(9 個 h2 段落,love/friendship/work/stress 各自獨立;目前狗頁平均字數已超過貓頁)
- [x] 文章 ↔ 結果頁雙向內部連結:6 篇文章共 58 處品種名稱首次提及已連到對應結果頁;22 個結果頁底部新增「延伸閱讀」連回 2 篇相關文章
- [x] **圖片 Tier 0 全部完成**:favicon.svg 手動重繪成 3 個點陣 icon(apple-touch-icon/icon-192/icon-512),像素級對齊原向量圖,不需額外生成
- [ ] 圖片 Tier 1/2/3 專屬圖(依 `docs/content-kit/image-manifest.md`):狗狗結果頁 10 張、文章圖 6 張 —— 站長產生後告知 slug,我來接 og:image
- [ ] Google Search Console:驗證網域、提交 sitemap、抽查 5 頁「網址檢查」確認可索引
- [ ] 手機實測:無載入卡住、無壞連結、無「敬請期待」空頁
- [ ] 等主要頁面進索引(約 1-2 週)→ AdSense 按「要求審查」

## 待辦(依序)

1. ✅ 骨架:新結構、首頁、測驗介紹頁、答題頁、robots/ads/sitemap/404
2. ✅ 內容:12 貓 + 10 狗結果頁、6 篇文章、政策四頁(站長已補齊)
3. ✅ 狗狗測驗建置(含 dogSVG 插圖產生器)
4. ✅ 架構強化 meta-kit:og:image / Twitter card / JSON-LD / favicon / manifest 全站注入
5. ✅ 狗結果頁深度補齊至貓頁水準(站長已完成)
6. ✅ 圖片 Tier 0:favicon 點陣化(3 個 icon);✅ 核心 OG / 預設圖;✅ 貓咪結果頁 12 張專屬圖
7. ✅ 文章 ↔ 結果頁雙向內部連結(58 處品種連結 + 22 頁延伸閱讀)
8. ✅ sitemap.xml 補 lastmod 與 image sitemap 擴充
9. ⬜ 圖片 Tier 1/2/3:狗狗結果頁 10 張、文章圖 6 張(站長生成中)
10. ✅ **2026-07-07 決定先不買新網域**,改用既有 `yumitw.github.io` 上線(DOMAIN_PLACEHOLDER 已替換、未產生 CNAME);career-path 的 7 個課程 CTA 暫時換成「準備中」文字,避免死連結
11. ⬜ push `revamp` → `main`,讓 yumitw.github.io 正式更新(目前 main 還是舊版單頁,revamp 領先 9 個 commit)
12. ⬜ 舊 cat-quiz repo(獨立 repo,原本 `/cat-quiz/` 路徑)轉址頁,保住已分享出去的舊連結
13. ⬜ Search Console 驗證 + 提交 sitemap
14. ⬜ (選)GA4 取代/並行 StatCounter,追蹤 quiz_start / quiz_complete / result_share
15. ⬜ 拿到課程連結後換回 career-path 的 7 個 CTA 按鈕
16. ⬜ 索引確認後重新送審 AdSense(若之後改買自訂網域,要等新網域重新索引穩定才送審)

## 架構強化紀錄(meta-kit)

- 由 scratchpad 的 `inject_meta.py` 一次注入全站,冪等(靠 `<!-- meta-kit -->` 標記,重跑先移除再重建)。
- og:image:核心頁已用專屬 OG 圖;貓咪 12 個結果頁已切到 `/images/results/<slug>-og.png`;尚未做專屬圖的頁面使用 `/images/og-default.png`。
- JSON-LD:首頁 WebSite;結果頁與文章頁 Article;兩個測驗介紹頁 FAQPage;有麵包屑的頁面 BreadcrumbList。
- favicon.svg 為自製向量肉球圖示;iOS/Android 點陣圖示已用 Pillow 手動重繪貝茲曲線路徑產生(cairo 原生函式庫裝不上,改用等效重繪,像素比對與原圖一致)。

## 內部連結強化紀錄(2026-07-07)

- **文章 → 結果頁**:6 篇文章的品種名稱(如「橘貓」「柯基」)首次出現時自動連到對應 `/results/<slug>/`,同一篇文章同一品種只連第一次出現處,避免關鍵字堆疊觀感。共新增 58 處連結。
- **結果頁 → 文章**:22 個結果頁的「其他人格」清單下方新增「📚 延伸閱讀」區塊,貓頁連回 `cat-personality-types-guide` + `cat-quiz-friend-pairing`,狗頁連回 `dog-personality-types-guide` + `dog-social-style-guide`。
- 腳本:`link_and_enrich.py`(已跑過,冪等 — 已有「延伸閱讀」的頁面會跳過);若之後新增文章想比照辦理,邏輯可重用。

## 貓狗結果頁插畫橫幅(2026-07-07)

站長發現貓狗結果頁上原本只有小小的 SVG 圖示(`dogSVG()`/`catSVG()` 產生),沒有用到已經做好的 22 張精緻插畫(那批圖之前只接在 `og:image` 做社群分享用)。修正:
- 新增 `.result-hero`(CSS),22 個結果頁的 `.result-art` 上方插入 `<img src="/images/results/<slug>-og.png">`,與 og 圖共用同一張,橫幅式滿版顯示、貼齊卡片圓角。
- 原本的 SVG 產生邏輯保留,改成 `onerror` fallback(圖片萬一失效才會顯示),不是直接砍掉。
- 腳本:`add_result_hero.py`(冪等,已有 `.result-hero` 的頁面會跳過)。
- 已用瀏覽器實測貓、狗各一頁:圖片正確載入(natural width 1200px)、fallback SVG 正確保持隱藏、稽核零新增壞連結。
- **此變更已 commit,尚未推上 GitHub**,等站長確認要不要上線。

## 第 3 個測驗:「你適合學什麼?」(2026-07-07 已上線)

**性質與前兩個測驗不同**:這不是娛樂性人格測驗,是導購型性向測驗——測出使用者適合 7 大領域(人工智慧與資料分析、網站開發、產品設計/UIUX、數位行銷、商用設計與插畫、網紅多媒體、AI 高效自動化應用)中的哪一個,結果頁導向**第三方課程平台的推廣/聯盟連結**。

**關鍵決策**:加進本站當第 3 個測驗(沿用既有 quizzes/results 架構);目的是導流去課程報名,結果頁有 CTA;課程是別人的平台,我們是推廣方(聯盟性質)。

**已完成**:
- [x] 12 題性向測驗題目(草稿→計分平衡驗算→修訂三階段),7 領域理論最高分落差收斂在 2 分內,每領域至少出現 7 次以上
- [x] 7 個結果頁完整內容(intro/為什麼適合你 3 點/可學技能 5-7 條/互補領域推薦/CTA),經審稿確認 whatYouLearn 皆有課程原文根據且非逐句照抄,無銷售話術用詞
- [x] 結果頁 slug 前綴 `career-`,避免跟既有貓狗結果頁混淆
- [x] 每個結果頁 CTA 旁都有推廣/聯盟揭露聲明(誠實揭露+不影響測驗公正性,符合法規與 AdSense 政策要求)
- [x] robots.txt 加 `Disallow: /quizzes/career-path/play/`;sitemap.xml 補 9 個新網址;首頁/測驗總覽新增「🧭 性向測驗」獨立分區
- [x] 端對端測試通過:12 題作答 → 正確導向對應結果頁 → 祝賀橫幅、CTA、揭露聲明、互補領域連結皆正常顯示

**2026-07-07 動物角色升級**(依站長 `career-path-升級規格.md`):
- [x] 7 領域擬人化成 7 種動物(浣熊/小恐龍/海豚/狐狸/變色龍/水獺/章魚),不與貓狗測驗或財富引擎測驗(松鼠/河狸/貓頭鷹/孔雀/蜜蜂/螞蟻/火烈鳥/烏龜)的動物重複
- [x] data.json 的 7 個 result 補上 `animal` / `animalEmoji` / `animalTitle` 欄位
- [x] 結果頁新增:角色卡(圖片+onerror fallback 到 emoji 圓框,同財富引擎測驗的 fallback 邏輯)、命中感標語(hookLine)、星等特質(沿用 `.rating-block` 共用元件)、你的天生優勢(3 條)、也要注意的地方(溫柔提醒)、毛毛小結(角色口吻收尾),原有內容全部保留
- [x] 3 題用字微調(Excel→名單/表格、寫小工具→現成工具、找工具串起來→找方法自動跑),計分權重不變
- [x] 測驗介紹頁 7 大領域預覽 chip 改成動物 emoji+角色名;結果頁「其他領域」chip 同步更新
- [x] CSS 新增 `.career-portrait`/`.career-portrait-fallback`/`.blindspot-box`/`.mimo-note`,沿用既有米色+蜂蜜焦糖色票,未開新色
- [x] 端對端重測:12 題(含微調後題目)作答 → 正確導向結果頁 → fallback emoji、星等、優勢/盲點/毛毛小結皆正常顯示

**待辦(卡在使用者)**:
- [ ] **提供 7 個領域各自的實際課程連結網址**——2026-07-07 上線前先把 7 個結果頁的 CTA 按鈕暫時換成「🚧 課程連結準備中」文字(避免真人點到 `COURSE_LINK_PLACEHOLDER__<slug>` 死連結),等拿到真連結後我再把按鈕換回來
- [ ] (選)7 隻動物插畫,規格見 `docs/content-kit/image-manifest.md` Tier 5 —— 圖沒放也不影響上線,fallback 會自動處理

## 第 4 個測驗:「你的隱藏財富引擎是什麼?」(2026-07-07 已上線)

**內容來源**:站長在 `E:\心理測驗製作\Passive income\` 準備好完整內容(20 題 quizData.js、8 人格 personas.js、主副型組合 combinations.js、圖片規範 ART_DIRECTION.md)。原始 README 是照 React SPA(Vite)寫的規格,與本站實際的靜態多頁架構(AdSense 送審用)不符——**已與站長確認,選擇整合進現有靜態站**當第 4 個測驗,沿用 quizzes/results 架構,而非另起一個獨立 React app。

**性質**:娛樂向財富人格測驗(定位「進階/大人版」,同貓狗家族但排版更沉穩),不含課程推廣連結,無需揭露聲明。8 種財富人格:穩健資產家/數位工匠/知識出版家/流量放大器/社群主理人/系統建築師/版權收藏家/實體經營家,分別對應松鼠/河狸/貓頭鷹/孔雀/蜜蜂/螞蟻/火烈鳥/烏龜。

**主副型雙核心機制**:原始設計是取分數最高(主型)與次高(副型)人格,兩者組合成「雙核心」建議。為了不破壞既有 `js/play.js` 共用引擎(貓/狗/career 三個測驗都在用),用**加法式**擴充:新增 `computeSecondary()` 與 `cfg.includeSecondary` 開關(預設不啟用,舊測驗行為不受影響),啟用時導向結果頁網址會多帶 `&secondary=Px`;結果頁用新檔 `js/wealth-data.js`(含 8 手寫組合 + 其餘自動合成邏輯,port 自 combinations.js)在偵測到 `secondary` 參數時,才動態補上頁面上原本 `hidden` 的「雙核心組合」區塊。靜態頁本身(無 query string 時)仍是完整可索引的單一人格內容,不影響 SEO。

**已完成**:
- [x] 20 題完整移植自 quizData.js(6 選項制,含 P1–P8 加分與 6 個維度軸,維度軸分數會被計分引擎忽略,僅原始資料保留)
- [x] 8 個結果頁完整內容:為什麼適合你、5 種變現方法、依 5 級預算門檻的做法、3 項星等(被動程度/前期投入/後續維護,用●○呈現)、預期第一筆收入速度、最容易踩的陷阱、七日行動建議、不適合的方向、雙核心組合區塊
- [x] 結果頁 slug 前綴 `wealth-`(wealth-squirrel ~ wealth-turtle),避免跟既有貓狗/career 結果頁混淆
- [x] robots.txt 加 `Disallow: /quizzes/wealth-engine/play/`;sitemap.xml 補 9 個新網址;首頁/測驗總覽新增「💰 財富人格測驗」獨立分區 + 首頁 8 人格 chip 預覽
- [x] 圖片:ART_DIRECTION.md 規劃的插畫尚未產出,比照 career 測驗前例先用 emoji 直接當 result-art(非 fallback 機制),og:image 用全站 `/images/og-default.png`;待站長依 ART_DIRECTION.md 產出 9~18 張插畫後,再切換成 `<img>` + emoji fallback

**已完成(續)**:
- [x] 本機瀏覽器端對端測試:20 題作答 → 正確導向 wealth-squirrel、帶 `secondary=P8` → 雙核心組合區塊正確顯示「穩健資產家 × 實體經營家」;直接訪問結果頁(無 query string)時橫幅與組合區塊皆正確隱藏;確認貓測驗共用的 `js/play.js` 行為未受影響(無 regression)

**2026-07-07 插畫上線(第一批)**:
- [x] 站長於 `Passive income/public/images/` 提供 5 張圖(hero.png + p1_squirrel/p2_beaver/p3_owl/p4_peacock),已搬進 `images/wealth/`,接上 `<img>` + `onerror` fallback(同 career-path Tier 5 那套邏輯):測驗介紹頁用新 class `.wealth-hero`,結果頁用 `.wealth-portrait`(16:9 橫幅,不是 career 的圓形頭像,因為插畫背景細節豐富,裁圓會裁掉大半場景)
- [x] 8 個結果頁的 markup 統一先套用 img+fallback(即使圖還沒到,onerror 會自動退回 emoji),之後補圖不需要再改程式碼,直接把檔案放進 `images/wealth/` 即可
- [x] 瀏覽器驗證:squirrel/beaver/owl/peacock 圖片正確顯示;bee(尚無圖)實測 `naturalWidth:0` 觸發 onerror,fallback emoji 正確浮現
- [x] 詳細清單見 `docs/content-kit/image-manifest.md` Tier 6

**待辦**:
- [ ] (可選,卡在使用者)蜜蜂/螞蟻/火烈鳥/烏龜 4 張人格插畫 —— 圖沒放也不影響上線,fallback 會自動處理
- [ ] og:image 是否要切到專屬插畫,待 8 張全部到齊後再評估(目前原圖 16:9 跟建議的 og 尺寸不完全一致)

## CSS 快取破壞(cache-busting)慣例(2026-07-07 導入)

GitHub Pages 給靜態資源的 `Cache-Control: max-age=600`(10 分鐘)。改過 CSS 又同時改動 HTML class 結構時,使用者瀏覽器可能抓到「新 HTML + 10 分鐘內快取的舊 CSS」造成破版(2026-07-07 首頁測驗卡改插畫橫幅時實際踩到)。

**根治**:全站 60 個 HTML 的 `<link rel="stylesheet">` 都帶版本查詢字串 `href="/css/style.css?v=YYYYMMDDx"`。瀏覽器把不同 query 當成不同 URL,一定重抓。

**規則**:**每次改 `css/style.css` 後,一定要同步把全站的版本號往前換一版**(慣例:日期+字母,如 `20260707b`→`20260708a`),否則改了 CSS 沒換版本,回訪者會繼續看到舊樣式。批次替換用 scratchpad 的一次性 python(regex `href="/css/style.css(\?v=[^"]*)?"` → 新版本),已驗證冪等(重跑不會疊加 `?v=?v=`)。

## 追蹤碼現況

- StatCounter(project 13334396):全站隱形計數(`sc_invisible=1`),已移除公開的「查看訪客統計」連結。
- GA4:尚未安裝(需站長建立 GA4 資源後提供評估 ID)。
