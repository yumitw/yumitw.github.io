# 毛毛心理測驗所 — 改版規格書(AdSense 二次送審)

最後更新:2026-07-06

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
| 網域 | 購買自訂網域後才上線送審(全站網址用 `DOMAIN_PLACEHOLDER`,以 `tools/set-domain.ps1` 一次替換) |
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
- [x] sitemap.xml 收錄所有正式頁面(不含 play/、404),與實體檔一致
- [x] 站內連結稽核:零壞連結
- [ ] **圖片:依 `docs/content-kit/image-manifest.md` 產生**(Tier 0 的 4 張為送審前必做)
- [ ] Google Search Console:驗證網域、提交 sitemap、抽查 5 頁「網址檢查」確認可索引
- [ ] 手機實測:無載入卡住、無壞連結、無「敬請期待」空頁
- [ ] 等主要頁面進索引(約 1-2 週)→ AdSense 按「要求審查」

## 待辦(依序)

1. ✅ 骨架:新結構、首頁、測驗介紹頁、答題頁、robots/ads/sitemap/404
2. ✅ 內容:12 貓 + 10 狗結果頁、6 篇文章、政策四頁(站長已補齊)
3. ✅ 狗狗測驗建置(含 dogSVG 插圖產生器)
4. ✅ 架構強化 meta-kit:og:image / Twitter card / JSON-LD / favicon / manifest 全站注入
5. ⏳ 圖片產生(站長,依 `docs/content-kit/image-manifest.md`):Tier 0 四張必做;產專屬圖後告知 slug,我把該頁 og:image 切換
6. ⬜ (選)狗結果頁文案補深至貓頁水準(目前狗頁合併感情/友情/職場/壓力為一段,字數約少 30%)
7. ⬜ 網域購買 → set-domain → DNS → push 上線
8. ⬜ 舊 cat-quiz repo 轉址頁(等網域定案後產生)
9. ⬜ Search Console 驗證 + 提交 sitemap
10. ⬜ (選)GA4 取代/並行 StatCounter,追蹤 quiz_start / quiz_complete / result_share
11. ⬜ 索引確認後重新送審 AdSense

## 架構強化紀錄(meta-kit)

- 由 scratchpad 的 `inject_meta.py` 一次注入全站,冪等(靠 `<!-- meta-kit -->` 標記,重跑先移除再重建)。
- og:image 目前全指向 `/images/og-default.png`;要把某頁換成專屬圖,在 `inject_meta.py` 的 `PER_PAGE_OG` 加該頁 url 再重跑即可。
- JSON-LD:首頁 WebSite;結果頁與文章頁 Article;兩個測驗介紹頁 FAQPage;有麵包屑的頁面 BreadcrumbList。
- favicon.svg 為自製向量肉球圖示;iOS/Android 點陣圖示待 `image-manifest.md` Tier 0 產生。

## 追蹤碼現況

- StatCounter(project 13334396):全站隱形計數(`sc_invisible=1`),已移除公開的「查看訪客統計」連結。
- GA4:尚未安裝(需站長建立 GA4 資源後提供評估 ID)。
